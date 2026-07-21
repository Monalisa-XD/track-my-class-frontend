import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './StatisticsCards.css';

/**
 * StatisticsCards Component
 * Renders a grid of executive summary metric cards for Departments, Courses, Subjects, Teachers, Students, and Classes.
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

        return (
          <div
            key={card.id || card.title}
            className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
          >
            {/* Top Row: Icon Pill & Action Arrow */}
            <div className="flex items-start justify-between">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105 ${card.iconBg}`}
              >
                <IconComponent className="w-6 h-6" />
              </div>

              <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Middle Row: Big Count Number */}
            <div className="mt-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {card.title}
              </span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {card.value.toLocaleString()}
                </h3>
              </div>
            </div>

            {/* Bottom Row: Subtitle / Trend Description */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500 truncate">
                {card.subtitle}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${card.bgColor}`}>
                Active
              </span>
            </div>

          </div>
        );
      })}
    </div>
  );
}
