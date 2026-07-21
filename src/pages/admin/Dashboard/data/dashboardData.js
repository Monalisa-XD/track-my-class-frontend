import {
  Building2,
  GraduationCap,
  BookOpen,
  UserCheck,
  Users,
  School
} from 'lucide-react';

/**
 * Mock API data for Admin Dashboard
 * Terminology aligned 100% with project report entities
 */
export const dashboardData = {
  welcome: {
    greeting: "Welcome back",
    userName: "Monalisa Jena",
    roleLabel: "System Administrator",
    subtitle: "Here's the current overview of academic operations, enrollment stats, and department activities.",
    academicSession: "2025 - 2026 Academic Year"
  },

  statistics: [
    {
      id: 'departments',
      title: 'Total Departments',
      value: 8,
      subtitle: '+1 new added this term',
      icon: Building2,
      color: 'blue',
      bgColor: 'bg-blue-50 text-blue-600 border-blue-100',
      iconBg: 'bg-blue-600 text-white shadow-blue-500/30'
    },
    {
      id: 'courses',
      title: 'Total Courses',
      value: 14,
      subtitle: 'Active degree programs',
      icon: GraduationCap,
      color: 'indigo',
      bgColor: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      iconBg: 'bg-indigo-600 text-white shadow-indigo-500/30'
    },
    {
      id: 'subjects',
      title: 'Total Subjects',
      value: 64,
      subtitle: 'Theory & Lab modules',
      icon: BookOpen,
      color: 'purple',
      bgColor: 'bg-purple-50 text-purple-600 border-purple-100',
      iconBg: 'bg-purple-600 text-white shadow-purple-500/30'
    },
    {
      id: 'teachers',
      title: 'Total Teachers',
      value: 32,
      subtitle: 'Active teaching staff',
      icon: UserCheck,
      color: 'emerald',
      bgColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      iconBg: 'bg-emerald-600 text-white shadow-emerald-500/30'
    },
    {
      id: 'students',
      title: 'Total Students',
      value: 420,
      subtitle: 'Verified registration numbers',
      icon: Users,
      color: 'cyan',
      bgColor: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      iconBg: 'bg-cyan-600 text-white shadow-cyan-500/30'
    },
    {
      id: 'classes',
      title: 'Total Classes',
      value: 18,
      subtitle: 'Scheduled semester sections',
      icon: School,
      color: 'amber',
      bgColor: 'bg-amber-50 text-amber-600 border-amber-100',
      iconBg: 'bg-amber-600 text-white shadow-amber-500/30'
    }
  ],

  attendanceSummary: {
    overallPercentage: 87.5,
    totalStudentsToday: 420,
    presentCount: 368,
    presentPercentage: 87.6,
    absentCount: 38,
    absentPercentage: 9.0,
    lateCount: 14,
    latePercentage: 3.4,
    lastUpdated: 'Today at 04:30 PM',
    targetThreshold: 75.0, // Project requirement: <75% triggers warning
    status: 'Healthy'
  }
};
