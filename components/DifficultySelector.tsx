
import React from 'react';
import { Difficulty, LanguageInfo } from '../types';

interface DifficultySelectorProps {
  language: LanguageInfo;
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ language, onSelect, onBack }) => {
  const difficulties: { id: Difficulty; label: string; icon: string; desc: string; color: string }[] = [
    { 
      id: 'Beginner', 
      label: 'Beginner', 
      icon: 'fa-seedling', 
      desc: 'Focus on syntax, fundamental logic, and basic building blocks.',
      color: 'bg-emerald-500' 
    },
    { 
      id: 'Intermediate', 
      label: 'Intermediate', 
      icon: 'fa-gears', 
      desc: 'Test your knowledge of common patterns, APIs, and data structures.',
      color: 'bg-amber-500' 
    },
    { 
      id: 'Advanced', 
      label: 'Advanced', 
      icon: 'fa-bolt', 
      desc: 'Challenge yourself with complex architecture, performance, and deep internals.',
      color: 'bg-rose-500' 
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
      >
        <i className="fa-solid fa-arrow-left mr-2"></i> Back to Languages
      </button>

      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white dark:bg-slate-800 mx-auto mb-4 shadow-lg border border-slate-100 dark:border-slate-700 p-3">
          <img 
            src={language.logoUrl} 
            alt={`${language.name} logo`} 
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          Choose Your Level
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Select the challenge level for {language.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {difficulties.map((diff) => (
          <button
            key={diff.id}
            onClick={() => onSelect(diff.id)}
            className="group p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-xl text-left"
          >
            <div className={`${diff.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6`}>
              <i className={`fa-solid ${diff.icon} text-xl`}></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{diff.label}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">{diff.desc}</p>
            <div className="text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center">
              Start Challenge <i className="fa-solid fa-chevron-right ml-2 text-xs group-hover:translate-x-1 transition-transform"></i>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
