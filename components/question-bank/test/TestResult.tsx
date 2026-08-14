"use client";

import { Question, QuestionOption } from "@/lib/api";

type Props = {
    questions: Question[];
    answers: Record<number, number>;
    duration: number;
    onRetry: () => void;
};

function getScore(questions: Question[], answers: Record<number, number>) {
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    for (const question of questions) {
        const selectedOptionId = answers[question.questionId];
        if (selectedOptionId === undefined) {
            unattempted++;
        } else {
            const correctOption = question.options.find(
                (o: QuestionOption) => o.isCorrect
            );
            if (correctOption && correctOption.optionId === selectedOptionId) {
                correct++;
            } else {
                wrong++;
            }
        }
    }

    return { correct, wrong, unattempted };
}

export default function TestResult({ questions, answers, duration, onRetry }: Props) {
    const { correct, wrong, unattempted } = getScore(questions, answers);
    const total = questions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passed = percentage >= 40;

    return (
        <div className="mx-auto max-w-xl space-y-8 py-10">
            <div className="rounded-3xl border bg-card p-8 text-center space-y-4">
                <h1 className="text-3xl font-bold">Test Completed</h1>

                <div
                    className={`text-6xl font-extrabold ${
                        passed ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {percentage}%
                </div>

                <p className="text-muted-foreground">
                    {passed ? "🎉 You passed!" : "😔 Better luck next time."}
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-2xl border bg-card p-6">
                    <p className="text-2xl font-bold text-green-500">{correct}</p>
                    <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="rounded-2xl border bg-card p-6">
                    <p className="text-2xl font-bold text-red-500">{wrong}</p>
                    <p className="text-sm text-muted-foreground">Wrong</p>
                </div>
                <div className="rounded-2xl border bg-card p-6">
                    <p className="text-2xl font-bold text-yellow-500">{unattempted}</p>
                    <p className="text-sm text-muted-foreground">Skipped</p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <button
                    onClick={onRetry}
                    className="rounded-xl border py-3 font-medium hover:bg-accent transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
