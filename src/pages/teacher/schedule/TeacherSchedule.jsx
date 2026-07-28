import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Search, 
  RotateCcw, 
  Download, 
  BookOpen, 
  Cpu, 
  Network, 
  Building2, 
  GraduationCap, 
  AlertCircle,
  CheckCircle2,
  PlayCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { teacherScheduleData } from './data/scheduleData';
import './TeacherSchedule.css';

export default function TeacherSchedule() {
  const { schedules, teacher, academicYears, semesters, currentWeek, teachingLoadSummary, recentUpdates } = teacherScheduleData;

  // Local state for header dropdowns
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);

  // Local filter states
  const [selectedDay, setSelectedDay] = useState('All');
  const [selectedWeek, setSelectedWeek] = useState('Current Week');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [classroomSearch, setClassroomSearch] = useState('');

  // Extract unique subjects for the filter dropdown
  const uniqueSubjects = useMemo(() => {
    const list = schedules.map(s => s.subjectName);
    return ['All', ...new Set(list)];
  }, [schedules]);

  // Filtered schedules logic
  const filteredSchedules = useMemo(() => {
    return schedules.filter(s => {
      const matchesDay = selectedDay === 'All' || s.day.toLowerCase() === selectedDay.toLowerCase();
      const matchesSubject = selectedSubject === 'All' || s.subjectName === selectedSubject;
      const matchesClassroom = classroomSearch.trim() === '' || 
        s.classroom.toLowerCase().includes(classroomSearch.toLowerCase());
      
      return matchesDay && matchesSubject && matchesClassroom;
    });
  }, [schedules, selectedDay, selectedSubject, classroomSearch]);

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedDay('All');
    setSelectedSubject('All');
    setClassroomSearch('');
  };

  const handleExport = () => {
    alert('Exporting schedule report for ' + teacher.name + ' to Excel...');
  };

  // Determine current day for highlighting
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysOfWeek[new Date().getDay()];

  // Calculate dynamic stats
  const stats = useMemo(() => {
    const todaysClasses = schedules.filter(s => s.day.toLowerCase() === todayName.toLowerCase());
    const ongoingCount = todaysClasses.filter(s => s.status === 'Ongoing').length;
    const upcomingCount = todaysClasses.filter(s => s.status === 'Upcoming').length;
    const completedCount = todaysClasses.filter(s => s.status === 'Completed').length;
    
    // Find next upcoming class overall or today
    const nextClass = schedules.find(s => s.status === 'Upcoming' && s.day.toLowerCase() === todayName.toLowerCase()) || 
                      schedules.find(s => s.status === 'Upcoming');

    // Free periods: assuming a standard 6-slot day, free periods = 6 - class count
    const freePeriodsCount = Math.max(0, 6 - todaysClasses.length);

    return {
      todayCount: todaysClasses.length,
      todaySubtitle: `${completedCount} completed, ${upcomingCount} upcoming`,
      weeklyCount: schedules.length,
      weeklySubtitle: 'Total assigned periods',
      upcomingClass: nextClass ? `${nextClass.startTime} - ${nextClass.subjectName}` : 'None scheduled',
      upcomingSubtitle: nextClass ? `${nextClass.classroom} • ${nextClass.section}` : 'All caught up!',
      freePeriods: `${freePeriodsCount} Periods`,
      freePeriodsSubtitle: 'Available today'
    };
  }, [schedules, todayName]);

  // List of upcoming classes for the right panel
  const upcomingClassesList = useMemo(() => {
    return schedules.filter(s => s.status === 'Upcoming').slice(0, 3);
  }, [schedules]);

  // Helper to render class icons
  const getSubjectIcon = (subject) => {
    if (subject.toLowerCase().includes('network')) return <Network className="w-5 h-5" />;
    if (subject.toLowerCase().includes('operating') || subject.toLowerCase().includes('lab')) return <Cpu className="w-5 h-5" />;
    return <BookOpen className="w-5 h-5" />;
  };

  // Helper to render status badges
  const renderStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case 'ongoing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 animate-pulse">
            <PlayCircle className="w-3.5 h-3.5" />
            Ongoing
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100">
            <Clock className="w-3.5 h-3.5" />
            Upcoming
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Teacher Schedule</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Faculty Portal &nbsp;•&nbsp; <span className="text-blue-600">Schedule</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Academic Year Dropdown */}
          <div className="relative min-w-[140px]">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {academicYears.map(year => (
                <option key={year} value={year}>{year} Year</option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <Building2 className="w-3.5 h-3.5" />
            </span>
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
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <GraduationCap className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Current Week info */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span>{currentWeek}</span>
          </div>

          {/* Export Button */}
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Schedule</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        {/* Today's Classes */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-blue hover:border-blue-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Today's Classes</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{stats.todayCount}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">{stats.todaySubtitle}</p>
          </div>
        </div>

        {/* Weekly Classes */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-emerald hover:border-emerald-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Weekly Classes</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{stats.weeklyCount}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">{stats.weeklySubtitle}</p>
          </div>
        </div>

        {/* Upcoming Class */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-amber hover:border-amber-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
            <Clock className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Upcoming Class</span>
            <h3 className="text-sm font-black text-slate-900 tracking-tight truncate mt-1">{stats.upcomingClass}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">{stats.upcomingSubtitle}</p>
          </div>
        </div>

        {/* Free Periods */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-indigo hover:border-indigo-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Free Periods</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{stats.freePeriods}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">{stats.freePeriodsSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight flex flex-col xl:flex-row xl:items-center justify-between gap-4 select-none">
        {/* Left Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 flex-wrap">
          {/* Day Selector Buttons */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1 overflow-x-auto">
            {['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all duration-200 shrink-0 ${
                  selectedDay === day 
                    ? 'bg-white text-blue-600 shadow-xs border border-slate-200/40' 
                    : 'text-slate-550 hover:text-slate-800'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Week Selector Dropdown */}
          <div className="relative min-w-[120px]">
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="Current Week">Current Week</option>
              <option value="Next Week">Next Week</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Subject Dropdown */}
          <div className="relative min-w-[180px]">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Subjects</option>
              {uniqueSubjects.filter(sub => sub !== 'All').map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <BookOpen className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Search Classroom */}
          <div className="relative flex-1 min-w-[180px] max-w-[240px]">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={classroomSearch}
              onChange={(e) => setClassroomSearch(e.target.value)}
              placeholder="Search Classroom..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Right Action: Reset Filters */}
        <div className="flex items-center gap-2">
          {(selectedDay !== 'All' || selectedSubject !== 'All' || classroomSearch !== '') && (
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
      </div>

      {/* Main Grid: Schedules + Right Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Side: Schedule Cards list */}
        <div className="lg:col-span-3 space-y-4">
          {filteredSchedules.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200/80 shadow-ambient select-none text-center max-w-xl mx-auto space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center shadow-xs">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">No classes scheduled</h3>
                <p className="text-sm text-slate-500 font-medium max-w-sm leading-relaxed">
                  No classes matching the selected filters were found for your teaching schedule.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSchedules.map((item) => {
                const isToday = item.day.toLowerCase() === todayName.toLowerCase();
                return (
                  <div
                    key={item.id}
                    className={`relative bg-white p-5 rounded-2xl border transition-all duration-300 ease-out select-none overflow-hidden space-y-4 shadow-ambient hover:-translate-y-[2px] hover:shadow-ambient-hover ${
                      isToday 
                        ? 'border-blue-300 ring-2 ring-blue-500/5 bg-blue-50/5' 
                        : 'border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    {isToday && (
                      <span className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[9px] font-extrabold uppercase bg-blue-600 text-white tracking-widest">
                        TODAY
                      </span>
                    )}

                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        isToday ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {getSubjectIcon(item.subjectName)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="px-2 py-0.5 text-[9px] rounded bg-slate-150 text-slate-600 border border-slate-200 font-mono font-bold leading-none inline-block">
                          {item.subjectCode}
                        </span>
                        <h4 className="text-sm font-bold text-slate-800 tracking-tight pt-1 leading-snug truncate">
                          {item.subjectName}
                        </h4>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">
                          {item.department} &nbsp;•&nbsp; {item.semester} &nbsp;•&nbsp; {item.section}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 pt-1 text-xs">
                      {/* Time slot */}
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <p className="font-bold">{item.startTime}</p>
                          <p className="text-[10px] text-slate-400 font-semibold">Duration: {item.duration}</p>
                        </div>
                      </div>

                      {/* Classroom */}
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <p className="font-bold">{item.classroom}</p>
                          <p className="text-[10px] text-slate-400 font-semibold">Assigned Room</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-3.5 mt-1">
                      <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span>{item.studentCount} Students</span>
                      </div>
                      {renderStatusBadge(item.status)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side Panel */}
        <div className="space-y-6">
          {/* Teaching Load Summary */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Teaching Load
            </h3>
            
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Total Hours / Week</span>
                <span className="text-slate-800 font-bold">{teachingLoadSummary.totalHours} Hrs</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '80%' }}></div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <p className="text-xs text-slate-400 font-semibold">Theory Load</p>
                  <p className="text-lg font-black text-slate-800 mt-1">{teachingLoadSummary.theoryHours} Hrs</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <p className="text-xs text-slate-400 font-semibold">Practical Load</p>
                  <p className="text-lg font-black text-slate-800 mt-1">{teachingLoadSummary.labHours} Hrs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Upcoming Classes
            </h3>

            <div className="space-y-3">
              {upcomingClassesList.map(item => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-150">
                  <div className="bg-amber-50 text-amber-600 p-2 rounded-lg border border-amber-100 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{item.subjectName}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                      {item.day} • {item.startTime}
                    </p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                      {item.classroom} &nbsp;•&nbsp; {item.section}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Schedule Updates */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Recent Updates
              </h3>
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
            </div>

            <div className="space-y-3.5">
              {recentUpdates.map(update => (
                <div key={update.id} className="flex gap-2.5 items-start text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-slate-650 font-semibold leading-relaxed">{update.message}</p>
                    <span className="text-[10px] text-slate-400 font-bold mt-1 inline-block">{update.time}</span>
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
