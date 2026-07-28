import React from 'react';
import { Search, RotateCcw, Building2, GraduationCap, Calendar, BookOpen, CheckSquare, RefreshCw, X, Layers } from 'lucide-react';
import { DEPARTMENTS, COURSES, SEMESTERS, EXAM_TYPES, STATUSES, SUBJECTS_LIST, CLASSES_LIST } from '../data/resultsData';
import ExportActions from './ExportActions';

export default function ResultsFilters({
  searchTerm = '',
  onSearchChange,
  deptFilter = 'All',
  onDeptChange,
  courseFilter = 'All',
  onCourseChange,
  semesterFilter = 'All',
  onSemesterChange,
  classFilter = 'All',
  onClassChange,
  subjectFilter = 'All',
  onSubjectChange,
  examTypeFilter = 'All',
  onExamTypeChange,
  statusFilter = 'All',
  onStatusChange,
  onRefresh,
  onExport,
  onReset
}) {
  const activeFiltersCount =
    (searchTerm.trim() !== '' ? 1 : 0) +
    (deptFilter !== 'All' ? 1 : 0) +
    (courseFilter !== 'All' ? 1 : 0) +
    (semesterFilter !== 'All' ? 1 : 0) +
    (classFilter !== 'All' ? 1 : 0) +
    (subjectFilter !== 'All' ? 1 : 0) +
    (examTypeFilter !== 'All' ? 1 : 0) +
    (statusFilter !== 'All' ? 1 : 0);

  const selectBase = 'w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none appearance-none transition-all duration-200 font-semibold text-slate-700 cursor-pointer';

  return (
    <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight flex flex-col xl:flex-row xl:items-center justify-between gap-4 select-none">
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 flex-wrap">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-[290px]">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Student or Roll No..."
            className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none transition-all duration-200 font-medium text-slate-800 placeholder-slate-400"
          />
          {searchTerm && (
            <button type="button" onClick={() => onSearchChange('')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Department */}
        <div className="relative min-w-[120px] flex-1 sm:flex-initial">
          <select value={deptFilter} onChange={(e) => onDeptChange(e.target.value)} className={selectBase}>
            <option value="All">All Departments</option>
            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d} Dept</option>)}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400"><Building2 className="w-3.5 h-3.5" /></span>
        </div>

        {/* Course */}
        <div className="relative min-w-[110px] flex-1 sm:flex-initial">
          <select value={courseFilter} onChange={(e) => onCourseChange(e.target.value)} className={selectBase}>
            <option value="All">All Courses</option>
            {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400"><GraduationCap className="w-3.5 h-3.5" /></span>
        </div>

        {/* Semester */}
        <div className="relative min-w-[110px] flex-1 sm:flex-initial">
          <select value={semesterFilter} onChange={(e) => onSemesterChange(e.target.value)} className={selectBase}>
            <option value="All">All Semesters</option>
            {SEMESTERS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400"><Calendar className="w-3.5 h-3.5" /></span>
        </div>

        {/* Class */}
        <div className="relative min-w-[130px] flex-1 sm:flex-initial">
          <select value={classFilter} onChange={(e) => onClassChange(e.target.value)} className={selectBase}>
            <option value="All">All Classes</option>
            {CLASSES_LIST.map((cl) => <option key={cl} value={cl}>{cl}</option>)}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400"><Layers className="w-3.5 h-3.5" /></span>
        </div>

        {/* Subject */}
        <div className="relative min-w-[130px] flex-1 sm:flex-initial">
          <select value={subjectFilter} onChange={(e) => onSubjectChange(e.target.value)} className={selectBase}>
            <option value="All">All Subjects</option>
            {SUBJECTS_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400"><BookOpen className="w-3.5 h-3.5" /></span>
        </div>

        {/* Exam Type */}
        <div className="relative min-w-[110px] flex-1 sm:flex-initial">
          <select value={examTypeFilter} onChange={(e) => onExamTypeChange(e.target.value)} className={selectBase}>
            <option value="All">All Exams</option>
            {EXAM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400"><CheckSquare className="w-3.5 h-3.5" /></span>
        </div>

        {/* Status */}
        <div className="relative min-w-[110px] flex-1 sm:flex-initial">
          <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)} className={selectBase}>
            <option value="All">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400"><CheckSquare className="w-3.5 h-3.5" /></span>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 self-end xl:self-auto shrink-0">
        <button type="button" onClick={onRefresh} className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-all duration-200 shadow-2xs active:scale-95 cursor-pointer" title="Refresh results">
          <RefreshCw className="w-4 h-4" />
        </button>

        <ExportActions onExport={onExport} />

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
