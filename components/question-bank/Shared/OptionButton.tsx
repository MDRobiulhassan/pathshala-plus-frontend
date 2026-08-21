"use client";

import Image from "next/image";

type Props = {
    label: string;
    text: string;
    imageUrl?: string | null;
    selected?: boolean;
    onClick?: () => void;
};

export default function OptionButton({
    label,
    text,
    imageUrl,
    selected = false,
    onClick,
}: Props) {
    return (
        <button
            onClick={onClick}
            className={`
                flex
                items-start
                gap-4
                rounded-xl
                border
                p-4
                transition-all
                duration-200
                text-left

                ${selected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary"
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
                    border
                    font-semibold

                    ${selected
                        ? "border-primary bg-primary text-white"
                        : ""
                    }
                `}
            >
                {label}
            </div>

            <div className="flex-1 flex flex-col gap-2">
                {text && <span>{text}</span>}
                {imageUrl && (
                    <div className="relative max-h-40 overflow-hidden rounded-lg">
                        <Image
                            src={imageUrl}
                            alt={`Option ${label}`}
                            width={400}
                            height={200}
                            className="rounded-lg max-h-40 w-auto object-contain"
                        />
                    </div>
                )}
            </div>
        </button>
    );
}