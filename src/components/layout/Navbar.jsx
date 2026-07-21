import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  User,
  KeyRound,
  Settings,
  LogOut,
  ChevronDown,
  ShieldCheck,
  UserCheck2,
  BookOpenCheck
} from 'lucide-react';

const ROLE_CONFIG = {
  ADMIN: { label: 'Administrator', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200', icon: ShieldCheck },
  TEACHER: { label: 'Faculty Member', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: UserCheck2 },
  STUDENT: { label: 'Student', badgeBg: 'bg-purple-50 text-purple-700 border-purple-200', icon: BookOpenCheck }
};

export default function Navbar({
  role = 'ADMIN',
  user = { name: 'Monalisa Jena', email: 'monalisa@vssut.ac.in', regNo: '2406151037' },
  unreadCount = 3,
  onToggleMobileSidebar,
  onLogout
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const roleMeta = ROLE_CONFIG[role?.toUpperCase()] || ROLE_CONFIG.ADMIN;
  const RoleIcon = roleMeta.icon;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getProfilePath = () => `/${role.toLowerCase()}/profile`;
  const getChangePasswordPath = () => `/${role.toLowerCase()}/profile?tab=password`;
  const getSettingsPath = () => `/${role.toLowerCase()}/profile?tab=settings`;

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200/80 shadow-xs select-none">
      <div className="flex items-center justify-between h-[72px] px-4 md:px-6">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onToggleMobileSidebar}
            type="button"
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors md:hidden border border-slate-200/60"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden sm:flex items-center relative md:w-[380px] lg:w-[400px]">
            <Search className="w-4 h-4 absolute left-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, subjects, students, teachers..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-800 placeholder-slate-500 font-medium"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              type="button"
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-blue-600 rounded-full ring-2 ring-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Notifications</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                      {unreadCount} New
                    </span>
                  </div>
                  <button type="button" className="text-[11px] font-semibold text-blue-600 hover:underline">
                    Mark all read
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100/60">
                    <p className="font-semibold text-slate-800">Academic Schedule Updated</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Semester timetable slots updated by Admin.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">10 mins ago</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="font-semibold text-slate-800">Result Draft Saved</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">MCA 1st semester exam marks pending review.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              type="button"
              className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl hover:bg-slate-100/80 transition-colors group border border-transparent hover:border-slate-200"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md shrink-0">
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>

              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {user?.name || 'Monalisa Jena'}
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  {roleMeta.label}
                </span>
              </div>

              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60">
                  <p className="text-xs font-bold text-slate-800 truncate">{user?.name || 'Monalisa Jena'}</p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{user?.email || 'monalisa@vssut.ac.in'}</p>
                  <div className={`mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${roleMeta.badgeBg}`}>
                    <RoleIcon className="w-3 h-3" />
                    <span>{roleMeta.label}</span>
                  </div>
                </div>

                <div className="p-1.5 space-y-0.5">
                  <Link
                    to={getProfilePath()}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to={getChangePasswordPath()}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <KeyRound className="w-4 h-4 text-slate-400" />
                    <span>Change Password</span>
                  </Link>

                  <Link
                    to={getSettingsPath()}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Account Settings</span>
                  </Link>
                </div>

                <div className="pt-1.5 mt-1 border-t border-slate-100 px-1.5">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      if (onLogout) onLogout();
                    }}
                    type="button"
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
