import React from 'react';
import { Search, RotateCcw, Building2, GraduationCap, Calendar, CheckSquare, Users, Clock, ArrowUpDown, RefreshCw, Download, X } from 'lucide-react';
import { DEPARTMENTS, COURSES, SEMESTERS, DAYS, TEACHERS_LIST } from '../../data/scheduleData';
import './ScheduleToolbar.css';

export default function ScheduleToolbar({
  searchTerm = '',
  onSearchChange,
  deptFilter = 'All',
  onDeptChange,
  courseFilter = 'All',
  onCourseChange,
  semesterFilter = 'All',
  onSemesterChange,
  teacherFilter = 'All',
  onTeacherChange,
  dayFilter = 'All',
  onDayChange,
  statusFilter = 'All',
  onStatusChange,
  sortBy = 'id-asc',
  onSortByChange,
  onRefresh,
  onExport,
  onReset
}) {
  const activeFiltersCount =
    (searchTerm.trim() !== '' ? 1 : 0) +
    (deptFilter !== 'All' ? 1 : 0) +
    (courseFilter !== 'All' ? 1 : 0) +
    (semesterFilter !== 'All' ? 1 : 0) +
    (teacherFilter !== 'All' ? 1 : 0) +
    (dayFilter !== 'All' ? 1 : 0) +
    (statusFilter !== 'All' ? 1 : 0) +
    (sortBy !== 'id-asc' ? 1 : 0);

  return (
    <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight flex flex-col xl:flex-row xl:items-center justify-between gap-4 select-none">
      
      {/* Left Area: Search, Filters, and Sort selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 flex-wrap">
        
        {/* Search Input field */}
        <div className="relative flex-1 min-w-[200px] max-w-[280px]">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4.5 h-4.5" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by ID or Subject..."
            className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none transition-all duration-200 font-medium text-slate-800 placeholder-slate-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Department Filter dropdown */}
        <div className="relative min-w-[120px] flex-1 sm:flex-initial">
          <select
            value={deptFilter}
            onChange={(e) => onDeptChange(e.target.value)}
            className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none appearance-none transition-all duration-200 font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept} Dept
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <Building2 className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Course Filter dropdown */}
        <div className="relative min-w-[110px] flex-1 sm:flex-initial">
          <select
            value={courseFilter}
            onChange={(e) => onCourseChange(e.target.value)}
            className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none appearance-none transition-all duration-200 font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Courses</option>
            {COURSES.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <GraduationCap className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Semester Filter dropdown */}
        <div className="relative min-w-[110px] flex-1 sm:flex-initial">
          <select
            value={semesterFilter}
            onChange={(e) => onSemesterChange(e.target.value)}
            className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none appearance-none transition-all duration-200 font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Semesters</option>
            {SEMESTERS.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Teacher Filter dropdown */}
        <div className="relative min-w-[130px] flex-1 sm:flex-initial">
          <select
            value={teacherFilter}
            onChange={(e) => onTeacherChange(e.target.value)}
            className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none appearance-none transition-all duration-200 font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Teachers</option>
            {TEACHERS_LIST.map((teacher) => (
              <option key={teacher} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <Users className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Day Filter dropdown */}
        <div className="relative min-w-[100px] flex-1 sm:flex-initial">
          <select
            value={dayFilter}
            onChange={(e) => onDayChange(e.target.value)}
            className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none appearance-none transition-all duration-200 font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Days</option>
            {DAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <Clock className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Status Filter dropdown */}
        <div className="relative min-w-[110px] flex-1 sm:flex-initial">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none appearance-none transition-all duration-200 font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <CheckSquare className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Sorting Dropdown */}
        <div className="relative min-w-[150px] flex-1 sm:flex-initial">
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none appearance-none transition-all duration-200 font-semibold text-slate-700 cursor-pointer"
          >
            <option value="id-asc">Sort: Schedule ID (A-Z)</option>
            <option value="id-desc">Sort: Schedule ID (Z-A)</option>
            <option value="class-asc">Sort: Class Name (A-Z)</option>
            <option value="time-asc">Sort: Time Slot (Early-Late)</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>

      {/* Right Area: Actions */}
      <div className="flex items-center gap-2 self-end xl:self-auto shrink-0">
        
        {/* Refresh */}
        <button
          type="button"
          onClick={onRefresh}
          className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-all duration-200 shadow-2xs active:scale-95 cursor-pointer"
          title="Refresh schedule list"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Export */}
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-1.5 px-3 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all duration-200 shadow-2xs cursor-pointer"
          title="Export schedule report"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export</span>
        </button>

        {/* Reset */}
        <button
          type="button"
          onClick={onReset}
          disabled={activeFiltersCount === 0}
          className={`inline-flex items-center justify-center gap-2 px-3 py-2.5 border rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
            activeFiltersCount > 0
              ? 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 active:scale-95 shadow-2xs'
              : 'border-slate-100 bg-slate-50/50 text-slate-400 cursor-not-allowed'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
          
          {activeFiltersCount > 0 && (
            <span className="w-4.5 h-4.5 bg-blue-600 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center shrink-0 shadow-sm leading-none">
              {activeFiltersCount}
            </span>
          )}
        </button>

      </div>

    </div>
  );
}
