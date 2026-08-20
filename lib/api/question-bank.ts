import api, { getApiErrorMessage } from "./client";

export type Institute = {
  id: number;
  name: string;
  shortName: string;
  logoUrl: string | null;
  hasUnits: boolean;
};

export type Subject = {
  subjectId: number;
  subjectName: string;
  educationLevelId: number;
  logoUrl?: string | null;
};

export type Unit = {
  id: number;
  name: string;
  instituteId: number;
};

export type ExamSession = {
  id: number;
  sessionLabel: string;
  startYear: number;
  endYear: number | null;
  instituteId: number;
  unitId: number | null;
  hasShift: boolean;
};

export type Shift = {
  id: number;
  shiftNumber: number;
};

export type ExamInfo = {
  id: number;
  testId: number;
  examType: string;
  totalMarks: number;
  durationInMinutes: number;
};

export type QuestionOption = {
  optionId: number;
  optionLabel: string;
  optionText: string;
  optionImageUrl: string | null;
  isCorrect: boolean;
};

export type Question = {
  questionId: number;
  questionText: string;
  questionImageUrl: string | null;
  explanation: string | null;
  difficulty: string;
  isApproved: boolean;
  instituteName: string | null;
  unitName: string | null;
  sessionLabel: string | null;
  options: QuestionOption[];
};

export type Passage = {
  passageId: number | null;
  passageText: string | null;
  passageImageUrl: string | null;
  questions: Question[];
};

export type SubjectQuestionResponse = {
  subjectId: number;
  subjectName: string;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  passages: Passage[];
};

export type Chapter = {
  chapterId: number | null;
  chapterName: string | null;
  passages: Passage[];
};

export type SubjectQuestions = {
  subjectId: number;
  subjectName: string;
  chapters: Chapter[];
};

export type ExamQuestionResponse = {
  examInfo: {
    examInfoId: number;
    examType: string;
    totalMarks: number;
    durationInMinutes: number;
  };
  languageCode: string;
  subjects: SubjectQuestions[];
};

export type DashboardResponse = {
  continueLearning: {
    subject?: string;
    chapter?: string;
    progress?: number;
  } | null;
  learningProgress: {
    totalTestsTaken: number;
    averageScore: number;
    highestScore: number;
    questionsSolved: number;
    accuracyPercentage: number;
    studyStreak: number;
  };
  recentTests: Array<{
    attemptId: number;
    testId: number;
    testName: string;
    score: number;
    passed: boolean;
    finishedAt: string | null;
  }>;
};

export type UserAttemptItem = {
  attemptId: number;
  testId: number;
  testName: string;
  score: number;
  passed: boolean;
  finishedAt: string | null;
  timeTakenInSeconds?: number;
};

export async function getStudentDashboard(): Promise<DashboardResponse> {
  try {
    const response = await api.get("/dashboard/student");
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch dashboard"));
  }
}

export async function getUserTestAttempts(): Promise<UserAttemptItem[]> {
  try {
    const response = await api.get("/tests/users/me/attempts");
    return response.data.data.attempts || [];
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch user test attempts"));
  }
}

