import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Star, Layout, ShoppingBag, Info, Phone, Search } from 'lucide-react';
import heroAsset from '../assets/hero.png';

const OverviewView = ({ setActiveTab }) => {
  const navItems = [
    { id: 'overview', label: 'Home' },
    { id: 'issuing', label: 'Vault' },
    { id: 'verifying', label: 'Verify' },
    { id: 'logs', label: 'Audit' },
    { id: 'settings', label: 'System' },
  ];

  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden bg-brick">
      {/* Top Navigation */}
      <div className="px-12 py-8 flex items-center justify-between z-50">
        <div className="text-2xl font-black italic tracking-tighter text-white">
          aureum<span className="text-cyber-cyan">.</span>
        </div>
        
        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-sm font-bold tracking-tight transition-all ${
                  item.id === 'overview' 
                    ? 'pill-nav' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <Search className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-12 lg:px-24">
        {/* Left Circular Asset */}
        <div className="relative">
          {/* Neon Ring */}
          <div className="absolute inset-[-20px] border-2 border-cyber-cyan rounded-full opacity-40 blur-sm"></div>
          <div className="absolute inset-[-40px] border border-cyber-pink/30 rounded-full blur-md"></div>
          
          {/* Floating Shapes */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-60px] pointer-events-none"
          >
             <Star className="absolute top-0 left-0 w-6 h-6 text-cyber-cyan fill-cyber-cyan/20 blur-[1px]" />
             <div className="absolute bottom-0 right-0 w-4 h-4 bg-cyber-pink rotate-45 blur-[1px]"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-80 h-80 lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden border-4 border-white/5 relative z-10 shadow-[0_0_50px_rgba(6,182,212,0.2)]"
          >
            <img src={heroAsset} alt="Identity Hero" className="w-full h-full object-cover scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/60 to-transparent"></div>
          </motion.div>
        </div>

        {/* Right Content */}
        <div className="max-w-2xl space-y-6 z-10 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-7xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-white">
              IDENTITY<br />
              <span className="text-white">ONLY</span><br />
              <span className="text-cyber-cyan">100%</span> SECURE
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/60 text-lg lg:text-xl font-medium leading-relaxed max-w-lg"
          >
            Sovereign digital identity management powered by absolute cryptographic certainty. Level 9 protection for the next generation.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-4"
          >
            <button 
              onClick={() => setActiveTab('issuing')}
              className="bg-white text-cyber-bg font-black px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/10"
            >
              Explore Vault
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Neon Shapes */}
      <Zap className="absolute top-1/4 right-1/4 w-12 h-12 text-cyber-yellow blur-[1px] rotate-12 opacity-50" />
      <div className="absolute bottom-1/4 left-1/4 w-8 h-8 border-2 border-cyber-pink rotate-45 opacity-50"></div>
      <Star className="absolute top-1/2 left-12 w-8 h-8 text-cyber-cyan opacity-40 blur-[1px]" />
      <div className="absolute bottom-12 right-24 w-6 h-6 bg-cyber-cyan/20 rounded-full blur-xl animate-pulse"></div>
      
      {/* Footer metadata */}
      <div className="px-12 py-8 flex justify-between items-center opacity-20">
         <span className="text-[10px] font-black uppercase tracking-[0.4em]">Protocol: Cyber-Mesh-V2</span>
         <span className="text-[10px] font-black uppercase tracking-[0.4em]">Nodes: 1,482 Active</span>
      </div>
    </div>
  );
};

export default OverviewView;
