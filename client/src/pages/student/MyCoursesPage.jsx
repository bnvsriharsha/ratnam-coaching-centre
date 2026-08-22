import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, CheckCircle2, Award, Sparkles, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        if (res.data.success) {
          setCourses(res.data.courses);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-navy-900 uppercase">My Enrolled Programs & Schedule</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review your enrolled classes, weekly lecture timetables, and available institutional courses.
        </p>
      </div>

      {/* Active Enrolled Batch Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Current Program</span>
            <h2 className="text-xl font-bold text-navy-900">
              {user?.schoolClass ? `School Daily Tuition - ${user.schoolClass}` : user?.distanceProgram || 'SSC CGL / Banking PO Regular Batch'}
            </h2>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full text-xs font-bold">
            Active Batch
          </span>
        </div>

        {/* Weekly Timetable Schedule */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wide">Weekly Timetable</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-gold-600 font-bold block">Morning Batch</span>
              <p className="font-semibold text-navy-950">7:00 AM – 10:00 AM</p>
              <p className="text-slate-500 text-[11px]">Quantitative Aptitude & Reasoning Drills</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-navy-900 font-bold block">Evening Batch</span>
              <p className="font-semibold text-navy-950">5:00 PM – 8:00 PM</p>
              <p className="text-slate-500 text-[11px]">General Studies, English & Tuitions</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-emerald-700 font-bold block">Saturday Evaluation</span>
              <p className="font-semibold text-navy-950">9:00 AM – 12:00 PM</p>
              <p className="text-slate-500 text-[11px]">Full-length CBT Mock Test & Error Analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Institute Courses to explore */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-navy-900 uppercase">Available Academic Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.slice(0, 6).map((c) => (
            <div
              key={c._id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-navy-900 text-gold-400 uppercase">
                  {c.category}
                </span>
                <h3 className="text-base font-bold text-navy-900">{c.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{c.shortDescription}</p>
                <div className="text-[11px] text-slate-600 pt-2">
                  Duration: <strong>{c.duration}</strong>
                </div>
              </div>
              <div className="pt-4 mt-3 border-t border-slate-100">
                <Link
                  to={`/courses/${c.slug}`}
                  className="text-xs font-bold text-navy-900 hover:text-gold-600 flex items-center justify-between"
                >
                  <span>View Details</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
