import React from 'react';
import { Bell, Search, User, ShieldCheck } from 'lucide-react';
import { auth } from '../firebase';

const TopNav = ({ setActiveTab }) => {
  return (
    <div className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-8 flex items-center justify-between relative z-10">
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-aureum-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Global system search..." 
            className="w-full bg-slate-950/50 border border-slate-800 rounded-full py-1.5 pl-10 pr-4 text-xs text-slate-300 focus:outline-none focus:border-aureum-500/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Network Secure</span>
        </div>

        <div className="flex items-center gap-4 border-l border-slate-800 pl-6">
          <button className="relative text-slate-400 hover:text-aureum-500 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-aureum-500 rounded-full border-2 border-slate-900"></span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:border-aureum-500 transition-all shadow-inner overflow-hidden"
          >
            {auth.currentUser?.photoURL ? (
              <img src={auth.currentUser.photoURL} className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
