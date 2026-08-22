import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  Users,
  FileText,
  Sparkles,
  HelpCircle,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import api from '../../api/axios';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/courses/${slug}`);
        if (res.data.success) {
          setCourse(res.data.course);
        } else {
          setError('Course not found');
        }
      } catch (err) {
        setError('Course details not available');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Loading course curriculum...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-4">
        <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-navy-900">Course Not Found</h2>
        <p className="text-xs text-slate-600">The requested course could not be located in our active programs directory.</p>
        <Link
          to="/courses"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="academic-gradient text-white py-16 px-4 pattern-grid">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-bold mb-4 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Competitive Courses
          </Link>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded bg-gold-500 text-navy-950 font-black text-xs uppercase tracking-wider">
                {course.category}
              </span>
              <span className="px-3 py-1 rounded bg-navy-800 text-emerald-400 font-bold text-xs border border-emerald-500/30">
                {course.admissionStatus}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              {course.title}
            </h1>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {course.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Course Details Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Course Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-navy-900 uppercase tracking-wide border-b border-slate-100 pb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gold-600" /> Course Overview
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {course.overview}
              </p>
            </div>

            {/* 2. Why Choose This Course */}
            {course.whyChoose && course.whyChoose.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h2 className="text-xl font-bold text-navy-900 uppercase tracking-wide border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold-600" /> Why Choose This Course at Ratnam
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                  {course.whyChoose.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 3. Subjects & Detailed Syllabus */}
            {course.subjects && course.subjects.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h2 className="text-xl font-bold text-navy-900 uppercase tracking-wide border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-gold-600" /> Subjects & Syllabus Covered
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.subjects.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-navy-50 border border-navy-100 text-navy-950 font-semibold text-xs flex items-center gap-2"
                    >
                      <span className="w-6 h-6 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Teaching Methodology & Classroom Structure */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-navy-900 uppercase tracking-wide border-b border-slate-100 pb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold-600" /> Teaching Methodology
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-navy-900 text-sm mb-1">Concept Mastery</h4>
                  <p className="text-slate-600">Fundamental building blocks with graded level difficulty exercises from Tier-I to Tier-II.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-navy-900 text-sm mb-1">Daily Speed Practice</h4>
                  <p className="text-slate-600">Mental math shortcuts, calculation tricks, and Vedic math techniques for timed examinations.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-navy-900 text-sm mb-1">Error Analysis</h4>
                  <p className="text-slate-600">Detailed question-by-question breakdown of weekly test papers to rectify recurring mistakes.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-navy-900 text-sm mb-1">Doubt Resolution</h4>
                  <p className="text-slate-600">Dedicated 1-on-1 mentorship desks every day after lecture hours.</p>
                </div>
              </div>
            </div>

            {/* 5. Study Materials & Mock Tests Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-navy-900 font-bold">
                  <FileText className="w-5 h-5 text-gold-600" />
                  <h3>Study Material</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {course.studyMaterialInfo ||
                    'Comprehensive printed booklets, chapter-wise solved question banks, and daily practice problem (DPP) sheets included.'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-navy-900 font-bold">
                  <Award className="w-5 h-5 text-gold-600" />
                  <h3>Mock Test Series</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {course.mockTestsInfo ||
                    'Weekly sectional tests and full-length computer-based test (CBT) simulations aligned with official examination patterns.'}
                </p>
              </div>
            </div>

            {/* 6. Admission Process */}
            <div className="bg-navy-50 p-6 sm:p-8 rounded-2xl border border-navy-200 space-y-3">
              <h3 className="text-base font-bold text-navy-900 uppercase">Admission Process</h3>
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700">
                <li>Submit online admission application or visit the Bhimavaram campus desk.</li>
                <li>Receive application confirmation ID and counselor verification.</li>
                <li>Complete admission formalities and collect study materials kit.</li>
                <li>Join regular batch according to your allotted schedule.</li>
              </ol>
            </div>
          </div>

          {/* Sidebar Key Info & Application Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gold-500 sticky top-24 space-y-6">
              <div className="space-y-1 text-center border-b border-slate-100 pb-4">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Course Fee Details
                </span>
                <div className="text-3xl font-black text-navy-900">
                  {course.feeAmount ? `₹${course.feeAmount.toLocaleString('en-IN')}` : 'Contact Office'}
                </div>
                <p className="text-[11px] text-slate-500">{course.feeDetails}</p>
              </div>

              {/* Attributes List */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Eligibility:</span>
                  <span className="font-semibold text-slate-800 text-right">{course.eligibility}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-semibold text-slate-800">{course.duration}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Batch Timings:</span>
                  <span className="font-semibold text-slate-800 text-right">{course.batchTiming}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Learning Mode:</span>
                  <span className="font-semibold text-slate-800">{course.mode}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Batch Start:</span>
                  <span className="font-semibold text-slate-800">{course.startDate}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Faculty:</span>
                  <span className="font-semibold text-slate-800">{course.facultyName}</span>
                </div>
              </div>

              {/* Big CTA */}
              <div className="space-y-3 pt-2">
                <Link
                  to="/admissions"
                  state={{ courseInterest: course.title }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-black text-xs uppercase tracking-wider text-center block shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
                >
                  APPLY FOR THIS COURSE
                </Link>
                <Link
                  to="/contact"
                  className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider text-center block transition"
                >
                  Enquire at Office
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="p-3 rounded-lg bg-navy-50 text-[11px] text-slate-600 text-center flex items-center justify-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Estd. 1998 • Bhimavaram, Andhra Pradesh</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
