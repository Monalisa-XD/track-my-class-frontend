import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Bell, 
  Clock, 
  Award, 
  Users, 
  BookOpen, 
  Calendar, 
  Activity, 
  Lock, 
  Edit2, 
  GraduationCap, 
  Camera, 
  X, 
  CheckCircle2,
  HelpCircle,
  Laptop,
  CheckSquare,
  Square,
  Percent
} from 'lucide-react';
import { teacherProfileData } from './data/profileData';
import './TeacherProfile.css';

export default function TeacherProfile() {
  const { teacher, performanceSummary, recentActivities, upcomingClasses } = teacherProfileData;

  // Personal Info Local States (Editable via Modal)
  const [phone, setPhone] = useState(teacher.phone);
  const [address, setAddress] = useState(teacher.address);
  const [emergencyContact, setEmergencyContact] = useState(teacher.emergencyContact);

  // Edit Modal Temporary States
  const [tempPhone, setTempPhone] = useState(phone);
  const [tempAddress, setTempAddress] = useState(address);
  const [tempEmergency, setTempEmergency] = useState(emergencyContact);

  // Password Modal Temporary States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Modal Control States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Checkboxes local state for Notifications
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [notifSchedule, setNotifSchedule] = useState(true);
  const [notifGrades, setNotifGrades] = useState(true);

  // Checkboxes local state for Security
  const [sec2FA, setSec2FA] = useState(true);
  const [secAlerts, setSecAlerts] = useState(true);
  const [secTimeout, setSecTimeout] = useState(true);

  // Helper: Get avatar initials
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Action: Save Profile Edit
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setPhone(tempPhone);
    setAddress(tempAddress);
    setEmergencyContact(tempEmergency);
    setIsEditModalOpen(false);
    alert('Contact details updated successfully!');
  };

  // Action: Open Edit Profile Modal
  const openEditModal = () => {
    setTempPhone(phone);
    setTempAddress(address);
    setTempEmergency(emergencyContact);
    setIsEditModalOpen(true);
  };

  // Action: Submit Change Password
  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Error: New Password and Confirm Password do not match.");
      return;
    }
    alert('Password updated successfully! (UI Only)');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsPasswordModalOpen(false);
  };

  return (
    <div className="space-y-6 relative min-h-screen">
      {/* Profile Banner / Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#047857] to-[#10B981] text-white p-6 md:p-8 shadow-ambient border border-emerald-500/20 transition-all duration-300 hover:shadow-ambient-hover select-none">
        {/* Inner Top Highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Decorative Orbs */}
        <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-48 -top-24 w-56 h-56 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Avatar Photo, Name, and Designation */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="relative group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center font-black text-2xl border-2 border-white/30 shadow-lg">
                {getInitials(teacher.name)}
              </div>
              <div className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">{teacher.name}</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-250 border border-emerald-400/30 shadow-inner animate-pulse">
                  <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                  Active Faculty
                </span>
              </div>
              <p className="text-sm text-emerald-100/90 font-medium">
                {teacher.designation} &nbsp;•&nbsp; {teacher.department}
              </p>
              <p className="text-xs text-emerald-200/80 font-mono font-bold">Employee ID: {teacher.employeeId}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="shrink-0 flex justify-center sm:justify-end gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-white/15">
            <button
              type="button"
              onClick={openEditModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#059669] hover:bg-emerald-50 font-bold text-xs rounded-xl shadow-md transition-all duration-200 active:scale-95 transition-all cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl backdrop-blur-md border border-white/20 shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-200" />
              <span>Change Password</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        {/* Assigned Subjects */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-emerald hover:border-emerald-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#047857] to-[#10B981] text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Subjects</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{teacher.assignedSubjectsCount}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Theory & Lab modules</p>
          </div>
        </div>

        {/* Assigned Classes */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-emerald hover:border-emerald-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Sections</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{teacher.assignedClassesCount}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Student roster groups</p>
          </div>
        </div>

        {/* Experience */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-amber hover:border-amber-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Experience</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{teacher.experienceYears} Yrs</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Professional service</p>
          </div>
        </div>

        {/* Avg Attendance Managed */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-indigo hover:border-indigo-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <Percent className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Attendance</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{teacher.avgAttendance}%</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Student presence average</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Details + Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Columns: Profile Cards */}
        <div className="lg:col-span-3 space-y-6">
          {/* Personal Information Block */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-5">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-1.5">
              <User className="w-4.5 h-4.5 text-[#059669]" />
              <span>Personal Information</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs font-semibold text-slate-500">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span>Full Name</span>
                <span className="text-slate-850 font-bold text-right">{teacher.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span>Employee ID</span>
                <span className="text-slate-850 font-mono font-bold text-right">{teacher.employeeId}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span>Email Address</span>
                <span className="text-slate-850 font-bold text-right">{teacher.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span>Phone Number</span>
                <span className="text-slate-850 font-bold text-right">{phone}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span>Department</span>
                <span className="text-slate-850 font-bold text-right">{teacher.department}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span>Designation</span>
                <span className="text-slate-850 font-bold text-right">{teacher.designation}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span>Qualifications</span>
                <span className="text-slate-850 font-bold text-right">{teacher.qualification}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span>Joining Date</span>
                <span className="text-slate-855 font-bold text-right">{teacher.joiningDate}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50 col-span-1 md:col-span-2">
                <span>Office Location</span>
                <span className="text-slate-850 font-bold text-right">{teacher.officeLocation}</span>
              </div>
              <div className="flex justify-between items-start py-2 border-b border-slate-50 col-span-1 md:col-span-2">
                <span>Residential Address</span>
                <span className="text-slate-855 font-semibold text-right max-w-md leading-relaxed">{address}</span>
              </div>
              <div className="flex justify-between items-center py-2 col-span-1 md:col-span-2">
                <span>Emergency Contact</span>
                <span className="text-slate-855 font-bold text-right">{emergencyContact}</span>
              </div>
            </div>
          </div>

          {/* Assigned Classes List Card - Placed below Personal Information */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-1.5">
              <Users className="w-4.5 h-4.5 text-[#059669]" />
              <span>Assigned Classes</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {[
                { name: 'MCA 1st Year (Sec A)', students: 28, room: 'Hall 101' },
                { name: 'MCA 1st Year (Sec B)', students: 22, room: 'Hall 103' },
                { name: 'MCA 2nd Year (Sec A)', students: 18, room: 'Hall 202' }
              ].map(cl => (
                <div key={cl.name} className="p-3 bg-slate-50 rounded-2xl border border-slate-150 flex flex-col justify-between hover:shadow-ambient-hover hover:border-slate-250 transition-all">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{cl.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">Location: {cl.room}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-[10px] text-slate-500 font-semibold border-t border-slate-200/60 pt-2">
                    <Users className="w-3 h-3 text-slate-400" />
                    <span>{cl.students} Students Roster</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Information Block */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-5">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-1.5">
              <GraduationCap className="w-4.5 h-4.5 text-emerald-600" />
              <span>Academic Details</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs font-semibold text-slate-500">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span>Academic Session</span>
                <span className="text-slate-855 font-bold text-right">{teacher.academicYear}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span>Current Semester</span>
                <span className="text-slate-855 font-bold text-right">{teacher.currentSemester}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50 col-span-1 md:col-span-2">
                <span>Weekly Teaching Load</span>
                <span className="text-slate-855 font-bold text-right">{teacher.teachingLoadHours} Hours / Week</span>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2 pt-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Assigned Subjects</p>
                <div className="flex flex-wrap gap-2">
                  {['Operating Systems', 'Operating Systems Laboratory', 'Computer Networks'].map(sub => (
                    <span key={sub} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Notification Preferences and Security Settings Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Notification preferences card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 text-[#059669] p-2 rounded-lg border border-emerald-100 shrink-0">
                  <Bell className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Notification Preferences</h3>
              </div>

              <div className="space-y-3 pt-1 text-xs font-semibold text-slate-650">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer" onClick={() => setNotifEmail(!notifEmail)}>
                  <span>Email Alerts</span>
                  {notifEmail ? <CheckSquare className="w-4 h-4 text-[#059669] shrink-0" /> : <Square className="w-4 h-4 text-slate-300 shrink-0" />}
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer" onClick={() => setNotifPush(!notifPush)}>
                  <span>Push Alerts</span>
                  {notifPush ? <CheckSquare className="w-4 h-4 text-[#059669] shrink-0" /> : <Square className="w-4 h-4 text-slate-300 shrink-0" />}
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer" onClick={() => setNotifSchedule(!notifSchedule)}>
                  <span>Schedule Updates</span>
                  {notifSchedule ? <CheckSquare className="w-4 h-4 text-[#059669] shrink-0" /> : <Square className="w-4 h-4 text-slate-300 shrink-0" />}
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer" onClick={() => setNotifGrades(!notifGrades)}>
                  <span>Grades Reminders</span>
                  {notifGrades ? <CheckSquare className="w-4 h-4 text-[#059669] shrink-0" /> : <Square className="w-4 h-4 text-slate-300 shrink-0" />}
                </div>
              </div>
            </div>

            {/* Security settings card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 text-[#059669] p-2 rounded-lg border border-emerald-100 shrink-0">
                  <Shield className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Security Settings</h3>
              </div>

              <div className="space-y-3 pt-1 text-xs font-semibold text-slate-650">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer" onClick={() => setSec2FA(!sec2FA)}>
                  <div>
                    <p>Two-Factor Auth (2FA)</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Extra verification step</p>
                  </div>
                  {sec2FA ? <CheckSquare className="w-4 h-4 text-[#059669] shrink-0" /> : <Square className="w-4 h-4 text-slate-300 shrink-0" />}
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer" onClick={() => setSecAlerts(!secAlerts)}>
                  <div>
                    <p>Log In Alerts</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Notices on new log ins</p>
                  </div>
                  {secAlerts ? <CheckSquare className="w-4 h-4 text-[#059669] shrink-0" /> : <Square className="w-4 h-4 text-slate-300 shrink-0" />}
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer" onClick={() => setSecTimeout(!secTimeout)}>
                  <div>
                    <p>Auto Session Timeout</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Timeout after 30 mins</p>
                  </div>
                  {secTimeout ? <CheckSquare className="w-4 h-4 text-[#059669] shrink-0" /> : <Square className="w-4 h-4 text-slate-300 shrink-0" />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Panel */}
        <div className="space-y-6">
          {/* Recent Login / Last Active Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Laptop className="w-4.5 h-4.5 text-[#059669]" />
              <span>Last Active Session</span>
            </h3>

            <div className="space-y-3 font-semibold text-xs text-slate-650">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Status</span>
                <span className="text-emerald-700 font-bold inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  This Device
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Browser / OS</span>
                <span className="text-slate-850">Chrome (Windows 11)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>IP Address</span>
                <span className="text-slate-850 font-mono">192.168.1.41</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span>Location</span>
                <span className="text-slate-850">Sambalpur, India</span>
              </div>
            </div>
          </div>

          {/* Faculty Performance */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Faculty Performance
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">Student Feedback</span>
                  <span className="text-slate-850 font-bold">{performanceSummary.studentFeedback} / 5.0</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#059669] h-full rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">Syllabus Coverage</span>
                  <span className="text-slate-850 font-bold">{performanceSummary.curriculumCoverage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#10B981] h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">Attendance Submission Rate</span>
                  <span className="text-slate-850 font-bold">{performanceSummary.attendanceRate}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Log Activities */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4.5 h-4.5 text-[#059669]" />
              <span>Recent Activities</span>
            </h3>

            <div className="space-y-3.5">
              {recentActivities.map(act => (
                <div key={act.id} className="flex gap-2.5 items-start text-xs border-b border-slate-55 pb-3 last:border-0 last:pb-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-slate-650 font-semibold leading-relaxed">{act.message}</p>
                    <span className="text-[10px] text-slate-400 font-bold mt-1 inline-block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Upcoming Classes
            </h3>

            <div className="space-y-3">
              {upcomingClasses.map(cls => (
                <div key={cls.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100">
                  <div className="bg-emerald-50 text-[#059669] p-2 rounded-lg border border-emerald-100 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{cls.subjectName}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{cls.time}</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{cls.room} &nbsp;•&nbsp; {cls.section}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none flex items-center justify-center p-4">
          <div onClick={() => setIsEditModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs modal-fade-in" />
          
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden relative z-10 modal-slide-down">
            <div className="flex items-center justify-between p-5 border-b border-slate-150">
              <h3 className="text-base font-bold text-slate-800 tracking-tight">Edit Profile Information</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div className="p-6 space-y-4.5">
                {/* Photo upload UI */}
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-black text-sm">
                    {getInitials(teacher.name)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Faculty Photo</p>
                    <button 
                      type="button"
                      onClick={() => alert('Photo upload triggered (UI only)...')}
                      className="text-[10px] text-[#059669] font-bold hover:text-[#047857] mt-1 cursor-pointer"
                    >
                      Upload new image
                    </button>
                  </div>
                </div>

                {/* Phone number */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Phone Number</label>
                  <input
                    type="text"
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl outline-none transition-all font-medium text-slate-800"
                  />
                </div>

                {/* Residential Address */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Residential Address</label>
                  <textarea
                    value={tempAddress}
                    onChange={(e) => setTempAddress(e.target.value)}
                    required
                    rows="3"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl outline-none transition-all font-medium text-slate-800 resize-none"
                  />
                </div>

                {/* Emergency contact */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Emergency Contact</label>
                  <input
                    type="text"
                    value={tempEmergency}
                    onChange={(e) => setTempEmergency(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl outline-none transition-all font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="p-5 border-t border-slate-150 bg-slate-50 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div onClick={() => setIsPasswordModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs modal-fade-in" />
          
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden relative z-10 modal-slide-down">
            <div className="flex items-center justify-between p-5 border-b border-slate-150">
              <h3 className="text-base font-bold text-slate-800 tracking-tight">Change Password</h3>
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePasswordSubmit}>
              <div className="p-6 space-y-4">
                {/* Current Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 rounded-xl outline-none font-medium text-slate-800"
                  />
                </div>

                {/* New Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 rounded-xl outline-none font-medium text-slate-800"
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 rounded-xl outline-none font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="p-5 border-t border-slate-150 bg-slate-50 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
