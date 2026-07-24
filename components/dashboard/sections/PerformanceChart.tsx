"use client";

import {
    LineChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

type Test = {
    attemptId: number;
    score: number;
};

type Props = {
    tests: Test[];
};

export default function PerformanceChart({ tests }: Props) {
    const data = [...tests]
        .reverse()
        .map((test, index) => ({
            attempt: index + 1,
            score: test.score,
        }));

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: -20,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid
                        stroke="#1f2937"
                        strokeDasharray="4 4"
                    />

                    <XAxis
                        dataKey="attempt"
                        tick={{ fill: "#94A3B8", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tick={{ fill: "#94A3B8", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        contentStyle={{
                            background: "#0C1120",
                            border: "1px solid #1E293B",
                            borderRadius: 12,
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#14B8A6"
                        strokeWidth={3}
                        dot={{
                            r: 5,
                            fill: "#14B8A6",
                        }}
                        activeDot={{
                            r: 7,
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}