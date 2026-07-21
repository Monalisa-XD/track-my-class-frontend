import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, ArrowRight, UserCheck, UserX, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import './AttendanceOverview.css';

/**
 * AttendanceOverview Component
 * Premium SaaS widget with ambient shadow, soft glass border, and lift-on-hover metrics.
 * 
 * @param {Object} props
 * @param {Object} props.data - Attendance summary data object
 */
export default function AttendanceOverview({ data }) {
  const {
    overallPercentage = 87.5,
    totalStudentsToday = 420,
    presentCount = 368,
    presentPercentage = 87.6,
    absentCount = 38,
    absentPercentage = 9.0,
    lateCount = 14,
    latePercentage = 3.4,
    lastUpdated = 'Last Updated: Today, 04:30 PM',
    targetThreshold = 75.0
  } = data || {};

  let statusText = 'Excellent Attendance';
  let statusBadgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200/80 shadow-emerald-500/10';
  let StatusIcon = CheckCircle2;

  if (overallPercentage < targetThreshold) {
    statusText = `Poor Attendance (<${targetThreshold}%)`;
    statusBadgeClass = 'bg-rose-50 text-rose-700 border-rose-200/80 shadow-rose-500/10';
    StatusIcon = AlertTriangle;
  } else if (overallPercentage < 85) {
    statusText = 'Average Attendance';
    statusBadgeClass = 'bg-amber-50 text-amber-700 border-amber-200/80 shadow-amber-500/10';
    StatusIcon = Clock;
  }

  return (
    <div className="relative overflow-hidden bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 hover:shadow-ambient-hover hover:border-slate-300 select-none space-y-5">
      
      {/* Subtle Top Inner Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-60" />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/25 flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 tracking-tight">
              Attendance Overview
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Daily period-wise student attendance breakdown • <span className="text-slate-400 font-semibold">{lastUpdated}</span>
            </p>
          </div>
        </div>

        {/* Navigation Link to Attendance Module */}
        <Link
          to="/admin/attendance"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all group"
        >
          <span>View Attendance Records</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Main Content: Percentage Gauge & Metric Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-stretch">
        
        {/* Left Card: Overall Attendance Percentage Gauge */}
        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/60 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Overall Attendance
            </span>
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${statusBadgeClass}`}>
              <StatusIcon className="w-3 h-3" />
              <span>{statusText}</span>
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                {overallPercentage}%
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {totalStudentsToday} Total Students
              </span>
            </div>

            {/* Segmented Micro Progress Bar */}
            <div className="w-full h-2 bg-slate-200/80 rounded-full mt-3 overflow-hidden flex shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${presentPercentage}%` }}
                title={`Present: ${presentPercentage}%`}
              />
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-500"
                style={{ width: `${latePercentage}%` }}
                title={`Late: ${latePercentage}%`}
              />
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-red-400 transition-all duration-500"
                style={{ width: `${absentPercentage}%` }}
                title={`Absent: ${absentPercentage}%`}
              />
            </div>
          </div>
        </div>

        {/* Right Cards: Present, Absent, Late Counts */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Present Card */}
          <div className="group p-4 rounded-xl bg-emerald-50/40 border border-emerald-100/80 hover:bg-emerald-50/70 hover:border-emerald-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600 transition-transform group-hover:scale-110" />
                <span className="text-xs font-bold text-slate-700">Present</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full shadow-2xs">
                {presentPercentage}%
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-extrabold text-slate-900">{presentCount}</span>
              <span className="text-[11px] text-slate-500 font-medium">Students</span>
            </div>
          </div>

          {/* Absent Card */}
          <div className="group p-4 rounded-xl bg-rose-50/40 border border-rose-100/80 hover:bg-rose-50/70 hover:border-rose-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-rose-500/10 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserX className="w-4 h-4 text-rose-600 transition-transform group-hover:scale-110" />
                <span className="text-xs font-bold text-slate-700">Absent</span>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-full shadow-2xs">
                {absentPercentage}%
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-extrabold text-slate-900">{absentCount}</span>
              <span className="text-[11px] text-slate-500 font-medium">Students</span>
            </div>
          </div>

          {/* Late Card */}
          <div className="group p-4 rounded-xl bg-amber-50/40 border border-amber-100/80 hover:bg-amber-50/70 hover:border-amber-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-amber-500/10 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 transition-transform group-hover:scale-110" />
                <span className="text-xs font-bold text-slate-700">Late</span>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full shadow-2xs">
                {latePercentage}%
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-extrabold text-slate-900">{lateCount}</span>
              <span className="text-[11px] text-slate-500 font-medium">Students</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
