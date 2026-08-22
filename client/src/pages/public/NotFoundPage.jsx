import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Home, ArrowLeft, BookOpen } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        <div className="w-16 h-16 rounded-2xl bg-navy-900 text-gold-400 flex items-center justify-center font-black text-2xl mx-auto border-2 border-gold-500 shadow-md">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-navy-900 uppercase">Page Not Found</h1>
          <p className="text-xs text-slate-500 font-serif italic">
            "Don't Sit Like a Rock, Work Like a Clock."
          </p>
          <p className="text-xs text-slate-600">
            The page you are looking for might have been moved or is currently unavailable.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-navy-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-navy-800 transition"
          >
            <Home className="w-3.5 h-3.5" /> Return Home
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-600 transition"
          >
            <BookOpen className="w-3.5 h-3.5" /> View Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
