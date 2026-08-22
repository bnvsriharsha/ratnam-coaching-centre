import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FileCheck,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  Phone,
  FileText,
  Calendar,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import api from '../../api/axios';

export default function CertificateTrackingPage() {
  const [searchParams] = useSearchParams();
  const [applicationId, setApplicationId] = useState(searchParams.get('id') || '');
  const [mobile, setMobile] = useState(searchParams.get('mobile') || '');
  const [trackType, setTrackType] = useState('certificate'); // 'certificate' | 'admission'

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const statusSteps = [
    'SUBMITTED',
    'UNDER REVIEW',
    'DOCUMENTS REQUIRED',
    'APPLICATION PROCESSED',
    'READY FOR COLLECTION',
    'COMPLETED',
  ];

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!applicationId || !mobile) {
      setErrorMsg('Please enter both Application ID and registered Mobile number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setRecord(null);

    const isAdmissionId = applicationId.toUpperCase().includes('ADM');
    const endpoint = isAdmissionId || trackType === 'admission' ? '/admissions/track' : '/certificates/track';

    try {
      const res = await api.post(endpoint, {
        applicationId: applicationId.trim(),
        mobile: mobile.trim(),
      });

      if (res.data.success) {
        setRecord({
          type: isAdmissionId || trackType === 'admission' ? 'admission' : 'certificate',
          data: res.data.admission || res.data.certificateRequest,
        });
      } else {
        setErrorMsg(res.data.message || 'No record found with the provided details.');
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          'Unable to find matching record. Please verify your Application ID and 10-digit Mobile number.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('id') && searchParams.get('mobile')) {
      handleTrack();
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
      case 'APPROVED':
      case 'ENROLLED':
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
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="academic-gradient text-white py-16 px-4 pattern-grid">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <FileCheck className="w-3.5 h-3.5" /> Institutional Tracking Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            APPLICATION & CERTIFICATE TRACKING
          </h1>
          <p className="text-gold-400 font-serif italic text-base sm:text-lg">
            "Don't Sit Like a Rock, Work Like a Clock."
          </p>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Check the real-time processing stage, administration remarks, and updates for your certificate assistance requests and admissions.
          </p>
        </div>
      </section>

      {/* Tracking Input Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-navy-900">Enter Your Application Details</h2>
            <p className="text-xs text-slate-500">
              Provide your generated Application ID (e.g. RCC-CERT-2026-00001 or RCC-ADM-2026-00001) and Mobile Number.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Application ID *</label>
              <input
                type="text"
                placeholder="e.g. RCC-CERT-2026-00001"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value.toUpperCase())}
                className="w-full p-3 rounded-lg border border-slate-300 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-navy-900"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Registered Mobile Number *</label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                required
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-gold-500 hover:bg-gold-600 disabled:bg-slate-300 text-navy-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Checking Records...</span>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>TRACK APPLICATION STATUS NOW</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Tracking Results Visualizer */}
      {record && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gold-500 overflow-hidden space-y-6 p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-navy-900 text-gold-400">
                  {record.type === 'certificate' ? 'Certificate Assistance Request' : 'Online Admission Application'}
                </span>
                <h3 className="text-2xl font-black text-navy-900 font-mono mt-1">
                  {record.data.applicationId}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Applicant: <strong className="text-slate-800">{record.data.studentName}</strong> • Submitted on{' '}
                  {new Date(record.data.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>

              {/* Status Badge */}
              <div className="sm:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Current Status:</span>
                <span
                  className={`inline-block px-3.5 py-1.5 rounded-full font-black text-xs border uppercase tracking-wider ${getStatusColor(
                    record.data.certificateStatus || record.data.status
                  )}`}
                >
                  {record.data.certificateStatus || record.data.status}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs">
              {record.type === 'certificate' ? (
                <>
                  <div>
                    <span className="text-slate-500 font-medium">Certificate Requested:</span>
                    <p className="font-bold text-navy-900">{record.data.certificateRequired}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">University / Board:</span>
                    <p className="font-bold text-navy-900">{record.data.university}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">College & Course:</span>
                    <p className="font-bold text-navy-900">
                      {record.data.college} ({record.data.course})
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Graduation Year / Hall Ticket:</span>
                    <p className="font-bold text-navy-900">
                      {record.data.graduationYear} {record.data.hallTicketNumber ? `(${record.data.hallTicketNumber})` : ''}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="text-slate-500 font-medium">Course Interested:</span>
                    <p className="font-bold text-navy-900">{record.data.courseInterested}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Preferred Batch & Mode:</span>
                    <p className="font-bold text-navy-900">
                      {record.data.preferredBatch} ({record.data.mode})
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Parent / Guardian:</span>
                    <p className="font-bold text-navy-900">{record.data.parentName}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Assigned Student ID:</span>
                    <p className="font-bold text-navy-900 font-mono">
                      {record.data.assignedStudentId || 'Will be assigned upon enrollment'}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Admin Remarks Box */}
            <div className="p-4 bg-navy-900 text-white rounded-xl border border-navy-800 space-y-1">
              <span className="text-gold-400 font-bold text-xs uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Latest Administration Desk Remarks
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-mono">
                {record.data.adminRemarks || 'Your application is under active processing by the guidance desk.'}
              </p>
            </div>

            {/* Status History Timeline (if present) */}
            {record.data.statusHistory && record.data.statusHistory.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wide">
                  Processing History & Timeline
                </h4>
                <div className="space-y-3 border-l-2 border-slate-200 pl-4">
                  {record.data.statusHistory.map((hist, idx) => (
                    <div key={idx} className="relative text-xs space-y-0.5">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-gold-500 border border-white"></div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-navy-900 uppercase">{hist.status}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(hist.updatedAt).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{hist.remarks}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
