"use client";

import Image from "next/image";
import { Subject } from "@/lib/api";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";

type SubjectCardProps = {
    subject: Subject;
};

export default function SubjectCard({
    subject,
}: SubjectCardProps) {
    const router = useRouter();

    return (
        <button
            onClick={() =>
                router.push(
                    `/student/question-bank/subject/${subject.subjectId}`
                )
            }
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
                cursor-pointer
            "
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
                    overflow-hidden
                    p-3
                "
            >
                {subject.logoUrl ? (
                    <Image
                        src={subject.logoUrl}
                        alt={subject.subjectName}
                        width={60}
                        height={60}
                        className="object-contain max-h-16"
                    />
                ) : (
                    <BookOpen className="h-10 w-10 text-white/40" />
                )}
            </div>

            <h3 className="mt-4 text-center font-medium text-white">
                {subject.subjectName}
            </h3>
        </button>
    );
}