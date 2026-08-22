import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Globe,
  UserCheck,
  Sparkles,
  FileCheck,
  FileText,
  CalendarCheck,
  Award,
  Trophy,
  Bell,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-bold tracking-wider uppercase text-xs">Authenticating Directorate Clearance...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const adminModules = [
    { name: '1. Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { name: '2. Student Directory', path: '/admin/students', icon: Users },
    { name: '3. Course Management', path: '/admin/courses', icon: BookOpen },
    { name: '4. School Tuitions (1-10)', path: '/admin/tuitions', icon: GraduationCap },
    { name: '5. Distance Education (AU)', path: '/admin/distance-education', icon: Globe },
    { name: '6. Faculty Directory', path: '/admin/faculty', icon: UserCheck },
    { name: '7. Admissions Workflow', path: '/admin/admissions', icon: Sparkles },
    { name: '8. Certificate Requests', path: '/admin/certificates', icon: FileCheck },
    { name: '9. Study Materials', path: '/admin/materials', icon: FileText },
    { name: '10. Daily Attendance', path: '/admin/attendance', icon: CalendarCheck },
    { name: '11. Test Results & Ranks', path: '/admin/results', icon: Award },
    { name: '12. Achievements & Success', path: '/admin/achievements', icon: Trophy },
    { name: '13. Notices & Broadcasts', path: '/admin/announcements', icon: Bell },
    { name: '14. Contact Enquiries', path: '/admin/enquiries', icon: Mail },
    { name: '15. Site Settings & History', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-navy-950 text-white p-4 flex items-center justify-between border-b border-navy-800 shadow-md">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-amber-500 text-navy-950 flex items-center justify-center font-black text-xs">
            RCC
          </div>
          <div>
            <h1 className="text-xs font-bold text-white uppercase tracking-wider">Admin Control Desk</h1>
            <p className="text-[10px] text-amber-400">Authorized Personnel</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 bg-navy-950 text-slate-300 flex flex-col justify-between border-r border-navy-800/80 shadow-2xl transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="overflow-y-auto max-h-[calc(100vh-100px)]">
          {/* Header */}
          <div className="p-5 border-b border-navy-800">
            <Link to="/admin" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-navy-950 font-black text-sm shadow-md">
                ADM
              </div>
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-wider">
                  Admin Control Desk
                </h2>
                <p className="text-[10px] text-amber-400 font-semibold">
                  Ratnam Coaching Centre (1998)
                </p>
              </div>
            </Link>

            {/* Admin identity chip */}
            <div className="mt-3 p-2.5 bg-navy-900/90 rounded border border-navy-800 text-xs">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Logged in as:</span>
              <p className="font-bold text-amber-400 truncate">{user?.name}</p>
            </div>
          </div>

          {/* Module Links */}
          <nav className="p-3 space-y-1">
            <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Institutional Modules
            </p>
            {adminModules.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition-all duration-150 ${
                    active
                      ? 'bg-amber-500 text-navy-950 font-bold shadow-md'
                      : 'text-slate-300 hover:bg-navy-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-navy-950' : 'text-amber-400'}`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {active && <ChevronRight className="w-3 h-3 shrink-0" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-navy-800 bg-navy-950 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              className="flex items-center justify-center gap-1 py-2 px-2 rounded bg-navy-900 hover:bg-navy-800 text-slate-200 text-xs font-semibold"
            >
              <ExternalLink className="w-3 h-3 text-amber-400" />
              Live Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1 py-2 px-2 rounded bg-red-950/50 hover:bg-red-900 border border-red-800/40 text-red-300 text-xs font-semibold"
            >
              <LogOut className="w-3 h-3" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950 overflow-hidden">
        {/* Admin Desktop Top Bar */}
        <header className="hidden md:flex bg-navy-950 border-b border-navy-800 px-8 py-3.5 items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded">
              <ShieldAlert className="w-3 h-3" /> ADMINISTRATIVE LEVEL CLEARANCE
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-slate-300">
              Ratnam Coaching Centre • Bhimavaram, AP
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <Link
              to="/"
              className="text-slate-300 hover:text-amber-400 flex items-center gap-1 font-semibold transition"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Public Portal
            </Link>
          </div>
        </header>

        {/* Admin Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-900 text-slate-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
