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
 * Categorized Navigation configuration by user role
 */
const CATEGORIZED_MENU = {
  ADMIN: [
    {
      section: 'MAIN',
      items: [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      section: 'ACADEMIC',
      items: [
        { label: 'Departments', path: '/admin/departments', icon: Building2 },
        { label: 'Courses', path: '/admin/courses', icon: GraduationCap },
        { label: 'Subjects', path: '/admin/subjects', icon: BookOpen },
        { label: 'Classes', path: '/admin/classes', icon: School }
      ]
    },
    {
      section: 'PEOPLE',
      items: [
        { label: 'Teachers', path: '/admin/teachers', icon: UserCheck },
        { label: 'Students', path: '/admin/students', icon: Users }
      ]
    },
    {
      section: 'MANAGEMENT',
      items: [
        { label: 'Schedule', path: '/admin/schedule', icon: Calendar },
        { label: 'Attendance', path: '/admin/attendance', icon: ClipboardCheck },
        { label: 'Results', path: '/admin/results', icon: Award }
      ]
    },
    {
      section: 'ACCOUNT',
      items: [
        { label: 'Profile', path: '/admin/profile', icon: User }
      ]
    }
  ],
  TEACHER: [
    {
      section: 'MAIN',
      items: [
        { label: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      section: 'TEACHING',
      items: [
        { label: 'Schedule', path: '/teacher/schedule', icon: Calendar },
        { label: 'Attendance', path: '/teacher/attendance', icon: ClipboardCheck },
        { label: 'Students', path: '/teacher/students', icon: Users },
        { label: 'Resources', path: '/teacher/resources', icon: FolderKanban },
        { label: 'Results', path: '/teacher/results', icon: Award }
      ]
    },
    {
      section: 'ACCOUNT',
      items: [
        { label: 'Profile', path: '/teacher/profile', icon: User }
      ]
    }
  ],
  STUDENT: [
    {
      section: 'MAIN',
      items: [
        { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      section: 'ACADEMIC',
      items: [
        { label: 'Schedule', path: '/student/schedule', icon: Calendar },
        { label: 'Attendance', path: '/student/attendance', icon: ClipboardCheck },
        { label: 'Results', path: '/student/results', icon: Award },
        { label: 'Syllabus', path: '/student/syllabus', icon: BookMarked },
        { label: 'Resources', path: '/student/resources', icon: FolderDown }
      ]
    },
    {
      section: 'ACCOUNT',
      items: [
        { label: 'Profile', path: '/student/profile', icon: User }
      ]
    }
  ]
};

const ROLE_DETAILS = {
  ADMIN: { label: 'Administrator', badgeBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  TEACHER: { label: 'Faculty Member', badgeBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  STUDENT: { label: 'Student', badgeBg: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
};

/**
 * Enhanced Sidebar Component
 */
export default function Sidebar({
  role = 'ADMIN',
  isCollapsed = false,
  onToggleCollapse,
  onLogout,
  user = { name: 'Monalisa Jena', email: 'monalisa@vssut.ac.in' }
}) {
  const location = useLocation();
  const menuSections = CATEGORIZED_MENU[role?.toUpperCase()] || CATEGORIZED_MENU.ADMIN;
  const roleMeta = ROLE_DETAILS[role?.toUpperCase()] || ROLE_DETAILS.ADMIN;

  return (
    <aside
      className={`relative h-screen bg-[#0F172A] text-slate-300 flex flex-col justify-between transition-all duration-300 ease-in-out z-30 select-none border-r border-slate-800/80 shadow-2xl ${
        isCollapsed ? 'w-[76px]' : 'w-[250px]'
      }`}
    >
      {/* Top Section: Logo & Toggle */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Logo Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>

            {/* Logo Text */}
            {!isCollapsed && (
              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Track<span className="text-blue-500">MyClass</span>
                </span>
                <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase mt-0.5">
                  Academic ERP
                </span>
              </div>
            )}
          </div>

          {/* Collapse Toggle Button */}
          <button
            onClick={onToggleCollapse}
            type="button"
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700/60 shadow-sm"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Navigation Categories */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4 sidebar-scroll">
          {menuSections.map((group) => (
            <div key={group.section} className="space-y-1">
              {/* Category Header */}
              {!isCollapsed ? (
                <div className="px-3 pt-2 pb-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                  {group.section}
                </div>
              ) : (
                <div className="my-2 border-t border-slate-800/60" />
              )}

              {/* Items in Category */}
              {group.items.map((item) => {
                const ItemIcon = item.icon;
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== '/' && location.pathname.startsWith(item.path));

                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    className={({ isActive: isLinkActive }) => {
                      const active = isActive || isLinkActive;
                      return `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                        active
                          ? 'bg-[#2563EB] text-white font-semibold shadow-md shadow-blue-600/30 overflow-hidden'
                          : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
                      }`;
                    }}
                  >
                    {({ isActive: isLinkActive }) => {
                      const active = isActive || isLinkActive;
                      return (
                        <>
                          {/* Active Left Indicator Bar */}
                          {active && (
                            <span className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r-full shadow-sm" />
                          )}

                          <ItemIcon
                            className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                              active ? 'text-white' : 'text-slate-400 group-hover:text-white group-hover:scale-105'
                            }`}
                          />

                          {!isCollapsed && (
                            <span className="truncate tracking-wide">{item.label}</span>
                          )}

                          {/* Tooltip on Collapsed State */}
                          {isCollapsed && (
                            <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-slate-700">
                              {item.label}
                            </div>
                          )}
                        </>
                      );
                    }}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Section: User Profile & Logout */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/50 space-y-2">
        {/* User Card */}
        <div className={`flex items-center gap-3 px-2 py-1.5 rounded-xl ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm shrink-0 shadow-md">
            {user?.name ? user.name.charAt(0) : 'U'}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0F172A]" />
          </div>

          {!isCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-bold text-white truncate leading-snug">
                👤 {user?.name || 'Monalisa Jena'}
              </span>
              <span className="text-xs text-slate-400 truncate">
                {roleMeta.label}
              </span>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          type="button"
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-150 group ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title="Sign out of your account"
        >
          <LogOut className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
