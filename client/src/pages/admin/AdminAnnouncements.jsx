import React, { useState, useEffect } from 'react';
import { Bell, Plus, Trash2, Edit } from 'lucide-react';
import api from '../../api/axios';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const initialForm = {
    title: '',
    content: '',
    category: 'General',
    audience: 'All',
    priority: 'Normal',
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await api.get('/portal/announcements');
      if (res.data.success) {
        setAnnouncements(res.data.announcements);
      }
    } catch (err) {
      console.error('Error fetching announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/portal/announcements', formData);
      setModalOpen(false);
      setFormData(initialForm);
      fetchAnnouncements();
    } catch (err) {
      alert('Error creating announcement: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      await api.delete(`/portal/announcements/${id}`);
      fetchAnnouncements();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white uppercase">13. Notice Board & Announcements Manager</h1>
          <p className="text-xs text-slate-400 mt-1">
            Broadcast examination alerts, batch schedules, holiday notices, and ticker messages.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow transition"
        >
          <Plus className="w-4 h-4" /> Create Announcement
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-xs text-slate-400">Loading announcements...</div>
      ) : announcements.length === 0 ? (
        <div className="p-8 bg-slate-800 rounded-2xl text-center text-xs text-slate-400">
          No announcements active. Click "+ Create Announcement" to broadcast a notice.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((ann) => (
            <div
              key={ann._id}
              className={`p-5 rounded-2xl border space-y-3 flex flex-col justify-between ${
                ann.priority === 'Urgent'
                  ? 'bg-red-950/40 border-red-800/60'
                  : ann.priority === 'High'
                  ? 'bg-amber-950/30 border-amber-800/50'
                  : 'bg-slate-800 border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      ann.priority === 'Urgent'
                        ? 'bg-red-600 text-white'
                        : ann.priority === 'High'
                        ? 'bg-amber-500 text-navy-950'
                        : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {ann.category} ({ann.priority})
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Audience: {ann.audience}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{ann.title}</h3>
                <p className="text-xs text-slate-300 whitespace-pre-line">{ann.content}</p>
              </div>

              <div className="pt-3 border-t border-slate-700 flex justify-end">
                <button
                  onClick={() => handleDelete(ann._id)}
                  className="px-3 py-1 rounded bg-red-950/60 hover:bg-red-900 text-red-400 text-xs font-bold transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Notice
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white uppercase">Broadcast New Announcement</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. New Batch Starting for SSC CGL 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  >
                    <option value="General">General</option>
                    <option value="Exam Alert">Exam Alert</option>
                    <option value="Batch Notification">Batch Alert</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Distance Education">Distance Ed</option>
                    <option value="Certificate Notice">Certificate</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Audience</label>
                  <select
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  >
                    <option value="All">All Visitors</option>
                    <option value="Competitive Exams">Competitive</option>
                    <option value="School Tuitions">Tuitions</option>
                    <option value="Distance Education">Distance</option>
                    <option value="Registered Students">Students Only</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent (Ticker)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Announcement Content *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Detailed announcement text..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
