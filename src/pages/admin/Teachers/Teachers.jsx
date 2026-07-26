import React, { useState, useEffect } from 'react';
import TeacherStats from './components/TeacherStats';
import TeacherToolbar from './components/TeacherToolbar';
import TeacherTable from './components/TeacherTable';
import TeacherCard from './components/TeacherCard';
import TeacherDetailsDrawer from './components/TeacherDetailsDrawer';
import AddTeacherModal from './components/AddTeacherModal';
import EditTeacherModal from './components/EditTeacherModal';
import DeleteTeacherModal from './components/DeleteTeacherModal';
import EmptyState from './components/EmptyState';
import { initialTeachers } from './data/teachersData';
import './Teachers.css';

export default function Teachers() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [designationFilter, setDesignationFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, deptFilter, designationFilter, statusFilter, sortBy]);

  const handleAddClick = () => {
    setSelectedTeacher(null);
    setIsAddModalOpen(true);
  };

  useEffect(() => {
    const handleHeaderAction = (e) => {
      if (e.detail === 'ADD_TEACHER') {
        handleAddClick();
      }
    };
    window.addEventListener('header-action', handleHeaderAction);
    return () => {
      window.removeEventListener('header-action', handleHeaderAction);
    };
  }, [teachers]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setDeptFilter('All');
    setDesignationFilter('All');
    setStatusFilter('All');
    setSortBy('name-asc');
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    handleResetFilters();
    alert('Faculty database list refreshed.');
  };

  const handleExport = () => {
    alert('Exporting faculty directory list to Excel (.xlsx) file format...');
  };

  const handleViewClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDrawerOpen(true);
  };

  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = (teacher) => {
    setTeachers(teachers.filter((t) => t.id !== teacher.id));
    setIsDeleteModalOpen(false);
    setSelectedTeacher(null);
  };

  const handleSave = (savedTeacher) => {
    if (isEditModalOpen) {
      setTeachers(teachers.map((t) => (t.id === savedTeacher.id ? savedTeacher : t)));
      setIsEditModalOpen(false);
    } else {
      // Auto-generate ID: TCH + sequence
      const nextIdNum = teachers.length > 0
        ? Math.max(...teachers.map((t) => parseInt(t.id.replace('TCH', ''), 10))) + 1
        : 1;
      const formattedId = `TCH${String(nextIdNum).padStart(3, '0')}`;
      
      const newTeacherRecord = {
        ...savedTeacher,
        id: formattedId
      };
      setTeachers([...teachers, newTeacherRecord]);
      setIsAddModalOpen(false);
    }
    setSelectedTeacher(null);
  };

  // Filtering
  const filteredTeachers = teachers.filter((tch) => {
    const matchesSearch =
      tch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tch.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = deptFilter === 'All' || tch.department === deptFilter;
    const matchesDesignation = designationFilter === 'All' || tch.designation === designationFilter;
    const matchesStatus = statusFilter === 'All' || tch.status === statusFilter;

    return matchesSearch && matchesDept && matchesDesignation && matchesStatus;
  });

  // Sorting
  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'id-asc':
        return a.id.localeCompare(b.id);
      case 'experience-desc':
        // Parse numerical experience values (e.g. "12 Years" -> 12)
        const expA = parseInt(a.experience.replace(' Years', ''), 10) || 0;
        const expB = parseInt(b.experience.replace(' Years', ''), 10) || 0;
        return expB - expA;
      case 'joining-desc':
        return b.joiningDate.localeCompare(a.joiningDate);
      default:
        return 0;
    }
  });

  // Pagination
  const totalEntries = sortedTeachers.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedTeachers = sortedTeachers.slice(startIndex, startIndex + entriesPerPage);

  const isSearchActive =
    searchTerm.trim() !== '' ||
    deptFilter !== 'All' ||
    designationFilter !== 'All' ||
    statusFilter !== 'All' ||
    sortBy !== 'name-asc';

  return (
    <div className="space-y-6">
      
      {/* Executive Summary Cards */}
      <TeacherStats teachers={teachers} />

      {/* Toolbar controls */}
      <TeacherToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        deptFilter={deptFilter}
        onDeptChange={setDeptFilter}
        designationFilter={designationFilter}
        onDesignationChange={setDesignationFilter}
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
          <TeacherTable
            teachers={paginatedTeachers}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onView={handleViewClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />

          {/* Mobile Card stack fallback */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginatedTeachers.map((tch) => (
              <TeacherCard
                key={tch.id}
                teacher={tch}
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
      <TeacherDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedTeacher(null);
        }}
        teacher={selectedTeacher}
      />

      {/* Add Modal overlay */}
      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedTeacher(null);
        }}
        onSave={handleSave}
      />

      {/* Edit Modal overlay */}
      <EditTeacherModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTeacher(null);
        }}
        selectedTeacher={selectedTeacher}
        onSave={handleSave}
      />

      {/* Delete Modal overlay */}
      <DeleteTeacherModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedTeacher(null);
        }}
        selectedTeacher={selectedTeacher}
        onConfirm={handleDeleteConfirm}
      />

    </div>
  );
}
