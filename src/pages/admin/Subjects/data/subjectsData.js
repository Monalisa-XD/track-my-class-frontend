/**
 * Mock API data for Admin Subjects Management
 */
export const initialSubjects = [
  {
    code: 'MCA101',
    name: 'Discrete Mathematics',
    department: 'CSE',
    course: 'MCA',
    semester: 'Semester 1',
    type: 'Theory',
    credits: 4,
    status: 'Active',
    createdDate: '2025-06-15',
    description: 'Foundations of mathematical logic, set theory, relations, functions, and graph theory relevant to computing.',
    textbooks: 'Discrete Mathematics and its Applications by Kenneth H. Rosen'
  },
  {
    code: 'MCA103',
    name: 'Data Structure Using C',
    department: 'CSE',
    course: 'MCA',
    semester: 'Semester 1',
    type: 'Theory',
    credits: 4,
    status: 'Active',
    createdDate: '2025-06-16',
    description: 'In-depth analysis of linear and non-linear data structures including lists, stacks, queues, trees, and graphs.',
    textbooks: 'Data Structures using C by Reema Thareja, Data Structures by Seymour Lipschutz'
  },
  {
    code: 'MCA105',
    name: 'Database Engineering',
    department: 'CSE',
    course: 'MCA',
    semester: 'Semester 2',
    type: 'Theory',
    credits: 4,
    status: 'Active',
    createdDate: '2025-06-18',
    description: 'Relational model database design, SQL syntax, normalizations, transactions, and indexing structures.',
    textbooks: 'Database System Concepts by Abraham Silberschatz, Henry F. Korth'
  },
  {
    code: 'MCA107',
    name: 'Operating Systems Laboratory',
    department: 'CSE',
    course: 'MCA',
    semester: 'Semester 2',
    type: 'Lab',
    credits: 2,
    status: 'Active',
    createdDate: '2025-06-20',
    description: 'Hands-on practicals implementing Unix shell scripting, process scheduling, page replacements, and thread synchronization.',
    textbooks: 'Operating System Concepts by Silberschatz, Galvin, and Gagne'
  },
  {
    code: 'CSE3001',
    name: 'Software Engineering',
    department: 'CSE',
    course: 'B.TECH-CSE',
    semester: 'Semester 5',
    type: 'Theory',
    credits: 3,
    status: 'Active',
    createdDate: '2025-06-25',
    description: 'Detailed study of software development life cycle methodologies, requirements gathering, UML diagrams, and testing.',
    textbooks: 'Software Engineering: A Practitioner\'s Approach by Roger S. Pressman'
  },
  {
    code: 'CSE3002',
    name: 'Computer Networks Lab',
    department: 'CSE',
    course: 'B.TECH-CSE',
    semester: 'Semester 6',
    type: 'Lab',
    credits: 2,
    status: 'Active',
    createdDate: '2025-06-28',
    description: 'Network socket programming using Java/C, packet sniffing via Wireshark, router configurations, and network topology layouts.',
    textbooks: 'Computer Networks by Andrew S. Tanenbaum'
  },
  {
    code: 'ETC102',
    name: 'Analog Electronics',
    department: 'ETC',
    course: 'B.TECH-ETC',
    semester: 'Semester 3',
    type: 'Theory',
    credits: 4,
    status: 'Active',
    createdDate: '2025-07-01',
    description: 'Study of diode circuits, BJT/FET amplifiers, feedback systems, and operational amplifier configurations.',
    textbooks: 'Electronic Devices and Circuit Theory by Boylestad and Nashelsky'
  },
  {
    code: 'MBA202',
    name: 'Organizational Behavior',
    department: 'IT',
    course: 'MBA',
    semester: 'Semester 2',
    type: 'Theory',
    credits: 3,
    status: 'Inactive',
    createdDate: '2025-07-05',
    description: 'Focuses on individual and group behavior dynamics, organizational culture, communication, leadership, and conflict resolution.',
    textbooks: 'Organizational Behavior by Stephen P. Robbins'
  }
];

export const DEPARTMENTS = ['CSE', 'ETC', 'EE', 'ME', 'CE', 'IT'];
export const COURSES = ['MCA', 'B.TECH-CSE', 'B.TECH-ETC', 'M.TECH-CSE', 'MBA', 'BCA', 'B.TECH-EE'];
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
