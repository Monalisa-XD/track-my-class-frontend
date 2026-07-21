import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Header from './Header';

/**
 * MainLayout Component
 * Serves as the primary authenticated layout wrapper for Admin, Teacher, and Student modules.
 * Includes sticky Navbar, fixed Sidebar, dynamic Header, and scrollable Outlet content area.
 * 
 * @param {Object} props
 * @param {Object} props.user - Authenticated user details { name, email, regNo, role }
 * @param {Function} props.onLogout - Callback on logout execution
 * @param {Function} props.onHeaderAction - Callback when primary action button in Header is clicked
 */
export default function MainLayout({
  user = {
    name: 'Monalisa Jena',
    email: 'monalisa@vssut.ac.in',
    regNo: '2406151037',
    role: 'ADMIN' // Options: 'ADMIN' | 'TEACHER' | 'STUDENT'
  },
  onLogout,
  onHeaderAction
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar drawer on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden select-none">
      
      {/* Desktop Sidebar (Fixed Left) */}
      <div className="hidden md:block shrink-0">
        <Sidebar
          role={user.role}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onLogout={onLogout}
          user={user}
        />
      </div>

      {/* Mobile Sidebar Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          
          {/* Drawer Sidebar */}
          <div className="relative z-50 animate-in slide-in-from-left duration-200">
            <Sidebar
              role={user.role}
              isCollapsed={false}
              onLogout={onLogout}
              user={user}
            />
          </div>
        </div>
      )}

      {/* Main Right Area (Navbar + Header + Scrollable Content) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <Navbar
          role={user.role}
          user={user}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onLogout={onLogout}
        />

        {/* Dynamic Page Header */}
        <Header
          role={user.role}
          onActionClick={onHeaderAction}
        />

        {/* Scrollable Main Content Window */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet context={{ user, role: user.role }} />
          </div>
        </main>
      </div>

    </div>
  );
}
