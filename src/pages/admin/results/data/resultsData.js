/**
 * Mock API data for Admin Results Management
 */
export const initialResults = [
  {
    rollNo: '2406151001',
    studentName: 'Ananya Mishra',
    department: 'CSE',
    course: 'MCA',
    semester: 'Semester 1',
    classCode: 'CL-CSE-MCA-1A',
    subject: 'Data Structure Using C',
    examType: 'Mid-Sem',
    marksObtained: 88,
    totalMarks: 100,
    grade: 'A+',
    percentage: 88,
    status: 'Published',
    publishedDate: '2026-07-28'
  },
  {
    rollNo: '2406151002',
    studentName: 'Aman Kumar Nayak',
    department: 'CSE',
    course: 'MCA',
    semester: 'Semester 1',
    classCode: 'CL-CSE-MCA-1A',
    subject: 'Data Structure Using C',
    examType: 'Mid-Sem',
    marksObtained: 74,
    totalMarks: 100,
    grade: 'B+',
    percentage: 74,
    status: 'Published',
    publishedDate: '2026-07-28'
  },
  {
    rollNo: '2406151003',
    studentName: 'Priyanka Senapati',
    department: 'CSE',
    course: 'MCA',
    semester: 'Semester 1',
    classCode: 'CL-CSE-MCA-1A',
    subject: 'Discrete Mathematics',
    examType: 'Mid-Sem',
    marksObtained: 55,
    totalMarks: 100,
    grade: 'C',
    percentage: 55,
    status: 'Draft',
    publishedDate: '--'
  },
  {
    rollNo: '2406151004',
    studentName: 'Subham Sourav Panda',
    department: 'ETC',
    course: 'B.Tech',
    semester: 'Semester 5',
    classCode: 'CL-ETC-BTECH-5B',
    subject: 'Analog Electronics',
    examType: 'End-Sem',
    marksObtained: 92,
    totalMarks: 100,
    grade: 'A+',
    percentage: 92,
    status: 'Published',
    publishedDate: '2026-07-28'
  },
  {
    rollNo: '2406151005',
    studentName: 'Lipsa Rani Sahoo',
    department: 'ETC',
    course: 'B.Tech',
    semester: 'Semester 5',
    classCode: 'CL-ETC-BTECH-5B',
    subject: 'Analog Electronics',
    examType: 'End-Sem',
    marksObtained: 42,
    totalMarks: 100,
    grade: 'F',
    percentage: 42,
    status: 'Failed',
    publishedDate: '2026-07-28'
  },
  {
    rollNo: '2406151006',
    studentName: 'Ashish Kumar Dash',
    department: 'EE',
    course: 'B.Tech',
    semester: 'Semester 7',
    classCode: 'CL-EE-BTECH-7A',
    subject: 'Electrical Machines',
    examType: 'Mid-Sem',
    marksObtained: 81,
    totalMarks: 100,
    grade: 'A',
    percentage: 81,
    status: 'Published',
    publishedDate: '2026-07-27'
  },
  {
    rollNo: '2406151007',
    studentName: 'Swadhin Pradhan',
    department: 'ME',
    course: 'B.Tech',
    semester: 'Semester 5',
    classCode: 'CL-ME-BTECH-5B',
    subject: 'Thermodynamics',
    examType: 'Mid-Sem',
    marksObtained: 68,
    totalMarks: 100,
    grade: 'B',
    percentage: 68,
    status: 'Pending',
    publishedDate: '--'
  },
  {
    rollNo: '2406151008',
    studentName: 'Satyajit Mohapatra',
    department: 'IT',
    course: 'MCA',
    semester: 'Semester 3',
    classCode: 'CL-IT-MCA-3A',
    subject: 'Cloud Computing',
    examType: 'Internal',
    marksObtained: 95,
    totalMarks: 100,
    grade: 'A+',
    percentage: 95,
    status: 'Published',
    publishedDate: '2026-07-27'
  },
  {
    rollNo: '2406151009',
    studentName: 'Tanuja Priyadarshini',
    department: 'CSE',
    course: 'M.Tech',
    semester: 'Semester 3',
    classCode: 'CL-CSE-MTECH-3A',
    subject: 'Computer Networks Lab',
    examType: 'Mid-Sem',
    marksObtained: 78,
    totalMarks: 100,
    grade: 'A',
    percentage: 78,
    status: 'Published',
    publishedDate: '2026-07-27'
  },
  {
    rollNo: '2406151010',
    studentName: 'Debasish Tripathy',
    department: 'CE',
    course: 'B.Tech',
    semester: 'Semester 1',
    classCode: 'CL-CE-BTECH-1A',
    subject: 'Concrete Technology',
    examType: 'End-Sem',
    marksObtained: 38,
    totalMarks: 100,
    grade: 'F',
    percentage: 38,
    status: 'Failed',
    publishedDate: '2026-07-26'
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
export const EXAM_TYPES = ['Mid-Sem', 'End-Sem', 'Internal', 'Practical'];
export const STATUSES = ['Published', 'Draft', 'Pending', 'Failed'];

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

export const CLASSES_LIST = [
  'CL-CSE-MCA-1A',
  'CL-ETC-BTECH-5B',
  'CL-EE-BTECH-7A',
  'CL-ME-BTECH-5B',
  'CL-CE-BTECH-1A',
  'CL-IT-MCA-3A',
  'CL-CSE-MTECH-3A'
];
