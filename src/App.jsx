import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminDashboard from './pages/admin/Dashboard';
import Departments from './pages/admin/Departments';
import Courses from './pages/admin/Courses';

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

export default function App() {
  // Production Auth State: Automatically determined upon login
  const [currentUser] = useState({
    name: 'Monalisa Jena',
    email: 'monalisa@vssut.ac.in',
    regNo: '2406151037',
    role: 'ADMIN' // Options: 'ADMIN' | 'TEACHER' | 'STUDENT'
  });

  const handleLogout = () => {
    console.log('User logged out');
  };

  const handleHeaderAction = (actionKey) => {
    const event = new CustomEvent('header-action', { detail: actionKey });
    window.dispatchEvent(event);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Application Shell wrapped in MainLayout */}
        <Route
          element={
            <MainLayout
              user={currentUser}
              onLogout={handleLogout}
              onHeaderAction={handleHeaderAction}
            />
          }
        >
          {/* Default Redirect */}
          <Route path="/" element={<Navigate to={`/${currentUser.role.toLowerCase()}/dashboard`} replace />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/departments" element={<Departments />} />
          <Route path="/admin/courses" element={<Courses />} />
          <Route path="/admin/subjects" element={<PlaceholderPage title="Subject Management" details="Manage subjects, semester allocations, and reference textbooks." />} />
          <Route path="/admin/teachers" element={<PlaceholderPage title="Teacher Directory" details="Register faculty members, generate credentials, and send email confirmations." />} />
          <Route path="/admin/students" element={<PlaceholderPage title="Student Directory" details="Manage student admissions, auto-generate registration numbers, and view profiles." />} />
          <Route path="/admin/classes" element={<PlaceholderPage title="Class Management" details="Create class sections, set capacity limits, and assign classrooms." />} />
          <Route path="/admin/schedule" element={<PlaceholderPage title="Timetable & Schedule" details="Schedule class period slots and resolve teacher timetable conflicts." />} />
          <Route path="/admin/attendance" element={<PlaceholderPage title="Attendance Overview" details="View system-wide student attendance reports and low-attendance alerts." />} />
          <Route path="/admin/results" element={<PlaceholderPage title="Results Management" details="Single entry or bulk Excel upload (.xlsx) and result publishing." />} />
          <Route path="/admin/profile" element={<PlaceholderPage title="Admin Profile" details="Manage account details, security settings, and password reset." />} />

          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<PlaceholderPage title="Teacher Dashboard" details="View today's class schedule, quick attendance marking, and announcements." />} />
          <Route path="/teacher/schedule" element={<PlaceholderPage title="My Class Schedule" details="Daily and weekly assigned timetable slots." />} />
          <Route path="/teacher/attendance" element={<PlaceholderPage title="Mark Attendance" details="Period-wise attendance marking (PRESENT, ABSENT, LATE)." />} />
          <Route path="/teacher/students" element={<PlaceholderPage title="My Students" details="View student class lists and attendance summaries." />} />
          <Route path="/teacher/resources" element={<PlaceholderPage title="Upload Study Resources" details="Share PDFs, PPTs, and notes with assigned classes." />} />
          <Route path="/teacher/results" element={<PlaceholderPage title="Submit Exam Marks" details="Enter student marks for internal and semester examinations." />} />
          <Route path="/teacher/profile" element={<PlaceholderPage title="Faculty Profile" details="View personal information and change password." />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<PlaceholderPage title="Student Dashboard" details="Academic summary, attendance status, upcoming classes, and recent results." />} />
          <Route path="/student/schedule" element={<PlaceholderPage title="My Timetable" details="View daily class schedules and assigned classrooms." />} />
          <Route path="/student/attendance" element={<PlaceholderPage title="Attendance Report" details="Subject-wise attendance percentage with <75% warnings." />} />
          <Route path="/student/results" element={<PlaceholderPage title="My Exam Results" details="View published semester marks and CGPA grades." />} />
          <Route path="/student/syllabus" element={<PlaceholderPage title="Course Syllabus" details="View subject modules and syllabus details." />} />
          <Route path="/student/resources" element={<PlaceholderPage title="Learning Resources" details="Download study materials shared by faculty." />} />
          <Route path="/student/profile" element={<PlaceholderPage title="Student Profile" details="View admission details and change password." />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