export async function getInstitutes(educationLevelId: number): Promise<Institute[]> {
  try {
    const response = await api.get(`/${educationLevelId}/institutes`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch institutes"));
  }
}

export async function getSubjects(educationLevelId: number): Promise<Subject[]> {
  try {
    const response = await api.get(`/subjects/education-level/${educationLevelId}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch subjects"));
  }
}

export async function getUnits(instituteId: number): Promise<Unit[]> {
  try {
    const response = await api.get(`/institutes/${instituteId}/units`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch units"));
  }
}

export async function getExamSessions(instituteId: number): Promise<ExamSession[]> {
  try {
    const response = await api.get(`/institutes/${instituteId}/exam-sessions`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch exam sessions"));
  }
}

export async function getSubjectQuestions(subjectId: number, page = 0, size = 20): Promise<SubjectQuestionResponse> {
  try {
    const response = await api.get(`/questions/subject/${subjectId}`, {
      params: { page, size },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch questions"));
  }
}

export async function getInstituteExamSessions(instituteId: number): Promise<ExamSession[]> {
  try {
    const response = await api.get(`/institutes/${instituteId}/exam-sessions`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch institute exam sessions"));
  }
}

export async function getUnitExamSessions(instituteId: number, unitId: number): Promise<ExamSession[]> {
  try {
    const response = await api.get(`/institutes/${instituteId}/units/${unitId}/exam-sessions`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch unit exam sessions"));
  }
}

export async function getShifts(unitId: number, examSessionId: number): Promise<Shift[]> {
  try {
    const response = await api.get(`/units/${unitId}/exam-sessions/${examSessionId}/shifts`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch shifts"));
  }
}

export async function getExamInfoByExamSession(examSessionId: number): Promise<ExamInfo[]> {
  try {
    const response = await api.get(`/exam-session/${examSessionId}/exam-info`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch exam info"));
  }
}

export async function getExamInfoByUnit(unitId: number, examSessionId: number): Promise<ExamInfo[]> {
  try {
    const response = await api.get(`/unit/${unitId}/exam-session/${examSessionId}/exam-info`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch exam info"));
  }
}

export async function getExamInfoByShift(examSessionId: number, shiftId: number): Promise<ExamInfo[]> {
  try {
    const response = await api.get(`/exam-session/${examSessionId}/shift/${shiftId}/exam-info`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch shift exam info"));
  }
}

export async function getExamQuestions(examInfoId: number): Promise<ExamQuestionResponse> {
  try {
    const response = await api.get(`/exam-info/${examInfoId}/questions`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch exam questions"));
  }
}

/* ============================================================================
 * TEST CONTROLLER (TIMED & PRACTICE ATTEMPTS)
 * ============================================================================ */

export type TestAttemptInit = {
  attemptId: number;
  testId: number;
  startedAt: string;
  finishedAt: string | null;
  score: number;
  completed: boolean;
  resumed: boolean;
};

export type TestAttemptOption = {
  optionId: number;
  optionLabel: string;
  optionText: string;
  optionImageUrl: string | null;
  selected: boolean;
  isCorrect?: boolean;
  correctOption?: boolean;
};

export type TestAttemptQuestion = {
  questionId: number;
  questionText: string;
  questionImageUrl: string | null;
  difficulty: string;
  explanation?: string | null;
  options: TestAttemptOption[];
};

export type TestAttemptPassage = {
  passageId: number | null;
  passageText: string | null;
  passageImageUrl: string | null;
  questions: TestAttemptQuestion[];
};

export type TestAttemptChapter = {
  chapterId: number | null;
  chapterName: string | null;
  passages: TestAttemptPassage[];
};

export type TestAttemptSubject = {
  subjectId: number;
  subjectName: string;
  chapters: TestAttemptChapter[];
};

export type TestAttemptDetails = {
  testInfo: {
    attemptId: number;
    examInfoId: number;
    testName: string;
    testTypeName: "TIMED" | "PRACTICE" | string;
    examType: string;
    totalQuestions: number;
    totalMarks: number;
    durationInMinutes: number;
    marksPerQuestion: number;
    negativeMarksPerQuestion: number;
    passingMarks: number;
    startedAt?: string | null;
  };
  languageCode: string;
  subjects: TestAttemptSubject[];
};

export type SaveAnswerItem = {
  questionId: number;
  selectedOptionId: number;
};

export type TestResultOption = {
  optionId: number;
  optionLabel: string;
  optionText: string;
  optionImageUrl: string | null;
  selected: boolean;
  correctOption: boolean;
};

export type TestResultQuestion = {
  questionId: number;
  questionText: string;
  questionImageUrl: string | null;
  difficulty: string;
  explanation: string | null;
  isCorrect: boolean | null;
  marksAwarded: number;
  options: TestResultOption[];
};

export type TestResultPassage = {
  passageId: number | null;
  passageText: string | null;
  passageImageUrl: string | null;
  questions: TestResultQuestion[];
};

export type TestResultChapter = {
  chapterId: number | null;
  chapterName: string | null;
  passages: TestResultPassage[];
};

export type TestResultSubject = {
  subjectId: number;
  subjectName: string;
  chapters: TestResultChapter[];
};

export type TestAttemptResult = {
  summary: {
    attemptId: number;
    testId: number;
    testName: string;
    score: number;
    totalMarks: number;
    passMarks: number;
    passed: boolean;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    unansweredQuestions: number;
    startedAt: string;
    finishedAt: string;
  };
  subjects: TestResultSubject[];
};

export async function createOrResumeTestAttempt(testId: number): Promise<TestAttemptInit> {
  try {
    const response = await api.post(`/tests/${testId}/attempts`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to start test attempt"));
  }
}

export async function getTestAttemptWithQuestions(attemptId: number): Promise<TestAttemptDetails> {
  try {
    const response = await api.get(`/tests/attempts/${attemptId}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to load test attempt questions"));
  }
}

export async function saveTestProgress(attemptId: number, answers: SaveAnswerItem[]): Promise<void> {
  try {
    await api.patch(`/tests/attempts/${attemptId}/answers`, { answers });
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to save test progress"));
  }
}

export async function submitTestAttempt(attemptId: number): Promise<void> {
  try {
    await api.post(`/tests/attempts/${attemptId}/submit`);
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to submit test attempt"));
  }
}

export async function getTestAttemptResult(attemptId: number): Promise<TestAttemptResult> {
  try {
    const response = await api.get(`/tests/attempts/${attemptId}/result`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(getApiErrorMessage(error, "Failed to load test attempt result"));
  }
}
