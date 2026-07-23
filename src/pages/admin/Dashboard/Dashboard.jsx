import React from 'react';
import WelcomeBanner from './components/WelcomeBanner';
import StatisticsCards from './components/StatisticsCards';
import AttendanceOverview from './components/AttendanceOverview';
import TodaySchedule from './components/TodaySchedule';
import RecentActivities from './components/RecentActivities';
import QuickActions from './components/QuickActions';
import { dashboardData } from './data/dashboardData';
import './Dashboard.css';

/**
 * Admin Dashboard Page Component
 */
export default function Dashboard() {
  const { welcome, statistics, attendanceSummary, todaySchedule, recentActivities, quickActions } = dashboardData;

  return (
    <div className="space-y-6">
      {/* 1. Welcome Banner */}
      <WelcomeBanner data={welcome} />

      {/* 2. Key Statistics & Metrics Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Academic Operations Summary
          </h3>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Academic Year 2025–26
          </span>
        </div>

        <StatisticsCards items={statistics} />
      </div>

      {/* 3. Attendance Overview Widget */}
      <AttendanceOverview data={attendanceSummary} />

      {/* 4. Today's Class Schedule Widget */}
      <TodaySchedule schedule={todaySchedule} />

      {/* 5. Recent System Activities Feed */}
      <RecentActivities activities={recentActivities} />

      {/* 6. Quick Actions Center */}
      <QuickActions actions={quickActions} />
    </div>
  );
}
