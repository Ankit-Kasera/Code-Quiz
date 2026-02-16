
import React, { useState, useEffect, useCallback } from 'react';
import { Language, QuizState, Difficulty } from './types';
import { LANGUAGES } from './constants';
import Navbar from './components/Navbar';
import LanguageCard from './components/LanguageCard';
import DifficultySelector from './components/DifficultySelector';
import QuestionCountSelector from './components/QuestionCountSelector';
import QuizArena from './components/QuizArena';
import Results from './components/Results';
import { generateQuizQuestions } from './services/geminiService';

const App: React.FC = () => {
  const [darkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [quizState, setQuizState] = useState<QuizState>({
    language: null,
    difficulty: null,
    questionCount: 10,
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    userAnswers: [],
    isCompleted: false,
    isLoading: false,
    error: null,
    step: 'language',
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLanguageSelect = (id: Language) => {
    setQuizState(prev => ({ ...prev, language: id, step: 'difficulty', error: null }));
  };

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setQuizState(prev => ({ ...prev, difficulty, step: 'count', error: null }));
  };

  const handleCountSelect = async (count: number) => {
    const { language, difficulty } = quizState;
    if (!language || !difficulty) return;

    setQuizState(prev => ({ ...prev, questionCount: count, isLoading: true, error: null }));
    
    try {
      const questions = await generateQuizQuestions(language, difficulty, count);
      setQuizState(prev => ({ 
        ...prev, 
        questions, 
        isLoading: false, 
        step: 'quiz' 
      }));
    } catch (err: any) {
      setQuizState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: err.message || "Failed to load the quiz. Please try again." 
      }));
    }
  };

  const handleQuizComplete = (finalScore: number, answers: number[]) => {
    setQuizState(prev => ({
      ...prev,
      score: finalScore,
      userAnswers: answers,
      isCompleted: true,
      step: 'results'
    }));
  };

  const resetQuiz = () => {
    setQuizState({
      language: null,
      difficulty: null,
      questionCount: 10,
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      userAnswers: [],
      isCompleted: false,
      isLoading: false,
      error: null,
      step: 'language',
    });
  };

  const handleRetry = () => {
    if (quizState.language && quizState.difficulty) {
      handleCountSelect(quizState.questionCount);
    }
  };

  const selectedLanguageInfo = LANGUAGES.find(l => l.id === quizState.language);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500 ease-in-out">
      <Navbar onReset={resetQuiz} />

      <main className="max-w-6xl mx-auto py-8">
        {quizState.isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 animate-in fade-in duration-500">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-100 dark:border-slate-800 rounded-full"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-8 text-xl font-bold text-slate-800 dark:text-slate-200 animate-pulse">
              Synthesizing challenges...
            </p>
          </div>
        ) : quizState.error ? (
          <div className="max-w-md mx-auto px-4 text-center py-20 animate-in slide-in-from-top-10">
            <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-2xl">
              <div className="text-red-500 text-5xl mb-6"><i className="fa-solid fa-triangle-exclamation"></i></div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Arena Fault</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">{quizState.error}</p>
              <button onClick={handleRetry} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                Retry Generation
              </button>
            </div>
          </div>
        ) : quizState.step === 'results' ? (
          <Results 
            score={quizState.score} 
            total={quizState.questions.length} 
            language={quizState.language!} 
            onRestart={handleRetry}
            onExit={resetQuiz}
          />
        ) : quizState.step === 'quiz' ? (
          <QuizArena 
            language={quizState.language!}
            questions={quizState.questions}
            onComplete={handleQuizComplete}
            onExit={resetQuiz}
          />
        ) : quizState.step === 'count' && selectedLanguageInfo ? (
          <QuestionCountSelector 
            language={selectedLanguageInfo}
            difficulty={quizState.difficulty!}
            onSelect={handleCountSelect}
            onBack={() => setQuizState(prev => ({ ...prev, step: 'difficulty' }))}
          />
        ) : quizState.step === 'difficulty' && selectedLanguageInfo ? (
          <DifficultySelector 
            language={selectedLanguageInfo}
            onSelect={handleDifficultySelect}
            onBack={() => setQuizState(prev => ({ ...prev, step: 'language', language: null }))}
          />
        ) : (
          <div className="px-4 animate-in fade-in duration-1000">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                Modern <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">Dev Quiz</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                Test your engineering skills across 9 core technologies with dynamic, AI-powered challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {LANGUAGES.map((lang) => (
                <LanguageCard key={lang.id} language={lang} onSelect={handleLanguageSelect} />
              ))}
            </div>

            <footer className="mt-24 text-center pb-12">
              <div className="inline-flex items-center space-x-2 text-slate-400 dark:text-slate-500 text-sm font-medium">
                <i className="fa-solid fa-code text-indigo-500"></i>
                <span>Powered by Gemini AI Engine</span>
              </div>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
