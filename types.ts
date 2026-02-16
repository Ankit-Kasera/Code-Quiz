
export type Language = 'C' | 'C++' | 'HTML' | 'CSS' | 'JavaScript' | 'PHP' | 'C#' | 'Java' | 'Python';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  codeSnippet?: string;
}

export interface QuizState {
  language: Language | null;
  difficulty: Difficulty | null;
  questionCount: number;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  userAnswers: number[];
  isCompleted: boolean;
  isLoading: boolean;
  error: string | null;
  step: 'language' | 'difficulty' | 'count' | 'quiz' | 'results';
}

export interface LanguageInfo {
  id: Language;
  name: string;
  logoUrl: string;
  color: string;
  description: string;
}
