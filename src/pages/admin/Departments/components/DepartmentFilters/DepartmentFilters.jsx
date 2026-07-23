import React from 'react';
import { Search, RotateCcw, Filter, ArrowUpDown, RefreshCw, Download, X } from 'lucide-react';
import './DepartmentFilters.css';

/**
 * DepartmentFilters Component
 * Renders the search, status filter, sort dropdown, refresh, and export toolbar.
 * 
 * @param {Object} props
 * @param {string} props.searchTerm - Current search term
 * @param {Function} props.onSearchChange - Handler for search input change
 * @param {string} props.statusFilter - Current status filter value ("All" | "Active" | "Inactive")
 * @param {Function} props.onStatusChange - Handler for status filter dropdown change
 * @param {string} props.sortBy - Selected sorting field key
 * @param {Function} props.onSortByChange - Handler for sorting selector change
 * @param {Function} props.onRefresh - Refresh button click callback
 * @param {Function} props.onExport - Export button click callback
 * @param {Function} props.onReset - Reset filters button click callback
 */
export default function DepartmentFilters({
  searchTerm = '',
  onSearchChange,
  statusFilter = 'All',
  onStatusChange,
  sortBy = 'code-asc',
  onSortByChange,
  onRefresh,
  onExport,
  onReset
}) {
  // Calculate count of active filters
  const activeFiltersCount = 
    (searchTerm.trim() !== '' ? 1 : 0) + 
    (statusFilter !== 'All' ? 1 : 0) + 
    (sortBy !== 'code-asc' ? 1 : 0);

  return (
    <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight flex flex-col xl:flex-row xl:items-center justify-between gap-4 select-none">
      
      {/* Left Area: Search, Status, and Sort Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 flex-1 flex-wrap">
        
        {/* Search input bar */}
        <div className="relative flex-1 min-w-[260px] max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4.5 h-4.5" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search departments by code, name, or HOD..."
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none transition-all duration-200 font-medium text-slate-800 placeholder-slate-400"
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

        {/* Status Dropdown selector */}
        <div className="relative min-w-[150px]">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full pl-3.5 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none appearance-none transition-all duration-200 font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Status</option>
            <option value="Inactive">Inactive Status</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <Filter className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Sorting Dropdown selector */}
        <div className="relative min-w-[170px]">
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full pl-3.5 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none appearance-none transition-all duration-200 font-semibold text-slate-700 cursor-pointer"
          >
            <option value="code-asc">Sort: Code (A-Z)</option>
            <option value="code-desc">Sort: Code (Z-A)</option>
            <option value="name-asc">Sort: Name (A-Z)</option>
            <option value="name-desc">Sort: Name (Z-A)</option>
            <option value="teachers-desc">Sort: Teachers (High-Low)</option>
            <option value="students-desc">Sort: Students (High-Low)</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>

      {/* Right Area: Action Buttons (Refresh, Export, Reset) */}
      <div className="flex items-center gap-2.5 self-end xl:self-auto shrink-0">
        
        {/* Refresh button */}
        <button
          type="button"
          onClick={onRefresh}
          className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-all duration-200 shadow-2xs active:scale-95 cursor-pointer"
          title="Refresh view list"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Export button */}
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all duration-200 shadow-2xs cursor-pointer"
          title="Export CSV / Excel report"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export</span>
        </button>

        {/* Reset Filter Button with active count badge */}
        <button
          type="button"
          onClick={onReset}
          disabled={activeFiltersCount === 0}
          className={`inline-flex items-center justify-center gap-2 px-3.5 py-2.5 border rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
            activeFiltersCount > 0
              ? 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 active:scale-95 shadow-2xs'
              : 'border-slate-100 bg-slate-50/50 text-slate-400 cursor-not-allowed'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
          
          {/* Active Filter Count Badge */}
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
