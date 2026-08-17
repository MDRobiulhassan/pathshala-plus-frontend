"use client";

import OptionButton from "../Shared/OptionButton";
import ExplanationBox from "../Shared/ExplanationBox";

type Option = {
    optionId: number;
    optionLabel: string;
    optionText: string;
    optionImageUrl?: string | null;
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
    selectedOptionId?: number;
    isReview?: boolean;
    onSelect?: (
        questionId: number,
        optionId: number
    ) => void;
};

export default function TestQuestionCard({
    question,
    questionNumber,
    selectedOptionId,
    isReview = false,
    onSelect,
}: Props) {
    return (
        <div className="rounded-2xl border bg-card p-8 space-y-6">
            <div className="space-y-3">
                <h2 className="text-lg font-semibold">
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

            <div className="grid grid-cols-2 gap-4">
                {question.options.map((option) => {
                    if (isReview) {
                        const isRightOption = Boolean(option.isCorrect || option.correctOption);
                        const isUserSelected = selectedOptionId === option.optionId;

                        let className = "rounded-xl border p-4 text-left font-medium transition cursor-default";

                        if (isRightOption) {
                            className += " border-green-500 bg-green-500/10 text-green-400 font-bold";
                        } else if (isUserSelected) {
                            className += " border-red-500 bg-red-500/10 text-red-400 font-bold";
                        }

                        return (
                            <div key={option.optionId} className={className}>
                                <span className="mr-2 font-bold">{option.optionLabel}.</span>
                                {option.optionText}
                            </div>
                        );
                    }

                    return (
                        <OptionButton
                            key={option.optionId}
                            label={option.optionLabel}
                            text={option.optionText}
                            selected={selectedOptionId === option.optionId}
                            onClick={() => onSelect?.(question.questionId, option.optionId)}
                        />
                    );
                })}
            </div>

            {isReview && (
                <ExplanationBox explanation={question.explanation} />
            )}
        </div>
    );
}