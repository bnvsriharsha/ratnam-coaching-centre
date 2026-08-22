import React, { useState, useEffect } from 'react';
import { CalendarCheck, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import api from '../../api/axios';

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState({ count: 0, percentage: 100, records: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get('/portal/attendance/my');
        if (res.data.success) {
          setAttendanceData(res.data);
        }
      } catch (err) {
        console.error('Error fetching attendance:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-navy-900 uppercase">My Attendance Record</h1>
        <p className="text-xs text-slate-500 mt-1">
          Track your daily attendance percentage, topics covered, and attendance logs.
        </p>
      </div>

      {/* Summary KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase">Overall Attendance</span>
          <div className="text-3xl font-black text-emerald-700 mt-2">
            {attendanceData.percentage}%
          </div>
          <span className="text-[11px] text-slate-400">Regular attendance standard</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Logged Days</span>
          <div className="text-3xl font-black text-navy-900 mt-2">
            {attendanceData.count}
          </div>
          <span className="text-[11px] text-slate-400">Classroom sessions tracked</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase">Discipline Target</span>
          <div className="text-3xl font-black text-gold-600 mt-2">90%+</div>
          <span className="text-[11px] text-slate-400">Required for test qualification</span>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 font-bold text-sm text-navy-900">
          Session Attendance Logs
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">Loading attendance logs...</div>
        ) : attendanceData.records.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No attendance entries logged yet for your active courses.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Course / Class</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Topic Covered</th>
                  <th className="p-3.5">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attendanceData.records.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-mono font-bold text-navy-900">{r.date}</td>
                    <td className="p-3.5 font-semibold text-slate-800">{r.courseName}</td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          r.status === 'Present'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {r.status === 'Present' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">{r.topicCovered || 'Regular Syllabus Class'}</td>
                    <td className="p-3.5 text-slate-500 text-[11px]">{r.remarks || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
