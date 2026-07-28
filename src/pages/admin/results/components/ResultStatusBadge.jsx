import React from 'react';

export default function ResultStatusBadge({ status }) {
  let badgeClasses = '';

  switch (status) {
    case 'Published':
      badgeClasses = 'from-emerald-500/8 to-teal-500/5 text-emerald-700 border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.18)]';
      break;
    case 'Draft':
      badgeClasses = 'from-amber-500/8 to-orange-500/5 text-amber-700 border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.18)]';
      break;
    case 'Pending':
      badgeClasses = 'from-blue-500/8 to-indigo-500/5 text-blue-700 border-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.18)]';
      break;
    case 'Failed':
      badgeClasses = 'from-rose-500/8 to-red-500/5 text-rose-700 border-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.18)]';
      break;
    default:
      badgeClasses = 'from-slate-400/8 to-slate-500/5 text-slate-500 border-slate-300 shadow-[0_0_8px_rgba(148,163,184,0.12)]';
  }

  return (
    <span className={`inline-flex w-20 justify-center py-0.5 rounded-full text-[10px] font-extrabold border bg-gradient-to-r ${badgeClasses} leading-none shrink-0`}>
      {status}
    </span>
  );
}
