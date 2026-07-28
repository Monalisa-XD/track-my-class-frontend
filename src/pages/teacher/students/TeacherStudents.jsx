import React, { useState, useMemo } from 'react';
import { 
  Users, 
  User,
  GraduationCap, 
  Percent, 
  Award, 
  Search, 
  RotateCcw, 
  Eye, 
  X, 
  Mail, 
  Phone, 
  UsersRound,
  FileSpreadsheet,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
  BookOpen,
  Layers
} from 'lucide-react';
import { teacherStudentsData } from './data/studentsData';
import './TeacherStudents.css';

export default function TeacherStudents() {
  const { 
    academicYears, 
    semesters, 
    classes, 
    departments, 
    semestersList, 
    sections, 
    subjects, 
    students 
  } = teacherStudentsData;

  // Header Dropdown States
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [selectedAssignedClass, setSelectedAssignedClass] = useState(classes[0].code);

  // Filters State
  const [filterDept, setFilterDept] = useState('All');
  const [filterSem, setFilterSem] = useState('All');
  const [filterSection, setFilterSection] = useState('All');
  const [filterSubject, setFilterSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Student for Profile Drawer
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Helper: Get avatar initials
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Filter Logic
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesDept = filterDept === 'All' || s.department === filterDept;
      const matchesSem = filterSem === 'All' || s.semester === filterSem;
      const matchesSection = filterSection === 'All' || s.section === filterSection;
      const matchesSubject = filterSubject === 'All' || s.subject === filterSubject;
      const matchesSearch = searchQuery.trim() === '' || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.regNo.includes(searchQuery);

      return matchesDept && matchesSem && matchesSection && matchesSubject && matchesSearch;
    });
  }, [students, filterDept, filterSem, filterSection, filterSubject, searchQuery]);

  // Reset Filters
  const handleResetFilters = () => {
    setFilterDept('All');
    setFilterSem('All');
    setFilterSection('All');
    setFilterSubject('All');
    setSearchQuery('');
  };

  // Summary Metrics calculations
  const metrics = useMemo(() => {
    const total = filteredStudents.length;
    const active = filteredStudents.filter(s => s.status === 'Active').length;
    
    let sumAttendance = 0;
    let sumCgpa = 0;

    filteredStudents.forEach(s => {
      sumAttendance += s.attendance;
      sumCgpa += s.cgpa;
    });

    const avgAttendance = total > 0 ? Math.round(sumAttendance / total) : 0;
    const avgCgpa = total > 0 ? (sumCgpa / total).toFixed(2) : '0.00';

    return { total, active, avgAttendance, avgCgpa };
  }, [filteredStudents]);

  // Right Panel Calculations
  const rightPanelData = useMemo(() => {
    const total = filteredStudents.length;

    // Attendance distribution
    let highAtt = 0; // >90
    let midAtt = 0;  // 75-90
    let lowAtt = 0;  // <75

    // Performance overview
    let outstanding = 0; // >=9.0
    let firstClass = 0;  // 8.0 - 9.0
    let average = 0;     // <8.0

    filteredStudents.forEach(s => {
      if (s.attendance > 90) highAtt++;
      else if (s.attendance >= 75) midAtt++;
      else lowAtt++;

      if (s.cgpa >= 9.0) outstanding++;
      else if (s.cgpa >= 8.0) firstClass++;
      else average++;
    });

    // Top Performers (Top 3 by CGPA)
    const topPerformers = [...filteredStudents]
      .sort((a, b) => b.cgpa - a.cgpa)
      .slice(0, 3);

    return {
      highAtt, midAtt, lowAtt,
      outstanding, firstClass, average,
      topPerformers
    };
  }, [filteredStudents]);

  // Drawer handlers
  const handleOpenDrawer = (student) => {
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setSelectedStudent(null);
    setIsDrawerOpen(false);
  };

  const handleActionClick = (actionName, name) => {
    alert(`Navigating to ${actionName} reports for ${name}...`);
  };

  // Helper to determine status class
  const getStatusBadge = (student) => {
    // If student is outstanding, mark as Top Performer dynamically or use status
    if (student.cgpa >= 9.5) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Top Performer
        </span>
      );
    }
    if (student.status === 'Low Attendance' || student.attendance < 75) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Low Attendance
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Active
      </span>
    );
  };

  // Helper for dynamic attendance text color
  const getAttendanceColorClass = (pct) => {
    if (pct > 90) return 'text-emerald-600 font-extrabold';
    if (pct >= 75) return 'text-amber-600 font-extrabold';
    return 'text-red-650 font-extrabold';
  };

  return (
    <div className="space-y-6 relative min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">My Students</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Faculty Portal &nbsp;•&nbsp; <span className="text-blue-600">Assigned Students</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Assigned Class Dropdown */}
          <div className="relative min-w-[140px]">
            <select
              value={selectedAssignedClass}
              onChange={(e) => setSelectedAssignedClass(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {classes.map(cl => (
                <option key={cl.code} value={cl.code}>{cl.name}</option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <Users className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Academic Year Dropdown */}
          <div className="relative min-w-[130px]">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {academicYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Semester Dropdown */}
          <div className="relative min-w-[140px]">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        {/* Total Students */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-blue hover:border-blue-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Students</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.total}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Assigned roster count</p>
          </div>
        </div>

        {/* Active Students */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-emerald hover:border-emerald-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Students</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.active}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Currently attending lectures</p>
          </div>
        </div>

        {/* Average Attendance */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-amber hover:border-amber-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
            <Percent className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Attendance</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.avgAttendance}%</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Roster aggregate</p>
          </div>
        </div>

        {/* Average Performance */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-indigo hover:border-indigo-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Performance</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.avgCgpa}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">CGPA class metric</p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight flex flex-col xl:flex-row xl:items-center justify-between gap-4 select-none">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 flex-wrap">
          {/* Department Filter */}
          <div className="relative min-w-[130px]">
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept} Dept</option>
              ))}
            </select>
          </div>

          {/* Semester Filter */}
          <div className="relative min-w-[130px]">
            <select
              value={filterSem}
              onChange={(e) => setFilterSem(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Semesters</option>
              {semestersList.map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

          {/* Section Filter */}
          <div className="relative min-w-[110px]">
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Sections</option>
              {sections.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          {/* Subject Filter */}
          <div className="relative min-w-[180px]">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Subjects</option>
              {subjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* Search Student */}
          <div className="relative flex-1 min-w-[180px] max-w-[245px]">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Roll/Name..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {(filterDept !== 'All' || filterSem !== 'All' || filterSection !== 'All' || filterSubject !== 'All' || searchQuery !== '') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-550" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Student list + Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Side: Table List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-ambient overflow-hidden select-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-5">Photo / Avatar</th>
                    <th className="py-4 px-5">Roll Number</th>
                    <th className="py-4 px-5">Student Name</th>
                    <th className="py-4 px-5">Department</th>
                    <th className="py-4 px-5">Semester</th>
                    <th className="py-4 px-5">Section</th>
                    <th className="py-4 px-5 text-center">Attendance</th>
                    <th className="py-4 px-5 text-center">Performance</th>
                    <th className="py-4 px-5 text-center">Status</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <UsersRound className="w-12 h-12 text-slate-300" />
                          <h4 className="text-slate-800 font-bold">No students assigned.</h4>
                          <p className="text-xs text-slate-450 max-w-xs">No registered students were found matching the selected search criteria.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map(student => {
                      return (
                        <tr key={student.regNo} className="hover:bg-slate-50/40 transition-colors">
                          <td className="py-3.5 px-5">
                            <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-blue-550 to-indigo-650 text-white flex items-center justify-center font-extrabold text-[10px] shadow-sm">
                              {getInitials(student.name)}
                            </div>
                          </td>
                          <td className="py-3.5 px-5 font-bold font-mono text-slate-900">{student.regNo}</td>
                          <td className="py-3.5 px-5 font-bold text-slate-800">{student.name}</td>
                          <td className="py-3.5 px-5">
                            <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold rounded bg-slate-100 text-slate-600 border border-slate-200">
                              {student.department}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-slate-500 text-xs">{student.semester}</td>
                          <td className="py-3.5 px-5 text-slate-500 text-xs">{student.section}</td>
                          <td className={`py-3.5 px-5 text-center ${getAttendanceColorClass(student.attendance)}`}>
                            {student.attendance}%
                          </td>
                          <td className="py-3.5 px-5 text-center font-bold text-slate-850">{student.cgpa} CGPA</td>
                          <td className="py-3.5 px-5 text-center">
                            {getStatusBadge(student)}
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenDrawer(student)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg active:scale-95 transition-all cursor-pointer border border-blue-100 shadow-2xs"
                                title="View Profile"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Profile</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleActionClick('Attendance', student.name)}
                                className="p-1.5 text-slate-550 hover:bg-slate-100 hover:text-slate-700 rounded-lg active:scale-95 transition-all cursor-pointer"
                                title="View Attendance"
                              >
                                <Percent className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleActionClick('Performance', student.name)}
                                className="p-1.5 text-slate-550 hover:bg-slate-100 hover:text-slate-700 rounded-lg active:scale-95 transition-all cursor-pointer"
                                title="View Performance"
                              >
                                <Award className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side Panels */}
        <div className="space-y-6">
          {/* Assigned Subjects & Sections Widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4.5 h-4.5 text-emerald-600" />
              <span>Assigned Roster</span>
            </h3>

            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assigned Subjects</p>
                <div className="mt-2 space-y-1.5">
                  {subjects.map(sub => (
                    <div key={sub} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-100 p-2 rounded-xl">
                      <BookOpen className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="truncate">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-1.5">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assigned Sections</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {sections.map(sec => (
                    <span key={sec} className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Performance Overview (CGPA distribution) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Performance Overview
            </h3>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-550">Outstanding (9.0+ CGPA)</span>
                  <span className="text-slate-800 font-bold">{rightPanelData.outstanding} Students</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(rightPanelData.outstanding / (filteredStudents.length || 1)) * 100}%` }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-550">First Class (8.0-9.0 CGPA)</span>
                  <span className="text-slate-800 font-bold">{rightPanelData.firstClass} Students</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(rightPanelData.firstClass / (filteredStudents.length || 1)) * 100}%` }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-550">Average (&lt;8.0 CGPA)</span>
                  <span className="text-slate-800 font-bold">{rightPanelData.average} Students</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full rounded-full" style={{ width: `${(rightPanelData.average / (filteredStudents.length || 1)) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Distribution */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Attendance Distribution
            </h3>

            <div className="space-y-3.5 text-xs font-semibold text-slate-650">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Excellent (&gt;90%)</span>
                </div>
                <span className="text-slate-800 font-bold">{rightPanelData.highAtt} Students</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Satisfactory (75%-90%)</span>
                </div>
                <span className="text-slate-800 font-bold">{rightPanelData.midAtt} Students</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span>Low (&lt;75%)</span>
                </div>
                <span className="text-slate-800 font-bold text-red-600">{rightPanelData.lowAtt} Students</span>
              </div>
            </div>
          </div>

          {/* Top Performing Students */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4.5 h-4.5 text-blue-600" />
              <span>Top Performing Students</span>
            </h3>

            <div className="space-y-3">
              {rightPanelData.topPerformers.map((st, idx) => (
                <div key={st.regNo} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{st.name}</p>
                      <p className="text-[10px] text-slate-450 font-semibold">{st.regNo}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-indigo-650 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                    {st.cgpa}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide drawer for Student Profile */}
      {isDrawerOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Overlay backdrop */}
          <div 
            onClick={handleCloseDrawer}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs modal-fade-in"
          />

          {/* Drawer container */}
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right border-l border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-150">
              <h3 className="text-base font-bold text-slate-800 tracking-tight">Student Details Profile</h3>
              <button 
                onClick={handleCloseDrawer}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 cursor-pointer active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Photo & Main Details */}
              <div className="flex flex-col items-center text-center space-y-3.5">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-2xl shadow-lg border border-blue-200">
                  {getInitials(selectedStudent.name)}
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-800 leading-tight">{selectedStudent.name}</h4>
                  <p className="text-xs text-slate-455 font-bold mt-1">Roll Number: {selectedStudent.regNo}</p>
                </div>
              </div>

              {/* Grid cards for major stats */}
              <div className="grid grid-cols-2 gap-3.5 pt-1">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-150 text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Attendance</p>
                  <p className={`text-xl font-black mt-1 ${getAttendanceColorClass(selectedStudent.attendance)}`}>
                    {selectedStudent.attendance}%
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-150 text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Performance</p>
                  <p className="text-xl font-black text-indigo-650 mt-1">{selectedStudent.cgpa} CGPA</p>
                </div>
              </div>

              {/* Personal details list */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Academic Info</h4>
                
                <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                  <span className="text-slate-500">Department</span>
                  <span className="col-span-2 text-slate-800 font-bold">{selectedStudent.department}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                  <span className="text-slate-500">Semester</span>
                  <span className="col-span-2 text-slate-800 font-bold">{selectedStudent.semester}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                  <span className="text-slate-500">Section</span>
                  <span className="col-span-2 text-slate-800 font-bold">{selectedStudent.section}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                  <span className="text-slate-500">Class Year</span>
                  <span className="col-span-2 text-slate-800 font-bold">{selectedStudent.course}</span>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Contact details</h4>

                <div className="flex items-center gap-3 text-xs font-semibold text-slate-750">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{selectedStudent.email}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-750">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{selectedStudent.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-755">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Guardian: <strong className="font-bold text-slate-800">{selectedStudent.guardianName}</strong></span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-150 bg-slate-50 flex justify-end">
              <button
                onClick={handleCloseDrawer}
                className="px-5 py-2.5 rounded-xl border border-slate-250 hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer active:scale-95 transition-all shadow-2xs"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
