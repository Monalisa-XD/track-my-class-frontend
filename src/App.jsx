import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './layouts/Sidebar';
import Navbar from './layouts/Navbar';
import Header from './layouts/Header';

function AppContent() {
  const [currentUser] = useState({
    name: 'Monalisa Jena',
    email: 'monalisa@vssut.ac.in',
    regNo: '2406151037',
    role: 'ADMIN' // Options: 'ADMIN' | 'TEACHER' | 'STUDENT'
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    console.log('Logging out user session...');
  };

  const handleHeaderAction = (actionKey) => {
    alert(`Triggered action: ${actionKey}`);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          role={currentUser.role}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onLogout={handleLogout}
          user={currentUser}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-50">
            <Sidebar
              role={currentUser.role}
              isCollapsed={false}
              onLogout={handleLogout}
              user={currentUser}
            />
          </div>
        </div>
      )}

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Navbar */}
        <Navbar
          role={currentUser.role}
          user={currentUser}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onLogout={handleLogout}
        />

        {/* Dynamic Page Header */}
        <Header
          role={currentUser.role}
          onActionClick={handleHeaderAction}
        />

        {/* Page Content View */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                Header Component Verification
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Notice how the Header automatically displays the breadcrumbs (<span className="text-blue-600 font-medium">Home &gt; Admin &gt; Dashboard</span>), page title, module description, and role-specific action button.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
