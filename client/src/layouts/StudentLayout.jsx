import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  CalendarCheck,
  Award,
  FileCheck,
  Sparkles,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Clock,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated, isStudent, logout, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-navy-900 font-bold">Accessing Student Portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isStudent) {
    return <Navigate to="/student/login" state={{ from: location }} replace />;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { name: 'My Courses & Schedule', path: '/student/courses', icon: BookOpen },
    { name: 'Study Materials', path: '/student/materials', icon: FileText },
    { name: 'Attendance Record', path: '/student/attendance', icon: CalendarCheck },
    { name: 'Mock Test Results', path: '/student/results', icon: Award },
    { name: 'Certificate Requests', path: '/student/certificates', icon: FileCheck },
    { name: 'Admission Applications', path: '/student/admissions', icon: Sparkles },
    { name: 'Notices & Alerts', path: '/student/announcements', icon: Bell },
    { name: 'My Profile', path: '/student/profile', icon: User },
  ];

  const isActive = (path) => {
    if (path === '/student') return location.pathname === '/student';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/student/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-navy-950 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-navy-800 border border-gold-500 flex items-center justify-center font-black text-gold-400 text-xs">
            RCC
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">Student Portal</h1>
            <p className="text-[10px] text-gold-400">{user?.studentId || 'Enrolled Student'}</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 bg-navy-950 text-slate-300 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Institute Portal Header */}
          <div className="p-5 border-b border-navy-800/80">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-lg bg-navy-900 border-2 border-gold-500 flex items-center justify-center text-white font-black text-sm text-gold-400">
                RCC
              </div>
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-wider">
                  Ratnam Portal
                </h2>
                <p className="text-[10px] text-gold-400 font-semibold">
                  Estd. 1998 • Bhimavaram
                </p>
              </div>
            </Link>

            {/* Student Info Card */}
            <div className="mt-4 p-3 bg-navy-900 rounded-lg border border-navy-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-gold-500 text-navy-950 font-black text-xs flex items-center justify-center">
                  {user?.name?.charAt(0) || 'S'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono truncate">{user?.studentId || user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all duration-150 ${
                    active
                      ? 'bg-gold-500 text-navy-950 shadow-md font-extrabold'
                      : 'text-slate-300 hover:bg-navy-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-navy-950' : 'text-gold-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-navy-800/80 space-y-2">
          <div className="p-2.5 bg-navy-900/80 rounded border border-navy-800 text-[11px] text-slate-300 text-center">
            <p className="font-semibold text-gold-400">"Work Like a Clock"</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Discipline & Consistency</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              to="/"
              className="flex items-center justify-center gap-1 py-2 px-2 rounded bg-navy-900 hover:bg-navy-800 text-slate-200 text-xs font-semibold"
            >
              <ExternalLink className="w-3 h-3 text-gold-400" />
              Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1 py-2 px-2 rounded bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 text-red-300 text-xs font-semibold"
            >
              <LogOut className="w-3 h-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Desktop Bar */}
        <header className="hidden md:flex bg-white border-b border-slate-200 px-8 py-3.5 items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Ratnam Student Portal
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-navy-900">
              Welcome, <span className="font-bold text-navy-950">{user?.name}</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-navy-900 text-xs font-mono font-medium border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-gold-600" /> ID: {user?.studentId || 'RCC-STU-ACTIVE'}
            </span>
            <Link
              to="/"
              className="text-xs font-semibold text-slate-600 hover:text-navy-900 flex items-center gap-1 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Main Site
            </Link>
          </div>
        </header>

        {/* Page Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
