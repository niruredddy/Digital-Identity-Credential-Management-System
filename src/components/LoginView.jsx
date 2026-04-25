import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Shield, Lock, User, Terminal, ChevronRight, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message.replace('Firebase:', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message.replace('Firebase:', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-brick opacity-10"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-aureum-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-aureum-500/5 rounded-full blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md p-8"
      >
        <div className="text-center mb-10">
           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 border border-aureum-500/30 shadow-[0_0_30px_rgba(234,179,8,0.1)] mb-6">
              <Shield className="w-8 h-8 text-aureum-500" />
           </div>
           <h1 className="text-3xl font-serif text-white tracking-tight mb-2">Sovereign Entry Portal</h1>
           <p className="text-slate-500 text-sm font-mono uppercase tracking-[0.2em]">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 uppercase tracking-widest ml-1 font-bold">Encrypted Identifier</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="email" 
                placeholder="Agent Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-aureum-500 text-slate-200 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 uppercase tracking-widest ml-1 font-bold">Neural Passkey</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="password" 
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-aureum-500 text-slate-200 transition-all shadow-inner"
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-xs font-mono bg-red-500/10 p-3 rounded-lg border border-red-500/20"
            >
              ⚠️ AUTH_ERROR: {error}
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-aureum-500 hover:bg-aureum-400 text-slate-900 font-black py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] flex items-center justify-center gap-2 group overflow-hidden relative"
          >
            <span className="relative z-10">{loading ? 'INITIALIZING...' : isRegistering ? 'CREATE AGENT PROFILE' : 'DECRYPT & ENTER'}</span>
            {!loading && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />}
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </button>

          <div className="flex items-center gap-4 my-6">
             <div className="h-px flex-1 bg-slate-900"></div>
             <span className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">OR</span>
             <div className="h-px flex-1 bg-slate-900"></div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3"
          >
            <Chrome className="w-5 h-5 text-aureum-500" />
            Continue with Google Neural ID
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-900 text-center">
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-xs text-slate-500 hover:text-aureum-500 transition-colors font-mono tracking-widest uppercase"
          >
            {isRegistering ? 'Already have an agent profile? Login' : 'Request New Agent Registration'}
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 opacity-20 grayscale">
           <Terminal className="w-4 h-4" />
           <div className="h-px w-8 bg-slate-500"></div>
           <span className="text-[10px] font-mono">EAL7 SECURE CONTEXT</span>
           <div className="h-px w-8 bg-slate-500"></div>
           <Shield className="w-4 h-4" />
        </div>
      </motion.div>
    </div>
  );
};

export default LoginView;
