import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileCheck,
  ShieldCheck,
  Info,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import api from '../../api/axios';

export default function CertificateAssistancePage() {
  const [formData, setFormData] = useState({
    studentName: '',
    mobile: '',
    email: '',
    university: 'Andhra University',
    college: '',
    course: '',
    graduationYear: '',
    hallTicketNumber: '',
    certificateRequired: 'Degree Certificate (Original / Convocation)',
    additionalDetails: '',
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const certificateTypes = [
    'Degree Certificate (Original / Convocation)',
    'Provisional Certificate (PC)',
    'Consolidated Marks Memo (CMM)',
    'Semester-wise Marks Memos',
    'Transfer Certificate (TC)',
    'Migration Certificate',
    'Study & Conduct Certificate',
    'Duplicate Certificate Assistance',
    'Other Educational Document Assistance',
  ];

  const universities = [
    'Andhra University, Visakhapatnam',
    'Acharya Nagarjuna University, Guntur',
    'Adikavi Nannaya University, Rajahmundry',
    'Sri Venkateswara University, Tirupati',
    'Krishna University, Machilipatnam',
    'Dr. B.R. Ambedkar Open University',
    'Other Recognized University / Board',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessData(null);

    // Validation
    if (!formData.studentName || !formData.mobile || !formData.email || !formData.college || !formData.course || !formData.graduationYear) {
      setErrorMsg('Please fill in all mandatory fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('/certificates', formData);
      if (res.data.success) {
        setSuccessData(res.data);
      } else {
        setErrorMsg(res.data.message || 'Submission failed.');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Error submitting application. Please check your connection.');
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
            <FileCheck className="w-3.5 h-3.5" /> Student Support & Guidance Wing
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            CERTIFICATE ASSISTANCE CELL
          </h1>
          <p className="text-gold-400 font-serif italic text-base sm:text-lg">
            "Don't Sit Like a Rock, Work Like a Clock."
          </p>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Helping past students and graduates retrieve, apply for, and track pending university degree certificates, provisional memos, migration documents, and academic records.
          </p>
        </div>
      </section>

      {/* Mandatory Disclaimer Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 bg-amber-50 rounded-2xl border-2 border-amber-300 text-navy-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
            <Info className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Institutional Scope & Legal Transparency</span>
          </div>
          <p className="text-xs text-amber-950 leading-relaxed">
            <strong>Ratnam Coaching Centre does NOT print, fabricate, or issue university/government certificates.</strong> We provide administrative guidance, application form filling assistance, university liaison follow-up, and institutional procedural navigation for authentic documents issued exclusively by the respective statutory universities and state education boards.
          </p>
        </div>
      </section>

      {/* Content + Application Form Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Info Guide */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-gold-600" /> When Do You Need Certificate Assistance?
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Forgot to collect your Original Degree Certificate (OD / Convocation) after graduating years ago.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Require a Provisional Certificate (PC) or Consolidated Marks Memo (CMM) for urgent job or visa verification.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Need Migration Certificate or Transfer Certificate (TC) for higher study admissions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Lost mark memos and need guidance applying for official Duplicate Memos from the university.</span>
                </li>
              </ul>
            </div>

            {/* Tracking Link Card */}
            <div className="bg-navy-900 text-white p-6 rounded-2xl border border-navy-800 space-y-3">
              <h3 className="text-base font-bold text-white">Already Submitted a Request?</h3>
              <p className="text-xs text-slate-300">
                Track your active certificate assistance application in real time using your Application ID and registered mobile number.
              </p>
              <Link
                to="/certificate-tracking"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider transition"
              >
                <span>Track Request Status</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200">
            {successData ? (
              <div className="text-center py-8 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-navy-900">
                  Request Submitted Successfully!
                </h3>
                <div className="p-4 bg-navy-50 rounded-xl border border-navy-200 max-w-md mx-auto space-y-2">
                  <span className="text-xs text-slate-500 uppercase font-bold">Your Unique Application ID:</span>
                  <div className="text-2xl font-mono font-black text-navy-900 tracking-wider">
                    {successData.applicationId}
                  </div>
                  <p className="text-xs text-slate-600">
                    Please save this ID along with your mobile number to track the real-time processing status of your certificate request.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <Link
                    to={`/certificate-tracking?id=${successData.applicationId}&mobile=${formData.mobile}`}
                    className="px-6 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider transition"
                  >
                    Track Application Status
                  </Link>
                  <button
                    onClick={() => {
                      setSuccessData(null);
                      setFormData({
                        studentName: '',
                        mobile: '',
                        email: '',
                        university: 'Andhra University',
                        college: '',
                        course: '',
                        graduationYear: '',
                        hallTicketNumber: '',
                        certificateRequired: 'Degree Certificate (Original / Convocation)',
                        additionalDetails: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-navy-900 uppercase">
                    Certificate Assistance Application Form
                  </h3>
                  <p className="text-xs text-slate-500">
                    Provide accurate academic and candidate information to facilitate institutional guidance.
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
                      placeholder="e.g. K. Sai Krishna"
                      value={formData.studentName}
                      onChange={handleChange}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  {/* Mobile Number */}
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

                  {/* Graduation Year */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Year of Graduation / Passing *</label>
                    <input
                      type="text"
                      name="graduationYear"
                      required
                      placeholder="e.g. 2022"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  {/* University */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">University / Board *</label>
                    <select
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900 bg-white"
                    >
                      {universities.map((u, i) => (
                        <option key={i} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>

                  {/* College Name */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">College / Study Center Name *</label>
                    <input
                      type="text"
                      name="college"
                      required
                      placeholder="e.g. DNR College, Bhimavaram"
                      value={formData.college}
                      onChange={handleChange}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  {/* Course Name */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Course / Degree Pursued *</label>
                    <input
                      type="text"
                      name="course"
                      required
                      placeholder="e.g. B.Sc. (MPC) / B.Com / M.A. English"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>

                  {/* Hall Ticket Number */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Hall Ticket / Registration Number</label>
                    <input
                      type="text"
                      name="hallTicketNumber"
                      placeholder="e.g. 1092083421 (if remembered)"
                      value={formData.hallTicketNumber}
                      onChange={handleChange}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                    />
                  </div>
                </div>

                {/* Certificate Required Dropdown */}
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-700">Certificate Assistance Required *</label>
                  <select
                    name="certificateRequired"
                    value={formData.certificateRequired}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900 bg-white"
                  >
                    {certificateTypes.map((c, idx) => (
                      <option key={idx} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Additional Details */}
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-700">Additional Details / Requirements</label>
                  <textarea
                    name="additionalDetails"
                    rows="3"
                    placeholder="Provide any specific context (e.g. urgency for higher studies admission, visa processing, lost memos, etc.)"
                    value={formData.additionalDetails}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gold-500 hover:bg-gold-600 disabled:bg-slate-300 text-navy-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Processing Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>REQUEST CERTIFICATE ASSISTANCE</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
