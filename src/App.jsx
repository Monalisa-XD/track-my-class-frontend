import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './layouts/Sidebar';
import Navbar from './layouts/Navbar';

function AppContent() {
  // Production placeholder: Simulated authenticated user state returned after API login
  const [currentUser] = useState({
    name: 'Monalisa Jena',
    email: 'monalisa@vssut.ac.in',
    regNo: '2406151037',
    role: 'ADMIN' // Options: 'ADMIN' | 'TEACHER' | 'STUDENT' (automatically determined on auth)
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Will integrate with authService.logout() when connecting API
    console.log('Logging out user session...');
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          role={currentUser.role}
          user={currentUser}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onLogout={handleLogout}
        />

        {/* Main View Container */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                Academic ERP Overview
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Navbar and Sidebar successfully integrated with dynamic role-based rendering.
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
