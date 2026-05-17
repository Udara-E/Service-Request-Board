'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();

  const [isLogin, setIsLogin]   = useState(true);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const set = (key) => (e) => setFormData(p => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = isLogin
      ? await login(formData.email, formData.password)
      : await register(formData.name, formData.email, formData.password);
    if (result.success) router.push('/');
    else setError(result.error);
    setLoading(false);
  };

  const toggle = () => { setIsLogin(p => !p); setError(''); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .auth-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          background: #f5f8ff;
        }

        /* ── Logo ── */
        .logo-mark {
          display: flex; align-items: center; gap: 10px;
        }
        .logo-icon {
          width: 38px; height: 38px; border-radius: 11px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(37,99,235,0.45);
          flex-shrink: 0;
        }
        .logo-icon-light {
          width: 38px; height: 38px; border-radius: 11px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .logo-name {
          font-family: 'Sora', sans-serif;
          font-size: 18px; font-weight: 700;
          letter-spacing: -0.02em;
        }
        .logo-name-dark  { color: #0f172a; }
        .logo-name-light { color: #fff; }
        .logo-name sup {
          font-size: 8px; font-weight: 600;
          color: #3b82f6; vertical-align: super;
          letter-spacing: 0.05em; margin-left: 1px;
        }
        .logo-name-light sup { color: #93c5fd; }

        /* ── Left panel ── */
        .auth-left {
          display: none;
          position: relative;
          overflow: hidden;
          background: #0b1f4b;
          flex-direction: column;
          justify-content: flex-end;
          padding: 3rem;
        }
        @media (min-width: 768px) { .auth-left { display: flex; flex: 1; } }

        .auth-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .glow-a {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 380px; height: 380px;
          top: -80px; right: -80px;
          background: rgba(59,130,246,0.28);
          filter: blur(80px);
        }
        .glow-b {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 260px; height: 260px;
          bottom: 80px; left: -60px;
          background: rgba(99,102,241,0.22);
          filter: blur(70px);
        }

        .brand-badge {
          position: relative; z-index: 1;
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          padding: 6px 14px;
          margin-bottom: 28px;
          backdrop-filter: blur(8px);
          width: fit-content;
        }
        .brand-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #34d399; animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

        .left-heading {
          position: relative; z-index: 1;
          font-family: 'Sora', sans-serif;
          font-size: 2.1rem; font-weight: 700;
          line-height: 1.18; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 16px;
        }
        .left-heading span { color: #93c5fd; }

        .left-sub {
          position: relative; z-index: 1;
          color: rgba(255,255,255,0.45);
          font-size: 14px; line-height: 1.65;
          max-width: 320px; margin-bottom: 36px;
        }

        .stat-row {
          position: relative; z-index: 1;
          display: flex; gap: 12px; flex-wrap: wrap;
        }
        .stat-pill {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px; padding: 10px 16px;
          backdrop-filter: blur(8px);
        }
        .stat-pill strong {
          font-family: 'Sora', sans-serif;
          font-size: 18px; font-weight: 700; color: #fff;
        }
        .stat-pill span { font-size: 11px; color: rgba(255,255,255,0.4); font-weight: 500; }

        /* ── Right panel ── */
        .auth-right {
          flex: 1; display: flex;
          align-items: center; justify-content: center;
          padding: 2rem 1.5rem;
        }
        @media (min-width: 768px) { .auth-right { max-width: 480px; } }

        .auth-card {
          width: 100%; max-width: 400px;
        }

        .card-eyebrow {
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: #3b82f6; margin-bottom: 10px;
        }

        .card-heading {
          font-family: 'Sora', sans-serif;
          font-size: 1.85rem; font-weight: 700;
          color: #0f172a; letter-spacing: -0.02em;
          margin-bottom: 6px; line-height: 1.2;
        }

        .card-sub {
          font-size: 13.5px; color: #94a3b8; margin-bottom: 32px;
        }

        /* Toggle tabs */
        .tab-wrap {
          display: flex;
          background: #f1f5f9;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 28px;
          gap: 4px;
        }
        .tab-btn {
          flex: 1; padding: 9px 0;
          font-size: 13px; font-weight: 600;
          border: none; cursor: pointer;
          border-radius: 9px;
          transition: all 0.18s ease;
        }
        .tab-btn.active {
          background: #fff;
          color: #1d4ed8;
          box-shadow: 0 1px 6px rgba(0,0,0,0.08);
        }
        .tab-btn:not(.active) { background: transparent; color: #94a3b8; }

        /* Form fields */
        .field-group { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }

        .field-wrap { position: relative; }

        .field-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: #cbd5e1; pointer-events: none;
          display: flex; align-items: center;
        }

        .field-input {
          width: 100%; padding: 12px 14px 12px 42px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; color: #0f172a;
          background: #f8faff;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          box-sizing: border-box;
        }
        .field-input::placeholder { color: #b0bec5; }
        .field-input:focus {
          border-color: #3b82f6;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(59,130,246,0.1);
        }

        .pass-toggle {
          position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #b0bec5; padding: 2px;
          display: flex; align-items: center;
          transition: color 0.15s;
        }
        .pass-toggle:hover { color: #3b82f6; }

        /* Submit button */
        .submit-btn {
          width: 100%; padding: 13px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          border: none; border-radius: 13px;
          cursor: pointer;
          transition: opacity 0.18s, transform 0.15s, box-shadow 0.18s;
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
          display: flex; align-items: center; justify-content: center; gap: 8px;
          letter-spacing: 0.01em;
        }
        .submit-btn:hover:not(:disabled) {
          opacity: 0.93;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(37,99,235,0.38);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        /* Spinner */
        .spinner {
          width: 16px; height: 16px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Error */
        .error-box {
          display: flex; align-items: center; gap: 10px;
          background: #fff5f5;
          border: 1px solid #fecaca;
          border-radius: 11px;
          padding: 11px 14px;
          margin-bottom: 16px;
          font-size: 13px; color: #dc2626;
        }

        /* Divider */
        .divider {
          display: flex; align-items: center; gap: 12px;
          margin: 20px 0; color: #cbd5e1; font-size: 12px;
        }
        .divider::before, .divider::after {
          content: ''; flex: 1;
          height: 1px; background: #e2e8f0;
        }

        /* Switch link */
        .switch-row {
          text-align: center; font-size: 13px; color: #94a3b8; margin-top: 22px;
        }
        .switch-link {
          color: #2563eb; font-weight: 600; cursor: pointer;
          background: none; border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; padding: 0;
          transition: color 0.15s;
        }
        .switch-link:hover { color: #1d4ed8; text-decoration: underline; }

        /* Fade-in for form swap */
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .fade-in { animation: fadeIn 0.22s ease both; }
      `}</style>

      <div className="auth-root">

        {/* ── Left decorative panel ── */}
        <div className="auth-left">
          <div className="glow-a" />
          <div className="glow-b" />

          {/* Top logo — absolute so it sits at the top regardless of flex-end */}
          <div style={{ position: 'absolute', top: '2.6rem', left: '3rem', zIndex: 2 }}>
            <div className="logo-mark">
              <div className="logo-icon-light">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <div>
                <span className="logo-name logo-name-light">QuickFix<sup>™</sup></span>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 500, marginTop: 1, letterSpacing: '0.04em' }}>
                  Skilled · Trusted · Fast
                </div>
              </div>
            </div>
          </div>

          <div className="brand-badge">
            <span className="brand-dot" />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Verified Tradespeople
            </span>
          </div>

          <h2 className="left-heading">
            Find skilled hands<br />
            <span>for any job,</span><br />
            <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>near you.</span>
          </h2>

          <p className="left-sub">
            Browse local service requests from homeowners, or post your own job and get matched with the right tradesperson fast.
          </p>

          <div className="stat-row">
            {[['500+','Active jobs'],['9','Trade types'],['100%','Verified']].map(([n,l]) => (
              <div key={l} className="stat-pill">
                <strong>{n}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="auth-right">
          <div className="auth-card">

            {/* Logo */}
            <div className="logo-mark" style={{ marginBottom: 28 }}>
              <div className="logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <div>
                <span className="logo-name logo-name-dark">QuickFix<sup>™</sup></span>
                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 500, marginTop: 1, letterSpacing: '0.04em' }}>
                  Skilled · Trusted · Fast
                </div>
              </div>
            </div>

            <h1 className="card-heading">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="card-sub">
              {isLogin ? 'Sign in to continue to your account.' : 'Join thousands of homeowners & tradespeople.'}
            </p>

            {/* Tab switcher */}
            <div className="tab-wrap">
              <button className={`tab-btn ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setError(''); }}>
                Sign In
              </button>
              <button className={`tab-btn ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setError(''); }}>
                Register
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="error-box">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 8v4m0 4h.01" />
                </svg>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="fade-in" key={isLogin ? 'login' : 'register'}>
              <div className="field-group">

                {/* Name */}
                {!isLogin && (
                  <div className="field-wrap">
                    <span className="field-icon">
                      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Full name"
                      className="field-input"
                      value={formData.name}
                      onChange={set('name')}
                      required
                    />
                  </div>
                )}

                {/* Email */}
                <div className="field-wrap">
                  <span className="field-icon">
                    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="field-input"
                    value={formData.email}
                    onChange={set('email')}
                    required
                  />
                </div>

                {/* Password */}
                <div className="field-wrap">
                  <span className="field-icon">
                    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <rect x="3" y="11" width="18" height="11" rx="2" strokeLinecap="round" />
                      <path strokeLinecap="round" d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Password"
                    className="field-input"
                    value={formData.password}
                    onChange={set('password')}
                    required
                    style={{ paddingRight: 44 }}
                  />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(p => !p)} aria-label="Toggle password">
                    {showPass ? (
                      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                      </svg>
                    ) : (
                      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot password (login only) */}
              {isLogin && (
                <div style={{ textAlign: 'right', marginBottom: 20, marginTop: -4 }}>
                  <button type="button" style={{ background: 'none', border: 'none', fontSize: 12, color: '#3b82f6', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <><div className="spinner" /> Please wait…</>
                ) : isLogin ? (
                  <>Sign in <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7"/></svg></>
                ) : (
                  <>Create account <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7"/></svg></>
                )}
              </button>
            </form>

            {/* Switch mode */}
            <div className="switch-row">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button className="switch-link" onClick={toggle}>
                {isLogin ? 'Register' : 'Sign in'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}