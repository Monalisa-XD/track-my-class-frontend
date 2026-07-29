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

  const getInitials = (nameStr) => {
    if (!nameStr) return 'U';
    return nameStr.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <aside
      className={`relative h-screen bg-gradient-to-b from-[#0F172A] to-[#111827] text-slate-300 flex flex-col justify-between transition-all duration-300 ease-in-out z-30 select-none border-r border-slate-800/60 shadow-2xl ${
        isCollapsed ? 'w-[76px]' : 'w-[250px]'
      }`}
    >
      {/* Top Section: Logo & Toggle */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/40 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Modern Monogram Brand Mark with subtle blue gradient container */}
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1E3A8A] to-[#2563EB] text-white shadow-md border border-white/10 shrink-0 text-sm font-black tracking-tight select-none">
              TM
            </div>

            {!isCollapsed && (
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-black text-white tracking-tight">
                  Track<span className="text-blue-500">MyClass</span>
                </span>
                <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase mt-0.5">
                  Academic ERP
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            type="button"
            className="hidden md:flex items-center justify-center w-6 h-6 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-855/60 shadow-sm cursor-pointer"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Navigation Categories */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 sidebar-scroll">
          {menuSections.map((group) => (
            <div key={group.section} className="space-y-2">
              {!isCollapsed ? (
                <div className="px-3.5 pt-2 pb-1.5 text-[11px] font-bold tracking-widest text-slate-500 uppercase flex items-center gap-2 select-none">
                  <span>{group.section}</span>
                  <div className="flex-1 h-px bg-slate-800/12" />
                </div>
              ) : (
                <div className="my-2 border-t border-slate-800/40" />
              )}

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
                      return `group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-220 sidebar-nav-item ${
                        active
                          ? 'bg-[#1D4ED8]/12 text-white border border-blue-500/10 shadow-xs sidebar-active-glow'
                          : 'text-slate-350 border border-transparent hover:bg-slate-800/30 hover:text-white'
                      }`;
                    }}
                  >
                    {({ isActive: isLinkActive }) => {
                      const active = isActive || isLinkActive;
                      return (
                        <>
                          {/* Left Accent Bar */}
                          {active && (
                            <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#1D4ED8] rounded-r-lg" />
                          )}

                          <ItemIcon
                            className={`sidebar-icon w-4.5 h-4.5 shrink-0 transition-all duration-200 ${
                              active ? 'text-white' : 'text-slate-450 group-hover:text-white'
                            }`}
                          />

                          {!isCollapsed && (
                            <span className="truncate tracking-wide font-semibold">{item.label}</span>
                          )}

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

      {/* Bottom Section */}
      <div className="p-3 border-t border-slate-800/40 bg-slate-950/20 space-y-3">
        {/* User Card Container - background #111827 */}
        <div className={`flex items-center gap-3 px-3 py-3 rounded-2xl bg-[#111827] border border-slate-900/60 shadow-sm ${isCollapsed ? 'justify-center p-2' : ''}`}>
          <div className="relative flex items-center justify-center w-[38px] h-[38px] rounded-full bg-gradient-to-br from-blue-500 to-indigo-650 text-white font-bold text-[11px] shrink-0 shadow-md">
            {getInitials(user?.name)}
            <span className="absolute bottom-0 right-0 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-[#0F172A]"></span>
            </span>
          </div>

          {!isCollapsed && (
            <div className="flex flex-col min-w-0 flex-1 select-text">
              <span className="text-xs font-bold text-white truncate leading-snug">
                {user?.name || 'Monalisa Jena'}
              </span>
              <span className="text-[9px] text-slate-400 font-bold tracking-wider mt-0.5 truncate uppercase">
                {roleMeta.label}
              </span>
            </div>
          )}
        </div>

        {/* Separated Sign Out Button in red accent */}
        <button
          onClick={onLogout}
          type="button"
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 hover:shadow-xs transition-all duration-150 group cursor-pointer ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title="Sign out of your account"
        >
          <LogOut className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5 text-rose-500" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
