"use client";

import { TestAttemptQuestion } from "@/lib/api/test-attempt";
import Image from "next/image";

type Props = {
    question: TestAttemptQuestion;
    questionNumber: number;
    selectedOptionId?: number;
    showResult?: boolean;
    onSelect: (questionId: number, optionId: number) => void;
};

export default function AttemptQuestionCard({
    question,
    questionNumber,
    selectedOptionId,
    showResult = false,
    onSelect,
}: Props) {
    const answered = selectedOptionId !== undefined;

    return (
        <div className="rounded-2xl border border-white/10 bg-[#0C1120] p-6 md:p-8 space-y-6">
            {/* Question text */}
            <div className="space-y-3">
                <h2 className="text-base md:text-lg font-semibold text-white leading-relaxed">
                    <span className="text-[#14B8A6] mr-1.5 font-bold">{questionNumber}.</span>
                    {question.questionText}
                </h2>
                {question.questionImageUrl && (
                    <div className="relative max-h-64 overflow-hidden rounded-xl">
                        <Image
                            src={question.questionImageUrl}
                            alt="Question diagram"
                            width={600}
                            height={400}
                            className="rounded-xl max-h-64 w-auto object-contain"
                        />
                    </div>
                )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((option) => {
                    const isSelected = selectedOptionId === option.optionId;
                    const isCorrect = option.selected;
                    const showCorrect = showResult && answered && isCorrect;
                    const showWrong = showResult && isSelected && !isCorrect;

                    let borderClass = "border-white/10 bg-white/5 hover:bg-white/10 text-white";
                    if (showCorrect) {
                        borderClass = "border-emerald-500/60 bg-emerald-500/10 text-emerald-300";
                    } else if (showWrong) {
                        borderClass = "border-red-500/60 bg-red-500/10 text-red-300";
                    } else if (isSelected && !showResult) {
                        borderClass = "border-[#14B8A6]/60 bg-[#14B8A6]/10 text-white";
                    }

                    return (
                        <button
                            key={option.optionId}
                            disabled={showResult && answered}
                            onClick={() => onSelect(question.questionId, option.optionId)}
                            className={`
                                flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150 cursor-pointer
                                disabled:cursor-default
                                ${borderClass}
                            `}
                        >
                            <span className={`shrink-0 font-bold text-sm mt-0.5 ${
                                showCorrect ? "text-emerald-400" : showWrong ? "text-red-400" : isSelected ? "text-[#14B8A6]" : "text-slate-400"
                            }`}>
                                {option.optionLabel}.
                            </span>
                            <div className="flex flex-col gap-2">
                                <span className="text-sm leading-relaxed">{option.optionText}</span>
                                {option.optionImageUrl && (
                                    <div className="relative max-h-40 overflow-hidden rounded-lg">
                                        <Image
                                            src={option.optionImageUrl}
                                            alt={`Option ${option.optionLabel}`}
                                            width={400}
                                            height={200}
                                            className="rounded-lg max-h-40 w-auto object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
