import React from 'react';
import { ChevronsUpDown, ChevronUp, ChevronDown, Eye, Edit2, Trash2, Send } from 'lucide-react';
import ResultStatusBadge from './ResultStatusBadge';
import GradeBadge from './GradeBadge';

const getInitials = (name) => {
  if (!name) return '';
  const parts = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, '').split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const StudentAvatar = ({ name }) => (
  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-extrabold text-[9px] font-mono shadow-xs border border-blue-200/20 shrink-0">
    {getInitials(name)}
  </div>
);

export default function ResultsTable({ results = [], sortBy = 'roll-asc', onSortChange, onView, onEdit, onPublish, onDelete }) {

  const renderSortIcon = (fieldKey) => {
    const isCurrent = sortBy.startsWith(fieldKey);
    if (!isCurrent) return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 opacity-40 group-hover/th:opacity-80 transition-opacity" />;
    return sortBy.endsWith('asc')
      ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" />
      : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />;
  };

  const handleHeader = (field) => {
    if (!onSortChange) return;
    if (sortBy.startsWith(field)) {
      onSortChange(`${field}-${sortBy.endsWith('asc') ? 'desc' : 'asc'}`);
    } else {
      onSortChange(`${field}-asc`);
    }
  };

  const thBase = 'sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-4 font-extrabold text-xs uppercase tracking-wider text-slate-500';
  const thSort = `${thBase} cursor-pointer group/th hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none`;

  return (
    <div className="hidden md:block w-full overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-ambient select-none">
      <div className="overflow-x-auto max-h-[620px] overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th onClick={() => handleHeader('roll')} className={thSort}>
                <div className="flex items-center gap-1">Roll No {renderSortIcon('roll')}</div>
              </th>
              <th onClick={() => handleHeader('name')} className={thSort}>
                <div className="flex items-center gap-1">Student Name {renderSortIcon('name')}</div>
              </th>
              <th className={thBase}>Dept</th>
              <th className={thBase}>Course</th>
              <th className={thBase}>Semester</th>
              <th className={thBase}>Subject</th>
              <th onClick={() => handleHeader('marks')} className={thSort}>
                <div className="flex items-center gap-1">Marks {renderSortIcon('marks')}</div>
              </th>
              <th className={thBase}>Grade</th>
              <th onClick={() => handleHeader('percentage')} className={thSort}>
                <div className="flex items-center justify-center gap-1">Score % {renderSortIcon('percentage')}</div>
              </th>
              <th className={`${thBase} text-center`}>Status</th>
              <th onClick={() => handleHeader('date')} className={thSort}>
                <div className="flex items-center gap-1">Published {renderSortIcon('date')}</div>
              </th>
              <th className={`${thBase} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {results.map((item) => {
              const isFail = item.grade === 'F' || item.status === 'Failed';
              const scoreColor = item.percentage >= 75 ? 'bg-blue-500' : item.percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500';
              const scoreText = item.percentage >= 75 ? 'text-slate-850' : item.percentage >= 50 ? 'text-amber-600' : 'text-rose-600 font-black';

              return (
                <tr
                  key={`${item.rollNo}-${item.subject}-${item.examType}`}
                  className="odd:bg-white even:bg-slate-50/30 hover:bg-blue-50/50 hover:shadow-[0_4px_16px_-4px_rgba(37,99,235,0.08)] transition-all duration-220 group"
                >
                  <td className="py-5.5 px-4 font-mono font-bold text-xs text-slate-900">
                    {item.rollNo}
                  </td>

                  <td className="py-5.5 px-4">
                    <div className="flex items-center gap-2">
                      <StudentAvatar name={item.studentName} />
                      <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200 whitespace-nowrap">
                        {item.studentName}
                      </span>
                    </div>
                  </td>

                  <td className="py-5.5 px-4">
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {item.department}
                    </span>
                  </td>

                  <td className="py-5.5 px-4">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                      {item.course}
                    </span>
                  </td>

                  <td className="py-5.5 px-4 text-xs text-slate-500 font-semibold whitespace-nowrap">
                    {item.semester}
                  </td>

                  <td className="py-5.5 px-4 font-bold text-slate-800 max-w-[140px] truncate" title={item.subject}>
                    {item.subject}
                  </td>

                  <td className="py-5.5 px-4">
                    <span className={`font-black font-mono text-sm ${isFail ? 'text-rose-600' : 'text-slate-800'}`}>
                      {item.marksObtained}
                      <span className="text-slate-400 font-semibold text-xs">/{item.totalMarks}</span>
                    </span>
                  </td>

                  <td className="py-5.5 px-4">
                    <GradeBadge grade={item.grade} />
                  </td>

                  <td className="py-5.5 px-4 text-center">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className={`font-bold font-mono text-xs ${scoreText}`}>
                        {item.percentage}%
                      </span>
                      <div className="w-14 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-500 ${scoreColor}`} style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  </td>

                  <td className="py-5.5 px-4 text-center">
                    <ResultStatusBadge status={item.status} />
                  </td>

                  <td className="py-5.5 px-4 text-xs font-mono text-slate-600 font-semibold whitespace-nowrap">
                    {item.publishedDate}
                  </td>

                  <td className="py-5.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button type="button" onClick={() => onView && onView(item)} title="View details"
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => onEdit && onEdit(item)} title="Edit result"
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-600 hover:border-amber-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {item.status !== 'Published' && (
                        <button type="button" onClick={() => onPublish && onPublish(item)} title="Publish result"
                          className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90">
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      <button type="button" onClick={() => onDelete && onDelete(item)} title="Delete result"
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
