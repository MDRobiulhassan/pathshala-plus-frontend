"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Props = {
    label?: string;
    fallbackHref?: string;
};

export default function BackButton({
    label = "Back",
    fallbackHref,
}: Props) {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else if (fallbackHref) {
            router.push(fallbackHref);
        }
    };

    return (
        <button
            onClick={handleBack}
            className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                px-4
                py-2
                transition
                hover:bg-muted
            "
        >
            <ArrowLeft className="h-4 w-4" />

            <span>{label}</span>
        </button>
    );
}