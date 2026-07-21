import {
  Building2,
  GraduationCap,
  BookOpen,
  UserCheck,
  Users,
  School,
  Code2,
  Database,
  Cpu,
  Network,
  UserPlus,
  ClipboardCheck,
  Award,
  FileCheck2,
  Calendar
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
    lastUpdated: 'Last Updated: Today, 04:30 PM',
    targetThreshold: 75.0
  },

  todaySchedule: [
    {
      id: 'sched-101',
      subjectCode: 'MCA01007',
      subjectName: 'Operating Systems Laboratory',
      teacherName: 'Dr. Satya Prakash Sahoo',
      department: 'Computer Science & Engg',
      course: 'Master of Computer Application',
      classSection: 'MCA 1st Year (Sec A)',
      roomNumber: 'D302 (Lab 2)',
      startTime: '09:00 AM',
      endTime: '11:00 AM',
      status: 'ONGOING',
      icon: Cpu,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      id: 'sched-102',
      subjectCode: 'MCA01003',
      subjectName: 'Data Structure Using C',
      teacherName: 'Kishore Kumar Sahu',
      department: 'Computer Science & Engg',
      course: 'Master of Computer Application',
      classSection: 'MCA 1st Year (Sec B)',
      roomNumber: 'Hall 101',
      startTime: '11:15 AM',
      endTime: '01:15 PM',
      status: 'UPCOMING',
      icon: Code2,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100'
    },
    {
      id: 'sched-103',
      subjectCode: 'MCA01005',
      subjectName: 'Database Engineering',
      teacherName: 'Santosh Kumar Mohapatra',
      department: 'Computer Science & Engg',
      course: 'Master of Computer Application',
      classSection: 'MCA 1st Year (Sec A)',
      roomNumber: 'D304',
      startTime: '02:00 PM',
      endTime: '04:00 PM',
      status: 'UPCOMING',
      icon: Database,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      id: 'sched-104',
      subjectCode: 'MCA02001',
      subjectName: 'Computer Networks',
      teacherName: 'Rockey Masudu Gouda',
      department: 'Computer Science & Engg',
      course: 'Master of Computer Application',
      classSection: 'MCA 2nd Year (Sec A)',
      roomNumber: 'Hall 202',
      startTime: '04:15 PM',
      endTime: '05:45 PM',
      status: 'UPCOMING',
      icon: Network,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100'
    }
  ],

  recentActivities: [
    {
      id: 'act-1',
      title: 'New Student Admitted',
      description: 'Prasad Kumar Rauta registered in MCA course. Reg No: 25061011510037 auto-generated.',
      user: 'Admin',
      module: 'Students',
      time: '12 mins ago',
      status: 'SUCCESS',
      icon: Users,
      iconBg: 'bg-emerald-500 text-white shadow-emerald-500/30',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'act-2',
      title: 'Period Attendance Submitted',
      description: 'Operating Systems Laboratory (MCA01007) attendance marked by Dr. Satya Prakash Sahoo.',
      user: 'Dr. Satya Prakash Sahoo',
      module: 'Attendance',
      time: '35 mins ago',
      status: 'COMPLETED',
      icon: ClipboardCheck,
      iconBg: 'bg-blue-500 text-white shadow-blue-500/30',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'act-3',
      title: 'Bulk Exam Results Published',
      description: 'Semester 1 exam results uploaded via Excel template and published with email notifications sent.',
      user: 'Admin',
      module: 'Results',
      time: '1 hour ago',
      status: 'PUBLISHED',
      icon: Award,
      iconBg: 'bg-amber-500 text-white shadow-amber-500/30',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'act-4',
      title: 'New Faculty Registered',
      description: 'Kishore Kumar Sahu added to Computer Science & Engg department. First-time login sent via email.',
      user: 'Admin',
      module: 'Teachers',
      time: '2 hours ago',
      status: 'SUCCESS',
      icon: UserPlus,
      iconBg: 'bg-cyan-500 text-white shadow-cyan-500/30',
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    },
    {
      id: 'act-5',
      title: 'Classroom Timetable Updated',
      description: 'Room D302 assigned to MCA 1st Year Sec A for Tuesday period slots.',
      user: 'Admin',
      module: 'Schedule',
      time: '3 hours ago',
      status: 'UPDATED',
      icon: Calendar,
      iconBg: 'bg-indigo-500 text-white shadow-indigo-500/30',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    }
  ]
};
