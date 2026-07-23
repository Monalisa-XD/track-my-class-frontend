import React from 'react';
import { Building2, CheckCircle2, XCircle, UserCheck } from 'lucide-react';
import './DepartmentStats.css';

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
 * DepartmentStats Component
 * Renders 4 premium summary metric cards with lift hover effects and subtle colored glows.
 * 
 * @param {Object} props
 * @param {Array} props.departments - Array of all active departments
 */
export default function DepartmentStats({ departments = [] }) {
  // Compute metric calculations
  const total = departments.length;
  const active = departments.filter(d => d.status === 'Active').length;
  const inactive = departments.filter(d => d.status === 'Inactive').length;
  
  // Calculate unique HODs (filtering out empty names)
  const uniqueHods = new Set(
    departments
      .map(d => d.hod)
      .filter(hod => hod && hod.trim() !== '')
  ).size;

  const statCards = [
    {
      id: 'stat-total-dept',
      title: 'Total Departments',
      value: total,
      label: 'Registered branches',
      icon: Building2,
      color: 'blue'
    },
    {
      id: 'stat-active-dept',
      title: 'Active Departments',
      value: active,
      label: 'Offering courses',
      icon: CheckCircle2,
      color: 'emerald'
    },
    {
      id: 'stat-inactive-dept',
      title: 'Inactive Departments',
      value: inactive,
      label: 'Suspended branches',
      icon: XCircle,
      color: 'amber'
    },
    {
      id: 'stat-total-hods',
      title: 'Total HODs',
      value: uniqueHods,
      label: 'Department leaders',
      icon: UserCheck,
      color: 'indigo'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      {statCards.map((card) => {
        const IconComponent = card.icon;
        const glowClass = GLOW_CLASSES[card.color] || GLOW_CLASSES.blue;
        const gradientClass = ICON_GRADIENTS[card.color] || ICON_GRADIENTS.blue;

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
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {card.title}
              </span>
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
