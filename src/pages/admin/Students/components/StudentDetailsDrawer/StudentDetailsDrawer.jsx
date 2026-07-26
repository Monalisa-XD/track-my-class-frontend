import React from 'react';
import { X, Mail, Phone, Calendar, GraduationCap, Building2, BookOpen, LayoutGrid } from 'lucide-react';
import './StudentDetailsDrawer.css';

const getInitials = (name) => {
  if (!name) return '';
  const cleanedName = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, '');
  const parts = cleanedName.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const renderAvatar = (avatarUrl, name, sizeClass = "w-20 h-20 text-xl") => {
  if (avatarUrl) {
    return (
      <div className={`relative ${sizeClass} rounded-full bg-slate-100 border-2 border-white shadow-md shrink-0`}>
        <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }
  
  const initials = getInitials(name);
  return (
    <div className={`relative ${sizeClass} rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-extrabold font-mono tracking-wider shadow-md border-2 border-white shrink-0`}>
      {initials}
    </div>
  );
};

export default function StudentDetailsDrawer({
  isOpen = false,
  onClose,
  student = null
}) {
  if (!isOpen || !student) return null;

  const isActive = student.status === 'Active';

  return (
    <div className="fixed inset-0 z-55 overflow-hidden select-none">
      {/* Backdrop with frosted blur */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Panel Container */}
      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-white border-l border-slate-200/80 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out animate-slide-in-right">
          
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
                <GraduationCap className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 tracking-tight">Student Profile</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">VSSUT ERP Directory</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Scroll */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Profile Avatar Card Hero */}
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-gradient-to-b from-blue-50/50 via-white to-white border border-blue-100/40 shadow-2xs relative">
              <div className="absolute top-4 right-4">
                {isActive ? (
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border bg-gradient-to-r from-emerald-500/8 to-teal-500/5 text-emerald-700 border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.18)] leading-none">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border bg-gradient-to-r from-slate-400/8 to-slate-500/5 text-slate-500 border-slate-300 shadow-[0_0_8px_rgba(148,163,184,0.12)] leading-none">
                    Inactive
                  </span>
                )}
              </div>

              {renderAvatar(student.avatar, student.name)}

              <h4 className="text-base font-bold text-slate-800 tracking-tight mt-3">
                {student.name}
              </h4>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {student.course} Student
              </p>
              
              <div className="flex items-center gap-1.5 mt-3">
                <span className="inline-flex px-2.5 py-1 text-xs rounded-lg bg-blue-50 text-blue-600 border border-blue-100/60 font-mono font-bold leading-none">
                  Reg No: {student.regNo}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-slate-50 text-slate-600 border border-slate-200/60 font-bold leading-none">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{student.department} Branch</span>
                </span>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h5 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-100 pb-1.5">
                Academic Enrolment
              </h5>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/30">
                    <BookOpen className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">Semester</span>
                    <strong className="text-xs text-slate-700 font-bold mt-0.5 block">{student.semester}</strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/30">
                    <LayoutGrid className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">Class Section</span>
                    <strong className="text-xs text-slate-700 font-bold mt-0.5 block">{student.section}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <h5 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-100 pb-1.5">
                Contact Directory
              </h5>
              
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 p-3 bg-slate-50/30 border border-slate-100 rounded-xl">
                  <Mail className="w-4.5 h-4.5 text-slate-400" />
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">Institutional Email</span>
                    <a href={`mailto:${student.email}`} className="text-xs text-blue-600 font-bold hover:underline mt-0.5 block">{student.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50/30 border border-slate-100 rounded-xl">
                  <Phone className="w-4.5 h-4.5 text-slate-400" />
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">Phone Contact</span>
                    <a href={`tel:${student.phone}`} className="text-xs text-slate-700 font-bold hover:underline mt-0.5 block font-mono">{student.phone}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Admission Timeline */}
            <div className="space-y-3">
              <h5 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-100 pb-1.5">
                Timeline History
              </h5>
              
              <div className="flex items-center gap-3 p-3 bg-slate-50/30 border border-slate-100 rounded-xl">
                <Calendar className="w-4.5 h-4.5 text-slate-400" />
                <div>
                  <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">Admission Date</span>
                  <strong className="text-xs text-slate-700 font-bold mt-0.5 block font-mono">{student.admissionDate}</strong>
                </div>
              </div>
            </div>

          </div>

          {/* Footer actions */}
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
            >
              Close Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
