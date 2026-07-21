import React from 'react';
import { Activity, ArrowRight, User, Clock } from 'lucide-react';
import './RecentActivities.css';

/**
 * RecentActivities Component
 * Renders a vertical timeline audit feed summarizing system events across all ERP modules.
 * 
 * @param {Object} props
 * @param {Array} props.activities - Array of activity log objects
 */
export default function RecentActivities({ activities = [] }) {
  if (!activities || activities.length === 0) return null;

  return (
    <div className="relative overflow-hidden bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 hover:shadow-ambient-hover hover:border-slate-300 select-none space-y-5">
      
      {/* Inner Top Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-60" />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 tracking-tight">
              Recent System Activities
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Real-time audit log of system events across all academic modules
            </p>
          </div>
        </div>

        {/* Link to Activity Audit Log */}
        <button
          type="button"
          onClick={() => alert('Navigating to full System Audit Log')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all group"
        >
          <span>View All Activities</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Vertical Timeline Container with Lighter Connector Line */}
      <div className="relative pl-3 space-y-4 before:absolute before:left-7 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200/40">
        {activities.map((act) => {
          const IconComp = act.icon || Activity;

          return (
            <div
              key={act.id || act.title}
              className="relative flex items-start gap-4 group"
            >
              {/* Timeline Icon Node */}
              <div
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-md transition-transform duration-200 group-hover:scale-110 ${act.iconBg || 'bg-blue-600 text-white'}`}
              >
                <IconComp className="w-4.5 h-4.5" />
              </div>

              {/* Event Card */}
              <div className="flex-1 p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 space-y-2">
                
                {/* Top Row: Title, Module Tag, & Status Badge */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                      {act.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-700">
                      {act.module}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs shrink-0 ${act.badgeBg || 'bg-slate-100 text-slate-600'}`}>
                    {act.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {act.description}
                </p>

                {/* Footer Metadata: User & Relative Time */}
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 pt-2 border-t border-slate-200/40">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>By: <strong className="text-slate-600 font-semibold">{act.user}</strong></span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="font-semibold text-slate-500">{act.time}</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
