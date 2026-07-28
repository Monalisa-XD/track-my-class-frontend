export const studentDashboardData = {
  student: {
    name: 'Prasad Kumar Rauta',
    regNo: '25061011510037',
    department: 'Computer Science & Engg',
    semester: 'Semester 3',
    section: 'Section A',
    academicYear: '2025 – 2026',
    overallAttendance: 86,
    cgpa: 8.65,
    todayClassesCount: 3,
    pendingAssignmentsCount: 2
  },

  todayClasses: [
    { id: 'cls-1', subjectName: 'Operating Systems', time: '09:15 AM – 10:15 AM', room: 'Room D302', instructor: 'Dr. S. P. Sahoo', status: 'Completed' },
    { id: 'cls-2', subjectName: 'Database Systems', time: '11:15 AM – 12:15 PM', room: 'Room D302', instructor: 'Dr. Amit Mishra', status: 'Ongoing' },
    { id: 'cls-3', subjectName: 'Computer Networks Lab', time: '02:00 PM – 04:00 PM', room: 'Lab 3', instructor: 'Dr. S. P. Sahoo', status: 'Upcoming' }
  ],

  recentResults: [
    { id: 'res-1', subject: 'Object Oriented Programming', exam: 'Mid-Sem', score: '85 / 100', grade: 'A' },
    { id: 'res-2', subject: 'Discrete Mathematics', exam: 'Mid-Sem', score: '92 / 100', grade: 'A+' },
    { id: 'res-3', subject: 'Software Engineering', exam: 'Internal', score: '26 / 30', grade: 'A+' }
  ],

  assignments: [
    { id: 'asg-1', title: 'OS Process Sync Assignment', subject: 'Operating Systems', dueDate: '2026-07-30 • 11:59 PM', daysLeft: 2 },
    { id: 'asg-2', title: 'Database SQL Query Lab Manual', subject: 'Database Systems', dueDate: '2026-08-02 • 05:00 PM', daysLeft: 5 }
  ],

  announcements: [
    { id: 'ann-1', title: 'Autumn Semester Registration Deadline', content: 'Autumn semester registration closes on August 05, 2026. Late fees will apply post-deadline.', date: 'July 28, 2026' },
    { id: 'ann-2', title: 'Mid-Sem Examination Results Published', content: 'Verified grades and marks for all CSE papers have been published on results tab.', date: 'July 26, 2026' }
  ],

  subjectAttendance: [
    { subject: 'Operating Systems', percentage: 88, color: 'bg-purple-600' },
    { subject: 'Database Systems', percentage: 82, color: 'bg-indigo-650' },
    { subject: 'Computer Networks', percentage: 90, color: 'bg-violet-600' },
    { subject: 'Software Engineering', percentage: 84, color: 'bg-fuchsia-600' }
  ],

  semesterProgress: {
    completedWeeks: 8,
    totalWeeks: 16,
    percentage: 50
  },

  notifications: [
    { id: 'not-1', message: 'Attendance marked for Database Systems today', time: '1 hour ago' },
    { id: 'not-2', message: 'New study manual uploaded: Computer Networks Lab 3', time: 'Yesterday' },
    { id: 'not-3', message: 'Mid-Sem Results published for Discrete Mathematics', time: '2 days ago' }
  ],

  upcomingEvents: [
    { id: 'ev-1', title: 'Technical Seminar Presentation', date: 'July 31, 2026' },
    { id: 'ev-2', title: 'VSSUT Annual Cultural Fest Auditions', date: 'August 04, 2026' }
  ]
};
