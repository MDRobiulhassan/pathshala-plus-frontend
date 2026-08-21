"use client";

import Image from "next/image";
import { Passage } from "@/lib/api";
import SubjectQuestionCard from "./SubjectQuestionCard";
import { BookOpen } from "lucide-react";

type Props = {
    passages: Passage[];
    startQuestionNumber?: number;
};

export default function SubjectQuestionSection({
    passages,
    startQuestionNumber = 1,
}: Props) {
    let currentNumber = startQuestionNumber;

    return (
        <div className="space-y-10">
            {passages.map((passage, index) => {
                const pStart = currentNumber;
                const pEnd = currentNumber + passage.questions.length - 1;
                const rangeLabel = pStart === pEnd ? `question ${pStart}` : `questions ${pStart}–${pEnd}`;

                return (
                    <div
                        key={passage.passageId ?? `passage-${index}`}
                        className="space-y-6"
                    >
                        {passage.passageText && (
                            <div className="rounded-2xl border border-white/10 bg-[#0C1120] p-6 space-y-3">
                                <div className="flex items-center gap-2 text-xs font-bold text-[#14B8A6] uppercase tracking-wider">
                                    <BookOpen size={14} />
                                    <span>Read the passage and answer {rangeLabel}</span>
                                </div>
                                <p className="text-xl leading-relaxed text-white/90 font-sans">
                                    {passage.passageText}
                                </p>
                                {passage.passageImageUrl && (
                                    <div className="relative max-h-60 overflow-hidden rounded-lg">
                                        <Image
                                            src={passage.passageImageUrl}
                                            alt="Passage illustration"
                                            width={800}
                                            height={480}
                                            className="rounded-lg max-h-60 w-auto object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {passage.questions.map((question) => (
                            <SubjectQuestionCard
                                key={question.questionId}
                                question={question}
                                questionNumber={currentNumber++}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}