import React, { useState, useEffect } from 'react';
import { X, Save, Eye } from 'lucide-react';
import './AddDepartmentModal.css';

/**
 * AddDepartmentModal Component
 * Unified modal window supporting Add, Edit, and View modes with form validation.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal open status
 * @param {Function} props.onClose - Modal close handler
 * @param {string} props.mode - Current mode: "add" | "edit" | "view"
 * @param {Object} props.selectedDept - Department object to load for edit/view mode
 * @param {Function} props.onSave - Save callback returning the form data
 */
export default function AddDepartmentModal({
  isOpen = false,
  onClose,
  mode = 'add',
  selectedDept = null,
  onSave
}) {
  // Form field states
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [hod, setHod] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const [errors, setErrors] = useState({});

  // Reset or populate fields when modal opens/changes
  useEffect(() => {
    if (isOpen) {
      if (selectedDept && (mode === 'edit' || mode === 'view')) {
        setCode(selectedDept.code || '');
        setName(selectedDept.name || '');
        setHod(selectedDept.hod || '');
        setDescription(selectedDept.description || '');
        setStatus(selectedDept.status || 'Active');
      } else {
        setCode('');
        setName('');
        setHod('');
        setDescription('');
        setStatus('Active');
      }
      setErrors({});
    }
  }, [isOpen, selectedDept, mode]);

  if (!isOpen) return null;

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  
  // Validation and Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isViewMode) return;

    // Simple validation
    const newErrors = {};
    if (!code.trim()) newErrors.code = 'Department Code is required';
    if (!name.trim()) newErrors.name = 'Department Name is required';
    if (!hod.trim()) newErrors.hod = 'HOD Name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call save handler
    onSave({
      code: code.trim().toUpperCase(),
      name: name.trim(),
      hod: hod.trim(),
      description: description.trim(),
      status,
      // Pass other fields if editing
      totalTeachers: selectedDept?.totalTeachers ?? 0,
      totalStudents: selectedDept?.totalStudents ?? 0,
      createdDate: selectedDept?.createdDate ?? new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Translucent Frosted Glass Overlay Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden transform transition-all duration-300 ease-out flex flex-col max-h-[90vh]">
        
        {/* Subtle Top Accent Bar */}
        <div className="h-1.5 w-full bg-blue-600" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight">
                {isViewMode ? 'Department Details' : isEditMode ? 'Edit Department' : 'Add New Department'}
              </h3>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                {isViewMode ? 'Read-only View' : 'Academic Organization'}
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

        {/* Modal Body / Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* Code Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Department Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isViewMode || isEditMode} // Cannot edit code as it is a unique key
              placeholder="e.g. CSE"
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-semibold uppercase ${
                errors.code ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
              } ${isViewMode || isEditMode ? 'opacity-70 bg-slate-100 cursor-not-allowed text-slate-500' : 'text-slate-800'}`}
            />
            {errors.code && (
              <p className="text-xs font-bold text-red-500">{errors.code}</p>
            )}
          </div>

          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Department Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isViewMode}
              placeholder="e.g. Computer Science & Engineering"
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-semibold ${
                errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
              } ${isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed text-slate-500' : 'text-slate-800'}`}
            />
            {errors.name && (
              <p className="text-xs font-bold text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Head of Department Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Head of Department (HOD) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={hod}
              onChange={(e) => setHod(e.target.value)}
              disabled={isViewMode}
              placeholder="e.g. Dr. Satya Prakash Sahoo"
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-semibold ${
                errors.hod ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
              } ${isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed text-slate-500' : 'text-slate-800'}`}
            />
            {errors.hod && (
              <p className="text-xs font-bold text-red-500">{errors.hod}</p>
            )}
          </div>

          {/* Description Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isViewMode}
              rows={3}
              placeholder="Provide a brief description of the academic objectives..."
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-medium ${
                isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed text-slate-500' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10 text-slate-850'
              }`}
            />
          </div>

          {/* Status Select dropdown */}
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
              <span>{isEditMode ? 'Update Details' : 'Create Department'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
