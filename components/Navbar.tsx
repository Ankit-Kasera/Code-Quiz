
import React from 'react';

interface NavbarProps {
  onReset: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onReset }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 py-4 transition-all duration-500">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={onReset}
        >
          <div className="bg-indigo-600 text-white w-10 h-10 rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center transition-transform group-hover:scale-110">
            <i className="fa-solid fa-terminal text-lg"></i>
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white hidden sm:block">
            CodeMaster <span className="text-indigo-600">Arena</span>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
             <i className="fa-solid fa-bolt text-indigo-500 mr-1"></i> 
             Engine Active
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
