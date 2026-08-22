import React, { useState, useEffect } from 'react';
import { GraduationCap, Edit, CheckCircle2, Save, X } from 'lucide-react';
import api from '../../api/axios';

export default function AdminTuitions() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTuition, setEditTuition] = useState(null);

  const fetchTuitions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tuitions');
      if (res.data.success) {
        setTuitions(res.data.tuitions);
      }
    } catch (err) {
      console.error('Error fetching tuitions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTuitions();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...editTuition,
        subjects: typeof editTuition.subjects === 'string'
          ? editTuition.subjects.split(',').map((s) => s.trim()).filter(Boolean)
          : editTuition.subjects,
      };

      const res = await api.put(`/tuitions/${editTuition._id}`, payload);
      if (res.data.success) {
        setEditTuition(null);
        fetchTuitions();
      }
    } catch (err) {
      alert('Error updating tuition: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white uppercase">4. School Tuition Management (Classes 1–10)</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure daily batch timings, subjects, assigned teachers, batch capacity, and enrollment statuses for Classes 1 to 10.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-xs text-slate-400">Loading tuition classes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tuitions.map((t) => (
            <div
              key={t._id}
              className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-8 h-8 rounded-lg bg-amber-500 text-navy-950 font-black flex items-center justify-center text-sm">
                      {t.classGrade}
                    </span>
                    <h3 className="text-base font-bold text-white">{t.className}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                    {t.status}
                  </span>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-750 text-xs space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Timings:</span>
                    <span>{t.timings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Batch Capacity:</span>
                    <span>{t.batchCapacity} Students</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned Mentors:</span>
                    <span className="truncate max-w-[180px]">{t.assignedTeachers}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  <span className="font-bold text-slate-300 block mb-1">Subjects:</span>
                  <p>{t.subjects ? t.subjects.join(', ') : 'All Core Subjects'}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 flex justify-end">
                <button
                  onClick={() =>
                    setEditTuition({
                      ...t,
                      subjects: Array.isArray(t.subjects) ? t.subjects.join(', ') : t.subjects,
                    })
                  }
                  className="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-amber-400 text-xs font-bold transition flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" /> Configure {t.className}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editTuition && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white uppercase">
              Configure {editTuition.className} Tuition Settings
            </h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Batch Timings</label>
                <input
                  type="text"
                  value={editTuition.timings}
                  onChange={(e) => setEditTuition({ ...editTuition, timings: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Assigned Teachers / Mentors</label>
                <input
                  type="text"
                  value={editTuition.assignedTeachers}
                  onChange={(e) => setEditTuition({ ...editTuition, assignedTeachers: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Batch Capacity</label>
                  <input
                    type="number"
                    value={editTuition.batchCapacity}
                    onChange={(e) => setEditTuition({ ...editTuition, batchCapacity: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Admission Status</label>
                  <select
                    value={editTuition.status}
                    onChange={(e) => setEditTuition({ ...editTuition, status: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  >
                    <option value="Admissions Open">Admissions Open</option>
                    <option value="Limited Seats">Limited Seats</option>
                    <option value="Batch Full">Batch Full</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Subjects (Comma-separated)</label>
                <input
                  type="text"
                  value={editTuition.subjects}
                  onChange={(e) => setEditTuition({ ...editTuition, subjects: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditTuition(null)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
