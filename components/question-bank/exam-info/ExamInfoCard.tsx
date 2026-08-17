"use client";

import { ExamInfo } from "@/lib/api/question-bank";
import { useRouter } from "next/navigation";

type Props = {
    examInfo: ExamInfo;
};

export default function ExamInfoCard({
    examInfo,
}: Props) {
    const router = useRouter();

    return (
        <div
            className="
            mx-auto
            max-w-xl
            rounded-3xl
            border
            bg-card
            p-8
            shadow-sm
        "
        >
            <div className="space-y-3 text-center">
                <p>
                    <span className="font-semibold">
                        Duration:
                    </span>{" "}
                    {examInfo.durationInMinutes} Minutes
                </p>

                <p>
                    <span className="font-semibold">
                        Full Marks:
                    </span>{" "}
                    {examInfo.totalMarks}
                </p>

                <p>
                    <span className="font-semibold">
                        Exam Type:
                    </span>{" "}
                    {examInfo.examType}
                </p>
            </div>

            <div className="mt-8 flex flex-col gap-4">
                <button
                    onClick={() =>
                        router.push(
                            `/student/question-bank/exam-info/${examInfo.id}/questions`
                        )
                    }
                    className="rounded-xl border py-3 font-medium hover:bg-accent"
                >
                    See Questions
                </button>

                <button
                    onClick={() =>
                        router.push(
                            `/student/question-bank/exam-info/${examInfo.id}/practice?testId=${examInfo.testId}`
                        )
                    }
                    className="rounded-xl border py-3 font-medium hover:bg-accent"
                >
                    Practice
                </button>

                <button
                    onClick={() =>
                        router.push(
                            `/student/question-bank/exam-info/${examInfo.id}/test?testId=${examInfo.testId}`
                        )
                    }
                    className="rounded-xl border py-3 font-medium hover:bg-primary hover:text-primary-foreground"
                >
                    Take Test
                </button>
            </div>
        </div>
    );
}