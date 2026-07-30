import React, { useState, useEffect, useRef } from 'react';
import { X, Save, FileText, FileSpreadsheet, Upload, AlertCircle, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import './AddResultsModal.css';

export default function AddResultsModal({
  isOpen = false,
  onClose,
  onSave,
  onUpload,
  subjects = [],
  academicYears = [],
  semesters = [],
  exams = [],
  students = []
}) {
  // Tab State
  const [activeTab, setActiveTab] = useState('manual');

  // Excel Upload State
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const [selectedRollNo, setSelectedRollNo] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  
  const [internalMarks, setInternalMarks] = useState('');
  const [practicalMarks, setPracticalMarks] = useState('');
  const [theoryMarks, setTheoryMarks] = useState('');
  const [remarks, setRemarks] = useState('');
  
  const [errors, setErrors] = useState({});

  // Reset fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab('manual');
      setFile(null);
      setIsProcessing(false);
      setProgress(0);
      setSelectedRollNo(students[0]?.rollNo || '');
      setSelectedSubject(subjects[0] || '');
      setSelectedYear(academicYears[0] || '');
      setSelectedSemester(semesters[0] || '');
      setSelectedExam(exams[0] || '');
      setInternalMarks('');
      setPracticalMarks('');
      setTheoryMarks('');
      setRemarks('');
      setErrors({});
    }
  }, [isOpen, students, subjects, academicYears, semesters, exams]);

  if (!isOpen) return null;

  // Determine if Practical Marks are applicable
  // Applicable if subject is a laboratory subject or exam is Practical
  const isPracticalApplicable = 
    selectedSubject.toLowerCase().includes('laboratory') || 
    selectedExam === 'Practical';

  // Calculations
  const intVal = Math.min(30, Math.max(0, parseInt(internalMarks) || 0));
  const pracVal = isPracticalApplicable ? Math.min(70, Math.max(0, parseInt(practicalMarks) || 0)) : 0;
  const theoryVal = !isPracticalApplicable ? Math.min(70, Math.max(0, parseInt(theoryMarks) || 0)) : 0;
  
  const totalMarks = intVal + (isPracticalApplicable ? pracVal : theoryVal);

  const calculateGrade = (total) => {
    if (total >= 90) return 'A+';
    if (total >= 80) return 'A';
    if (total >= 70) return 'B+';
    if (total >= 60) return 'B';
    if (total >= 50) return 'C';
    return 'F';
  };

  // Drag and Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
      toast.error('Invalid file type. Please upload only .xlsx or .xls files.');
      return;
    }

    if (selectedFile.size === 0) {
      toast.error('Selected file is empty. Please upload a valid Excel file.');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error('File exceeds the 10 MB size limit.');
      return;
    }

    setFile(selectedFile);
    toast.success(`File "${selectedFile.name}" selected successfully.`);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownloadTemplate = () => {
    const headers = 'Roll Number,Student Name,Department,Semester,Section,Internal Marks (30),Practical Marks (70),Subject,Exam Type\n';
    const sampleRow1 = '2406151007,Ritesh Mohanty,CSE,Semester 1,Section A,24,58,Operating Systems,Mid-Sem\n';
    const sampleRow2 = '2406151008,Sasmita Patra,CSE,Semester 1,Section A,26,60,Operating Systems,Mid-Sem\n';
    
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + sampleRow1 + sampleRow2);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "student_results_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Sample template downloaded successfully.');
  };

  const handleUploadSubmit = () => {
    if (!file) {
      toast.error('Please select or drag-and-drop a file first.');
      return;
    }

    setIsProcessing(true);
    setProgress(10);

    // Simulate file upload progress and parsing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const simulatedResults = [
              {
                rollNo: '2406151007',
                studentName: 'Ritesh Mohanty',
                department: 'CSE',
                semester: 'Semester 1',
                section: 'Section A',
                internalMarks: 24,
                practicalMarks: 58,
                subject: 'Operating Systems',
                exam: 'Mid-Sem',
                status: 'Draft'
              },
              {
                rollNo: '2406151008',
                studentName: 'Sasmita Patra',
                department: 'CSE',
                semester: 'Semester 1',
                section: 'Section A',
                internalMarks: 26,
                practicalMarks: 60,
                subject: 'Operating Systems',
                exam: 'Mid-Sem',
                status: 'Draft'
              }
            ];
            onUpload(simulatedResults);
            setIsProcessing(false);
            setFile(null);
            setProgress(0);
          }, 400);
          return 100;
        }
        return prev + 30;
      });
    }, 300);
  };

  const grade = calculateGrade(totalMarks);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!selectedRollNo) newErrors.student = 'Student selection is required';
    if (!selectedSubject) newErrors.subject = 'Subject is required';
    
    // Validate Internal Marks
    if (internalMarks === '') {
      newErrors.internalMarks = 'Internal marks are required';
    } else {
      const num = Number(internalMarks);
      if (isNaN(num) || num < 0 || num > 30) {
        newErrors.internalMarks = 'Internal marks must be between 0 and 30';
      }
    }

    // Validate Practical Marks
    if (isPracticalApplicable) {
      if (practicalMarks === '') {
        newErrors.practicalMarks = 'Practical marks are required';
      } else {
        const num = Number(practicalMarks);
        if (isNaN(num) || num < 0 || num > 70) {
          newErrors.practicalMarks = 'Practical marks must be between 0 and 70';
        }
      }
    }

    // Validate Theory Marks
    if (!isPracticalApplicable) {
      if (theoryMarks === '') {
        newErrors.theoryMarks = 'Theory marks are required';
      } else {
        const num = Number(theoryMarks);
        if (isNaN(num) || num < 0 || num > 70) {
          newErrors.theoryMarks = 'Theory marks must be between 0 and 70';
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const studentObj = students.find(s => s.rollNo === selectedRollNo);

    onSave({
      rollNo: selectedRollNo,
      studentName: studentObj?.studentName || '',
      department: studentObj?.department || 'CSE',
      semester: studentObj?.semester || 'Semester 1',
      section: studentObj?.section || 'Section A',
      subject: selectedSubject,
      academicYear: selectedYear,
      semesterName: selectedSemester, // store selected semester name
      exam: selectedExam,
      internalMarks: intVal,
      practicalMarks: isPracticalApplicable ? pracVal : theoryVal, // map Theory/Practical to practicalMarks for table compatibility
      remarks: remarks.trim(),
      status: 'Pending'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={!isProcessing ? onClose : null}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in duration-200"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden transform transition-all duration-350 ease-out flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-250">
        <div className="h-1.5 w-full bg-emerald-600" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/60">
              {activeTab === 'manual' ? (
                <FileText className="w-4 h-4" />
              ) : (
                <FileSpreadsheet className="w-4 h-4" />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight">
                Add Student Results
              </h3>
              <p className="text-xs text-slate-405 font-semibold uppercase tracking-wider mt-0.5">
                Faculty Portal &nbsp;•&nbsp; {activeTab === 'manual' ? 'Score Entry' : 'Bulk Import'}
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={isProcessing}
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-100 bg-slate-50/30 px-6">
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => setActiveTab('manual')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer disabled:opacity-50 ${
              activeTab === 'manual'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Manual Entry
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => setActiveTab('excel')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer disabled:opacity-50 ${
              activeTab === 'excel'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Upload Excel
          </button>
        </div>

        {activeTab === 'manual' ? (
          <>
            {/* Form Body for Manual Entry */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* Student Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Student <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedRollNo}
                    onChange={(e) => setSelectedRollNo(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                  >
                    {students.map((std) => (
                      <option key={std.rollNo} value={std.rollNo}>
                        {std.rollNo} - {std.studentName} ({std.department}, {std.section})
                      </option>
                    ))}
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400 text-xs">
                    ▼
                  </span>
                </div>
                {errors.student && (
                  <p className="text-xs font-bold text-red-500">{errors.student}</p>
                )}
              </div>

              {/* Subject Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Subject <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                  >
                    {subjects.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400 text-xs">
                    ▼
                  </span>
                </div>
                {errors.subject && (
                  <p className="text-xs font-bold text-red-500">{errors.subject}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Academic Year */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Academic Year
                  </label>
                  <div className="relative">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                    >
                      {academicYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400 text-[10px]">
                      ▼
                    </span>
                  </div>
                </div>

                {/* Semester */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Semester
                  </label>
                  <div className="relative">
                    <select
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                    >
                      {semesters.map((sem) => (
                        <option key={sem} value={sem}>{sem}</option>
                      ))}
                    </select>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400 text-[10px]">
                      ▼
                    </span>
                  </div>
                </div>

                {/* Exam Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Exam Type
                  </label>
                  <div className="relative">
                    <select
                      value={selectedExam}
                      onChange={(e) => setSelectedExam(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 appearance-none transition-all duration-200 font-semibold cursor-pointer text-slate-700"
                    >
                      {exams.map((ex) => (
                        <option key={ex} value={ex}>{ex}</option>
                      ))}
                    </select>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400 text-[10px]">
                      ▼
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Internal Marks */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Internal Marks (30) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    placeholder="0 - 30"
                    value={internalMarks}
                    onChange={(e) => setInternalMarks(e.target.value)}
                    className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-semibold text-slate-800 ${
                      errors.internalMarks ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10'
                    }`}
                  />
                  {errors.internalMarks && (
                    <p className="text-[11px] font-bold text-red-500 leading-tight">{errors.internalMarks}</p>
                  )}
                </div>

                {/* Practical Marks */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Practical (70)
                    </label>
                    {isPracticalApplicable ? (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 rounded font-extrabold">Active</span>
                    ) : (
                      <span className="text-[10px] bg-slate-100 text-slate-400 px-1.5 rounded font-semibold">N/A</span>
                    )}
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="70"
                    placeholder="0 - 70"
                    value={practicalMarks}
                    disabled={!isPracticalApplicable}
                    onChange={(e) => setPracticalMarks(e.target.value)}
                    className={`w-full px-3.5 py-2 text-sm border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-semibold text-slate-800 ${
                      !isPracticalApplicable ? 'bg-slate-100/70 border-slate-200 text-slate-400 cursor-not-allowed' :
                      errors.practicalMarks ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10 bg-slate-50' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 bg-slate-50'
                    }`}
                  />
                  {errors.practicalMarks && isPracticalApplicable && (
                    <p className="text-[11px] font-bold text-red-500 leading-tight">{errors.practicalMarks}</p>
                  )}
                </div>

                {/* Theory Marks */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Theory Marks (70)
                    </label>
                    {!isPracticalApplicable ? (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 rounded font-extrabold">Active</span>
                    ) : (
                      <span className="text-[10px] bg-slate-100 text-slate-400 px-1.5 rounded font-semibold">N/A</span>
                    )}
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="70"
                    placeholder="0 - 70"
                    value={theoryMarks}
                    disabled={isPracticalApplicable}
                    onChange={(e) => setTheoryMarks(e.target.value)}
                    className={`w-full px-3.5 py-2 text-sm border rounded-xl outline-none focus:bg-white focus:ring-4 transition-all duration-200 font-semibold text-slate-800 ${
                      isPracticalApplicable ? 'bg-slate-100/70 border-slate-200 text-slate-400 cursor-not-allowed' :
                      errors.theoryMarks ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10 bg-slate-50' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 bg-slate-50'
                    }`}
                  />
                  {errors.theoryMarks && !isPracticalApplicable && (
                    <p className="text-[11px] font-bold text-red-500 leading-tight">{errors.theoryMarks}</p>
                  )}
                </div>
              </div>

              {/* Auto Calculated Summary Display */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">Total Marks</span>
                  <p className="text-xl font-black text-emerald-950 mt-0.5">{totalMarks} / 100</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">Auto Grade</span>
                  <p className="text-xl font-black text-emerald-600 mt-0.5">{grade}</p>
                </div>
              </div>

              {/* Remarks Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Remarks (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Excellent performance"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 font-semibold text-slate-800"
                />
              </div>

            </form>

            {/* Modal Footer for Manual Entry */}
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
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Save Result</span>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Body for Excel Upload */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-200 text-center flex flex-col items-center justify-center min-h-[180px] ${
                  dragActive ? 'border-emerald-500 bg-emerald-50/10 scale-[0.99]' : 'border-slate-200 bg-slate-50/20 hover:border-slate-350 hover:bg-slate-50/40'
                }`}
              >
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept=".xlsx,.xls"
                  onChange={handleChange}
                  disabled={isProcessing}
                  className="hidden" 
                />

                {!file ? (
                  <div className="space-y-3 cursor-pointer w-full" onClick={!isProcessing ? handleButtonClick : null}>
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-400 mx-auto group-hover:scale-105 transition-all">
                      <Upload className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-700">
                        Drag & drop your Excel file here or click <span className="text-emerald-600 hover:underline">Browse</span> to upload.
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1">Supported formats: .xlsx, .xls (Maximum size: 10 MB)</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full space-y-4">
                    <div className="flex items-center gap-3.5 p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-sm mx-auto text-left relative group shadow-2xs">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-650 flex items-center justify-center shrink-0 border border-emerald-100 shadow-3xs">
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0 pr-6 space-y-0.5">
                        <p className="text-xs font-bold text-slate-800 truncate">📄 {file.name}</p>
                        <p className="text-[10px] text-slate-500 font-semibold">Size: {(file.size / 1024).toFixed(1)} KB</p>
                        <p className="text-[10px] text-emerald-650 font-bold flex items-center gap-1">
                          ✓ Ready to upload
                        </p>
                      </div>
                      {!isProcessing && (
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer"
                          title="Remove file"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Download Template Alert */}
              <div className="flex items-start gap-3.5 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 shadow-3xs">
                  <FileSpreadsheet className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={handleDownloadTemplate}
                    className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1.5 cursor-pointer text-left animate-none"
                  >
                    <span>📄 Download Sample Excel Template</span>
                  </button>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">
                    Download the template and fill it before uploading.
                  </p>
                </div>
              </div>

              {/* Progress Indicator */}
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-slate-500">Processing sheet & validating records...</span>
                    <span className="text-emerald-600">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer for Excel Upload */}
            <div className="flex items-center justify-end gap-2.5 p-5 border-t border-slate-100 bg-slate-50/50">
              <button
                type="button"
                disabled={isProcessing}
                onClick={onClose}
                className="px-4.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessing || !file}
                onClick={handleUploadSubmit}
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
