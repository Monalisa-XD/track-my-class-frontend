import React from 'react';
import WelcomeBanner from './components/WelcomeBanner';
import StatisticsCards from './components/StatisticsCards';
import { dashboardData } from './data/dashboardData';
import './Dashboard.css';

/**
 * Admin Dashboard Page Component
 */
export default function Dashboard() {
  const { welcome, statistics } = dashboardData;

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
    </div>
  );
}
