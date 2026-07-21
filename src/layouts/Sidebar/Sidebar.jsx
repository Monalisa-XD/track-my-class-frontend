import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  Building2,
  BookOpen,
  UserCheck,
  Users,
  School,
  Calendar,
  ClipboardCheck,
  Award,
  User,
  FolderKanban,
  BookMarked,
  FolderDown,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UserCheck2,
  BookOpenCheck
} from 'lucide-react';
import './Sidebar.css';

/**
 * Navigation items configuration by user role
 */
const MENU_CONFIG = {
  ADMIN: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Departments', path: '/admin/departments', icon: Building2 },
    { label: 'Courses', path: '/admin/courses', icon: GraduationCap },
    { label: 'Subjects', path: '/admin/subjects', icon: BookOpen },
    { label: 'Teachers', path: '/admin/teachers', icon: UserCheck },
    { label: 'Students', path: '/admin/students', icon: Users },
    { label: 'Classes', path: '/admin/classes', icon: School },
    { label: 'Schedule', path: '/admin/schedule', icon: Calendar },
    { label: 'Attendance', path: '/admin/attendance', icon: ClipboardCheck },
    { label: 'Results', path: '/admin/results', icon: Award },
    { label: 'Profile', path: '/admin/profile', icon: User },
  ],
  TEACHER: [
    { label: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
    { label: 'Schedule', path: '/teacher/schedule', icon: Calendar },
    { label: 'Students', path: '/teacher/students', icon: Users },
    { label: 'Attendance', path: '/teacher/attendance', icon: ClipboardCheck },
    { label: 'Resources', path: '/teacher/resources', icon: FolderKanban },
    { label: 'Results', path: '/teacher/results', icon: Award },
    { label: 'Profile', path: '/teacher/profile', icon: User },
  ],
  STUDENT: [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Profile', path: '/student/profile', icon: User },
    { label: 'Schedule', path: '/student/schedule', icon: Calendar },
    { label: 'Attendance', path: '/student/attendance', icon: ClipboardCheck },
    { label: 'Results', path: '/student/results', icon: Award },
    { label: 'Syllabus', path: '/student/syllabus', icon: BookMarked },
    { label: 'Resources', path: '/student/resources', icon: FolderDown },
  ]
};

const ROLE_BADGES = {
  ADMIN: { label: 'Administrator', bg: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: ShieldCheck },
  TEACHER: { label: 'Faculty Member', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: UserCheck2 },
  STUDENT: { label: 'Student', bg: 'bg-purple-500/20 text-purple-400 border-purple-500/30', icon: BookOpenCheck }
};

/**
 * Sidebar Component
 * @param {Object} props
 * @param {string} props.role - Current user role: 'ADMIN' | 'TEACHER' | 'STUDENT'
 * @param {boolean} props.isCollapsed - Collapse state
 * @param {Function} props.onToggleCollapse - Function to toggle collapse
 * @param {Function} props.onLogout - Callback on logout click
 */
export default function Sidebar({
  role = 'ADMIN',
  isCollapsed = false,
  onToggleCollapse,
  onLogout
}) {
  const location = useLocation();
  const navItems = MENU_CONFIG[role?.toUpperCase()] || MENU_CONFIG.ADMIN;
  const roleBadge = ROLE_BADGES[role?.toUpperCase()] || ROLE_BADGES.ADMIN;
  const RoleIcon = roleBadge.icon;

  return (
    <aside
      className={`relative h-screen bg-[#0F172A] text-slate-300 flex flex-col justify-between transition-all duration-300 ease-in-out z-30 select-none border-r border-slate-800 shadow-xl dark-scrollbar ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Section: Logo & Toggle */}
      <div>
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center min-w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/25">
              <GraduationCap className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col tracking-tight leading-none">
                <span className="font-extrabold text-white text-lg tracking-wide">TrackMyClass</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 mt-1">Academic ERP</span>
              </div>
            )}
          </div>

          {/* Collapse Toggle Button */}
          <button
            onClick={onToggleCollapse}
            type="button"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700/50"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* User Role Badge */}
        {!isCollapsed && (
          <div className="px-4 py-3 mx-3 mt-3 rounded-lg bg-slate-800/50 border border-slate-700/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RoleIcon className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-300">{roleBadge.label}</span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${roleBadge.bg}`}>
              {role?.toUpperCase()}
            </span>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-210px)]">
          {navItems.map((item) => {
            const ItemIcon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));

            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive: isLinkActive }) => {
                  const active = isActive || isLinkActive;
                  return `group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    active
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                  }`;
                }}
              >
                <ItemIcon className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                
                {!isCollapsed && (
                  <span className="truncate tracking-wide">{item.label}</span>
                )}

                {/* Collapsed Tooltip */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-slate-700">
                    {item.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Logout */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        <button
          onClick={onLogout}
          type="button"
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors border border-transparent hover:border-rose-500/20 group ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title="Sign out of your account"
        >
          <LogOut className="w-5 h-5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
          {!isCollapsed && <span className="font-semibold">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
