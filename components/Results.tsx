
import React from 'react';
import { Language } from '../types';

interface ResultsProps {
  score: number;
  total: number;
  language: Language;
  onRestart: () => void;
  onExit: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, total, language, onRestart, onExit }) => {
  const percentage = (score / total) * 100;
  
  let title = "Keep Learning!";
  let icon = "fa-face-smile";
  let color = "text-orange-500";

  if (percentage >= 80) {
    title = "Excellent Work!";
    icon = "fa-trophy";
    color = "text-yellow-500";
  } else if (percentage >= 50) {
    title = "Good Progress!";
    icon = "fa-medal";
    color = "text-indigo-500";
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className={`text-6xl mb-6 ${color}`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-10">
        You've completed the {language} quiz challenge.
      </p>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-xl border border-slate-200 dark:border-slate-700 mb-10">
        <div className="text-6xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
          {score} / {total}
        </div>
        <div className="text-lg font-medium text-slate-500 dark:text-slate-400">
          Correct Answers
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{percentage}%</div>
            <div className="text-xs text-slate-500">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{total}</div>
            <div className="text-xs text-slate-500">Questions</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRestart}
          className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Retake Quiz
        </button>
        <button
          onClick={onExit}
          className="flex-1 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
        >
          Choose Another Language
        </button>
      </div>
    </div>
  );
};

export default Results;
