"use client";

type LearningProgress = {
    totalTestsTaken: number;
    averageScore: number;
    highestScore: number;
    questionsSolved: number;
    accuracyPercentage: number;
    studyStreak: number;
};

type Props = {
    learningProgress: LearningProgress;
};

export default function LearningProgressCard({
    learningProgress,
}: Props) {
    const level = Math.min(
        Math.round(learningProgress.averageScore),
        100
    );

    return (
        <div className="rounded-2xl border border-white/5 bg-[#0C1120] p-6 h-[260px] flex flex-col">
            <h2 className="text-xl font-bold text-white">
                Learning Progress
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                    <p className="text-sm text-white/50">
                        Highest Score
                    </p>

                    <h3 className="mt-2 text-4xl font-bold text-white">
                        {learningProgress.highestScore}%
                    </h3>
                </div>

                <div>
                    <p className="text-sm text-white/50">
                        Questions Solved
                    </p>

                    <h3 className="mt-2 text-4xl font-bold text-white">
                        {learningProgress.questionsSolved}
                    </h3>
                </div>
            </div>

            <div className="mt-auto">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">
                        Practice Level
                    </span>

                    <span className="text-[#14B8A6] font-semibold">
                        {level}%
                    </span>
                </div>

                <div className="mt-3 h-3 rounded-full bg-white/10 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-[#14B8A6] transition-all duration-500"
                        style={{
                            width: `${level}%`,
                        }}
                    />
                </div>

                <p className="mt-3 text-sm text-white/40">
                    Keep practicing to improve your score.
                </p>
            </div>
        </div>
    );
}