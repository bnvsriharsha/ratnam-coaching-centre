import React, { useState, useEffect } from 'react';
import { Settings, Save, Clock, Building2, ShieldCheck, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import api from '../../api/axios';

export default function AdminSiteSettings() {
  const [settings, setSettings] = useState({
    instituteName: 'RATNAM COACHING CENTRE',
    establishedYear: 1998,
    primaryTagline: "Don't Sit Like a Rock, Work Like a Clock.",
    secondaryTagline: 'Building Careers Through Quality Education Since 1998.',
    primaryPhone: 'Contact details will be updated soon',
    secondaryPhone: '',
    email: 'contact@ratnamcoaching.com',
    address: 'Main Road, Bhimavaram, West Godavari District, Andhra Pradesh - 534201, India',
    officeHours: 'Monday – Saturday: 7:00 AM – 8:30 PM | Sunday: 8:00 AM – 1:00 PM',
    govtRegistrationNote: 'Registered educational institute under the Government of Andhra Pradesh.',
    timeline: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [newTimeline, setNewTimeline] = useState({ year: '', title: '', description: '' });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/settings');
      if (res.data.success) {
        setSettings(res.data.settings);
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    try {
      const res = await api.put('/admin/settings', settings);
      if (res.data.success) {
        setSettings(res.data.settings);
        setSuccessMsg('Institutional settings updated successfully!');
      }
    } catch (err) {
      alert('Error updating settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddTimelineMilestone = () => {
    if (!newTimeline.year || !newTimeline.title || !newTimeline.description) {
      alert('Please fill Year, Title, and Description for the milestone.');
      return;
    }
    const updated = [...(settings.timeline || []), newTimeline];
    setSettings({ ...settings, timeline: updated });
    setNewTimeline({ year: '', title: '', description: '' });
  };

  const handleDeleteTimelineMilestone = (index) => {
    const updated = settings.timeline.filter((_, idx) => idx !== index);
    setSettings({ ...settings, timeline: updated });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-white uppercase">15. Site Configuration & Institutional History</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure verified contact details, office timings, statutory registration text, taglines, and the 1998+ institutional timeline.
        </p>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-950/60 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-800/50">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Brand & Taglines */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" /> Institute Identity & Taglines
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Institute Name</label>
              <input
                type="text"
                name="instituteName"
                value={settings.instituteName}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white font-bold"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Established Year</label>
              <input
                type="number"
                name="establishedYear"
                value={settings.establishedYear}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white font-mono"
              />
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Primary Tagline (Displayed in Hero & Motto)</label>
              <input
                type="text"
                name="primaryTagline"
                value={settings.primaryTagline}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white font-serif italic"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Secondary Tagline</label>
              <input
                type="text"
                name="secondaryTagline"
                value={settings.secondaryTagline}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
              />
            </div>
          </div>
        </div>

        {/* Bhimavaram Contact Information */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" /> Bhimavaram Office Contact Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Primary Phone Number</label>
              <input
                type="text"
                name="primaryPhone"
                value={settings.primaryPhone}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Official Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
              />
            </div>
          </div>

          <div className="text-xs space-y-3">
            <div>
              <label className="text-slate-400 block mb-1">Campus Physical Address</label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Office Hours</label>
              <input
                type="text"
                name="officeHours"
                value={settings.officeHours}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
              />
            </div>
          </div>
        </div>

        {/* Regulatory & Institutional Registration */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Government Registration & Disclaimers
          </h2>

          <div className="text-xs space-y-3">
            <div>
              <label className="text-slate-400 block mb-1">AP Government Registration Note</label>
              <textarea
                rows="2"
                name="govtRegistrationNote"
                value={settings.govtRegistrationNote}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-white"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" /> Institutional Milestones Timeline
          </h2>

          <div className="space-y-3">
            {settings.timeline?.map((item, index) => (
              <div
                key={index}
                className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-mono font-bold text-amber-400 mr-2">{item.year}:</span>
                  <strong className="text-white">{item.title}</strong>
                  <p className="text-slate-400 mt-1">{item.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteTimelineMilestone(index)}
                  className="p-1 text-red-400 hover:bg-red-950/60 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Milestone */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-700/80 space-y-3 text-xs">
            <span className="font-bold text-slate-300 block">Add Milestone to Timeline</span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Year (e.g. 2027)"
                  value={newTimeline.year}
                  onChange={(e) => setNewTimeline({ ...newTimeline, year: e.target.value })}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Milestone Title"
                  value={newTimeline.title}
                  onChange={(e) => setNewTimeline({ ...newTimeline, title: e.target.value })}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white"
                />
              </div>
            </div>
            <textarea
              rows="2"
              placeholder="Milestone Description..."
              value={newTimeline.description}
              onChange={(e) => setNewTimeline({ ...newTimeline, description: e.target.value })}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white"
            ></textarea>
            <button
              type="button"
              onClick={handleAddTimelineMilestone}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs"
            >
              + Append Milestone
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 text-navy-950 font-black text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving System Settings...' : 'SAVE ALL INSTITUTIONAL CONFIGURATIONS'}</span>
        </button>
      </form>
    </div>
  );
}
