import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import IssuingView from './components/IssuingView';
import VerifyingView from './components/VerifyingView';
import OverviewView from './components/OverviewView';
import LogsView from './components/LogsView';
import SettingsView from './components/SettingsView';
import SplashScreen from './components/SplashScreen';
import LoginView from './components/LoginView';
import ProfileView from './components/ProfileView';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [activeTab, setActiveTab] = useState('overview'); 
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (loading) {
     return <div className="h-screen bg-slate-950 flex items-center justify-center font-mono text-aureum-500 text-xs tracking-widest animate-pulse">SYNCHRONIZING WITH NEURAL MESH...</div>;
  }

  if (!user) {
    return <LoginView />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewView setActiveTab={setActiveTab} />;
      case 'issuing': return <IssuingView />;
      case 'verifying': return <VerifyingView />;
      case 'logs': return <LogsView />;
      case 'settings': return <SettingsView />;
      case 'profile': return <ProfileView />;
      default: return <OverviewView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden font-sans antialiased relative">
      {/* Conditionally show sidebar/topnav only for functional pages */}
      {activeTab !== 'overview' && (
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        {activeTab !== 'overview' && <TopNav setActiveTab={setActiveTab} />}
        
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.5 
              }}
              className="h-full w-full overflow-y-auto"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
