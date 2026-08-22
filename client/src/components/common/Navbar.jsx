import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Clock,
  GraduationCap,
  Menu,
  X,
  Phone,
  MapPin,
  FileCheck,
  User,
  ShieldCheck,
  ChevronDown,
  BookOpen,
  Sparkles,
  LogIn,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, isStudent, logout } = useAuth();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'COURSES', path: '/courses' },
    { name: 'SCHOOL TUITIONS', path: '/school-tuitions' },
    { name: 'DISTANCE EDUCATION', path: '/distance-education' },
    { name: 'FACULTY', path: '/faculty' },
    { name: 'ACHIEVEMENTS', path: '/achievements' },
    { name: 'CERTIFICATE ASSISTANCE', path: '/certificate-assistance' },
    { name: 'ADMISSIONS', path: '/admissions' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md font-sans">
      {/* Top Academic Notification / Tagline Bar */}
      <div className="bg-navy-950 text-white text-xs py-2 px-4 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Motto */}
          <div className="flex items-center space-x-3 text-center md:text-left">
            <span className="inline-flex items-center gap-1 bg-gold-600/90 text-navy-950 font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
              <Clock className="w-3 h-3" /> Estd. 1998
            </span>
            <span className="font-semibold text-gold-400">
              "Don't Sit Like a Rock, Work Like a Clock."
            </span>
            <span className="hidden lg:inline text-slate-400">|</span>
            <span className="hidden lg:inline text-slate-300">
              Building Careers Through Quality Education Since 1998
            </span>
          </div>

          {/* Location & Quick Portals */}
          <div className="flex items-center space-x-4 text-slate-300 text-xs">
            <div className="hidden sm:flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              <span>Bhimavaram, Andhra Pradesh</span>
            </div>

            <Link
              to="/certificate-tracking"
              className="flex items-center space-x-1 text-gold-400 hover:text-gold-300 font-medium transition-colors"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Track Certificate / Admission</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-navy-800">
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold px-2 py-0.5 rounded transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin Panel
                  </Link>
                ) : (
                  <Link
                    to="/student"
                    className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-2 py-0.5 rounded transition"
                  >
                    <User className="w-3.5 h-3.5" />
                    Portal ({user?.name?.split(' ')[0]})
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-400 p-0.5 transition"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 pl-2 border-l border-navy-800">
                <Link
                  to="/student/login"
                  className="text-slate-200 hover:text-gold-400 font-medium transition"
                >
                  Student Login
                </Link>
                <span className="text-slate-600">/</span>
                <Link
                  to="/admin/login"
                  className="text-slate-400 hover:text-slate-200 transition"
                >
                  Admin
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-lg bg-navy-900 flex items-center justify-center text-white border-2 border-gold-500 shadow-md group-hover:scale-105 transition-transform">
              <div className="text-center leading-none">
                <span className="block font-black text-lg tracking-tighter text-gold-400">RCC</span>
                <span className="block text-[8px] font-bold text-slate-200 tracking-widest">1998</span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-navy-900 uppercase">
                  RATNAM
                </span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-gold-600 uppercase">
                  COACHING CENTRE
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium tracking-wide">
                Bhimavaram, AP • Premier Competitive & Academic Institution
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-xs font-bold tracking-wider transition-all duration-150 ${isActive(link.path)
                    ? 'bg-navy-900 text-gold-400 shadow-sm'
                    : 'text-slate-700 hover:text-navy-900 hover:bg-slate-100'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow hover:shadow-md transition-all duration-150"
            >
              <Sparkles className="w-3.5 h-3.5 text-navy-950" />
              <span>Apply Now</span>
            </Link>

            {!isAuthenticated && (
              <Link
                to="/student/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-150"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Student Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center space-x-2">
            <Link
              to="/admissions"
              className="inline-flex items-center px-3 py-1.5 rounded bg-gold-500 text-navy-950 font-bold text-xs uppercase"
            >
              Apply
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-navy-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-1 max-h-[80vh] overflow-y-auto">
          <div className="p-2 mb-2 bg-navy-50 rounded-lg border border-navy-100">
            <p className="text-xs font-semibold text-navy-900 text-center">
              "Don't Sit Like a Rock, Work Like a Clock."
            </p>
            <p className="text-[10px] text-slate-600 text-center mt-0.5">
              Est. 1998 • Bhimavaram, AP
            </p>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-sm font-bold ${isActive(link.path)
                  ? 'bg-navy-900 text-gold-400'
                  : 'text-slate-700 hover:bg-slate-100'
                }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-200 space-y-2">
            <Link
              to="/certificate-tracking"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-md bg-slate-100 text-navy-900 font-bold text-sm"
            >
              <FileCheck className="w-4 h-4 text-gold-600" />
              Track Certificate / Application
            </Link>

            <Link
              to="/admissions"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-md bg-gold-500 text-navy-950 font-bold text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Apply For Admission
            </Link>

            {isAuthenticated ? (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to={isAdmin ? '/admin' : '/student'}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-navy-900 text-white text-xs font-bold"
                >
                  <User className="w-3.5 h-3.5" />
                  {isAdmin ? 'Admin Panel' : 'My Portal'}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-red-50 text-red-700 border border-red-200 text-xs font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/student/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1 py-2 px-3 rounded bg-navy-900 text-white text-xs font-bold"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Student Login
                </Link>
                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1 py-2 px-3 rounded bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
