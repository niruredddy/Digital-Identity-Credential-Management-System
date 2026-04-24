import React, { useState } from 'react';
import { Key, CheckCircle2, XCircle, User, ShieldAlert, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_Service } from '../services/API_Service';
import SystemLoadChart from './SystemLoadChart';

const VerifyingView = () => {
  const [hash, setHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [validationResult, setValidationResult] = useState(null); // null, 'authorized', 'unauthorized'

  const handleVerify = async () => {
    if (!hash) return;
    setIsVerifying(true);
    setValidationResult(null);
    
    const result = await API_Service.submitHash(hash);
    
    setIsVerifying(false);
    setValidationResult(result.success ? 'authorized' : 'unauthorized');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto h-full flex flex-col">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-serif text-slate-100 mb-4 tracking-wide">Universal Verifier</h2>
        <p className="text-slate-400">Scan biometric token or enter vault credential to initiate high-level protocol verification.</p>
      </div>

      <div className="max-w-3xl mx-auto w-full mb-12">
        <div className="relative">
          <Key className="w-6 h-6 absolute left-6 top-1/2 -translate-y-1/2 text-aureum-500" />
          <input 
            type="text" 
            placeholder="Enter Secure Identity Hash..." 
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            className="w-full bg-slate-850 border-2 border-slate-700 rounded-2xl pl-16 pr-32 py-5 text-lg focus:outline-none focus:border-aureum-500 text-slate-100 font-mono transition-colors shadow-lg"
            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
          />
          <button 
            onClick={handleVerify}
            disabled={isVerifying || !hash}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-aureum-500 hover:bg-aureum-400 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]"
          >
            {isVerifying ? '...' : 'Verify'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-12 h-48">
        <div className="relative">
          <AnimatePresence>
            {validationResult === 'authorized' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="absolute inset-0 bg-emerald-500/10 border-2 border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.1)]"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-emerald-400 mb-1 tracking-wide">Authorized Access</h3>
                <p className="text-xs text-emerald-500/70 uppercase tracking-widest font-semibold">Protocol Level Alpha-7</p>
                <div className="absolute bottom-4 left-6 right-6 flex justify-between text-xs text-emerald-500/50 font-mono">
                  <span>Last Match:</span>
                  <span>ID: 0029-YQ-2</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {validationResult !== 'authorized' && (
            <div className="absolute inset-0 bg-slate-850 rounded-2xl border border-slate-800 flex items-center justify-center opacity-50">
               <span className="text-slate-600 font-medium">Awaiting Authorization</span>
            </div>
          )}
        </div>
        
        <div className="relative">
          <AnimatePresence>
            {validationResult === 'unauthorized' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="absolute inset-0 bg-red-500/10 border-2 border-red-500/50 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.1)]"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                  <XCircle className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-red-400 mb-1 tracking-wide">Unauthorized</h3>
                <p className="text-xs text-red-500/70 uppercase tracking-widest font-semibold">Access Protocol Denied</p>
                <div className="absolute bottom-4 left-6 right-6 flex justify-between text-xs text-red-500/50 font-mono">
                  <span>Last Reject:</span>
                  <span>14:22:11 GMT</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {validationResult !== 'unauthorized' && (
            <div className="absolute inset-0 bg-slate-850 rounded-2xl border border-slate-800 flex items-center justify-center opacity-50">
               <span className="text-slate-600 font-medium">No Violations Detected</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1">
        <div className="col-span-2 bg-slate-850 rounded-xl border border-slate-800 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">Live Verification Stream</h3>
            <span className="flex items-center gap-2 text-xs text-slate-400"><span className="w-2 h-2 rounded-full bg-aureum-500 animate-pulse"></span> Live Updates</span>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {[
              { name: 'Julian Sterling', desc: 'Financial Identity • Private Ledger Vault', status: 'VERIFIED', time: 'JUST NOW', type: 'success' },
              { name: 'Unknown Signal', desc: 'Credential Mismatch • Entry Port 80', status: 'REJECTED', time: '4 MIN AGO', type: 'error' },
              { name: 'Saffron Dubois', desc: 'Biometric Passport • Secure Terminals', status: 'VERIFIED', time: '12 MIN AGO', type: 'success' },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${log.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {log.type === 'success' ? <User className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">{log.name}</h4>
                    <p className="text-xs text-slate-500">{log.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-slate-500 font-mono">{log.time}</span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-wider border ${log.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 text-xs font-semibold text-slate-400 hover:text-aureum-500 uppercase tracking-widest border-t border-slate-800 transition-colors">
            View Full Audit Trail
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-slate-850 rounded-xl border border-slate-800 p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-semibold text-slate-200">Security Overview</h3>
                <Zap className="w-4 h-4 text-aureum-500" />
             </div>
             <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">System Uptime</span>
                  <span className="text-aureum-500 font-bold font-mono">99.999%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Threat Neutralization</span>
                  <span className="text-slate-200 font-bold font-mono">1,244</span>
                </div>
             </div>
             <div className="mt-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">System Load</h4>
                <div className="h-24 w-full">
                  <SystemLoadChart />
                </div>
             </div>
          </div>
          <div className="bg-slate-850 rounded-xl border border-aureum-500/30 p-6 flex-1 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-aureum-500/5 group-hover:bg-aureum-500/10 transition-colors"></div>
            <div className="w-24 h-24 rounded-full border-4 border-slate-800 flex items-center justify-center relative mb-4">
               <div className="absolute inset-0 border-4 border-aureum-500 rounded-full border-t-transparent animate-spin"></div>
               <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-slate-400" />
               </div>
            </div>
            <h4 className="text-aureum-500 font-bold text-sm tracking-widest uppercase text-center mb-1">Quantum Encrypted</h4>
            <p className="text-[10px] text-slate-500 text-center px-4">Military-grade AES-256 verification mesh active.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyingView;
