import React, { useState, useEffect } from 'react';
import { X, Save, Edit } from 'lucide-react';
import { DEPARTMENTS, COURSES, SEMESTERS, DAYS, TIME_SLOTS, CLASSROOMS, TEACHERS_LIST, SUBJECTS_LIST, CLASSES_LIST } from '../../data/scheduleData';
import './EditScheduleModal.css';

export default function EditScheduleModal({
  isOpen = false,
  onClose,
  onSave,
  schedule = null
}) {
  const [department, setDepartment] = useState('CSE');
  const [course, setCourse] = useState('MCA');
  const [semester, setSemester] = useState('Semester 1');
  const [classObj, setClassObj] = useState(CLASSES_LIST[0]);
  const [subject, setSubject] = useState(SUBJECTS_LIST[0]);
  const [teacher, setTeacher] = useState(TEACHERS_LIST[0]);
  const [classroom, setClassroom] = useState(CLASSROOMS[0]);
  const [day, setDay] = useState(DAYS[0]);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [status, setStatus] = useState('Active');
  const [id, setId] = useState('');
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && schedule) {
      setId(schedule.id);
      setDepartment(schedule.department);
      setCourse(schedule.course);
      setSemester(schedule.semester);
      
      const foundClass = CLASSES_LIST.find(c => c.code === schedule.classCode) || CLASSES_LIST[0];
      setClassObj(foundClass);
      
      setSubject(schedule.subject);
      setTeacher(schedule.teacher);
      setClassroom(schedule.classroom);
      setDay(schedule.day);
      setTimeSlot(schedule.timeSlot);
      setStatus(schedule.status);
      setErrors({});
    }
  }, [isOpen, schedule]);

  // Dynamically update class options when department/course change
  const filteredClasses = CLASSES_LIST.filter(c => c.dept === department && c.course === course);

  if (!isOpen || !schedule) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      id: id.trim().toUpperCase(),
      classCode: classObj.code,
      className: classObj.name,
      department,
      course,
      subject,
      teacher,
      day,
      timeSlot,
      classroom,
      semester,
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
              <Edit className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight">
                Edit Class Schedule
              </h3>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                Configuration Updates
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
          
          {/* Schedule ID - Read Only */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Schedule ID (Disabled)
            </label>
            <input
              type="text"
              value={id}
              disabled
              className="w-full px-3.5 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl outline-none transition-all duration-200 font-semibold text-slate-500 font-mono cursor-not-allowed"
            />
          </div>

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
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
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
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
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
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
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

            {/* Class Section */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Assigned Class
              </label>
              <div className="relative">
                <select
                  value={classObj ? classObj.code : ''}
                  onChange={(e) => {
                    const found = CLASSES_LIST.find(c => c.code === e.target.value);
                    if (found) setClassObj(found);
                  }}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                >
                  {filteredClasses.length > 0 ? (
                    filteredClasses.map((cls) => (
                      <option key={cls.code} value={cls.code}>
                        {cls.name}
                      </option>
                    ))
                  ) : (
                    CLASSES_LIST.map((cls) => (
                      <option key={cls.code} value={cls.code}>
                        {cls.name}
                      </option>
                    ))
                  )}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  ▼
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Subject */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Subject
              </label>
              <div className="relative">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                >
                  {SUBJECTS_LIST.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  ▼
                </span>
              </div>
            </div>

            {/* Teacher */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Assigned Teacher
              </label>
              <div className="relative">
                <select
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Classroom */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Classroom Location
              </label>
              <div className="relative">
                <select
                  value={classroom}
                  onChange={(e) => setClassroom(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
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

            {/* Status Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Status
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  ▼
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Day of Week */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Day
              </label>
              <div className="relative">
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                >
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  ▼
                </span>
              </div>
            </div>

            {/* Time Slot */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Time Slot
              </label>
              <div className="relative">
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                  ▼
                </span>
              </div>
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
            <span>Save Changes</span>
          </button>
        </div>

      </div>
    </div>
  );
}
