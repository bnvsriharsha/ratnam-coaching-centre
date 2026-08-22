import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  BookOpen,
  Users,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import api from '../../api/axios';

export default function SchoolTuitionsPage() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const res = await api.get('/tuitions');
        if (res.data.success) {
          setTuitions(res.data.tuitions);
        }
      } catch (err) {
        console.error('Error fetching school tuitions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTuitions();
  }, []);

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="academic-gradient text-white py-16 px-4 pattern-grid">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5" /> School Academic Wing
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            DAILY TUITIONS – CLASSES 1 TO 10
          </h1>
          <p className="text-gold-400 font-serif italic text-base sm:text-lg">
            "Don't Sit Like a Rock, Work Like a Clock."
          </p>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Consistent daily classroom support, conceptual learning, homework monitoring, and weekly syllabus-oriented test series for school excellence in Bhimavaram.
          </p>
        </div>
      </section>

      {/* Overview Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 text-center">
            <Clock className="w-6 h-6 text-gold-600 mx-auto mb-2" />
            <h4 className="font-bold text-navy-900 text-sm">Daily Evening Batches</h4>
            <p className="text-[11px] text-slate-500 mt-1">Structured 2 to 2.5 hour daily study sessions.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 text-center">
            <BookOpen className="w-6 h-6 text-navy-900 mx-auto mb-2" />
            <h4 className="font-bold text-navy-900 text-sm">Homework Supervision</h4>
            <p className="text-[11px] text-slate-500 mt-1">Daily monitoring & school notebook completion.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 text-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-bold text-navy-900 text-sm">Weekly Test Series</h4>
            <p className="text-[11px] text-slate-500 mt-1">Regular weekend evaluations shared with parents.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 text-center">
            <Users className="w-6 h-6 text-gold-600 mx-auto mb-2" />
            <h4 className="font-bold text-navy-900 text-sm">Small Batch Sizes</h4>
            <p className="text-[11px] text-slate-500 mt-1">Limited student intake for personalized attention.</p>
          </div>
        </div>
      </section>

      {/* Classes 1 to 10 Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Loading tuition classes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tuitions.map((tuition) => (
              <div
                key={tuition._id}
                className="bg-white rounded-2xl shadow-md border border-slate-200 hover:border-gold-500 hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="bg-navy-900 p-5 text-white flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gold-500 text-navy-950 font-black text-lg flex items-center justify-center">
                        {tuition.classGrade}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white">{tuition.className}</h3>
                        <span className="text-[10px] text-gold-400 uppercase font-semibold">Daily Tuition</span>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-navy-800 text-emerald-400 font-bold border border-emerald-500/30">
                      {tuition.status}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {tuition.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Daily tuition & textbook explanation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Daily school homework support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Individual doubt clarification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Weekly syllabus test practice</span>
                      </div>
                    </div>

                    {/* Details Box */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Batch Timings:</span>
                        <span className="font-semibold text-slate-800">{tuition.timings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Batch Limit:</span>
                        <span className="font-semibold text-slate-800">{tuition.batchCapacity} Students Max</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Mentors:</span>
                        <span className="font-semibold text-slate-800 truncate max-w-[160px]">{tuition.assignedTeachers}</span>
                      </div>
                    </div>

                    {/* Subjects */}
                    {tuition.subjects && tuition.subjects.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                          Subjects Covered:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {tuition.subjects.map((sub, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium border border-slate-200"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <Link
                    to="/admissions"
                    state={{ schoolClass: tuition.className, courseInterest: `School Tuition - ${tuition.className}` }}
                    className="w-full py-2.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider text-center block shadow transition"
                  >
                    ENQUIRE NOW FOR {tuition.className.toUpperCase()}
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
