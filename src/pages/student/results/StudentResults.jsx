import React, { useState, useMemo } from 'react';
import { 
  Award, 
  BookOpen, 
  RotateCcw, 
  Search, 
  TrendingUp, 
  Users, 
  Percent, 
  AlertCircle, 
  Calendar,
  History,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { studentResultsData } from './data/resultsData';
import './StudentResults.css';

export default function StudentResults() {
  const { academicYears, semesters, exams, subjects, resultsRoster, history } = studentResultsData;

  // Header Dropdowns State
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [selectedExam, setSelectedExam] = useState(exams[1]); // default End-Sem

  // Filters State
  const [filterSubject, setFilterSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Reset Filters
  const handleResetFilters = () => {
    setFilterSubject('All');
    setSearchQuery('');
  };

  // Filter Logic
  const filteredResults = useMemo(() => {
    return resultsRoster.filter(item => {
      const matchesSubject = filterSubject === 'All' || item.subject === filterSubject;
      const matchesSearch = searchQuery.trim() === '' || 
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.code.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSubject && matchesSearch;
    });
  }, [resultsRoster, filterSubject, searchQuery]);

  // Calculate Metrics based on filtered result rows
  const stats = useMemo(() => {
    const totalCount = filteredResults.length;
    if (totalCount === 0) {
      return { sgpa: 'N/A', cgpa: 'N/A', passedCount: '0/0', avgPercentage: 0 };
    }

    let totalMarks = 0;
    let passed = 0;

    filteredResults.forEach(item => {
      totalMarks += item.total;
      if (item.status === 'Pass') passed++;
    });

    const avgPercentage = totalCount > 0 ? Math.round(totalMarks / totalCount) : 0;
    const passedCount = `${passed} / ${totalCount}`;

    return { sgpa: '8.80', cgpa: '8.65', passedCount, avgPercentage };
  }, [filteredResults]);

  // Right Side Analytics calculations
  const analytics = useMemo(() => {
    if (filteredResults.length === 0) {
      return { highest: 0, lowest: 0, bestSubject: 'N/A', weakestSubject: 'N/A', rank: 'N/A' };
    }

    let highest = 0;
    let lowest = 100;
    let bestSubject = '';
    let weakestSubject = '';

    filteredResults.forEach(item => {
      if (item.total > highest) {
        highest = item.total;
        bestSubject = item.subject;
      }
      if (item.total < lowest) {
        lowest = item.total;
        weakestSubject = item.subject;
      }
    });

    return { highest, lowest, bestSubject, weakestSubject, rank: '7th (in Department)' };
  }, [filteredResults]);

  // Helper: Status badge color mapping
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pass':
        return 'bg-emerald-50 text-emerald-700 border-emerald-250';
      case 'Fail':
        return 'bg-red-50 text-red-700 border-red-250';
      case 'Improvement':
        return 'bg-amber-50 text-amber-700 border-amber-250';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-150';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters Toolbar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-655 animate-pulse shadow-sm shadow-purple-400" />
          <span className="text-xs font-bold text-slate-700 tracking-wide">Academic Performance</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Subject Dropdown */}
          <div className="relative min-w-[150px]">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap pr-6"
            >
              <option value="All">All Subjects</option>
              {subjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <BookOpen className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Exam Dropdown */}
          <div className="relative min-w-[120px]">
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {exams.map(ex => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <Award className="w-3.5 h-3.5" />
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
        {/* Current SGPA */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current SGPA</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{stats.sgpa}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Semester performance scale</p>
          </div>
        </div>

        {/* Overall CGPA */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overall CGPA</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{stats.cgpa}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Cumulative score scale</p>
          </div>
        </div>

        {/* Subjects Passed */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Subjects Passed</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{stats.passedCount}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Subjects cleared this semester</p>
          </div>
        </div>

        {/* Overall Percentage */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-purple-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-fuchsia-500/20 group-hover:scale-105 transition-all">
            <Percent className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overall Percentage</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{stats.avgPercentage}%</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Average marks percentage</p>
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

          {/* Search Subject Input */}
          <div className="relative flex-1 min-w-[180px] max-w-[245px]">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Subject / Code..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Clear Filters Action */}
        {(filterSubject !== 'All' || searchQuery !== '') && (
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
        {/* Left Side: Results Table */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-purple-ambient overflow-hidden select-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-5">Subject Code</th>
                    <th className="py-4 px-5">Subject Name</th>
                    <th className="py-4 px-5 text-center">Internal (30)</th>
                    <th className="py-4 px-5 text-center">Practical (70)</th>
                    <th className="py-4 px-5 text-center">Theory (70)</th>
                    <th className="py-4 px-5 text-center">Total Marks</th>
                    <th className="py-4 px-5 text-center">Grade</th>
                    <th className="py-4 px-5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                  {filteredResults.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <AlertCircle className="w-10 h-10 text-slate-350" />
                          <h4 className="text-slate-800 font-bold">No result records available.</h4>
                          <p className="text-xs text-slate-450">Try selecting a different academic term or subject search.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredResults.map(item => {
                      const statusBadge = getStatusBadge(item.status);
                      const isPass = item.status === 'Pass';

                      return (
                        <tr key={item.code} className="hover:bg-slate-50/45 transition-colors">
                          <td className="py-4 px-5 font-bold font-mono text-slate-900">{item.code}</td>
                          <td className="py-4 px-5 font-bold text-slate-850">{item.subject}</td>
                          <td className="py-4 px-5 text-center font-semibold text-slate-650">{item.internal}</td>
                          <td className="py-4 px-5 text-center font-semibold text-slate-650">{item.practical || '--'}</td>
                          <td className="py-4 px-5 text-center font-semibold text-slate-650">{item.theory}</td>
                          <td className="py-4 px-5 text-center font-extrabold text-slate-800">{item.total} / 100</td>
                          <td className={`py-4 px-5 text-center font-black ${isPass ? 'text-purple-700' : 'text-red-600'}`}>{item.grade}</td>
                          <td className="py-4 px-5 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge}`}>
                              {item.status}
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

        {/* Right Side Panel: Summary & History */}
        <div className="space-y-6">
          {/* Academic Summary */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Academic Summary
            </h3>

            <div className="space-y-3 font-semibold text-xs text-slate-600">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Highest Marks</span>
                <span className="text-slate-850 font-black text-sm">{analytics.highest} / 100</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Lowest Marks</span>
                <span className="text-slate-850 font-black text-sm">{analytics.lowest} / 100</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Best Subject</span>
                <span className="text-slate-850 font-bold truncate pl-2 max-w-[150px]" title={analytics.bestSubject}>
                  {analytics.bestSubject}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Weakest Subject</span>
                <span className="text-slate-850 font-bold truncate pl-2 max-w-[150px]" title={analytics.weakestSubject}>
                  {analytics.weakestSubject}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span>Overall Rank</span>
                <span className="text-purple-700 font-bold">{analytics.rank}</span>
              </div>
            </div>
          </div>

          {/* Result History */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-4.5 h-4.5 text-slate-555" />
              <span>Result History</span>
            </h3>

            <div className="space-y-3.5">
              {history.map(log => (
                <div key={log.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-150 flex flex-col gap-2 hover:border-purple-300 transition-colors">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span>{log.semester}</span>
                    <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-0.5 rounded-lg">
                      {log.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-center font-bold text-[10px] text-slate-500 pt-1 border-t border-slate-200/40">
                    <div>
                      <p className="text-slate-400">SGPA</p>
                      <p className="font-extrabold text-slate-800 mt-0.5">{log.sgpa}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">CGPA</p>
                      <p className="font-extrabold text-slate-800 mt-0.5">{log.cgpa}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Percent</p>
                      <p className="font-extrabold text-slate-800 mt-0.5">{log.percentage}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
