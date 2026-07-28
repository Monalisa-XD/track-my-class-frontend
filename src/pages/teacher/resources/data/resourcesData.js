export const teacherResourcesData = {
  academicYears: ['2025 – 2026', '2024 – 2025'],
  semesters: ['Autumn Semester', 'Spring Semester'],
  subjects: ['Operating Systems', 'Operating Systems Laboratory', 'Computer Networks'],
  resourceTypes: ['PDF', 'PPT', 'Assignment', 'Notes', 'Lab Manual'],
  semestersList: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],

  storageUsage: {
    used: 145, // MB
    total: 500, // MB
    usedPercentage: 29
  },

  recentUploadsList: [
    { id: 'ru-1', title: 'OS Process Sync Assignment.pdf', time: '2 hours ago', size: '1.2 MB' },
    { id: 'ru-2', title: 'Computer Networks PPT Lecture 4.ppt', time: 'Yesterday', size: '4.8 MB' },
    { id: 'ru-3', title: 'OS Lab Manual v2.pdf', time: '3 days ago', size: '2.5 MB' }
  ],

  popularResources: [
    { id: 'pop-1', title: 'Operating Systems Chapter 3 Notes', downloads: 84, type: 'PDF' },
    { id: 'pop-2', title: 'Computer Networks Lab Manual', downloads: 72, type: 'PDF' },
    { id: 'pop-3', title: 'OS Deadlock Assignment 1', downloads: 55, type: 'Assignment' }
  ],

  resources: [
    {
      id: 'res-1',
      title: 'OS Process Sync Assignment',
      subject: 'Operating Systems',
      type: 'Assignment',
      semester: 'Semester 1',
      description: 'Contains problems on Semaphore, Monitors, and Classical IPC synchronization questions.',
      uploadedDate: '2026-07-28',
      fileSize: '1.2 MB',
      downloads: 12,
      status: 'Active'
    },
    {
      id: 'res-2',
      title: 'Computer Networks PPT Lecture 4',
      subject: 'Computer Networks',
      type: 'PPT',
      semester: 'Semester 3',
      description: 'Introduction to Transport Layer, UDP, Connectionless transport, TCP segment structure.',
      uploadedDate: '2026-07-27',
      fileSize: '4.8 MB',
      downloads: 45,
      status: 'Active'
    },
    {
      id: 'res-3',
      title: 'OS Lab Manual v2',
      subject: 'Operating Systems Laboratory',
      type: 'Lab Manual',
      semester: 'Semester 1',
      description: 'System calls shell programming, process execution, thread handling exercises.',
      uploadedDate: '2026-07-25',
      fileSize: '2.5 MB',
      downloads: 72,
      status: 'Active'
    },
    {
      id: 'res-4',
      title: 'Operating Systems Chapter 3 Notes',
      subject: 'Operating Systems',
      type: 'PDF',
      semester: 'Semester 1',
      description: 'Detailed study notes covering CPU Scheduling algorithms: FCFS, SJF, SRTF, and Round Robin.',
      uploadedDate: '2026-07-20',
      fileSize: '3.1 MB',
      downloads: 84,
      status: 'Active'
    },
    {
      id: 'res-5',
      title: 'TCP vs UDP Comparison Sheet',
      subject: 'Computer Networks',
      type: 'Notes',
      semester: 'Semester 3',
      description: 'Quick reference sheet comparing header format, reliability, speed, and standard protocol layers.',
      uploadedDate: '2026-07-18',
      fileSize: '0.8 MB',
      downloads: 30,
      status: 'Active'
    },
    {
      id: 'res-6',
      title: 'OS Process Management Lab Exercise',
      subject: 'Operating Systems Laboratory',
      type: 'Assignment',
      semester: 'Semester 1',
      description: 'Lab assignment covering fork(), exec() and wait() system calls.',
      uploadedDate: '2026-07-15',
      fileSize: '1.5 MB',
      downloads: 24,
      status: 'Inactive'
    }
  ]
};
