import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Award,
  GraduationCap,
  Briefcase,
  ChevronRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import api from '../../api/axios';

export default function FacultyPage() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.get('/faculty');
        if (res.data.success) {
          setFaculty(res.data.faculty);
        }
      } catch (err) {
        console.error('Error fetching faculty:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="academic-gradient text-white py-16 px-4 pattern-grid">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" /> Academic Mentorship Wing
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            OUR FACULTY PANEL
          </h1>
          <p className="text-gold-400 font-serif italic text-base sm:text-lg">
            "Don't Sit Like a Rock, Work Like a Clock."
          </p>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Experienced subject educators and competitive exam mentors dedicated to conceptual clarity, mental calculation shortcuts, and student achievement in Bhimavaram.
          </p>
        </div>
      </section>

      {/* Faculty Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Loading faculty profiles...</p>
          </div>
        ) : faculty.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-lg mx-auto space-y-3">
            <Users className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-navy-900">Faculty Profiles Coming Soon</h3>
            <p className="text-xs text-slate-500">
              Updated faculty directories and verified teacher profiles are being compiled by the administration desk.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faculty.map((member) => (
              <div
                key={member._id}
                className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:border-gold-500 hover:shadow-xl transition-all duration-200"
              >
                <div className="space-y-4">
                  {/* Top info with avatar badge */}
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-xl bg-navy-900 text-gold-400 border-2 border-gold-500 flex items-center justify-center font-black text-xl shrink-0 shadow-md">
                      {member.name ? member.name.charAt(0) : 'F'}
                    </div>
                    <div>
                      {member.isDemo && (
                        <span className="inline-block text-[9px] font-mono font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded mb-1">
                          DEMO PROFILE
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-navy-900">{member.name}</h3>
                      <p className="text-xs font-semibold text-gold-700">{member.designation}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>{member.qualification}</span>
                      </p>
                    </div>
                  </div>

                  {/* Biography */}
                  <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{member.bio}"
                  </p>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">Primary Subject</span>
                      <span className="font-bold text-navy-950">{member.subject}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">Experience</span>
                      <span className="font-bold text-navy-950">{member.experience}</span>
                    </div>
                  </div>

                  {member.specialization && (
                    <div className="text-xs">
                      <span className="text-slate-500 text-[11px] font-semibold block mb-1">Area of Specialization:</span>
                      <p className="text-slate-800 font-medium">{member.specialization}</p>
                    </div>
                  )}

                  {/* Courses handled */}
                  {member.coursesHandled && member.coursesHandled.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                        Courses Handled:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {member.coursesHandled.map((c, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-navy-50 text-navy-900 border border-navy-100 px-2 py-0.5 rounded font-semibold"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active Faculty Mentor
                  </span>
                  <Link
                    to="/admissions"
                    className="text-navy-900 hover:text-gold-600 font-bold flex items-center gap-1 transition"
                  >
                    Join Classes <ChevronRight className="w-3.5 h-3.5" />
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
