/**
 * Mock API data for Admin Schedule/Timetable Management
 */
export const initialSchedules = [
  {
    id: 'SCH-CSE-MCA-101',
    classCode: 'CL-CSE-MCA-1A',
    className: 'CSE MCA Section A',
    department: 'CSE',
    course: 'MCA',
    subject: 'Data Structure Using C',
    teacher: 'Satyabrata Mohanty',
    day: 'Monday',
    timeSlot: '09:00 AM – 10:00 AM',
    classroom: 'Room 302',
    semester: 'Semester 1',
    status: 'Active'
  },
  {
    id: 'SCH-ETC-BTECH-501',
    classCode: 'CL-ETC-BTECH-5B',
    className: 'ETC B.Tech Section B',
    department: 'ETC',
    course: 'B.Tech',
    subject: 'Analog Electronics',
    teacher: 'Dr. Kishore Kumar Sahu',
    day: 'Monday',
    timeSlot: '10:00 AM – 11:00 AM',
    classroom: 'Room 105',
    semester: 'Semester 5',
    status: 'Active'
  },
  {
    id: 'SCH-CSE-MCA-102',
    classCode: 'CL-CSE-MCA-1A',
    className: 'CSE MCA Section A',
    department: 'CSE',
    course: 'MCA',
    subject: 'Discrete Mathematics',
    teacher: 'Dr. Satya Prakash Sahoo',
    day: 'Tuesday',
    timeSlot: '11:15 AM – 12:15 PM',
    classroom: 'Room 302',
    semester: 'Semester 1',
    status: 'Active'
  },
  {
    id: 'SCH-EE-BTECH-701',
    classCode: 'CL-EE-BTECH-7A',
    className: 'EE B.Tech Section A',
    department: 'EE',
    course: 'B.Tech',
    subject: 'Electrical Machines',
    teacher: 'Dr. Santosh Kumar Mohapatra',
    day: 'Wednesday',
    timeSlot: '12:15 PM – 01:15 PM',
    classroom: 'Room 204',
    semester: 'Semester 7',
    status: 'Active'
  },
  {
    id: 'SCH-ME-BTECH-501',
    classCode: 'CL-ME-BTECH-5B',
    className: 'ME B.Tech Section B',
    department: 'ME',
    course: 'B.Tech',
    subject: 'Thermodynamics',
    teacher: 'Dr. Rockey Masudu Gouda',
    day: 'Thursday',
    timeSlot: '02:30 PM – 03:30 PM',
    classroom: 'Lab 3',
    semester: 'Semester 5',
    status: 'Active'
  },
  {
    id: 'SCH-IT-MCA-301',
    classCode: 'CL-IT-MCA-3A',
    className: 'IT MCA Section A',
    department: 'IT',
    course: 'MCA',
    subject: 'Cloud Computing',
    teacher: 'Dr. Rashmi Ranjan Dash',
    day: 'Friday',
    timeSlot: '09:00 AM – 10:00 AM',
    classroom: 'Room 401',
    semester: 'Semester 3',
    status: 'Active'
  },
  {
    id: 'SCH-CSE-MTECH-301',
    classCode: 'CL-CSE-MTECH-3A',
    className: 'CSE M.Tech Section A',
    department: 'CSE',
    course: 'M.Tech',
    subject: 'Computer Networks Lab',
    teacher: 'Dr. Satya Prakash Sahoo',
    day: 'Wednesday',
    timeSlot: '03:30 PM – 04:30 PM',
    classroom: 'Room 305',
    semester: 'Semester 3',
    status: 'Inactive'
  },
  {
    id: 'SCH-CE-BTECH-101',
    classCode: 'CL-CE-BTECH-1A',
    className: 'CE B.Tech Section A',
    department: 'CE',
    course: 'B.Tech',
    subject: 'Concrete Technology',
    teacher: 'Dr. Prasad Kumar Rauta',
    day: 'Tuesday',
    timeSlot: '10:00 AM – 11:00 AM',
    classroom: 'Room 102',
    semester: 'Semester 1',
    status: 'Active'
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
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const TIME_SLOTS = [
  '09:00 AM – 10:00 AM',
  '10:00 AM – 11:00 AM',
  '11:15 AM – 12:15 PM',
  '12:15 PM – 01:15 PM',
  '02:30 PM – 03:30 PM',
  '03:30 PM – 04:30 PM'
];
export const CLASSROOMS = [
  'Room 101',
  'Room 102',
  'Room 105',
  'Room 204',
  'Room 302',
  'Room 305',
  'Room 401',
  'Lab 1',
  'Lab 3',
  'Lab 5'
];

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

export const CLASSES_LIST = [
  { code: 'CL-CSE-MCA-1A', name: 'CSE MCA Section A', dept: 'CSE', course: 'MCA', sem: 'Semester 1' },
  { code: 'CL-ETC-BTECH-5B', name: 'ETC B.Tech Section B', dept: 'ETC', course: 'B.Tech', sem: 'Semester 5' },
  { code: 'CL-EE-BTECH-7A', name: 'EE B.Tech Section A', dept: 'EE', course: 'B.Tech', sem: 'Semester 7' },
  { code: 'CL-ME-BTECH-5B', name: 'ME B.Tech Section B', dept: 'ME', course: 'B.Tech', sem: 'Semester 5' },
  { code: 'CL-CE-BTECH-1A', name: 'CE B.Tech Section A', dept: 'CE', course: 'B.Tech', sem: 'Semester 1' },
  { code: 'CL-IT-MCA-3A', name: 'IT MCA Section A', dept: 'IT', course: 'MCA', sem: 'Semester 3' },
  { code: 'CL-CSE-MTECH-3A', name: 'CSE M.Tech Section A', dept: 'CSE', course: 'M.Tech', sem: 'Semester 3' }
];
