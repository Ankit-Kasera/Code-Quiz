
import React from 'react';
import { LanguageInfo, Difficulty } from '../types';

interface QuestionCountSelectorProps {
  language: LanguageInfo;
  difficulty: Difficulty;
  onSelect: (count: number) => void;
  onBack: () => void;
}

const QuestionCountSelector: React.FC<QuestionCountSelectorProps> = ({ language, difficulty, onSelect, onBack }) => {
  const counts = [5, 10, 25];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
      >
        <i className="fa-solid fa-arrow-left mr-2"></i> Back to Difficulty
      </button>

      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-3 mb-4">
            <img src={language.logoUrl} alt="" className="w-10 h-10 object-contain" />
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-bold uppercase tracking-wider">
                {difficulty}
            </span>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          How many challenges?
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Select the length of your session for {language.name}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        {counts.map((count) => (
          <button
            key={count}
            onClick={() => onSelect(count)}
            className="group relative p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-xl text-center"
          >
            <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400 mb-2 group-hover:scale-110 transition-transform">
              {count}
            </div>
            <div className="text-slate-500 dark:text-slate-400 font-semibold uppercase text-xs tracking-[0.2em]">
              Questions
            </div>
            <div className="mt-6 inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <i className="fa-solid fa-play ml-1"></i>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCountSelector;
