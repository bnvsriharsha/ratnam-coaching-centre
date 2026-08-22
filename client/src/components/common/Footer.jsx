import React from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
  GraduationCap,
  Award,
  BookOpen,
  FileCheck,
  Info,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-slate-300 font-sans border-t-4 border-gold-500">
      {/* Motivational Banner */}
      <div className="bg-navy-900 border-b border-navy-800 py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
            <Clock className="w-3.5 h-3.5 text-gold-400" /> Institutional Motto Since 1998
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            "Don't Sit Like a Rock, <span className="text-gold-400">Work Like a Clock.</span>"
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto">
            Building Careers Through Quality Education Since 1998 • Bhimavaram, Andhra Pradesh
          </p>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Institute Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-navy-800 border-2 border-gold-500 flex items-center justify-center text-white">
                <span className="font-black text-sm text-gold-400">RCC</span>
              </div>
              <div>
                <h3 className="text-lg font-black text-white tracking-wide">
                  RATNAM COACHING CENTRE
                </h3>
                <p className="text-xs text-gold-400 font-semibold tracking-wider uppercase">
                  Established in 1998
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              A premier educational coaching and guidance institution based in Bhimavaram, Andhra Pradesh.
              Providing disciplined competitive examination coaching, daily school tuitions, Andhra University distance education support, and certificate retrieval assistance.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Main Road, Bhimavaram, West Godavari District, Andhra Pradesh - 534201, India</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Phone: Contact details will be updated soon</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Email: contact@ratnamcoaching.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-navy-800 pb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-gold-400" /> Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="hover:text-gold-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> About Us (Since 1998)
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-gold-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> Competitive Exam Coaching
                </Link>
              </li>
              <li>
                <Link to="/school-tuitions" className="hover:text-gold-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> Daily Tuitions (Classes 1-10)
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-gold-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> Our Faculty Panel
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-gold-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> Achievements & Selections
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> Contact Bhimavaram Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Programs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-navy-800 pb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-gold-400" /> Programs & Services
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/courses" className="hover:text-gold-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> SSC CGL & CHSL Batches
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-gold-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> IBPS PO & SBI PO Banking
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-gold-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> RRB Railways NTPC
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-gold-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> RBI Grade B Officer Prep
                </Link>
              </li>
              <li>
                <Link to="/distance-education" className="hover:text-gold-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> Andhra University Distance Ed.
                </Link>
              </li>
              <li>
                <Link to="/certificate-assistance" className="hover:text-gold-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> Certificate Assistance Cell
                </Link>
              </li>
              <li>
                <Link to="/certificate-tracking" className="hover:text-gold-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-gold-500" /> Track Application Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-navy-800 pb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-400" /> Portals & Access
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/admissions"
                  className="block p-2 rounded bg-navy-900 border border-navy-800 hover:border-gold-500 text-white font-semibold transition"
                >
                  <span className="text-gold-400 font-bold">Online Admission</span>
                  <span className="block text-[10px] text-slate-400">Submit fresh admission form</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/student/login"
                  className="block p-2 rounded bg-navy-900 border border-navy-800 hover:border-gold-500 text-white font-semibold transition"
                >
                  <span className="text-gold-400 font-bold">Student Portal Login</span>
                  <span className="block text-[10px] text-slate-400">Class schedule, results & notes</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="block p-2 rounded bg-navy-900 border border-navy-800 hover:border-gold-500 text-white font-semibold transition"
                >
                  <span className="text-gold-400 font-bold">Administrative Desk</span>
                  <span className="block text-[10px] text-slate-400">Authorized personnel only</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Institutional Integrity & Regulatory Disclaimers */}
        <div className="mt-10 pt-6 border-t border-navy-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-300 leading-relaxed">
          <div className="bg-navy-900/60 p-3 rounded border border-navy-800">
            <span className="font-bold text-gold-400 flex items-center gap-1 mb-1">
              <Info className="w-3.5 h-3.5" /> Andhra University Distance Education Guidance Note
            </span>
            <p>
              Ratnam Coaching Centre provides independent academic tutorial support, application guidance, and study assistance for distance education learners. Official degrees, enrollments, and university examinations are conducted exclusively by Andhra University.
            </p>
          </div>
          <div className="bg-navy-900/60 p-3 rounded border border-navy-800">
            <span className="font-bold text-gold-400 flex items-center gap-1 mb-1">
              <Info className="w-3.5 h-3.5" /> Educational Document & Certificate Assistance Note
            </span>
            <p>
              Ratnam Coaching Centre assists students with document retrieval guidance, university follow-up, and institutional application processes. Official certificates are issued directly by the respective universities and educational boards.
            </p>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-navy-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-300 gap-3">
          <p>© {currentYear} RATNAM COACHING CENTRE. Established 1998. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-gold-400 transition">About Institute</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-gold-400 transition">Bhimavaram Center</Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-gold-400 transition">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
