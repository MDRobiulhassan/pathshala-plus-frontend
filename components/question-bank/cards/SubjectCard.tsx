"use client";

import { Subject } from "@/lib/api";
import { useRouter } from "next/navigation";

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
                "
            >
                <span className="text-sm text-gray-500">
                    Subject Icon
                </span>
            </div>

            <h3 className="mt-4 text-center font-medium text-white">
                {subject.subjectName}
            </h3>
        </button >
    );
}