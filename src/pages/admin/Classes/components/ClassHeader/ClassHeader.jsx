import React from 'react';
import { Plus, ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ClassHeader.css';

export default function ClassHeader({ onAddClick }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
      <div className="space-y-1.5">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link to="/admin/dashboard" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" />
            <span>Dashboard</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-600">Classes</span>
        </nav>

        {/* Title & Subtitle */}
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Class Config Directory
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Create class sections, allocate classrooms, assign class teachers, and configure learning tracks.
        </p>
      </div>

      {/* Add Class Button */}
      <button
        type="button"
        onClick={onAddClick}
        className="inline-flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
      >
        <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
        <span>Add Class</span>
      </button>
    </div>
  );
}
