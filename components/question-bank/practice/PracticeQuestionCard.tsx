"use client";

import { useState } from "react";

import { Question } from "@/lib/api";

type Props = {
    question: Question;
    questionNumber: number;
};

export default function PracticeQuestionCard({
    question,
    questionNumber,
}: Props) {

    const [selectedOption, setSelectedOption] =
        useState<number | null>(null);

    const answered = selectedOption !== null;

    return (

        <div className="rounded-2xl border bg-card p-8">

            <h2 className="mb-8 text-xl font-semibold">

                {questionNumber}. {question.questionText}

            </h2>

            <div className="grid grid-cols-2 gap-5">

                {question.options.map(option => {

                    let className =
                        "rounded-xl border p-4 text-left transition";

                    if (answered) {

                        if (option.isCorrect) {

                            className +=
                                " border-green-500 bg-green-500/10";

                        }

                        else if (
                            selectedOption === option.optionId
                        ) {

                            className +=
                                " border-red-500 bg-red-500/10";

                        }

                    }

                    return (

                        <button
                            key={option.optionId}
                            disabled={answered}
                            onClick={() =>
                                setSelectedOption(
                                    option.optionId
                                )
                            }
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



        </div>

    );

}