import { Suspense } from "react";
import TestPage from "@/components/question-bank/test/TestPage";
import Loader from "@/components/ui/Loader";

export default function Page() {
    return (
        <Suspense fallback={
            <div className="flex h-96 items-center justify-center">
                <Loader />
            </div>
        }>
            <TestPage />
        </Suspense>
    );
}