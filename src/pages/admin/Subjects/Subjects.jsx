import React, { useState, useEffect } from 'react';
import SubjectStats from './components/SubjectStats';
import SubjectToolbar from './components/SubjectToolbar';
import SubjectTable from './components/SubjectTable';
import SubjectCard from './components/SubjectCard';
import AddSubjectModal from './components/AddSubjectModal';
import EditSubjectModal from './components/EditSubjectModal';
import DeleteSubjectModal from './components/DeleteSubjectModal';
import EmptyState from './components/EmptyState';
import { initialSubjects } from './data/subjectsData';
import './Subjects.css';

export default function Subjects() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [sortBy, setSortBy] = useState('code-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // "add" | "view"
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, deptFilter, courseFilter, semesterFilter, sortBy]);

  const handleAddClick = () => {
    setModalMode('add');
    setSelectedSubject(null);
    setIsAddModalOpen(true);
  };

  useEffect(() => {
    const handleHeaderAction = (e) => {
      if (e.detail === 'ADD_SUBJECT') {
        handleAddClick();
      }
    };
    window.addEventListener('header-action', handleHeaderAction);
    return () => {
      window.removeEventListener('header-action', handleHeaderAction);
    };
  }, [subjects]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setDeptFilter('All');
    setCourseFilter('All');
    setSemesterFilter('All');
    setSortBy('code-asc');
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    handleResetFilters();
    alert('Subjects database refreshed successfully.');
  };

  const handleExport = () => {
    alert('Exporting subject details list to Excel (.xlsx) file format...');
  };

  const handleViewClick = (subject) => {
    setModalMode('view');
    setSelectedSubject(subject);
    setIsAddModalOpen(true);
  };

  const handleEditClick = (subject) => {
    setSelectedSubject(subject);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (subject) => {
    setSelectedSubject(subject);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = (subject) => {
    setSubjects(subjects.filter((s) => s.code !== subject.code));
    setIsDeleteModalOpen(false);
    setSelectedSubject(null);
  };

  const handleSave = (savedSubject) => {
    if (isEditModalOpen) {
      setSubjects(subjects.map((s) => (s.code === savedSubject.code ? savedSubject : s)));
      setIsEditModalOpen(false);
    } else {
      if (subjects.some((s) => s.code.toUpperCase() === savedSubject.code.toUpperCase())) {
        alert(`Subject with Code "${savedSubject.code}" already exists.`);
        return;
      }
      setSubjects([...subjects, savedSubject]);
      setIsAddModalOpen(false);
    }
    setSelectedSubject(null);
  };

  // Filtering
  const filteredSubjects = subjects.filter((sub) => {
    const matchesSearch =
      sub.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = deptFilter === 'All' || sub.department === deptFilter;
    const matchesCourse = courseFilter === 'All' || sub.course === courseFilter;
    const matchesSemester = semesterFilter === 'All' || sub.semester === semesterFilter;

    return matchesSearch && matchesDept && matchesCourse && matchesSemester;
  });

  // Sorting
  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    switch (sortBy) {
      case 'code-asc':
        return a.code.localeCompare(b.code);
      case 'code-desc':
        return b.code.localeCompare(a.code);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'semester-asc':
        return a.semester.localeCompare(b.semester);
      case 'credits-desc':
        return b.credits - a.credits;
      default:
        return 0;
    }
  });

  // Pagination
  const totalEntries = sortedSubjects.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedSubjects = sortedSubjects.slice(startIndex, startIndex + entriesPerPage);

  const isSearchActive =
    searchTerm.trim() !== '' ||
    deptFilter !== 'All' ||
    courseFilter !== 'All' ||
    semesterFilter !== 'All' ||
    sortBy !== 'code-asc';

  return (
    <div className="space-y-6">
      
      {/* Summary Cards */}
      <SubjectStats subjects={subjects} />

      {/* Filter and Search Toolbar */}
      <SubjectToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        deptFilter={deptFilter}
        onDeptChange={setDeptFilter}
        courseFilter={courseFilter}
        onCourseChange={setCourseFilter}
        semesterFilter={semesterFilter}
        onSemesterChange={setSemesterFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onRefresh={handleRefresh}
        onExport={handleExport}
        onReset={handleResetFilters}
      />

      {/* Record Listing */}
      {totalEntries === 0 ? (
        <EmptyState
          isSearchEmpty={isSearchActive}
          onReset={handleResetFilters}
          onAdd={handleAddClick}
        />
      ) : (
        <div className="space-y-4">
          
          {/* Desktop Table View */}
          <SubjectTable
            subjects={paginatedSubjects}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onView={handleViewClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />

          {/* Mobile Card Layout Fallback */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginatedSubjects.map((sub) => (
              <SubjectCard
                key={sub.code}
                subject={sub}
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

      {/* Add / View Details Modal */}
      <AddSubjectModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedSubject(null);
        }}
        mode={modalMode}
        selectedSubject={selectedSubject}
        onSave={handleSave}
      />

      {/* Edit Modal */}
      <EditSubjectModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedSubject(null);
        }}
        selectedSubject={selectedSubject}
        onSave={handleSave}
      />

      {/* Delete Confirmation Modal */}
      <DeleteSubjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedSubject(null);
        }}
        selectedSubject={selectedSubject}
        onConfirm={handleDeleteConfirm}
      />

    </div>
  );
}
