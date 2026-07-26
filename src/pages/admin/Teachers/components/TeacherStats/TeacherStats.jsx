import React from 'react';
import { Users, CheckCircle2, Building2, BookOpen } from 'lucide-react';
import './TeacherStats.css';

const GLOW_CLASSES = {
  blue: 'hover:shadow-glow-blue hover:border-blue-300/80',
  emerald: 'hover:shadow-glow-emerald hover:border-emerald-300/80',
  amber: 'hover:shadow-glow-amber hover:border-amber-300/80',
  indigo: 'hover:shadow-glow-indigo hover:border-indigo-300/80'
};

const ICON_GRADIENTS = {
  blue: 'from-blue-500 to-indigo-600 shadow-blue-500/20 group-hover:shadow-blue-500/40',
  emerald: 'from-emerald-500 to-teal-600 shadow-emerald-500/20 group-hover:shadow-emerald-500/40',
  amber: 'from-amber-500 to-orange-600 shadow-amber-500/20 group-hover:shadow-amber-500/40',
  indigo: 'from-indigo-500 to-purple-600 shadow-indigo-500/20 group-hover:shadow-indigo-500/40'
};

export default function TeacherStats({ teachers = [] }) {
  const total = teachers.length;
  const active = teachers.filter(t => t.status === 'Active').length;
  
  // Calculate unique departments covered
  const uniqueDepts = new Set(
    teachers
      .map(t => t.department)
      .filter(dept => dept && dept.trim() !== '')
  ).size;

  // Calculate unique assigned subjects
  const allSubjects = teachers.reduce((acc, t) => {
    if (t.subjects && Array.isArray(t.subjects)) {
      t.subjects.forEach(sub => acc.add(sub));
    }
    return acc;
  }, new Set());
  const uniqueSubjectsCount = allSubjects.size;

  const statCards = [
    {
      id: 'stat-total-teachers',
      title: 'Total Teachers',
      value: total,
      label: 'Faculty members',
      icon: Users,
      color: 'blue',
      trend: 'Updated today',
      trendType: 'neutral'
    },
    {
      id: 'stat-active-teachers',
      title: 'Active Teachers',
      value: active,
      label: 'Teaching staff',
      icon: CheckCircle2,
      color: 'emerald',
      trend: '+2 this month',
      trendType: 'success'
    },
    {
      id: 'stat-depts-covered',
      title: 'Depts Covered',
      value: uniqueDepts,
      label: 'Academic branches',
      icon: Building2,
      color: 'amber',
      trend: 'Stable',
      trendType: 'neutral'
    },
    {
      id: 'stat-assigned-subjects',
      title: 'Assigned Subjects',
      value: uniqueSubjectsCount,
      label: 'Subject assignments',
      icon: BookOpen,
      color: 'indigo',
      trend: 'Recently joined',
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
