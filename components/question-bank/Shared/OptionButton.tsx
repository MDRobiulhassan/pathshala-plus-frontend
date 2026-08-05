"use client";

type Props = {
    label: string;
    text: string;
    selected?: boolean;
    onClick?: () => void;
};

export default function OptionButton({
    label,
    text,
    selected = false,
    onClick,
}: Props) {
    return (
        <button
            onClick={onClick}
            className={`
                flex
                items-center
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

            <span>{text}</span>
        </button>
    );
}