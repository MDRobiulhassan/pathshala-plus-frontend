"use client";

type Props = {
    title: string;
    value: string | number;
};

export default function DashboardCard({
    title,
    value,
}: Props) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-white/5
                bg-[#0C1120]
                p-4 md:p-6
                transition
                hover:border-[#14B8A6]/30
            "
        >
            <p className="text-xs md:text-sm text-white/50 truncate">
                {title}
            </p>

            <h2 className="mt-2 md:mt-3 text-2xl md:text-4xl font-bold text-white">
                {value}
            </h2>
        </div>
    );
}