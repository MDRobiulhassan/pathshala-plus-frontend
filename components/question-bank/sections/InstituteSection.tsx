"use client";

import { Institute } from "@/lib/api";
import InstituteCard from "../cards/InstituteCard";
import Loader from "@/components/ui/Loader";

type InstituteSectionProps = {
    institutes: Institute[];
    loading: boolean;
    error: string | null;
};

export default function InstituteSection({
    institutes,
    loading,
    error,
}: InstituteSectionProps) {
    return (
        <section className="space-y-5">
            <div>
                <h2 className="text-2xl font-semibold text-white">
                    Institute Wise Questions
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    See previous questions institute wise
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

                {!loading && !error && institutes.length === 0 && (
                    <div className="py-12 text-center text-gray-400">
                        No institutes found.
                    </div>
                )}

                {!loading && !error && institutes.length > 0 && (
                    <div
                        className="
                    grid
                    grid-cols-1
                    gap-8
                    sm:grid-cols-2
                    lg:grid-cols-3
                "
                    >
                        {institutes.map((institute) => (
                            <InstituteCard
                                key={institute.id}
                                institute={institute}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}