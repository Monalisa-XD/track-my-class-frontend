import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Download, 
  Share2, 
  Eye, 
  Search, 
  RotateCcw, 
  Upload, 
  BookOpen, 
  Layers, 
  HardDrive, 
  Flame, 
  Sparkles,
  Calendar,
  AlertCircle,
  FileCode,
  FileUp,
  User,
  Presentation,
  ClipboardList
} from 'lucide-react';
import { teacherResourcesData } from './data/resourcesData';
import './TeacherResources.css';

export default function TeacherResources() {
  const { academicYears, semesters, subjects, resourceTypes, semestersList, storageUsage, recentUploadsList, popularResources, resources } = teacherResourcesData;

  // Header Dropdown States
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [headerSubject, setHeaderSubject] = useState('All');

  // Filters State
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterSem, setFilterSem] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Logic
  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesHeaderSubject = headerSubject === 'All' || res.subject === headerSubject;
      const matchesSubject = filterSubject === 'All' || res.subject === filterSubject;
      const matchesType = filterType === 'All' || res.type === filterType;
      const matchesSem = filterSem === 'All' || res.semester === filterSem;
      const matchesSearch = searchQuery.trim() === '' || 
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        res.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesHeaderSubject && matchesSubject && matchesType && matchesSem && matchesSearch;
    });
  }, [resources, headerSubject, filterSubject, filterType, filterSem, searchQuery]);

  // Reset Filters
  const handleResetFilters = () => {
    setHeaderSubject('All');
    setFilterSubject('All');
    setFilterType('All');
    setFilterSem('All');
    setSearchQuery('');
  };

  // Summary Metrics calculations
  const metrics = useMemo(() => {
    const total = filteredResources.length;
    const pdfs = filteredResources.filter(r => r.type === 'PDF').length;
    const assignments = filteredResources.filter(r => r.type === 'Assignment').length;
    // Count uploads in the last week (mocked: those uploaded after July 24, 2026)
    const recent = filteredResources.filter(r => new Date(r.uploadedDate) >= new Date('2026-07-24')).length;

    return { total, pdfs, assignments, recent };
  }, [filteredResources]);

  // Helper: File Type Emblems
  const getFileTypeBadge = (type) => {
    switch (type) {
      case 'PDF':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'PPT':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Assignment':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Notes':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Lab Manual':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Helper: File Type Icons
  const getFileTypeIcon = (type) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-5 h-5 text-red-550" />;
      case 'PPT':
        return <Presentation className="w-5 h-5 text-amber-550" />;
      case 'Assignment':
        return <ClipboardList className="w-5 h-5 text-purple-550" />;
      case 'Notes':
        return <FileText className="w-5 h-5 text-blue-550" />;
      case 'Lab Manual':
        return <FileCode className="w-5 h-5 text-emerald-550" />;
      default:
        return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  const handleUploadClick = () => {
    alert('Launching Resource Upload Wizard. You can drag and drop study material files...');
  };

  const handleActionClick = (actionName, title) => {
    alert(`Resource action "${actionName}" triggered for "${title}".`);
  };

  // Calculate storage details
  const remainingStorage = storageUsage.total - storageUsage.used;

  return (
    <div className="space-y-6">
      {/* Filters Toolbar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-ambient select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-sm shadow-blue-400" />
          <span className="text-xs font-bold text-slate-700 tracking-wide">Material Repository</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Subject Filter inside Header */}
          <div className="relative min-w-[150px]">
            <select
              value={headerSubject}
              onChange={(e) => setHeaderSubject(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Subjects</option>
              {subjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
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
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {academicYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Local Upload Resource Button */}
          <button
            type="button"
            onClick={handleUploadClick}
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4 stroke-[2.5]" />
            <span>Upload Resource</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        {/* Total Resources */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-blue hover:border-blue-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
            <Layers className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Resources</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.total}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Study materials shared</p>
          </div>
        </div>

        {/* PDFs */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-emerald hover:border-emerald-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all">
            <FileText className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PDF Documents</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.pdfs}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Reference books & notes</p>
          </div>
        </div>

        {/* Assignments */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-amber hover:border-amber-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assignments</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.assignments}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Tasks allocated this week</p>
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-indigo hover:border-indigo-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recent Uploads</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.recent}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Uploaded past 7 days</p>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight flex flex-col xl:flex-row xl:items-center justify-between gap-4 select-none">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 flex-wrap">
          {/* Subject Filter */}
          <div className="relative min-w-[160px]">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Subjects</option>
              {subjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* Resource Type Filter */}
          <div className="relative min-w-[150px]">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Types</option>
              {resourceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Semester Filter */}
          <div className="relative min-w-[130px]">
            <select
              value={filterSem}
              onChange={(e) => setFilterSem(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Semesters</option>
              {semestersList.map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

          {/* Search Resource */}
          <div className="relative flex-1 min-w-[180px] max-w-[250px]">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Resource Title/Desc..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Clear filters action */}
        {(filterSubject !== 'All' || filterType !== 'All' || filterSem !== 'All' || searchQuery !== '' || headerSubject !== 'All') && (
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

      {/* Main Grid: Card Grid + Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Side: Cards list */}
        <div className="lg:col-span-3 space-y-4">
          {filteredResources.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200/80 shadow-ambient select-none text-center max-w-xl mx-auto space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center shadow-xs">
                <FileUp className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">No resources available</h3>
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
              {filteredResources.map((res) => {
                const isActive = res.status === 'Active';
                return (
                  <div
                    key={res.id}
                    className="relative bg-white p-5 rounded-2xl border border-slate-200/80 transition-all duration-300 ease-out select-none overflow-hidden space-y-4 shadow-ambient hover:-translate-y-[2px] hover:shadow-ambient-hover hover:border-slate-350"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        {/* Resource Type Icon */}
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border bg-slate-50 border-slate-200">
                          {getFileTypeIcon(res.type)}
                        </div>
                        <div className="min-w-0">
                          <span className={`inline-flex items-center px-2 py-0.5 text-[9px] rounded font-bold border ${getFileTypeBadge(res.type)}`}>
                            {res.type}
                          </span>
                          <h4 className="text-sm font-bold text-slate-850 tracking-tight pt-1 leading-snug truncate">
                            {res.title}
                          </h4>
                          <p className="text-[11px] text-slate-455 font-semibold mt-0.5">
                            {res.subject} &nbsp;•&nbsp; {res.semester}
                          </p>
                        </div>
                      </div>

                      {/* Active Status Badge */}
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold border ${
                        isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {res.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-2">
                      {res.description}
                    </p>

                    {/* Metadata Panel: Last Updated, Downloads, By You badge */}
                    <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-slate-100 text-[11px] font-bold text-slate-550 select-none">
                      <div className="space-y-1">
                        <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Last Updated</p>
                        <p className="text-slate-700 font-semibold">{res.uploadedDate}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Downloads</p>
                        <p className="text-slate-700 font-semibold inline-flex items-center gap-1 justify-end">
                          <Download className="w-3 h-3 text-slate-400" />
                          <span>{res.downloads} hits</span>
                        </p>
                      </div>
                    </div>

                    {/* Ownership & Size Panel */}
                    <div className="flex items-center justify-between bg-slate-50/50 p-2 rounded-xl border border-slate-100 text-[10px] font-bold text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[9px] font-extrabold text-blue-600 tracking-wider uppercase">Uploaded by You</span>
                      </div>
                      <span>Size: {res.fileSize}</span>
                    </div>

                    {/* Actions Panel with Compact Icon/Text Buttons */}
                    <div className="flex items-center justify-end gap-1.5 border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        onClick={() => handleActionClick('View', res.title)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-lg active:scale-95 transition-all cursor-pointer shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>View</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleActionClick('Download', res.title)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-lg active:scale-95 transition-all cursor-pointer shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        <span>Download</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleActionClick('Share', res.title)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-xs rounded-lg active:scale-95 transition-all cursor-pointer border border-blue-100"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side Panel */}
        <div className="space-y-6">
          {/* Storage Usage Widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <HardDrive className="w-4.5 h-4.5 text-blue-600" />
              <span>Storage Used</span>
            </h3>

            <div className="space-y-3.5">
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-slate-500">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <p className="text-slate-400 uppercase tracking-wider">Total</p>
                  <p className="text-sm font-black text-slate-850 mt-0.5">{storageUsage.total} MB</p>
                </div>
                <div className="bg-blue-50/50 p-2 rounded-xl border border-blue-100/35">
                  <p className="text-blue-500 uppercase tracking-wider">Used</p>
                  <p className="text-sm font-black text-blue-800 mt-0.5">{storageUsage.used} MB</p>
                </div>
                <div className="bg-emerald-50/50 p-2 rounded-xl border border-emerald-100/35">
                  <p className="text-emerald-555 uppercase tracking-wider">Free</p>
                  <p className="text-sm font-black text-emerald-800 mt-0.5">{remainingStorage} MB</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-300" 
                    style={{ width: `${storageUsage.usedPercentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>{storageUsage.usedPercentage}% capacity filled</span>
                  <span>{recentUploadsList.length} files recently uploaded</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Uploads widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Recent Uploads
            </h3>

            <div className="space-y-3.5">
              {recentUploadsList.map(item => (
                <div key={item.id} className="flex gap-2.5 items-start text-xs border-b border-slate-50 pb-3.5 last:border-0 last:pb-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-800 truncate" title={item.title}>{item.title}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                      {item.time} &nbsp;•&nbsp; {item.size}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Resources widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4.5 h-4.5 text-amber-500" />
              <span>Popular Materials</span>
            </h3>

            <div className="space-y-3">
              {popularResources.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100">
                  <div className="min-w-0 flex-1 pr-2">
                    <h4 className="text-xs font-bold text-slate-800 truncate" title={item.title}>{item.title}</h4>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.type}</span>
                  </div>
                  <span className="text-xs font-black text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md shrink-0">
                    {item.downloads} DLs
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
