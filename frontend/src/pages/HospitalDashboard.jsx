import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { Activity, Bell, Bed, Users, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

const HospitalDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [emergencies, setEmergencies] = useState([]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const q = query(
      collection(db, 'emergencies'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requests = [];
      snapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      setEmergencies(requests);
    });

    return () => unsubscribe();
  }, []);

  const activeCount = emergencies.filter(e => e.status !== 'completed').length;
  const pendingCount = emergencies.filter(e => e.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1121] text-slate-900 dark:text-slate-100 font-sans">
      <nav className="p-4 glass sticky top-0 z-50 shadow-sm flex justify-between items-center border-b border-slate-200 dark:border-white/5 px-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500 rounded-xl shadow-lg shadow-red-500/30">
             <Activity className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight">Hospital Admin</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-full">Facility: Central Hospital ({user?.name})</span>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-400 font-bold transition">Sign Out</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8 relative">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-3xl flex items-center gap-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="p-4 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-500/30">
              <Bed size={32} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Available Beds</p>
              <h3 className="text-4xl font-black">42</h3>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-3xl flex items-center gap-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="p-4 bg-orange-500 text-white rounded-2xl shadow-lg shadow-orange-500/30">
              <Bell size={32} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Pending SOS</p>
              <h3 className="text-4xl font-black">{pendingCount}</h3>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 rounded-3xl flex items-center gap-6 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="p-4 bg-purple-500 text-white rounded-2xl shadow-lg shadow-purple-500/30">
              <Users size={32} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Active Missions</p>
              <h3 className="text-4xl font-black">{activeCount}</h3>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-3xl overflow-hidden relative z-10">
          <div className="p-6 border-b border-slate-200 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-[#111827]/50">
            <h3 className="text-2xl font-black tracking-tight">Real-Time Emergency Feed</h3>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
              <span className="text-sm font-bold text-slate-500">LIVE</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100/50 dark:bg-[#0b1121]/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-5">Patient</th>
                  <th className="p-5">Severity</th>
                  <th className="p-5">Location</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                <AnimatePresence>
                  {emergencies.length === 0 ? (
                     <tr>
                        <td colSpan="5" className="p-10 text-center text-slate-500 font-medium">No emergency data available.</td>
                     </tr>
                  ) : emergencies.map((emergency) => (
                    <motion.tr 
                      key={emergency.id}
                      initial={{ opacity: 0, bg: 'rgba(239, 68, 68, 0.1)' }}
                      animate={{ opacity: 1, bg: 'transparent' }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-50 dark:hover:bg-white/5 transition duration-200"
                    >
                      <td className="p-5">
                        <p className="font-bold text-lg">{emergency.patientName}</p>
                        <p className="text-sm text-slate-500">{emergency.patientPhone}</p>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-md text-xs font-black tracking-widest ${
                          emergency.severity === 'HIGH' ? 'bg-red-500/10 text-red-500' : 
                          'bg-orange-500/10 text-orange-500'
                        }`}>
                          {emergency.severity || 'HIGH'}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-medium">
                          <MapPin size={16} /> {emergency.location}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className={`flex items-center gap-2 font-bold text-sm ${
                          emergency.status === 'pending' ? 'text-red-500' :
                          emergency.status === 'accepted' ? 'text-orange-500' :
                          'text-green-500'
                        }`}>
                          {emergency.status === 'pending' && <Activity size={16} className="animate-pulse" />}
                          {emergency.status === 'accepted' && <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>}
                          {emergency.status === 'completed' && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                          {emergency.status.toUpperCase()}
                          {emergency.driverName && <span className="text-slate-500 font-medium text-xs ml-2">(Driver: {emergency.driverName})</span>}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        {emergency.status !== 'completed' && (
                           <button className="px-4 py-2 bg-slate-200 dark:bg-white/10 hover:bg-blue-500 hover:text-white rounded-lg text-sm font-bold transition">
                             Prepare Bed
                           </button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HospitalDashboard;
