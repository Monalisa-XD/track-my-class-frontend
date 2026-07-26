import React, { useState, useEffect } from 'react';
import { X, Save, Eye } from 'lucide-react';
import { DEPARTMENTS, COURSES, SEMESTERS } from '../../data/subjectsData';
import './AddSubjectModal.css';

export default function AddSubjectModal({
  isOpen = false,
  onClose,
  mode = 'add', // "add" | "view"
  selectedSubject = null,
  onSave
}) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [course, setCourse] = useState('MCA');
  const [semester, setSemester] = useState('Semester 1');
  const [type, setType] = useState('Theory');
  const [credits, setCredits] = useState('4');
  const [status, setStatus] = useState('Active');
  const [description, setDescription] = useState('');
  const [textbooks, setTextbooks] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (selectedSubject && mode === 'view') {
        setCode(selectedSubject.code || '');
        setName(selectedSubject.name || '');
        setDepartment(selectedSubject.department || 'CSE');
        setCourse(selectedSubject.course || 'MCA');
        setSemester(selectedSubject.semester || 'Semester 1');
        setType(selectedSubject.type || 'Theory');
        setCredits(String(selectedSubject.credits || '4'));
        setStatus(selectedSubject.status || 'Active');
        setDescription(selectedSubject.description || '');
        setTextbooks(selectedSubject.textbooks || '');
      } else {
        setCode('');
        setName('');
        setDepartment('CSE');
        setCourse('MCA');
        setSemester('Semester 1');
        setType('Theory');
        setCredits('4');
        setStatus('Active');
        setDescription('');
        setTextbooks('');
      }
      setErrors({});
    }
  }, [isOpen, selectedSubject, mode]);

  if (!isOpen) return null;

  const isViewMode = mode === 'view';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isViewMode) return;

    const newErrors = {};
    if (!code.trim()) newErrors.code = 'Subject Code is required';
    if (!name.trim()) newErrors.name = 'Subject Name is required';
    if (!credits.trim() || isNaN(credits) || parseInt(credits, 10) <= 0) {
      newErrors.credits = 'Valid Credits is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      code: code.trim().toUpperCase(),
      name: name.trim(),
      department,
      course,
      semester,
      type,
      credits: parseInt(credits, 10),
      status,
      createdDate: selectedSubject?.createdDate ?? new Date().toISOString().split('T')[0],
      description: description.trim(),
      textbooks: textbooks.trim()
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
                {isViewMode ? 'Subject Details' : 'Add New Subject'}
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Code Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Subject Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isViewMode}
                placeholder="e.g. MCA101"
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
                Subject Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isViewMode}
                placeholder="e.g. Discrete Mathematics"
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-semibold ${
                  errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                } ${isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed text-slate-500' : 'text-slate-800'}`}
              />
              {errors.name && (
                <p className="text-xs font-bold text-red-500">{errors.name}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  {DEPARTMENTS.map((d) => (
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

            {/* Course Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Course Program <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  disabled={isViewMode}
                  className={`w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700 ${
                    isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed' : ''
                  }`}
                >
                  {COURSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Semester Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Semester Allocation
              </label>
              <div className="relative">
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  disabled={isViewMode}
                  className={`w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700 ${
                    isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed' : ''
                  }`}
                >
                  {SEMESTERS.map((s) => (
                    <option key={s} value={s}>
                      {s}
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

            {/* Type Select (Theory/Lab) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Subject Type
              </label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  disabled={isViewMode}
                  className={`w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700 ${
                    isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed' : ''
                  }`}
                >
                  <option value="Theory">Theory Lecture</option>
                  <option value="Lab">Lab / Practical</option>
                </select>
                {!isViewMode && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                    ▼
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Credits Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Subject Credits <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                disabled={isViewMode}
                placeholder="e.g. 4"
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-semibold ${
                  errors.credits ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                } ${isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed text-slate-500' : 'text-slate-800'}`}
              />
              {errors.credits && (
                <p className="text-xs font-bold text-red-500">{errors.credits}</p>
              )}
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
          </div>

          {/* Description Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Description / Course Outline
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isViewMode}
              placeholder="Provide a brief overview of syllabus modules..."
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 font-semibold ${
                isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed text-slate-500' : 'text-slate-800'
              }`}
            />
          </div>

          {/* Recommended Textbooks */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Recommended Textbooks / References
            </label>
            <input
              type="text"
              value={textbooks}
              onChange={(e) => setTextbooks(e.target.value)}
              disabled={isViewMode}
              placeholder="e.g. Discrete Mathematics by Kenneth Rosen"
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 font-semibold ${
                isViewMode ? 'opacity-70 bg-slate-100 cursor-not-allowed text-slate-500' : 'text-slate-800'
              }`}
            />
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
              <span>Create Subject</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
