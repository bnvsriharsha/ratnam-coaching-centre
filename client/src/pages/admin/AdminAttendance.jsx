import React, { useState, useEffect } from 'react';
import { CalendarCheck, Plus, CheckCircle2, XCircle, Search } from 'lucide-react';
import api from '../../api/axios';

export default function AdminAttendance() {
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];

  const initialForm = {
    studentId: '',
    courseName: 'SSC CGL / Banking PO Regular Batch',
    date: todayStr,
    status: 'Present',
    topicCovered: '',
    remarks: '',
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [attRes, stuRes] = await Promise.all([
        api.get('/portal/attendance'),
        api.get('/auth/students'),
      ]);
      if (attRes.data.success) setRecords(attRes.data.records);
      if (stuRes.data.success) setStudents(stuRes.data.students);
    } catch (err) {
      console.error('Error fetching attendance:', err);
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
      await api.post('/portal/attendance', formData);
      setModalOpen(false);
      setFormData(initialForm);
      fetchData();
    } catch (err) {
      alert('Error recording attendance: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white uppercase">10. Daily Attendance Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Log and review daily student attendance across classroom batches and school tuitions.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow transition"
        >
          <Plus className="w-4 h-4" /> Log Attendance Entry
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading attendance records...</div>
        ) : records.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No attendance entries recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-700">
                <tr>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Student ID</th>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Course / Batch</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Topic Covered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {records.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-750">
                    <td className="p-3.5 font-mono text-amber-400 font-bold">{r.date}</td>
                    <td className="p-3.5 font-mono">{r.studentId}</td>
                    <td className="p-3.5 font-bold text-white">{r.studentName}</td>
                    <td className="p-3.5">{r.courseName}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          r.status === 'Present'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                            : 'bg-red-950/60 text-red-400 border border-red-800'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400">{r.topicCovered || 'Regular Syllabus Class'}</td>
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
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white uppercase">Mark Student Attendance</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Select Enrolled Student *</label>
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
                <label className="text-slate-400 block mb-1">Course / Batch Name *</label>
                <input
                  type="text"
                  required
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                    <option value="Excused">Excused</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Topic Covered</label>
                <input
                  type="text"
                  placeholder="e.g. Time and Work / Quadratic Equations"
                  value={formData.topicCovered}
                  onChange={(e) => setFormData({ ...formData, topicCovered: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
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
                  Record Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
