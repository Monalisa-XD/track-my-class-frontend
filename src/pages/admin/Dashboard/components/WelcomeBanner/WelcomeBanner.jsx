import React from 'react';
import { Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import './WelcomeBanner.css';

/**
 * WelcomeBanner Component
 * Enterprise SaaS gradient banner with inner highlight, ambient glow, and micro-interactions.
 * 
 * @param {Object} props
 * @param {Object} props.data - Welcome metadata object
 */
export default function WelcomeBanner({ data }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const { greeting = "Welcome back", userName = "Admin", subtitle, academicSession } = data || {};

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-6 md:p-8 shadow-ambient shadow-glow-blue select-none border border-blue-500/30 transition-all duration-300 hover:shadow-ambient-hover">
      
      {/* Inner Top Highlight Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Decorative Subtle Background Orbs */}
      <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-gradient-to-tr from-indigo-500/20 to-sky-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-48 -top-24 w-56 h-56 bg-blue-400/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* Left Info Column */}
        <div className="space-y-3 max-w-2xl">
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-100 border border-white/20 shadow-inner">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDate}</span>
            </span>

            {academicSession && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md text-xs font-semibold text-blue-200 border border-blue-400/30 shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                <span>{academicSession}</span>
              </span>
            )}
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
            {greeting}, <span className="text-white drop-shadow-md">{userName}</span>! 👋
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-blue-100/90 font-medium leading-relaxed">
            {subtitle || "Here's an overview of today's academic activities across all university departments."}
          </p>
        </div>

        {/* Right Status Badge */}
        <div className="shrink-0 flex items-center md:flex-col md:items-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-white/15">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/40 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ERP Operational</span>
          </div>
          <span className="text-[11px] text-blue-200/80 font-medium hidden md:inline">
            Role: Administrator
          </span>
        </div>

      </div>
    </div>
  );
}
