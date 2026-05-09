import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Activity, Mail, Lock, User, Phone, Briefcase } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
    phone: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phone: formData.phone,
        createdAt: new Date()
      });
      
      if (formData.role === 'patient') navigate('/patient-dashboard');
      else if (formData.role === 'driver') navigate('/driver-dashboard');
      else if (formData.role === 'hospital_admin') navigate('/hospital-dashboard');
      else navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1121] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-100 font-sans relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="p-3 bg-red-500 rounded-2xl shadow-xl shadow-red-500/30">
            <Activity className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-4xl font-black tracking-tight">Create your account</h2>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account? <Link to="/login" className="font-bold text-red-500 hover:text-red-400 transition ml-1">Sign in</Link>
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass-card py-8 px-4 sm:rounded-[2rem] sm:px-10">
          <form className="space-y-6" onSubmit={handleRegister}>
            {error && <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-500/10 py-3 font-bold rounded-xl">{error}</div>}
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-12 sm:text-sm border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#111827]/50 dark:text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 p-3.5 outline-none transition backdrop-blur-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email address</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 sm:text-sm border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#111827]/50 dark:text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 p-3.5 outline-none transition backdrop-blur-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full pl-12 sm:text-sm border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#111827]/50 dark:text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 p-3.5 outline-none transition backdrop-blur-sm"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Role</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full pl-12 sm:text-sm border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#111827]/50 dark:text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 p-3.5 outline-none transition appearance-none backdrop-blur-sm font-medium"
                >
                  <option value="patient" className="dark:bg-[#111827]">Patient (Need Help)</option>
                  <option value="driver" className="dark:bg-[#111827]">Ambulance Driver</option>
                  <option value="hospital_admin" className="dark:bg-[#111827]">Hospital Admin</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-12 sm:text-sm border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#111827]/50 dark:text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 p-3.5 outline-none transition backdrop-blur-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-red-500/30 text-sm font-black tracking-wide text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? <Activity className="animate-spin" /> : "Sign Up"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
