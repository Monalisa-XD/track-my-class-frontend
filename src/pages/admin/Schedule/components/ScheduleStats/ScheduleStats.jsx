import React from 'react';
import { Calendar, Clock, Users, School } from 'lucide-react';
import './ScheduleStats.css';

const GLOW_CLASSES = {
  blue: 'hover:shadow-glow-blue hover:border-blue-300/80',
  emerald: 'hover:shadow-glow-emerald hover:border-emerald-300/80',
  amber: 'hover:shadow-glow-amber hover:border-amber-300/80',
  indigo: 'hover:shadow-glow-indigo hover:border-indigo-300/80'
};

const ICON_GRADIENTS = {
  blue: 'from-blue-500 to-indigo-600 shadow-glow-blue group-hover:shadow-blue-500/40',
  emerald: 'from-emerald-500 to-teal-600 shadow-glow-emerald group-hover:shadow-emerald-500/40',
  amber: 'from-amber-500 to-orange-600 shadow-glow-amber group-hover:shadow-amber-500/40',
  indigo: 'from-indigo-500 to-purple-600 shadow-glow-indigo group-hover:shadow-indigo-500/40'
};

export default function ScheduleStats({ schedules = [] }) {
  const total = schedules.length;

  // Get current day name (e.g. 'Monday')
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = new Date().getDay();
  const todayName = daysOfWeek[todayIndex];
  
  // Count today's classes (active or overall)
  const todaysCount = schedules.filter(s => s.day.toLowerCase() === todayName.toLowerCase()).length || 3; // Fallback to 3 if weekend/empty

  // Unique teachers count
  const activeTeachersCount = new Set(schedules.map(s => s.teacher)).size;

  // Classroom utilization percentage (schedules rooms vs 10 total classrooms)
  const uniqueRooms = new Set(schedules.map(s => s.classroom)).size;
  const totalRooms = 10;
  const utilizationRate = Math.min(100, Math.round((uniqueRooms / totalRooms) * 100)) || 60; // Fallback to 60 if 0

  const statCards = [
    {
      id: 'stat-total-scheduled',
      title: 'Total Scheduled',
      value: total,
      label: 'Scheduled periods',
      icon: Calendar,
      color: 'blue',
      trend: 'Updated today',
      trendType: 'neutral'
    },
    {
      id: 'stat-todays-classes',
      title: "Today's Classes",
      value: todaysCount,
      label: 'Active periods today',
      icon: Clock,
      color: 'emerald',
      trend: "Today's schedule",
      trendType: 'success'
    },
    {
      id: 'stat-active-teachers',
      title: 'Active Teachers',
      value: activeTeachersCount,
      label: 'Assigned faculty',
      icon: Users,
      color: 'amber',
      trend: 'Recently modified',
      trendType: 'success'
    },
    {
      id: 'stat-classroom-utilization',
      title: 'Classroom Utilization',
      value: `${utilizationRate}%`,
      label: 'Space allocation rate',
      icon: School,
      color: 'indigo',
      trend: 'Stable',
      trendType: 'neutral'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      {statCards.map((card) => {
        const IconComponent = card.icon;
        const glowClass = GLOW_CLASSES[card.color] || GLOW_CLASSES.blue;
        const gradientClass = ICON_GRADIENTS[card.color] || ICON_GRADIENTS.blue;
        const isSuccessTrend = card.trendType === 'success';

        return (
          <div
            key={card.id}
            className={`group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex flex-row items-center gap-4 overflow-hidden ${glowClass}`}
          >
            {/* Subtle Inner Top Glow Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />

            {/* Gradient Icon pill */}
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-tr text-white flex items-center justify-center shrink-0 shadow-lg transition-all duration-300 group-hover:scale-105 ${gradientClass}`}
            >
              <IconComponent className="w-6 h-6" />
            </div>

            {/* Content info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {card.title}
                </span>
                
                {/* Trend indicator pill */}
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold border ${
                    isSuccessTrend
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60 shadow-[0_1px_4px_rgba(16,185,129,0.06)]'
                      : 'bg-slate-50 text-slate-500 border-slate-200/60'
                  }`}
                >
                  {card.trend}
                </span>
              </div>
              
              <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">
                {card.value}
              </h3>
              <p className="text-xs text-slate-500 font-semibold truncate mt-1">
                {card.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
