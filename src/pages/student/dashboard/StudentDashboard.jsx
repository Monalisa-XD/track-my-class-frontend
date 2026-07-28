import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Users, 
  Calendar, 
  BookOpen, 
  Activity, 
  Clock, 
  GraduationCap, 
  MapPin, 
  ChevronRight, 
  FileText, 
  Bell, 
  AlertCircle, 
  Sparkles,
  ClipboardCheck,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { studentDashboardData } from './data/dashboardData';
import './StudentDashboard.css';

export default function StudentDashboard() {
  const { student, todayClasses, recentResults, assignments, announcements, subjectAttendance, semesterProgress, notifications, upcomingEvents } = studentDashboardData;

  // Helper: Status badge color mapping
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Upcoming':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Completed':
        return 'bg-slate-100 text-slate-500 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-650 border-slate-150';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'Ongoing':
        return '🟢';
      case 'Upcoming':
        return '🔵';
      case 'Completed':
        return '⚪';
      default:
        return '⚪';
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Welcome Banner Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 text-white p-6 md:p-8 shadow-purple-ambient border border-purple-500/20 transition-all duration-300 hover:shadow-purple-ambient">
        {/* Inner Top Highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Decorative Orbs */}
        <div className="absolute -right-12 -bottom-12 w-72 h-72 bg-gradient-to-tr from-violet-500/25 to-purple-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-48 -top-24 w-56 h-56 bg-purple-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-purple-200 font-bold uppercase tracking-wider">Student Portal</p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
                Good Morning, <br />Prasad Kumar Rauta 👋
              </h2>
            </div>

            {/* Quick stats panel */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-purple-100/90 pt-1">
              <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">Reg No: {student.regNo}</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">{student.department}</span>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">{student.semester} &nbsp;•&nbsp; {student.section}</span>
            </div>
          </div>

          <div className="shrink-0 text-left md:text-right border-t md:border-t-0 border-white/15 pt-4 md:pt-0">
            <p className="text-xs text-purple-200 font-bold uppercase tracking-wider">Academic Year</p>
            <p className="text-base font-extrabold mt-0.5">{student.academicYear}</p>
            <p className="text-xs text-purple-200/80 font-semibold mt-1">July 28, 2026</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Attendance */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-purple-300/80 flex items-center gap-4 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Attendance</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{student.overallAttendance}%</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Across all subjects</p>
          </div>
        </div>

        {/* Today's Classes */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-purple-300/80 flex items-center gap-4 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Today's Classes</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{student.todayClassesCount}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Active periods today</p>
          </div>
        </div>

        {/* Current CGPA */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-purple-300/80 flex items-center gap-4 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-all">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current CGPA</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{student.cgpa}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Cumulative score scale</p>
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-purple-300/80 flex items-center gap-4 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent opacity-60" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-purple-650 text-white flex items-center justify-center shrink-0 shadow-lg shadow-fuchsia-500/20 group-hover:scale-105 transition-all">
            <FileText className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Tasks</span>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mt-1">{student.pendingAssignmentsCount}</h3>
            <p className="text-xs text-slate-500 font-semibold truncate mt-1">Deadlines approaching</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Widgets + Right Sidebar Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left column dashboard widgets */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Actions Panel */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Quick Academic Actions
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'My Schedule', path: '/student/schedule', icon: Calendar, color: 'text-purple-600 bg-purple-50 border-purple-100/50' },
                { label: 'Attendance', path: '/student/attendance', icon: ClipboardCheck, color: 'text-indigo-600 bg-indigo-50 border-indigo-100/50' },
                { label: 'Results', path: '/student/results', icon: Award, color: 'text-violet-600 bg-violet-50 border-violet-100/50' },
                { label: 'Syllabus', path: '/student/syllabus', icon: Bookmark, color: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100/50' },
                { label: 'Resources', path: '/student/resources', icon: BookOpen, color: 'text-blue-600 bg-blue-50 border-blue-100/50' },
                { label: 'Profile', path: '/student/profile', icon: Users, color: 'text-slate-700 bg-slate-50 border-slate-200' }
              ].map(act => {
                const ActIcon = act.icon || BookOpen;
                return (
                  <Link
                    key={act.label}
                    to={act.path}
                    className="p-4.5 rounded-2xl border flex flex-col items-center text-center justify-between gap-3 shadow-2xs hover:shadow-purple-ambient hover:scale-[1.03] transition-all hover:border-purple-300 group"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${act.color} group-hover:scale-105 transition-all`}>
                      {React.createElement(ActIcon, { className: "w-5 h-5" })}
                    </div>
                    <span className="text-xs font-bold text-slate-700 group-hover:text-purple-700 truncate w-full">{act.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Today's Timetable */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4.5 h-4.5 text-purple-650" />
                <span>Today's Timetable</span>
              </h3>
              <Link to="/student/schedule" className="text-xs font-bold text-purple-600 hover:text-purple-700 inline-flex items-center gap-0.5">
                <span>View Full Schedule</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {todayClasses.map(cls => (
                <div key={cls.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 bg-slate-50 border-slate-200`}>
                      <BookOpen className="w-4.5 h-4.5 text-slate-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-850 tracking-tight">{cls.subjectName}</h4>
                      <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                        {cls.instructor} &nbsp;•&nbsp; {cls.room}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg">
                      {cls.time}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-extrabold border ${getStatusBadge(cls.status)}`}>
                      <span>{getStatusDot(cls.status)}</span>
                      <span>{cls.status}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Results */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4.5 h-4.5 text-purple-600" />
                  <span>Recent Results</span>
                </h3>
                <Link to="/student/results" className="text-xs font-bold text-purple-600 hover:text-purple-700">
                  All Marks
                </Link>
              </div>

              <div className="space-y-3.5">
                {recentResults.map(res => (
                  <div key={res.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-150">
                    <div className="min-w-0 flex-1 pr-2">
                      <h4 className="text-xs font-bold text-slate-850 truncate">{res.subject}</h4>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{res.exam}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-slate-700">{res.score}</span>
                      <span className="text-xs font-black text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-md">
                        {res.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignment Deadlines */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4.5 h-4.5 text-fuchsia-600" />
                  <span>Approaching Deadlines</span>
                </h3>
              </div>

              <div className="space-y-3.5">
                {assignments.map(asg => (
                  <div key={asg.id} className="flex gap-2.5 items-start text-xs border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mt-1.5 shrink-0 animate-pulse" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-850 truncate" title={asg.title}>{asg.title}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{asg.subject}</p>
                      <div className="flex items-center justify-between mt-1 text-[10px] font-bold">
                        <span className="text-slate-400">{asg.dueDate}</span>
                        <span className="text-fuchsia-700 bg-fuchsia-50 border border-fuchsia-100 px-1.5 py-0.5 rounded">
                          {asg.daysLeft} days left
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Announcements Board */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-purple-ambient space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-amber-500" />
              <span>Campus Announcements</span>
            </h3>

            <div className="space-y-4">
              {announcements.map(ann => (
                <div key={ann.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-150 hover:border-slate-250 transition-colors space-y-2">
                  <div className="flex items-center justify-between gap-1.5">
                    <h4 className="text-xs font-extrabold text-slate-850">{ann.title}</h4>
                    <span className="text-[10px] text-slate-400 font-bold shrink-0">{ann.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Panel */}
        <div className="space-y-6">
          {/* Circular/Progress Attendance Overview */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <ClipboardCheck className="w-4.5 h-4.5 text-purple-650" />
              <span>Subject Attendance</span>
            </h3>

            <div className="space-y-3.5">
              {subjectAttendance.map(att => (
                <div key={att.subject} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-550 truncate pr-2">{att.subject}</span>
                    <span className="text-slate-850 font-bold shrink-0">{att.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${att.color}`} 
                      style={{ width: `${att.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Semester Progress */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Semester Progress
            </h3>

            <div className="space-y-3">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-600 h-full rounded-full transition-all duration-300" 
                  style={{ width: `${semesterProgress.percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span>Week {semesterProgress.completedWeeks} / {semesterProgress.totalWeeks}</span>
                <span>{semesterProgress.percentage}% Completed</span>
              </div>
            </div>
          </div>

          {/* Upcoming Exams Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4.5 h-4.5 text-purple-600" />
              <span>Upcoming Exam</span>
            </h3>

            <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-100 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] text-purple-650 font-bold uppercase tracking-wider">
                <span>Database Systems</span>
                <span className="bg-purple-150 text-purple-700 px-2 py-0.5 rounded-lg border border-purple-250">End-Sem</span>
              </div>
              <h4 className="text-sm font-black text-slate-800">August 10, 2026</h4>
              <p className="text-xs text-slate-500 font-semibold">Time: 10:00 AM – 01:00 PM</p>
              <p className="text-[10px] text-slate-400 font-semibold">Venue: Hall 3, Ramanujan Block</p>
            </div>
          </div>

          {/* Recent Notifications feed */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Bell className="w-4.5 h-4.5 text-indigo-555" />
              <span>Notifications</span>
            </h3>

            <div className="space-y-3.5">
              {notifications.map(notif => (
                <div key={notif.id} className="flex gap-2.5 items-start text-xs border-b border-slate-50 pb-3.5 last:border-0 last:pb-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-650 font-semibold leading-relaxed" title={notif.message}>{notif.message}</p>
                    <span className="text-[10px] text-slate-400 font-bold mt-1 inline-block">{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-purple-ambient select-none space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Upcoming Events
            </h3>

            <div className="space-y-3">
              {upcomingEvents.map(evt => (
                <div key={evt.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                  <h4 className="text-xs font-bold text-slate-800">{evt.title}</h4>
                  <span className="text-[10px] text-slate-400 font-bold">{evt.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
