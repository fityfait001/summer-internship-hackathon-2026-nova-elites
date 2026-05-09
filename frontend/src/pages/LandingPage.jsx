import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert, MapPin, Clock, Activity, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1121] text-slate-900 dark:text-slate-100 font-sans relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 dark:opacity-20 pointer-events-none mix-blend-overlay" />

      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-500 rounded-2xl shadow-xl shadow-red-500/30">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter">LifeLine AI</span>
        </div>
        <div className="space-x-4 flex items-center">
          <Link to="/login" className="px-5 py-2.5 font-bold hover:text-red-500 transition">Login</Link>
          <Link to="/register" className="px-6 py-3 bg-white dark:bg-white/10 text-slate-900 dark:text-white rounded-xl font-bold shadow-lg hover:shadow-xl dark:border dark:border-white/10 hover:-translate-y-0.5 transition backdrop-blur-md">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-32 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-5 py-2 rounded-full glass inline-flex items-center gap-2 mb-8 border border-red-500/20"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-600 dark:text-red-400 text-sm font-bold tracking-widest uppercase">AI-Powered Emergency Response</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter mb-8 leading-[1.1]">
            Seconds Save <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-[length:200%_auto] animate-gradient">Lives.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 font-medium leading-relaxed max-w-3xl mx-auto">
            Smart ambulance routing, real-time tracking, and AI-assisted emergency severity analysis to connect you with the fastest help possible.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register" className="px-10 py-5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl text-lg font-black tracking-wide shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-1 transition transform flex items-center justify-center gap-3 group">
              Request Emergency Help
              <ArrowRight className="group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 w-full"
        >
          <div className="p-10 rounded-[2.5rem] glass-card text-left relative overflow-hidden group hover:-translate-y-2 transition duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
            <div className="p-4 bg-red-500/10 w-fit rounded-2xl mb-8">
               <ShieldAlert className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-3xl font-black mb-4 tracking-tight">Instant SOS</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">One tap to alert the nearest ambulance and hospitals with your live location.</p>
          </div>
          
          <div className="p-10 rounded-[2.5rem] glass-card text-left relative overflow-hidden group hover:-translate-y-2 transition duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
            <div className="p-4 bg-orange-500/10 w-fit rounded-2xl mb-8">
               <MapPin className="h-10 w-10 text-orange-500" />
            </div>
            <h3 className="text-3xl font-black mb-4 tracking-tight">Smart Routing</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">AI calculates the fastest route avoiding traffic to reach you in record time.</p>
          </div>

          <div className="p-10 rounded-[2.5rem] glass-card text-left relative overflow-hidden group hover:-translate-y-2 transition duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
            <div className="p-4 bg-blue-500/10 w-fit rounded-2xl mb-8">
               <Clock className="h-10 w-10 text-blue-500" />
            </div>
            <h3 className="text-3xl font-black mb-4 tracking-tight">Live Tracking</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Watch the ambulance approach in real-time with precise ETA updates.</p>
          </div>
        </motion.div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}} />
    </div>
  );
};

export default LandingPage;
