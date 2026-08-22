import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Building2,
  CheckCircle2,
  FileCheck,
  BookOpen,
  Info,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import api from '../../api/axios';

export default function DistanceEducationPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await api.get('/distance-education');
        if (res.data.success) {
          setPrograms(res.data.programs);
        }
      } catch (err) {
        console.error('Error fetching distance programs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="academic-gradient text-white py-16 px-4 pattern-grid">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" /> University Guidance Support Wing
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">
            DISTANCE EDUCATION THROUGH ANDHRA UNIVERSITY
          </h1>
          <p className="text-gold-400 font-serif italic text-base sm:text-lg">
            "Don't Sit Like a Rock, Work Like a Clock."
          </p>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Independent tutorial guidance, admission assistance, and academic mentoring for learners pursuing distance education degrees with Andhra University.
          </p>
        </div>
      </section>

      {/* Mandatory Institutional Disclaimer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 bg-amber-50 rounded-2xl border-2 border-amber-300 text-navy-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
            <Info className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Important Institutional Clarification & Regulatory Notice</span>
          </div>
          <p className="text-xs text-amber-950 leading-relaxed">
            Ratnam Coaching Centre provides coaching, application guidance, syllabus counseling, and assignment assistance for students enrolled in the School of Distance Education, Andhra University. <strong>Ratnam Coaching Centre does NOT itself award university degrees or diplomas.</strong> Official degree conferral, enrollment registration, curriculum formulation, and examinations are administered exclusively by Andhra University, Visakhapatnam.
          </p>
        </div>
      </section>

      {/* Guidance Services Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-gold-600 font-extrabold text-xs uppercase tracking-widest block mb-1">
            Student Guidance
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
            How Ratnam Supports Distance Learners
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: '1. Course & Subject Guidance',
              desc: 'Detailed explanation of available Andhra University distance programs, eligibility criteria, and optimal subject combinations for your career goals.',
            },
            {
              title: '2. Admission & Form Assistance',
              desc: 'Step-by-step assistance with distance education application submission, fee challans, and university document verification.',
            },
            {
              title: '3. Study Materials Coordination',
              desc: 'Assistance in receiving official university study materials, syllabus books, and reference guides.',
            },
            {
              title: '4. Weekend Contact Guidance Classes',
              desc: 'Dedicated tutorial sessions for B.A., B.Com, B.Sc., and M.A. students focusing on core conceptual clarity and tough subjects.',
            },
            {
              title: '5. Assignment & Project Guidance',
              desc: 'Formatting guidelines, submission deadlines, and academic review for required internal assignments.',
            },
            {
              title: '6. Examination & Hall Ticket Alerts',
              desc: 'Timely reminders for exam registration, fee payment dates, hall ticket downloads, and exam center allocation.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-gold-500 transition">
              <h3 className="text-base font-bold text-navy-900 mb-2">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Available Programs Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-gold-600 font-extrabold text-xs uppercase tracking-widest block mb-1">
              Programs Directory
            </span>
            <h2 className="text-2xl font-black text-navy-900 tracking-tight">
              Supported Andhra University Distance Programs
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Loading programs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program) => (
              <div
                key={program._id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-gold-500 transition"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-navy-900 text-gold-400 uppercase">
                      {program.degreeLevel}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {program.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900">{program.programName}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{program.overview}</p>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">University:</span>
                      <span className="font-semibold text-slate-800 text-right">{program.university}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Duration:</span>
                      <span className="font-semibold text-slate-800">{program.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Eligibility:</span>
                      <span className="font-semibold text-slate-800 text-right truncate max-w-[200px]">{program.eligibility}</span>
                    </div>
                  </div>

                  {program.servicesOffered && program.servicesOffered.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                        Included Guidance Services:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600">
                        {program.servicesOffered.map((svc, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate">{svc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex flex-wrap gap-3">
                  <Link
                    to="/admissions"
                    state={{ courseInterest: `Distance Education - ${program.programName}`, distanceProgram: program.programName }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider text-center shadow transition"
                  >
                    GET ADMISSION ASSISTANCE
                  </Link>
                  <Link
                    to="/contact"
                    className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider text-center transition"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
