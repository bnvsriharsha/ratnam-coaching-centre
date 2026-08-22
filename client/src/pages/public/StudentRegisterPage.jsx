import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Phone,
  BookOpen,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  GraduationCap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function StudentRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    parentName: '',
    address: '',
    schoolClass: '',
    distanceProgram: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    if (result.success) {
      navigate('/student');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-100">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-navy-900 border-2 border-gold-500 flex items-center justify-center text-white mx-auto shadow-md">
            <span className="font-black text-gold-400 text-base">RCC</span>
          </div>
          <h1 className="text-2xl font-black text-navy-900 uppercase tracking-wide">
            Student Portal Registration
          </h1>
          <p className="text-xs text-slate-500 font-serif italic">
            "Don't Sit Like a Rock, Work Like a Clock."
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Student full name"
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
                placeholder="10-digit mobile"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>
          </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Password (Min 6 chars) *</label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Parent / Guardian Name</label>
              <input
                type="text"
                name="parentName"
                placeholder="Parent's name"
                value={formData.parentName}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Residential City / Village</label>
              <input
                type="text"
                name="address"
                placeholder="e.g. Bhimavaram, AP"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 disabled:bg-slate-300 text-navy-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>CREATE STUDENT ACCOUNT</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          Already registered?{' '}
          <Link to="/student/login" className="font-bold text-navy-900 hover:text-gold-600 transition">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
