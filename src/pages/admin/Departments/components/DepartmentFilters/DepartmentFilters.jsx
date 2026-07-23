import React from 'react';
import { Search, RotateCcw, Filter } from 'lucide-react';
import './DepartmentFilters.css';

/**
 * DepartmentFilters Component
 * Renders the search bar and filter controls for filtering departments.
 * 
 * @param {Object} props
 * @param {string} props.searchTerm - Current search term
 * @param {Function} props.onSearchChange - Handler for search input change
 * @param {string} props.statusFilter - Current status filter value ("All" | "Active" | "Inactive")
 * @param {Function} props.onStatusChange - Handler for status filter dropdown change
 * @param {Function} props.onReset - Handler to clear/reset all filters
 */
export default function DepartmentFilters({
  searchTerm = '',
  onSearchChange,
  statusFilter = 'All',
  onStatusChange,
  onReset
}) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
      
      {/* Left Column: Search & Filter Dropdowns */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
        
        {/* Search Input wrapper */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500">
            <Search className="w-4.5 h-4.5" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search departments by code, name, or HOD..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none transition-all duration-200 font-medium text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Status Select dropdown */}
        <div className="relative min-w-[140px]">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full pl-3 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none appearance-none transition-all duration-200 font-semibold text-slate-700 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Inactive">Inactive Only</option>
          </select>
          {/* Custom Dropdown Arrow */}
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <Filter className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Future placeholder filter elements can be easily injected here */}
      </div>

      {/* Right Column: Reset Button */}
      <button
        type="button"
        onClick={onReset}
        disabled={!searchTerm && statusFilter === 'All'}
        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 border rounded-xl text-xs font-bold transition-all duration-200 select-none cursor-pointer ${
          searchTerm || statusFilter !== 'All'
            ? 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 active:scale-95 shadow-2xs'
            : 'border-slate-100 bg-slate-50/50 text-slate-400 cursor-not-allowed'
        }`}
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters</span>
      </button>

    </div>
  );
}
