import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Sparkles,
  Building2,
  CheckCircle2,
  Send,
  AlertCircle,
  Clock,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import api from '../../api/axios';

export default function AdmissionsPage() {
  const location = useLocation();
  const initialCourse = location.state?.courseInterest || '';
  const initialClass = location.state?.schoolClass || '';
  const initialDistance = location.state?.distanceProgram || '';

  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    mobile: '',
    email: '',
    dob: '',
    gender: 'Male',
    address: '',
    qualification: '',
    courseInterested: initialCourse || 'SSC CGL (Combined Graduate Level)',
    examInterested: '',
    preferredBatch: 'Morning',
    mode: 'Classroom',
    message: '',
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchCoursesList = async () => {
      try {
        const res = await api.get('/courses');
        if (res.data.success) {
          setCourses(res.data.courses);
        }
      } catch (err) {
        console.error('Error loading course dropdown:', err);
      }
    };
    fetchCoursesList();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessData(null);

    if (
      !formData.studentName ||
      !formData.parentName ||
      !formData.mobile ||
      !formData.email ||
      !formData.address ||
      !formData.qualification ||
      !formData.courseInterested
    ) {
      setErrorMsg('Please fill in all mandatory fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('/admissions', formData);
      if (res.data.success) {
        setSuccessData(res.data);
      } else {
        setErrorMsg(res.data.message || 'Submission failed');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Error submitting application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="academic-gradient text-white py-16 px-4 pattern-grid">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Admissions 2026
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            ONLINE ADMISSION ENROLLMENT
          </h1>
          <p className="text-gold-400 font-serif italic text-base sm:text-lg">
            "Don't Sit Like a Rock, Work Like a Clock."
          </p>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Apply online for Competitive Exam Coaching (SSC, Banking, Railways, RBI), School Daily Tuitions (Classes 1–10), and Andhra University Distance Education support.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-200">
          {successData ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-500">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-navy-900">
                Admission Application Submitted!
              </h2>
              <div className="p-5 bg-navy-50 rounded-2xl border border-navy-200 max-w-md mx-auto space-y-2">
                <span className="text-xs text-slate-500 uppercase font-bold">Your Unique Application ID:</span>
                <div className="text-2xl font-mono font-black text-navy-900 tracking-wider">
                  {successData.applicationId}
                </div>
                <p className="text-xs text-slate-600">
                  Our admissions counselor will review your application and contact you at <strong>{formData.mobile}</strong>.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link
                  to={`/certificate-tracking?id=${successData.applicationId}&mobile=${formData.mobile}`}
                  className="px-6 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider transition"
                >
                  Track Application Status
                </Link>
                <Link
                  to="/student/login"
                  className="px-6 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  Student Portal Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-navy-900 uppercase">
                  Candidate & Course Enrollment Information
                </h2>
                <p className="text-xs text-slate-500">
                  Please ensure all contact details are accurate to receive your batch allotment and orientation schedule.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Student Name */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Full Name of Student *</label>
                  <input
                    type="text"
                    name="studentName"
                    required
                    placeholder="Candidate's full name"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                {/* Parent Name */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    placeholder="Father / Mother / Guardian"
                    value={formData.parentName}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                {/* Mobile */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900 bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Current Qualification */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700">Current Academic Qualification *</label>
                  <input
                    type="text"
                    name="qualification"
                    required
                    placeholder="e.g. 10th Class / Intermediate (10+2) / B.Sc. / B.Com / B.Tech / M.A."
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                {/* Course Interested */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700">Course / Program Interested In *</label>
                  <select
                    name="courseInterested"
                    value={formData.courseInterested}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900 bg-white"
                  >
                    <optgroup label="Competitive Examination Coaching">
                      {courses.map((c) => (
                        <option key={c._id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                      <option value="SSC CGL (Combined Graduate Level)">SSC CGL (Combined Graduate Level)</option>
                      <option value="SSC CHSL (10+2)">SSC CHSL (10+2)</option>
                      <option value="IBPS PO Banking Coaching">IBPS PO Banking Coaching</option>
                      <option value="SBI PO Banking Coaching">SBI PO Banking Coaching</option>
                      <option value="RRB NTPC Railways Coaching">RRB NTPC Railways Coaching</option>
                      <option value="RBI Grade B Officer Preparation">RBI Grade B Officer Preparation</option>
                    </optgroup>
                    <optgroup label="School Daily Tuitions (Classes 1-10)">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((g) => (
                        <option key={g} value={`School Tuition - Class ${g}`}>
                          School Tuition - Class {g}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Andhra University Distance Education">
                      <option value="Distance Education - Bachelor of Arts (B.A.)">Distance Education - B.A.</option>
                      <option value="Distance Education - Bachelor of Commerce (B.Com)">Distance Education - B.Com</option>
                      <option value="Distance Education - Bachelor of Science (B.Sc.)">Distance Education - B.Sc.</option>
                      <option value="Distance Education - Master of Arts (M.A.)">Distance Education - M.A.</option>
                      <option value="Distance Education - Master of Commerce (M.Com)">Distance Education - M.Com</option>
                    </optgroup>
                  </select>
                </div>

                {/* Preferred Batch Timing */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Preferred Batch Timing</label>
                  <select
                    name="preferredBatch"
                    value={formData.preferredBatch}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900 bg-white"
                  >
                    <option value="Morning (7:00 AM - 10:00 AM)">Morning (7:00 AM – 10:00 AM)</option>
                    <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM – 8:00 PM)</option>
                    <option value="School Tuition (5:00 PM - 7:30 PM)">School Tuition (5:00 PM – 7:30 PM)</option>
                    <option value="Weekend Special">Weekend Special</option>
                  </select>
                </div>

                {/* Learning Mode */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Learning Mode</label>
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900 bg-white"
                  >
                    <option value="Classroom">Classroom (Bhimavaram Center)</option>
                    <option value="Online">Online Live Classes</option>
                    <option value="Hybrid">Hybrid (Classroom + Online)</option>
                  </select>
                </div>

                {/* Residential Address */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700">Residential Address *</label>
                  <textarea
                    name="address"
                    required
                    rows="2"
                    placeholder="House/Door No, Street, Village/Town, District, Pincode"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  ></textarea>
                </div>

                {/* Candidate Message */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700">Message / Any Specific Guidance Required</label>
                  <textarea
                    name="message"
                    rows="2"
                    placeholder="Let us know your target exam, previous attempts, or specific learning needs."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-gold-500 hover:bg-gold-600 disabled:bg-slate-300 text-navy-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SUBMIT ADMISSION APPLICATION</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
