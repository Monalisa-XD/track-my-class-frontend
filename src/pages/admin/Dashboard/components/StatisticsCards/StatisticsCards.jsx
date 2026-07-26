import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './StatisticsCards.css';

/**
 * Color-matched glow mapping for metric cards
 */
const GLOW_CLASSES = {
  blue: 'hover:shadow-glow-blue hover:border-blue-300/80',
  indigo: 'hover:shadow-glow-indigo hover:border-indigo-300/80',
  purple: 'hover:shadow-glow-purple hover:border-purple-300/80',
  emerald: 'hover:shadow-glow-emerald hover:border-emerald-300/80',
  cyan: 'hover:shadow-glow-cyan hover:border-cyan-300/80',
  amber: 'hover:shadow-glow-amber hover:border-amber-300/80'
};

/**
 * Color-matched badge classes with stronger borders and subtle glows
 */
const BADGE_CLASSES = {
  blue: 'bg-blue-50 text-blue-700 border-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.12)]',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-[0_0_8px_rgba(99,102,241,0.12)]',
  purple: 'bg-purple-50 text-purple-700 border-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.12)]',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.12)]',
  cyan: 'bg-cyan-50 text-cyan-700 border-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.12)]',
  amber: 'bg-amber-50 text-amber-700 border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.12)]'
};

/**
 * StatisticsCards Component
 * Premium executive summary metric cards with lift-on-hover, subtle colored glow, and inner top highlight.
 * 
 * @param {Object} props
 * @param {Array} props.items - Array of metric card objects
 */
export default function StatisticsCards({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 select-none">
      {items.map((card) => {
        const IconComponent = card.icon;
        const glowClass = GLOW_CLASSES[card.color] || GLOW_CLASSES.blue;

        return (
          <div
            key={card.id || card.title}
            className={`group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-200 ease-out hover:-translate-y-1 flex flex-col justify-between overflow-hidden ${glowClass}`}
          >
            {/* Subtle Inner Top Glow Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-60" />

            {/* Top Row: Icon Pill & Action Arrow */}
            <div className="flex items-start justify-between">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-110 ${card.iconBg}`}
              >
                <IconComponent className="w-6 h-6" />
              </div>

              <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50/80 border border-slate-100 group-hover:border-blue-100 transition-colors shadow-2xs">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Middle Row: Big Count Number */}
            <div className="mt-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {card.title}
              </span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                  {card.value.toLocaleString()}
                </h3>
              </div>
            </div>

            {/* Bottom Row: Subtitle / Trend Description */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500 truncate">
                {card.subtitle}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border leading-none shrink-0 ${BADGE_CLASSES[card.color] || BADGE_CLASSES.blue}`}>
                Active
              </span>
            </div>

          </div>
        );
      })}
    </div>
  );
}
