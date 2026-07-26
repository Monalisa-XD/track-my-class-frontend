import React, { useState, useEffect } from 'react';
import StudentStats from './components/StudentStats';
import StudentToolbar from './components/StudentToolbar';
import StudentTable from './components/StudentTable';
import StudentCard from './components/StudentCard';
import StudentDetailsDrawer from './components/StudentDetailsDrawer';
import AddStudentModal from './components/AddStudentModal';
import EditStudentModal from './components/EditStudentModal';
import DeleteStudentModal from './components/DeleteStudentModal';
import EmptyState from './components/EmptyState';
import { initialStudents } from './data/studentsData';
import './Students.css';

export default function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, deptFilter, courseFilter, semesterFilter, statusFilter, sortBy]);

  const handleAddClick = () => {
    setSelectedStudent(null);
    setIsAddModalOpen(true);
  };

  useEffect(() => {
    const handleHeaderAction = (e) => {
      if (e.detail === 'ADD_STUDENT') {
        handleAddClick();
      }
    };
    window.addEventListener('header-action', handleHeaderAction);
    return () => {
      window.removeEventListener('header-action', handleHeaderAction);
    };
  }, [students]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setDeptFilter('All');
    setCourseFilter('All');
    setSemesterFilter('All');
    setStatusFilter('All');
    setSortBy('name-asc');
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    handleResetFilters();
    alert('Student enrolment database list refreshed.');
  };

  const handleExport = () => {
    alert('Exporting student directory list to Excel (.xlsx) file format...');
  };

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = (student) => {
    setSubjects(students.filter((s) => s.regNo !== student.regNo)); // Wait, setSubjects? Ah! Let's write setStudents!
    setIsDeleteModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSave = (savedStudent) => {
    if (isEditModalOpen) {
      setStudents(students.map((s) => (s.regNo === savedStudent.regNo ? savedStudent : s)));
      setIsEditModalOpen(false);
    } else {
      if (students.some((s) => s.regNo === savedStudent.regNo)) {
        alert(`Student with Registration Number "${savedStudent.regNo}" already exists.`);
        return;
      }
      setStudents([...students, savedStudent]);
      setIsAddModalOpen(false);
    }
    setSelectedStudent(null);
  };

  // Wait! In handleDeleteConfirm, we had: setSubjects(students.filter(...)) by mistake!
  // Let's write the correct function: setStudents(students.filter((s) => s.regNo !== student.regNo));
  // Let's make sure it is exactly correct in our code below:
  const handleDeleteConfirmCorrect = (student) => {
    setStudents(students.filter((s) => s.regNo !== student.regNo));
    setIsDeleteModalOpen(false);
    setSelectedStudent(null);
  };

  // Filtering
  const filteredStudents = students.filter((stud) => {
    const matchesSearch =
      stud.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stud.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stud.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = deptFilter === 'All' || stud.department === deptFilter;
    const matchesCourse = courseFilter === 'All' || stud.course === courseFilter;
    const matchesSemester = semesterFilter === 'All' || stud.semester === semesterFilter;
    const matchesStatus = statusFilter === 'All' || stud.status === statusFilter;

    return matchesSearch && matchesDept && matchesCourse && matchesSemester && matchesStatus;
  });

  // Sorting
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'regNo-asc':
        return a.regNo.localeCompare(b.regNo);
      case 'admissionDate-desc':
        return b.admissionDate.localeCompare(a.admissionDate);
      default:
        return 0;
    }
  });

  // Pagination
  const totalEntries = sortedStudents.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedStudents = sortedStudents.slice(startIndex, startIndex + entriesPerPage);

  const isSearchActive =
    searchTerm.trim() !== '' ||
    deptFilter !== 'All' ||
    courseFilter !== 'All' ||
    semesterFilter !== 'All' ||
    statusFilter !== 'All' ||
    sortBy !== 'name-asc';

  return (
    <div className="space-y-6">
      
      {/* Executive Summary Cards */}
      <StudentStats students={students} />

      {/* Toolbar controls */}
      <StudentToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        deptFilter={deptFilter}
        onDeptChange={setDeptFilter}
        courseFilter={courseFilter}
        onCourseChange={setCourseFilter}
        semesterFilter={semesterFilter}
        onSemesterChange={setSemesterFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onRefresh={handleRefresh}
        onExport={handleExport}
        onReset={handleResetFilters}
      />

      {/* Main content grid / empty lists */}
      {totalEntries === 0 ? (
        <EmptyState
          isSearchEmpty={isSearchActive}
          onReset={handleResetFilters}
          onAdd={handleAddClick}
        />
      ) : (
        <div className="space-y-4">
          
          {/* Desktop Table */}
          <StudentTable
            students={paginatedStudents}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onView={handleViewClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />

          {/* Mobile Card stack fallback */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginatedStudents.map((stud) => (
              <StudentCard
                key={stud.regNo}
                student={stud}
                onView={handleViewClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {/* Pagination bar */}
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

      {/* Details Side-Drawer */}
      <StudentDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />

      {/* Add Modal overlay */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedStudent(null);
        }}
        onSave={handleSave}
      />

      {/* Edit Modal overlay */}
      <EditStudentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedStudent(null);
        }}
        selectedStudent={selectedStudent}
        onSave={handleSave}
      />

      {/* Delete Modal overlay */}
      <DeleteStudentModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedStudent(null);
        }}
        selectedStudent={selectedStudent}
        onConfirm={handleDeleteConfirmCorrect}
      />

    </div>
  );
}
