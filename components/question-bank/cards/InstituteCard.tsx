"use client";

import Image from "next/image";
import { Institute } from "@/lib/api";
import { useRouter } from "next/navigation";
type InstituteCardProps = {
    institute: Institute;
};

export default function InstituteCard({
    institute,
}: InstituteCardProps) {
    const router = useRouter();
    return (
        <button
            className="
                group
                flex
                flex-col
                items-center
                rounded-2xl
                border
                border-white/10
                bg-[#111827]
                p-5
                transition-all
                duration-300
                hover:border-[#14B8A6]
                hover:-translate-y-1
            "
            onClick={() => {
                if (institute.hasUnits) {
                    router.push(
                        `/student/question-bank/institute/${institute.id}`
                    );
                } else {
                    router.push(
                        `/student/question-bank/institute/${institute.id}/exam-session`
                    );
                }
            }}
        >
            <div
                className="
                    flex
                    h-24
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-[#1B2435]
                "
            >
                {institute.logoUrl ? (
                    <Image
                        src={institute.logoUrl}
                        alt={institute.name}
                        width={60}
                        height={60}
                    />
                ) : (
                    <span className="text-sm text-gray-500">
                        Institute Logo
                    </span>
                )}
            </div>

            <h3 className="mt-4 text-center font-medium text-white">
                {institute.name}
            </h3>
        </button>
    );
}