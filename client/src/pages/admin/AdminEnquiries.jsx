import React, { useState, useEffect } from 'react';
import { Mail, Phone, Clock, CheckCircle2, Trash2, Edit } from 'lucide-react';
import api from '../../api/axios';

export default function AdminEnquiries() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/contact-messages');
      if (res.data.success) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUpdateStatus = async (status) => {
    try {
      await api.put(`/admin/contact-messages/${selectedMsg._id}`, {
        status,
        adminNotes: selectedMsg.adminNotes,
      });
      setSelectedMsg(null);
      fetchMessages();
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/admin/contact-messages/${id}`);
      fetchMessages();
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white uppercase">14. Contact Form Inquiries</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review incoming questions submitted via the public contact and information desks.
        </p>
      </div>

      {/* Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading enquiries...</div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No visitor inquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-700">
                <tr>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Visitor Name</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5">Topic / Message</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {messages.map((m) => (
                  <tr key={m._id} className="hover:bg-slate-750">
                    <td className="p-3.5 font-mono text-slate-400">
                      {new Date(m.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="p-3.5 font-bold text-white">{m.name}</td>
                    <td className="p-3.5">
                      <div>{m.phone}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{m.email}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-amber-400">{m.subject}</div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{m.message}</p>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          m.status === 'Unread'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : m.status === 'Contacted'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setSelectedMsg({ ...m })}
                        className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-amber-400 font-bold text-[11px]"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => handleDelete(m._id)}
                        className="p-1 rounded bg-red-950/60 hover:bg-red-900 text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white uppercase">
              Enquiry From: {selectedMsg.name}
            </h3>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 block">Mobile:</span>
                  <span className="font-bold text-white">{selectedMsg.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Email:</span>
                  <span className="font-mono text-slate-300">{selectedMsg.email}</span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 block">Topic:</span>
                <span className="font-bold text-amber-400">{selectedMsg.subject}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Message:</span>
                <p className="text-slate-200 whitespace-pre-line leading-relaxed italic bg-slate-900 p-2.5 rounded border border-slate-800">
                  "{selectedMsg.message}"
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <label className="text-slate-400 block">Admin Follow-up Notes</label>
              <input
                type="text"
                placeholder="e.g. Called and counseled on SSC CGL batch timings"
                value={selectedMsg.adminNotes || ''}
                onChange={(e) => setSelectedMsg({ ...selectedMsg, adminNotes: e.target.value })}
                className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white"
              />
            </div>

            <div className="pt-3 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedMsg(null)}
                className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 font-bold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus('Contacted')}
                className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
              >
                Mark Contacted
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus('Closed')}
                className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
