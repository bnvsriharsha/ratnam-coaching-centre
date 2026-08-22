import React, { useState, useEffect } from 'react';
import { FileText, Download, Search, Filter, BookOpen, Clock, AlertCircle } from 'lucide-react';
import api from '../../api/axios';

export default function StudyMaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Competitive Exams', 'School Tuitions', 'Distance Education'];

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      try {
        let url = '/portal/materials';
        const params = new URLSearchParams();
        if (category !== 'All') params.append('category', category);
        if (searchTerm) params.append('search', searchTerm);

        const res = await api.get(`${url}?${params.toString()}`);
        if (res.data.success) {
          setMaterials(res.data.materials);
        }
      } catch (err) {
        console.error('Error fetching materials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [category, searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-navy-900 uppercase">Study Materials & Notes Repository</h1>
        <p className="text-xs text-slate-500 mt-1">
          Download faculty notes, shortcut formula compendiums, previous year solved papers, and practice sets.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                category === cat ? 'bg-navy-900 text-gold-400' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search topic or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-navy-900"
          />
        </div>
      </div>

      {/* Materials List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-navy-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-slate-500">Loading resources...</p>
        </div>
      ) : materials.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-500">No study materials found for this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((m) => (
            <div
              key={m._id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-gold-500 transition space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-navy-900 text-gold-400 uppercase">
                    {m.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{m.fileSize}</span>
                </div>

                <h3 className="text-base font-bold text-navy-900">{m.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{m.description}</p>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Subject:</span>
                    <span className="font-bold text-slate-800">{m.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Faculty Wing:</span>
                    <span className="text-slate-700">{m.uploadedBy}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase">{m.fileType} Document</span>
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading "${m.title}" (${m.fileSize}). Please check your downloads folder.`);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs transition"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
