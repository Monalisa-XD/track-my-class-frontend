export const adminProfileData = {
  admin: {
    name: 'Admin Controller',
    employeeId: 'VSSUT-ADM-0001',
    designation: 'System Administrator',
    department: 'Academic Administration',
    email: 'admin@trackmyclass.com',
    phone: '+91 98765 43210',
    address: 'Room 101, Administrative Block, VSSUT Burla, Odisha, 768018',
    joiningDate: '2020-06-01',
    status: 'Active',
    lastLogin: 'Today • 06:15 AM',
    role: 'Administrator'
  },

  summaryStats: {
    departmentsManaged: 8,
    totalTeachers: 64,
    totalStudents: 1280,
    activeCourses: 14
  },

  systemOverview: {
    usersManaged: '1,450',
    activeDepartments: 8,
    systemHealth: '99.9%',
    recentActivityCount: 142,
    storageUsage: 64, // 64%
    storageDetails: '12.8 GB of 20 GB used'
  },

  permissions: [
    'User Management (Full Access)',
    'System Configuration & Policies',
    'Academic Setup & Database Control',
    'Report Generation & Audit Logs',
    'Automated Backup & Restore'
  ],

  recentActivities: [
    {
      id: 'act-1',
      message: 'Completed scheduled full system backup successfully.',
      time: '1 hour ago',
      type: 'system'
    },
    {
      id: 'act-2',
      message: 'Updated Academic Calendar for Autumn Semester 2025-26.',
      time: '3 hours ago',
      type: 'update'
    },
    {
      id: 'act-3',
      message: "Approved password reset request for 'Dr. Satya Prakash Sahoo'.",
      time: 'Yesterday • 04:12 PM',
      type: 'security'
    },
    {
      id: 'act-4',
      message: 'Registered 14 new Student profiles in Department of CSE.',
      time: 'Yesterday • 11:30 AM',
      type: 'user'
    },
    {
      id: 'act-5',
      message: "Added new department 'Metallurgical & Materials Engineering'.",
      time: '3 days ago',
      type: 'department'
    }
  ]
};
