import React, { useState } from 'react';
import { Shield, Database, Lock, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_Service } from '../services/API_Service';

const SettingsView = () => {
  const [isLocking, setIsLocking] = useState(false);
  const [systemState, setSystemState] = useState('OPERATIONAL');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleToggleLockdown = async () => {
    setIsLocking(true);
    const result = await API_Service.toggleLockdown();
    setSystemState(result.system_state);
    setIsLocking(false);
  };

  const handleSyncCloud = async () => {
    setIsSyncing(true);
    try {
      await API_Service.seedDatabase();
      alert("Cloud Mesh Synchronized: Identities AID-1001 to AID-1020 are now LIVE!");
    } catch (error) {
      console.error(error);
      alert("Sync Failed: Check Firebase Console permissions.");
    }
    setIsSyncing(false);
  };

  const sections = [
    {
      title: 'Security Protocol',
      icon: Shield,
      items: [
        { label: 'Multi-Signature Requirement', desc: 'Require multiple identity agents for Tier 1 issuance.', enabled: true },
        { label: 'Quantum Entropy Pool', desc: 'Use hardware-based random number generation for salts.', enabled: true },
        { label: 'Auto-Revocation', desc: 'Revoke credentials automatically after inactivity period.', enabled: false },
      ]
    },
    {
      title: 'System Integration',
      icon: Database,
      items: [
        { label: 'Real-time Synchronization', desc: 'Sync with distributed ledger nodes every 500ms.', enabled: true },
        { label: 'API External Access', desc: 'Allow third-party verification via secure REST endpoints.', enabled: false },
      ]
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-slate-100 mb-2">System Settings</h2>
        <p className="text-slate-400">Configure core identity protocols and system-wide security parameters.</p>
      </div>

      {/* Cloud Sync Tool */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 flex items-center justify-between mb-8 shadow-lg">
        <div>
          <h4 className="text-xl font-bold text-emerald-400 mb-1 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Cloud Mesh Synchronization
          </h4>
          <p className="text-sm text-slate-400 max-w-md">Initialize the global identity mesh by seeding the primary sovereign dataset into the Cloud Enclave.</p>
        </div>
        <button 
          onClick={handleSyncCloud}
          disabled={isSyncing}
          className="px-8 py-4 bg-emerald-500 text-slate-900 font-bold rounded-xl hover:bg-emerald-400 transition-all uppercase tracking-widest text-xs disabled:opacity-50"
        >
          {isSyncing ? 'Synchronizing...' : 'Sync Cloud Mesh'}
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <div key={i} className="bg-slate-850 rounded-xl border border-slate-800 overflow-hidden shadow-lg">
            <div className="px-6 py-4 bg-slate-900/50 border-b border-slate-800 flex items-center gap-3">
              <section.icon className="w-5 h-5 text-aureum-500" />
              <h3 className="font-semibold text-slate-200">{section.title}</h3>
            </div>
            <div className="divide-y divide-slate-800">
              {section.items.map((item, j) => (
                <div key={j} className="p-6 flex items-center justify-between hover:bg-slate-800/10 transition-colors">
                  <div className="max-w-md">
                    <div className="font-medium text-slate-200 mb-1">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.desc}</div>
                  </div>
                  <button className={`w-12 h-6 rounded-full relative transition-colors ${item.enabled ? 'bg-aureum-500' : 'bg-slate-700'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-slate-900 rounded-full transition-all ${item.enabled ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`rounded-xl border transition-all p-8 flex items-center justify-between shadow-xl relative overflow-hidden ${
        systemState === 'LOCKED' 
          ? 'bg-red-500/10 border-red-500/50' 
          : 'bg-gradient-to-br from-slate-850 to-slate-900 border-aureum-500/20'
      }`}>
        <div className="flex items-center gap-6 relative z-10">
          <div className={`w-16 h-16 rounded-2xl bg-slate-900 border flex items-center justify-center shadow-inner ${
            systemState === 'LOCKED' ? 'border-red-500/50' : 'border-slate-800'
          }`}>
            <Lock className={`w-8 h-8 ${systemState === 'LOCKED' ? 'text-red-500' : 'text-aureum-500'}`} />
          </div>
          <div>
            <h4 className={`text-xl font-bold mb-1 ${systemState === 'LOCKED' ? 'text-red-400' : 'text-slate-100'}`}>
              {systemState === 'LOCKED' ? 'SYSTEM UNDER LOCKDOWN' : 'Administrative Lockdown'}
            </h4>
            <p className="text-sm text-slate-500 max-w-sm">
              {systemState === 'LOCKED' 
                ? 'All identity services are currently suspended. Cryptographic verification mesh is offline.' 
                : 'Immediately suspend all verification services and lock the identity vault.'}
            </p>
          </div>
        </div>
        <button 
          onClick={handleToggleLockdown}
          disabled={isLocking}
          className={`px-8 py-4 font-bold rounded-xl transition-all uppercase tracking-widest text-xs z-10 ${
            systemState === 'LOCKED'
              ? 'bg-emerald-500 text-white hover:bg-emerald-400'
              : 'bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-slate-900'
          }`}
        >
          {isLocking ? 'Processing...' : systemState === 'LOCKED' ? 'Lift Lockdown' : 'Activate Emergency Stop'}
        </button>
        {systemState === 'LOCKED' && (
           <motion.div 
             animate={{ opacity: [0.3, 0.6, 0.3] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute inset-0 bg-red-500/5 pointer-events-none"
           />
        )}
      </div>
    </div>
  );
};

export default SettingsView;
