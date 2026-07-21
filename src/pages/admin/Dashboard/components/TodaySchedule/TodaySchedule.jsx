import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Clock, MapPin, UserCheck, BookOpen } from 'lucide-react';
import './TodaySchedule.css';

const STATUS_CONFIG = {
  ONGOING: { label: 'Ongoing', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-500/10', isLive: true },
  UPCOMING: { label: 'Upcoming', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200 shadow-blue-500/10', isLive: false },
  COMPLETED: { label: 'Completed', badgeBg: 'bg-slate-100 text-slate-600 border-slate-200', isLive: false }
};

export default function TodaySchedule({ schedule = [] }) {
  if (!schedule || schedule.length === 0) return null;

  return (
    <div className="relative overflow-hidden bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 hover:shadow-ambient-hover hover:border-slate-300 select-none space-y-5">
      
      {/* Inner Top Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-60" />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800 tracking-tight">
              Today's Schedule
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Scheduled timetable slots, assigned faculty, and classrooms for today
            </p>
          </div>
        </div>

        {/* Link to Full Schedule Page */}
        <Link
          to="/admin/schedule"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all group"
        >
          <span>View Full Schedule</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Schedule Items List with 8px Increased Gap */}
      <div className="grid grid-cols-1 gap-4">
        {schedule.map((item) => {
          const IconComp = item.icon || BookOpen;
          const isOngoing = item.status?.toUpperCase() === 'ONGOING';
          const statusMeta = STATUS_CONFIG[item.status?.toUpperCase()] || STATUS_CONFIG.UPCOMING;

          return (
            <div
              key={item.id || item.subjectCode}
              className={`group relative p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
                isOngoing
                  ? 'bg-emerald-50/20 border-emerald-200/80 hover:bg-emerald-50/40 hover:border-emerald-300 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200/60 hover:bg-white hover:border-blue-200/80 hover:shadow-md hover:shadow-blue-500/5'
              }`}
            >
              {/* Left Column: Subject Icon & Details */}
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border shadow-xs transition-transform duration-200 group-hover:scale-105 ${item.iconBg || 'bg-blue-50 text-blue-600 border-blue-100'}`}
                >
                  <IconComp className="w-5.5 h-5.5" />
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-700 font-mono">
                      {item.subjectCode}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {item.classSection}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-800 tracking-tight truncate group-hover:text-blue-600 transition-colors">
                    {item.subjectName}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{item.teacherName}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Time & Room Details */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs font-medium text-slate-600 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200/50">
                
                {/* Time Slot (Stronger Accent for Ongoing Class) */}
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border shadow-2xs font-semibold ${
                    isOngoing
                      ? 'bg-emerald-100/80 border-emerald-300 text-emerald-900 shadow-sm'
                      : 'bg-white border-slate-200/70 text-slate-700'
                  }`}
                >
                  <Clock className={`w-3.5 h-3.5 shrink-0 ${isOngoing ? 'text-emerald-700' : 'text-blue-600'}`} />
                  <span>
                    {item.startTime} - {item.endTime}
                  </span>
                </div>

                {/* Room Number */}
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200/70 shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="font-semibold text-slate-700">
                    {item.roomNumber}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="shrink-0">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border shadow-2xs ${statusMeta.badgeBg}`}>
                    {statusMeta.isLive && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                    )}
                    <span>{statusMeta.label}</span>
                  </span>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
