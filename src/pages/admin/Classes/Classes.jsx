import React, { useState, useEffect } from 'react';
import ClassStats from './components/ClassStats';
import ClassToolbar from './components/ClassToolbar';
import ClassTable from './components/ClassTable';
import ClassCard from './components/ClassCard';
import ClassDetailsDrawer from './components/ClassDetailsDrawer';
import AddClassModal from './components/AddClassModal';
import EditClassModal from './components/EditClassModal';
import DeleteClassModal from './components/DeleteClassModal';
import EmptyState from './components/EmptyState';
import { initialClasses } from './data/classesData';
import './Classes.css';

export default function Classes() {
  const [classes, setClasses] = useState(initialClasses);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [academicYearFilter, setAcademicYearFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('code-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, deptFilter, courseFilter, semesterFilter, academicYearFilter, statusFilter, sortBy]);

  const handleAddClick = () => {
    setSelectedClass(null);
    setIsAddModalOpen(true);
  };

  useEffect(() => {
    const handleHeaderAction = (e) => {
      if (e.detail === 'ADD_CLASS') {
        handleAddClick();
      }
    };
    window.addEventListener('header-action', handleHeaderAction);
    return () => {
      window.removeEventListener('header-action', handleHeaderAction);
    };
  }, [classes]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setDeptFilter('All');
    setCourseFilter('All');
    setSemesterFilter('All');
    setAcademicYearFilter('All');
    setStatusFilter('All');
    setSortBy('code-asc');
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    handleResetFilters();
    alert('Classes roster list refreshed.');
  };

  const handleExport = () => {
    alert('Exporting Classes configurations report to Excel (.xlsx)...');
  };

  const handleViewClick = (classObj) => {
    setSelectedClass(classObj);
    setIsDrawerOpen(true);
  };

  const handleEditClick = (classObj) => {
    setSelectedClass(classObj);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (classObj) => {
    setSelectedClass(classObj);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = (classObj) => {
    setClasses(classes.filter((c) => c.code !== classObj.code));
    setIsDeleteModalOpen(false);
    setSelectedClass(null);
  };

  const handleSave = (savedClass) => {
    if (isEditModalOpen) {
      setClasses(classes.map((c) => (c.code === savedClass.code ? savedClass : c)));
      setIsEditModalOpen(false);
    } else {
      if (classes.some((c) => c.code === savedClass.code)) {
        alert(`Class with Code "${savedClass.code}" already exists.`);
        return;
      }
      setClasses([...classes, savedClass]);
      setIsAddModalOpen(false);
    }
    setSelectedClass(null);
  };

  // Filtering
  const filteredClasses = classes.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.classroom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.classTeacher.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = deptFilter === 'All' || c.department === deptFilter;
    const matchesCourse = courseFilter === 'All' || c.course === courseFilter;
    const matchesSemester = semesterFilter === 'All' || c.semester === semesterFilter;
    const matchesYear = academicYearFilter === 'All' || c.academicYear === academicYearFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;

    return matchesSearch && matchesDept && matchesCourse && matchesSemester && matchesYear && matchesStatus;
  });

  // Sorting
  const sortedClasses = [...filteredClasses].sort((a, b) => {
    switch (sortBy) {
      case 'code-asc':
        return a.code.localeCompare(b.code);
      case 'code-desc':
        return b.code.localeCompare(a.code);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'studentCount-desc':
        return b.studentCount - a.studentCount;
      case 'createdDate-desc':
        return b.createdDate.localeCompare(a.createdDate);
      default:
        return 0;
    }
  });

  // Pagination
  const totalEntries = sortedClasses.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedClasses = sortedClasses.slice(startIndex, startIndex + entriesPerPage);

  const isSearchActive =
    searchTerm.trim() !== '' ||
    deptFilter !== 'All' ||
    courseFilter !== 'All' ||
    semesterFilter !== 'All' ||
    academicYearFilter !== 'All' ||
    statusFilter !== 'All' ||
    sortBy !== 'code-asc';

  return (
    <div className="space-y-6">
      
      {/* Executive Summary Cards */}
      <ClassStats classes={classes} />

      {/* Toolbar controls */}
      <ClassToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        deptFilter={deptFilter}
        onDeptChange={setDeptFilter}
        courseFilter={courseFilter}
        onCourseChange={setCourseFilter}
        semesterFilter={semesterFilter}
        onSemesterChange={setSemesterFilter}
        academicYearFilter={academicYearFilter}
        onAcademicYearChange={setAcademicYearFilter}
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
          <ClassTable
            classes={paginatedClasses}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onView={handleViewClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />

          {/* Mobile Card stack fallback */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginatedClasses.map((cls) => (
              <ClassCard
                key={cls.code}
                cls={cls}
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
      <ClassDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedClass(null);
        }}
        cls={selectedClass}
      />

      {/* Add Modal overlay */}
      <AddClassModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedClass(null);
        }}
        onSave={handleSave}
      />

      {/* Edit Modal overlay */}
      <EditClassModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedClass(null);
        }}
        selectedClass={selectedClass}
        onSave={handleSave}
      />

      {/* Delete Modal overlay */}
      <DeleteClassModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedClass(null);
        }}
        selectedClass={selectedClass}
        onConfirm={handleDeleteConfirm}
      />

    </div>
  );
}
