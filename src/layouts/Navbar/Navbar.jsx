import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  User,
  KeyRound,
  LogOut,
  ChevronDown,
  ShieldCheck,
  UserCheck2,
  BookOpenCheck
} from 'lucide-react';
import './Navbar.css';

/**
 * Role badge configurations
 */
const ROLE_CONFIG = {
  ADMIN: { label: 'Admin', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200', icon: ShieldCheck },
  TEACHER: { label: 'Teacher', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: UserCheck2 },
  STUDENT: { label: 'Student', badgeBg: 'bg-purple-50 text-purple-700 border-purple-200', icon: BookOpenCheck }
};

/**
 * Route path to Title and Breadcrumb mapping helper
 */
const getPageMeta = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return { title: 'Dashboard', breadcrumbs: ['Home', 'Dashboard'] };

  const formattedSegments = segments.map(
    (segment) => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
  );

  const title = formattedSegments[formattedSegments.length - 1];
  return {
    title,
    breadcrumbs: formattedSegments
  };
};

/**
 * Navbar Component
 */
export default function Navbar({
  role = 'ADMIN',
  user = { name: 'Monalisa Jena', email: 'monalisa@vssut.ac.in', regNo: '2406151037' },
  onToggleMobileSidebar,
  onLogout
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { title, breadcrumbs } = getPageMeta(location.pathname);
  const roleMeta = ROLE_CONFIG[role?.toUpperCase()] || ROLE_CONFIG.ADMIN;
  const RoleIcon = roleMeta.icon;

  // Handle clicking outside profile dropdown
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

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-xs select-none">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        
        {/* Left Side: Mobile Menu Button & Breadcrumbs / Title */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={onToggleMobileSidebar}
            type="button"
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors md:hidden"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Breadcrumbs and Page Title */}
          <div className="flex flex-col">
            <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-400">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb}>
                  {idx > 0 && <span className="text-slate-300">/</span>}
                  <span className={idx === breadcrumbs.length - 1 ? 'text-slate-600 font-semibold' : ''}>
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </nav>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight leading-none mt-0.5">
              {title}
            </h1>
          </div>
        </div>

        {/* Right Side: Search, Notifications, User Profile */}
        <div className="flex items-center gap-3 md:gap-4" ref={dropdownRef}>
          
          {/* Quick Search Input (Desktop) */}
          <div className="hidden lg:flex items-center relative w-64">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search subjects, students..."
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-700 placeholder-slate-400"
            />
          </div>

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              type="button"
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {/* Notification Badge */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white animate-pulse" />
            </button>

            {/* Notifications Dropdown Window */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Notifications</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">New</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="font-semibold text-slate-700">Welcome to TrackMyClass ERP!</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Academic schedule updated for Semester 1.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              type="button"
              className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-2xl hover:bg-slate-100/80 transition-colors group border border-transparent hover:border-slate-200"
            >
              {/* Avatar */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-sm">
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>

              {/* User Name & Role (Tablet & Desktop) */}
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {user?.name || 'Monalisa Jena'}
                </span>
                <div className="flex items-center gap-1">
                  <RoleIcon className="w-3 h-3 text-slate-400" />
                  <span className="text-[10px] font-semibold text-slate-500">
                    {roleMeta.label}
                  </span>
                </div>
              </div>

              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                
                {/* User Summary Header */}
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <p className="text-xs font-bold text-slate-800 truncate">{user?.name || 'Monalisa Jena'}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.email || 'monalisa@vssut.ac.in'}</p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${roleMeta.badgeBg}">
                    <RoleIcon className="w-3 h-3" />
                    <span>{roleMeta.label}</span>
                  </div>
                </div>

                {/* Dropdown Links */}
                <div className="p-1 space-y-0.5">
                  <Link
                    to={getProfilePath()}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to={getChangePasswordPath()}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <KeyRound className="w-4 h-4 text-slate-400" />
                    <span>Change Password</span>
                  </Link>
                </div>

                {/* Divider & Logout */}
                <div className="pt-1 mt-1 border-t border-slate-100 px-1">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      if (onLogout) onLogout();
                    }}
                    type="button"
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
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
