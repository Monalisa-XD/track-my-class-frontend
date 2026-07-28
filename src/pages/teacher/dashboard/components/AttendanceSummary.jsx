import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, ArrowRight, UserCheck, UserX, Clock, CheckCircle2 } from 'lucide-react';

export default function AttendanceSummary({ data }) {
  const {
    date = 'Today',
    lastUpdated = '',
    overallPresent = 0,
    overallAbsent = 0,
    overallLate = 0,
    overallPercentage = 0,
    totalStudents = 0,
    classBreakdown = []
  } = data || {};

  const isGood = overallPercentage >= 85;
  const isAvg = overallPercentage >= 75 && overallPercentage < 85;

  let statusText = 'Good Attendance';
  let statusCls = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
  if (!isGood && !isAvg) { statusText = 'Needs Attention'; statusCls = 'bg-rose-50 text-rose-700 border-rose-200/80'; }
  else if (isAvg) { statusText = 'Average Attendance'; statusCls = 'bg-amber-50 text-amber-700 border-amber-200/80'; }

  return (
    <div className="relative overflow-hidden bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 hover:shadow-ambient-hover hover:border-slate-300 select-none space-y-5">

      {/* Inner Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-60" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 tracking-tight">Attendance Summary</h3>
            <p className="text-xs text-slate-500 font-medium">
              {date} class-wise breakdown
              {lastUpdated && <span className="text-slate-400"> • {lastUpdated}</span>}
            </p>
          </div>
        </div>
        <Link to="/teacher/attendance" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all group shrink-0">
          <span>Mark Attendance</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Overall row */}
      <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/60 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Today's Overall</span>
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${statusCls}`}>
            <CheckCircle2 className="w-3 h-3" />
            {statusText}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{overallPercentage}%</span>
          <span className="text-xs text-slate-500 font-medium">{totalStudents} Total Students</span>
        </div>
        {/* Segmented bar */}
        <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden flex shadow-inner">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
            style={{ width: `${(overallPresent / totalStudents) * 100}%` }} />
          <div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-500"
            style={{ width: `${(overallLate / totalStudents) * 100}%` }} />
          <div className="h-full bg-gradient-to-r from-rose-500 to-red-400 transition-all duration-500"
            style={{ width: `${(overallAbsent / totalStudents) * 100}%` }} />
        </div>
        <div className="flex items-center gap-4 text-[11px] font-semibold">
          <span className="flex items-center gap-1 text-emerald-700"><UserCheck className="w-3.5 h-3.5" />{overallPresent} Present</span>
          <span className="flex items-center gap-1 text-rose-600"><UserX className="w-3.5 h-3.5" />{overallAbsent} Absent</span>
          <span className="flex items-center gap-1 text-amber-600"><Clock className="w-3.5 h-3.5" />{overallLate} Late</span>
        </div>
      </div>

      {/* Per-class Breakdown */}
      <div className="space-y-2.5">
        {classBreakdown.map((cls) => {
          const presentPct = Math.round((cls.present / cls.total) * 100);
          const isPending = cls.status === 'PENDING';
          return (
            <div key={cls.id} className={`group p-3.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${isPending ? 'bg-amber-50/30 border-amber-100/80 hover:bg-amber-50/60 hover:border-amber-200' : 'bg-slate-50/60 border-slate-200/50 hover:bg-white hover:border-slate-300 hover:shadow-sm'}`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-700 truncate">{cls.classSection}</h4>
                  <p className="text-[11px] text-slate-500 font-medium truncate">{cls.subject}</p>
                </div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border shrink-0 leading-none ${isPending ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                  {cls.status}
                </span>
              </div>
              {/* Mini progress bar */}
              <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden flex mb-2">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${presentPct}%` }} />
              </div>
              <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-500">
                <span className="text-emerald-700">{cls.present}P</span>
                <span className="text-rose-600">{cls.absent}A</span>
                {cls.late > 0 && <span className="text-amber-600">{cls.late}L</span>}
                <span className="ml-auto font-bold text-slate-700">{presentPct}%</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
