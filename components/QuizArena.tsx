
import React, { useState, useCallback } from 'react';
import { Question, Language } from '../types';

interface QuizArenaProps {
  language: Language;
  questions: Question[];
  onComplete: (score: number, answers: number[]) => void;
  onExit: () => void;
}

const QuizArena: React.FC<QuizArenaProps> = ({ language, questions, onComplete, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (idx: number) => {
    if (showFeedback) return;
    setSelectedOption(idx);
  };

  const handleNext = useCallback(() => {
    if (selectedOption === null) return;

    if (!showFeedback) {
      const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }
      setUserAnswers(prev => [...prev, selectedOption]);
      setShowFeedback(true);
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      onComplete(score, [...userAnswers]);
    }
  }, [selectedOption, showFeedback, currentIndex, questions.length, currentQuestion, score, userAnswers, onComplete]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onExit}
          className="text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center font-medium px-3 py-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
        >
          <i className="fa-solid fa-xmark mr-2"></i> Exit Arena
        </button>
        <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 px-4 py-1.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
          Challenge: {currentIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mb-10 overflow-hidden">
        <div 
          className="bg-indigo-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 md:p-12 shadow-xl border border-slate-200 dark:border-slate-700 transition-all">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-8 leading-snug">
          {currentQuestion.question}
        </h2>

        {currentQuestion.codeSnippet && currentQuestion.codeSnippet.trim() !== "" && (
          <div className="mb-8 rounded-2xl bg-slate-900 p-6 overflow-hidden border border-slate-700 shadow-2xl font-mono text-sm group relative">
            <div className="absolute top-3 right-4 flex space-x-1.5 opacity-40">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
            <pre className="text-indigo-200 leading-relaxed overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent pb-2 whitespace-pre">
              <code>{currentQuestion.codeSnippet}</code>
            </pre>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.correctAnswerIndex;
            
            let bgClass = "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md";
            let textClass = "text-slate-700 dark:text-slate-300";
            
            if (showFeedback) {
              if (isCorrect) {
                bgClass = "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-500 text-emerald-900 dark:text-emerald-400 shadow-sm";
                textClass = "text-emerald-900 dark:text-emerald-300 font-bold";
              } else if (isSelected && !isCorrect) {
                bgClass = "bg-red-50 dark:bg-red-900/40 border-red-500 text-red-900 dark:text-red-400 shadow-sm";
                textClass = "text-red-900 dark:text-red-300 font-bold";
              }
            } else if (isSelected) {
              bgClass = "bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500 text-indigo-900 dark:text-indigo-300 ring-2 ring-indigo-500/20";
              textClass = "text-indigo-900 dark:text-indigo-200 font-bold";
            }

            return (
              <button
                key={idx}
                disabled={showFeedback}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group ${bgClass}`}
              >
                <div className="flex items-center flex-1 pr-2">
                  <span className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-bold text-sm mr-4 transition-colors shrink-0 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-700 text-slate-500 shadow-sm border border-slate-100 dark:border-slate-600'}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className={`text-base md:text-lg leading-tight transition-colors ${textClass}`}>{option}</span>
                </div>
                {showFeedback && (isCorrect || (isSelected && !isCorrect)) && (
                  <div className="shrink-0">
                    {isCorrect ? (
                      <i className="fa-solid fa-circle-check text-emerald-500 text-xl"></i>
                    ) : (
                      <i className="fa-solid fa-circle-xmark text-red-500 text-xl"></i>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-8 p-6 md:p-8 rounded-[1.5rem] bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 text-slate-700 dark:text-slate-300 animate-in fade-in slide-in-from-top-4">
            <div className="flex items-start">
              <div className="bg-indigo-600 text-white p-2.5 rounded-xl mr-4 mt-1 shrink-0 shadow-md shadow-indigo-600/20">
                <i className="fa-solid fa-lightbulb"></i>
              </div>
              <div>
                <h4 className="font-bold text-indigo-800 dark:text-indigo-300 mb-1 uppercase tracking-wider text-xs">Explanatory Note</h4>
                <p className="text-sm md:text-base leading-relaxed">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}

        <button
          disabled={selectedOption === null}
          onClick={handleNext}
          className={`mt-10 w-full py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl text-white shadow-xl transition-all duration-300 transform active:scale-[0.98] ${
            selectedOption === null 
              ? 'bg-slate-200 dark:bg-slate-700 cursor-not-allowed text-slate-400 dark:text-slate-500' 
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-600/30'
          }`}
        >
          {showFeedback 
            ? (currentIndex === questions.length - 1 ? 'Finish Results' : 'Next Question') 
            : 'Submit Answer'}
        </button>
      </div>
    </div>
  );
};

export default QuizArena;
