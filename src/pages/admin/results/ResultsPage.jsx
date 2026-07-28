import React, { useState, useEffect } from 'react';
import { Eye, Edit2, Trash2, Send, X, AlertTriangle, Award, Save } from 'lucide-react';
import ResultsStats from './components/ResultsStats';
import ResultsFilters from './components/ResultsFilters';
import ResultsTable from './components/ResultsTable';
import ResultStatusBadge from './components/ResultStatusBadge';
import GradeBadge from './components/GradeBadge';
import PublishResultModal from './components/PublishResultModal';
import { initialResults, STATUSES } from './data/resultsData';

const getInitials = (name) => {
  if (!name) return '';
  const parts = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, '').split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export default function ResultsPage() {
  const [results, setResults] = useState(initialResults);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [examTypeFilter, setExamTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('roll-asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Modals
  const [selectedResult, setSelectedResult] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [editMarks, setEditMarks] = useState('');
  const [editStatus, setEditStatus] = useState('Draft');

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, deptFilter, courseFilter, semesterFilter, classFilter, subjectFilter, examTypeFilter, statusFilter, sortBy]);

  // Header action subscription
  useEffect(() => {
    const handler = (e) => {
      if (e.detail === 'PUBLISH_RESULTS') {
        alert('Opening Bulk Results Publisher — select records to publish all pending & draft results at once.');
      }
    };
    window.addEventListener('header-action', handler);
    return () => window.removeEventListener('header-action', handler);
  }, []);

  const handleReset = () => {
    setSearchTerm(''); setDeptFilter('All'); setCourseFilter('All');
    setSemesterFilter('All'); setClassFilter('All'); setSubjectFilter('All');
    setExamTypeFilter('All'); setStatusFilter('All'); setSortBy('roll-asc');
    setCurrentPage(1);
  };

  const handleRefresh = () => { handleReset(); alert('Results database refreshed.'); };
  const handleExport = () => alert('Exporting examination results report to Excel (.xlsx)...');

  const handleView = (item) => { setSelectedResult(item); setIsViewOpen(true); };
  const handleEdit = (item) => { setSelectedResult(item); setEditMarks(String(item.marksObtained)); setEditStatus(item.status); setIsEditOpen(true); };
  const handleDelete = (item) => { setSelectedResult(item); setIsDeleteOpen(true); };
  const handlePublish = (item) => { setSelectedResult(item); setIsPublishOpen(true); };

  const computeGrade = (pct) => {
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B+';
    if (pct >= 60) return 'B';
    if (pct >= 50) return 'C';
    if (pct >= 40) return 'D';
    return 'F';
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const marks = Math.max(0, Math.min(Number(editMarks), selectedResult.totalMarks));
    const pct = Math.round((marks / selectedResult.totalMarks) * 100);
    const grade = computeGrade(pct);
    const newStatus = grade === 'F' ? 'Failed' : editStatus === 'Failed' ? 'Draft' : editStatus;

    setResults(results.map((r) => {
      const isMatch = r.rollNo === selectedResult.rollNo && r.subject === selectedResult.subject && r.examType === selectedResult.examType;
      return isMatch ? { ...r, marksObtained: marks, percentage: pct, grade, status: newStatus } : r;
    }));
    setIsEditOpen(false);
    setSelectedResult(null);
  };

  const handlePublishConfirm = () => {
    setResults(results.map((r) => {
      const isMatch = r.rollNo === selectedResult.rollNo && r.subject === selectedResult.subject && r.examType === selectedResult.examType;
      return isMatch ? { ...r, status: 'Published', publishedDate: new Date().toISOString().split('T')[0] } : r;
    }));
    setIsPublishOpen(false);
    setSelectedResult(null);
  };

  const handleDeleteConfirm = () => {
    setResults(results.filter((r) => !(r.rollNo === selectedResult.rollNo && r.subject === selectedResult.subject && r.examType === selectedResult.examType)));
    setIsDeleteOpen(false);
    setSelectedResult(null);
  };

  // Filtering
  const filtered = results.filter((r) => {
    const q = searchTerm.toLowerCase();
    const matchSearch = r.studentName.toLowerCase().includes(q) || r.rollNo.includes(q) || r.subject.toLowerCase().includes(q);
    return matchSearch &&
      (deptFilter === 'All' || r.department === deptFilter) &&
      (courseFilter === 'All' || r.course === courseFilter) &&
      (semesterFilter === 'All' || r.semester === semesterFilter) &&
      (classFilter === 'All' || r.classCode === classFilter) &&
      (subjectFilter === 'All' || r.subject === subjectFilter) &&
      (examTypeFilter === 'All' || r.examType === examTypeFilter) &&
      (statusFilter === 'All' || r.status === statusFilter);
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'roll-asc': return a.rollNo.localeCompare(b.rollNo);
      case 'roll-desc': return b.rollNo.localeCompare(a.rollNo);
      case 'name-asc': return a.studentName.localeCompare(b.studentName);
      case 'name-desc': return b.studentName.localeCompare(a.studentName);
      case 'marks-asc': return a.marksObtained - b.marksObtained;
      case 'marks-desc': return b.marksObtained - a.marksObtained;
      case 'percentage-asc': return a.percentage - b.percentage;
      case 'percentage-desc': return b.percentage - a.percentage;
      case 'date-asc': return a.publishedDate.localeCompare(b.publishedDate);
      case 'date-desc': return b.publishedDate.localeCompare(a.publishedDate);
      default: return 0;
    }
  });

  const totalEntries = sorted.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginated = sorted.slice(startIndex, startIndex + entriesPerPage);

  const isSearchActive = searchTerm !== '' || deptFilter !== 'All' || courseFilter !== 'All' ||
    semesterFilter !== 'All' || classFilter !== 'All' || subjectFilter !== 'All' ||
    examTypeFilter !== 'All' || statusFilter !== 'All';

  return (
    <div className="space-y-6">

      {/* Stats Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Results Management</h3>
        <ResultsStats results={results} />
      </div>

      {/* Filters Toolbar */}
      <ResultsFilters
        searchTerm={searchTerm} onSearchChange={setSearchTerm}
        deptFilter={deptFilter} onDeptChange={setDeptFilter}
        courseFilter={courseFilter} onCourseChange={setCourseFilter}
        semesterFilter={semesterFilter} onSemesterChange={setSemesterFilter}
        classFilter={classFilter} onClassChange={setClassFilter}
        subjectFilter={subjectFilter} onSubjectChange={setSubjectFilter}
        examTypeFilter={examTypeFilter} onExamTypeChange={setExamTypeFilter}
        statusFilter={statusFilter} onStatusChange={setStatusFilter}
        onRefresh={handleRefresh} onExport={handleExport} onReset={handleReset}
      />

      {/* Content */}
      <div className="pt-2.5">
        {totalEntries === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 md:p-12 bg-white rounded-2xl border border-slate-200/80 shadow-ambient select-none text-center max-w-xl mx-auto space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center shadow-xs">
              <Award className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">No result records found.</h3>
              <p className="text-sm text-slate-500 font-medium max-w-sm leading-relaxed">
                {isSearchActive
                  ? 'Try adjusting your filters or search query to find exam records.'
                  : 'Start by uploading semester examination marks and publishing results.'}
              </p>
            </div>
            {isSearchActive && (
              <button type="button" onClick={handleReset} className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-2xs">
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">

            {/* Desktop Table */}
            <ResultsTable
              results={paginated}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onView={handleView}
              onEdit={handleEdit}
              onPublish={handlePublish}
              onDelete={handleDelete}
            />

            {/* Mobile Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {paginated.map((item) => {
                const isFail = item.grade === 'F';
                return (
                  <div
                    key={`${item.rollNo}-${item.subject}-${item.examType}`}
                    className="relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight hover:shadow-ambient-hover hover:border-slate-300 transition-all duration-300 ease-out select-none overflow-hidden space-y-4"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/40 to-transparent opacity-60" />

                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 text-[10px] rounded-lg bg-blue-50 text-blue-600 border border-blue-100/60 font-mono font-bold leading-none inline-block">
                          {item.rollNo}
                        </span>
                        <h4 className="text-sm font-bold text-slate-800 tracking-tight pt-1 leading-snug">
                          {item.studentName}
                        </h4>
                        <p className="text-xs text-slate-500 font-semibold">{item.subject} · {item.examType}</p>
                      </div>
                      <ResultStatusBadge status={item.status} />
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs font-semibold">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Marks</span>
                        <p className={`font-black font-mono text-sm pt-1 ${isFail ? 'text-rose-600' : 'text-slate-800'}`}>
                          {item.marksObtained}/{item.totalMarks}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Grade</span>
                        <div className="pt-1"><GradeBadge grade={item.grade} /></div>
                      </div>
                      <div className="col-span-2 space-y-1.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Score</span>
                        <div className="flex items-center gap-2 pt-1">
                          <span className={`font-bold font-mono text-xs ${isFail ? 'text-rose-600' : 'text-slate-800'}`}>{item.percentage}%</span>
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${item.percentage >= 75 ? 'bg-blue-500' : item.percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${item.percentage}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-bold">{item.department} · {item.course} · {item.semester}</span>
                      <div className="flex items-center gap-1.5">
                        <button type="button" onClick={() => handleView(item)} className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-90">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => handleEdit(item)} className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-600 hover:border-amber-200 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-90">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {item.status !== 'Published' && (
                          <button type="button" onClick={() => handlePublish(item)} className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-90">
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                        <button type="button" onClick={() => handleDelete(item)} className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-90">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-slate-200/60 text-xs font-bold text-slate-500 select-none">
              <div>Showing {Math.min(startIndex + 1, totalEntries)} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries} entries</div>
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3.5 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white text-slate-700 active:scale-95 transition-all cursor-pointer disabled:cursor-not-allowed">
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pg = idx + 1;
                    return (
                      <button key={pg} type="button" onClick={() => setCurrentPage(pg)}
                        className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                          pg === currentPage ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' : 'border border-slate-200 text-slate-600 hover:bg-slate-50 bg-white'
                        }`}>
                        {pg}
                      </button>
                    );
                  })}
                </div>
                <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3.5 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white text-slate-700 active:scale-95 transition-all cursor-pointer disabled:cursor-not-allowed">
                  Next
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Publish Modal */}
      <PublishResultModal
        isOpen={isPublishOpen}
        record={selectedResult}
        onConfirm={handlePublishConfirm}
        onClose={() => { setIsPublishOpen(false); setSelectedResult(null); }}
      />

      {/* View Modal */}
      {isViewOpen && selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsViewOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" />
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            <div className="h-1.5 w-full bg-blue-600" />
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
                  <Award className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Result Details</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Academic Score Card</p>
                </div>
              </div>
              <button onClick={() => setIsViewOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-gradient-to-b from-blue-50/50 to-white border border-blue-100/40 shadow-2xs relative">
                <div className="absolute top-4 right-4">
                  <ResultStatusBadge status={selectedResult.status} />
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-extrabold text-sm font-mono shadow-md">
                  {getInitials(selectedResult.studentName)}
                </div>
                <h4 className="text-base font-bold text-slate-800 tracking-tight mt-3">{selectedResult.studentName}</h4>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">Roll No: {selectedResult.rollNo}</p>
                <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
                  <span className="inline-flex px-2.5 py-1 text-xs rounded-lg bg-blue-50 text-blue-600 border border-blue-100/60 font-bold leading-none">{selectedResult.department}</span>
                  <span className="inline-flex px-2.5 py-1 text-xs rounded-lg bg-slate-50 text-slate-600 border border-slate-200/60 font-bold leading-none">{selectedResult.course} · {selectedResult.semester}</span>
                </div>
              </div>
              <div className="space-y-3">
                <h5 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-100 pb-1.5">Examination Details</h5>
                <div className="space-y-2.5 text-xs text-slate-700 font-semibold">
                  <p className="flex justify-between"><span>Subject:</span> <strong>{selectedResult.subject}</strong></p>
                  <p className="flex justify-between"><span>Exam Type:</span> <strong>{selectedResult.examType}</strong></p>
                  <p className="flex justify-between"><span>Marks Obtained:</span>
                    <strong className={selectedResult.grade === 'F' ? 'text-rose-600' : 'text-slate-800'}>
                      {selectedResult.marksObtained}/{selectedResult.totalMarks}
                    </strong>
                  </p>
                  <p className="flex justify-between items-center"><span>Grade:</span> <GradeBadge grade={selectedResult.grade} /></p>
                  <p className="flex justify-between"><span>Percentage:</span>
                    <strong className={selectedResult.percentage < 50 ? 'text-rose-600' : 'text-slate-800'}>{selectedResult.percentage}%</strong>
                  </p>
                  <p className="flex justify-between"><span>Published Date:</span> <strong className="font-mono">{selectedResult.publishedDate}</strong></p>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button onClick={() => setIsViewOpen(false)} className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsEditOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" />
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            <div className="h-1.5 w-full bg-blue-600" />
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
                  <Edit2 className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Edit Result</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Marks Override</p>
                </div>
              </div>
              <button onClick={() => setIsEditOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-500">Student</p>
                <p className="text-sm font-bold text-slate-800">{selectedResult.studentName} ({selectedResult.rollNo})</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-500">Subject & Exam</p>
                <p className="text-xs font-semibold text-slate-600">{selectedResult.subject} · {selectedResult.examType}</p>
              </div>
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Marks Obtained (out of {selectedResult.totalMarks})
                </label>
                <input
                  type="number"
                  min={0}
                  max={selectedResult.totalMarks}
                  value={editMarks}
                  onChange={(e) => setEditMarks(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 font-bold text-slate-800"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Status</label>
                <div className="relative">
                  <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700">
                    {STATUSES.filter(s => s !== 'Failed').map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">▼</span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 mt-4">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer">
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsDeleteOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" />
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            <div className="h-1.5 w-full bg-red-500" />
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center border border-red-100/60">
                  <AlertTriangle className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Delete Result</h3>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Destructive Action</p>
                </div>
              </div>
              <button onClick={() => setIsDeleteOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center shadow-xs mx-auto animate-bounce">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-slate-800">Are you absolutely sure?</h4>
                <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                  This will permanently remove the <strong className="text-slate-700">{selectedResult.examType}</strong> result for{' '}
                  <strong className="text-slate-700">{selectedResult.studentName}</strong> in{' '}
                  <strong className="text-slate-700">{selectedResult.subject}</strong>.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2.5 p-5 border-t border-slate-100 bg-slate-50/50">
              <button onClick={() => setIsDeleteOpen(false)} className="px-4.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-500/20 active:scale-95 transition-all cursor-pointer">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
