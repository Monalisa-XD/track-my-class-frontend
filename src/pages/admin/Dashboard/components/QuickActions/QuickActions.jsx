import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';
import './QuickActions.css';

/**
 * Glow classes mapped to specific module colors
 */
const GLOW_CLASSES = {
  blue: 'hover:shadow-glow-blue hover:border-blue-300/80',
  indigo: 'hover:shadow-glow-indigo hover:border-indigo-300/80',
  purple: 'hover:shadow-glow-purple hover:border-purple-300/80',
  emerald: 'hover:shadow-glow-emerald hover:border-emerald-300/80',
  cyan: 'hover:shadow-glow-cyan hover:border-cyan-300/80',
  amber: 'hover:shadow-glow-amber hover:border-amber-300/80',
  orange: 'hover:shadow-glow-orange hover:border-orange-300/80',
  green: 'hover:shadow-glow-green hover:border-green-300/80'
};

/**
 * Premium gradients matching the module icons
 */
const ICON_GRADIENTS = {
  blue: 'from-blue-500 to-indigo-600 shadow-blue-500/20 group-hover:shadow-blue-500/40',
  indigo: 'from-indigo-500 to-purple-600 shadow-indigo-500/20 group-hover:shadow-indigo-500/40',
  purple: 'from-purple-500 to-pink-600 shadow-purple-500/20 group-hover:shadow-purple-500/40',
  emerald: 'from-emerald-500 to-teal-600 shadow-emerald-500/20 group-hover:shadow-emerald-500/40',
  cyan: 'from-cyan-500 to-blue-500 shadow-cyan-500/20 group-hover:shadow-cyan-500/40',
  amber: 'from-amber-500 to-orange-600 shadow-amber-500/20 group-hover:shadow-amber-500/40',
  orange: 'from-orange-500 to-red-600 shadow-orange-500/20 group-hover:shadow-orange-500/40',
  green: 'from-green-500 to-emerald-600 shadow-green-500/20 group-hover:shadow-green-500/40'
};

/**
 * ActionCard component: reusable individual action shortcut card
 */
function ActionCard({ action }) {
  const IconComponent = action.icon;
  const glowClass = GLOW_CLASSES[action.color] || GLOW_CLASSES.blue;
  const gradientClass = ICON_GRADIENTS[action.color] || ICON_GRADIENTS.blue;

  return (
    <Link
      to={action.path}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50/50 border border-slate-200/60 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover select-none overflow-hidden ${glowClass}`}
    >
      {/* Subtle Inner Top Glow Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />

      <div className="space-y-4">
        {/* Top row: Icon with Ambient Glow & Action Arrow */}
        <div className="flex items-start justify-between">
          <div
            className={`w-11 h-11 rounded-xl bg-gradient-to-tr text-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 ${gradientClass}`}
          >
            <IconComponent className="w-5.5 h-5.5" />
          </div>

          <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50/80 border border-slate-100 group-hover:border-blue-100 transition-all duration-200 shadow-2xs">
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Content details */}
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors duration-200">
            {action.title}
          </h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            {action.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

/**
 * QuickActions Component
 * Renders the administrative Action Center with shortcuts for ERP management
 * 
 * @param {Object} props
 * @param {Array} props.actions - Array of action card objects
 */
export default function QuickActions({ actions = [] }) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="relative overflow-hidden bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 hover:shadow-ambient-hover hover:border-slate-300 select-none space-y-5">
      {/* Inner Top Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-60" />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 fill-current text-white/90" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 tracking-tight">
              Quick Actions
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Frequently used administrative shortcuts for faster Academic ERP management.
            </p>
          </div>
        </div>

        {/* View All Modules button */}
        <button
          type="button"
          onClick={() => alert('Navigating to all Academic ERP modules overview.')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all group shrink-0"
        >
          <span>View All Modules</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Grid of Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {actions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
      </div>
    </div>
  );
}
