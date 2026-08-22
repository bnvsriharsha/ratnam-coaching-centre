import React, { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Edit, Download } from 'lucide-react';
import api from '../../api/axios';

export default function AdminMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const initialForm = {
    title: '',
    category: 'Competitive Exams',
    subject: '',
    courseName: '',
    description: '',
    fileType: 'PDF',
    downloadUrl: '#',
    fileSize: '3.2 MB',
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await api.get('/portal/materials');
      if (res.data.success) setMaterials(res.data.materials);
    } catch (err) {
      console.error('Error fetching materials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/portal/materials', formData);
      setModalOpen(false);
      setFormData(initialForm);
      fetchMaterials();
    } catch (err) {
      alert('Error creating material: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this study material?')) return;
    try {
      await api.delete(`/portal/materials/${id}`);
      fetchMaterials();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white uppercase">9. Study Materials & Repository</h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload notes, lecture handouts, and practice question banks for students.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow transition"
        >
          <Plus className="w-4 h-4" /> Add Material
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-xs text-slate-400">Loading study materials...</div>
      ) : materials.length === 0 ? (
        <div className="p-8 bg-slate-800 rounded-2xl text-center text-xs text-slate-400">
          No study materials found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {materials.map((m) => (
            <div
              key={m._id}
              className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-navy-950 uppercase">
                    {m.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{m.fileSize}</span>
                </div>
                <h3 className="text-base font-bold text-white">{m.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{m.description}</p>
                <div className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-750">
                  Subject: <strong>{m.subject}</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 flex justify-end">
                <button
                  onClick={() => handleDelete(m._id)}
                  className="px-3 py-1 rounded bg-red-950/60 hover:bg-red-900 text-red-400 text-xs font-bold transition flex items-center gap-1"
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
            <h3 className="text-base font-bold text-white uppercase">Add Study Material Document</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  >
                    <option value="Competitive Exams">Competitive Exams</option>
                    <option value="School Tuitions">School Tuitions</option>
                    <option value="Distance Education">Distance Education</option>
                    <option value="General Aptitude">General Aptitude</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Description / Module Coverage</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Document Format</label>
                  <select
                    value={formData.fileType}
                    onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Notes">Notes Handout</option>
                    <option value="Practice Paper">Practice Paper</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Approx Size</label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
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
                  Save Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
