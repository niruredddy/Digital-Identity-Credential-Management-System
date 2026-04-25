import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, ShieldCheck, Lock, Cpu } from 'lucide-react';
import logo from '../assets/logo.png';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Cyber Protocol...');

  useEffect(() => {
    const statuses = [
      'Accessing Neural Mesh...',
      'Encrypting Bio-Signatures...',
      'Syncing with Prime Ledger...',
      'Bypassing Firewalls...',
      'Access Granted.'
    ];

    let currentStatusIndex = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
          return 100;
        }
        
        const newProgress = prev + 1.5;
        const statusIdx = Math.floor((newProgress / 100) * statuses.length);
        if (statusIdx < statuses.length && statusIdx !== currentStatusIndex) {
          currentStatusIndex = statusIdx;
          setStatus(statuses[statusIdx]);
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cyber-bg text-white overflow-hidden font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 bg-brick pointer-events-none"></div>
      
      {/* Neon Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyber-pink/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center scale-90 lg:scale-100">
        {/* Logo and Animation Container */}
        <div className="relative mb-16 h-72 w-72 flex items-center justify-center">
          {/* Neon Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-white/5 rounded-full"
          ></motion.div>
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-6 border border-cyber-cyan/30 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.1)]"
          ></motion.div>
          
          {/* Scanning Line */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent shadow-[0_0_20px_#06b6d4] z-20"
          ></motion.div>

          {/* Icon/Logo Reveal */}
          <AnimatePresence mode="wait">
            {progress < 75 ? (
              <motion.div 
                key="fingerprint"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="relative"
              >
                <Fingerprint className="w-40 h-40 text-white/5" />
                <motion.div 
                  className="absolute inset-0 overflow-hidden"
                  animate={{ height: `${progress}%` }}
                >
                  <Fingerprint className="w-40 h-40 text-cyber-cyan drop-shadow-[0_0_15px_#06b6d4]" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                key="logo"
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ type: "spring", damping: 15 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-cyber-pink/20 blur-2xl rounded-full scale-150 opacity-50"></div>
                <img src={logo} alt="Aureum" className="w-48 h-48 object-contain relative z-10 drop-shadow-[0_0_30px_#db2777]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Brand Label */}
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black italic tracking-tighter uppercase mb-4 text-white"
          >
            Aureum<span className="text-cyber-cyan">.</span>
          </motion.h1>
          <div className="flex items-center justify-center gap-8 text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-cyber-cyan" /> Secure</span>
            <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-cyber-pink" /> Neural</span>
            <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-cyber-yellow" /> Mesh</span>
          </div>
        </div>

        {/* Progress System */}
        <div className="mt-20 w-96 px-4">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] italic">{status}</span>
            <span className="text-[12px] font-black text-cyber-cyan font-mono">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-pink to-cyber-purple shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            ></motion.div>
          </div>
        </div>
      </div>

      {/* Grid Corner Decor */}
      <div className="absolute top-16 left-16 w-16 h-16 border-t-2 border-l-2 border-white/5"></div>
      <div className="absolute top-16 right-16 w-16 h-16 border-t-2 border-r-2 border-white/5"></div>
      <div className="absolute bottom-16 left-16 w-16 h-16 border-b-2 border-l-2 border-white/5"></div>
      <div className="absolute bottom-16 right-16 w-16 h-16 border-b-2 border-r-2 border-white/5"></div>
    </div>
  );
};

export default SplashScreen;
