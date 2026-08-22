import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Sparkles,
  FileCheck,
  Award,
  Bell,
  Mail,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  Plus,
} from 'lucide-react';
import api from '../../api/axios';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard-stats');
        if (res.data.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Error fetching admin dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Loading Directorate Dashboard...</p>
      </div>
    );
  }

  const stats = data?.stats || {
    totalStudents: 0,
    activeCourses: 0,
    totalAdmissions: 0,
    pendingAdmissions: 0,
    totalCertRequests: 0,
    pendingCertRequests: 0,
    facultyCount: 0,
    unreadMessages: 0,
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-navy-950 p-6 sm:p-8 rounded-2xl border border-navy-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-block px-3 py-1 rounded bg-amber-500 text-navy-950 font-black text-xs uppercase tracking-wider mb-2">
            DIRECTORATE CONTROL PANEL
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Ratnam Coaching Centre Administration
          </h1>
          <p className="text-xs text-amber-400 font-serif italic mt-1">
            "Don't Sit Like a Rock, Work Like a Clock." • Established 1998
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/admissions"
            className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow transition"
          >
            Review Admissions ({stats.pendingAdmissions})
          </Link>
          <Link
            to="/admin/certificates"
            className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-bold text-xs uppercase tracking-wider transition"
          >
            Certificates ({stats.pendingCertRequests})
          </Link>
        </div>
      </div>

      {/* KPI Counters Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link
          to="/admin/students"
          className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 hover:border-amber-500 transition block group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Enrolled Students</span>
            <Users className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-white mt-2">{stats.totalStudents}</div>
          <span className="text-[11px] text-amber-400 font-medium">Manage student accounts →</span>
        </Link>

        <Link
          to="/admin/admissions"
          className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 hover:border-amber-500 transition block group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Admissions Pending</span>
            <Sparkles className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-white mt-2">{stats.pendingAdmissions}</div>
          <span className="text-[11px] text-slate-400">Out of {stats.totalAdmissions} total</span>
        </Link>

        <Link
          to="/admin/certificates"
          className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 hover:border-amber-500 transition block group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Certificate Requests</span>
            <FileCheck className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-white mt-2">{stats.pendingCertRequests}</div>
          <span className="text-[11px] text-slate-400">Out of {stats.totalCertRequests} total</span>
        </Link>

        <Link
          to="/admin/courses"
          className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 hover:border-amber-500 transition block group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Active Courses</span>
            <BookOpen className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-white mt-2">{stats.activeCourses}</div>
          <span className="text-[11px] text-slate-400">Competitive curricula active</span>
        </Link>
      </div>

      {/* Recent Admissions & Certificate Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Admissions */}
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Recent Admission Applications
            </h2>
            <Link to="/admin/admissions" className="text-xs text-amber-400 hover:underline font-bold">
              View All →
            </Link>
          </div>

          {data?.recentAdmissions?.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No admission applications received yet.</p>
          ) : (
            <div className="space-y-3">
              {data?.recentAdmissions?.map((adm) => (
                <div
                  key={adm._id}
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-mono text-amber-400 font-bold">{adm.applicationId}</span>
                    <p className="font-bold text-white">{adm.studentName}</p>
                    <p className="text-slate-400 text-[11px]">{adm.courseInterested}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30">
                      {adm.status}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-1 font-mono">
                      {new Date(adm.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Certificate Requests */}
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-400" /> Recent Certificate Assistance Requests
            </h2>
            <Link to="/admin/certificates" className="text-xs text-amber-400 hover:underline font-bold">
              View All →
            </Link>
          </div>

          {data?.recentCertRequests?.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No certificate requests logged yet.</p>
          ) : (
            <div className="space-y-3">
              {data?.recentCertRequests?.map((cert) => (
                <div
                  key={cert._id}
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-mono text-blue-400 font-bold">{cert.applicationId}</span>
                    <p className="font-bold text-white">{cert.studentName}</p>
                    <p className="text-slate-400 text-[11px] truncate max-w-[200px]">{cert.certificateRequired}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px] border border-blue-500/30">
                      {cert.certificateStatus}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-1 font-mono">
                      {new Date(cert.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
