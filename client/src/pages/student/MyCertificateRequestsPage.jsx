import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileCheck, Clock, Plus, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import api from '../../api/axios';

export default function MyCertificateRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get('/certificates/my-requests');
        if (res.data.success) {
          setRequests(res.data.requests);
        }
      } catch (err) {
        console.error('Error loading certificate requests:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
      case 'READY FOR COLLECTION':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'APPLICATION PROCESSED':
      case 'UNDER REVIEW':
        return 'bg-blue-50 text-blue-800 border-blue-300';
      case 'DOCUMENTS REQUIRED':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'REJECTED':
        return 'bg-red-50 text-red-800 border-red-300';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900 uppercase">My Certificate Requests</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track and manage your university certificate retrieval assistance applications.
          </p>
        </div>

        <Link
          to="/certificate-assistance"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow transition"
        >
          <Plus className="w-4 h-4" /> New Certificate Request
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-slate-500">Loading requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-md mx-auto space-y-4">
          <FileCheck className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-navy-900">No Active Certificate Requests</h3>
          <p className="text-xs text-slate-500">
            If you need assistance retrieving a Degree Certificate, Provisional Memo, or Migration document from your university, submit a request below.
          </p>
          <Link
            to="/certificate-assistance"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white font-bold text-xs"
          >
            Submit Assistance Form
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 hover:border-gold-500 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                <div>
                  <span className="text-xs font-mono font-bold text-navy-900 bg-navy-50 px-2.5 py-1 rounded border border-navy-200">
                    {req.applicationId}
                  </span>
                  <h3 className="text-base font-bold text-navy-900 mt-2">{req.certificateRequired}</h3>
                  <p className="text-xs text-slate-500">
                    {req.university} • {req.college} ({req.course})
                  </p>
                </div>

                <div className="sm:text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-black border uppercase tracking-wider ${getStatusColor(
                      req.certificateStatus
                    )}`}
                  >
                    {req.certificateStatus}
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-1 font-mono">
                    Submitted: {new Date(req.createdAt).toLocaleDateString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Remarks Box */}
              <div className="p-3.5 bg-navy-900 text-white rounded-xl text-xs space-y-1">
                <span className="text-gold-400 font-bold block text-[10px] uppercase">
                  Latest Directorate Remarks:
                </span>
                <p className="text-slate-200 font-mono text-[11px]">{req.adminRemarks}</p>
              </div>

              {/* Status History */}
              {req.statusHistory && req.statusHistory.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-slate-700 uppercase">Processing Trail:</span>
                  <div className="space-y-1.5 border-l-2 border-slate-200 pl-3">
                    {req.statusHistory.map((h, i) => (
                      <div key={i} className="text-[11px] flex items-center justify-between text-slate-600">
                        <span className="font-semibold text-navy-900">{h.status}: {h.remarks}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(h.updatedAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
