"use client";

import { Passage } from "@/lib/api";
import SubjectQuestionCard from "./SubjectQuestionCard";

type Props = {
    passages: Passage[];
};

export default function SubjectQuestionSection({
    passages,
}: Props) {
    return (
        <div className="space-y-10">
            {passages.map((passage, index) => (
                <div
                    key={passage.passageId ?? index}
                    className="space-y-6"
                >
                    {passage.passageText && (
                        <div className="rounded-xl border p-5 bg-card">
                            <p>{passage.passageText}</p>
                        </div>
                    )}

                    {passage.questions.map((question, index) => (
                        <SubjectQuestionCard
                            key={question.questionId}
                            question={question}
                            questionNumber={index + 1}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}