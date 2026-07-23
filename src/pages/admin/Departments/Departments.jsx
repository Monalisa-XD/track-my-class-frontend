import React, { useState, useEffect } from 'react';
import DepartmentHeader from './components/DepartmentHeader';
import DepartmentStats from './components/DepartmentStats';
import DepartmentFilters from './components/DepartmentFilters';
import DepartmentTable from './components/DepartmentTable';
import DepartmentCard from './components/DepartmentCard';
import AddDepartmentModal from './components/AddDepartmentModal';
import DeleteDepartmentModal from './components/DeleteDepartmentModal';
import EmptyState from './components/EmptyState';
import { initialDepartments } from './data/departmentsData';
import './Departments.css';

/**
 * Departments Page Component
 * Main page coordinating the state, filters, sorting, stats cards, table grid, mobile fallback, and modals.
 */
export default function Departments() {
  // State for department records
  const [departments, setDepartments] = useState(initialDepartments);

  // States for search, status, and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('code-asc');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Modal open states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Modal auxiliary tracking state
  const [modalMode, setModalMode] = useState('add'); // "add" | "edit" | "view"
  const [selectedDept, setSelectedDept] = useState(null);

  // Reset pagination to page 1 when search or status filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortBy]);

  // Reset all filters and sorting parameters
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setSortBy('code-asc');
    setCurrentPage(1);
  };

  // Refresh page: resets controls and displays alert simulator
  const handleRefresh = () => {
    handleResetFilters();
    alert('Department records refreshed successfully.');
  };

  // Export report alert simulator
  const handleExport = () => {
    alert('Exporting departments records to Excel (.xlsx) file format...');
  };

  // Open modal for adding a new department
  const handleAddClick = () => {
    setModalMode('add');
    setSelectedDept(null);
    setIsAddModalOpen(true);
  };

  // Open modal for viewing details (read-only)
  const handleViewClick = (dept) => {
    setModalMode('view');
    setSelectedDept(dept);
    setIsAddModalOpen(true);
  };

  // Open modal for editing department details
  const handleEditClick = (dept) => {
    setModalMode('edit');
    setSelectedDept(dept);
    setIsAddModalOpen(true);
  };

  // Open confirmation modal for deleting a department
  const handleDeleteClick = (dept) => {
    setSelectedDept(dept);
    setIsDeleteModalOpen(true);
  };

  // Confirm and apply department deletion
  const handleDeleteConfirm = (dept) => {
    setDepartments(departments.filter((d) => d.code !== dept.code));
    setIsDeleteModalOpen(false);
    setSelectedDept(null);
  };

  // Save changes from Add/Edit Modal (updates local state)
  const handleSave = (savedDept) => {
    if (modalMode === 'add') {
      // Prevent duplicates by code
      if (departments.some((d) => d.code.toUpperCase() === savedDept.code.toUpperCase())) {
        alert(`Department with Code "${savedDept.code}" already exists.`);
        return;
      }
      setDepartments([...departments, savedDept]);
    } else if (modalMode === 'edit') {
      setDepartments(departments.map((d) => (d.code === savedDept.code ? savedDept : d)));
    }
    setIsAddModalOpen(false);
    setSelectedDept(null);
  };

  // 1. Filtering logic matching search keywords and status
  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.hod.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || dept.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 2. Sorting logic matching selected criteria
  const sortedDepartments = [...filteredDepartments].sort((a, b) => {
    switch (sortBy) {
      case 'code-asc':
        return a.code.localeCompare(b.code);
      case 'code-desc':
        return b.code.localeCompare(a.code);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'teachers-desc':
        return b.totalTeachers - a.totalTeachers;
      case 'students-desc':
        return b.totalStudents - a.totalStudents;
      default:
        return 0;
    }
  });

  // 3. Pagination calculations
  const totalEntries = sortedDepartments.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedDepartments = sortedDepartments.slice(startIndex, startIndex + entriesPerPage);

  const isSearchActive = searchTerm.trim() !== '' || statusFilter !== 'All' || sortBy !== 'code-asc';

  return (
    <div className="space-y-6">
      
      {/* 1. Header widget with title and actions */}
      <DepartmentHeader onAddClick={handleAddClick} />

      {/* 2. Top Summary Metric Cards */}
      <DepartmentStats departments={departments} />

      {/* 3. Toolbar with Search, Status dropdown, Sorting selectors, and Action icons */}
      <DepartmentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onRefresh={handleRefresh}
        onExport={handleExport}
        onReset={handleResetFilters}
      />

      {/* 4. Empty State or Main Records Grid Layout */}
      {totalEntries === 0 ? (
        <EmptyState
          isSearchEmpty={isSearchActive}
          onReset={handleResetFilters}
          onAdd={handleAddClick}
        />
      ) : (
        <div className="space-y-4">
          
          {/* Desktop tabular view */}
          <DepartmentTable
            departments={paginatedDepartments}
            onView={handleViewClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />

          {/* Mobile card stack view */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginatedDepartments.map((dept) => (
              <DepartmentCard
                key={dept.code}
                dept={dept}
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
              
              {/* Pagination Page Number Pills */}
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

      {/* 5. Unified Add/Edit/View Details Modal Overlay */}
      <AddDepartmentModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedDept(null);
        }}
        mode={modalMode}
        selectedDept={selectedDept}
        onSave={handleSave}
      />

      {/* 6. Destructive warning delete modal overlay */}
      <DeleteDepartmentModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedDept(null);
        }}
        selectedDept={selectedDept}
        onConfirm={handleDeleteConfirm}
      />

    </div>
  );
}
