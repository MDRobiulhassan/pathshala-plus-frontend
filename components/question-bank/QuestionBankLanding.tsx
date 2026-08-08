"use client";

import { useInstitutes } from "@/hooks/question-bank/useInstitutes";
import { useSubjects } from "@/hooks/question-bank/useSubjects";

import InstituteSection from "./sections/InstituteSection";
import SubjectSection from "./sections/SubjectSection";
import BackButton from "../ui/BackButton";

export default function QuestionBankLanding() {
    const {
        institutes,
        loading: instituteLoading,
        error: instituteError,
    } = useInstitutes();

    const {
        subjects,
        loading: subjectLoading,
        error: subjectError,
    } = useSubjects();

    return (
        <div className="space-y-14">
            <BackButton />
            <InstituteSection
                institutes={institutes}
                loading={instituteLoading}
                error={instituteError}
            />

            <SubjectSection
                subjects={subjects}
                loading={subjectLoading}
                error={subjectError}
            />
        </div>
    );
}