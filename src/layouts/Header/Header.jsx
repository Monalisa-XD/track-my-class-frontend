import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight, Plus, Home } from 'lucide-react';
import './Header.css';

/**
 * Route metadata mapping for page titles, descriptions, and role-based action buttons
 */
const ROUTE_META = {
  dashboard: {
    title: 'Dashboard Overview',
    description: 'Welcome back! Here is an overview of your academic management portal.',
    actions: {}
  },
  departments: {
    title: 'Department Management',
    description: 'Manage all academic departments, codes, and assigned HOD details.',
    actions: {
      ADMIN: { label: 'Add Department', actionKey: 'ADD_DEPARTMENT' }
    }
  },
  courses: {
    title: 'Course Management',
    description: 'Manage academic degree programs, total duration, and fee structures.',
    actions: {
      ADMIN: { label: 'Add Course', actionKey: 'ADD_COURSE' }
    }
  },
  subjects: {
    title: 'Subject Management',
    description: 'Manage semester subjects, credit points, and recommended textbooks.',
    actions: {
      ADMIN: { label: 'Add Subject', actionKey: 'ADD_SUBJECT' }
    }
  },
  teachers: {
    title: 'Faculty & Teachers',
    description: 'Manage teacher profiles, department specializations, and credentials.',
    actions: {
      ADMIN: { label: 'Add Teacher', actionKey: 'ADD_TEACHER' }
    }
  },
  students: {
    title: 'Student Directory',
    description: 'Manage student admissions, auto-generated registration numbers, and records.',
    actions: {
      ADMIN: { label: 'Add Student', actionKey: 'ADD_STUDENT' }
    }
  },
  classes: {
    title: 'Class Management',
    description: 'Manage class sections, semesters, room assignments, and student capacity.',
    actions: {
      ADMIN: { label: 'Add Class', actionKey: 'ADD_CLASS' }
    }
  },
  schedule: {
    title: 'Timetable & Schedule',
    description: 'Manage class timetables, period slots, and teacher conflict checks.',
    actions: {
      ADMIN: { label: 'Create Schedule', actionKey: 'CREATE_SCHEDULE' }
    }
  },
  attendance: {
    title: 'Attendance Records',
    description: 'Track, mark, and monitor daily period-wise student attendance.',
    actions: {
      TEACHER: { label: 'Mark Attendance', actionKey: 'MARK_ATTENDANCE' }
    }
  },
  results: {
    title: 'Results & Examinations',
    description: 'View, upload semester marks in bulk via Excel, and publish official results.',
    actions: {
      ADMIN: { label: 'Publish Results', actionKey: 'PUBLISH_RESULTS' },
      TEACHER: { label: 'Add Results', actionKey: 'ADD_RESULTS' }
    }
  },
  syllabus: {
    title: 'Course Syllabus',
    description: 'Explore semester subjects, module breakdowns, and curriculum guides.',
    actions: {}
  },
  resources: {
    title: 'Study Resources',
    description: 'Upload, manage, and download class study materials, PPTs, and notes.',
    actions: {
      TEACHER: { label: 'Upload Resource', actionKey: 'UPLOAD_RESOURCE' }
    }
  },
  profile: {
    title: 'User Profile & Account',
    description: 'Manage your profile information, account settings, and password credentials.',
    actions: {}
  }
};

/**
 * Reusable Header Component
 */
export default function Header({
  role = 'ADMIN',
  onActionClick,
  customTitle,
  customDescription
}) {
  const location = useLocation();

  const segments = location.pathname.split('/').filter(Boolean);
  const currentKey = segments[segments.length - 1]?.toLowerCase() || 'dashboard';

  const meta = ROUTE_META[currentKey] || {
    title: currentKey.charAt(0).toUpperCase() + currentKey.slice(1),
    description: `Manage your ${currentKey} details and configuration.`,
    actions: {}
  };

  const pageTitle = customTitle || meta.title;
  const pageDescription = customDescription || meta.description;
  const pageAction = meta.actions[role?.toUpperCase()];

  const breadcrumbItems = ['Home', ...segments.map(s => s.charAt(0).toUpperCase() + s.slice(1))];

  return (
    <div className="bg-white border-b border-slate-200/80 px-4 md:px-6 py-3 shadow-xs select-none">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        
        {/* Left Side: Breadcrumb, Title & Description */}
        <div className="space-y-0.5">
          {/* Refined Breadcrumb Trail with Color Hierarchy */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium">
            <Home className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {breadcrumbItems.map((crumb, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === breadcrumbItems.length - 1;

              let colorClass = 'text-slate-500 font-medium'; // Intermediate (e.g. Admin)
              if (isFirst) colorClass = 'text-slate-400 hover:text-slate-600'; // Home
              if (isLast) colorClass = 'text-blue-600 font-bold'; // Active page (e.g. Profile)

              return (
                <React.Fragment key={`${crumb}-${idx}`}>
                  <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
                  <span className={colorClass}>{crumb}</span>
                </React.Fragment>
              );
            })}
          </nav>

          {/* Dynamic Page Title */}
          <h2 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight leading-snug">
            {pageTitle}
          </h2>

          {/* User-Friendly Dynamic Description */}
          <p className="text-xs text-slate-500 font-medium">
            {pageDescription}
          </p>
        </div>

        {/* Right Side: Dynamic Action Button */}
        {pageAction && (
          <div className="shrink-0 pt-0.5 sm:pt-0">
            <button
              onClick={() => onActionClick && onActionClick(pageAction.actionKey)}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all duration-150 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>{pageAction.label}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
