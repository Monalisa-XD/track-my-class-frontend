import React from 'react';

export default function GradeBadge({ grade }) {
  let colorClasses = '';

  switch (grade) {
    case 'A+':
    case 'A':
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      break;
    case 'B+':
    case 'B':
      colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
      break;
    case 'C':
      colorClasses = 'bg-indigo-50 text-indigo-700 border-indigo-200';
      break;
    case 'D':
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
      break;
    case 'F':
      colorClasses = 'bg-rose-50 text-rose-700 border-rose-200 font-black animate-pulse';
      break;
    default:
      colorClasses = 'bg-slate-50 text-slate-650 border-slate-200';
  }

  return (
    <span className={`inline-flex w-8.5 h-8.5 rounded-full items-center justify-center font-extrabold font-mono text-xs border shadow-2xs ${colorClasses}`}>
      {grade}
    </span>
  );
}
