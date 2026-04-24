import React from 'react';
import { LayoutDashboard, Key, ClipboardList, Shield, Settings, LogOut, HelpCircle } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'issuing', label: 'Identity Vault', icon: Key },
    { id: 'verifying', label: 'Universal Verifier', icon: Shield },
    { id: 'logs', label: 'Verification Logs', icon: ClipboardList },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-screen flex flex-col justify-between">
      <div>
        <div className="p-6">
          <h1 className="text-aureum-500 font-bold text-xl tracking-wider uppercase flex items-center gap-2">
            Aureum Identity
          </h1>
          <p className="text-slate-500 text-xs mt-1">Admin Portal</p>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'issuing' && activeTab === 'issuing') || (item.id === 'verifying' && activeTab === 'verifying');
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-aureum-500 border-r-2 border-aureum-500 bg-slate-800/50' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-6">
        <button 
          onClick={() => setActiveTab('issuing')}
          className="w-full bg-aureum-500 hover:bg-aureum-400 text-slate-900 font-semibold py-2 px-4 rounded-md transition-colors mb-4 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
        >
          <Key className="w-4 h-4" />
          Issue Credential
        </button>
        <div className="flex flex-col gap-3">
          <button className="flex items-center text-slate-400 hover:text-slate-200 text-sm transition-colors">
            <HelpCircle className="w-4 h-4 mr-2" />
            Support
          </button>
          <button className="flex items-center text-slate-400 hover:text-slate-200 text-sm transition-colors">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
