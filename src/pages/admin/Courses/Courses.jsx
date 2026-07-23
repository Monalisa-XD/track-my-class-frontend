import React, { useState, useEffect } from 'react';
import CourseStats from './components/CourseStats';
import CourseToolbar from './components/CourseToolbar';
import CourseTable from './components/CourseTable';
import CourseCard from './components/CourseCard';
import AddCourseModal from './components/AddCourseModal';
import EditCourseModal from './components/EditCourseModal';
import DeleteCourseModal from './components/DeleteCourseModal';
import EmptyState from './components/EmptyState';
import { initialCourses } from './data/coursesData';
import './Courses.css';

/**
 * Courses Page Component
 * Main page coordinating the state, filters, sorting, stats cards, table grid, mobile card list, and modals.
 */
export default function Courses() {
  // State for courses records
  const [courses, setCourses] = useState(initialCourses);

  // States for search, department filter, status filter, and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('code-asc');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Modal open states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Modal target tracking
  const [modalMode, setModalMode] = useState('add'); // "add" | "view"
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Reset pagination on filter or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, deptFilter, statusFilter, sortBy]);

  // Open modal for adding a new course
  const handleAddClick = () => {
    setModalMode('add');
    setSelectedCourse(null);
    setIsAddModalOpen(true);
  };

  // Connect to global page-header action button using window event listener
  useEffect(() => {
    const handleHeaderAction = (e) => {
      if (e.detail === 'ADD_COURSE') {
        handleAddClick();
      }
    };
    window.addEventListener('header-action', handleHeaderAction);
    return () => {
      window.removeEventListener('header-action', handleHeaderAction);
    };
  }, [courses]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setDeptFilter('All');
    setStatusFilter('All');
    setSortBy('code-asc');
    setCurrentPage(1);
  };

  // Refresh simulation
  const handleRefresh = () => {
    handleResetFilters();
    alert('Courses database refreshed successfully.');
  };

  // Export report simulation
  const handleExport = () => {
    alert('Exporting course details list to Excel (.xlsx) file format...');
  };

  // Open View Details Modal
  const handleViewClick = (course) => {
    setModalMode('view');
    setSelectedCourse(course);
    setIsAddModalOpen(true);
  };

  // Open Edit Details Modal
  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  // Open Delete Confirmation Modal
  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setIsDeleteModalOpen(true);
  };

  // Confirm deletion action
  const handleDeleteConfirm = (course) => {
    setCourses(courses.filter((c) => c.code !== course.code));
    setIsDeleteModalOpen(false);
    setSelectedCourse(null);
  };

  // Save edits or additions (local state updates)
  const handleSave = (savedCourse) => {
    if (isEditModalOpen) {
      setCourses(courses.map((c) => (c.code === savedCourse.code ? savedCourse : c)));
      setIsEditModalOpen(false);
    } else {
      // Prevent duplicates in mock state
      if (courses.some((c) => c.code.toUpperCase() === savedCourse.code.toUpperCase())) {
        alert(`Course with Code "${savedCourse.code}" already exists.`);
        return;
      }
      setCourses([...courses, savedCourse]);
      setIsAddModalOpen(false);
    }
    setSelectedCourse(null);
  };

  // 1. Filtering logic matching search keyword, department, and status
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = deptFilter === 'All' || course.department === deptFilter;
    const matchesStatus = statusFilter === 'All' || course.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  // 2. Sorting logic matching selected criteria
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'code-asc':
        return a.code.localeCompare(b.code);
      case 'code-desc':
        return b.code.localeCompare(a.code);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'subjects-desc':
        return b.totalSubjects - a.totalSubjects;
      case 'students-desc':
        return b.totalStudents - a.totalStudents;
      default:
        return 0;
    }
  });

  // 3. Pagination calculations
  const totalEntries = sortedCourses.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedCourses = sortedCourses.slice(startIndex, startIndex + entriesPerPage);

  const isSearchActive =
    searchTerm.trim() !== '' || deptFilter !== 'All' || statusFilter !== 'All' || sortBy !== 'code-asc';

  return (
    <div className="space-y-6">
      
      {/* 1. Top Summary Metric Cards */}
      <CourseStats courses={courses} />

      {/* 2. Toolbar with search, select filters, refresh, and reset options */}
      <CourseToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        deptFilter={deptFilter}
        onDeptChange={setDeptFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onRefresh={handleRefresh}
        onExport={handleExport}
        onReset={handleResetFilters}
      />

      {/* 3. Empty State or Records representation */}
      {totalEntries === 0 ? (
        <EmptyState
          isSearchEmpty={isSearchActive}
          onReset={handleResetFilters}
          onAdd={handleAddClick}
        />
      ) : (
        <div className="space-y-4">
          
          {/* Desktop tabular view */}
          <CourseTable
            courses={paginatedCourses}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onView={handleViewClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />

          {/* Mobile card stack view */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginatedCourses.map((course) => (
              <CourseCard
                key={course.code}
                course={course}
                onView={handleViewClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {/* Pagination Footer */}
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
              
              {/* Page Number selection buttons */}
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

      {/* 4. Unified Add/View details Modal Overlay */}
      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedCourse(null);
        }}
        mode={modalMode}
        selectedCourse={selectedCourse}
        onSave={handleSave}
      />

      {/* 5. Separate Edit Modal Overlay */}
      <EditCourseModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCourse(null);
        }}
        selectedCourse={selectedCourse}
        onSave={handleSave}
      />

      {/* 6. Separate warnings Delete Modal Overlay */}
      <DeleteCourseModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCourse(null);
        }}
        selectedCourse={selectedCourse}
        onConfirm={handleDeleteConfirm}
      />

    </div>
  );
}
