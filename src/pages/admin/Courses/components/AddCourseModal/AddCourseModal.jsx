import React, { useState, useEffect } from 'react';
import { X, Save, Eye } from 'lucide-react';
import './AddCourseModal.css';

/**
 * AddCourseModal Component
 * Form modal overlay supporting Add (input) and View details (read-only) modes.
 */
export default function AddCourseModal({
  isOpen = false,
  onClose,
  mode = 'add', // "add" | "view"
  selectedCourse = null,
  onSave,
  departments = ['CSE', 'ETC', 'EE', 'ME', 'CE', 'IT']
}) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [duration, setDuration] = useState('2 Years');
  const [status, setStatus] = useState('Active');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (selectedCourse && mode === 'view') {
        setCode(selectedCourse.code || '');
        setName(selectedCourse.name || '');
        setDepartment(selectedCourse.department || 'CSE');
        setDuration(selectedCourse.duration || '2 Years');
        setStatus(selectedCourse.status || 'Active');
      } else {
        setCode('');
        setName('');
        setDepartment('CSE');
        setDuration('2 Years');
        setStatus('Active');
      }
      setErrors({});
    }
  }, [isOpen, selectedCourse, mode]);

  if (!isOpen) return null;

  const isViewMode = mode === 'view';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isViewMode) return;

    const newErrors = {};
    if (!code.trim()) newErrors.code = 'Course Code is required';
    if (!name.trim()) newErrors.name = 'Course Name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      code: code.trim().toUpperCase(),
      name: name.trim(),
      department,
      duration,
      status,
      totalSubjects: selectedCourse?.totalSubjects ?? 0,
      totalStudents: selectedCourse?.totalStudents ?? 0,
      createdDate: selectedCourse?.createdDate ?? new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden transform transition-all duration-300 ease-out flex flex-col max-h-[90vh]">
        <div className="h-1.5 w-full bg-blue-600" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight">
                {isViewMode ? 'Course Details' : 'Add New Course'}
              </h3>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                {isViewMode ? 'Read-only View' : 'Academic Curriculum'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* Code Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Course Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isViewMode}
              placeholder="e.g. MCA"
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-semibold uppercase ${
                errors.code ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
              } ${isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed text-slate-500' : 'text-slate-800'}`}
            />
            {errors.code && (
              <p className="text-xs font-bold text-red-500">{errors.code}</p>
            )}
          </div>

          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isViewMode}
              placeholder="e.g. Master of Computer Application"
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-semibold ${
                errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
              } ${isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed text-slate-500' : 'text-slate-800'}`}
            />
            {errors.name && (
              <p className="text-xs font-bold text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Department Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Department <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                disabled={isViewMode}
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700 ${
                  isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed' : ''
                }`}
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d} Department
                  </option>
                ))}
              </select>
              {!isViewMode && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  ▼
                </span>
              )}
            </div>
          </div>

          {/* Duration Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Duration
            </label>
            <div className="relative">
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                disabled={isViewMode}
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700 ${
                  isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed' : ''
                }`}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
              </select>
              {!isViewMode && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  ▼
                </span>
              )}
            </div>
          </div>

          {/* Status Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Status
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={isViewMode}
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700 ${
                  isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed' : ''
                }`}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {!isViewMode && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  ▼
                </span>
              )}
            </div>
          </div>
          
        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-2.5 p-5 border-t border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
          >
            {isViewMode ? 'Close' : 'Cancel'}
          </button>
          
          {!isViewMode && (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Create Course</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
