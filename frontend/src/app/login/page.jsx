'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData.name, formData.email, formData.password);
    }

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || result.errors?.[0]?.msg || 'Authentication failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-8 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#e8532a] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h2 className="font-syne text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
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
                className="w-full text-sm px-4 py-2.5 border border-black/20 rounded-xl focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10 outline-none"
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
              className="w-full text-sm px-4 py-2.5 border border-black/20 rounded-xl focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10 outline-none"
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
              className="w-full text-sm px-4 py-2.5 border border-black/20 rounded-xl focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10 outline-none"
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
            className="w-full bg-[#e8532a] text-white font-medium py-2.5 rounded-xl hover:bg-[#d44420] transition-all disabled:opacity-70"
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
            className="text-sm text-[#e8532a] hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-black/10">
          <p className="text-xs text-[#888896] text-center">
            Demo account: demo@tradecraft.com / password123
          </p>
        </div>
      </div>
    </div>
  );
}