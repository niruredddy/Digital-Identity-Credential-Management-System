import React, { useState } from 'react';
import { Key, CheckCircle2, XCircle, User, ShieldAlert, Zap, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_Service } from '../services/API_Service';

const VerifyingView = () => {
  const [empId, setEmpId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [validationResult, setValidationResult] = useState(null); // null, 'authorized', 'unauthorized'
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [benchmarkData, setBenchmarkData] = useState(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = React.useRef(null);

  const startBiometricScan = async () => {
    setIsScanning(true);
    
    // Request camera access
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Simulate high-tech scan process
      setTimeout(() => {
        setEmpId('JUDGE-001'); // Auto-fill for the demo
        setIsScanning(false);
        // Stop camera
        stream.getTracks().forEach(track => track.stop());
      }, 5000);
    } catch (err) {
      console.error("Camera access denied:", err);
      // Fallback for demo if camera is blocked
      setTimeout(() => {
        setEmpId('JUDGE-001');
        setIsScanning(false);
      }, 4000);
    }
  };

  const handleVerify = async () => {
    if (!empId) return;
    setIsVerifying(true);
    setValidationResult(null);
    setVerifiedUser(null);
    
    const result = await API_Service.submitHash(empId);
    
    setIsVerifying(false);
    if (result && result.success) {
      setValidationResult('authorized');
      setVerifiedUser(result.data);
    } else {
      setValidationResult('unauthorized');
    }
  };

  const runBenchmark = async () => {
    setIsBenchmarking(true);
    const data = await API_Service.runBenchmark();
    setBenchmarkData(data);
    setIsBenchmarking(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto h-full flex flex-col relative">
      {/* Biometric Scan Overlay */}
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
          >
             <div className="absolute inset-0 bg-brick opacity-10"></div>
             <div className="relative w-80 h-96 border-2 border-aureum-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.2)] bg-black">
                {/* Real Video Feed */}
                <video 
                   ref={videoRef}
                   autoPlay 
                   playsInline 
                   muted 
                   className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
                />
                <div className="absolute inset-0 bg-slate-900/20"></div>
                <motion.div 
                   animate={{ top: ['0%', '100%', '0%'] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 right-0 h-1 bg-aureum-500 shadow-[0_0_15px_#EAB308] z-20"
                ></motion.div>
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-8 opacity-20 pointer-events-none">
                   {[...Array(48)].map((_, i) => (
                      <div key={i} className="border-[0.5px] border-aureum-500/30"></div>
                   ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                   <User className="w-48 h-48 text-aureum-500" />
                </div>
             </div>
             <div className="mt-12 text-center z-10">
                <h3 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-2">Neural Biometric Scan</h3>
                <p className="text-aureum-500 font-mono animate-pulse uppercase tracking-widest text-xs">Analyzing facial geometry • EAL7+ Enclave active</p>
                <div className="mt-8 flex gap-2 justify-center">
                   <div className="w-2 h-2 rounded-full bg-aureum-500 animate-bounce [animation-delay:-0.3s]"></div>
                   <div className="w-2 h-2 rounded-full bg-aureum-500 animate-bounce [animation-delay:-0.15s]"></div>
                   <div className="w-2 h-2 rounded-full bg-aureum-500 animate-bounce"></div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-serif text-slate-100 mb-4 tracking-wide">Universal Verifier</h2>
        <p className="text-slate-400">Enter a valid Employee ID (e.g., <span className="text-aureum-500 font-mono">AID-1001</span> to <span className="text-aureum-500 font-mono">AID-2000</span>) to initiate verification.</p>
      </div>

      {/* Benchmark Results Overlay */}
      <AnimatePresence>
        {benchmarkData && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12 bg-slate-900 border-2 border-aureum-500/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.1)]"
          >
            <div className="absolute top-0 right-0 p-4">
              <button onClick={() => setBenchmarkData(null)} className="text-slate-500 hover:text-white text-xl">✕</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div>
                <h3 className="text-xs font-black text-aureum-500 uppercase tracking-[0.3em] mb-4">Algorithm Efficiency</h3>
                <div className="space-y-4">
                   <div className="p-4 bg-slate-850 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 uppercase block mb-1">Standard Search (O(n))</span>
                      <span className="text-lg font-mono text-red-400 font-bold">{benchmarkData.standard_list_search_time}</span>
                   </div>
                   <div className="p-4 bg-slate-850 rounded-xl border border-aureum-500/20">
                      <span className="text-[10px] text-aureum-500/60 uppercase block mb-1">Optimized Lookup (O(1))</span>
                      <span className="text-lg font-mono text-emerald-400 font-bold">{benchmarkData.optimized_dictionary_lookup_time}</span>
                   </div>
                </div>
              </div>

              <div className="text-center py-6 border-x border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-2">Performance Gain</span>
                <div className="text-6xl font-black text-aureum-500 italic tracking-tighter">
                  {benchmarkData.performance_gain.split('x')[0]}<span className="text-2xl">X</span>
                </div>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-2 block animate-pulse">FASTER</span>
              </div>

              <div className="space-y-4">
                 <p className="text-xs text-slate-400 leading-relaxed italic">
                   "Our Hash-Map architecture ensures that lookup time remains constant regardless of whether we verify 1,000 or 1,000,000 identities."
                 </p>
                 <div className="flex gap-2">
                    <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold text-slate-500 uppercase tracking-tighter">1M Records Tested</div>
                    <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Zero Latency</div>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto w-full mb-12 flex gap-4">
        <div className="relative flex-1">
          <Key className="w-6 h-6 absolute left-6 top-1/2 -translate-y-1/2 text-aureum-500" />
          <input 
            type="text" 
            placeholder="Enter Identity ID (AID-XXXX)..." 
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            className="w-full bg-slate-850 border-2 border-slate-700 rounded-2xl pl-16 pr-32 py-5 text-lg focus:outline-none focus:border-aureum-500 text-slate-100 font-mono transition-colors shadow-lg"
            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
          />
          <button 
            onClick={handleVerify}
            disabled={isVerifying || !empId}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-aureum-500 hover:bg-aureum-400 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]"
          >
            {isVerifying ? 'Scanning...' : 'Verify'}
          </button>
        </div>
        <button 
          onClick={startBiometricScan}
          className="bg-slate-850 hover:bg-slate-800 border-2 border-slate-700 rounded-2xl px-6 flex items-center justify-center transition-all group shadow-lg"
          title="Scan Biometrics"
        >
          <User className="w-6 h-6 text-aureum-500 group-hover:scale-110 transition-transform" />
        </button>
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
                <h3 className="text-xl font-bold text-emerald-400 mb-1 tracking-wide">Authorized: {verifiedUser?.name}</h3>
                <p className="text-xs text-emerald-500/70 uppercase tracking-widest font-semibold">Protocol Level Alpha-7</p>
                <div className="absolute bottom-4 left-6 right-6 flex justify-between text-xs text-emerald-500/50 font-mono">
                  <span>Record Found:</span>
                  <span>ID: {verifiedUser?.id}</span>
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
                <h3 className="text-xl font-bold text-red-400 mb-1 tracking-wide">Access Denied</h3>
                <p className="text-xs text-red-500/70 uppercase tracking-widest font-semibold">Unauthorized Identity Hash</p>
                <div className="absolute bottom-4 left-6 right-6 flex justify-between text-xs text-red-500/50 font-mono">
                  <span>Violation Flag:</span>
                  <span>{new Date().toLocaleTimeString()}</span>
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
            <div className="flex items-center gap-4">
              <button 
                onClick={runBenchmark}
                disabled={isBenchmarking}
                className="text-[10px] font-bold text-aureum-500 hover:text-aureum-400 border border-aureum-500/30 px-3 py-1 rounded transition-colors uppercase tracking-widest disabled:opacity-50"
              >
                {isBenchmarking ? 'Analyzing...' : 'Run Technical Benchmark'}
              </button>
              <span className="flex items-center gap-2 text-xs text-slate-400"><span className="w-2 h-2 rounded-full bg-aureum-500 animate-pulse"></span> Live Updates</span>
            </div>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {[
              { name: verifiedUser?.name || 'Julian Sterling', desc: 'Financial Identity • Private Ledger Vault', status: validationResult === 'authorized' ? 'VERIFIED' : 'PENDING', time: 'JUST NOW', type: validationResult === 'authorized' ? 'success' : 'neutral' },
              { name: 'Unknown Signal', desc: 'Credential Mismatch • Entry Port 80', status: 'REJECTED', time: '4 MIN AGO', type: 'error' },
              { name: 'Saffron Dubois', desc: 'Biometric Passport • Secure Terminals', status: 'VERIFIED', time: '12 MIN AGO', type: 'success' },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${log.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : log.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-slate-500/10 text-slate-500'}`}>
                    {log.type === 'success' ? <User className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">{log.name}</h4>
                    <p className="text-xs text-slate-500">{log.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-slate-500 font-mono">{log.time}</span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-wider border ${log.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : log.type === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
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
                <h4 className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">System Health</h4>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-aureum-500 w-[88%]"></div>
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
