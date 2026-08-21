"use client";

import Image from "next/image";
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
                    shrink-0
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

            <div className="flex-1 flex flex-col gap-2">
                {option.optionText && (
                    <span>{option.optionText}</span>
                )}
                {option.optionImageUrl && (
                    <div className="relative max-h-40 overflow-hidden rounded-lg">
                        <Image
                            src={option.optionImageUrl}
                            alt={`Option ${option.optionLabel}`}
                            width={400}
                            height={200}
                            className="rounded-lg max-h-40 w-auto object-contain"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}