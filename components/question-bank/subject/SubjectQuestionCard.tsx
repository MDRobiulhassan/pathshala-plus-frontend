"use client";

import Image from "next/image";
import { Question } from "@/lib/api";
import SubjectOption from "./SubjectOption";

type Props = {
    question: Question;
    questionNumber: number;
};

export default function SubjectQuestionCard({
    question,
    questionNumber,
}: Props) {
    return (
        <div className="rounded-2xl border bg-card p-8 space-y-6">
            <div className="space-y-4">
                <h2 className="text-lg font-semibold leading-8">
                    {questionNumber}. {question.questionText}
                </h2>

                {question.questionImageUrl && (
                    <div className="relative h-72 w-full overflow-hidden rounded-lg border">
                        <Image
                            src={question.questionImageUrl}
                            alt="Question"
                            fill
                            className="object-contain"
                        />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {question.options.map((option) => (
                    <SubjectOption
                        key={option.optionId}
                        option={option}
                    />
                ))}
            </div>

            {/* {question.explanation && (
                <div className="border-t pt-4">
                    <h3 className="font-semibold">
                        Explanation
                    </h3>

                    <p className="mt-2 text-muted-foreground">
                        {question.explanation}
                    </p>
                </div>
            )} */}
            <div className="border-t pt-4 space-y-2">

                <h3 className="font-semibold">
                    Explanation
                </h3>

                {question.explanation ? (
                    <p className="text-muted-foreground">
                        {question.explanation}
                    </p>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Reasoning available for{" "}
                        <span className="font-semibold text-primary">
                            Pro members
                        </span>
                        .
                        <br />
                        Upgrade to Pro to view the explanation.
                    </p>
                )}

            </div>
        </div>
    );
}