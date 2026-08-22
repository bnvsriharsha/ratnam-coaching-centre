import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Award,
  CheckCircle2,
  Filter,
  Star,
  Quote,
  ShieldCheck,
  Calendar,
  Sparkles,
} from 'lucide-react';
import api from '../../api/axios';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [loading, setLoading] = useState(true);

  const years = ['All', '2025', '2024', '2023'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let achUrl = '/admin/achievements';
        if (selectedYear !== 'All') achUrl += `?year=${selectedYear}`;
        const [achRes, testRes] = await Promise.all([
          api.get(achUrl),
          api.get('/admin/testimonials'),
        ]);

        if (achRes.data.success) setAchievements(achRes.data.achievements);
        if (testRes.data.success) setTestimonials(testRes.data.testimonials);
      } catch (err) {
        console.error('Error fetching achievements:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedYear]);

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="academic-gradient text-white py-16 px-4 pattern-grid">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" /> Institutional Results
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            ACHIEVEMENTS & STUDENT SUCCESS
          </h1>
          <p className="text-gold-400 font-serif italic text-base sm:text-lg">
            "Don't Sit Like a Rock, Work Like a Clock."
          </p>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Verified selections in Banking (IBPS/SBI), SSC, Railways, and central/state examinations from Ratnam Coaching Centre, Bhimavaram.
          </p>
        </div>
      </section>

      {/* Year Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-navy-900 uppercase">Filter by Examination Year:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedYear === y
                    ? 'bg-navy-900 text-gold-400 shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selections Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-gold-600" /> Verified Selections & Candidate Achievements
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Admin-verified candidate selections and competitive exam ranks.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs text-slate-500">Loading achievements...</p>
          </div>
        ) : achievements.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
            <p className="text-xs text-slate-500">No achievement records found for the selected year.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-gold-500 transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-navy-900 text-gold-400 font-mono font-bold text-xs">
                      {item.year}
                    </span>
                    {item.isDemo && (
                      <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                        DEMO DATA
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-navy-900">{item.studentName}</h3>
                    <p className="text-xs font-semibold text-gold-700">{item.exam}</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                    <span className="font-semibold text-slate-800 block text-emerald-800">
                      🎯 {item.achievement}
                    </span>
                    {item.rank && (
                      <span className="text-slate-500 text-[11px] block">
                        Rank/Position: <strong className="text-slate-700">{item.rank}</strong>
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Selection
                  </span>
                  <span>Ratnam Student</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Student Testimonials */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-gold-600 font-extrabold text-xs uppercase tracking-widest block mb-1">
              Student Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
              What Our Successful Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((test) => (
              <div
                key={test._id}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4 relative"
              >
                <Quote className="w-8 h-8 text-gold-400/40 absolute right-6 top-6" />

                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{test.message}"
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-navy-900">{test.studentName}</h4>
                    <p className="text-xs text-slate-500 font-medium">{test.course}</p>
                    {test.selectedFor && (
                      <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                        Selected: {test.selectedFor}
                      </p>
                    )}
                  </div>
                  {test.isDemo && (
                    <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                      DEMO DATA
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
