import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  User,
  Lock,
  LogIn,
  AlertCircle,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function StudentLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/student';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password, 'student');
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  const handleFillDemoStudent = () => {
    setEmail('student@ratnamcoaching.com');
    setPassword('StudentPass@1998');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-navy-900 border-2 border-gold-500 flex items-center justify-center text-white mx-auto shadow-md">
            <span className="font-black text-gold-400 text-base">RCC</span>
          </div>
          <h1 className="text-2xl font-black text-navy-900 uppercase tracking-wide">
            Student Portal Login
          </h1>
          <p className="text-xs text-slate-500 font-serif italic">
            "Don't Sit Like a Rock, Work Like a Clock."
          </p>
        </div>

        {/* Demo Helper Button */}
        <div className="p-3 bg-navy-50 rounded-xl border border-navy-100 text-xs flex items-center justify-between">
          <div>
            <span className="font-bold text-navy-900 block">Try Demo Student Account?</span>
            <span className="text-[11px] text-slate-500">Auto-fill student credentials</span>
          </div>
          <button
            type="button"
            onClick={handleFillDemoStudent}
            className="px-2.5 py-1 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold rounded text-[11px] uppercase transition"
          >
            Auto Fill
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Registered Email Address</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 disabled:bg-slate-300 text-navy-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>SIGN IN TO STUDENT PORTAL</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center space-y-2 text-xs">
          <p className="text-slate-600">
            Don't have a student account?{' '}
            <Link to="/student/register" className="font-bold text-navy-900 hover:text-gold-600 transition">
              Register here
            </Link>
          </p>
          <p className="text-slate-400">
            Are you an administrator?{' '}
            <Link to="/admin/login" className="font-semibold text-slate-700 hover:text-navy-900 transition">
              Admin Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
