import React from 'react';
import { Link } from 'react-router-dom';
import { ListTodo, ArrowRight } from 'lucide-react';

const PRIORITY_CONFIG = {
  HIGH: {
    badge: 'bg-rose-50 text-rose-700 border-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.15)]',
    ring: 'border-rose-200/80 hover:border-rose-300 hover:shadow-[0_4px_16px_-4px_rgba(244,63,94,0.15)]',
    dot: 'bg-rose-500'
  },
  MEDIUM: {
    badge: 'bg-amber-50 text-amber-700 border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.15)]',
    ring: 'border-amber-100/80 hover:border-amber-200 hover:shadow-[0_4px_16px_-4px_rgba(245,158,11,0.10)]',
    dot: 'bg-amber-500'
  },
  LOW: {
    badge: 'bg-blue-50 text-blue-700 border-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.12)]',
    ring: 'border-slate-200/60 hover:border-blue-200 hover:shadow-sm',
    dot: 'bg-blue-400'
  }
};

export default function PendingTasks({ tasks = [] }) {
  if (!tasks || tasks.length === 0) return null;

  const highCount = tasks.filter(t => t.priority === 'HIGH').length;

  return (
    <div className="relative overflow-hidden bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 hover:shadow-ambient-hover hover:border-slate-300 select-none space-y-5">

      {/* Inner Top Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-60" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-orange-500 text-white shadow-md shadow-rose-500/25 flex items-center justify-center shrink-0">
            <ListTodo className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 tracking-tight">Pending Tasks</h3>
            <p className="text-xs text-slate-500 font-medium">
              {tasks.length} pending items
              {highCount > 0 && (
                <span className="ml-1.5 text-rose-600 font-bold">• {highCount} high priority</span>
              )}
            </p>
          </div>
        </div>
        <span className={`shrink-0 inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold border ${highCount > 0 ? 'bg-rose-50 text-rose-700 border-rose-300' : 'bg-slate-100 text-slate-600 border-slate-300'}`}>
          {tasks.length} Open
        </span>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {tasks.map((task) => {
          const IconComp = task.icon;
          const cfg = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.LOW;

          return (
            <Link
              key={task.id}
              to={task.path}
              className={`group relative flex items-start gap-3.5 p-4 rounded-xl bg-white border transition-all duration-200 ease-out hover:-translate-y-0.5 overflow-hidden ${cfg.ring}`}
            >
              {/* Priority Dot */}
              <div className={`absolute top-3.5 right-3.5 w-2 h-2 rounded-full shrink-0 ${cfg.dot} ${task.priority === 'HIGH' ? 'animate-pulse' : ''}`} />

              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs border transition-transform duration-200 group-hover:scale-105 ${
                task.priority === 'HIGH' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                task.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                'bg-blue-50 text-blue-600 border-blue-100'
              }`}>
                <IconComp className="w-4.5 h-4.5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-1 pr-4">
                <div className="flex items-start gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug flex-1 min-w-0">
                    {task.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{task.description}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-semibold text-slate-400">{task.dueLabel}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border leading-none ${cfg.badge}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
