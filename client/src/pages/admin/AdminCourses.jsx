import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit, Trash2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import api from '../../api/axios';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const initialForm = {
    title: '',
    category: 'SSC',
    shortDescription: '',
    overview: '',
    subjects: '',
    eligibility: '',
    duration: '',
    batchTiming: 'Morning: 7:00 AM - 10:00 AM | Evening: 5:00 PM - 8:00 PM',
    mode: 'Classroom & Online',
    facultyName: 'Subject Expert Faculty Panel',
    feeAmount: 12000,
    feeDetails: 'Installment options available. Contact office.',
    startDate: 'New Batches on 1st & 15th of Every Month',
    admissionStatus: 'Admissions Open',
    isFeatured: false,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/courses?includeInactive=true');
      if (res.data.success) {
        setCourses(res.data.courses);
      }
    } catch (err) {
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingCourse(c);
    setFormData({
      ...c,
      subjects: Array.isArray(c.subjects) ? c.subjects.join(', ') : c.subjects || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await api.delete(`/courses/${id}`);
      if (res.data.success) {
        fetchCourses();
      }
    } catch (err) {
      alert('Error deleting course: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        subjects: typeof formData.subjects === 'string'
          ? formData.subjects.split(',').map((s) => s.trim()).filter(Boolean)
          : formData.subjects,
      };

      if (editingCourse) {
        await api.put(`/courses/${editingCourse._id}`, payload);
      } else {
        await api.post('/courses', payload);
      }
      setModalOpen(false);
      fetchCourses();
    } catch (err) {
      alert('Error saving course: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white uppercase">3. Course Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, edit, and configure fees, batch timings, and syllabi for all competitive exam programs.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow transition"
        >
          <Plus className="w-4 h-4" /> Add New Course
        </button>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="text-center py-12 text-xs text-slate-400">Loading courses...</div>
      ) : courses.length === 0 ? (
        <div className="p-8 bg-slate-800 rounded-2xl text-center text-xs text-slate-400">
          No courses found. Click "+ Add New Course" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div
              key={c._id}
              className="bg-slate-800 rounded-2xl border border-slate-700 p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-navy-950 uppercase">
                    {c.category}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400">{c.admissionStatus}</span>
                </div>

                <h3 className="text-base font-bold text-white">{c.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{c.shortDescription}</p>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-750 text-xs space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fee:</span>
                    <span className="font-bold text-amber-400">
                      {c.feeAmount ? `₹${c.feeAmount.toLocaleString('en-IN')}` : 'Custom'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span>{c.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Timing:</span>
                    <span className="truncate max-w-[150px]">{c.batchTiming}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 flex justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(c)}
                  className="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-amber-400 text-xs font-bold transition flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="px-3 py-1.5 rounded bg-red-950/60 hover:bg-red-900 text-red-400 text-xs font-bold transition flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white uppercase">
              {editingCourse ? `Edit Course: ${editingCourse.title}` : 'Add New Competitive Course'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                  >
                    <option value="SSC">SSC</option>
                    <option value="Banking">Banking</option>
                    <option value="Railways">Railways</option>
                    <option value="RBI">RBI</option>
                    <option value="Other Competitive">Other Competitive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Short Summary *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Detailed Course Overview *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                ></textarea>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Subjects Covered (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Quantitative Aptitude, Reasoning, English, General Awareness"
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Eligibility *</label>
                  <input
                    type="text"
                    required
                    value={formData.eligibility}
                    onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Batch Timings *</label>
                  <input
                    type="text"
                    required
                    value={formData.batchTiming}
                    onChange={(e) => setFormData({ ...formData, batchTiming: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Fee Amount (₹)</label>
                  <input
                    type="number"
                    value={formData.feeAmount}
                    onChange={(e) => setFormData({ ...formData, feeAmount: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Admission Status</label>
                  <select
                    value={formData.admissionStatus}
                    onChange={(e) => setFormData({ ...formData, admissionStatus: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                  >
                    <option value="Admissions Open">Admissions Open</option>
                    <option value="Upcoming Batch">Upcoming Batch</option>
                    <option value="Limited Seats">Limited Seats</option>
                    <option value="Batch Full">Batch Full</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Learning Mode</label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
                  >
                    <option value="Classroom & Online">Classroom & Online</option>
                    <option value="Classroom">Classroom Only</option>
                    <option value="Online">Online Only</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
