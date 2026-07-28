import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Users, 
  RotateCcw, 
  Search, 
  Download, 
  Eye, 
  FileText, 
  Play, 
  Book, 
  Calendar,
  AlertCircle,
  Clock,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { studentResourcesData } from './data/resourcesData';
import './StudentResources.css';

export default function StudentResources() {
  const { academicYears, semesters, subjects, types, resourcesList } = studentResourcesData;

  // Header Dropdowns State
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [selectedHeaderSubject, setSelectedHeaderSubject] = useState(subjects[0]);

  // Filters State
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterSem, setFilterSem] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Reset Filters
  const handleResetFilters = () => {
    setFilterSubject('All');
    setFilterType('All');
    setFilterSem('All');
    setSearchQuery('');
  };

  // Filter Logic
  const filteredResources = useMemo(() => {
    return resourcesList.filter(item => {
      const matchesSubject = filterSubject === 'All' || item.subject === filterSubject;
      const matchesType = filterType === 'All' || item.type === filterType;
      // sem mockup matching (using semester 3 for even subjects index as mock)
      const matchesSem = filterSem === 'All' || 
        (filterSem === 'Semester 3' && item.subject !== 'Discrete Mathematics') ||
        (filterSem === 'Semester 4' && item.subject === 'Discrete Mathematics');
      const matchesSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.faculty.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSubject && matchesType && matchesSem && matchesSearch;
    });
  }, [resourcesList, filterSubject, filterType, filterSem, searchQuery]);

  // Metrics Calculations
  const metrics = useMemo(() => {
    const total = filteredResources.length;
    let pdfs = 0;
    let assignments = 0;
    let recents = 0;

    filteredResources.forEach(item => {
      if (item.type === 'PDF' || item.title.toLowerCase().includes('pdf') || item.type === 'Notes') pdfs++;
      if (item.type === 'Assignment') assignments++;
      if (item.date.includes('07-28') || item.date.includes('07-27')) recents++;
    });

    return { total, pdfs, assignments, recents };
  }, [filteredResources]);

  // Right Panel calculations
  const popularDownloads = useMemo(() => {
    return [...resourcesList].sort((a, b) => b.downloads - a.downloads).slice(0, 3);
  }, [resourcesList]);

  const recentUploadsList = useMemo(() => {
    return [...resourcesList].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  }, [resourcesList]);

  const subjectCounts = useMemo(() => {
    const counts = {};
    resourcesList.forEach(item => {
      counts[item.subject] = (counts[item.subject] || 0) + 1;
    });
    return Object.entries(counts).map(([subj, count]) => ({ subj, count }));
  }, [resourcesList]);

  // Helper: File Type Icons
  const getTypeIcon = (type) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-5.5 h-5.5 text-rose-500" />;
      case 'PPT':
        return <Play className="w-5.5 h-5.5 text-amber-500" />;
      case 'Assignment':
        return <BookOpen className="w-5.5 h-5.5 text-blue-500" />;
      case 'Notes':
        return <Book className="w-5.5 h-5.5 text-purple-500" />;
      case 'Lab Manual':
        return <FileText className="w-5.5 h-5.5 text-emerald-500" />;
      default:
        return <FileText className="w-5.5 h-5.5 text-slate-500" />;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'PDF':
        return 'bg-rose-50 text-rose-700 border-rose-150';
      case 'PPT':
        return 'bg-amber-50 text-amber-700 border-amber-150';
      case 'Assignment':
        return 'bg-blue-50 text-blue-700 border-blue-150';
      case 'Notes':
        return 'bg-purple-50 text-purple-750 border-purple-150';
      case 'Lab Manual':
        return 'bg-emerald-50 text-emerald-700 border-emerald-150';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-150';
    }
  };

  // Download Trigger
  const handleDownload = (title) => {
    alert(`Downloading "${title}" locally...`);
  };

  const handleView = (title) => {
    alert(`Opening Preview frame for "${title}"...`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Learning Resources</h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Student Portal &nbsp;•&nbsp; <span className="text-purple-655 font-bold">Study Materials</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Subject Header Filter */}
          <div className="relative min-w-[150px]">
            <select
              value={selectedHeaderSubject}
              onChange={(e) => setSelectedHeaderSubject(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {subjects.map(subj => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <BookOpen className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Academic Year Dropdown */}
          <div className="relative min-w-[130px]">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {academicYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Semester Dropdown */}
          <div className="relative min-w-[130px]">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        {/* Total Resources */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Resources</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.total} Files</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Shared course documents</p>
          </div>
        </div>

        {/* PDFs Available */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <FileText className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PDFs / Slides</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.pdfs} Files</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Reading files count</p>
          </div>
        </div>

        {/* Assignments */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-all">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assignments</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.assignments} Tasks</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Active worksheets</p>
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-purple-ambient flex items-center gap-4 overflow-hidden hover:border-purple-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-purple-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-fuchsia-500/20 group-hover:scale-105 transition-all">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recent Uploads</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.recents} New</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Uploaded in last 48 hrs</p>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-purple-ambient inner-highlight flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 flex-wrap">
          {/* Subject Filter */}
          <div className="relative min-w-[170px]">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Subjects</option>
              {subjects.slice(1).map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="relative min-w-[140px]">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {types.map(t => (
                <option key={t} value={t}>{t === 'All' ? 'All Formats' : t}</option>
              ))}
            </select>
          </div>

          {/* Semester Filter */}
          <div className="relative min-w-[140px]">
            <select
              value={filterSem}
              onChange={(e) => setFilterSem(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Semesters</option>
              {semesters.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 min-w-[180px] max-w-[245px]">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Title / Keyword..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-purple-500 rounded-xl outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Clear Filters Action */}
        {(filterSubject !== 'All' || filterType !== 'All' || filterSem !== 'All' || searchQuery !== '') && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Main Grid Content: Roster + Right Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Side: Resource Cards Grid */}
        <div className="lg:col-span-3 space-y-4">
          {filteredResources.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none text-center max-w-xl mx-auto space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-500 border border-purple-100 flex items-center justify-center shadow-xs">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">No learning resources available</h3>
                <p className="text-sm text-slate-500 font-medium max-w-sm leading-relaxed">
                  No learning resources available.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.map(item => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient hover:border-purple-300 hover:-translate-y-[2px] transition-all select-none flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3.5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-center shrink-0">
                          {getTypeIcon(item.type)}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-400 font-mono uppercase tracking-wider">{item.subject}</h4>
                          <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-extrabold border uppercase mt-0.5 ${getTypeBadge(item.type)}`}>
                            {item.type}
                          </span>
                        </div>
                      </div>

                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-150 px-2 py-0.5 rounded text-[9px] font-bold">
                        {item.status}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <div className="space-y-1.5 select-text">
                      <h3 className="text-sm font-extrabold text-slate-850 tracking-tight leading-snug">{item.title}</h3>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-2">{item.description}</p>
                    </div>

                    {/* Meta info */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-400 pt-2 border-t border-slate-50">
                      <div>
                        <p className="uppercase text-slate-350">Faculty</p>
                        <p className="text-slate-600 font-semibold truncate mt-0.5">{item.faculty}</p>
                      </div>
                      <div className="text-right">
                        <p className="uppercase text-slate-350">Date Shared</p>
                        <p className="text-slate-600 font-semibold mt-0.5">{item.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions & File info footer */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-100/70">
                    <span className="text-[10px] font-bold text-slate-500">
                      {item.size} &nbsp;•&nbsp; {item.downloads} downloads
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleView(item.title)}
                        className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-750 hover:bg-slate-100 transition-colors cursor-pointer active:scale-95"
                        title="View Document"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownload(item.title)}
                        className="inline-flex items-center gap-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side Panel */}
        <div className="space-y-6 select-none">
          {/* Subject-wise Resource Count */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Subject Library
            </h3>

            <div className="space-y-3.5">
              {subjectCounts.map(item => (
                <div key={item.subj} className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-550 truncate pr-2">{item.subj}</span>
                  <span className="text-purple-700 font-bold bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-lg text-[10px]">
                    {item.count} Files
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Downloads */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4.5 h-4.5 text-purple-650" />
              <span>Popular Downloads</span>
            </h3>

            <div className="space-y-3">
              {popularDownloads.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleDownload(item.title)}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1 hover:border-purple-300 transition-colors cursor-pointer"
                >
                  <h4 className="text-xs font-bold text-slate-800 truncate" title={item.title}>{item.title}</h4>
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                    <span>{item.downloads} downloads</span>
                    <span>{item.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Uploads */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4.5 h-4.5 text-slate-500" />
              <span>Latest Uploads</span>
            </h3>

            <div className="space-y-3.5">
              {recentUploadsList.map(item => (
                <div key={item.id} className="flex gap-2.5 items-start text-xs border-b border-slate-50 pb-3.5 last:border-0 last:pb-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-800 truncate">{item.title}</h4>
                    <span className="text-[10px] text-slate-400 font-bold mt-1 inline-block">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
