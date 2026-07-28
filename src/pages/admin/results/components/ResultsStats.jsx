import React from 'react';
import { Award, CheckCircle2, Clock, GraduationCap } from 'lucide-react';

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

export default function ResultsStats({ results = [] }) {
  const total = results.length;
  const publishedCount = results.filter((r) => r.status === 'Published').length;
  const pendingCount = results.filter((r) => r.status === 'Pending' || r.status === 'Draft').length;
  
  // Pass rate = (Total entries - Failed entries) / Total entries
  const failedCount = results.filter((r) => r.status === 'Failed' || r.grade === 'F').length;
  const passRate = total ? Math.round(((total - failedCount) / total) * 100) : 80;
  const publishedRate = total ? Math.round((publishedCount / total) * 100) : 80;

  const statCards = [
    {
      id: 'stat-total-results',
      title: 'Total Results',
      value: total,
      label: 'Exam score cards',
      icon: Award,
      color: 'blue',
      trend: 'Updated today',
      trendType: 'neutral'
    },
    {
      id: 'stat-published-results',
      title: 'Published Results',
      value: publishedCount,
      label: 'Officially published',
      icon: CheckCircle2,
      color: 'emerald',
      trend: `${publishedRate}% published`,
      trendType: 'success'
    },
    {
      id: 'stat-pending-results',
      title: 'Pending Results',
      value: pendingCount,
      label: 'Awaiting approval / draft',
      icon: Clock,
      color: 'amber',
      trend: 'Action required',
      trendType: 'danger'
    },
    {
      id: 'stat-pass-rate',
      title: 'Overall Pass Rate',
      value: `${passRate}%`,
      label: 'Average score threshold',
      icon: GraduationCap,
      color: 'indigo',
      trend: '+2.4% shift',
      trendType: 'success'
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
            className={`group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-ambient-hover flex flex-row items-center gap-4 overflow-hidden ${glowClass}`}
          >
            {/* Subtle Inner Top Glow Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />

            {/* Gradient Icon pill */}
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-tr text-white flex items-center justify-center shrink-0 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 ${gradientClass}`}
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
