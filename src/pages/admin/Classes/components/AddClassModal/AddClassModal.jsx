import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { DEPARTMENTS, COURSES, SEMESTERS, SECTIONS, ACADEMIC_YEARS, CLASSROOMS, TEACHERS_LIST } from '../../data/classesData';
import './AddClassModal.css';

export default function AddClassModal({
  isOpen = false,
  onClose,
  onSave
}) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [course, setCourse] = useState('MCA');
  const [semester, setSemester] = useState('Semester 1');
  const [section, setSection] = useState('Section A');
  const [classTeacher, setClassTeacher] = useState(TEACHERS_LIST[0]);
  const [classroom, setClassroom] = useState(CLASSROOMS[0]);
  const [studentCount, setStudentCount] = useState('40');
  const [academicYear, setAcademicYear] = useState('2024-25');
  const [status, setStatus] = useState('Active');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setName('');
      setDepartment('CSE');
      setCourse('MCA');
      setSemester('Semester 1');
      setSection('Section A');
      setClassTeacher(TEACHERS_LIST[0]);
      setClassroom(CLASSROOMS[0]);
      setStudentCount('40');
      setAcademicYear('2024-25');
      setStatus('Active');
      setErrors({});
    }
  }, [isOpen]);

  // Dynamically update default class name when department, course, and section are changed
  useEffect(() => {
    setName(`${department} ${course} ${section}`);
    setCode(`CL-${department}-${course}-${semester.replace('Semester ', '')}${section.replace('Section ', '')}`.toUpperCase().replace(/\s+/g, ''));
  }, [department, course, semester, section]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!code.trim()) {
      newErrors.code = 'Class Code is required';
    }
    
    if (!name.trim()) newErrors.name = 'Class name is required';

    if (!studentCount || isNaN(studentCount) || parseInt(studentCount, 10) <= 0) {
      newErrors.studentCount = 'Student count must be a positive number';
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
      section,
      classTeacher,
      classroom,
      studentCount: parseInt(studentCount, 10),
      academicYear,
      status,
      createdDate: new Date().toISOString().split('T')[0]
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
              <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight">
                Add Class Configuration
              </h3>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                Academic ERP Setup
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
            {/* Department */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Department
              </label>
              <div className="relative">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                >
                  {DEPARTMENTS.map((d) => (
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

            {/* Course */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Course Program
              </label>
              <div className="relative">
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                >
                  {COURSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  ▼
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Semester */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Semester Allocation
              </label>
              <div className="relative">
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                >
                  {SEMESTERS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  ▼
                </span>
              </div>
            </div>

            {/* Section */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Class Section
              </label>
              <div className="relative">
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                >
                  {SECTIONS.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  ▼
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Class Code */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Class Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. CL-CSE-MCA-1A"
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-semibold ${
                  errors.code ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                } text-slate-800 font-mono`}
              />
              {errors.code && (
                <p className="text-xs font-bold text-red-500">{errors.code}</p>
              )}
            </div>

            {/* Class Name / display name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Class Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. CSE MCA Section A"
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-semibold ${
                  errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                } text-slate-800`}
              />
              {errors.name && (
                <p className="text-xs font-bold text-red-500">{errors.name}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Class Teacher */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Class Teacher
              </label>
              <div className="relative">
                <select
                  value={classTeacher}
                  onChange={(e) => setClassTeacher(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                >
                  {TEACHERS_LIST.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  ▼
                </span>
              </div>
            </div>

            {/* Classroom */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Classroom Location
              </label>
              <div className="relative">
                <select
                  value={classroom}
                  onChange={(e) => setClassroom(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                >
                  {CLASSROOMS.map((rm) => (
                    <option key={rm} value={rm}>
                      {rm}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  ▼
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student Count */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Enrolled Students <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={studentCount}
                onChange={(e) => setStudentCount(e.target.value)}
                placeholder="e.g. 45"
                className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-semibold ${
                  errors.studentCount ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                } text-slate-800`}
              />
              {errors.studentCount && (
                <p className="text-xs font-bold text-red-500">{errors.studentCount}</p>
              )}
            </div>

            {/* Academic Year */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Academic Year
              </label>
              <div className="relative">
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                >
                  {ACADEMIC_YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  ▼
                </span>
              </div>
            </div>
          </div>

          {/* Status Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Class Status
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
            <span>Create Class</span>
          </button>
        </div>

      </div>
    </div>
  );
}
