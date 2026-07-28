import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Users, 
  Award, 
  Clock, 
  Download, 
  Search, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  CheckCircle2, 
  Calendar,
  AlertCircle,
  Eye
} from 'lucide-react';
import { studentSyllabusData } from './data/syllabusData';
import './StudentSyllabus.css';

export default function StudentSyllabus() {
  const { academicYears, semesters, departments, subjects, syllabusList } = studentSyllabusData;

  // Header Dropdowns State
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [selectedDept, setSelectedDept] = useState(departments[0]);

  // Filters State
  const [filterSubject, setFilterSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Expand/Collapse Accordion state for Subject Cards
  const [expandedCards, setExpandedCards] = useState({
    'MCA-301': true // default first one expanded
  });

  // Modal Details State (UI Only)
  const [activeDetailsSubject, setActiveDetailsSubject] = useState(null);

  const toggleExpand = (code) => {
    setExpandedCards(prev => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  const handleResetFilters = () => {
    setFilterSubject('All');
    setSearchQuery('');
  };

  // Filter Logic
  const filteredSyllabus = useMemo(() => {
    return syllabusList.filter(item => {
      const matchesSubject = filterSubject === 'All' || item.name === filterSubject;
      const matchesSearch = searchQuery.trim() === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.code.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSubject && matchesSearch;
    });
  }, [syllabusList, filterSubject, searchQuery]);

  // Calculations for Summary Cards
  const summaryMetrics = useMemo(() => {
    const totalSubjects = filteredSyllabus.length;
    if (totalSubjects === 0) {
      return { totalSubjects: 0, completedUnits: 0, remainingUnits: 0, avgProgress: 0 };
    }

    let completedUnits = 0;
    let remainingUnits = 0;
    let sumProgress = 0;

    filteredSyllabus.forEach(item => {
      sumProgress += item.progress;
      item.units.forEach(u => {
        if (u.status === 'Completed') completedUnits++;
        else remainingUnits++;
      });
    });

    const avgProgress = Math.round(sumProgress / totalSubjects);

    return { totalSubjects, completedUnits, remainingUnits, avgProgress };
  }, [filteredSyllabus]);

  // Right Panel calculations
  const rightPanelData = useMemo(() => {
    let totalCredits = 0;
    let earnedCredits = 0;
    const completedList = [];

    syllabusList.forEach(item => {
      totalCredits += item.credits;
      if (item.progress === 100) {
        earnedCredits += item.credits;
        completedList.push(item);
      } else {
        // partial credit weight for progress estimation
        earnedCredits += Math.round(item.credits * (item.progress / 100));
      }
    });

    const remainingCredits = Math.max(0, totalCredits - Math.round(earnedCredits));

    return { totalCredits, earnedCredits: Math.round(earnedCredits), remainingCredits, completedList };
  }, [syllabusList]);

  // Action Mocks (UI Only Alert)
  const handleDownloadSyllabus = (subjectName) => {
    alert(`Starting download for ${subjectName} syllabus PDF...`);
  };

  // Helper: Unit status badges
  const getUnitStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-250';
      case 'In Progress':
        return 'bg-amber-50 text-amber-700 border-amber-250';
      case 'Pending':
        return 'bg-slate-50 text-slate-400 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-150';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Course Syllabus</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Student Portal &nbsp;•&nbsp; <span className="text-purple-655 font-bold">Curriculum Structure</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Department Selector */}
          <div className="relative min-w-[170px]">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <BookOpen className="w-3.5 h-3.5" />
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

          {/* Semester Dropdown */}
          <div className="relative min-w-[130px]">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
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
        {/* Total Subjects */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Subjects</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{summaryMetrics.totalSubjects} Subjects</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Syllabus papers mapped</p>
          </div>
        </div>

        {/* Completed Modules */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completed Units</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{summaryMetrics.completedUnits} Units</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Fully taught units count</p>
          </div>
        </div>

        {/* Remaining Modules */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
            <Clock className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Remaining Units</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{summaryMetrics.remainingUnits} Units</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Pending and active units</p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-purple-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-fuchsia-500/20 group-hover:scale-105 transition-all">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overall Progress</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{summaryMetrics.avgProgress}%</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Curriculum progress average</p>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-purple-ambient inner-highlight flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 flex-wrap">
          {/* Semester Selector Filter */}
          <div className="relative min-w-[130px]">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

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

      {/* Main Grid Content: expandable cards + Right Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Side: Expandable Subject Cards list */}
        <div className="lg:col-span-3 space-y-4">
          {filteredSyllabus.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none text-center max-w-xl mx-auto space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-500 border border-purple-100 flex items-center justify-center shadow-xs">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">No syllabus available</h3>
                <p className="text-sm text-slate-500 font-medium max-w-sm leading-relaxed">
                  No syllabus available.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Search</span>
              </button>
            </div>
          ) : (
            filteredSyllabus.map(subject => {
              const isExpanded = expandedCards[subject.code];
              return (
                <div
                  key={subject.code}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-purple-ambient overflow-hidden select-none"
                >
                  {/* Accordion header card */}
                  <div 
                    onClick={() => toggleExpand(subject.code)}
                    className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors border-b border-slate-100"
                  >
                    <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 border border-slate-200 rounded font-bold font-mono">
                            {subject.code}
                          </span>
                          <span className="text-[10px] bg-purple-50 text-purple-750 px-2 py-0.5 border border-purple-150 rounded font-bold">
                            {subject.credits} Credits
                          </span>
                        </div>
                        <h4 className="text-sm font-extrabold text-slate-850 tracking-tight pt-1 leading-snug">
                          {subject.name}
                        </h4>
                      </div>

                      {/* Progress summary inside header */}
                      <div className="flex items-center gap-3 shrink-0 pr-2">
                        <div className="text-right">
                          <span className="text-xs font-black text-slate-800">{subject.progress}%</span>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Progress</p>
                        </div>
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden shrink-0">
                          <div 
                            className="bg-purple-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${subject.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-850">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Accordion expanded content */}
                  {isExpanded && (
                    <div className="p-5 bg-slate-50/40 border-t border-slate-50 space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3 select-text">
                        <span className="text-xs font-semibold text-slate-500">
                          Course Instructor: <strong className="text-slate-700">{subject.faculty}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDownloadSyllabus(subject.name)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-purple-300 hover:text-purple-700 text-slate-750 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Syllabus</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveDetailsSubject(subject)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Details</span>
                          </button>
                        </div>
                      </div>

                      {/* Units breakdown */}
                      <div className="space-y-3">
                        {subject.units.map(unit => (
                          <div 
                            key={unit.num}
                            className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:border-purple-200 transition-colors flex flex-col md:flex-row justify-between gap-4"
                          >
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-black text-slate-450 uppercase tracking-widest">Unit {unit.num}</span>
                              <h5 className="text-xs font-bold text-slate-800 mt-0.5">{unit.title}</h5>
                              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-1 select-text">
                                {unit.topics}
                              </p>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-450">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{unit.hours} Hours</span>
                              </div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-extrabold border ${getUnitStatusBadge(unit.status)}`}>
                                {unit.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Right Side Panel */}
        <div className="space-y-6 select-none">
          {/* Overall Academic Progress */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Overall Academic Progress
            </h3>

            <div className="space-y-3">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-600 h-full rounded-full transition-all duration-300" 
                  style={{ width: `${summaryMetrics.avgProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span>Modules Complete</span>
                <span>{summaryMetrics.avgProgress}%</span>
              </div>
            </div>
          </div>

          {/* Credit Summary */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Credit Summary
            </h3>

            <div className="space-y-3 text-xs font-semibold text-slate-600">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Total Semester Credits</span>
                <span className="text-slate-850 font-black">{rightPanelData.totalCredits}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Completed Weights</span>
                <span className="text-purple-700 font-black">{rightPanelData.earnedCredits}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span>Remaining Weights</span>
                <span className="text-slate-500 font-bold">{rightPanelData.remainingCredits}</span>
              </div>
            </div>
          </div>

          {/* Completed Subjects list */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Completed Subjects
            </h3>

            <div className="space-y-3">
              {rightPanelData.completedList.length === 0 ? (
                <p className="text-xs text-slate-400">No subjects fully completed yet.</p>
              ) : (
                rightPanelData.completedList.map(item => (
                  <div key={item.code} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-850 truncate">{item.name}</h4>
                      <span className="text-[9px] font-black text-slate-400 font-mono">{item.code}</span>
                    </div>
                    <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-bold">
                      100%
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* View Details Drawer/Modal Renders (UI Only Mock) */}
      {activeDetailsSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fadeInUp">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <span className="text-[10px] font-bold font-mono text-purple-700 bg-purple-50 px-2.5 py-1 border border-purple-150 rounded">
                  {activeDetailsSubject.code}
                </span>
                <h3 className="text-base font-black text-slate-850 mt-2">{activeDetailsSubject.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDetailsSubject(null)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[400px] space-y-4 select-text text-sm">
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-500 pb-3 border-b border-slate-100">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Assigned Faculty</p>
                  <p className="text-slate-800 font-extrabold mt-0.5">{activeDetailsSubject.faculty}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Course Weight</p>
                  <p className="text-slate-800 font-extrabold mt-0.5">{activeDetailsSubject.credits} Credits</p>
                </div>
              </div>

              <div>
                <h5 className="font-extrabold text-slate-800 mb-2">Subject Syllabus Overview</h5>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This curriculum is designed to teach foundational and advanced concepts in {activeDetailsSubject.name} at VSSUT. 
                  Students will learn theoretical design patterns, solve practical lab modules, and develop real-world understanding of core domain principles. 
                  Continuous evaluation consists of internal assessment examinations (30%) and a final written theory examination (70%).
                </p>
              </div>

              <div className="pt-2">
                <h5 className="font-extrabold text-slate-800 mb-3">Unit Progression Details</h5>
                <div className="space-y-2">
                  {activeDetailsSubject.units.map(u => (
                    <div key={u.num} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-750">Unit {u.num}: {u.title}</span>
                      <span className="font-semibold text-slate-450">{u.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveDetailsSubject(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadSyllabus(activeDetailsSubject.name);
                  setActiveDetailsSubject(null);
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-2xs"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
