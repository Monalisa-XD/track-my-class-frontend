import React, { useState, useMemo } from 'react';
import { 
  ClipboardCheck, 
  Users, 
  Calendar, 
  RotateCcw, 
  TrendingUp, 
  BookOpen, 
  AlertCircle, 
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  History
} from 'lucide-react';
import { studentAttendanceData } from './data/attendanceData';
import './StudentAttendance.css';

export default function StudentAttendance() {
  const { academicYears, semesters, months, subjects, subjectAttendance, history } = studentAttendanceData;

  // Header Selectors State
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  // Filters State
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterMonth, setFilterMonth] = useState('All');

  // Reset Filters
  const handleResetFilters = () => {
    setFilterSubject('All');
    setFilterMonth('All');
  };

  // Filter Logic
  const filteredAttendance = useMemo(() => {
    return subjectAttendance.filter(item => {
      const matchesSubject = filterSubject === 'All' || item.subject === filterSubject;
      return matchesSubject;
    });
  }, [subjectAttendance, filterSubject]);

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      const matchesSubject = filterSubject === 'All' || item.subject === filterSubject;
      return matchesSubject;
    });
  }, [history, filterSubject]);

  // Dynamic calculations based on filtered subject rows
  const stats = useMemo(() => {
    if (filteredAttendance.length === 0) {
      return { totalConducted: 0, totalAttended: 0, totalMissed: 0, overallPercentage: 0, status: 'No Data' };
    }

    let totalConducted = 0;
    let totalAttended = 0;

    filteredAttendance.forEach(item => {
      totalConducted += item.conducted;
      totalAttended += item.attended;
    });

    const totalMissed = Math.max(0, totalConducted - totalAttended);
    const overallPercentage = totalConducted > 0 ? Math.round((totalAttended / totalConducted) * 100) : 0;

    let status = 'Low';
    if (overallPercentage >= 90) status = 'Excellent';
    else if (overallPercentage >= 75) status = 'Good';

    return { totalConducted, totalAttended, totalMissed, overallPercentage, status };
  }, [filteredAttendance]);

  // Right Side Analytics calculations
  const analytics = useMemo(() => {
    if (filteredAttendance.length === 0) {
      return { highest: 'N/A', lowest: 'N/A', eligible: false };
    }

    let highestItem = filteredAttendance[0];
    let lowestItem = filteredAttendance[0];

    filteredAttendance.forEach(item => {
      if (item.percentage > highestItem.percentage) highestItem = item;
      if (item.percentage < lowestItem.percentage) lowestItem = item;
    });

    const eligible = stats.overallPercentage >= 75;

    return { 
      highest: `${highestItem.subject} (${highestItem.percentage}%)`, 
      lowest: `${lowestItem.subject} (${lowestItem.percentage}%)`, 
      eligible 
    };
  }, [filteredAttendance, stats]);

  // Helper: Status badge color mapping
  const getStatusBadge = (percentage) => {
    if (percentage >= 90) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (percentage >= 75) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    return 'bg-red-50 text-red-700 border-red-200';
  };

  const getStatusLabel = (percentage) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 75) return 'Good';
    return 'Low Attendance';
  };

  return (
    <div className="space-y-6">
      {/* Filters Toolbar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-655 animate-pulse shadow-sm shadow-purple-400" />
          <span className="text-xs font-bold text-slate-700 tracking-wide">Attendance Records</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Current Month Dropdown */}
          <div className="relative min-w-[130px]">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Academic Year Dropdown */}
          <div className="relative min-w-[130px]">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {academicYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        {/* Overall Attendance */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overall Attendance</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{stats.overallPercentage}%</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Class presence average</p>
          </div>
        </div>

        {/* Classes Attended */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Classes Attended</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{stats.totalAttended}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Out of {stats.totalConducted} classes conducted</p>
          </div>
        </div>

        {/* Classes Missed */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-all">
            <XCircle className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Classes Missed</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{stats.totalMissed}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Absent periods log count</p>
          </div>
        </div>

        {/* Attendance Status */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-all">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</span>
            <h3 className="text-xl font-black text-slate-850 mt-1">{stats.status}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-0.5">Eligibility threshold</p>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-purple-ambient inner-highlight flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 flex-wrap">
          {/* Subject Filter */}
          <div className="relative min-w-[170px]">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Subjects</option>
              {subjects.slice(1).map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* Month Filter */}
          <div className="relative min-w-[130px]">
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Months</option>
              {months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters Action */}
        {(filterSubject !== 'All' || filterMonth !== 'All') && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Main Grid Content: Table + Right Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Side: Subject-wise Attendance Table */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-purple-ambient overflow-hidden select-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-5">Subject</th>
                    <th className="py-4 px-5">Faculty</th>
                    <th className="py-4 px-5 text-center">Classes Conducted</th>
                    <th className="py-4 px-5 text-center">Classes Attended</th>
                    <th className="py-4 px-5 text-center">Attendance %</th>
                    <th className="py-4 px-5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                  {filteredAttendance.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <AlertCircle className="w-10 h-10 text-slate-350" />
                          <h4 className="text-slate-800 font-bold">No attendance records available.</h4>
                          <p className="text-xs text-slate-450">Try selecting a different academic term or subject filter.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAttendance.map(item => {
                      const statusBadge = getStatusBadge(item.percentage);
                      const statusLabel = getStatusLabel(item.percentage);

                      return (
                        <tr key={item.id} className="hover:bg-slate-50/45 transition-colors">
                          <td className="py-4 px-5 font-bold text-slate-900">{item.subject}</td>
                          <td className="py-4 px-5 text-slate-500">{item.faculty}</td>
                          <td className="py-4 px-5 text-center font-bold text-slate-700">{item.conducted}</td>
                          <td className="py-4 px-5 text-center font-bold text-slate-700">{item.attended}</td>
                          <td className="py-4 px-5 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className="font-extrabold text-slate-850">{item.percentage}%</span>
                              <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden shrink-0 hidden sm:block">
                                <div 
                                  className={`h-full rounded-full ${
                                    item.percentage >= 90 ? 'bg-emerald-500' : item.percentage >= 75 ? 'bg-blue-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${item.percentage}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-5 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge}`}>
                              {statusLabel}
                            </span>
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

        {/* Right Panel: Analytics & History */}
        <div className="space-y-6">
          {/* Attendance Summary */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Attendance Summary
            </h3>

            <div className="space-y-3 font-semibold text-xs text-slate-600">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Highest Attendance</span>
                <span className="text-slate-850 font-bold truncate pl-2 max-w-[150px]" title={analytics.highest}>
                  {analytics.highest}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Lowest Attendance</span>
                <span className="text-slate-850 font-bold truncate pl-2 max-w-[150px]" title={analytics.lowest}>
                  {analytics.lowest}
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-1.5">
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Eligibility Status</span>
                {analytics.eligible ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold rounded-xl shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Eligible for Examinations</span>
                  </span>
                ) : (
                  <div className="space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-100 text-red-700 text-[10px] font-bold rounded-xl shadow-2xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Not Eligible (Attendance &lt;75%)</span>
                    </span>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                      Warning: Your overall attendance is below VSSUT's academic eligibility requirements. Contact your department HOD.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Attendance History */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-4.5 h-4.5 text-slate-500" />
              <span>Recent History</span>
            </h3>

            <div className="space-y-3.5">
              {filteredHistory.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No recent history logs available.</p>
              ) : (
                filteredHistory.map(log => {
                  const isPresent = log.status === 'Present';
                  return (
                    <div key={log.id} className="flex gap-2.5 items-start text-xs border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isPresent ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1.5">
                          <h4 className="font-bold text-slate-800 truncate" title={log.subject}>{log.subject}</h4>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold border ${
                            isPresent ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'
                          }`}>
                            {log.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{log.faculty}</p>
                        <span className="text-[10px] text-slate-400 font-bold mt-1 inline-block">{log.date}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
