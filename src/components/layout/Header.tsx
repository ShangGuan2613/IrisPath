import React from 'react';
import { Eye, Sparkles, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 flex-shrink-0 z-50 shadow-sm relative">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-iris-500 to-indigo-700 rounded-lg flex items-center justify-center text-white shadow-lg shadow-iris-200">
          <Eye className="w-5 h-5" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1">
            <h1 className="font-bold text-base tracking-tight text-slate-900">Iris<span className="text-iris-600">Path</span></h1>
            <span className="text-[9px] text-iris-500 font-mono px-1 bg-iris-50 rounded border border-iris-100">PRO</span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium">Multimodal Pathology Agent</span>
        </div>
      </div>
      
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
        <button className="px-3 py-1 bg-white shadow-sm rounded-md text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all">
          <Sparkles className="w-3 h-3 text-iris-500" />
          Iris-V4 (Logic)
        </button>
        <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-slate-700 transition-all">
          Fast-V2
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 text-[10px] text-gray-400">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          System Operational
        </div>
        <div className="w-px h-4 bg-gray-200"></div>
        <div className="w-8 h-8 bg-slate-800 rounded-full text-white flex items-center justify-center text-xs font-bold ring-2 ring-white shadow-md">
          YY
        </div>
      </div>
    </header>
  );
};

export default Header;
