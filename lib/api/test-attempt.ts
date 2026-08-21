import api, { getApiErrorMessage } from "./client";

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
