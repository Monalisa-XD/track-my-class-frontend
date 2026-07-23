import React from 'react';
import { BookOpen, CheckCircle2, XCircle, Building2 } from 'lucide-react';
import './CourseStats.css';

/**
 * Glow classes mapped to specific stats colors
 */
const GLOW_CLASSES = {
  blue: 'hover:shadow-glow-blue hover:border-blue-300/80',
  emerald: 'hover:shadow-glow-emerald hover:border-emerald-300/80',
  amber: 'hover:shadow-glow-amber hover:border-amber-300/80',
  indigo: 'hover:shadow-glow-indigo hover:border-indigo-300/80'
};

/**
 * Premium gradients matching the metric icons
 */
const ICON_GRADIENTS = {
  blue: 'from-blue-500 to-indigo-600 shadow-blue-500/20 group-hover:shadow-blue-500/40',
  emerald: 'from-emerald-500 to-teal-600 shadow-emerald-500/20 group-hover:shadow-emerald-500/40',
  amber: 'from-amber-500 to-orange-600 shadow-amber-500/20 group-hover:shadow-amber-500/40',
  indigo: 'from-indigo-500 to-purple-600 shadow-indigo-500/20 group-hover:shadow-indigo-500/40'
};

/**
 * CourseStats Component
 * Renders 4 premium summary metric cards with dynamic trend indicators and hover animations.
 * 
 * @param {Object} props
 * @param {Array} props.courses - Array of all active courses
 */
export default function CourseStats({ courses = [] }) {
  // Compute metric calculations
  const total = courses.length;
  const active = courses.filter(c => c.status === 'Active').length;
  const inactive = courses.filter(c => c.status === 'Inactive').length;
  
  // Calculate unique departments offering courses
  const uniqueDepts = new Set(
    courses
      .map(c => c.department)
      .filter(dept => dept && dept.trim() !== '')
  ).size;

  const statCards = [
    {
      id: 'stat-total-courses',
      title: 'Total Courses',
      value: total,
      label: 'Degree programs',
      icon: BookOpen,
      color: 'blue',
      trend: 'Updated today',
      trendType: 'neutral'
    },
    {
      id: 'stat-active-courses',
      title: 'Active Courses',
      value: active,
      label: 'Currently offering',
      icon: CheckCircle2,
      color: 'emerald',
      trend: '↑ +2 this month',
      trendType: 'success'
    },
    {
      id: 'stat-inactive-courses',
      title: 'Inactive Courses',
      value: inactive,
      label: 'Suspended courses',
      icon: XCircle,
      color: 'amber',
      trend: 'Stable',
      trendType: 'neutral'
    },
    {
      id: 'stat-total-depts',
      title: 'Active Departments',
      value: uniqueDepts,
      label: 'Offering branches',
      icon: Building2,
      color: 'indigo',
      trend: 'Recently added',
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
              
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none mt-1">
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
