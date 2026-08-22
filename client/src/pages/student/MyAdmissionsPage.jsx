import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import api from '../../api/axios';

export default function MyAdmissionsPage() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const res = await api.get('/admissions/my-admissions');
        if (res.data.success) {
          setAdmissions(res.data.admissions);
        }
      } catch (err) {
        console.error('Error fetching student admissions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissions();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900 uppercase">My Admission Applications</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track your course admission forms and enrollment review status.
          </p>
        </div>

        <Link
          to="/admissions"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow transition"
        >
          <Plus className="w-4 h-4" /> Apply for New Course
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-slate-500">Loading admissions...</p>
        </div>
      ) : admissions.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-md mx-auto space-y-4">
          <Sparkles className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-navy-900">No Admission Records</h3>
          <p className="text-xs text-slate-500">
            You have not submitted an online admission application recently.
          </p>
          <Link
            to="/admissions"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white font-bold text-xs"
          >
            Submit Admission Form
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {admissions.map((adm) => (
            <div
              key={adm._id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                <div>
                  <span className="text-xs font-mono font-bold text-navy-900 bg-navy-50 px-2.5 py-1 rounded border border-navy-200">
                    {adm.applicationId}
                  </span>
                  <h3 className="text-base font-bold text-navy-900 mt-2">{adm.courseInterested}</h3>
                  <p className="text-xs text-slate-500">
                    Mode: <strong>{adm.mode}</strong> • Preferred Batch: <strong>{adm.preferredBatch}</strong>
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-800 border border-blue-200 uppercase tracking-wider">
                    {adm.status}
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-1 font-mono">
                    Submitted: {new Date(adm.createdAt).toLocaleDateString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-navy-900 block text-[10px] uppercase">
                  Administration Remarks:
                </span>
                <p className="text-slate-700 font-mono text-[11px]">{adm.adminRemarks}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
