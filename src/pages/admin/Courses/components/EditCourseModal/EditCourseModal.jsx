import React, { useState, useEffect } from 'react';
import { X, Save, Edit } from 'lucide-react';
import './EditCourseModal.css';

/**
 * EditCourseModal Component
 * Prepopulated modal form for editing course properties.
 */
export default function EditCourseModal({
  isOpen = false,
  onClose,
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
    if (isOpen && selectedCourse) {
      setCode(selectedCourse.code || '');
      setName(selectedCourse.name || '');
      setDepartment(selectedCourse.department || 'CSE');
      setDuration(selectedCourse.duration || '2 Years');
      setStatus(selectedCourse.status || 'Active');
      setErrors({});
    }
  }, [isOpen, selectedCourse]);

  if (!isOpen || !selectedCourse) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Course Name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...selectedCourse,
      name: name.trim(),
      department,
      duration,
      status
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
              <Edit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight">
                Edit Course Details
              </h3>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                Update academic record
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
          
          {/* Code Input (Disabled) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Course Code
            </label>
            <input
              type="text"
              value={code}
              disabled
              className="w-full px-3.5 py-2 text-sm bg-slate-100 border border-slate-200 rounded-xl outline-none opacity-70 cursor-not-allowed text-slate-500 font-semibold uppercase"
            />
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
              placeholder="e.g. Master of Computer Application"
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-semibold ${
                errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
              } text-slate-800`}
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
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d} Department
                  </option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                ▼
              </span>
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
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                ▼
              </span>
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
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                ▼
              </span>
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
            Cancel
          </button>
          
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Update Details</span>
          </button>
        </div>

      </div>
    </div>
  );
}
