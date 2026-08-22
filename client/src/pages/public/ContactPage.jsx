import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import api from '../../api/axios';

export default function ContactPage() {
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/admin/settings');
        if (res.data.success) {
          setSettings(res.data.settings);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMsg('Please fill in Name, Email, Phone, and Message.');
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('/admin/contact', formData);
      if (res.data.success) {
        setSuccessMsg(res.data.message || 'Thank you! Your message has been received.');
        setFormData({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
      } else {
        setErrorMsg(res.data.message || 'Failed to send message.');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="academic-gradient text-white py-16 px-4 pattern-grid">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" /> Institutional Helpdesk
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            CONTACT RATNAM COACHING CENTRE
          </h1>
          <p className="text-gold-400 font-serif italic text-base sm:text-lg">
            "Don't Sit Like a Rock, Work Like a Clock."
          </p>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Reach out for course admissions, school tuitions, distance education counseling, or certificate retrieval guidance in Bhimavaram.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Info + Enquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
              <div>
                <span className="text-[10px] text-gold-600 font-black uppercase tracking-wider block mb-1">
                  Head Office Location
                </span>
                <h3 className="text-xl font-bold text-navy-900">
                  RATNAM COACHING CENTRE
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Established in 1998 • Bhimavaram</p>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy-900 block mb-0.5">Campus Address:</span>
                    <span>
                      {settings?.address || 'Main Road, Bhimavaram, West Godavari District, Andhra Pradesh - 534201, India'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Phone className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy-900 block mb-0.5">Contact Phone:</span>
                    <span className="text-slate-800 font-mono">
                      {settings?.primaryPhone || 'Contact details will be updated soon'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Mail className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy-900 block mb-0.5">Official Email:</span>
                    <span className="text-slate-800">
                      {settings?.email || 'contact@ratnamcoaching.com'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Clock className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy-900 block mb-0.5">Office Working Hours:</span>
                    <span>
                      {settings?.officeHours ||
                        'Monday – Saturday: 7:00 AM – 8:30 PM | Sunday: 8:00 AM – 1:00 PM'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div className="p-4 bg-navy-900 text-white rounded-xl text-xs space-y-1">
              <span className="font-bold text-gold-400 block uppercase">Directorate Notice:</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Parents and candidates are welcome to visit our counseling desk during office hours for free curriculum briefing and batch selection advice.
              </p>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200">
            <div className="border-b border-slate-100 pb-3 mb-6">
              <h3 className="text-lg font-bold text-navy-900 uppercase">
                Send Us An Educational Enquiry
              </h3>
              <p className="text-xs text-slate-500">
                Submit your query and our academic counselor will respond promptly.
              </p>
            </div>

            {successMsg && (
              <div className="p-4 mb-5 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-300">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 mb-5 bg-red-50 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Mobile Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Topic of Interest</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900 bg-white"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Competitive Exam Coaching">Competitive Exam Coaching</option>
                    <option value="School Daily Tuitions (Classes 1-10)">School Daily Tuitions (Classes 1-10)</option>
                    <option value="Andhra University Distance Education">Andhra University Distance Education</option>
                    <option value="Certificate Assistance Request">Certificate Assistance Request</option>
                    <option value="Fee Structure & Installments">Fee Structure & Installments</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Your Message / Query *</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  placeholder="How can we assist your educational preparation?"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-gold-500 hover:bg-gold-600 disabled:bg-slate-300 text-navy-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SEND MESSAGE TO BHIMAVARAM OFFICE</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
