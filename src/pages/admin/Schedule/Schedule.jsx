import React, { useState, useEffect } from 'react';
import { Eye, Edit2, Trash2, Calendar, MapPin, Clock } from 'lucide-react';
import ScheduleStats from './components/ScheduleStats';
import ScheduleToolbar from './components/ScheduleToolbar';
import ScheduleTable from './components/ScheduleTable';
import ScheduleDetailsDrawer from './components/ScheduleDetailsDrawer';
import AddScheduleModal from './components/AddScheduleModal';
import EditScheduleModal from './components/EditScheduleModal';
import DeleteScheduleModal from './components/DeleteScheduleModal';
import EmptyState from './components/EmptyState';
import { initialSchedules } from './data/scheduleData';
import './Schedule.css';

const getInitials = (name) => {
  if (!name) return '';
  const cleanedName = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, '');
  const parts = cleanedName.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const renderTeacherAvatar = (name) => {
  const initials = getInitials(name);
  return (
    <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-extrabold text-[9px] font-mono shadow-xs border border-blue-200/20 shrink-0">
      {initials}
    </div>
  );
};

export default function Schedule() {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [teacherFilter, setTeacherFilter] = useState('All');
  const [dayFilter, setDayFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('id-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, deptFilter, courseFilter, semesterFilter, teacherFilter, dayFilter, statusFilter, sortBy]);

  const handleAddClick = () => {
    setSelectedSchedule(null);
    setIsAddModalOpen(true);
  };

  useEffect(() => {
    const handleHeaderAction = (e) => {
      if (e.detail === 'CREATE_SCHEDULE') {
        handleAddClick();
      }
    };
    window.addEventListener('header-action', handleHeaderAction);
    return () => {
      window.removeEventListener('header-action', handleHeaderAction);
    };
  }, [schedules]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setDeptFilter('All');
    setCourseFilter('All');
    setSemesterFilter('All');
    setTeacherFilter('All');
    setDayFilter('All');
    setStatusFilter('All');
    setSortBy('id-asc');
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    handleResetFilters();
    alert('Academic class schedule timetable refreshed.');
  };

  const handleExport = () => {
    alert('Exporting schedule configuration table reports to Excel (.xlsx)...');
  };

  const handleViewClick = (item) => {
    setSelectedSchedule(item);
    setIsDrawerOpen(true);
  };

  const handleEditClick = (item) => {
    setSelectedSchedule(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setSelectedSchedule(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = (item) => {
    setSchedules(schedules.filter((s) => s.id !== item.id));
    setIsDeleteModalOpen(false);
    setSelectedSchedule(null);
  };

  const handleSave = (savedItem) => {
    if (isEditModalOpen) {
      setSchedules(schedules.map((s) => (s.id === savedItem.id ? savedItem : s)));
      setIsEditModalOpen(false);
    } else {
      if (schedules.some((s) => s.id === savedItem.id)) {
        alert(`Schedule entry with ID "${savedItem.id}" already exists.`);
        return;
      }
      setSchedules([...schedules, savedItem]);
      setIsAddModalOpen(false);
    }
    setSelectedSchedule(null);
  };

  // Filter Logic
  const filteredSchedules = schedules.filter((s) => {
    const matchesSearch =
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.classroom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.teacher.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = deptFilter === 'All' || s.department === deptFilter;
    const matchesCourse = courseFilter === 'All' || s.course === courseFilter;
    const matchesSemester = semesterFilter === 'All' || s.semester === semesterFilter;
    const matchesTeacher = teacherFilter === 'All' || s.teacher === teacherFilter;
    const matchesDay = dayFilter === 'All' || s.day === dayFilter;
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;

    return matchesSearch && matchesDept && matchesCourse && matchesSemester && matchesTeacher && matchesDay && matchesStatus;
  });

  // Sort Logic
  const sortedSchedules = [...filteredSchedules].sort((a, b) => {
    switch (sortBy) {
      case 'id-asc':
        return a.id.localeCompare(b.id);
      case 'id-desc':
        return b.id.localeCompare(a.id);
      case 'class-asc':
        return a.className.localeCompare(b.className);
      case 'time-asc':
        return a.timeSlot.localeCompare(b.timeSlot);
      default:
        return 0;
    }
  });

  // Pagination Logic
  const totalEntries = sortedSchedules.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedSchedules = sortedSchedules.slice(startIndex, startIndex + entriesPerPage);

  const isSearchActive =
    searchTerm.trim() !== '' ||
    deptFilter !== 'All' ||
    courseFilter !== 'All' ||
    semesterFilter !== 'All' ||
    teacherFilter !== 'All' ||
    dayFilter !== 'All' ||
    statusFilter !== 'All' ||
    sortBy !== 'id-asc';

  return (
    <div className="space-y-6">
      
      {/* Dynamic Statistics cards */}
      <ScheduleStats schedules={schedules} />

      {/* Toolbar filters and search controls */}
      <ScheduleToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        deptFilter={deptFilter}
        onDeptChange={setDeptFilter}
        courseFilter={courseFilter}
        onCourseChange={setCourseFilter}
        semesterFilter={semesterFilter}
        onSemesterChange={setSemesterFilter}
        teacherFilter={teacherFilter}
        onTeacherChange={setTeacherFilter}
        dayFilter={dayFilter}
        onDayChange={setDayFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onRefresh={handleRefresh}
        onExport={handleExport}
        onReset={handleResetFilters}
      />

      {/* Roster lists or Empty Fallbacks */}
      <div className="pt-2.5">
        {totalEntries === 0 ? (
          <EmptyState
            isSearchEmpty={isSearchActive}
            onReset={handleResetFilters}
            onAdd={handleAddClick}
          />
        ) : (
          <div className="space-y-4">
          
          {/* Large Screen Table */}
          <ScheduleTable
            schedules={paginatedSchedules}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onView={handleViewClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />

          {/* Small Screen Mobile stack cards fallback */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginatedSchedules.map((item) => {
              const isActive = item.status === 'Active';
              return (
                <div
                  key={item.id}
                  className="relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight flex flex-col justify-between hover:shadow-ambient-hover hover:border-slate-300 transition-all duration-300 ease-out select-none overflow-hidden space-y-4"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/40 to-transparent opacity-60" />

                  {/* Header info */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 text-[10px] rounded-lg bg-blue-50 text-blue-600 border border-blue-100/60 font-mono font-bold leading-none inline-block">
                        {item.id}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 tracking-tight pt-1 leading-snug">
                        {item.subject}
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold">{item.className}</p>
                    </div>

                    {/* Status Badge */}
                    {isActive ? (
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border bg-gradient-to-r from-emerald-500/8 to-teal-500/5 text-emerald-700 border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.18)] leading-none shrink-0">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border bg-gradient-to-r from-slate-400/8 to-slate-500/5 text-slate-500 border-slate-300 shadow-[0_0_8px_rgba(148,163,184,0.12)] leading-none shrink-0">
                        Inactive
                      </span>
                    )}
                  </div>

                  {/* Metadata fields */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs font-semibold text-slate-650">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Teacher</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {renderTeacherAvatar(item.teacher)}
                        <p className="text-slate-750 truncate max-w-[110px]" title={item.teacher}>{item.teacher}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Classroom</span>
                      <div className="flex items-center gap-1 text-slate-700 font-semibold mt-1 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.classroom}</span>
                      </div>
                    </div>

                    <div className="space-y-1 col-span-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Timing & Track</span>
                      <div className="flex items-center gap-1 text-slate-700 font-semibold mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono text-xs">{item.day} • {item.timeSlot}</span>
                      </div>
                      <p className="text-[10px] text-slate-400/90 font-bold uppercase mt-1">
                        Track: {item.department} • {item.course} • {item.semester}
                      </p>
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>ERP Calendar</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* View */}
                      <button
                        type="button"
                        onClick={() => handleViewClick(item)}
                        className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => handleEditClick(item)}
                        className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-600 hover:border-amber-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="Edit Details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(item)}
                        className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="Delete Schedule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination panel footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-slate-200/60 text-xs font-bold text-slate-500 select-none">
            <div>
              Showing {Math.min(startIndex + 1, totalEntries)} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries} entries
            </div>
            
            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3.5 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white text-slate-700 active:scale-95 transition-all select-none cursor-pointer disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pgNum = idx + 1;
                  const isCurrent = pgNum === currentPage;
                  return (
                    <button
                      key={`page-${pgNum}`}
                      type="button"
                      onClick={() => setCurrentPage(pgNum)}
                      className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center font-bold text-xs transition-colors cursor-pointer select-none ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                          : 'border border-slate-200 text-slate-600 hover:bg-slate-50 bg-white'
                      }`}
                    >
                      {pgNum}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3.5 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white text-slate-700 active:scale-95 transition-all select-none cursor-pointer disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      )}
      </div>

      {/* Details drawer overlay */}
      <ScheduleDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedSchedule(null);
        }}
        schedule={selectedSchedule}
      />

      {/* Add schedule configuration modal dialog */}
      <AddScheduleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSave}
      />

      {/* Edit schedule modal config */}
      <EditScheduleModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedSchedule(null);
        }}
        onSave={handleSave}
        schedule={selectedSchedule}
      />

      {/* Danger Delete validation confirmation modal */}
      <DeleteScheduleModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedSchedule(null);
        }}
        onConfirm={handleDeleteConfirm}
        schedule={selectedSchedule}
      />

    </div>
  );
}
