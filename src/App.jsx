import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import IssuingView from './components/IssuingView';
import VerifyingView from './components/VerifyingView';

function App() {
  const [activeTab, setActiveTab] = useState('issuing'); // 'issuing', 'verifying', 'overview', 'logs', 'settings'

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans antialiased">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNav />
        
        <main className="flex-1 overflow-y-auto bg-[#020617]">
          {activeTab === 'issuing' && <IssuingView />}
          {activeTab === 'verifying' && <VerifyingView />}
          
          {/* Placeholders for other tabs */}
          {activeTab === 'overview' && (
            <div className="p-8 flex items-center justify-center h-full text-slate-500">Executive Overview (Coming Soon)</div>
          )}
          {activeTab === 'logs' && (
            <div className="p-8 flex items-center justify-center h-full text-slate-500">Verification Logs (Coming Soon)</div>
          )}
          {activeTab === 'settings' && (
            <div className="p-8 flex items-center justify-center h-full text-slate-500">System Settings (Coming Soon)</div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
