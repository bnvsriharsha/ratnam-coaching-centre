import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  Lock,
  Mail,
  LogIn,
  AlertCircle,
  Clock,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password, 'admin');
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail('admin@ratnamcoaching.com');
    setPassword('RatnamAdmin@1998');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-950 text-slate-100">
      <div className="max-w-md w-full bg-slate-900 rounded-2xl shadow-2xl border border-navy-800 p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-xl bg-amber-500 text-navy-950 flex items-center justify-center mx-auto shadow-lg">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black text-white uppercase tracking-wider">
            Administrative Desk Login
          </h1>
          <p className="text-[11px] text-amber-400 font-mono font-semibold">
            Ratnam Coaching Centre • Directorate Control
          </p>
        </div>

        {/* Demo Admin Auto-fill Card */}
        <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs flex items-center justify-between">
          <div>
            <span className="font-bold text-amber-400 block">Development Admin Access</span>
            <span className="text-[10px] text-slate-400">Default directorate credentials</span>
          </div>
          <button
            type="button"
            onClick={handleFillDemoAdmin}
            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold rounded text-[10px] uppercase transition"
          >
            Auto Fill
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-950/60 text-red-300 rounded-lg text-xs font-semibold flex items-center gap-2 border border-red-800/50">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-300">Admin Clearance Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="admin@ratnamcoaching.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-300">Security Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 text-navy-950 font-black text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Verifying Clearance...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>SIGN IN TO ADMINISTRATIVE CONSOLE</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          Return to{' '}
          <Link to="/" className="font-bold text-amber-400 hover:underline">
            Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
