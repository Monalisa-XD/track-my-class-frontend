import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Loader2, Sparkles, BookOpen } from 'lucide-react';
import './Login.css';

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock User Database
  const mockUsers = {
    admin: {
      name: 'Admin Controller',
      email: 'admin@trackmyclass.com',
      password: 'admin123',
      role: 'ADMIN',
      regNo: 'VSSUT-ADM-0001'
    },
    teacher: {
      name: 'Dr. Satya Prakash Sahoo',
      email: 'teacher@trackmyclass.com',
      password: 'teacher123',
      role: 'TEACHER',
      regNo: 'VSSUT-FAC-0041'
    },
    student: {
      name: 'Prasad Kumar Rauta',
      email: 'student@trackmyclass.com',
      password: 'student123',
      role: 'STUDENT',
      regNo: '25061011510037'
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!email) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Invalid email address format';
    }

    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Simulate Network Latency
    setTimeout(() => {
      // Find matching mock user
      const matchedKey = Object.keys(mockUsers).find(
        key => mockUsers[key].email.toLowerCase() === email.toLowerCase() && mockUsers[key].password === password
      );

      if (matchedKey) {
        const user = mockUsers[matchedKey];
        onLogin(user);
        setIsLoading(false);
        navigate(`/${user.role.toLowerCase()}/dashboard`);
      } else {
        setErrors({ auth: 'Invalid email address or password credentials.' });
        setIsLoading(false);
      }
    }, 800);
  };

  const handleQuickLogin = (roleKey) => {
    const user = mockUsers[roleKey];
    setEmail(user.email);
    setPassword(user.password);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row select-none">
      
      {/* Left Brand Panel - Desktop Only */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-[#1E3A8A] to-[#2563EB] text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative Grid Overlays (Subtle abstract shapes 5-8% opacity) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header Branding */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shadow-lg">
            <BookOpen className="w-5.5 h-5.5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight leading-none">TrackMyClass</h1>
            <p className="text-[10px] text-blue-150 uppercase tracking-widest mt-1 font-bold">Academic ERP</p>
          </div>
        </div>

        {/* Welcome Pitch */}
        <div className="space-y-4 relative z-10 my-auto max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-bold text-blue-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to VSSUT Campus ERP</span>
          </div>
          <h2 className="text-3xl font-black leading-tight tracking-tight">
            Manage Your Classrooms & Academic Progress Seamlessly
          </h2>
          <p className="text-sm text-blue-100/80 leading-relaxed font-medium">
            Access schedules, mark attendance sheets, publish mark updates, and coordinate with faculty resources under a single secure platform.
          </p>
        </div>

        {/* Footnote */}
        <div className="text-xs text-blue-200/50 font-semibold relative z-10">
          &copy; 2026 TrackMyClass. All rights reserved. VSSUT ERP Division.
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white rounded-[20px] border border-slate-200/80 shadow-brand-ambient p-8 space-y-6 login-card-fade">
          
          {/* Card Header Branding */}
          <div className="text-center space-y-2 select-none">
            {/* Logo for mobile */}
            <div className="md:hidden flex items-center justify-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-[#0F172A]">TrackMyClass</span>
            </div>

            <h2 className="text-2xl font-black text-[#0F172A] tracking-tight leading-none">Welcome Back</h2>
            <p className="text-xs text-[#64748B] font-semibold">Sign in to continue to your academic portal.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            
            {/* Global Authentication Error */}
            {errors.auth && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2 select-text">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.auth}</span>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-2.5 text-xs bg-white border rounded-xl outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all font-medium text-[#0F172A] ${
                    errors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-red-600 font-bold pl-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center select-none">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Password</label>
                <span className="text-[10px] font-bold text-[#2563EB] hover:text-[#1D4ED8] cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className={`w-full pl-10 pr-10 py-2.5 text-xs bg-white border rounded-xl outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all font-medium text-[#0F172A] ${
                    errors.password ? 'border-red-400 focus:border-red-500' : 'border-slate-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-655 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-600 font-bold pl-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between select-none pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#64748B]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-350 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                />
                <span>Remember Me</span>
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E3A8A] text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/15 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Quick Demo Logins Selection Panel */}
          <div className="pt-5 border-t border-slate-100 space-y-3 select-none">
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest text-center">Quick Demo Accounts</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="py-2 border border-slate-200 bg-white hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50/50 text-[#64748B] font-bold text-[10px] rounded-full active:scale-95 transition-all cursor-pointer"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('teacher')}
                className="py-2 border border-slate-200 bg-white hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50/50 text-[#64748B] font-bold text-[10px] rounded-full active:scale-95 transition-all cursor-pointer"
              >
                Teacher
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('student')}
                className="py-2 border border-slate-200 bg-white hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50/50 text-[#64748B] font-bold text-[10px] rounded-full active:scale-95 transition-all cursor-pointer"
              >
                Student
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline fallback for missing AlertCircle import
function AlertCircle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
