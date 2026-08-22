import React, { useState, useEffect } from 'react';
import { Trophy, Award, Plus, Trash2, Edit, Star, ShieldCheck } from 'lucide-react';
import api from '../../api/axios';

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('achievements'); // 'achievements' | 'testimonials'

  const [achModalOpen, setAchModalOpen] = useState(false);
  const [testModalOpen, setTestModalOpen] = useState(false);

  const initialAchForm = {
    year: '2025',
    exam: '',
    studentName: '',
    achievement: '',
    rank: '',
    isVerified: true,
  };

  const initialTestForm = {
    studentName: '',
    course: 'SSC CGL Regular Batch',
    selectedFor: 'Inspector (Central Excise)',
    year: '2025',
    message: '',
    rating: 5,
    isVerified: true,
  };

  const [achForm, setAchForm] = useState(initialAchForm);
  const [testForm, setTestForm] = useState(initialTestForm);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [achRes, testRes] = await Promise.all([
        api.get('/admin/achievements'),
        api.get('/admin/testimonials'),
      ]);
      if (achRes.data.success) setAchievements(achRes.data.achievements);
      if (testRes.data.success) setTestimonials(testRes.data.testimonials);
    } catch (err) {
      console.error('Error loading achievements/testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveAchievement = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/achievements', achForm);
      setAchModalOpen(false);
      setAchForm(initialAchForm);
      fetchData();
    } catch (err) {
      alert('Error saving achievement: ' + err.message);
    }
  };

  const handleDeleteAchievement = async (id) => {
    if (!window.confirm('Delete this achievement entry?')) return;
    try {
      await api.delete(`/admin/achievements/${id}`);
      fetchData();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/testimonials', testForm);
      setTestModalOpen(false);
      setTestForm(initialTestForm);
      fetchData();
    } catch (err) {
      alert('Error saving testimonial: ' + err.message);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.delete(`/admin/testimonials/${id}`);
      fetchData();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white uppercase">12. Achievements & Verified Testimonials</h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain authentic student selection records, ranks, and student testimonials.
          </p>
        </div>

        <div className="flex gap-2">
          {activeTab === 'achievements' ? (
            <button
              onClick={() => setAchModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow transition"
            >
              <Plus className="w-4 h-4" /> Add Verified Selection
            </button>
          ) : (
            <button
              onClick={() => setTestModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow transition"
            >
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-700 pb-3">
        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
            activeTab === 'achievements'
              ? 'bg-amber-500 text-navy-950 font-black'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Competitive Selections & Ranks ({achievements.length})
        </button>
        <button
          onClick={() => setActiveTab('testimonials')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
            activeTab === 'testimonials'
              ? 'bg-amber-500 text-navy-950 font-black'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Student Testimonials ({testimonials.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === 'achievements' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((ach) => (
            <div
              key={ach._id}
              className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    Year {ach.year}
                  </span>
                  {ach.isDemo && (
                    <span className="text-[9px] font-mono text-amber-300 bg-amber-950 px-1.5 py-0.5 rounded">
                      DEMO DATA
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white">{ach.studentName}</h3>
                <p className="text-xs text-amber-400 font-semibold">{ach.exam}</p>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-750 text-xs text-slate-300">
                  <span>{ach.achievement}</span>
                  {ach.rank && <p className="text-[11px] text-slate-400 mt-0.5">Rank: {ach.rank}</p>}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 flex justify-end">
                <button
                  onClick={() => handleDeleteAchievement(ach._id)}
                  className="px-3 py-1 rounded bg-red-950/60 hover:bg-red-900 text-red-400 text-xs font-bold transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  {t.isDemo && (
                    <span className="text-[9px] font-mono text-amber-300 bg-amber-950 px-1.5 py-0.5 rounded">
                      DEMO DATA
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">"{t.message}"</p>
                <div className="pt-2 border-t border-slate-700/60">
                  <h4 className="text-sm font-bold text-white">{t.studentName}</h4>
                  <p className="text-xs text-slate-400">{t.course}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 flex justify-end">
                <button
                  onClick={() => handleDeleteTestimonial(t._id)}
                  className="px-3 py-1 rounded bg-red-950/60 hover:bg-red-900 text-red-400 text-xs font-bold transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Achievement Modal */}
      {achModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white uppercase">Add Verified Student Selection</h3>
            <form onSubmit={handleSaveAchievement} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Year *</label>
                  <input
                    type="text"
                    required
                    value={achForm.year}
                    onChange={(e) => setAchForm({ ...achForm, year: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Exam *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IBPS PO / SSC CGL"
                    value={achForm.exam}
                    onChange={(e) => setAchForm({ ...achForm, exam: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Student Name *</label>
                <input
                  type="text"
                  required
                  value={achForm.studentName}
                  onChange={(e) => setAchForm({ ...achForm, studentName: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Achievement / Position Selected *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Selected as Probationary Officer in SBI"
                  value={achForm.achievement}
                  onChange={(e) => setAchForm({ ...achForm, achievement: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Rank / Position (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. State Rank 14"
                  value={achForm.rank}
                  onChange={(e) => setAchForm({ ...achForm, rank: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAchModalOpen(false)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold"
                >
                  Save Selection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Testimonial Modal */}
      {testModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white uppercase">Add Verified Student Testimonial</h3>
            <form onSubmit={handleSaveTestimonial} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={testForm.studentName}
                    onChange={(e) => setTestForm({ ...testForm, studentName: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Course *</label>
                  <input
                    type="text"
                    required
                    value={testForm.course}
                    onChange={(e) => setTestForm({ ...testForm, course: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Selected For (Job/Rank)</label>
                <input
                  type="text"
                  placeholder="e.g. Probationary Officer in Canara Bank"
                  value={testForm.selectedFor}
                  onChange={(e) => setTestForm({ ...testForm, selectedFor: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Testimonial Message *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Student experience and feedback..."
                  value={testForm.message}
                  onChange={(e) => setTestForm({ ...testForm, message: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setTestModalOpen(false)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
