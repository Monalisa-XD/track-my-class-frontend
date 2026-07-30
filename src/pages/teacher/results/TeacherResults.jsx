import React, { useState, useMemo, useEffect } from 'react';
import { 
  Award, 
  Users, 
  Percent, 
  Search, 
  RotateCcw, 
  Save, 
  Check, 
  FileSpreadsheet, 
  BookOpen, 
  TrendingUp, 
  History,
  FileText,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { teacherResultsData } from './data/resultsData';
import './TeacherResults.css';
import AddResultsModal from './components/AddResultsModal';
import { toast } from 'react-hot-toast';

export default function TeacherResults() {
  const { academicYears, semesters, subjects, exams, sections, recentSubmissions, initialResults } = teacherResultsData;

  // Header Selectors State
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [headerSubject, setHeaderSubject] = useState(subjects[0]);
  const [headerExam, setHeaderExam] = useState(exams[0]);

  // Filters State
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterSection, setFilterSection] = useState('All');
  const [filterExam, setFilterExam] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Results Local State (allows editing marks)
  const [resultsList, setResultsList] = useState(initialResults);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Grade calculator helper
  const calculateGrade = (total) => {
    if (total >= 90) return 'A+';
    if (total >= 80) return 'A';
    if (total >= 70) return 'B+';
    if (total >= 60) return 'B';
    if (total >= 50) return 'C';
    return 'F';
  };

  // Handle Mark Edits
  const handleMarkChange = (rollNo, field, val) => {
    const numericVal = Math.min(field === 'internalMarks' ? 30 : 70, Math.max(0, parseInt(val) || 0));

    setResultsList(prev => prev.map(res => {
      if (res.rollNo === rollNo) {
        const updated = { ...res, [field]: numericVal };
        // Update status to Draft automatically upon editing
        if (updated.status === 'Pending') {
          updated.status = 'Draft';
        }
        return updated;
      }
      return res;
    }));
  };

  // Reset local state changes
  const handleReset = () => {
    setResultsList(initialResults);
    setSearchQuery('');
  };

  // Connect to global page-header action button using window event listener
  useEffect(() => {
    const handleHeaderAction = (e) => {
      if (e.detail === 'ADD_RESULTS') {
        setIsAddModalOpen(true);
      }
    };
    window.addEventListener('header-action', handleHeaderAction);
    return () => {
      window.removeEventListener('header-action', handleHeaderAction);
    };
  }, []);

  // Compute unique students from results list
  const uniqueStudents = useMemo(() => {
    const seen = new Set();
    const list = [];
    resultsList.forEach(item => {
      const nameVal = item.studentName || item.name || '';
      if (!seen.has(item.rollNo) && item.rollNo) {
        seen.add(item.rollNo);
        list.push({
          rollNo: item.rollNo,
          studentName: nameVal,
          department: item.department,
          semester: item.semester,
          section: item.section
        });
      }
    });
    return list;
  }, [resultsList]);

  // Handle adding new result
  const handleAddResultSave = (newResult) => {
    // Check if result already exists in state
    const alreadyExists = resultsList.some(r => 
      r.rollNo === newResult.rollNo && 
      r.subject === newResult.subject && 
      r.exam === newResult.exam
    );

    if (alreadyExists) {
      toast.error('A result for this student, subject, and exam type already exists.');
      return;
    }

    setResultsList(prev => [
      newResult,
      ...prev
    ]);
    setIsAddModalOpen(false);
    toast.success('Result added successfully.');
  };

  const handleExcelUpload = (newResults) => {
    const duplicates = [];
    const toAdd = [];

    newResults.forEach(newRes => {
      const exists = resultsList.some(r => 
        r.rollNo === newRes.rollNo && 
        r.subject === newRes.subject && 
        r.exam === newRes.exam
      );
      if (exists) {
        duplicates.push(newRes.studentName || newRes.rollNo);
      } else {
        toAdd.push(newRes);
      }
    });

    if (toAdd.length > 0) {
      setResultsList(prev => [
        ...toAdd,
        ...prev
      ]);
      toast.success(`Successfully uploaded and added results for ${toAdd.length} student(s).`);
    }

    if (duplicates.length > 0) {
      toast.error(`Skipped duplicate result(s) for: ${duplicates.join(', ')}`);
    }

    setIsAddModalOpen(false);
  };

  // Action: Save Draft
  const handleSaveDraft = () => {
    // Mark filtered ones as Draft
    setResultsList(prev => prev.map(res => {
      const isFiltered = filteredResults.some(f => f.rollNo === res.rollNo);
      if (isFiltered && res.status === 'Pending') {
        return { ...res, status: 'Draft' };
      }
      return res;
    }));
    alert(`Draft results saved for subject: ${headerSubject} (${headerExam})`);
  };

  // Action: Submit Results
  const handleSubmitResults = () => {
    setResultsList(prev => prev.map(res => {
      const isFiltered = filteredResults.some(f => f.rollNo === res.rollNo);
      if (isFiltered) {
        return { ...res, status: 'Submitted' };
      }
      return res;
    }));
    alert(`Results successfully submitted for ${filteredResults.length} students.`);
  };

  const handleExport = () => {
    alert('Exporting students results roster reports to Excel (.xlsx)...');
  };

  // Filter Logic
  const filteredResults = useMemo(() => {
    return resultsList.filter(res => {
      const matchesHeaderSubject = headerSubject === 'All' || res.subject === headerSubject;
      const matchesHeaderExam = headerExam === 'All' || res.exam === headerExam;
      const matchesSubject = filterSubject === 'All' || res.subject === filterSubject;
      const matchesSection = filterSection === 'All' || res.section === filterSection;
      const matchesExam = filterExam === 'All' || res.exam === filterExam;
      const matchesSearch = searchQuery.trim() === '' || 
        res.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        res.rollNo.includes(searchQuery);

      return matchesHeaderSubject && matchesHeaderExam && matchesSubject && matchesSection && matchesExam && matchesSearch;
    });
  }, [resultsList, headerSubject, headerExam, filterSubject, filterSection, filterExam, searchQuery]);

  // Summary Metrics calculations
  const metrics = useMemo(() => {
    const total = filteredResults.length;
    const pending = filteredResults.filter(r => r.status === 'Pending').length;
    const submitted = filteredResults.filter(r => r.status === 'Submitted').length;

    let sumTotal = 0;
    filteredResults.forEach(r => {
      sumTotal += (r.internalMarks + r.practicalMarks);
    });
    const avgMarks = total > 0 ? Math.round(sumTotal / total) : 0;

    return { total, pending, submitted, avgMarks };
  }, [filteredResults]);

  // Right Side Analytics calculations
  const analytics = useMemo(() => {
    if (filteredResults.length === 0) {
      return { highest: 0, lowest: 0, average: 0, passPct: 0, outstanding: 0, firstClass: 0, failed: 0 };
    }

    let highest = 0;
    let lowest = 100;
    let sumTotal = 0;
    let passes = 0;
    let outstanding = 0;
    let firstClass = 0;
    let failed = 0;

    filteredResults.forEach(r => {
      const total = r.internalMarks + r.practicalMarks;
      if (total > highest) highest = total;
      if (total < lowest) lowest = total;
      sumTotal += total;

      const grade = calculateGrade(total);
      if (grade !== 'F') passes++;
      if (grade === 'A+' || grade === 'A') outstanding++;
      else if (grade === 'B+' || grade === 'B') firstClass++;
      else failed++;
    });

    const average = Math.round(sumTotal / filteredResults.length);
    const passPct = Math.round((passes / filteredResults.length) * 100);

    return { highest, lowest, average, passPct, outstanding, firstClass, failed };
  }, [filteredResults]);

  return (
    <div className="space-y-6">
      {/* Filters Toolbar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-ambient select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-sm shadow-blue-400" />
          <span className="text-xs font-bold text-slate-700 tracking-wide">Results Entry</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Subject Dropdown */}
          <div className="relative min-w-[150px]">
            <select
              value={headerSubject}
              onChange={(e) => setHeaderSubject(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {subjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <BookOpen className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Exam Type Dropdown */}
          <div className="relative min-w-[120px]">
            <select
              value={headerExam}
              onChange={(e) => setHeaderExam(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              {exams.map(ex => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <Award className="w-3.5 h-3.5" />
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
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        {/* Total Students */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-blue hover:border-blue-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Students</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.total}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1"> Roster student count</p>
          </div>
        </div>

        {/* Results Pending */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-amber hover:border-amber-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Results Pending</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.pending}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Awaiting marks upload</p>
          </div>
        </div>

        {/* Results Submitted */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-emerald hover:border-emerald-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all">
            <Check className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Results Submitted</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.submitted}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Finalized submissions</p>
          </div>
        </div>

        {/* Average Marks */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-indigo hover:border-indigo-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <Percent className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average Marks</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{metrics.avgMarks}%</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1"> Roster score average</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
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

          {/* Section Filter */}
          <div className="relative min-w-[110px]">
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Sections</option>
              {sections.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          {/* Exam Filter */}
          <div className="relative min-w-[120px]">
            <select
              value={filterExam}
              onChange={(e) => setFilterExam(e.target.value)}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none appearance-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="All">All Exams</option>
              {exams.map(ex => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
          </div>

          {/* Search Student */}
          <div className="relative flex-1 min-w-[180px] max-w-[245px]">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Roll/Name..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Actions clear button */}
        {(filterSubject !== 'All' || filterSection !== 'All' || filterExam !== 'All' || searchQuery !== '') && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Main Grid content: Results Entry + Right Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Side: Results Table */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-ambient overflow-hidden select-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-5">Roll Number</th>
                    <th className="py-4 px-5">Student Name</th>
                    <th className="py-4 px-5">Department</th>
                    <th className="py-4 px-5">Semester</th>
                    <th className="py-4 px-5">Section</th>
                    <th className="py-4 px-5 text-center">Internal (30)</th>
                    <th className="py-4 px-5 text-center">Practical (70)</th>
                    <th className="py-4 px-5 text-center">Total Marks</th>
                    <th className="py-4 px-5 text-center">Grade</th>
                    <th className="py-4 px-5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                  {filteredResults.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <AlertCircle className="w-10 h-10 text-slate-350" />
                          <h4 className="text-slate-800 font-bold">No results available.</h4>
                          <p className="text-xs text-slate-450 max-w-xs">Adjust your class, section, or subject search query to input scores.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredResults.map(res => {
                      const totalMarks = res.internalMarks + res.practicalMarks;
                      const grade = calculateGrade(totalMarks);

                      // Status styles
                      const statusClass = 
                        res.status === 'Submitted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        res.status === 'Draft' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-100 text-slate-500 border-slate-200';

                      // Grade styles
                      const gradeClass = grade === 'F' ? 'text-red-600' : 'text-blue-700';

                      return (
                        <tr key={res.rollNo} className="hover:bg-slate-50/45 transition-colors">
                          <td className="py-3 px-5 font-bold font-mono text-slate-900">{res.rollNo}</td>
                          <td className="py-3 px-5 font-bold text-slate-800">{res.studentName}</td>
                          <td className="py-3 px-5">
                            <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold rounded bg-slate-100 text-slate-600 border border-slate-200">
                              {res.department}
                            </span>
                          </td>
                          <td className="py-3 px-5 text-xs text-slate-500">{res.semester}</td>
                          <td className="py-3 px-5 text-xs text-slate-500">{res.section}</td>
                          <td className="py-3 px-5 text-center">
                            <input
                              type="number"
                              min="0"
                              max="30"
                              value={res.internalMarks}
                              onChange={(e) => handleMarkChange(res.rollNo, 'internalMarks', e.target.value)}
                              disabled={res.status === 'Submitted'}
                              className="w-14 text-center px-1.5 py-1 text-xs bg-slate-50 border border-slate-200 hover:border-slate-350 focus:bg-white focus:border-blue-500 rounded-lg outline-none font-bold text-slate-800 disabled:bg-slate-100 disabled:text-slate-400"
                            />
                          </td>
                          <td className="py-3 px-5 text-center">
                            <input
                              type="number"
                              min="0"
                              max="70"
                              value={res.practicalMarks}
                              onChange={(e) => handleMarkChange(res.rollNo, 'practicalMarks', e.target.value)}
                              disabled={res.status === 'Submitted'}
                              className="w-14 text-center px-1.5 py-1 text-xs bg-slate-50 border border-slate-200 hover:border-slate-350 focus:bg-white focus:border-blue-500 rounded-lg outline-none font-bold text-slate-800 disabled:bg-slate-100 disabled:text-slate-400"
                            />
                          </td>
                          <td className="py-3 px-5 text-center font-extrabold text-slate-850">{totalMarks} / 100</td>
                          <td className={`py-3 px-5 text-center font-black ${gradeClass}`}>{grade}</td>
                          <td className="py-3 px-5 text-center">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusClass}`}>
                              {res.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Bar */}
          {filteredResults.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-ambient flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-slate-500" />
                  <span>Reset Marks</span>
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleExport}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-2xs"
                >
                  <FileSpreadsheet className="w-4 h-4 text-slate-500" />
                  <span>Export Excel</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-2xs"
                >
                  <Save className="w-4 h-4 text-slate-555" />
                  <span>Save Draft</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmitResults}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Submit Results</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side Info Panels */}
        <div className="space-y-6">
          {/* Result Summary Metrics */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Result Summary
            </h3>

            <div className="space-y-3 font-semibold text-xs text-slate-650">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Highest Marks</span>
                <span className="text-slate-850 font-black text-sm">{analytics.highest} / 100</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Lowest Marks</span>
                <span className="text-slate-850 font-black text-sm">{analytics.lowest} / 100</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Average Score</span>
                <span className="text-slate-850 font-black text-sm">{analytics.average}%</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span>Pass Percentage</span>
                <span className="text-emerald-700 font-black text-sm">{analytics.passPct}%</span>
              </div>
            </div>
          </div>

          {/* Grade Distribution */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Grade Distribution
            </h3>

            <div className="space-y-3.5">
              {/* Outstanding */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-550">Outstanding (A / A+)</span>
                  <span className="text-slate-800 font-bold">{analytics.outstanding} Students</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(analytics.outstanding / (filteredResults.length || 1)) * 100}%` }} />
                </div>
              </div>

              {/* First Class */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-550">First Class (B / B+)</span>
                  <span className="text-slate-800 font-bold">{analytics.firstClass} Students</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(analytics.firstClass / (filteredResults.length || 1)) * 100}%` }} />
                </div>
              </div>

              {/* Failed */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-550">Failed (F)</span>
                  <span className="text-slate-800 font-bold text-red-600">{analytics.failed} Students</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: `${(analytics.failed / (filteredResults.length || 1)) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Submissions history log */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-4.5 h-4.5 text-slate-550" />
              <span>Recent Submissions</span>
            </h3>

            <div className="space-y-3.5">
              {recentSubmissions.map(log => {
                const isDraft = log.status.toLowerCase() === 'draft';
                return (
                  <div key={log.id} className="flex gap-2.5 items-start text-xs border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isDraft ? 'bg-amber-400' : 'bg-emerald-500'}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <h4 className="font-bold text-slate-800 truncate">{log.subject}</h4>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold border ${
                          isDraft ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Exam: {log.exam}</p>
                      <span className="text-[10px] text-slate-400 font-bold mt-1 inline-block">{log.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <AddResultsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddResultSave}
        onUpload={handleExcelUpload}
        subjects={subjects}
        academicYears={academicYears}
        semesters={semesters}
        exams={exams}
        students={uniqueStudents}
      />
    </div>
  );
}
