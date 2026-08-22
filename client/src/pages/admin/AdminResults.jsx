import React, { useState, useEffect } from 'react';
import { Award, Plus, Trash2, Trophy, Search } from 'lucide-react';
import api from '../../api/axios';

export default function AdminResults() {
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];

  const initialForm = {
    studentId: '',
    examTitle: '',
    courseName: 'SSC CGL Tier-I Mock Test Series',
    examDate: todayStr,
    totalMarks: 100,
    scoredMarks: 85,
    rank: 1,
    feedback: 'Good speed and accuracy. Focus on critical reasoning.',
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resRes, stuRes] = await Promise.all([
        api.get('/portal/results'),
        api.get('/auth/students'),
      ]);
      if (resRes.data.success) setResults(resRes.data.results);
      if (stuRes.data.success) setStudents(stuRes.data.students);
    } catch (err) {
      console.error('Error loading results:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/portal/results', formData);
      setModalOpen(false);
      setFormData(initialForm);
      fetchData();
    } catch (err) {
      alert('Error saving result: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this exam result entry?')) return;
    try {
      await api.delete(`/portal/results/${id}`);
      fetchData();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white uppercase">11. Test Results & Performance Entry</h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish weekly mock test scores, percentile rankings, and individual faculty feedback.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow transition"
        >
          <Plus className="w-4 h-4" /> Enter Test Scores
        </button>
      </div>

      {/* Results Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading results...</div>
        ) : results.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No test results recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-700">
                <tr>
                  <th className="p-3.5">Exam Date</th>
                  <th className="p-3.5">Exam Title</th>
                  <th className="p-3.5">Student</th>
                  <th className="p-3.5">Score / Max</th>
                  <th className="p-3.5">Percentage</th>
                  <th className="p-3.5">Rank</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {results.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-750">
                    <td className="p-3.5 font-mono text-slate-400">{r.examDate}</td>
                    <td className="p-3.5 font-bold text-white">{r.examTitle}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-200">{r.studentName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{r.studentId}</div>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-amber-400">
                      {r.scoredMarks} / {r.totalMarks}
                    </td>
                    <td className="p-3.5 font-bold text-emerald-400">{r.percentage}%</td>
                    <td className="p-3.5">
                      {r.rank ? (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                          #{r.rank}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="p-1 rounded bg-red-950/60 hover:bg-red-900 text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white uppercase">Publish Test Scores</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Select Student *</label>
                <select
                  required
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                >
                  <option value="">-- Choose Student --</option>
                  {students.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name} ({s.studentId || s.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Exam / Mock Test Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SSC CGL Full Length Mock Test #8"
                  value={formData.examTitle}
                  onChange={(e) => setFormData({ ...formData, examTitle: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Course / Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Exam Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.examDate}
                    onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Total Marks *</label>
                  <input
                    type="number"
                    required
                    value={formData.totalMarks}
                    onChange={(e) => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Scored Marks *</label>
                  <input
                    type="number"
                    required
                    value={formData.scoredMarks}
                    onChange={(e) => setFormData({ ...formData, scoredMarks: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Batch Rank</label>
                  <input
                    type="number"
                    placeholder="e.g. 3"
                    value={formData.rank || ''}
                    onChange={(e) => setFormData({ ...formData, rank: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Faculty Feedback & Recommendations</label>
                <textarea
                  rows="2"
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold"
                >
                  Publish Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
