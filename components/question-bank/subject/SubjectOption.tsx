"use client";

import { QuestionOption } from "@/lib/api";

type Props = {
    option: QuestionOption;
};

export default function SubjectOption({
    option,
}: Props) {
    return (
        <div
            className={`
                rounded-xl
                border
                p-4
                flex
                items-center
                gap-4

                ${option.isCorrect
                    ? "border-green-500 bg-green-500/10"
                    : "border-border"
                }
            `}
        >
            <div
                className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    font-semibold

                    ${option.isCorrect
                        ? "bg-green-600 text-white"
                        : "border"
                    }
                `}
            >
                {option.optionLabel}
            </div>

            <div className="flex-1">
                {option.optionText}
            </div>
        </div>
    );
}