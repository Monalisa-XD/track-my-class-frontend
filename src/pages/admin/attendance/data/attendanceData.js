/**
 * Mock API data for Admin Attendance Management
 */
export const initialAttendance = [
  {
    rollNo: '2406151001',
    studentName: 'Ananya Mishra',
    department: 'CSE',
    course: 'MCA',
    semester: 'Semester 1',
    subject: 'Data Structure Using C',
    teacher: 'Satyabrata Mohanty',
    date: '2026-07-28',
    status: 'Present',
    time: '09:05 AM',
    percentage: 88
  },
  {
    rollNo: '2406151002',
    studentName: 'Aman Kumar Nayak',
    department: 'CSE',
    course: 'MCA',
    semester: 'Semester 1',
    subject: 'Data Structure Using C',
    teacher: 'Satyabrata Mohanty',
    date: '2026-07-28',
    status: 'Late',
    time: '09:18 AM',
    percentage: 76
  },
  {
    rollNo: '2406151003',
    studentName: 'Priyanka Senapati',
    department: 'CSE',
    course: 'MCA',
    semester: 'Semester 1',
    subject: 'Discrete Mathematics',
    teacher: 'Dr. Satya Prakash Sahoo',
    date: '2026-07-28',
    status: 'Absent',
    time: '--',
    percentage: 64
  },
  {
    rollNo: '2406151004',
    studentName: 'Subham Sourav Panda',
    department: 'ETC',
    course: 'B.Tech',
    semester: 'Semester 5',
    subject: 'Analog Electronics',
    teacher: 'Dr. Kishore Kumar Sahu',
    date: '2026-07-28',
    status: 'Present',
    time: '10:02 AM',
    percentage: 92
  },
  {
    rollNo: '2406151005',
    studentName: 'Lipsa Rani Sahoo',
    department: 'ETC',
    course: 'B.Tech',
    semester: 'Semester 5',
    subject: 'Analog Electronics',
    teacher: 'Dr. Kishore Kumar Sahu',
    date: '2026-07-28',
    status: 'Leave',
    time: '--',
    percentage: 82
  },
  {
    rollNo: '2406151006',
    studentName: 'Ashish Kumar Dash',
    department: 'EE',
    course: 'B.Tech',
    semester: 'Semester 7',
    subject: 'Electrical Machines',
    teacher: 'Dr. Santosh Kumar Mohapatra',
    date: '2026-07-27',
    status: 'Present',
    time: '12:12 PM',
    percentage: 95
  },
  {
    rollNo: '2406151007',
    studentName: 'Swadhin Pradhan',
    department: 'ME',
    course: 'B.Tech',
    semester: 'Semester 5',
    subject: 'Thermodynamics',
    teacher: 'Dr. Rockey Masudu Gouda',
    date: '2026-07-27',
    status: 'Late',
    time: '02:40 PM',
    percentage: 79
  },
  {
    rollNo: '2406151008',
    studentName: 'Satyajit Mohapatra',
    department: 'IT',
    course: 'MCA',
    semester: 'Semester 3',
    subject: 'Cloud Computing',
    teacher: 'Dr. Rashmi Ranjan Dash',
    date: '2026-07-27',
    status: 'Present',
    time: '09:04 AM',
    percentage: 90
  },
  {
    rollNo: '2406151009',
    studentName: 'Tanuja Priyadarshini',
    department: 'CSE',
    course: 'M.Tech',
    semester: 'Semester 3',
    subject: 'Computer Networks Lab',
    teacher: 'Dr. Satya Prakash Sahoo',
    date: '2026-07-27',
    status: 'Absent',
    time: '--',
    percentage: 72
  },
  {
    rollNo: '2406151010',
    studentName: 'Debasish Tripathy',
    department: 'CE',
    course: 'B.Tech',
    semester: 'Semester 1',
    subject: 'Concrete Technology',
    teacher: 'Dr. Prasad Kumar Rauta',
    date: '2026-07-26',
    status: 'Present',
    time: '10:05 AM',
    percentage: 85
  }
];

export const DEPARTMENTS = ['CSE', 'ETC', 'EE', 'ME', 'CE', 'IT'];
export const COURSES = ['B.Tech', 'M.Tech', 'MCA', 'MSc'];
export const SEMESTERS = [
  'Semester 1',
  'Semester 2',
  'Semester 3',
  'Semester 4',
  'Semester 5',
  'Semester 6',
  'Semester 7',
  'Semester 8'
];
export const STATUSES = ['Present', 'Absent', 'Late', 'Leave'];

export const TEACHERS_LIST = [
  'Dr. Satya Prakash Sahoo',
  'Dr. Kishore Kumar Sahu',
  'Dr. Santosh Kumar Mohapatra',
  'Dr. Rockey Masudu Gouda',
  'Dr. Prasad Kumar Rauta',
  'Dr. Rashmi Ranjan Dash',
  'Satyabrata Mohanty'
];

export const SUBJECTS_LIST = [
  'Discrete Mathematics',
  'Data Structure Using C',
  'Database Engineering',
  'Operating Systems Laboratory',
  'Software Engineering',
  'Computer Networks Lab',
  'Analog Electronics',
  'Concrete Technology',
  'Thermodynamics',
  'Cloud Computing',
  'Electrical Machines'
];
