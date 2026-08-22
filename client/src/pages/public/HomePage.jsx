import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Award,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  FileCheck,
  Building2,
  Users,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Calendar,
  Compass,
  FileText,
  Target,
  Layers,
} from 'lucide-react';
import api from '../../api/axios';

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await api.get('/courses?limit=4');
        if (res.data.success) {
          setCourses(res.data.courses.slice(0, 4));
        }
      } catch (err) {
        console.error('Error loading home courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative academic-gradient text-white pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden pattern-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            {/* Established Badge */}
            <div className="inline-flex items-center gap-2 bg-navy-950/80 border border-gold-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-gold-400 uppercase tracking-widest backdrop-blur-sm">
              <Building2 className="w-4 h-4 text-gold-400" />
              <span>ESTABLISHED IN 1998 • BHIMAVARAM, ANDHRA PRADESH</span>
            </div>

            {/* Institute Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight font-sans">
              RATNAM <span className="text-gold-400">COACHING CENTRE</span>
            </h1>

            {/* Primary & Secondary Taglines */}
            <div className="border-l-4 border-gold-500 pl-4 py-1 space-y-2 bg-white/5 rounded-r-lg">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-serif italic">
                "Don't Sit Like a Rock, <br className="hidden sm:inline" />
                <span className="text-gold-400 not-italic font-sans">Work Like a Clock."</span>
              </p>
              <p className="text-sm sm:text-base text-slate-300 font-medium">
                Building Careers Through Quality Education Since 1998.
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Competitive examination coaching, school daily tuitions, distance education support, and student services under one educational institution in Bhimavaram.
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-150 transform hover:-translate-y-0.5"
              >
                <BookOpen className="w-4 h-4 text-navy-950" />
                <span>EXPLORE COURSES</span>
              </Link>

              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white text-navy-950 hover:bg-slate-100 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-150 transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-navy-900" />
                <span>APPLY NOW</span>
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-navy-900/80 hover:bg-navy-900 text-white border border-slate-600 hover:border-gold-500 font-bold text-sm uppercase tracking-wider transition-all duration-150"
              >
                <span>CONTACT US</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Clock Badge in corner */}
        <div className="hidden xl:block absolute right-16 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <Clock className="w-96 h-96 text-white" />
        </div>
      </section>

      {/* 2. FOUR HIGHLIGHT CARDS (Strictly No Fake Numerical Statistics) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-gold-500 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-lg bg-gold-50 text-gold-600 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Established in 1998</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Over two decades of sustained educational presence providing disciplined guidance and academic preparation in Bhimavaram.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-navy-800 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Government Registered</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Officially registered educational coaching institute complying with state educational guidelines and standards.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-gold-500 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-lg bg-gold-50 text-gold-600 flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Competitive Exam Coaching</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Structured preparation for SSC (CGL/CHSL), Banking (IBPS/SBI PO), Railways (RRB NTPC), and RBI examinations.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-navy-800 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Distance Education Support</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Academic tutorial classes and enrollment guidance for Andhra University School of Distance Education learners.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MOTIVATIONAL SECTION (Strictly as specified) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 text-white rounded-2xl p-8 sm:p-12 border-2 border-gold-500/30 shadow-xl relative overflow-hidden pattern-grid">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 text-gold-400 text-xs font-black uppercase tracking-widest">
              <Clock className="w-4 h-4" /> Philosophy of Discipline
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">
              "Don't Sit Like a Rock, <br />
              <span className="text-gold-400 not-italic font-sans">Work Like a Clock."</span>
            </h2>
            <div className="space-y-1 text-slate-300 text-base sm:text-lg font-medium pt-2">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Your goals need action.</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Your preparation needs consistency.</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Your success needs discipline.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED COMPETITIVE EXAM COURSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <span className="text-gold-600 font-extrabold text-xs uppercase tracking-widest block mb-1">
              Structured Exam Preparation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
              Competitive Examination Coaching
            </h2>
          </div>
          <Link
            to="/courses"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 hover:text-gold-600 transition"
          >
            <span>View All Programs</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-md border border-slate-200 hover:border-gold-500 hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-navy-900 text-gold-400 text-[10px] font-extrabold uppercase tracking-wider">
                    {course.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {course.admissionStatus}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy-900 group-hover:text-gold-700 transition line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {course.shortDescription}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Duration:</span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Mode:</span>
                    <span className="font-semibold">{course.mode}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                <Link
                  to={`/courses/${course.slug}`}
                  className="w-full py-2 px-3 rounded bg-white hover:bg-slate-100 border border-slate-300 text-center text-xs font-bold text-navy-900 transition"
                >
                  View Details
                </Link>
                <Link
                  to="/admissions"
                  state={{ courseInterest: course.title }}
                  className="w-full py-2 px-3 rounded bg-gold-500 hover:bg-gold-600 text-center text-xs font-bold text-navy-950 transition"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SCHOOL DAILY TUITIONS HIGHLIGHT */}
      <section className="bg-navy-900 text-white py-16 pattern-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="bg-gold-500/20 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
                Academic Foundation
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Daily School Tuitions <br />
                <span className="text-gold-400">Classes 1 to 10</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Daily academic coaching covering conceptual foundations, regular school homework monitoring, doubt resolution, and weekly test series in Mathematics, Science, Social, English, and Languages.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-navy-800/80 p-3 rounded-lg border border-navy-700">
                  <span className="text-gold-400 font-bold block mb-1">Daily Support</span>
                  <span className="text-slate-300">Homework & concept clearing every evening</span>
                </div>
                <div className="bg-navy-800/80 p-3 rounded-lg border border-navy-700">
                  <span className="text-gold-400 font-bold block mb-1">Weekly Tests</span>
                  <span className="text-slate-300">Continuous evaluation of school syllabus</span>
                </div>
              </div>

              <div>
                <Link
                  to="/school-tuitions"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-black text-xs uppercase tracking-wider shadow transition"
                >
                  <span>EXPLORE TUITIONS BY CLASS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => (
                <Link
                  key={grade}
                  to="/school-tuitions"
                  className="p-4 bg-navy-800/90 rounded-xl border border-navy-700 hover:border-gold-500 text-center hover:bg-navy-800 transition transform hover:-translate-y-1 group"
                >
                  <span className="block text-2xl font-black text-gold-400 group-hover:scale-110 transition-transform">
                    {grade}
                  </span>
                  <span className="text-xs font-bold text-white block mt-1">Class {grade}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Daily Tuition</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE RATNAM COACHING CENTRE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-gold-600 font-extrabold text-xs uppercase tracking-widest block mb-1">
            Institutional Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
            WHY CHOOSE RATNAM COACHING CENTRE?
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            A heritage of disciplined education, verified guidance, and comprehensive student support since 1998.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Established in 1998',
              desc: 'Continuous educational guidance and coaching legacy built over 28 years in Bhimavaram.',
              icon: Clock,
            },
            {
              title: 'Experienced Faculty',
              desc: 'Dedicated subject mentors specializing in shortcut calculation techniques and concept mastery.',
              icon: Users,
            },
            {
              title: 'Competitive Exam Preparation',
              desc: 'Up-to-date curricula and regular computer-based mock tests for SSC, Banking, Railways, and RBI.',
              icon: Target,
            },
            {
              title: 'School Daily Tuitions',
              desc: 'Structured classroom batches for Classes 1 to 10 with daily homework supervision.',
              icon: BookOpen,
            },
            {
              title: 'Distance Education Support',
              desc: 'Academic guidance and application facilitation for Andhra University distance learning programs.',
              icon: Globe2,
            },
            {
              title: 'Student Guidance Cell',
              desc: 'Individual mentoring, study timetable planning, and exam form submission assistance.',
              icon: Compass,
            },
            {
              title: 'Certificate Assistance',
              desc: 'Helpdesk for past graduates requiring guidance in retrieving pending university certificates.',
              icon: FileCheck,
            },
            {
              title: 'Academic Support',
              desc: 'Comprehensive printed study booklets, previous year question banks, and daily doubt desks.',
              icon: Layers,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-gold-500 hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-gold-600" />
                </div>
                <h3 className="text-base font-bold text-navy-900">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. UNIQUE SERVICES: DISTANCE EDUCATION & CERTIFICATE ASSISTANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Box 1: Andhra University Distance Education */}
          <div className="bg-gradient-to-br from-navy-900 to-navy-950 text-white p-8 rounded-2xl border border-navy-800 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 bg-gold-500/20 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase">
                <GraduationCap className="w-3.5 h-3.5" /> University Guidance Wing
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Distance Education Through Andhra University
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Ratnam Coaching Centre provides independent coaching and student support for candidates pursuing B.A., B.Com, B.Sc., M.A., and M.Com distance courses through Andhra University.
              </p>
              <div className="p-3 bg-navy-800/80 rounded-lg border border-navy-700 text-[11px] text-slate-300">
                <span className="font-bold text-gold-400 block mb-0.5">Official Clarification:</span>
                Ratnam Coaching Centre acts as a tutorial guidance center. Official degrees and examinations are administered exclusively by Andhra University.
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/distance-education"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider transition"
              >
                <span>EXPLORE DISTANCE EDUCATION</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Box 2: Certificate Assistance */}
          <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-gold-500 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase">
                <FileCheck className="w-3.5 h-3.5" /> Student Support Cell
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900">
                Educational Certificate Assistance
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Did you forget to collect or process your educational certificates during or after your graduation? Our guidance cell assists with application procedures for Degree Certificates, Provisional Memos, Marks Memos, Transfer Certificates, and Migration documents.
              </p>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600">
                <span className="font-bold text-navy-900 block mb-0.5">Important Clarification:</span>
                Ratnam Coaching Centre does not issue certificates. We assist students with application paperwork and university follow-up.
              </div>
            </div>

            <div className="pt-6 flex flex-wrap gap-3">
              <Link
                to="/certificate-assistance"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition"
              >
                <span>REQUEST ASSISTANCE</span>
                <ChevronRight className="w-4 h-4 text-gold-400" />
              </Link>
              <Link
                to="/certificate-tracking"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition"
              >
                <span>TRACK REQUEST</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-2xl p-8 sm:p-12 text-center border-2 border-gold-500 shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Begin Your Educational Journey?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Join Ratnam Coaching Centre for disciplined preparation, experienced mentoring, and career success since 1998.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/admissions"
              className="px-8 py-3.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-black text-sm uppercase tracking-wider shadow-lg transition transform hover:-translate-y-0.5"
            >
              Apply For Admission Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-white border border-slate-600 font-bold text-sm uppercase tracking-wider transition"
            >
              Visit Bhimavaram Center
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Globe2(props) {
  return <Building2 {...props} />;
}
