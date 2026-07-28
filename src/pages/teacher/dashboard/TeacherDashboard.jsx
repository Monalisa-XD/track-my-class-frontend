import React from 'react';
import WelcomeBanner from './components/WelcomeBanner';
import StatisticsCards from './components/StatisticsCards';
import TodaySchedule from './components/TodaySchedule';
import AttendanceSummary from './components/AttendanceSummary';
import PendingTasks from './components/PendingTasks';
import RecentActivities from './components/RecentActivities';
import QuickActions from './components/QuickActions';
import { dashboardData } from './data/dashboardData';

export default function TeacherDashboard() {
  const { teacher, welcome, statistics, todaySchedule, attendanceSummary, pendingTasks, recentActivities, quickActions } = dashboardData;

  return (
    <div className="space-y-6">

      {/* 1. Welcome Banner */}
      <WelcomeBanner data={welcome} teacher={teacher} />

      {/* 2. Statistics Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Teaching Summary
          </h3>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {welcome.academicSession}
          </span>
        </div>
        <StatisticsCards items={statistics} />
      </div>

      {/* 3. Schedule + Attendance (2-col on large screens) */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-start">
        <div className="xl:col-span-3">
          <TodaySchedule schedule={todaySchedule} />
        </div>
        <div className="xl:col-span-2">
          <AttendanceSummary data={attendanceSummary} />
        </div>
      </div>

      {/* 4. Pending Tasks */}
      <PendingTasks tasks={pendingTasks} />

      {/* 5. Recent Activities */}
      <RecentActivities activities={recentActivities} />

      {/* 6. Quick Actions */}
      <QuickActions actions={quickActions} />

    </div>
  );
}
