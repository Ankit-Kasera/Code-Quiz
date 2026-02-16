
import React from 'react';
import { LanguageInfo } from '../types';

interface LanguageCardProps {
  language: LanguageInfo;
  onSelect: (id: LanguageInfo['id']) => void;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(language.id)}
      className="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-slate-700 p-2 mb-4 shadow-inner border border-slate-100 dark:border-slate-600 group-hover:scale-110 transition-transform duration-300`}>
        <img 
          src={language.logoUrl} 
          alt={`${language.name} logo`} 
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{language.name}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
        {language.description}
      </p>
      
      <div className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
        Start Quiz <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
      </div>
    </div>
  );
};

export default LanguageCard;
