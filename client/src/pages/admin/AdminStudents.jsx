import React, { useState, useEffect } from 'react';
import { Users, Search, CheckCircle2, XCircle, Trash2, Edit, Phone, Mail, Clock } from 'lucide-react';
import api from '../../api/axios';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [editStudent, setEditStudent] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      let url = '/auth/students';
      if (search) url += `?search=${encodeURIComponent(search)}`;
      const res = await api.get(url);
      if (res.data.success) {
        setStudents(res.data.students);
      }
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const handleToggleStatus = async (student) => {
    try {
      const res = await api.put(`/auth/students/${student._id}`, {
        isActive: !student.isActive,
      });
      if (res.data.success) {
        fetchStudents();
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student account?')) return;
    try {
      const res = await api.delete(`/auth/students/${id}`);
      if (res.data.success) {
        fetchStudents();
      }
    } catch (err) {
      alert('Error deleting student: ' + err.message);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/auth/students/${editStudent._id}`, editStudent);
      if (res.data.success) {
        setEditStudent(null);
        fetchStudents();
      }
    } catch (err) {
      alert('Error updating student: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white uppercase">2. Enrolled Student Directory</h1>
          <p className="text-xs text-slate-400 mt-1">
            View, search, and manage registered student accounts and course allotments.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, ID, mobile, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading student directory...</div>
        ) : students.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No student records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-700">
                <tr>
                  <th className="p-3.5">Student ID</th>
                  <th className="p-3.5">Name & Email</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5">Class / Program</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {students.map((stu) => (
                  <tr key={stu._id} className="hover:bg-slate-750">
                    <td className="p-3.5 font-mono font-bold text-amber-400">{stu.studentId || 'RCC-STU-N/A'}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-white">{stu.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{stu.email}</div>
                    </td>
                    <td className="p-3.5">
                      <div>{stu.phone || '—'}</div>
                      <div className="text-[11px] text-slate-400">Parent: {stu.parentName || '—'}</div>
                    </td>
                    <td className="p-3.5">
                      <span>{stu.schoolClass || stu.distanceProgram || 'Competitive Exam Batch'}</span>
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => handleToggleStatus(stu)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                          stu.isActive
                            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                            : 'bg-red-950/60 text-red-400 border-red-800'
                        }`}
                      >
                        {stu.isActive ? 'Active' : 'Suspended'}
                      </button>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setEditStudent({ ...stu })}
                        className="p-1.5 rounded bg-slate-700 hover:bg-slate-600 text-amber-400 transition"
                        title="Edit Student"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(stu._id)}
                        className="p-1.5 rounded bg-red-950/60 hover:bg-red-900 text-red-400 transition"
                        title="Delete Student"
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

      {/* Edit Student Modal */}
      {editStudent && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white uppercase">
              Edit Student: {editStudent.name}
            </h3>
            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={editStudent.name}
                  onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Mobile</label>
                  <input
                    type="text"
                    value={editStudent.phone || ''}
                    onChange={(e) => setEditStudent({ ...editStudent, phone: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Parent Name</label>
                  <input
                    type="text"
                    value={editStudent.parentName || ''}
                    onChange={(e) => setEditStudent({ ...editStudent, parentName: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">School Class</label>
                  <input
                    type="text"
                    value={editStudent.schoolClass || ''}
                    onChange={(e) => setEditStudent({ ...editStudent, schoolClass: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Distance Program</label>
                  <input
                    type="text"
                    value={editStudent.distanceProgram || ''}
                    onChange={(e) => setEditStudent({ ...editStudent, distanceProgram: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Address</label>
                <input
                  type="text"
                  value={editStudent.address || ''}
                  onChange={(e) => setEditStudent({ ...editStudent, address: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditStudent(null)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
