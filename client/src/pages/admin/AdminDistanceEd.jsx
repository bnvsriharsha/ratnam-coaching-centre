import React, { useState, useEffect } from 'react';
import { Globe, Plus, Edit, Trash2, CheckCircle2 } from 'lucide-react';
import api from '../../api/axios';

export default function AdminDistanceEd() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);

  const initialForm = {
    programName: '',
    degreeLevel: 'Undergraduate',
    university: 'Andhra University (School of Distance Education)',
    duration: '3 Years',
    eligibility: '',
    overview: '',
    servicesOffered: 'Admission process & document guidance, Application form filling, Assignment tracking, Exam hall ticket guidance',
    status: 'Guidance Active',
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await api.get('/distance-education');
      if (res.data.success) {
        setPrograms(res.data.programs);
      }
    } catch (err) {
      console.error('Error fetching programs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleOpenAdd = () => {
    setEditingProgram(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProgram(p);
    setFormData({
      ...p,
      servicesOffered: Array.isArray(p.servicesOffered) ? p.servicesOffered.join(', ') : p.servicesOffered,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this distance education program?')) return;
    try {
      const res = await api.delete(`/distance-education/${id}`);
      if (res.data.success) fetchPrograms();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        servicesOffered: typeof formData.servicesOffered === 'string'
          ? formData.servicesOffered.split(',').map((s) => s.trim()).filter(Boolean)
          : formData.servicesOffered,
      };

      if (editingProgram) {
        await api.put(`/distance-education/${editingProgram._id}`, payload);
      } else {
        await api.post('/distance-education', payload);
      }
      setModalOpen(false);
      fetchPrograms();
    } catch (err) {
      alert('Error saving program: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white uppercase">5. Distance Education Programs (Andhra University)</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage supported degree programs, application guidance services, and admission statuses.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow transition"
        >
          <Plus className="w-4 h-4" /> Add Program
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-xs text-slate-400">Loading programs...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((p) => (
            <div
              key={p._id}
              className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-navy-950 uppercase">
                    {p.degreeLevel}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400">{p.status}</span>
                </div>
                <h3 className="text-base font-bold text-white">{p.programName}</h3>
                <p className="text-xs text-slate-400">{p.overview}</p>
                <div className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-750">
                  Duration: <strong>{p.duration}</strong> • University: <strong>{p.university}</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 flex justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-amber-400 text-xs font-bold transition flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-3 py-1.5 rounded bg-red-950/60 hover:bg-red-900 text-red-400 text-xs font-bold transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white uppercase">
              {editingProgram ? 'Edit Distance Program' : 'Add New Distance Program'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Program Name *</label>
                <input
                  type="text"
                  required
                  value={formData.programName}
                  onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Level *</label>
                  <select
                    value={formData.degreeLevel}
                    onChange={(e) => setFormData({ ...formData, degreeLevel: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Certificate">Certificate</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Eligibility *</label>
                <input
                  type="text"
                  required
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Overview Description *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
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
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
