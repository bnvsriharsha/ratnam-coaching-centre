import React, { useState } from 'react';
import { User, Mail, Phone, Lock, CheckCircle2, AlertCircle, Save, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

export default function StudentProfilePage() {
  const { user, updateUserProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    parentName: user?.parentName || '',
    address: user?.address || '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        parentName: formData.parentName,
        address: formData.address,
      };
      if (formData.password) payload.password = formData.password;

      const res = await api.put('/auth/profile', payload);
      if (res.data.success) {
        updateUserProfile(res.data.user);
        setSuccessMsg('Profile information updated successfully!');
        setFormData({ ...formData, password: '', confirmPassword: '' });
      } else {
        setErrorMsg(res.data.message || 'Update failed');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-navy-900 uppercase">My Student Profile</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your personal details, guardian contact info, and security credentials.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        {/* Top summary badge */}
        <div className="flex items-center space-x-4 p-4 bg-navy-50 rounded-xl border border-navy-100">
          <div className="w-12 h-12 rounded-full bg-navy-900 text-gold-400 font-black text-lg flex items-center justify-center">
            {user?.name?.charAt(0) || 'S'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-navy-900">{user?.name}</h2>
            <p className="text-xs text-slate-500 font-mono">Student ID: {user?.studentId || 'RCC-STU-ACTIVE'}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>

        {successMsg && (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Mobile Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
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
                value={formData.parentName}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Residential City / Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-navy-900 uppercase">Change Security Password (Optional)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">New Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Leave blank to keep unchanged"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gold-500 hover:bg-gold-600 disabled:bg-slate-300 text-navy-950 font-black text-xs uppercase tracking-wider shadow transition flex items-center justify-center gap-2"
          >
            {loading ? <span>Saving Changes...</span> : <><Save className="w-4 h-4" /> <span>SAVE PROFILE CHANGES</span></>}
          </button>
        </form>
      </div>
    </div>
  );
}
