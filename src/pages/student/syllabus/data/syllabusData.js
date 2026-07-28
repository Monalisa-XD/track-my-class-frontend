export const studentSyllabusData = {
  academicYears: ['2025 – 2026', '2024 – 2025'],
  semesters: ['Semester 3', 'Semester 4'],
  departments: ['Computer Science & Engg', 'Information Technology'],
  subjects: ['All', 'Operating Systems', 'Database Systems', 'Computer Networks', 'Software Engineering', 'Discrete Mathematics'],

  syllabusList: [
    {
      code: 'MCA-301',
      name: 'Operating Systems',
      faculty: 'Dr. S. P. Sahoo',
      credits: 4,
      progress: 80,
      units: [
        { num: 1, title: 'Introduction & Process Management', topics: 'Process states, PCB, CPU scheduling algorithms (FCFS, SJF, Round Robin, Priority).', hours: 8, status: 'Completed' },
        { num: 2, title: 'Process Synchronization', topics: 'Critical section problem, Peterson\'s solution, Semaphores, Classic synchronization problems (Bounded-Buffer, Readers-Writers).', hours: 10, status: 'Completed' },
        { num: 3, title: 'Deadlocks & Memory Management', topics: 'Deadlock prevention, avoidance (Banker\'s algorithm), detection and recovery. Logical vs physical address, Paging, Segmentation.', hours: 12, status: 'Completed' },
        { num: 4, title: 'Virtual Memory & File Systems', topics: 'Demand paging, Page replacement algorithms (FIFO, LRU, Optimal). File allocation methods, Disk scheduling.', hours: 8, status: 'Completed' },
        { num: 5, title: 'Protection & Security', topics: 'Goals of protection, Access matrix, Access control lists, User authentication, System threats.', hours: 6, status: 'In Progress' }
      ]
    },
    {
      code: 'MCA-302',
      name: 'Database Systems',
      faculty: 'Dr. Amit Mishra',
      credits: 4,
      progress: 60,
      units: [
        { num: 1, title: 'Introduction & ER Model', topics: 'Database system architecture, Data independence, ER diagrams, Entities, Relationship sets, Constraints.', hours: 8, status: 'Completed' },
        { num: 2, title: 'Relational Model & Algebra', topics: 'Relational algebra operations, Tuple relational calculus, Domain relational calculus, Integrity constraints.', hours: 8, status: 'Completed' },
        { num: 3, title: 'SQL & Normalization', topics: 'DDL, DML, Subqueries, Joins. Functional dependencies, 1NF, 2NF, 3NF, BCNF, Multi-valued dependencies.', hours: 12, status: 'Completed' },
        { num: 4, title: 'Transaction & Concurrency Control', topics: 'ACID properties, Serializability, Lock-based protocols, Two-phase locking, Timestamp-based protocols.', hours: 10, status: 'In Progress' },
        { num: 5, title: 'Recovery Systems & Storage', topics: 'Log-based recovery, Checkpoints, Shadow paging. Indexing structures, B-trees, B+ trees, Hashing.', hours: 8, status: 'Pending' }
      ]
    },
    {
      code: 'MCA-303',
      name: 'Computer Networks',
      faculty: 'Dr. S. P. Sahoo',
      credits: 4,
      progress: 80,
      units: [
        { num: 1, title: 'Introduction & Physical Layer', topics: 'OSI and TCP/IP reference models, Transmission media, Switching networks, Line coding.', hours: 8, status: 'Completed' },
        { num: 2, title: 'Data Link Layer', topics: 'Error detection and correction (CRC, Hamming code), Sliding window protocols (Go-Back-N, Selective Repeat), MAC sublayer.', hours: 10, status: 'Completed' },
        { num: 3, title: 'Network Layer', topics: 'IPv4/IPv6 addressing, Routing algorithms (Distance Vector, Link State), Congestion control, Subnetting.', hours: 12, status: 'Completed' },
        { num: 4, title: 'Transport Layer', topics: 'TCP vs UDP, Three-way handshake, Flow control, Congestion window management.', hours: 8, status: 'Completed' },
        { num: 5, title: 'Application Layer', topics: 'Domain Name System (DNS), HTTP, SMTP, FTP, Cryptography, Network security.', hours: 6, status: 'In Progress' }
      ]
    },
    {
      code: 'MCA-304',
      name: 'Software Engineering',
      faculty: 'Mrs. Lipika Panda',
      credits: 3,
      progress: 40,
      units: [
        { num: 1, title: 'Software Process Models', topics: 'SDLC, Waterfall model, Incremental models, Evolutionary models, Spiral model, Agile methodology.', hours: 8, status: 'Completed' },
        { num: 2, title: 'Requirements Engineering', topics: 'SRS documentation, Feasibility study, Elicitation techniques, Analysis and negotiation, Validation.', hours: 8, status: 'Completed' },
        { num: 3, title: 'Software Design', topics: 'Design concepts, Coupling and cohesion, Architectural styles, Object-oriented design, UML diagrams.', hours: 10, status: 'In Progress' },
        { num: 4, title: 'Testing Techniques', topics: 'White-box testing, Black-box testing, Integration testing, System testing, Regression testing.', hours: 8, status: 'Pending' },
        { num: 5, title: 'Software Maintenance', topics: 'Re-engineering, Reverse engineering, Software configuration management, Project estimation (COCOMO).', hours: 6, status: 'Pending' }
      ]
    },
    {
      code: 'MCA-305',
      name: 'Discrete Mathematics',
      faculty: 'Dr. R. K. Patel',
      credits: 4,
      progress: 100,
      units: [
        { num: 1, title: 'Sets, Relations & Functions', topics: 'Set operations, Venn diagrams, Relations, Equivalence relations, Partially ordered sets, Lattices.', hours: 8, status: 'Completed' },
        { num: 2, title: 'Mathematical Logic', topics: 'Propositional logic, Truth tables, Predicates and quantifiers, Rules of inference, Proof methods.', hours: 8, status: 'Completed' },
        { num: 3, title: 'Graph Theory', topics: 'Graph isomorphism, Euler and Hamiltonian paths, Shortest path algorithms, Trees, Spanning trees.', hours: 10, status: 'Completed' },
        { num: 4, title: 'Algebraic Structures', topics: 'Groups, Subgroups, Homomorphism, Rings, Integral domains, Fields.', hours: 10, status: 'Completed' },
        { num: 5, title: 'Combinatorics', topics: 'Permutations, Combinations, Pigeonhole principle, Recurrence relations, Generating functions.', hours: 8, status: 'Completed' }
      ]
    }
  ]
};
