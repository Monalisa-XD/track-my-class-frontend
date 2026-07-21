import React from 'react';
import { Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import './WelcomeBanner.css';

/**
 * WelcomeBanner Component
 * Renders a personalized greeting card with current date, session info, and quick system status.
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
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-6 md:p-8 shadow-xl shadow-blue-600/15 select-none">
      
      {/* Decorative Background Elements */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute right-40 -top-20 w-48 h-48 bg-indigo-400/10 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* Left Info Column */}
        <div className="space-y-2 max-w-2xl">
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-100 border border-white/15">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentDate}</span>
            </span>

            {academicSession && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md text-xs font-semibold text-blue-200 border border-blue-400/30">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                <span>{academicSession}</span>
              </span>
            )}
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
            {greeting}, <span className="text-white drop-shadow-sm">{userName}</span>! 👋
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-blue-100/90 font-medium leading-relaxed">
            {subtitle || "Here's an overview of today's academic activities across all university departments."}
          </p>
        </div>

        {/* Right Status Badge */}
        <div className="shrink-0 flex items-center md:flex-col md:items-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/40 backdrop-blur-md border border-white/10 text-xs font-semibold text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ERP Operational</span>
          </div>
          <span className="text-[11px] text-blue-200/80 font-medium hidden md:inline">
            Role: System Administrator
          </span>
        </div>

      </div>
    </div>
  );
}
