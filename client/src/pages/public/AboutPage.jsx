import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Building2,
  ShieldCheck,
  Target,
  BookOpen,
  GraduationCap,
  FileCheck,
  Award,
  ChevronRight,
  CheckCircle2,
  Compass,
  ArrowRight,
  Info,
} from 'lucide-react';
import api from '../../api/axios';

export default function AboutPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await api.get('/admin/settings');
        if (res.data.success) {
          setSettings(res.data.settings);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  const timeline = settings?.timeline || [
    {
      year: '1998',
      title: 'Establishment of Ratnam Coaching Centre',
      description:
        'Founded in Bhimavaram, Andhra Pradesh, with a singular mission: providing disciplined academic training, school tuitions, and competitive exam preparation.',
    },
    {
      year: '2005',
      title: 'Expansion of Competitive Exam Wing',
      description:
        'Introduced specialized classroom coaching modules for Banking (IBPS/SBI), SSC, and Railway examinations with intensive daily test series.',
    },
    {
      year: '2012',
      title: 'Andhra University Distance Education Support Wing',
      description:
        'Initiated structured academic guidance, admission support, and weekend tutorial classes for Andhra University Distance Education learners.',
    },
    {
      year: '2018',
      title: 'Certificate Assistance & Student Guidance Cell',
      description:
        'Dedicated a student helpdesk to guide past graduates in retrieving pending degree certificates, provisional memos, and migration certificates.',
    },
    {
      year: '2026',
      title: 'Digital Academic Portal & Modern Hybrid Learning',
      description:
        'Launched comprehensive student management portal, live certificate tracking, online mock tests, and digital learning resource repository.',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Page Header */}
      <section className="academic-gradient text-white py-16 px-4 pattern-grid">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" /> Established in 1998
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            About Ratnam Coaching Centre
          </h1>
          <p className="text-gold-400 font-serif italic text-lg sm:text-xl">
            "Don't Sit Like a Rock, Work Like a Clock."
          </p>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Building Careers Through Quality Education Since 1998 in Bhimavaram, Andhra Pradesh.
          </p>
        </div>
      </section>

      {/* Main Narrative & Government Registration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="border-l-4 border-gold-500 pl-4 py-1">
              <span className="text-xs font-extrabold text-gold-600 uppercase tracking-widest block">
                Educational Legacy
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
                28+ Years of Academic Excellence & Student Mentoring
              </h2>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              <strong>Ratnam Coaching Centre</strong> was established in <strong>1998</strong> in Bhimavaram, Andhra Pradesh, with an unwavering commitment to disciplined learning, conceptual clarity, and rigorous preparation for competitive examinations and school excellence.
            </p>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Over the last 28 years, the institute has steadily built a reputation as a trusted regional educational institution. Our pedagogy is founded on the timeless philosophy:{' '}
              <em className="text-navy-900 font-semibold font-serif">"Don't Sit Like a Rock, Work Like a Clock."</em> We instill consistency, time management, and structured daily work habits in every student who walks through our doors.
            </p>

            {/* Regulatory & Institutional Notice */}
            <div className="p-4 bg-navy-50 rounded-xl border border-navy-200 space-y-2 text-xs text-navy-950">
              <div className="flex items-center gap-2 font-bold text-navy-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Institutional Registration & Verification Status</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {settings?.govtRegistrationNote ||
                  'Ratnam Coaching Centre is a registered educational coaching institution operating under the guidelines of the Government of Andhra Pradesh. All official accreditations and verifiable administrative documentation are maintained at our Bhimavaram administrative desk.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 space-y-6">
            <h3 className="text-lg font-bold text-navy-900 uppercase tracking-wide border-b border-slate-100 pb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-gold-600" /> Core Focus Areas
            </h3>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              {[
                { title: 'Competitive Examination Preparation', desc: 'SSC, Banking (IBPS/SBI), Railways (RRB), and RBI Grade B programs.' },
                { title: 'School Daily Tuitions (Classes 1–10)', desc: 'Concept coaching, daily homework support, and weekly testing.' },
                { title: 'Distance Education Support', desc: 'Academic guidance and tutorial classes for Andhra University distance learners.' },
                { title: 'Student Career Guidance', desc: '1-on-1 career path mentoring and exam application strategies.' },
                { title: 'Educational Documentation Assistance', desc: 'Assistance for past graduates needing guidance with pending university certificates.' },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy-900 block font-semibold">{item.title}</strong>
                    <span className="text-slate-500 text-xs">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Institutional Milestones Timeline (Admin Controlled) */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-gold-600 font-extrabold text-xs uppercase tracking-widest block mb-1">
              Historical Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
              Institutional Timeline (1998 – Present)
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Milestones and growth of Ratnam Coaching Centre across three decades of educational dedication.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-gold-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition"
              >
                <div className="sm:w-28 shrink-0">
                  <span className="inline-block px-3 py-1 bg-navy-900 text-gold-400 font-black text-sm rounded-lg font-mono">
                    {item.year}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-navy-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-gold-600 font-extrabold text-xs uppercase tracking-widest block mb-1">
            Our Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
            Institutional Values & Code of Ethics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">1. Discipline & Time Management</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every competitive exam is a test of speed and precision. We instill daily discipline and regular practice schedules.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-navy-50 text-navy-800 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">2. Academic Integrity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We uphold complete honesty in our claims, verified achievements, and transparent fee structures with zero misleading promises.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mx-auto">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">3. Continuous Mentorship</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We stand by our students from their initial foundation classes all the way to final selection and documentation support.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 text-white p-8 sm:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Have Questions About Our Programs?</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Visit our Bhimavaram office or speak with an academic counselor.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admissions"
              className="px-6 py-3 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider transition"
            >
              Apply Online
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-lg bg-navy-800 hover:bg-navy-700 text-white border border-slate-600 font-bold text-xs uppercase tracking-wider transition"
            >
              Contact Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
