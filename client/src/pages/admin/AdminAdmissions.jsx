import React, { useState, useEffect } from 'react';
import { Sparkles, Search, Filter, CheckCircle2, Edit, Trash2, Phone, Mail, Clock } from 'lucide-react';
import api from '../../api/axios';

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  const statuses = ['All', 'SUBMITTED', 'UNDER REVIEW', 'APPROVED', 'ENROLLED', 'REJECTED'];

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      let url = '/admissions';
      const params = new URLSearchParams();
      if (statusFilter !== 'All') params.append('status', statusFilter);
      if (search) params.append('search', search);

      const res = await api.get(`${url}?${params.toString()}`);
      if (res.data.success) {
        setAdmissions(res.data.admissions);
      }
    } catch (err) {
      console.error('Error fetching admissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, [statusFilter, search]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/admissions/${selectedAdmission._id}`, {
        status: selectedAdmission.status,
        adminRemarks: selectedAdmission.adminRemarks,
        assignedStudentId: selectedAdmission.assignedStudentId,
      });
      if (res.data.success) {
        setSelectedAdmission(null);
        fetchAdmissions();
      }
    } catch (err) {
      alert('Error updating admission: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this admission record?')) return;
    try {
      const res = await api.delete(`/admissions/${id}`);
      if (res.data.success) fetchAdmissions();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white uppercase">7. Admissions Workflow & Review Desk</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review incoming student applications, update admission stages, and assign student IDs.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, name, mobile, course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              statusFilter === st
                ? 'bg-amber-500 text-navy-950 shadow'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Admissions Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading admissions...</div>
        ) : admissions.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No admission applications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-700">
                <tr>
                  <th className="p-3.5">App ID</th>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Course Interested</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {admissions.map((adm) => (
                  <tr key={adm._id} className="hover:bg-slate-750">
                    <td className="p-3.5 font-mono font-bold text-amber-400">{adm.applicationId}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-white">{adm.studentName}</div>
                      <div className="text-[11px] text-slate-400">Parent: {adm.parentName}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-white">{adm.courseInterested}</div>
                      <div className="text-[11px] text-slate-400">
                        {adm.mode} • {adm.preferredBatch}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="text-slate-300">{adm.mobile}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{adm.email}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                        {adm.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setSelectedAdmission({ ...adm })}
                        className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-amber-400 font-bold text-[11px]"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => handleDelete(adm._id)}
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

      {/* Review Modal */}
      {selectedAdmission && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-slate-700 pb-3">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                {selectedAdmission.applicationId}
              </span>
              <h3 className="text-base font-bold text-white">
                Review Application: {selectedAdmission.studentName}
              </h3>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
              <div>
                <span className="text-slate-500 block">Course Interested:</span>
                <span className="font-bold text-white">{selectedAdmission.courseInterested}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 block">Qualification:</span>
                  <span>{selectedAdmission.qualification}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Batch & Mode:</span>
                  <span>{selectedAdmission.preferredBatch} ({selectedAdmission.mode})</span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 block">Address:</span>
                <span>{selectedAdmission.address}</span>
              </div>
              {selectedAdmission.message && (
                <div>
                  <span className="text-slate-500 block">Candidate Message:</span>
                  <span className="italic">"{selectedAdmission.message}"</span>
                </div>
              )}
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Application Status</label>
                <select
                  value={selectedAdmission.status}
                  onChange={(e) => setSelectedAdmission({ ...selectedAdmission, status: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                >
                  <option value="SUBMITTED">SUBMITTED</option>
                  <option value="UNDER REVIEW">UNDER REVIEW</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="ENROLLED">ENROLLED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Assigned Student ID (if enrolled)</label>
                <input
                  type="text"
                  placeholder="e.g. RCC-STU-2026-0042"
                  value={selectedAdmission.assignedStudentId || ''}
                  onChange={(e) => setSelectedAdmission({ ...selectedAdmission, assignedStudentId: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Administration Remarks (Visible to Student)</label>
                <textarea
                  rows="3"
                  value={selectedAdmission.adminRemarks || ''}
                  onChange={(e) => setSelectedAdmission({ ...selectedAdmission, adminRemarks: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAdmission(null)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold"
                >
                  Update Admission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
