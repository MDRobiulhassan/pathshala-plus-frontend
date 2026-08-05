"use client";

type Props = {
    title: string;
    duration: number;
    totalMarks: number;
    negativeMark?: number;
};

export default function TestHeader({
    title,
    duration,
    totalMarks,
    negativeMark = 0,
}: Props) {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-center">
                {title}
            </h1>

            <div className="flex justify-center gap-16 text-sm">
                <div>
                    <span className="font-semibold">
                        Duration:
                    </span>{" "}
                    {duration} Minutes
                </div>

                <div>
                    <span className="font-semibold">
                        Full Marks:
                    </span>{" "}
                    {totalMarks}
                </div>

                <div>
                    <span className="font-semibold">
                        Negative:
                    </span>{" "}
                    {negativeMark}
                </div>
            </div>
        </div>
    );
}