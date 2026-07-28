import {
  CalendarDays,
  Users,
  ClipboardCheck,
  BookOpen,
  Code2,
  Database,
  Cpu,
  Network,
  ClipboardList,
  Upload,
  FolderUp,
  BookOpenCheck,
  ClipboardPen,
  FolderKanban,
  UserRound,
  Calendar,
  Award
} from 'lucide-react';

export const dashboardData = {
  teacher: {
    name: 'Dr. Satya Prakash Sahoo',
    shortName: 'Dr. S. P. Sahoo',
    department: 'Computer Science & Engg',
    designation: 'Associate Professor',
    employeeId: 'VSSUT-FAC-0041',
    subjects: ['Operating Systems', 'Data Structures', 'Computer Networks'],
    classesAssigned: ['MCA 1st Year (Sec A)', 'MCA 1st Year (Sec B)', 'MCA 2nd Year (Sec A)'],
    academicSession: '2025 – 2026 Academic Year',
    status: 'Active'
  },

  welcome: {
    greeting: 'Welcome back',
    userName: 'Dr. Satya Prakash Sahoo',
    roleLabel: 'Associate Professor',
    subtitle: "Here's today's teaching schedule, attendance summary, and pending academic tasks.",
    academicSession: '2025 – 2026 Academic Year'
  },

  statistics: [
    {
      id: 'todays-classes',
      title: "Today's Classes",
      value: 4,
      subtitle: '2 completed, 2 upcoming',
      icon: CalendarDays,
      color: 'blue',
      iconBg: 'bg-blue-600 text-white shadow-blue-500/30',
      chip: 'Scheduled'
    },
    {
      id: 'students-assigned',
      title: 'Students Assigned',
      value: 68,
      subtitle: 'Across 3 class sections',
      icon: Users,
      color: 'emerald',
      iconBg: 'bg-emerald-600 text-white shadow-emerald-500/30',
      chip: 'Active'
    },
    {
      id: 'attendance-pending',
      title: 'Attendance Pending',
      value: 2,
      subtitle: 'Periods awaiting submission',
      icon: ClipboardCheck,
      color: 'amber',
      iconBg: 'bg-amber-500 text-white shadow-amber-500/30',
      chip: 'Action Needed'
    },
    {
      id: 'subjects-assigned',
      title: 'Subjects Assigned',
      value: 3,
      subtitle: 'Theory & Lab modules',
      icon: BookOpen,
      color: 'purple',
      iconBg: 'bg-purple-600 text-white shadow-purple-500/30',
      chip: 'This Semester'
    }
  ],

  todaySchedule: [
    {
      id: 'ts-1',
      subjectCode: 'MCA01001',
      subjectName: 'Operating Systems',
      classSection: 'MCA 1st Year (Sec A)',
      roomNumber: 'Hall 101',
      startTime: '09:00 AM',
      endTime: '10:00 AM',
      status: 'COMPLETED',
      icon: Cpu,
      iconBg: 'bg-slate-100 text-slate-500 border-slate-200'
    },
    {
      id: 'ts-2',
      subjectCode: 'MCA01007',
      subjectName: 'Operating Systems Laboratory',
      classSection: 'MCA 1st Year (Sec A)',
      roomNumber: 'D302 (Lab 2)',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      status: 'ONGOING',
      icon: Cpu,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      id: 'ts-3',
      subjectCode: 'MCA01001',
      subjectName: 'Operating Systems',
      classSection: 'MCA 1st Year (Sec B)',
      roomNumber: 'Hall 103',
      startTime: '01:00 PM',
      endTime: '02:00 PM',
      status: 'UPCOMING',
      icon: Cpu,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100'
    },
    {
      id: 'ts-4',
      subjectCode: 'MCA02003',
      subjectName: 'Computer Networks',
      classSection: 'MCA 2nd Year (Sec A)',
      roomNumber: 'Hall 202',
      startTime: '03:00 PM',
      endTime: '04:00 PM',
      status: 'UPCOMING',
      icon: Network,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    }
  ],

  attendanceSummary: {
    date: 'Today',
    lastUpdated: 'Last updated: 10:45 AM',
    totalStudents: 68,
    overallPresent: 59,
    overallAbsent: 7,
    overallLate: 2,
    overallPercentage: 86.8,
    classBreakdown: [
      {
        id: 'att-1',
        classSection: 'MCA 1st Year (Sec A)',
        subject: 'Operating Systems Lab',
        total: 28,
        present: 24,
        absent: 3,
        late: 1,
        status: 'SUBMITTED'
      },
      {
        id: 'att-2',
        classSection: 'MCA 1st Year (Sec B)',
        subject: 'Operating Systems',
        total: 22,
        present: 19,
        absent: 2,
        late: 1,
        status: 'PENDING'
      },
      {
        id: 'att-3',
        classSection: 'MCA 2nd Year (Sec A)',
        subject: 'Computer Networks',
        total: 18,
        present: 16,
        absent: 2,
        late: 0,
        status: 'PENDING'
      }
    ]
  },

  pendingTasks: [
    {
      id: 'task-1',
      title: 'Submit Attendance — MCA 1st Year (Sec B)',
      description: 'Operating Systems period attendance for today not yet submitted.',
      dueLabel: 'Due: Today by 5:00 PM',
      priority: 'HIGH',
      icon: ClipboardPen,
      path: '/teacher/attendance'
    },
    {
      id: 'task-2',
      title: 'Submit Attendance — MCA 2nd Year (Sec A)',
      description: 'Computer Networks period attendance pending submission.',
      dueLabel: 'Due: Today by 5:00 PM',
      priority: 'HIGH',
      icon: ClipboardPen,
      path: '/teacher/attendance'
    },
    {
      id: 'task-3',
      title: 'Upload Mid-Semester Marks',
      description: 'Internal assessment marks for Operating Systems (MCA01001) need to be uploaded.',
      dueLabel: 'Due: Aug 2, 2025',
      priority: 'MEDIUM',
      icon: Upload,
      path: '/teacher/results'
    },
    {
      id: 'task-4',
      title: 'Share Lab Manual — OS Lab',
      description: 'Upload the updated OS Lab Manual PDF for MCA 1st Year students.',
      dueLabel: 'Due: Aug 5, 2025',
      priority: 'LOW',
      icon: FolderUp,
      path: '/teacher/resources'
    }
  ],

  recentActivities: [
    {
      id: 'ra-1',
      title: 'Attendance Submitted',
      description: 'Operating Systems (MCA01001) attendance marked for MCA 1st Year Sec A. 24 present, 3 absent, 1 late.',
      module: 'Attendance',
      time: 'Today • 9:15 AM',
      status: 'SUBMITTED',
      icon: ClipboardCheck,
      iconBg: 'bg-emerald-500 text-white shadow-emerald-500/30',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.12)]'
    },
    {
      id: 'ra-2',
      title: 'Lab Session Recorded',
      description: 'Operating Systems Lab (MCA01007) session started for MCA 1st Year Sec A in Room D302 (Lab 2).',
      module: 'Schedule',
      time: 'Today • 10:05 AM',
      status: 'ONGOING',
      icon: CalendarDays,
      iconBg: 'bg-blue-500 text-white shadow-blue-500/30',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.12)]'
    },
    {
      id: 'ra-3',
      title: 'Study Notes Shared',
      description: 'Chapter 4 notes (Process Synchronization) shared with MCA 1st Year classes via Resources module.',
      module: 'Resources',
      time: 'Yesterday • 04:30 PM',
      status: 'SHARED',
      icon: FolderKanban,
      iconBg: 'bg-purple-500 text-white shadow-purple-500/30',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.12)]'
    },
    {
      id: 'ra-4',
      title: 'Internal Marks Uploaded',
      description: 'Unit Test 1 marks for Computer Networks (MCA02003) submitted. 18 students records updated.',
      module: 'Results',
      time: 'Yesterday • 02:00 PM',
      status: 'UPLOADED',
      icon: Award,
      iconBg: 'bg-amber-500 text-white shadow-amber-500/30',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.12)]'
    },
    {
      id: 'ra-5',
      title: 'Timetable Reviewed',
      description: 'Weekly schedule updated — Tuesday OS Lab slot confirmed in Room D302 with no conflicts.',
      module: 'Schedule',
      time: '2 days ago • 11:00 AM',
      status: 'UPDATED',
      icon: Calendar,
      iconBg: 'bg-indigo-500 text-white shadow-indigo-500/30',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-[0_0_8px_rgba(99,102,241,0.12)]'
    }
  ],

  quickActions: [
    {
      id: 'qa-attendance',
      title: 'Mark Attendance',
      description: 'Submit period-wise attendance for your assigned classes.',
      path: '/teacher/attendance',
      icon: ClipboardCheck,
      color: 'emerald'
    },
    {
      id: 'qa-results',
      title: 'Upload Results',
      description: 'Enter internal assessment and semester exam marks.',
      path: '/teacher/results',
      icon: Upload,
      color: 'blue'
    },
    {
      id: 'qa-resources',
      title: 'Share Resources',
      description: 'Upload PDFs, notes, and lab manuals for your students.',
      path: '/teacher/resources',
      icon: FolderKanban,
      color: 'purple'
    },
    {
      id: 'qa-students',
      title: 'View Students',
      description: 'Browse student list, roll numbers, and attendance records.',
      path: '/teacher/students',
      icon: Users,
      color: 'cyan'
    },
    {
      id: 'qa-schedule',
      title: 'Open Timetable',
      description: 'View your weekly teaching schedule and upcoming periods.',
      path: '/teacher/schedule',
      icon: CalendarDays,
      color: 'amber'
    }
  ]
};
