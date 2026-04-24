import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const TopNav = () => {
  return (
    <div className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-8">
      <div className="flex-1"></div>
      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Global system search..." 
            className="bg-slate-800 border border-slate-700 text-sm rounded-full pl-10 pr-4 py-1.5 focus:outline-none focus:border-aureum-500 text-slate-200 w-64 transition-colors"
          />
        </div>
        <button className="text-slate-400 hover:text-aureum-500 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-aureum-500 rounded-full border-2 border-slate-900"></span>
        </button>
        <div className="flex items-center gap-3 border-l border-slate-800 pl-6 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-aureum-500 transition-colors">
            <User className="w-4 h-4 text-slate-400 group-hover:text-aureum-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
