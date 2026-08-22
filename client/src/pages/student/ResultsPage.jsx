import React, { useState, useEffect } from 'react';
import { Award, Trophy, Star, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import api from '../../api/axios';

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get('/portal/results/my');
        if (res.data.success) {
          setResults(res.data.results);
        }
      } catch (err) {
        console.error('Error fetching results:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-navy-900 uppercase">Mock Tests & Exam Results</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review your scores, percentage benchmarks, section-wise evaluation, and faculty feedback.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-slate-500">Loading exam scores...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-md mx-auto space-y-2">
          <Award className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-navy-900">No Exam Records Yet</h3>
          <p className="text-xs text-slate-500">
            Results from your weekly mock tests and chapter exams will appear here once graded by faculty mentors.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4 hover:border-gold-500 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    Exam Date: {r.examDate}
                  </span>
                  <h3 className="text-lg font-bold text-navy-900">{r.examTitle}</h3>
                  <p className="text-xs text-gold-700 font-semibold">{r.courseName}</p>
                </div>
                {r.rank && (
                  <div className="px-2.5 py-1 bg-amber-50 border border-amber-300 text-amber-900 font-black text-xs rounded-lg flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-gold-600" /> Rank #{r.rank}
                  </div>
                )}
              </div>

              {/* Score summary box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total Scored</span>
                  <div className="text-2xl font-black text-navy-900">
                    {r.scoredMarks} <span className="text-sm font-normal text-slate-500">/ {r.totalMarks}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Percentage</span>
                  <div className="text-2xl font-black text-emerald-700">{r.percentage}%</div>
                </div>
              </div>

              {/* Feedback box */}
              {r.facultyFeedback && (
                <div className="p-3 bg-navy-50 rounded-xl border border-navy-100 text-xs text-navy-950 space-y-1">
                  <span className="font-bold text-gold-700 block text-[10px] uppercase">
                    Faculty Remarks & Feedback:
                  </span>
                  <p className="text-slate-700 italic">"{r.facultyFeedback}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
