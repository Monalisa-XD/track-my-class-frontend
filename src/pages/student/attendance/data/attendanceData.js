export const studentAttendanceData = {
  academicYears: ['2025 – 2026', '2024 – 2025'],
  semesters: ['Autumn Semester', 'Spring Semester'],
  months: ['July', 'August', 'September'],
  subjects: ['All', 'Operating Systems', 'Database Systems', 'Computer Networks', 'Software Engineering', 'Discrete Mathematics'],

  subjectAttendance: [
    {
      id: 'att-1',
      subject: 'Operating Systems',
      faculty: 'Dr. S. P. Sahoo',
      conducted: 16,
      attended: 14,
      percentage: 88
    },
    {
      id: 'att-2',
      subject: 'Database Systems',
      faculty: 'Dr. Amit Mishra',
      conducted: 18,
      attended: 15,
      percentage: 83
    },
    {
      id: 'att-3',
      subject: 'Computer Networks',
      faculty: 'Dr. S. P. Sahoo',
      conducted: 15,
      attended: 13,
      percentage: 87
    },
    {
      id: 'att-4',
      subject: 'Software Engineering',
      faculty: 'Mrs. Lipika Panda',
      conducted: 12,
      attended: 8,
      percentage: 67
    },
    {
      id: 'att-5',
      subject: 'Discrete Mathematics',
      faculty: 'Dr. R. K. Patel',
      conducted: 14,
      attended: 13,
      percentage: 93
    }
  ],

  history: [
    { id: 'h-1', date: '2026-07-28', subject: 'Database Systems', faculty: 'Dr. Amit Mishra', status: 'Present' },
    { id: 'h-2', date: '2026-07-28', subject: 'Operating Systems', faculty: 'Dr. S. P. Sahoo', status: 'Present' },
    { id: 'h-3', date: '2026-07-27', subject: 'Software Engineering', faculty: 'Mrs. Lipika Panda', status: 'Absent' },
    { id: 'h-4', date: '2026-07-27', subject: 'Computer Networks', faculty: 'Dr. S. P. Sahoo', status: 'Present' },
    { id: 'h-5', date: '2026-07-24', subject: 'Discrete Mathematics', faculty: 'Dr. R. K. Patel', status: 'Present' }
  ]
};
