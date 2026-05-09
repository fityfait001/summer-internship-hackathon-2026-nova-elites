import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { Activity, MapPin, Navigation, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp, orderBy } from 'firebase/firestore';

const DriverDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [activeRequest, setActiveRequest] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (!isAvailable || activeRequest) return;

    const q = query(
      collection(db, 'emergencies'),
      where('status', '==', 'pending'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requests = [];
      snapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      setPendingRequests(requests);
    });

    return () => unsubscribe();
  }, [isAvailable, activeRequest]);

  const acceptRequest = async (request) => {
    try {
      const reqRef = doc(db, 'emergencies', request.id);
      await updateDoc(reqRef, {
        status: 'accepted',
        driverId: user.uid,
        driverName: user.name,
        acceptedAt: serverTimestamp()
      });
      setActiveRequest({ ...request, status: 'accepted' });
      setPendingRequests([]);
    } catch (err) {
      console.error("Error accepting request:", err);
      alert("Failed to accept request. Someone else might have taken it.");
    }
  };

  const completeRequest = async () => {
    try {
      const reqRef = doc(db, 'emergencies', activeRequest.id);
      await updateDoc(reqRef, {
        status: 'completed',
        completedAt: serverTimestamp()
      });
      setActiveRequest(null);
    } catch (err) {
      console.error("Error completing request:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1121] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-72 glass border-r border-slate-200 dark:border-white/5 flex flex-col z-10 shadow-xl shadow-slate-200/20 dark:shadow-none">
        <div className="p-8 border-b border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500 rounded-xl shadow-lg shadow-red-500/30">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Driver Portal</span>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Current Driver</p>
          <p className="font-bold text-lg">{user?.name}</p>
        </div>
        
        <div className="p-8 flex-1">
          <div className="mb-6 flex items-center justify-between glass-card p-4 rounded-2xl">
            <span className="font-bold text-sm">Status</span>
            <button 
              onClick={() => setIsAvailable(!isAvailable)}
              disabled={activeRequest !== null}
              className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest transition-all ${
                activeRequest ? 'bg-orange-500/20 text-orange-500' :
                isAvailable ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 
                'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {activeRequest ? 'ON MISSION' : isAvailable ? 'AVAILABLE' : 'OFFLINE'}
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="glass-card p-4 rounded-2xl">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Today's Missions</p>
              <p className="text-3xl font-black">12</p>
            </div>
            <div className="glass-card p-4 rounded-2xl">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Avg Response</p>
              <p className="text-3xl font-black">4m 12s</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 border-t border-slate-200 dark:border-white/5">
           <button onClick={handleLogout} className="w-full py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl font-bold transition">Sign Out</button>
        </div>
      </aside>

      <main className="flex-1 p-8 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
        
        <h2 className="text-3xl font-black mb-8 tracking-tight z-10">{activeRequest ? 'Active Mission' : 'Live Requests Queue'}</h2>
        
        <div className="flex-1 glass-card rounded-3xl overflow-hidden flex flex-col relative z-10">
          <div className="h-64 bg-slate-200 dark:bg-[#111827] w-full flex items-center justify-center relative overflow-hidden border-b border-slate-200 dark:border-white/5">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            <div className="text-center z-10">
              <MapPin size={48} className="mx-auto text-slate-400 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 font-medium">Live GPS Map View</p>
            </div>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0b1121]/50">
            {activeRequest ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 rounded-3xl border-l-4 border-l-orange-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
                <h3 className="text-2xl font-black mb-6">Mission Details</h3>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-slate-500 text-sm font-bold mb-1">PATIENT</p>
                    <p className="font-bold text-xl">{activeRequest.patientName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-bold mb-1">LOCATION</p>
                    <p className="font-bold text-xl">{activeRequest.location}</p>
                  </div>
                </div>
                <button 
                  onClick={completeRequest}
                  className="w-full py-4 bg-green-500 text-white rounded-xl font-black text-lg shadow-xl shadow-green-500/30 hover:bg-green-600 transition transform hover:scale-[1.02]"
                >
                  Mark as Completed
                </button>
              </motion.div>
            ) : pendingRequests.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <div className="w-24 h-24 mb-6 rounded-full glass-card flex items-center justify-center relative">
                   <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-red-500 animate-spin" />
                   <Activity className="text-slate-400" />
                </div>
                <p className="text-lg font-medium">{isAvailable ? 'Scanning for nearby emergencies...' : 'Go online to receive requests'}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {pendingRequests.map(request => (
                    <motion.div 
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, x: -100 }}
                      className="glass-card p-6 rounded-2xl border-l-4 border-l-red-500 flex flex-col md:flex-row justify-between gap-6 hover:bg-slate-50 dark:hover:bg-white/5 transition group"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-black tracking-widest rounded-md flex items-center gap-1">
                            <AlertTriangle size={14} /> {request.severity || 'HIGH'} SEVERITY
                          </span>
                          <span className="text-sm text-slate-500 font-medium flex items-center gap-1"><Clock size={14} /> Just now</span>
                        </div>
                        <h4 className="font-black text-xl mb-1">{request.patientName}</h4>
                        <p className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
                          <MapPin size={16} className="text-slate-400" /> {request.location}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center">
                        <button 
                          onClick={() => acceptRequest(request)}
                          className="px-8 py-3 bg-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-500/30 hover:bg-red-600 transition flex items-center justify-center gap-2 transform group-hover:scale-105"
                        >
                          <Navigation size={18} /> Accept Mission
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;
