import React, { useState, useMemo } from 'react';
import { 
  ClipboardCheck, 
  Users, 
  Clock, 
  Calendar, 
  Search, 
  RotateCcw, 
  Check, 
  FileSpreadsheet, 
  AlertCircle,
  History,
  FileText,
  UserCheck,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { teacherAttendanceData } from './data/attendanceData';
import './TeacherAttendance.css';

export default function TeacherAttendance() {
  const { teacher, academicYears, semesters, subjects, classes, sections, students, recentHistory } = teacherAttendanceData;

  // Header State
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const todayDateString = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Filter States
  const [selectedSubject, setSelectedSubject] = useState(subjects[0].name);
  const [selectedClass, setSelectedClass] = useState(classes[0].code);
  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchStudent, setSearchStudent] = useState('');

  // Attendance marking states: {[rollNo]: 'Present' | 'Absent' | 'Late' | 'Leave'}
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const initial = {};
    students.forEach(s => {
      initial[s.rollNo] = 'Present'; // Default everyone to Present for ease of marking
    });
    return initial;
  });

  // Filtered Students list based on selectors
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesClass = s.classCode === selectedClass;
      const matchesSection = s.section === selectedSection;
      const matchesSearch = searchStudent.trim() === '' || 
        s.name.toLowerCase().includes(searchStudent.toLowerCase()) || 
        s.rollNo.includes(searchStudent);
      
      return matchesClass && matchesSection && matchesSearch;
    });
  }, [students, selectedClass, selectedSection, searchStudent]);

  // Handle single attendance changes
  const handleMarkStatus = (rollNo, status) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [rollNo]: status
    }));
  };

  // Action: Mark all present
  const handleMarkAllPresent = () => {
    const updated = { ...attendanceRecords };
    filteredStudents.forEach(s => {
      updated[s.rollNo] = 'Present';
    });
    setAttendanceRecords(updated);
  };

  // Action: Reset
  const handleReset = () => {
    const updated = { ...attendanceRecords };
    filteredStudents.forEach(s => {
      updated[s.rollNo] = 'Present';
    });
    setAttendanceRecords(updated);
    setSearchStudent('');
  };

  // Action: Save Draft
  const handleSaveDraft = () => {
    alert(`Draft saved successfully for ${selectedSubject} (${selectedSection}) on ${attendanceDate}!`);
  };

  // Action: Submit
  const handleSubmitAttendance = () => {
    alert(`Attendance submitted successfully! Registered records for ${filteredStudents.length} students.`);
  };

  // Live Stats calculations for Right Panel and Cards
  const liveStats = useMemo(() => {
    let present = 0;
    let absent = 0;
    let late = 0;
    let leave = 0;

    filteredStudents.forEach(s => {
      const status = attendanceRecords[s.rollNo];
      if (status === 'Present') present++;
      else if (status === 'Absent') absent++;
      else if (status === 'Late') late++;
      else if (status === 'Leave') leave++;
    });

    const total = filteredStudents.length;
    const rate = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 0;

    return { present, absent, late, leave, total, rate };
  }, [filteredStudents, attendanceRecords]);

  // Overall Attendance Summary cards data
  const summaryCards = [
    {
      id: 'card-classes-today',
      title: "Today's Classes",
      value: '4',
      subtitle: '3 completed, 1 pending',
      icon: Calendar,
      color: 'blue'
    },
    {
      id: 'card-att-pending',
      title: 'Attendance Pending',
      value: '1',
      subtitle: 'OS Laboratory Sec A',
      icon: Clock,
      color: 'amber'
    },
    {
      id: 'card-att-submitted',
      title: 'Attendance Submitted',
      value: '3',
      subtitle: 'OS Lecture, CN Lecture',
      icon: ClipboardCheck,
      color: 'emerald'
    },
    {
      id: 'card-overall-pct',
      title: 'Overall Attendance %',
      value: '88.5%',
      subtitle: 'Avg monthly rate',
      icon: Users,
      color: 'indigo'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Filters Toolbar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-ambient select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-sm shadow-blue-400" />
          <span className="text-xs font-bold text-slate-700 tracking-wide">Attendance Register</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Academic Year */}
          <div className="relative min-w-[130px]">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {academicYears.map(year => (
                <option key={year} value={year}>{year} Year</option>
              ))}
            </select>
          </div>


          {/* Today's Date */}
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold text-slate-650">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>{todayDateString}</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        {summaryCards.map(card => {
          const IconComponent = card.icon;
          const glowClass = 
            card.color === 'blue' ? 'hover:shadow-glow-blue hover:border-blue-300/80' :
            card.color === 'emerald' ? 'hover:shadow-glow-emerald hover:border-emerald-300/80' :
            card.color === 'amber' ? 'hover:shadow-glow-amber hover:border-amber-300/80' :
            'hover:shadow-glow-indigo hover:border-indigo-300/80';

          const gradientClass = 
            card.color === 'blue' ? 'from-blue-500 to-indigo-600 shadow-blue-500/20' :
            card.color === 'emerald' ? 'from-emerald-500 to-teal-600 shadow-emerald-500/20' :
            card.color === 'amber' ? 'from-amber-500 to-orange-600 shadow-amber-500/20' :
            'from-indigo-500 to-purple-600 shadow-indigo-500/20';

          return (
            <div
              key={card.id}
              className={`group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden ${glowClass}`}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-all ${gradientClass}`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{card.title}</span>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{card.value}</h3>
                <p className="text-xs text-slate-500 font-semibold truncate mt-1">{card.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight flex flex-col xl:flex-row xl:items-center justify-between gap-4 select-none">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 flex-wrap">
          {/* Subject Dropdown */}
          <div className="relative min-w-[180px]">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {subjects.map(sub => (
                <option key={sub.code} value={sub.name}>{sub.name}</option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <Filter className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Class Dropdown */}
          <div className="relative min-w-[130px]">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {classes.map(cl => (
                <option key={cl.code} value={cl.code}>{cl.name}</option>
              ))}
            </select>
          </div>

          {/* Section Dropdown */}
          <div className="relative min-w-[110px]">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {sections.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="relative">
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="pl-3.5 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none font-semibold text-slate-700 cursor-pointer"
            />
          </div>

          {/* Search Student */}
          <div className="relative flex-1 min-w-[180px] max-w-[240px]">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              placeholder="Search Student..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Table Panel */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-ambient overflow-hidden select-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-5">Roll Number</th>
                    <th className="py-4 px-5">Student Name</th>
                    <th className="py-4 px-5">Department</th>
                    <th className="py-4 px-5">Semester</th>
                    <th className="py-4 px-5">Section</th>
                    <th className="py-4 px-5">Attendance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <Users className="w-10 h-10 text-slate-300" />
                          <h4 className="text-slate-800 font-bold">No students available.</h4>
                          <p className="text-xs text-slate-450 max-w-xs">Adjust your class, section, or search filters to find registered students.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map(student => {
                      const recordStatus = attendanceRecords[student.rollNo] || 'Present';
                      return (
                        <tr key={student.rollNo} className="hover:bg-slate-50/45 transition-colors">
                          <td className="py-4 px-5 font-bold font-mono text-slate-900">{student.rollNo}</td>
                          <td className="py-4 px-5 font-bold text-slate-800">{student.name}</td>
                          <td className="py-4 px-5">
                            <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold rounded bg-slate-100 text-slate-650 border border-slate-200">
                              {student.department}
                            </span>
                          </td>
                          <td className="py-4 px-5 text-xs text-slate-500">{student.semester}</td>
                          <td className="py-4 px-5 text-xs text-slate-500">{student.section}</td>
                          <td className="py-4 px-5">
                            {/* Segmented controls / radio buttons for marking attendance */}
                            <div className="flex items-center gap-1.5">
                              {['Present', 'Absent', 'Late', 'Leave'].map(status => {
                                const isChecked = recordStatus === status;
                                const styleClass = 
                                  status === 'Present' ? (isChecked ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/10' : 'bg-slate-100 hover:bg-emerald-50 text-slate-600 border-slate-200') :
                                  status === 'Absent' ? (isChecked ? 'bg-red-500 text-white border-red-500 shadow-sm shadow-red-500/10' : 'bg-slate-100 hover:bg-red-50 text-slate-600 border-slate-200') :
                                  status === 'Late' ? (isChecked ? 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/10' : 'bg-slate-100 hover:bg-amber-50 text-slate-600 border-slate-200') :
                                  (isChecked ? 'bg-blue-500 text-white border-blue-500 shadow-sm shadow-blue-500/10' : 'bg-slate-100 hover:bg-blue-50 text-slate-600 border-slate-200');

                                return (
                                  <button
                                    key={status}
                                    type="button"
                                    onClick={() => handleMarkStatus(student.rollNo, status)}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer select-none active:scale-95 ${styleClass}`}
                                  >
                                    {status}
                                  </button>
                                );
                              })}
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

          {/* Action Bar */}
          {filteredStudents.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-ambient flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleMarkAllPresent}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-150 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-slate-600" />
                  <span>Mark All Present</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-slate-500" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-2xs"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Save Draft</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmitAttendance}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Submit Attendance</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Info Panels */}
        <div className="space-y-6">
          {/* Live Attendance Summary */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Attendance Summary
            </h3>

            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-center">
                  <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">Present</p>
                  <p className="text-xl font-black text-emerald-800 mt-1">{liveStats.present}</p>
                </div>
                <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 text-center">
                  <p className="text-[10px] text-red-700 font-bold uppercase tracking-wider">Absent</p>
                  <p className="text-xl font-black text-red-800 mt-1">{liveStats.absent}</p>
                </div>
                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 text-center">
                  <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">Late</p>
                  <p className="text-xl font-black text-amber-800 mt-1">{liveStats.late}</p>
                </div>
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-center">
                  <p className="text-[10px] text-blue-700 font-bold uppercase tracking-wider">Leave</p>
                  <p className="text-xl font-black text-blue-800 mt-1">{liveStats.leave}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">Attendance Percentage</span>
                  <span className="text-slate-800 font-bold">{liveStats.rate}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-300" 
                    style={{ width: `${liveStats.rate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* History Panel */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-4.5 h-4.5 text-slate-550" />
              <span>Recent History</span>
            </h3>

            <div className="space-y-3.5">
              {recentHistory.map(log => {
                const isDraft = log.status.toLowerCase() === 'draft';
                return (
                  <div key={log.id} className="flex gap-2.5 items-start text-xs border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isDraft ? 'bg-amber-400' : 'bg-emerald-500'}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <h4 className="font-bold text-slate-800 truncate">{log.subject}</h4>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold border ${
                          isDraft ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{log.class}</p>
                      <span className="text-[10px] text-slate-400 font-bold mt-1 inline-block">{log.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
