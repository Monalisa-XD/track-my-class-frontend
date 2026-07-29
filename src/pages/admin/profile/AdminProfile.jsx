import React, { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Bell, 
  Clock, 
  Users, 
  BookOpen, 
  Calendar, 
  Activity, 
  Lock, 
  Edit2, 
  Camera, 
  X, 
  CheckCircle2, 
  Database, 
  Server, 
  Settings, 
  Building2,
  RefreshCw
} from 'lucide-react';
import { adminProfileData } from './profileData';
import './AdminProfile.css';

export default function AdminProfile() {
  const { admin, summaryStats, systemOverview, permissions, recentActivities } = adminProfileData;

  // Profile Image State
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // Editable Profile States
  const [phone, setPhone] = useState(admin.phone);
  const [address, setAddress] = useState(admin.address);
  const [designation, setDesignation] = useState(admin.designation);

  // Temp Modal States
  const [tempPhone, setTempPhone] = useState(phone);
  const [tempAddress, setTempAddress] = useState(address);
  const [tempDesignation, setTempDesignation] = useState(designation);

  // Password States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Modals visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Toggles local state for Security settings
  const [sec2FA, setSec2FA] = useState(true);
  const [secAlerts, setSecAlerts] = useState(true);
  const [secTimeout, setSecTimeout] = useState(true);

  // Toggles local state for Account Preferences Settings
  const [prefEmailNotif, setPrefEmailNotif] = useState(true);
  const [prefSystemNotif, setPrefSystemNotif] = useState(true);
  const [prefMaintenanceAlert, setPrefMaintenanceAlert] = useState(true);

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '';
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setPhone(tempPhone);
    setAddress(tempAddress);
    setDesignation(tempDesignation);
    setIsEditModalOpen(false);
    alert('Admin details updated successfully!');
  };

  const openEditModal = () => {
    setTempPhone(phone);
    setTempAddress(address);
    setTempDesignation(designation);
    setIsEditModalOpen(true);
  };

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

  // Helper: render timeline activity icon
  const getActivityIcon = (type) => {
    switch (type) {
      case 'system':
        return <Database className="w-4 h-4 text-indigo-500" />;
      case 'update':
        return <RefreshCw className="w-4 h-4 text-amber-500 animate-spin-slow" />;
      case 'security':
        return <Lock className="w-4 h-4 text-red-500" />;
      case 'user':
        return <User className="w-4 h-4 text-emerald-500" />;
      case 'department':
        return <Building2 className="w-4 h-4 text-blue-500" />;
      default:
        return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 relative min-h-screen">
      {/* Hidden File Input for Profile Image */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Hero Section Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white p-6 md:p-8 shadow-ambient border border-blue-500/30 transition-all duration-300 hover:shadow-ambient-hover select-none">
        {/* Inner Top Highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Decorative Orbs */}
        <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-gradient-to-tr from-indigo-500/20 to-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-48 -top-24 w-56 h-56 bg-blue-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Avatar Photo, Name, and Designation */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative group shrink-0">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Admin Profile" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-white/20 shadow-lg group-hover:border-blue-300 transition-all duration-300" 
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#1E40AF] to-[#3B82F6] flex items-center justify-center border-2 border-white/20 shadow-lg group-hover:border-blue-300 transition-all duration-300 text-white text-xl font-black select-none">
                  {getInitials(admin.name)}
                </div>
              )}
              <button 
                onClick={() => fileInputRef.current?.click()}
                type="button"
                className="absolute -bottom-2 -right-2 p-1.5 bg-white text-[#2563EB] rounded-lg shadow-md border border-slate-100 hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
                title="Upload Profile Picture"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">{admin.name}</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-250 border border-emerald-400/30 shadow-inner">
                  <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                  Active Administrator
                </span>
              </div>
              <p className="text-sm text-blue-100/90 font-medium">
                {designation} &nbsp;•&nbsp; {admin.department}
              </p>
              <p className="text-xs text-blue-200/80 font-mono font-bold">Admin ID: {admin.employeeId}</p>
            </div>
          </div>

          {/* Quick Actions with transition effects */}
          <div className="shrink-0 flex justify-center sm:justify-end gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-white/15">
            <button
              type="button"
              onClick={openEditModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#2563EB] hover:bg-blue-50 font-bold text-xs rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl backdrop-blur-md border border-white/20 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-blue-200" />
              <span>Change Password</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        {/* Departments Managed */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-blue hover:border-blue-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Departments Managed</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{summaryStats.departmentsManaged}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Total Academic Units</p>
          </div>
        </div>

        {/* Total Teachers */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-indigo hover:border-indigo-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Teachers</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{summaryStats.totalTeachers}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Faculty Members</p>
          </div>
        </div>

        {/* Total Students */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-emerald hover:border-emerald-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all">
            <User className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Students</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{summaryStats.totalStudents}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Active Enrolled</p>
          </div>
        </div>

        {/* Active Courses */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-ambient-hover flex items-center gap-4 overflow-hidden hover:shadow-glow-amber hover:border-amber-300/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Courses</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{summaryStats.activeCourses}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Degree Programs</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid - responsive stacked cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
        {/* Left Card: Personal Information */}
        <div className="relative bg-white rounded-2xl border border-slate-200/80 shadow-ambient p-6 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div>
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800 tracking-tight uppercase">Personal Information</h3>
            </div>

            <div className="space-y-4 text-xs font-semibold text-slate-600">
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">Full Name</span>
                <span className="col-span-2 text-slate-800">{admin.name}</span>
              </div>
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">Email</span>
                <span className="col-span-2 text-slate-800 break-all">{admin.email}</span>
              </div>
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">Phone Number</span>
                <span className="col-span-2 text-slate-800">{phone}</span>
              </div>
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">Employee ID</span>
                <span className="col-span-2 text-slate-850 font-mono">{admin.employeeId}</span>
              </div>
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">Designation</span>
                <span className="col-span-2 text-slate-800">{designation}</span>
              </div>
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">Office Address</span>
                <span className="col-span-2 text-slate-800 leading-relaxed">{address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Card: Administrative Information */}
        <div className="relative bg-white rounded-2xl border border-slate-200/80 shadow-ambient p-6 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div>
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800 tracking-tight uppercase">Administrative Information</h3>
            </div>

            <div className="space-y-4 text-xs font-semibold text-slate-600">
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">Role</span>
                <span className="col-span-2 text-slate-800 font-bold">{admin.role}</span>
              </div>
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">Department</span>
                <span className="col-span-2 text-slate-800">{admin.department}</span>
              </div>
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">Joined Date</span>
                <span className="col-span-2 text-slate-800">{admin.joiningDate}</span>
              </div>
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">Last Login</span>
                <span className="col-span-2 text-slate-800">{admin.lastLogin}</span>
              </div>
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">Status</span>
                <span className="col-span-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-400/20">
                    Active
                  </span>
                </span>
              </div>
              <div className="flex flex-col gap-1.5 pt-2">
                <span className="text-slate-400 font-bold mb-1">System Permissions</span>
                <div className="flex flex-wrap gap-1.5">
                  {permissions.map((perm, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: System Overview */}
        <div className="relative bg-white rounded-2xl border border-slate-200/80 shadow-ambient p-6 flex flex-col justify-between overflow-hidden md:col-span-2 lg:col-span-1">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div>
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <Server className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800 tracking-tight uppercase">System Overview</h3>
            </div>

            <div className="space-y-4 text-xs font-semibold text-slate-600">
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">Users Managed</span>
                <span className="col-span-2 text-slate-800 font-bold">{systemOverview.usersManaged}</span>
              </div>
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">Active Depts</span>
                <span className="col-span-2 text-slate-800 font-bold">{systemOverview.activeDepartments}</span>
              </div>
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">System Health</span>
                <span className="col-span-2 text-emerald-600 font-bold">{systemOverview.systemHealth}</span>
              </div>
              <div className="grid grid-cols-3 py-1 hover:bg-slate-50 rounded px-1 transition-colors">
                <span className="text-slate-400">Activity Logs</span>
                <span className="col-span-2 text-slate-850">{systemOverview.recentActivityCount} logs / 24h</span>
              </div>

              {/* Storage Progress Bar */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
                  <span>Storage Usage</span>
                  <span className="text-slate-600">{systemOverview.storageUsage}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" 
                    style={{ width: `${systemOverview.storageUsage}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-450 italic mt-0.5">{systemOverview.storageDetails}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Administrative Activities timeline */}
        <div className="lg:col-span-2 relative bg-white rounded-2xl border border-slate-200/80 shadow-ambient p-6 overflow-hidden select-none">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-800 tracking-tight uppercase">Recent Administrative Activities</h3>
          </div>

          <div className="relative pl-8 space-y-6 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
            {recentActivities.map((act) => {
              return (
                <div key={act.id} className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                  {/* Timeline Dot container with specific icon type */}
                  <div className="absolute -left-[28px] top-[2px] w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs">
                    {getActivityIcon(act.type)}
                  </div>
                  
                  <div className="flex-1 text-xs font-semibold text-slate-700 transition-colors group-hover:text-slate-900 ml-2">
                    {act.message}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 shrink-0">
                    <Clock className="w-3 h-3 text-slate-350" />
                    <span>{act.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security Settings & Preferences with Modern Toggle Switches */}
        <div className="space-y-6">
          {/* Security Settings Card */}
          <div className="relative bg-white rounded-2xl border border-slate-200/80 shadow-ambient p-6 overflow-hidden select-none">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <Lock className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800 tracking-tight uppercase">Security Settings</h3>
            </div>

            <div className="space-y-4">
              {/* Toggle Switch 1 */}
              <div 
                className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                onClick={() => setSec2FA(!sec2FA)}
              >
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800">Two-Factor Authentication</h4>
                  <p className="text-[10px] text-slate-450 font-medium">Secure account with 2FA code verification.</p>
                </div>
                {/* Modern Toggle Switch UI */}
                <div className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 ${sec2FA ? 'bg-[#2563EB]' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${sec2FA ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>

              {/* Toggle Switch 2 */}
              <div 
                className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                onClick={() => setSecAlerts(!secAlerts)}
              >
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800">Login Security Alerts</h4>
                  <p className="text-[10px] text-slate-450 font-medium">Get notifications about new logins.</p>
                </div>
                {/* Modern Toggle Switch UI */}
                <div className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 ${secAlerts ? 'bg-[#2563EB]' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${secAlerts ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>

              {/* Toggle Switch 3 */}
              <div 
                className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                onClick={() => setSecTimeout(!secTimeout)}
              >
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800">Session Timeout</h4>
                  <p className="text-[10px] text-slate-450 font-medium">Auto-logout after 30 minutes of inactivity.</p>
                </div>
                {/* Modern Toggle Switch UI */}
                <div className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 ${secTimeout ? 'bg-[#2563EB]' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${secTimeout ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Account Preferences Card */}
          <div className="relative bg-white rounded-2xl border border-slate-200/80 shadow-ambient p-6 overflow-hidden select-none">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <Settings className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800 tracking-tight uppercase">Account Preferences</h3>
            </div>

            <div className="space-y-4">
              {/* Toggle Switch 4 */}
              <div 
                className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                onClick={() => setPrefEmailNotif(!prefEmailNotif)}
              >
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800">System Email Reports</h4>
                  <p className="text-[10px] text-slate-450 font-medium">Receive weekly system metrics & summary reports.</p>
                </div>
                {/* Modern Toggle Switch UI */}
                <div className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 ${prefEmailNotif ? 'bg-[#2563EB]' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${prefEmailNotif ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>

              {/* Toggle Switch 5 */}
              <div 
                className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                onClick={() => setPrefSystemNotif(!prefSystemNotif)}
              >
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800">In-App Banner Notifications</h4>
                  <p className="text-[10px] text-slate-450 font-medium">Receive critical logs inside app header.</p>
                </div>
                {/* Modern Toggle Switch UI */}
                <div className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 ${prefSystemNotif ? 'bg-[#2563EB]' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${prefSystemNotif ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>

              {/* Toggle Switch 6 */}
              <div 
                className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                onClick={() => setPrefMaintenanceAlert(!prefMaintenanceAlert)}
              >
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800">Maintenance Window Alerts</h4>
                  <p className="text-[10px] text-slate-450 font-medium">Get notifications about upcoming scheduled downtimes.</p>
                </div>
                {/* Modern Toggle Switch UI */}
                <div className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 ${prefMaintenanceAlert ? 'bg-[#2563EB]' : 'bg-slate-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${prefMaintenanceAlert ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs modal-fade-in p-4">
          <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200 shadow-2xl modal-slide-down overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-800 text-sm">Edit Admin Details</h3>
              <button 
                type="button" 
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleSaveProfile} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Designation</label>
                <input 
                  type="text" 
                  value={tempDesignation}
                  onChange={(e) => setTempDesignation(e.target.value)}
                  className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Phone Number</label>
                <input 
                  type="text" 
                  value={tempPhone}
                  onChange={(e) => setTempPhone(e.target.value)}
                  className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Office Address</label>
                <textarea 
                  value={tempAddress}
                  onChange={(e) => setTempAddress(e.target.value)}
                  rows="3"
                  className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-[#2563EB] hover:bg-[#1D4ED8] font-bold text-xs rounded-xl transition-all cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs modal-fade-in p-4">
          <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200 shadow-2xl modal-slide-down overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-800 text-sm">Change Security Password</h3>
              <button 
                type="button" 
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleChangePasswordSubmit} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Current Password</label>
                <input 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-[#2563EB] hover:bg-[#1D4ED8] font-bold text-xs rounded-xl transition-all cursor-pointer"
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
