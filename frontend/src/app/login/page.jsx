// app/login/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login, register } = useAuth();
  const router = useRouter();

  // If already logged in, redirect to home
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      if (!formData.name) {
        setError('Name is required');
        setLoading(false);
        return;
      }
      result = await register(formData.name, formData.email, formData.password);
    }

    if (result.success) {
      router.push('/');
    } else {
      if (result.errors) {
        setError(result.errors.map(err => err.msg).join(', '));
      } else {
        setError(result.error || 'Authentication failed');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-8 py-12 bg-linear-to-br from-[#1a1a2e] to-[#2a2a4e]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#e8532a] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="font-syne text-3xl font-extrabold text-[#1a1a2e]">TradeCraft</h1>
          <p className="text-[#555560] text-sm mt-2">Find trusted tradespeople near you</p>
        </div>

        <div className="text-center mb-6">
          <h2 className="font-syne text-xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-[#555560] text-sm mt-1">
            {isLogin ? 'Sign in to post and manage jobs' : 'Join TradeCraft to start posting jobs'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full text-sm px-4 py-2.5 border border-black/20 rounded-xl focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10 outline-none transition-all"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full text-sm px-4 py-2.5 border border-black/20 rounded-xl focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10 outline-none transition-all"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full text-sm px-4 py-2.5 border border-black/20 rounded-xl focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10 outline-none transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
            />
            {!isLogin && (
              <p className="text-xs text-[#888896] mt-1">Password must be at least 6 characters</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e8532a] text-white font-semibold py-3 rounded-xl hover:bg-[#d44420] transition-all disabled:opacity-70 shadow-md"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ name: '', email: '', password: '' });
            }}
            className="text-sm text-[#e8532a] hover:underline font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 pt-4 border-t border-black/10">
          <p className="text-xs text-[#888896] text-center mb-2">Demo Account:</p>
          <div className="text-xs text-center space-y-1">
            <p className="text-[#555560]">Email: <span className="font-mono">demo@tradecraft.com</span></p>
            <p className="text-[#555560]">Password: <span className="font-mono">password123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}