import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Bell, X, AlertCircle } from 'lucide-react';
import api from '../api/axios';

export default function PublicLayout() {
  const [announcements, setAnnouncements] = useState([]);
  const [dismissNotice, setDismissNotice] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await api.get('/portal/announcements?audience=All');
        if (res.data.success && res.data.announcements.length > 0) {
          setAnnouncements(res.data.announcements);
        }
      } catch (err) {
        // Silently handle if backend is still initializing
      }
    };
    fetchAnnouncements();
  }, []);

  const urgentNotice = announcements.find((a) => a.priority === 'High' || a.priority === 'Urgent') || announcements[0];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Announcement Broadcast Bar */}
      {urgentNotice && !dismissNotice && (
        <div className="bg-amber-500 text-navy-950 text-xs font-bold py-1.5 px-4 flex items-center justify-between border-b border-amber-600 shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-center overflow-hidden">
            <span className="bg-navy-950 text-gold-400 uppercase text-[10px] px-2 py-0.5 rounded font-black shrink-0 flex items-center gap-1">
              <Bell className="w-3 h-3 animate-pulse" /> NOTICE
            </span>
            <span className="truncate font-semibold">{urgentNotice.title}:</span>
            <span className="truncate font-normal hidden sm:inline">{urgentNotice.content}</span>
          </div>
          <button
            onClick={() => setDismissNotice(true)}
            className="text-navy-950/70 hover:text-navy-950 p-0.5 shrink-0"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}
