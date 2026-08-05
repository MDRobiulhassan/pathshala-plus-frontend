"use client";

import Timer from "./Timer";

type Props = {
    current: number;
    total: number;
    duration: number;
    onSubmit: () => void;
};

export default function TestFooter({
    current,
    total,
    duration,
    onSubmit,
}: Props) {
    return (
        <div
            className="
            sticky
            bottom-0
            z-20
            mt-10
            rounded-xl
            border
            bg-background
            p-4
            "
        >
            <div className="flex items-center justify-between">
                <Timer duration={duration} />

                <button
                    onClick={onSubmit}
                    className="
                    rounded-lg
                    bg-primary
                    px-8
                    py-2
                    text-primary-foreground
                    "
                >
                    Submit
                </button>

                <div>
                    {current}/{total}
                </div>
            </div>
        </div>
    );
}