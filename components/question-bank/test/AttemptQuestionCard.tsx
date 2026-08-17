"use client";

import { TestAttemptQuestion } from "@/lib/api/question-bank";
import Image from "next/image";

type Props = {
    question: TestAttemptQuestion;
    questionNumber: number;
    selectedOptionId?: number;
    /** Practice mode: show correct/wrong instantly after selection */
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
                    <img
                        src={question.questionImageUrl}
                        alt="Question image"
                        className="rounded-xl max-h-64 object-contain"
                    />
                )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((option) => {
                    const isSelected = selectedOptionId === option.optionId;
                    const isCorrect = option.selected; // in result view; not visible in timed
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
                            <span className="text-sm leading-relaxed">{option.optionText}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
