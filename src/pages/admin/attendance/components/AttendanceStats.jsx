import React from 'react';
import { CheckCircle2, UserCheck, XCircle, Clock } from 'lucide-react';

const GLOW_CLASSES = {
  blue: 'hover:shadow-glow-blue hover:border-blue-300/80',
  emerald: 'hover:shadow-glow-emerald hover:border-emerald-300/80',
  amber: 'hover:shadow-glow-amber hover:border-amber-300/80',
  indigo: 'hover:shadow-glow-indigo hover:border-indigo-300/80'
};

const ICON_GRADIENTS = {
  blue: 'from-blue-500 to-indigo-600 shadow-glow-blue group-hover:shadow-blue-500/40',
  emerald: 'from-emerald-500 to-teal-600 shadow-glow-emerald group-hover:shadow-emerald-500/40',
  amber: 'from-amber-500 to-orange-600 shadow-glow-amber group-hover:shadow-amber-500/40',
  indigo: 'from-indigo-500 to-purple-600 shadow-glow-indigo group-hover:shadow-indigo-500/40'
};

export default function AttendanceStats({ records = [] }) {
  const total = records.length;
  
  // Computations
  const overallAvg = total
    ? Math.round(records.reduce((sum, r) => sum + r.percentage, 0) / total)
    : 84;

  const presentCount = records.filter((r) => r.status === 'Present').length;
  const absentCount = records.filter((r) => r.status === 'Absent').length;
  const lateCount = records.filter((r) => r.status === 'Late').length;

  const presentRate = total ? Math.round((presentCount / total) * 100) : 90;

  const statCards = [
    {
      id: 'stat-overall-attendance',
      title: 'Overall Attendance',
      value: `${overallAvg}%`,
      label: 'System-wide average',
      icon: CheckCircle2,
      color: 'blue',
      trend: 'Stable',
      trendType: 'neutral'
    },
    {
      id: 'stat-present-today',
      title: 'Present Today',
      value: presentCount,
      label: 'Students present today',
      icon: UserCheck,
      color: 'emerald',
      trend: `${presentRate}% rate`,
      trendType: 'success'
    },
    {
      id: 'stat-absent-today',
      title: 'Absent Today',
      value: absentCount,
      label: 'Absent students',
      icon: XCircle,
      color: 'amber', // Matches orange/amber palette
      trend: 'Action required',
      trendType: 'danger'
    },
    {
      id: 'stat-late-students',
      title: 'Late Students',
      value: lateCount,
      label: 'Tardy arrivals',
      icon: Clock,
      color: 'indigo', // Matches purple/indigo palette
      trend: 'Checked today',
      trendType: 'neutral'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      {statCards.map((card) => {
        const IconComponent = card.icon;
        const glowClass = GLOW_CLASSES[card.color] || GLOW_CLASSES.blue;
        const gradientClass = ICON_GRADIENTS[card.color] || ICON_GRADIENTS.blue;
        const isSuccessTrend = card.trendType === 'success';
        const isDangerTrend = card.trendType === 'danger';

        return (
          <div
            key={card.id}
            className={`group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex flex-row items-center gap-4 overflow-hidden ${glowClass}`}
          >
            {/* Subtle Inner Top Glow Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />

            {/* Gradient Icon pill */}
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-tr text-white flex items-center justify-center shrink-0 shadow-lg transition-all duration-300 group-hover:scale-105 ${gradientClass}`}
            >
              <IconComponent className="w-6 h-6" />
            </div>

            {/* Content info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {card.title}
                </span>
                
                {/* Trend indicator pill */}
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold border ${
                    isSuccessTrend
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60 shadow-[0_1px_4px_rgba(16,185,129,0.06)]'
                      : isDangerTrend
                      ? 'bg-rose-50 text-rose-700 border-rose-200/60 shadow-[0_1px_4px_rgba(244,63,94,0.06)]'
                      : 'bg-slate-50 text-slate-500 border-slate-200/60'
                  }`}
                >
                  {card.trend}
                </span>
              </div>
              
              <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">
                {card.value}
              </h3>
              <p className="text-xs text-slate-500 font-semibold truncate mt-1">
                {card.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
