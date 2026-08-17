"use client";

import Image from "next/image";
import { Question } from "@/lib/api";
import SubjectOption from "./SubjectOption";
import ExplanationBox from "../Shared/ExplanationBox";

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
                {(question.instituteName || question.sessionLabel) && (
                    <div className="flex flex-wrap items-center gap-2">
                        {question.instituteName && (
                            <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                                {question.instituteName}
                            </span>
                        )}
                        {question.unitName && (
                            <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                                Unit {question.unitName}
                            </span>
                        )}
                        {question.sessionLabel && (
                            <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                                {question.sessionLabel}
                            </span>
                        )}
                    </div>
                )}

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

            <ExplanationBox explanation={question.explanation} />
        </div>
    );
}