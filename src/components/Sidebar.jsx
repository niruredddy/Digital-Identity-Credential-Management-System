import React from 'react';
import { LayoutDashboard, Key, Shield, ClipboardList, Settings, LogOut, HelpCircle, User, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'issuing', label: 'Identity Vault', icon: Key },
    { id: 'verifying', label: 'Universal Verifier', icon: Shield },
    { id: 'logs', label: 'Verification Logs', icon: ClipboardList },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-screen flex flex-col justify-between shadow-2xl relative z-20">
      <div>
        <div className="p-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-aureum-500 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <Shield className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h1 className="text-sm font-black text-aureum-500 uppercase tracking-tighter leading-none">Aureum Identity</h1>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Admin Portal</span>
            </div>
          </div>
        </div>

        <nav className="px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-xs font-semibold transition-all rounded-lg group ${
                  isActive 
                    ? 'text-aureum-500 bg-aureum-500/10 border border-aureum-500/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-aureum-500' : 'text-slate-500 group-hover:text-slate-300'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4">
        <button 
          onClick={() => setActiveTab('issuing')}
          className="w-full py-3 bg-aureum-500 hover:bg-aureum-400 text-slate-900 font-bold rounded-lg text-xs transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Key className="w-3.5 h-3.5" />
          Issue Credential
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
