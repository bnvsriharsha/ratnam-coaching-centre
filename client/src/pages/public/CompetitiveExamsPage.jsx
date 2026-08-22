import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Calendar,
  Layers,
} from 'lucide-react';
import api from '../../api/axios';

export default function CompetitiveExamsPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'All';
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'SSC', 'Banking', 'Railways', 'RBI', 'Other Competitive'];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        let url = '/courses';
        const params = new URLSearchParams();
        if (selectedCategory !== 'All') params.append('category', selectedCategory);
        if (searchTerm) params.append('search', searchTerm);

        const res = await api.get(`${url}?${params.toString()}`);
        if (res.data.success) {
          setCourses(res.data.courses);
        }
      } catch (err) {
        console.error('Error loading courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedCategory, searchTerm]);

  const handleCategorySelect = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="academic-gradient text-white py-16 px-4 pattern-grid">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" /> Structured Academic Curriculum
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            Competitive Examination Coaching
          </h1>
          <p className="text-gold-400 font-serif italic text-base sm:text-lg">
            "Don't Sit Like a Rock, Work Like a Clock."
          </p>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            In-depth classroom and hybrid coaching for SSC CGL, SSC CHSL, IBPS PO, SBI PO, RRB NTPC, and RBI Grade B examinations in Bhimavaram.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-navy-900 text-gold-400 shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search course or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-navy-900"
            />
          </div>
        </div>
      </section>

      {/* Courses List Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-lg mx-auto space-y-3">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-navy-900">No Courses Found</h3>
            <p className="text-xs text-slate-500">
              No active courses match your current search filter. Please choose another category or contact the office.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-md border border-slate-200 hover:border-gold-500 hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Top Bar with Category & Admission status */}
                  <div className="bg-navy-900 p-4 text-white flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-gold-500 text-navy-950 text-[10px] font-black uppercase tracking-wider">
                      {course.category}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      {course.admissionStatus}
                    </span>
                  </div>

                  {/* Course Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-navy-900 group-hover:text-gold-700 transition leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {course.shortDescription}
                    </p>

                    {/* Key Attributes */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Eligibility:</span>
                        <span className="font-semibold text-slate-800 text-right truncate max-w-[180px]">{course.eligibility}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Duration:</span>
                        <span className="font-semibold text-slate-800">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Timings:</span>
                        <span className="font-semibold text-slate-800 truncate max-w-[180px]">{course.batchTiming}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Mode:</span>
                        <span className="font-semibold text-slate-800">{course.mode}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Faculty:</span>
                        <span className="font-semibold text-slate-800 truncate max-w-[180px]">{course.facultyName}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-200 pt-2 mt-2">
                        <span className="text-navy-900 font-bold">Fee Structure:</span>
                        <span className="font-black text-navy-950 text-sm">
                          {course.feeAmount ? `₹${course.feeAmount.toLocaleString('en-IN')}` : 'Contact Office'}
                        </span>
                      </div>
                    </div>

                    {/* Subjects Tag List */}
                    {course.subjects && course.subjects.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                          Subjects Covered:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {course.subjects.slice(0, 3).map((sub, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium border border-slate-200"
                            >
                              {sub}
                            </span>
                          ))}
                          {course.subjects.length > 3 && (
                            <span className="text-[10px] bg-gold-50 text-gold-700 px-1.5 py-0.5 rounded font-bold">
                              +{course.subjects.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <Link
                    to={`/courses/${course.slug}`}
                    className="w-full py-2.5 px-3 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-center text-xs font-bold text-navy-900 transition"
                  >
                    View Details
                  </Link>
                  <Link
                    to="/admissions"
                    state={{ courseInterest: course.title }}
                    className="w-full py-2.5 px-3 rounded-lg bg-gold-500 hover:bg-gold-600 text-center text-xs font-bold text-navy-950 transition"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
