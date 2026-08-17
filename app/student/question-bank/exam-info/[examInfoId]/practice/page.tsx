import { Suspense } from "react";
import PracticePage from "@/components/question-bank/practice/PracticePage";
import Loader from "@/components/ui/Loader";

export default function Page() {
    return (
        <Suspense fallback={
            <div className="flex h-96 items-center justify-center">
                <Loader />
            </div>
        }>
            <PracticePage />
        </Suspense>
    );
}