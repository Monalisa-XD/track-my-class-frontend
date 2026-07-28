import React, { useState, useEffect } from 'react';
import { Eye, Edit2, Trash2, Calendar, Clock, User, Award, BookOpen, Building2, X, AlertTriangle, Save } from 'lucide-react';
import AttendanceStats from './components/AttendanceStats';
import AttendanceFilters from './components/AttendanceFilters';
import AttendanceTable from './components/AttendanceTable';
import AttendanceStatusBadge from './components/AttendanceStatusBadge';
import { initialAttendance, STATUSES } from './data/attendanceData';

const getInitials = (name) => {
  if (!name) return '';
  const cleanedName = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, '');
  const parts = cleanedName.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const renderStudentAvatar = (name) => {
  const initials = getInitials(name);
  return (
    <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-extrabold text-[9px] font-mono shadow-xs border border-blue-200/20 shrink-0">
      {initials}
    </div>
  );
};

export default function AttendancePage() {
  const [records, setRecords] = useState(initialAttendance);
  
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [teacherFilter, setTeacherFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('roll-asc');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Modals & Drawer State
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // Edit Form State
  const [editStatus, setEditStatus] = useState('Present');

  // Reset page when filter inputs change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, deptFilter, courseFilter, semesterFilter, subjectFilter, teacherFilter, dateFilter, statusFilter, sortBy]);

  // Header Actions Pub-Sub
  const handleMarkAttendanceAction = () => {
    alert('Opening Administrative Attendance Marker console panel...');
  };

  useEffect(() => {
    const handleHeaderAction = (e) => {
      if (e.detail === 'MARK_ATTENDANCE') {
        handleMarkAttendanceAction();
      }
    };
    window.addEventListener('header-action', handleHeaderAction);
    return () => {
      window.removeEventListener('header-action', handleHeaderAction);
    };
  }, []);

  const handleResetFilters = () => {
    setSearchTerm('');
    setDeptFilter('All');
    setCourseFilter('All');
    setSemesterFilter('All');
    setSubjectFilter('All');
    setTeacherFilter('All');
    setDateFilter('');
    setStatusFilter('All');
    setSortBy('roll-asc');
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    handleResetFilters();
    alert('Attendance logs roster list refreshed.');
  };

  const handleExport = () => {
    alert('Exporting system student attendance report logs to Excel (.xlsx)...');
  };

  // Actions Callbacks
  const handleView = (item) => {
    setSelectedRecord(item);
    setIsViewOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedRecord(item);
    setEditStatus(item.status);
    setIsEditOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedRecord(item);
    setIsDeleteOpen(true);
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    setRecords(records.map(r => {
      const match = r.rollNo === selectedRecord.rollNo && r.subject === selectedRecord.subject && r.date === selectedRecord.date;
      if (match) {
        return {
          ...r,
          status: editStatus,
          time: editStatus === 'Absent' || editStatus === 'Leave' ? '--' : r.time === '--' ? '09:00 AM' : r.time
        };
      }
      return r;
    }));
    setIsEditOpen(false);
    setSelectedRecord(null);
  };

  const handleDeleteConfirm = () => {
    setRecords(records.filter(r => !(r.rollNo === selectedRecord.rollNo && r.subject === selectedRecord.subject && r.date === selectedRecord.date)));
    setIsDeleteOpen(false);
    setSelectedRecord(null);
  };

  // Filtering records logic
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.rollNo.includes(searchTerm) ||
      r.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = deptFilter === 'All' || r.department === deptFilter;
    const matchesCourse = courseFilter === 'All' || r.course === courseFilter;
    const matchesSemester = semesterFilter === 'All' || r.semester === semesterFilter;
    const matchesSubject = subjectFilter === 'All' || r.subject === subjectFilter;
    const matchesTeacher = teacherFilter === 'All' || r.teacher === teacherFilter;
    const matchesDate = dateFilter === '' || r.date === dateFilter;
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;

    return matchesSearch && matchesDept && matchesCourse && matchesSemester && matchesSubject && matchesTeacher && matchesDate && matchesStatus;
  });

  // Sorting records logic
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    switch (sortBy) {
      case 'roll-asc':
        return a.rollNo.localeCompare(b.rollNo);
      case 'roll-desc':
        return b.rollNo.localeCompare(a.rollNo);
      case 'name-asc':
        return a.studentName.localeCompare(b.studentName);
      case 'date-asc':
        return a.date.localeCompare(b.date);
      case 'percentage-asc':
        return a.percentage - b.percentage;
      case 'percentage-desc':
        return b.percentage - a.percentage;
      default:
        return 0;
    }
  });

  // Pagination bounds
  const totalEntries = sortedRecords.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedRecords = sortedRecords.slice(startIndex, startIndex + entriesPerPage);

  const isSearchActive =
    searchTerm.trim() !== '' ||
    deptFilter !== 'All' ||
    courseFilter !== 'All' ||
    semesterFilter !== 'All' ||
    subjectFilter !== 'All' ||
    teacherFilter !== 'All' ||
    dateFilter !== '' ||
    statusFilter !== 'All' ||
    sortBy !== 'roll-asc';

  return (
    <div className="space-y-6">
      
      {/* Dynamic stats overview section */}
      <AttendanceStats records={records} />

      {/* Toolbar filters controls */}
      <AttendanceFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        deptFilter={deptFilter}
        onDeptChange={setDeptFilter}
        courseFilter={courseFilter}
        onCourseChange={setCourseFilter}
        semesterFilter={semesterFilter}
        onSemesterChange={setSemesterFilter}
        subjectFilter={subjectFilter}
        onSubjectChange={setSubjectFilter}
        teacherFilter={teacherFilter}
        onTeacherChange={setTeacherFilter}
        dateFilter={dateFilter}
        onDateChange={setDateFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onRefresh={handleRefresh}
        onExport={handleExport}
        onReset={handleResetFilters}
      />

      {/* Roster content view with custom spacing wrapper */}
      <div className="pt-2.5">
        {totalEntries === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 md:p-12 bg-white rounded-2xl border border-slate-200/80 shadow-ambient select-none text-center max-w-xl mx-auto space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center shadow-xs">
              <Calendar className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                {isSearchActive ? 'No Attendance Found' : 'No Records Configured'}
              </h3>
              <p className="text-sm text-slate-500 font-medium max-w-sm leading-relaxed">
                {isSearchActive
                  ? 'Try adjusting your student filters or date select range queries to look up other attendance logs.'
                  : 'Start tracking attendance by marking daily class roster records.'}
              </p>
            </div>

            <div className="pt-1">
              {isSearchActive ? (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="w-4.5 h-4.5" />
                  <span>Reset Search Filters</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleMarkAttendanceAction}
                  className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Mark First Attendance</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* Desktop Table */}
            <AttendanceTable
              records={paginatedRecords}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {/* Mobile Fallback layout grid stack */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {paginatedRecords.map((item) => (
                <div
                  key={`${item.rollNo}-${item.subject}-${item.date}`}
                  className="relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight flex flex-col justify-between hover:shadow-ambient-hover hover:border-slate-300 transition-all duration-300 ease-out select-none overflow-hidden space-y-4"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/40 to-transparent opacity-60" />

                  {/* Top info and status badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 text-[10px] rounded-lg bg-blue-50 text-blue-600 border border-blue-100/60 font-mono font-bold leading-none inline-block">
                        Roll: {item.rollNo}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 tracking-tight pt-1 leading-snug">
                        {item.studentName}
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold">{item.subject}</p>
                    </div>

                    <AttendanceStatusBadge status={item.status} />
                  </div>

                  {/* Mid stats details */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs font-semibold text-slate-650">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Teacher</span>
                      <p className="text-slate-750 truncate pt-1">{item.teacher}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">DateTime</span>
                      <p className="text-slate-700 font-mono text-xs pt-1">{item.date} • {item.time}</p>
                    </div>

                    <div className="space-y-1 col-span-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Academic Track & Avg %</span>
                      <p className="text-slate-700">
                        {item.department} • {item.course} • {item.semester} (Overall: <strong className={item.percentage < 75 ? 'text-red-500' : 'text-slate-800'}>{item.percentage}%</strong>)
                      </p>
                    </div>
                  </div>

                  {/* Actions panel */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Timestamp: {item.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleView(item)}
                        className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-600 hover:border-amber-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Pagination controls */}
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

      {/* Details View Drawer Fallback / Modal */}
      {isViewOpen && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsViewOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300" />
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden transform transition-all duration-300 ease-out flex flex-col">
            <div className="h-1.5 w-full bg-blue-600" />
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
                  <User className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 tracking-tight">Attendance Summary</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">VSSUT ERP Registry</p>
                </div>
              </div>
              <button onClick={() => setIsViewOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-gradient-to-b from-blue-50/50 via-white to-white border border-blue-100/40 shadow-2xs relative">
                <div className="absolute top-4 right-4">
                  <AttendanceStatusBadge status={selectedRecord.status} />
                </div>
                {renderStudentAvatar(selectedRecord.studentName)}
                <h4 className="text-base font-bold text-slate-800 tracking-tight mt-3">{selectedRecord.studentName}</h4>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">Roll No: {selectedRecord.rollNo}</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="inline-flex px-2.5 py-1 text-xs rounded-lg bg-blue-50 text-blue-600 border border-blue-100/60 font-bold leading-none">{selectedRecord.department} Branch</span>
                  <span className="inline-flex px-2.5 py-1 text-xs rounded-lg bg-slate-50 text-slate-600 border border-slate-200/60 font-bold leading-none">{selectedRecord.course} program</span>
                </div>
              </div>
              <div className="space-y-3">
                <h5 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-100 pb-1.5">Classroom & Timing Details</h5>
                <div className="space-y-2.5 text-xs text-slate-700 font-semibold">
                  <p className="flex justify-between"><span>Subject Assigned:</span> <strong className="text-slate-850">{selectedRecord.subject}</strong></p>
                  <p className="flex justify-between"><span>Faculty Teacher:</span> <strong className="text-slate-850">{selectedRecord.teacher}</strong></p>
                  <p className="flex justify-between"><span>Log Date & Time:</span> <strong className="text-slate-850 font-mono">{selectedRecord.date} at {selectedRecord.time}</strong></p>
                  <p className="flex justify-between"><span>Student Overall Avg %:</span> <strong className={selectedRecord.percentage < 75 ? 'text-red-500' : 'text-slate-800'}>{selectedRecord.percentage}%</strong></p>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button onClick={() => setIsViewOpen(false)} className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer">
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Status Modal */}
      {isEditOpen && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsEditOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300" />
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden transform transition-all duration-300 ease-out flex flex-col">
            <div className="h-1.5 w-full bg-blue-600" />
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
                  <Edit2 className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 tracking-tight">Edit Attendance Log</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Status Override</p>
                </div>
              </div>
              <button onClick={() => setIsEditOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveStatus} className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-bold">Student Name</p>
                <p className="text-sm font-bold text-slate-800">{selectedRecord.studentName} ({selectedRecord.rollNo})</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-bold">Subject & Teacher</p>
                <p className="text-xs font-semibold text-slate-600">{selectedRecord.subject} by {selectedRecord.teacher}</p>
              </div>
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Attendance Status</label>
                <div className="relative">
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                  >
                    {STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">▼</span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 mt-5">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer">
                  <Save className="w-4 h-4" />
                  <span>Save Override</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsDeleteOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300" />
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden transform transition-all duration-300 ease-out flex flex-col">
            <div className="h-1.5 w-full bg-red-500" />
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center border border-red-100/60">
                  <AlertTriangle className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 tracking-tight">Delete Attendance Log</h3>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Destructive Action</p>
                </div>
              </div>
              <button onClick={() => setIsDeleteOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center shadow-xs mx-auto animate-bounce">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-slate-800">Are you absolutely sure?</h4>
                <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                  This will permanently delete the attendance log for <strong className="text-slate-700">{selectedRecord.studentName}</strong> on <span className="font-semibold text-slate-700">{selectedRecord.date}</span> for the subject <span className="font-semibold text-slate-700">{selectedRecord.subject}</span>.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2.5 p-5 border-t border-slate-100 bg-slate-50/50">
              <button onClick={() => setIsDeleteOpen(false)} className="px-4.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-500/20 active:scale-95 transition-all cursor-pointer">
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
