import React from 'react';
import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import AttendanceStatusBadge from './AttendanceStatusBadge';
import AttendanceActions from './AttendanceActions';

const getInitials = (name) => {
  if (!name) return '';
  const cleanedName = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, '');
  const parts = cleanedName.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const renderStudentAvatar = (name) => {
  const initials = getInitials(name);
  return (
    <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-extrabold text-[9px] font-mono shadow-xs border border-blue-200/20 shrink-0">
      {initials}
    </div>
  );
};

export default function AttendanceTable({
  records = [],
  sortBy = 'roll-asc',
  onSortChange,
  onView,
  onEdit,
  onDelete
}) {

  const renderSortIcon = (fieldKey) => {
    if (!onSortChange) return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />;

    const isCurrentField = sortBy.startsWith(fieldKey);
    if (!isCurrentField) {
      return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 opacity-40 group-hover/header:opacity-80 transition-opacity" />;
    }

    return sortBy.endsWith('asc') ? (
      <ChevronUp className="w-3.5 h-3.5 text-blue-600 font-bold" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-blue-600 font-bold" />
    );
  };

  const handleHeaderClick = (fieldKey) => {
    if (!onSortChange) return;

    if (sortBy.startsWith(fieldKey)) {
      const nextDir = sortBy.endsWith('asc') ? 'desc' : 'asc';
      onSortChange(`${fieldKey}-${nextDir}`);
    } else {
      onSortChange(`${fieldKey}-asc`);
    }
  };

  return (
    <div className="hidden md:block w-full overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-ambient select-none">
      <div className="overflow-x-auto max-h-[580px] overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-500">
              
              {/* Roll No */}
              <th 
                onClick={() => handleHeaderClick('roll')}
                className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Roll No</span>
                  {renderSortIcon('roll')}
                </div>
              </th>

              {/* Student Name */}
              <th 
                onClick={() => handleHeaderClick('name')}
                className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Student Name</span>
                  {renderSortIcon('name')}
                </div>
              </th>

              {/* Department */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold">Department</th>
              
              {/* Course */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold">Course</th>

              {/* Semester */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold">Semester</th>

              {/* Subject */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold">Subject</th>

              {/* Teacher */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold">Teacher</th>

              {/* Date */}
              <th 
                onClick={() => handleHeaderClick('date')}
                className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Date</span>
                  {renderSortIcon('date')}
                </div>
              </th>

              {/* Status */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold text-center">Status</th>

              {/* Time */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold">Time</th>

              {/* Percentage */}
              <th 
                onClick={() => handleHeaderClick('percentage')}
                className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold text-center cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Attendance %</span>
                  {renderSortIcon('percentage')}
                </div>
              </th>
              
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
            {records.map((item) => {
              const isLowAttendance = item.percentage < 75;

              return (
                <tr
                  key={`${item.rollNo}-${item.subject}-${item.date}`}
                  className="odd:bg-white even:bg-slate-50/30 hover:bg-blue-50/50 hover:shadow-[0_4px_16px_-4px_rgba(37,99,235,0.08)] transition-all duration-220 group"
                >
                  {/* Roll No */}
                  <td className="py-5.5 px-5 font-bold text-slate-900 font-mono text-xs">
                    {item.rollNo}
                  </td>

                  {/* Student Name */}
                  <td className="py-5.5 px-5">
                    <div className="flex items-center gap-2">
                      {renderStudentAvatar(item.studentName)}
                      <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-250">
                        {item.studentName}
                      </span>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-5.5 px-5">
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {item.department}
                    </span>
                  </td>

                  {/* Course */}
                  <td className="py-5.5 px-5">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                      {item.course}
                    </span>
                  </td>

                  {/* Semester */}
                  <td className="py-5.5 px-5 text-slate-500 text-xs font-semibold">
                    {item.semester}
                  </td>

                  {/* Subject */}
                  <td className="py-5.5 px-5 text-slate-800 font-bold truncate max-w-[150px]" title={item.subject}>
                    {item.subject}
                  </td>

                  {/* Teacher */}
                  <td className="py-5.5 px-5 text-slate-600 font-semibold truncate max-w-[150px]" title={item.teacher}>
                    {item.teacher}
                  </td>

                  {/* Date */}
                  <td className="py-5.5 px-5 text-slate-600 font-semibold font-mono text-xs whitespace-nowrap">
                    {item.date}
                  </td>

                  {/* Attendance Status Badge */}
                  <td className="py-5.5 px-5 text-center">
                    <AttendanceStatusBadge status={item.status} />
                  </td>

                  {/* Time */}
                  <td className="py-5.5 px-5 text-slate-600 font-semibold font-mono text-xs whitespace-nowrap">
                    {item.time}
                  </td>

                  {/* Attendance Percentage with Mini Progress Bar */}
                  <td className="py-5.5 px-5 text-center">
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <span className={`font-bold font-mono text-xs ${isLowAttendance ? 'text-rose-600 font-black' : 'text-slate-850'}`}>
                        {item.percentage}%
                      </span>
                      <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden shrink-0">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isLowAttendance ? 'bg-rose-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-5.5 px-5 text-right">
                    <AttendanceActions
                      item={item}
                      onView={onView}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
