import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { Activity, ShieldAlert, MapPin, Phone, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const PatientDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [sosStatus, setSosStatus] = useState('idle'); // idle, sending, sent
  const [error, setError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const triggerSOS = async () => {
    setSosStatus('sending');
    setError('');
    
    try {
      await addDoc(collection(db, 'emergencies'), {
        patientId: user.uid,
        patientName: user.name,
        patientPhone: user.phone || 'N/A',
        status: 'pending',
        location: '123 Main St (Mocked)', // In a real app, use Geolocation API
        timestamp: serverTimestamp(),
        severity: 'HIGH',
      });
      
      setSosStatus('sent');
      setTimeout(() => setSosStatus('idle'), 8000);
    } catch (err) {
      console.error("Error creating SOS request:", err);
      setError('Failed to send SOS. Please check your connection.');
      setSosStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1121] text-slate-900 dark:text-slate-100 flex flex-col">
      <nav className="p-4 glass sticky top-0 z-50 flex justify-between items-center border-b border-slate-200 dark:border-white/5 px-8">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-red-500" />
          <span className="text-xl font-bold">LifeLine Patient</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full">Hello, {user?.name}</span>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-400 font-bold transition">Logout</button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 mt-8 w-full flex-1 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-10 text-center w-full max-w-2xl relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-4xl font-black mb-3">Emergency Assistance</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-12 text-lg">Tap the SOS button to instantly alert nearby ambulances and hospitals.</p>
          
          <div className="relative flex justify-center mb-10">
            <AnimatePresence>
              {sosStatus === 'sending' && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 bg-red-500 rounded-full w-48 h-48 mx-auto pointer-events-none"
                />
              )}
            </AnimatePresence>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerSOS}
              disabled={sosStatus !== 'idle'}
              className={`w-48 h-48 rounded-full text-white font-black text-3xl flex flex-col items-center justify-center relative z-10 shadow-2xl transition-all duration-300
                ${sosStatus === 'idle' ? 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/50 hover:shadow-red-500/70' : 
                  sosStatus === 'sending' ? 'bg-orange-500 shadow-orange-500/50' : 
                  'bg-green-500 shadow-green-500/50'}`}
            >
              {sosStatus === 'idle' && <><ShieldAlert size={56} className="mb-2" /> SOS</>}
              {sosStatus === 'sending' && <><Activity size={56} className="mb-2 animate-pulse" /> SENDING</>}
              {sosStatus === 'sent' && <><CheckCircle size={56} className="mb-2" /> SENT</>}
            </motion.button>
          </div>
          
          {error && <p className="text-red-500 font-medium">{error}</p>}
          
          <AnimatePresence>
            {sosStatus === 'sent' && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 exit={{ opacity: 0, y: -10 }}
                 className="text-green-500 dark:text-green-400 font-semibold text-lg bg-green-50 dark:bg-green-500/10 py-3 px-6 rounded-xl inline-block"
               >
                 SOS signal broadcasted successfully. Help is on the way!
               </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-500 rounded-lg">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-lg">Your Location</h3>
            </div>
            <div className="bg-slate-100 dark:bg-[#111827]/50 h-40 rounded-2xl flex flex-col items-center justify-center text-slate-500 border border-slate-200 dark:border-white/5 relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
               <MapPin size={32} className="text-slate-300 dark:text-slate-600 mb-2" />
               <span className="font-medium text-sm">Location Active</span>
               <span className="text-xs text-slate-400">123 Main St, Springfield</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-3xl p-6"
          >
             <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-500/20 text-purple-500 rounded-lg">
                <Phone size={20} />
              </div>
              <h3 className="font-bold text-lg">Emergency Contacts</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex justify-between items-center p-3 bg-slate-50 dark:bg-[#111827]/50 border border-slate-100 dark:border-white/5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition cursor-pointer">
                <span className="font-medium">City Hospital</span>
                <span className="font-mono text-sm text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded">911</span>
              </li>
              <li className="flex justify-between items-center p-3 bg-slate-50 dark:bg-[#111827]/50 border border-slate-100 dark:border-white/5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition cursor-pointer">
                <span className="font-medium">Dr. Smith</span>
                <span className="font-mono text-sm text-slate-500 dark:text-slate-400">+1 234 567 8900</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
