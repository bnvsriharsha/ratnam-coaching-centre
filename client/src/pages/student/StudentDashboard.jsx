import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  CalendarCheck,
  Award,
  FileCheck,
  Bell,
  Clock,
  Sparkles,
  ArrowRight,
  Download,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/portal/dashboard');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Error loading student dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-10 h-10 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Loading student portal...</p>
      </div>
    );
  }

  const stats = data?.stats || {
    enrolledCoursesCount: 1,
    attendancePercentage: 95,
    testsAttemptedCount: 4,
    pendingCertificateRequestsCount: 0,
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="academic-gradient text-white p-6 sm:p-8 rounded-2xl shadow-md border border-navy-800 pattern-grid flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-400 border border-gold-500/30 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Clock className="w-3 h-3" /> Student ID: {user?.studentId || 'RCC-STU-ACTIVE'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xs sm:text-sm text-gold-400 font-serif italic">
            "Don't Sit Like a Rock, Work Like a Clock."
          </p>
          <p className="text-xs text-slate-300">
            Keep up your daily practice drills, homework review, and weekly test preparation.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/student/materials"
            className="px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow transition"
          >
            Study Notes
          </Link>
          <Link
            to="/student/certificates"
            className="px-4 py-2.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-white border border-slate-600 font-bold text-xs uppercase tracking-wider transition"
          >
            Certificates
          </Link>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Enrolled Programs</span>
            <BookOpen className="w-5 h-5 text-navy-900" />
          </div>
          <div className="text-2xl font-black text-navy-900 mt-2">
            {stats.enrolledCoursesCount}
          </div>
          <span className="text-[11px] text-slate-400">Active classroom batch</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Attendance Rate</span>
            <CalendarCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-2">
            {stats.attendancePercentage}%
          </div>
          <span className="text-[11px] text-slate-400">Regular attendance record</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Tests Attempted</span>
            <Award className="w-5 h-5 text-gold-600" />
          </div>
          <div className="text-2xl font-black text-navy-900 mt-2">
            {stats.testsAttemptedCount}
          </div>
          <span className="text-[11px] text-slate-400">Chapter & mock evaluations</span>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Cert. Requests</span>
            <FileCheck className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-navy-900 mt-2">
            {stats.pendingCertificateRequestsCount}
          </div>
          <span className="text-[11px] text-slate-400">In guidance queue</span>
        </div>
      </div>

      {/* Main Grid: Recent Results & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Test Scores */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-gold-600" /> Recent Test Performance
            </h2>
            <Link
              to="/student/results"
              className="text-xs font-bold text-navy-900 hover:text-gold-600 transition flex items-center gap-1"
            >
              All Scores <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {data?.recentResults?.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No exam results recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {data?.recentResults?.map((res) => (
                <div
                  key={res._id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">
                      {res.examDate}
                    </span>
                    <h3 className="text-sm font-bold text-navy-900">{res.examTitle}</h3>
                    <p className="text-[11px] text-slate-500">{res.courseName}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-navy-900">
                      {res.scoredMarks} / {res.totalMarks}
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {res.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Notice Board & Alerts */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" /> Notice Board & Alerts
            </h2>
            <Link
              to="/student/announcements"
              className="text-xs font-bold text-navy-900 hover:text-gold-600 transition flex items-center gap-1"
            >
              All Notices <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {data?.announcements?.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No active announcements.</p>
          ) : (
            <div className="space-y-3">
              {data?.announcements?.map((ann) => (
                <div
                  key={ann._id}
                  className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-950">{ann.title}</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">
                      {ann.category}
                    </span>
                  </div>
                  <p className="text-slate-600 line-clamp-2 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
