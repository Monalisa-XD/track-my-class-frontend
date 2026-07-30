import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProfile from './pages/admin/profile';
import Departments from './pages/admin/Departments';
import Courses from './pages/admin/Courses';
import Subjects from './pages/admin/Subjects';
import Teachers from './pages/admin/Teachers';
import Students from './pages/admin/Students';
import Classes from './pages/admin/Classes';
import Schedule from './pages/admin/Schedule';
import AttendancePage from './pages/admin/attendance';
import ResultsPage from './pages/admin/results';
import TeacherDashboard from './pages/teacher/dashboard';
import TeacherSchedule from './pages/teacher/schedule';
import TeacherAttendance from './pages/teacher/attendance';
import TeacherStudents from './pages/teacher/students';
import TeacherResources from './pages/teacher/resources';
import TeacherResults from './pages/teacher/results';
import TeacherProfile from './pages/teacher/profile';
import StudentDashboard from './pages/student/dashboard';
import StudentSchedule from './pages/student/schedule';
import StudentAttendance from './pages/student/attendance';
import StudentResults from './pages/student/results';
import StudentSyllabus from './pages/student/syllabus';
import StudentResources from './pages/student/resources';
import StudentProfile from './pages/student/profile';
import Login from './pages/auth/login';

import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-800 space-y-2 select-text">
          <h2 className="text-lg font-bold">Something went wrong.</h2>
          <pre className="text-xs font-mono bg-red-100 p-4 rounded-lg overflow-auto">
            {this.state.error?.stack || this.state.error?.toString()}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Placeholder Page Component for other sub-routes until implemented
 */
function PlaceholderPage({ title, details }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
      <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
      <p className="text-slate-500 text-sm">{details}</p>
    </div>
  );
}

function AppContent() {
  const { currentUser, login: handleLogin, logout: handleLogout } = useAuth();

  const handleHeaderAction = (actionKey) => {
    const event = new CustomEvent('header-action', { detail: actionKey });
    window.dispatchEvent(event);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route 
          path="/login" 
          element={
            currentUser ? (
              <Navigate to={`/${currentUser.role.toLowerCase()}/dashboard`} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } 
        />

        {/* Protected Application Shell wrapped in MainLayout */}
        <Route
          element={
            currentUser ? (
              <MainLayout
                user={currentUser}
                onLogout={handleLogout}
                onHeaderAction={handleHeaderAction}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          {/* Default Redirect */}
          <Route 
            path="/" 
            element={
              currentUser ? (
                <Navigate to={`/${currentUser.role.toLowerCase()}/dashboard`} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/departments" element={<Departments />} />
            <Route path="/admin/courses" element={<Courses />} />
            <Route path="/admin/subjects" element={<Subjects />} />
            <Route path="/admin/teachers" element={<Teachers />} />
            <Route path="/admin/students" element={<Students />} />
            <Route path="/admin/classes" element={<Classes />} />
            <Route path="/admin/schedule" element={<Schedule />} />
            <Route path="/admin/attendance" element={<AttendancePage />} />
            <Route path="/admin/results" element={<ResultsPage />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>

          {/* Teacher Protected Routes */}
          <Route element={<ProtectedRoute allowedRole="TEACHER" />}>
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/schedule" element={<TeacherSchedule />} />
            <Route path="/teacher/attendance" element={<TeacherAttendance />} />
            <Route path="/teacher/students" element={<TeacherStudents />} />
            <Route path="/teacher/resources" element={<TeacherResources />} />
            <Route path="/teacher/results" element={<TeacherResults />} />
            <Route path="/teacher/profile" element={<ErrorBoundary><TeacherProfile /></ErrorBoundary>} />
          </Route>

          {/* Student Protected Routes */}
          <Route element={<ProtectedRoute allowedRole="STUDENT" />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/schedule" element={<StudentSchedule />} />
            <Route path="/student/attendance" element={<StudentAttendance />} />
            <Route path="/student/results" element={<StudentResults />} />
            <Route path="/student/syllabus" element={<StudentSyllabus />} />
            <Route path="/student/resources" element={<StudentResources />} />
            <Route path="/student/profile" element={<StudentProfile />} />
          </Route>
        </Route>
        
        {/* Wildcard Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  );
}
