import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, GraduationCap, CheckCircle2 } from 'lucide-react';
import api from '../../api/axios';

export default function AdminFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);

  const initialForm = {
    name: '',
    designation: '',
    qualification: '',
    subject: '',
    specialization: '',
    experience: '',
    coursesHandled: '',
    bio: '',
    status: 'Active',
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchFaculty = async () => {
    setLoading(true);
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

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleOpenAdd = () => {
    setEditingFaculty(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (f) => {
    setEditingFaculty(f);
    setFormData({
      ...f,
      coursesHandled: Array.isArray(f.coursesHandled) ? f.coursesHandled.join(', ') : f.coursesHandled,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this faculty profile?')) return;
    try {
      const res = await api.delete(`/faculty/${id}`);
      if (res.data.success) fetchFaculty();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        coursesHandled: typeof formData.coursesHandled === 'string'
          ? formData.coursesHandled.split(',').map((s) => s.trim()).filter(Boolean)
          : formData.coursesHandled,
      };

      if (editingFaculty) {
        await api.put(`/faculty/${editingFaculty._id}`, payload);
      } else {
        await api.post('/faculty', payload);
      }
      setModalOpen(false);
      fetchFaculty();
    } catch (err) {
      alert('Error saving faculty: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white uppercase">6. Faculty Directory Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, update, and manage educator profiles, subject specializations, qualifications, and teaching experience.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow transition"
        >
          <Plus className="w-4 h-4" /> Add Faculty Profile
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-xs text-slate-400">Loading faculty profiles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faculty.map((f) => (
            <div
              key={f._id}
              className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{f.name}</h3>
                    <p className="text-xs text-amber-400 font-semibold">{f.designation}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{f.qualification}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                    {f.status}
                  </span>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-750 text-xs space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subject:</span>
                    <span className="font-bold text-white">{f.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Experience:</span>
                    <span>{f.experience}</span>
                  </div>
                  {f.specialization && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Specialization:</span>
                      <span className="truncate max-w-[170px]">{f.specialization}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 italic">"{f.bio}"</p>
              </div>

              <div className="pt-3 border-t border-slate-700 flex justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(f)}
                  className="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-amber-400 text-xs font-bold transition flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(f._id)}
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
              {editingFaculty ? 'Edit Faculty Profile' : 'Add Faculty Profile'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Qualifications *</label>
                  <input
                    type="text"
                    required
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Primary Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Experience *</label>
                  <input
                    type="text"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Specialization</label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Courses Handled (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.coursesHandled}
                  onChange={(e) => setFormData({ ...formData, coursesHandled: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Biography / Teaching Philosophy</label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
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
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
