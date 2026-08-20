"use client";

import { useState } from "react";
import ExplanationBox from "../Shared/ExplanationBox";

type Option = {
    optionId: number;
    optionLabel: string;
    optionText: string;
    optionImageUrl?: string | null;
    selected?: boolean;
    isCorrect?: boolean;
    correctOption?: boolean;
};

type QuestionLike = {
    questionId: number;
    questionText: string;
    questionImageUrl?: string | null;
    explanation?: string | null;
    options: Option[];
};

type Props = {
    question: QuestionLike;
    questionNumber: number;
    onSelect?: (questionId: number, optionId: number) => void;
};

export default function PracticeQuestionCard({
    question,
    questionNumber,
    onSelect,
}: Props) {
    const initialSelected = question.options.find((o) => o.selected)?.optionId ?? null;
    const [selectedOption, setSelectedOption] = useState<number | null>(initialSelected);

    const answered = selectedOption !== null;

    const handleOptionClick = (optionId: number) => {
        if (answered) return;
        setSelectedOption(optionId);
        onSelect?.(question.questionId, optionId);
    };

    return (
        <div className="rounded-2xl border bg-card p-8 space-y-6">
            <div className="space-y-3">
                <h2 className="text-xl font-semibold">
                    {questionNumber}. {question.questionText}
                </h2>

                {question.questionImageUrl && (
                    <img
                        src={question.questionImageUrl}
                        alt=""
                        className="rounded-lg max-h-64 object-contain"
                    />
                )}
            </div>

            <div className="grid grid-cols-2 gap-5">
                {question.options.map((option) => {
                    const isRightOption = Boolean(option.isCorrect || option.correctOption);
                    let className =
                        "rounded-xl border p-4 text-left transition cursor-pointer disabled:cursor-default";

                    if (answered) {
                        if (isRightOption) {
                            className +=
                                " border-green-500 bg-green-500/10 text-green-400 font-bold";
                        } else if (selectedOption === option.optionId) {
                            className +=
                                " border-red-500 bg-red-500/10 text-red-400 font-bold";
                        }
                    }

                    return (
                        <button
                            key={option.optionId}
                            disabled={answered}
                            onClick={() => handleOptionClick(option.optionId)}
                            className={className}
                        >
                            <span className="mr-2 font-bold">
                                {option.optionLabel}.
                            </span>
                            {option.optionText}
                        </button>
                    );
                })}
            </div>

            {answered && (
                <ExplanationBox explanation={question.explanation} />
            )}
        </div>
    );
}