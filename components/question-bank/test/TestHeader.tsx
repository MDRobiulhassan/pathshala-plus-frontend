"use client";

import BackButton from "@/components/ui/BackButton";

type Props = {
    title?: string;
    testInfo?: any;
    subjects?: any[];
    duration?: number;
    totalMarks?: number;
    negativeMark?: number | string;
    backHref?: string;
    showBack?: boolean;
    onBack?: () => void;
};

export function extractFullExamTitle(rawTitle?: string, testInfo?: any, subjects?: any[]): string {
    let inst = "";
    let unit = "";
    let session = "";
    let shift = "";

    if (subjects && Array.isArray(subjects)) {
        for (const s of subjects) {
            for (const c of s.chapters || []) {
                for (const p of c.passages || []) {
                    for (const q of p.questions || []) {
                        if (!inst && (q.instituteName || q.instituteShortName)) {
                            inst = q.instituteShortName || q.instituteName;
                        }
                        if (!unit && q.unitName) {
                            unit = q.unitName;
                        }
                        if (!session && (q.sessionLabel || q.session || q.examSessionLabel)) {
                            session = q.sessionLabel || q.session || q.examSessionLabel;
                        }
                        if (!shift && (q.shiftName || q.shiftNumber)) {
                            shift = q.shiftName || (typeof q.shiftNumber === "number" ? `Shift ${q.shiftNumber}` : String(q.shiftNumber));
                        }
                        if (inst && unit && session) break;
                    }
                    if (inst && unit && session) break;
                }
                if (inst && unit && session) break;
            }
            if (inst && unit && session) break;
        }
    }

    const parts: string[] = [];
    if (inst) parts.push(inst);
    if (unit) parts.push(unit);
    if (session) parts.push(session);
    if (shift) parts.push(shift);

    if (parts.length >= 2) {
        return parts.join(" ");
    }

    const genericWords = new Set([
        "MCQ", "TIMED", "PRACTICE", "ADMISSION", "TEST", "EXAM",
        "QUESTION", "QUESTIONS", "ALL", "DEFAULT"
    ]);

    const candidate = rawTitle || testInfo?.testName || testInfo?.examType;
    if (candidate && candidate.trim().length > 0) {
        const upper = candidate.trim().toUpperCase();
        if (!genericWords.has(upper)) {
            return candidate;
        }
    }

    return parts.length > 0 ? parts.join(" ") : "CU A Unit 2025-26";
}

function formatNegativeMark(val?: number | string): string {
    if (val === undefined || val === null) return "25%";
    const num = typeof val === "number" ? val : parseFloat(String(val));
    if (isNaN(num)) return String(val);

    const absNum = Math.abs(num);
    if (absNum > 0 && absNum <= 1) {
        return `${Math.round(absNum * 100)}%`;
    }
    return `${absNum}%`;
}

export default function TestHeader({
    title,
    testInfo,
    subjects,
    duration = 60,
    totalMarks = 100,
    negativeMark = 25,
    backHref = "/student/question-bank",
    showBack = true,
    onBack,
}: Props) {
    const displayTitle = extractFullExamTitle(title, testInfo, subjects);
    const displayNegativeMark = formatNegativeMark(negativeMark);

    return (
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            {showBack && (
                <div className="shrink-0 sm:absolute sm:left-0 sm:top-0.5 z-10">
                    {onBack ? (
                        <button
                            onClick={onBack}
                            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-muted cursor-pointer"
                        >
                            ← Back
                        </button>
                    ) : (
                        <BackButton fallbackHref={backHref} />
                    )}
                </div>
            )}

            <div className="w-full text-center space-y-1.5 sm:px-24">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {displayTitle}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs sm:text-sm font-medium text-white/80">
                    <div>
                        <span>Duration : </span>
                        <span className="font-semibold text-white">{duration} Minutes</span>
                    </div>
                    <div>
                        <span>Full Marks : </span>
                        <span className="font-semibold text-white">{totalMarks}</span>
                    </div>
                    <div>
                        <span>Negative Marking: </span>
                        <span className="font-semibold text-white">{displayNegativeMark}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}