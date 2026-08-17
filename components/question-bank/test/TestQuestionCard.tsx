"use client";

import { Question } from "@/lib/api";
import OptionButton from "../Shared/OptionButton";
import ExplanationBox from "../Shared/ExplanationBox";

type Props = {
    question: Question;
    questionNumber: number;

    selectedOptionId?: number;

    onSelect: (
        questionId: number,
        optionId: number
    ) => void;
};

export default function TestQuestionCard({
    question,
    questionNumber,
    selectedOptionId,
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
                        className="rounded-lg"
                    />
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {question.options.map((option) => (
                    <OptionButton
                        key={option.optionId}
                        label={option.optionLabel}
                        text={option.optionText}
                        selected={
                            selectedOptionId === option.optionId
                        }
                        onClick={() =>
                            onSelect(
                                question.questionId,
                                option.optionId
                            )
                        }
                    />
                ))}
            </div>

            <ExplanationBox explanation={question.explanation} />
        </div>
    );
}