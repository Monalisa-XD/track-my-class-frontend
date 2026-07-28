import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  BookOpen, 
  Search, 
  RotateCcw, 
  TrendingUp, 
  Users, 
  HelpCircle, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { studentScheduleData } from './data/scheduleData';
import './StudentSchedule.css';

export default function StudentSchedule() {
  const { academicYears, semesters, weeks, days, subjects, scheduleList } = studentScheduleData;

  // Header Dropdowns State
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [selectedWeek, setSelectedWeek] = useState(weeks[0]);

  // Filters State
  const [activeDay, setActiveDay] = useState('Monday');
  const [filterSubject, setFilterSubject] = useState('All');
  const [searchClassroom, setSearchClassroom] = useState('');

  // Reset Filters
  const handleResetFilters = () => {
    setActiveDay('Monday');
    setFilterSubject('All');
    setSearchClassroom('');
  };

  // Filter Logic
  const filteredSchedule = useMemo(() => {
    return scheduleList.filter(item => {
      const matchesDay = item.day === activeDay;
      const matchesSubject = filterSubject === 'All' || item.subjectName === filterSubject;
      const matchesClassroom = searchClassroom.trim() === '' || 
        item.room.toLowerCase().includes(searchClassroom.toLowerCase());

      return matchesDay && matchesSubject && matchesClassroom;
    });
  }, [scheduleList, activeDay, filterSubject, searchClassroom]);

  // Calculate Metrics based on all scheduled classes
  const metrics = useMemo(() => {
    const weeklyCount = scheduleList.length;
    // Today's classes count (mocked based on activeDay selection)
    const todayCount = scheduleList.filter(s => s.day === activeDay).length;
    
    // Find next upcoming class (first upcoming class on selected day or Monday as default)
    const upcomingClassObj = scheduleList.find(s => s.status === 'Upcoming' && s.day === activeDay) || 
      scheduleList.find(s => s.status === 'Upcoming');
    const upcomingClass = upcomingClassObj ? `${upcomingClassObj.subjectName} (${upcomingClassObj.time})` : 'None Scheduled';

    // Mock Free Periods (total daily slots (4) - today's classes count)
    const freePeriods = Math.max(0, 4 - todayCount);

    return { todayCount, weeklyCount, upcomingClass, freePeriods };
  }, [scheduleList, activeDay]);

  // Upcoming classes helper list
  const upcomingClassesList = useMemo(() => {
    return scheduleList.filter(s => s.status === 'Upcoming').slice(0, 2);
  }, [scheduleList]);

  // Today's schedule summary helper
  const todayClassesList = useMemo(() => {
    return scheduleList.filter(s => s.day === activeDay);
  }, [scheduleList, activeDay]);

  // Helper: Status badge colors
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Upcoming':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Completed':
        return 'bg-slate-100 text-slate-500 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-150';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">My Schedule</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Student Portal &nbsp;•&nbsp; <span className="text-purple-650 font-bold">Class Timetable</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Week Dropdown */}
          <div className="relative min-w-[140px]">
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {weeks.map(wk => (
                <option key={wk} value={wk}>{wk}</option>
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

          {/* Semester Dropdown */}
          <div className="relative min-w-[145px]">
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
        {/* Today's Classes */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all">
            <Clock className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Today's Classes</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.todayCount}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Periods scheduled today</p>
          </div>
        </div>

        {/* Weekly Classes */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Weekly Classes</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.weeklyCount}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Total periods per week</p>
          </div>
        </div>

        {/* Upcoming Class */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80 col-span-1 sm:col-span-2 lg:col-span-1">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-all">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Upcoming Class</span>
            <h3 className="text-sm font-black text-slate-850 mt-1 truncate" title={metrics.upcomingClass}>{metrics.upcomingClass}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Next session period</p>
          </div>
        </div>

        {/* Free Periods */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-purple-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-fuchsia-500/20 group-hover:scale-105 transition-all">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Free Periods</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.freePeriods}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Unscheduled slots today</p>
          </div>
        </div>
      </div>

      {/* Day Selector Buttons & Filters Toolbar */}
      <div className="space-y-4">
        {/* Day Selector Buttons */}
        <div className="flex flex-wrap gap-2 select-none border-b border-slate-200 pb-3">
          {days.map(day => {
            const isSelected = activeDay === day;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                type="button"
                className={`px-4.5 py-2.5 rounded-xl font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer border ${
                  isSelected 
                    ? 'bg-purple-600 border-purple-600 text-white shadow-purple-500/20' 
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-650 hover:text-slate-800'
                }`}
              >
                {day}
              </button>
            );
          })}
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

            {/* Search Classroom Code */}
            <div className="relative flex-1 min-w-[180px] max-w-[245px]">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchClassroom}
                onChange={(e) => setSearchClassroom(e.target.value)}
                placeholder="Search Classroom (e.g. Room D302)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Reset Action */}
          {(filterSubject !== 'All' || searchClassroom !== '') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content: Timetable list + Right Side widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Timetable schedule card list */}
        <div className="lg:col-span-3 space-y-4">
          {filteredSchedule.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none text-center max-w-xl mx-auto space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-500 border border-purple-100 flex items-center justify-center shadow-xs">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">No classes scheduled</h3>
                <p className="text-sm text-slate-500 font-medium max-w-sm leading-relaxed">
                  No classes scheduled.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Day</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSchedule.map(item => {
                const isOngoing = item.status === 'Ongoing';
                return (
                  <div
                    key={item.id}
                    className={`relative bg-white p-5 rounded-2xl border transition-all duration-300 ease-out select-none space-y-4 shadow-purple-ambient hover:-translate-y-[2px] hover:shadow-purple-ambient hover:border-purple-300/80 ${
                      isOngoing ? 'ring-2 ring-purple-600/25 border-purple-400' : 'border-slate-200/80'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="inline-flex items-center px-2 py-0.5 text-[9px] rounded font-bold border bg-purple-50 text-purple-700 border-purple-200 uppercase tracking-wide">
                          {item.section}
                        </span>
                        <h4 className="text-sm font-bold text-slate-850 tracking-tight pt-1 leading-snug truncate">
                          {item.subjectName}
                        </h4>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold border ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Details Info List */}
                    <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-500 pt-1.5 border-t border-slate-100 select-none">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <User className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">{item.instructor}</span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0 justify-end text-right">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate font-bold text-slate-700">{item.room}</span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="font-mono text-[11px]">{item.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0 justify-end text-right">
                        <span className="text-[10px] bg-slate-50 px-2 py-0.5 border border-slate-150 rounded text-slate-650 font-bold shrink-0">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right side panel widgets */}
        <div className="space-y-6">
          {/* Today's schedule summary */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Today's Schedule
            </h3>

            <div className="space-y-3.5">
              {todayClassesList.map(item => (
                <div key={item.id} className="flex gap-2.5 items-start text-xs border-b border-slate-50 pb-3.5 last:border-0 last:pb-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-800 truncate">{item.subjectName}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                      {item.time} &nbsp;•&nbsp; {item.room}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4.5 h-4.5 text-purple-650" />
              <span>Upcoming Classes</span>
            </h3>

            <div className="space-y-3">
              {upcomingClassesList.map(item => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-150 flex flex-col gap-1 hover:border-purple-300 transition-colors">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{item.subjectName}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{item.time}</p>
                  <p className="text-[10px] text-slate-400 font-semibold">{item.room} &nbsp;•&nbsp; {item.day}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4.5 h-4.5 text-purple-650" />
              <span>Weekly Class Progress</span>
            </h3>

            <div className="space-y-3">
              {/* Calculate completed vs total */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-600 h-full rounded-full transition-all duration-300" 
                  style={{ width: '40%' }} // 2 completed out of 5 Monday classes + weekly weight
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span>3 of 11 Completed</span>
                <span>27% Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
