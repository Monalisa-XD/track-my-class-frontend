import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './layouts/Sidebar';
import { ShieldCheck, UserCheck2, BookOpenCheck } from 'lucide-react';

function AppContent() {
  const [currentRole, setCurrentRole] = useState('ADMIN');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    alert(`Logged out from ${currentRole} session`);
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar
        role={currentRole}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        onLogout={handleLogout}
      />

      {/* Preview Content Area to test Sidebar functionality */}
      <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Sidebar Component Review & Inspection
            </h1>
            <p className="text-slate-500 mt-1">
              Test role switching, expansion, collapse behavior, active route styles, and role-specific navigation menus.
            </p>

            {/* Role Switcher Toolbar */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Switch Role to Preview Navigation Menu
              </label>

              <div className="flex flex-wrap gap-3">
                {[
                  { role: 'ADMIN', label: 'Admin View', icon: ShieldCheck, color: 'bg-blue-600' },
                  { role: 'TEACHER', label: 'Teacher View', icon: UserCheck2, color: 'bg-emerald-600' },
                  { role: 'STUDENT', label: 'Student View', icon: BookOpenCheck, color: 'bg-purple-600' },
                ].map((item) => {
                  const RoleIcon = item.icon;
                  const isActive = currentRole === item.role;
                  return (
                    <button
                      key={item.role}
                      onClick={() => setCurrentRole(item.role)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                        isActive
                          ? `${item.color} text-white ring-2 ring-offset-2 ring-blue-500`
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <RoleIcon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Navigation Summary Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">Current Role Active:</span>
              <span className="px-3 py-1 bg-slate-900 text-white font-mono font-bold text-xs rounded-full">
                {currentRole}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">Sidebar Collapsed State:</span>
              <span className={`px-3 py-1 font-mono font-bold text-xs rounded-full ${isCollapsed ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {isCollapsed ? 'COLLAPSED' : 'EXPANDED'}
              </span>
            </div>
          </div>
        </div>
      </main>
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
