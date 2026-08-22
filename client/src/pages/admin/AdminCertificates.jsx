import React, { useState, useEffect } from 'react';
import { FileCheck, Search, Filter, CheckCircle2, Edit, Trash2, Phone, Mail, Clock } from 'lucide-react';
import api from '../../api/axios';

export default function AdminCertificates() {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedReq, setSelectedReq] = useState(null);

  const statuses = [
    'All',
    'SUBMITTED',
    'UNDER REVIEW',
    'DOCUMENTS REQUIRED',
    'APPLICATION PROCESSED',
    'READY FOR COLLECTION',
    'COMPLETED',
    'REJECTED',
  ];

  const fetchRequests = async () => {
    setLoading(true);
    try {
      let url = '/certificates';
      const params = new URLSearchParams();
      if (statusFilter !== 'All') params.append('status', statusFilter);
      if (search) params.append('search', search);

      const res = await api.get(`${url}?${params.toString()}`);
      if (res.data.success) {
        setRequests(res.data.requests);
      }
    } catch (err) {
      console.error('Error fetching certificate requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [statusFilter, search]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/certificates/${selectedReq._id}`, {
        certificateStatus: selectedReq.certificateStatus,
        adminRemarks: selectedReq.adminRemarks,
      });
      if (res.data.success) {
        setSelectedReq(null);
        fetchRequests();
      }
    } catch (err) {
      alert('Error updating certificate status: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate request?')) return;
    try {
      const res = await api.delete(`/certificates/${id}`);
      if (res.data.success) fetchRequests();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white uppercase">8. Certificate Assistance Requests Desk</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage university certificate retrieval requests, update university liaison stages, and communicate remarks.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, student, mobile, university..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
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

      {/* Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading certificate requests...</div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No certificate requests found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-700">
                <tr>
                  <th className="p-3.5">Req ID</th>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Certificate Type</th>
                  <th className="p-3.5">University & College</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-slate-750">
                    <td className="p-3.5 font-mono font-bold text-amber-400">{req.applicationId}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-white">{req.studentName}</div>
                      <div className="text-[11px] text-slate-400">{req.mobile}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-white truncate max-w-[180px]">{req.certificateRequired}</div>
                      <div className="text-[11px] text-slate-400">Graduated: {req.graduationYear}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="text-slate-300 truncate max-w-[180px]">{req.university}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[180px]">{req.college} ({req.course})</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                        {req.certificateStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setSelectedReq({ ...req })}
                        className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-amber-400 font-bold text-[11px]"
                      >
                        Update Stage
                      </button>
                      <button
                        onClick={() => handleDelete(req._id)}
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

      {/* Update Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-slate-700 pb-3">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                {selectedReq.applicationId}
              </span>
              <h3 className="text-base font-bold text-white">
                Update Certificate Stage: {selectedReq.studentName}
              </h3>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5 text-slate-300">
              <div>
                <span className="text-slate-500 block">Certificate Requested:</span>
                <span className="font-bold text-white">{selectedReq.certificateRequired}</span>
              </div>
              <div>
                <span className="text-slate-500 block">University & College:</span>
                <span>{selectedReq.university} • {selectedReq.college}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 block">Course & Year:</span>
                  <span>{selectedReq.course} ({selectedReq.graduationYear})</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Hall Ticket No:</span>
                  <span>{selectedReq.hallTicketNumber || 'Not provided'}</span>
                </div>
              </div>
              {selectedReq.additionalDetails && (
                <div>
                  <span className="text-slate-500 block">Candidate Context:</span>
                  <span className="italic">"{selectedReq.additionalDetails}"</span>
                </div>
              )}
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">New Workflow Stage</label>
                <select
                  value={selectedReq.certificateStatus}
                  onChange={(e) => setSelectedReq({ ...selectedReq, certificateStatus: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                >
                  <option value="SUBMITTED">SUBMITTED</option>
                  <option value="UNDER REVIEW">UNDER REVIEW</option>
                  <option value="DOCUMENTS REQUIRED">DOCUMENTS REQUIRED</option>
                  <option value="APPLICATION PROCESSED">APPLICATION PROCESSED</option>
                  <option value="READY FOR COLLECTION">READY FOR COLLECTION</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Directorate Remarks (Visible to Student on Tracking)</label>
                <textarea
                  rows="3"
                  value={selectedReq.adminRemarks || ''}
                  onChange={(e) => setSelectedReq({ ...selectedReq, adminRemarks: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedReq(null)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold"
                >
                  Update Stage & Notify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
