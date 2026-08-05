"use client";

import { Subject } from "@/lib/api";
import SubjectCard from "../cards/SubjectCard";
import Loader from "@/components/ui/Loader";

type SubjectSectionProps = {
    subjects: Subject[];
    loading: boolean;
    error: string | null;
};

export default function SubjectSection({
    subjects,
    loading,
    error,
}: SubjectSectionProps) {
    return (
        <section className="space-y-5">

            <div>
                <h2 className="text-2xl font-semibold text-white">
                    Subject Wise Questions
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    See previous questions subject wise
                </p>
            </div>

            <div
                className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-[#0C1120]
                    p-8
                "
            >
                {loading && (
                    <div className="py-12 text-center text-gray-400">
                        <Loader />
                    </div>
                )}

                {!loading && error && (
                    <div className="py-12 text-center text-red-400">
                        {error}
                    </div>
                )}

                {!loading &&
                    !error &&
                    subjects.length === 0 && (
                        <div className="py-12 text-center text-gray-400">
                            No subjects found.
                        </div>
                    )}

                {!loading &&
                    !error &&
                    subjects.length > 0 && (
                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-8
                                sm:grid-cols-2
                                lg:grid-cols-3
                            "
                        >
                            {subjects.map((subject) => (
                                <SubjectCard
                                    key={subject.subjectId}
                                    subject={subject}
                                />
                            ))}
                        </div>
                    )}
            </div>

        </section>
    );
}