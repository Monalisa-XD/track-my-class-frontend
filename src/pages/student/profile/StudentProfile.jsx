import React, { useState, useRef } from 'react';
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
  Square
} from 'lucide-react';
import { studentProfileData } from './data/profileData';
import './StudentProfile.css';

export default function StudentProfile() {
  const { student: initialStudent, recentActivities, loginActivity } = studentProfileData;

  // Local state for editable fields
  const [student, setStudent] = useState(initialStudent);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setStudent(prev => ({ ...prev, avatar: url }));
      setEditForm(prev => ({ ...prev, avatar: url }));
    }
  };

  const getInitials = (name) => {
    if (!name) return "PKR";
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  // Modal display states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Form states
  const [editForm, setEditForm] = useState({
    phone: student.phone,
    address: student.address,
    emergencyContact: student.emergencyContact,
    avatar: student.avatar
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Checkbox states (UI only)
  const [notifications, setNotifications] = useState({
    classReminders: true,
    attendanceAlerts: true,
    resultPublications: true,
    campusNotices: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareProfile: true,
    showRank: false
  });

  // Action handlers
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setStudent(prev => ({
      ...prev,
      phone: editForm.phone,
      address: editForm.address,
      emergencyContact: editForm.emergencyContact,
      avatar: editForm.avatar
    }));
    setShowEditModal(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white p-6 md:p-8 shadow-purple-ambient border border-purple-500/20 select-none">
        {/* Inner Top Highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-gradient-to-tr from-violet-500/25 to-purple-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative group shrink-0">
              {student.avatar ? (
                <img 
                  src={student.avatar} 
                  alt={student.name} 
                  className="w-24 h-24 rounded-full object-cover border-2 border-white/20 shadow-lg group-hover:border-purple-300 transition-all duration-300"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] flex items-center justify-center border-2 border-white/20 shadow-lg group-hover:border-purple-300 transition-all duration-300 text-white text-xl font-black select-none">
                  {getInitials(student.name)}
                </div>
              )}
              <button 
                onClick={() => fileInputRef.current?.click()}
                type="button"
                className="absolute -bottom-2 -right-2 p-1.5 bg-white text-[#9333EA] rounded-lg shadow-md border border-slate-100 hover:scale-105 transition-transform cursor-pointer"
                title="Upload Profile Picture"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input 
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h2 className="text-2xl font-black tracking-tight">{student.name}</h2>
                <span className="bg-white/15 border border-white/10 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{student.status}</span>
                </span>
              </div>
              <p className="text-xs text-white/80 font-bold tracking-wide">
                Reg No: {student.regNo} &nbsp;•&nbsp; {student.course}
              </p>
              <p className="text-xs text-white/70 font-medium">
                {student.department} &nbsp;•&nbsp; {student.semester} ({student.section})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowEditModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#9333EA] hover:bg-[#7E22CE] border border-purple-500/25 text-white font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Change Password</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        {/* CGPA */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 flex items-center gap-4 hover:border-purple-300/80 hover:-translate-y-[2px]">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-650 text-white flex items-center justify-center shrink-0 shadow shadow-purple-500/10">
            <Award className="w-5.5 h-5.5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current CGPA</span>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{student.cgpa}</h3>
          </div>
        </div>

        {/* Attendance */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 flex items-center gap-4 hover:border-purple-300/80 hover:-translate-y-[2px]">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-650 text-white flex items-center justify-center shrink-0 shadow shadow-indigo-500/10">
            <CheckCircle2 className="w-5.5 h-5.5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Attendance</span>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{student.credits * 5 + 6}%</h3>
          </div>
        </div>

        {/* Credits Earned */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 flex items-center gap-4 hover:border-purple-300/80 hover:-translate-y-[2px]">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-600 text-white flex items-center justify-center shrink-0 shadow shadow-violet-500/10">
            <BookOpen className="w-5.5 h-5.5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Credits Earned</span>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{student.credits} Credits</h3>
          </div>
        </div>

        {/* Semester */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 flex items-center gap-4 hover:border-purple-300/80 hover:-translate-y-[2px]">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-purple-650 text-white flex items-center justify-center shrink-0 shadow shadow-fuchsia-500/10">
            <Calendar className="w-5.5 h-5.5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Semester</span>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{student.semester}</h3>
          </div>
        </div>
      </div>

      {/* Main Grid: Info columns + Right Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Columns details */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-text">
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-1.5 select-none">
                <User className="w-4.5 h-4.5 text-purple-600" />
                <span>Personal Information</span>
              </h3>

              <div className="space-y-3.5">
                {[
                  { label: 'Full Name', val: student.name },
                  { label: 'Registration Number', val: student.regNo },
                  { label: 'Email Address', val: student.email },
                  { label: 'Phone Number', val: student.phone },
                  { label: 'Gender', val: student.gender },
                  { label: 'Date of Birth', val: student.dob },
                  { label: 'Blood Group', val: student.bloodGroup },
                  { label: 'Address', val: student.address },
                  { label: 'Emergency Contact', val: student.emergencyContact }
                ].map(info => (
                  <div key={info.label} className="grid grid-cols-3 gap-2 text-xs">
                    <span className="text-slate-400 font-semibold">{info.label}</span>
                    <span className="col-span-2 text-slate-800 font-bold">{info.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-1.5 select-none">
                <GraduationCap className="w-4.5 h-4.5 text-indigo-600" />
                <span>Academic Information</span>
              </h3>

              <div className="space-y-3.5">
                {[
                  { label: 'Department', val: student.department },
                  { label: 'Course', val: student.course },
                  { label: 'Semester', val: student.semester },
                  { label: 'Section', val: student.section },
                  { label: 'Academic Session', val: student.academicYear },
                  { label: 'Admission Year', val: student.admissionYear },
                  { label: 'Current CGPA', val: student.cgpa },
                  { label: 'Credits Earned', val: `${student.credits} Credits` }
                ].map(info => (
                  <div key={info.label} className="grid grid-cols-3 gap-2 text-xs">
                    <span className="text-slate-400 font-semibold">{info.label}</span>
                    <span className="col-span-2 text-slate-800 font-bold">{info.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Account Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
            {/* Preferences Checkboxes */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-1.5">
                <Bell className="w-4.5 h-4.5 text-purple-650" />
                <span>Notification Preferences</span>
              </h3>

              <div className="space-y-3.5">
                {[
                  { key: 'classReminders', label: 'Class Reminders (15 mins prior)' },
                  { key: 'attendanceAlerts', label: 'Daily Attendance Absence Alerts' },
                  { key: 'resultPublications', label: 'Exam Marks Publication Notifications' },
                  { key: 'campusNotices', label: 'Administrative Announcements & Bulletins' }
                ].map(item => (
                  <label key={item.key} className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700">
                    <input 
                      type="checkbox"
                      checked={notifications[item.key]}
                      onChange={(e) => setNotifications(prev => ({ ...prev, [item.key]: e.target.checked }))}
                      className="hidden"
                    />
                    <span className="shrink-0 text-purple-600">
                      {notifications[item.key] ? <CheckSquare className="w-4.5 h-4.5" /> : <Square className="w-4.5 h-4.5 text-slate-300" />}
                    </span>
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Privacy & Security logs */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-1.5">
                <Shield className="w-4.5 h-4.5 text-indigo-600" />
                <span>Security & Privacy Settings</span>
              </h3>

              <div className="space-y-3.5 pb-2">
                {[
                  { key: 'shareProfile', label: 'Allow Faculty Members to View Personal Address' },
                  { key: 'showRank', label: 'Show Overall Academic Rank on Roster Dashboard' }
                ].map(item => (
                  <label key={item.key} className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700">
                    <input 
                      type="checkbox"
                      checked={privacySettings[item.key]}
                      onChange={(e) => setPrivacySettings(prev => ({ ...prev, [item.key]: e.target.checked }))}
                      className="hidden"
                    />
                    <span className="shrink-0 text-purple-600">
                      {privacySettings[item.key] ? <CheckSquare className="w-4.5 h-4.5" /> : <Square className="w-4.5 h-4.5 text-slate-300" />}
                    </span>
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Login Activity logs */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-1.5 select-none">
              <Clock className="w-4.5 h-4.5 text-slate-550" />
              <span>Login Activity Log</span>
            </h3>

            <div className="divide-y divide-slate-100 select-text">
              {loginActivity.map(log => (
                <div key={log.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-150 flex items-center justify-center shrink-0 text-slate-500">
                      <Laptop className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-slate-800 font-bold">{log.device}</p>
                      <p className="text-[10px] text-slate-450 mt-0.5">{log.ip} &nbsp;•&nbsp; {log.location}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Panel */}
        <div className="space-y-6 select-none">
          {/* Academic Performance Summary */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Performance Summary
            </h3>

            <div className="space-y-3 font-semibold text-xs text-slate-600">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Best Grades</span>
                <span className="text-purple-700 font-black">A+ (Discrete Math)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Completed Credits</span>
                <span className="text-slate-850 font-bold">16 / 22 Credits</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span>Exam Eligibility</span>
                <span className="text-emerald-700 font-bold">Eligible</span>
              </div>
              <div className="flex flex-col gap-2 pt-1 border-b border-slate-50 pb-3">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Overall Syllabus Progress</span>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-0.5">
                  <div className="h-full bg-purple-650 rounded-full" style={{ width: '72%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>Progress</span>
                  <span>72%</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span>Academic Rank</span>
                <span className="text-purple-700 font-bold">7th (Department)</span>
              </div>
            </div>
          </div>

          {/* Recent Activities feed */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4.5 h-4.5 text-purple-650" />
              <span>Recent Activities</span>
            </h3>

            <div className="space-y-3.5">
              {recentActivities.map(act => (
                <div key={act.id} className="flex gap-2.5 items-start text-xs border-b border-slate-50 pb-3.5 last:border-0 last:pb-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-650 font-semibold leading-relaxed" title={act.message}>{act.message}</p>
                    <span className="text-[10px] text-slate-450 font-bold mt-1 inline-block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fadeInUp">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-850 uppercase tracking-wider">Edit Personal Profile</h3>
              <button 
                type="button"
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-xs font-bold text-slate-650">
              {/* Photo Input (Local File) */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Profile Photo</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setEditForm(prev => ({ ...prev, avatar: url }));
                    }
                  }}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-medium"
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Phone Number</label>
                <input 
                  type="text" 
                  value={editForm.phone}
                  onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-medium"
                />
              </div>

              {/* Address Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Home Address</label>
                <textarea 
                  value={editForm.address}
                  onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                  rows="3"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-purple-500 font-medium resize-none"
                />
              </div>

              {/* Emergency Contact */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Emergency Contact (Guardian)</label>
                <input 
                  type="text" 
                  value={editForm.emergencyContact}
                  onChange={(e) => setEditForm(prev => ({ ...prev, emergencyContact: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#9333EA] font-medium"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#9333EA] hover:bg-[#7E22CE] text-white rounded-xl cursor-pointer shadow-2xs active:scale-95 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fadeInUp">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-850 uppercase tracking-wider">Change Password</h3>
              <button 
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4 text-xs font-bold text-slate-655">
              {/* Current Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Current Password</label>
                <input 
                  type="password" 
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#9333EA] font-medium"
                />
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">New Password</label>
                <input 
                  type="password" 
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#9333EA] font-medium"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400">Confirm New Password</label>
                <input 
                  type="password" 
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#9333EA] font-medium"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#9333EA] hover:bg-[#7E22CE] text-white rounded-xl cursor-pointer shadow-2xs active:scale-95 transition-all"
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
