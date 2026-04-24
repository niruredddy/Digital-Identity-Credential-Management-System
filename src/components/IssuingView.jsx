import React, { useState } from 'react';
import { Fingerprint, CheckCircle2, ShieldAlert, Activity, Lock, MoreVertical } from 'lucide-react';
import { API_Service } from '../services/API_Service';

const IssuingView = () => {
  const [isIssuing, setIsIssuing] = useState(false);

  const handleIssue = async () => {
    setIsIssuing(true);
    await API_Service.issueCredential({});
    setIsIssuing(false);
    // In a real app we might show a success toast here
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-serif text-aureum-500 mb-2">Identity Vault</h2>
          <p className="text-slate-400">Manage sovereign credentials and monitor cryptographic ledger activity.</p>
        </div>
        <div className="text-right flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <div className="w-2 h-2 rounded-full bg-aureum-500 animate-pulse"></div>
          System Integrity: <span className="text-aureum-500">Secure & Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-slate-850 rounded-xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-aureum-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Lock className="w-5 h-5 text-aureum-500" />
              Issue New Credential
            </h3>
            <span className="text-xs font-bold text-slate-800 bg-aureum-500 px-2 py-1 rounded uppercase tracking-wide">
              EAL7+ Protocol
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">Subject Identity Name</label>
              <input 
                type="text" 
                defaultValue="e.g. Julian Alexander Thorne" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-aureum-500 text-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">Credential Class</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-aureum-500 text-slate-300 appearance-none">
                <option>Sovereign Tier 1 (Ultra)</option>
                <option>Sovereign Tier 2 (High)</option>
                <option>Standard Identity</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">Encrypted Biometric Hash</label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue="0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-aureum-500 font-mono tracking-tighter focus:outline-none focus:border-aureum-500"
                readOnly
              />
              <Fingerprint className="w-5 h-5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-aureum-500 w-4 h-4" defaultChecked />
                <span className="text-sm text-slate-300">Force Multi-Sig Verification</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-aureum-500 w-4 h-4" />
                <span className="text-sm text-slate-300">Auto-Revocation after 365 Days</span>
              </label>
            </div>
            <button 
              onClick={handleIssue}
              disabled={isIssuing}
              className="bg-aureum-500 hover:bg-aureum-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isIssuing ? 'Initializing...' : 'Initialize Sovereign Issuance'}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-slate-850 rounded-xl border border-slate-800 p-6 flex flex-col justify-center">
            <h4 className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4" /> Verification Velocity
            </h4>
            <div className="text-4xl font-serif text-slate-100 flex items-end gap-2">
              1.2<span className="text-xl text-slate-500">ms</span>
            </div>
            <p className="text-xs text-aureum-500 mt-2 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> +0.4% Efficiency</p>
          </div>
          <div className="bg-slate-850 rounded-xl border border-slate-800 p-6 flex-1 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-slate-850 to-slate-900 z-0"></div>
             <div className="relative z-10">
                <h4 className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">Network Consensus</h4>
                <div className="text-2xl font-bold text-slate-100 mb-4">99.999% Secured</div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Node Cluster Alpha</span>
                    <span className="text-aureum-500 font-medium">Active</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Quantum Entropy Pool</span>
                    <span className="text-aureum-500 font-medium">Optimal</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-850 rounded-xl border border-slate-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Recent Ledger Entries</h3>
          <button className="text-xs text-aureum-500 hover:text-aureum-400 flex items-center gap-1 font-medium transition-colors">
            View Full Audit Trail →
          </button>
        </div>
        
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-xs">
              <th className="pb-3 font-semibold">Transaction Hash</th>
              <th className="pb-3 font-semibold">Identity Agent</th>
              <th className="pb-3 font-semibold">Timestamp</th>
              <th className="pb-3 font-semibold">Security Status</th>
              <th className="pb-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            <tr className="text-slate-300">
              <td className="py-4 font-mono text-xs">0x38fa...c982</td>
              <td className="py-4 flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs">E</div> Elena Vance</td>
              <td className="py-4 text-slate-500">2 mins ago</td>
              <td className="py-4"><span className="px-2 py-1 bg-aureum-500/10 text-aureum-500 rounded border border-aureum-500/20 text-xs font-medium">Verified</span></td>
              <td className="py-4 text-right"><button className="text-slate-500 hover:text-slate-300"><MoreVertical className="w-4 h-4 inline" /></button></td>
            </tr>
            <tr className="text-slate-300">
              <td className="py-4 font-mono text-xs">0x19bb...e345</td>
              <td className="py-4 flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs">M</div> Marcus Aurelius</td>
              <td className="py-4 text-slate-500">15 mins ago</td>
              <td className="py-4"><span className="px-2 py-1 bg-aureum-500/10 text-aureum-500 rounded border border-aureum-500/20 text-xs font-medium">Verified</span></td>
              <td className="py-4 text-right"><button className="text-slate-500 hover:text-slate-300"><MoreVertical className="w-4 h-4 inline" /></button></td>
            </tr>
            <tr className="text-slate-300">
              <td className="py-4 font-mono text-xs">0x00ba...f111</td>
              <td className="py-4 flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs">S</div> Sarah Jenkins</td>
              <td className="py-4 text-slate-500">1 hour ago</td>
              <td className="py-4"><span className="px-2 py-1 bg-slate-800 text-slate-400 rounded border border-slate-700 text-xs font-medium">Pending</span></td>
              <td className="py-4 text-right"><button className="text-slate-500 hover:text-slate-300"><MoreVertical className="w-4 h-4 inline" /></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuingView;
