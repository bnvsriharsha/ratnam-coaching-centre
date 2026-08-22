import React, { useState, useEffect } from 'react';
import { Bell, Clock, AlertCircle, Info, Calendar } from 'lucide-react';
import api from '../../api/axios';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await api.get('/portal/announcements');
        if (res.data.success) {
          setAnnouncements(res.data.announcements);
        }
      } catch (err) {
        console.error('Error loading notices:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-navy-900 uppercase">Institutional Notice Board</h1>
        <p className="text-xs text-slate-500 mt-1">
          Official exam alerts, batch notifications, holiday schedules, and university announcements.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-slate-500">Loading notices...</p>
        </div>
      ) : announcements.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-md mx-auto space-y-2">
          <Bell className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-navy-900">No Active Notices</h3>
          <p className="text-xs text-slate-500">There are no pending broadcast announcements at this moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((ann) => (
            <div
              key={ann._id}
              className={`p-6 rounded-2xl shadow-sm border space-y-3 ${
                ann.priority === 'Urgent'
                  ? 'bg-red-50/70 border-red-200'
                  : ann.priority === 'High'
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      ann.priority === 'Urgent'
                        ? 'bg-red-700 text-white'
                        : ann.priority === 'High'
                        ? 'bg-amber-500 text-navy-950 font-black'
                        : 'bg-navy-900 text-gold-400'
                    }`}
                  >
                    {ann.category}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Audience: {ann.audience}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {new Date(ann.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <h2 className="text-lg font-bold text-navy-900">{ann.title}</h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {ann.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
