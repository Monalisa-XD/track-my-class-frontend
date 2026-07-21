import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, ArrowRight, UserCheck, UserX, Clock, AlertTriangle } from 'lucide-react';
import './AttendanceOverview.css';

/**
 * AttendanceOverview Component
 * Provides a high-level summary of daily student attendance status for administrators.
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
    lastUpdated = 'Today at 04:30 PM',
    targetThreshold = 75.0,
    status = 'Healthy'
  } = data || {};

  const isLowAttendance = overallPercentage < targetThreshold;

  return (
    <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5 select-none">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 tracking-tight">
              Attendance Overview
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Daily period-wise student attendance breakdown • <span className="text-slate-400">{lastUpdated}</span>
            </p>
          </div>
        </div>

        {/* Navigation Link */}
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
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Overall Rate
            </span>
            {isLowAttendance ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                <AlertTriangle className="w-3 h-3" /> Warning (&lt;{targetThreshold}%)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                {status} (&ge;{targetThreshold}%)
              </span>
            )}
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                {overallPercentage}%
              </span>
              <span className="text-xs text-slate-500 font-medium">
                of {totalStudentsToday} students
              </span>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-full h-2 bg-slate-200 rounded-full mt-2.5 overflow-hidden flex">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${presentPercentage}%` }}
                title={`Present: ${presentPercentage}%`}
              />
              <div
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: `${latePercentage}%` }}
                title={`Late: ${latePercentage}%`}
              />
              <div
                className="h-full bg-rose-500 transition-all duration-500"
                style={{ width: `${absentPercentage}%` }}
                title={`Absent: ${absentPercentage}%`}
              />
            </div>
          </div>
        </div>

        {/* Right Cards: Present, Absent, Late Counts */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Present Card */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-700">Present</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                {presentPercentage}%
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-extrabold text-slate-900">{presentCount}</span>
              <span className="text-[11px] text-slate-500 font-medium">Students</span>
            </div>
          </div>

          {/* Absent Card */}
          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserX className="w-4 h-4 text-rose-600" />
                <span className="text-xs font-bold text-slate-700">Absent</span>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                {absentPercentage}%
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-extrabold text-slate-900">{absentCount}</span>
              <span className="text-[11px] text-slate-500 font-medium">Students</span>
            </div>
          </div>

          {/* Late Card */}
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-slate-700">Late</span>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
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
