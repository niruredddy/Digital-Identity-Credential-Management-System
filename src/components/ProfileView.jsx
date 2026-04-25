import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { User, Mail, Shield, LogOut, Calendar, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileView = () => {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-serif text-slate-100 mb-2">Agent Profile</h2>
        <p className="text-slate-400">Manage your sovereign identity and system access privileges.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-slate-850 rounded-3xl border border-slate-800 p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-aureum-500/5 pointer-events-none"></div>
             <div className="w-32 h-32 rounded-full border-4 border-slate-800 p-1 mb-6 relative group">
                <div className="absolute inset-0 border-4 border-aureum-500 rounded-full border-t-transparent animate-spin opacity-50"></div>
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                    <User className="w-12 h-12 text-slate-700" />
                  </div>
                )}
             </div>
             <h3 className="text-xl font-bold text-white mb-1">{user?.displayName || 'System Agent'}</h3>
             <p className="text-xs text-aureum-500 font-mono uppercase tracking-widest mb-6">Security Level 7</p>
             
             <button 
               onClick={handleLogout}
               className="w-full py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
             >
                <LogOut className="w-4 h-4" />
                Terminate Session
             </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-slate-850 rounded-2xl border border-slate-800 p-8 shadow-xl">
             <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Shield className="w-4 h-4 text-aureum-500" />
                Identity Parameters
             </h4>
             <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-slate-800">
                   <div className="flex items-center gap-4">
                      <Mail className="w-5 h-5 text-slate-500" />
                      <div>
                         <p className="text-[10px] text-slate-500 uppercase font-bold">Email Identifier</p>
                         <p className="text-sm text-slate-200">{user?.email}</p>
                      </div>
                   </div>
                   <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">VERIFIED</span>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-slate-800">
                   <div className="flex items-center gap-4">
                      <Calendar className="w-5 h-5 text-slate-500" />
                      <div>
                         <p className="text-[10px] text-slate-500 uppercase font-bold">Session Created</p>
                         <p className="text-sm text-slate-200">{new Date(user?.metadata.creationTime).toLocaleDateString()}</p>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-4 py-4">
                   <Award className="w-5 h-5 text-slate-500" />
                   <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">System Privileges</p>
                      <p className="text-sm text-slate-200 font-mono">Root Administrator / Sovereign Issuer</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-6 bg-aureum-500/10 border border-aureum-500/30 rounded-2xl">
             <p className="text-xs text-aureum-500 leading-relaxed italic">
                "Your identity is encrypted using a multi-node RSA mesh. Every action taken on this terminal is permanently logged to the immutable ledger."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
