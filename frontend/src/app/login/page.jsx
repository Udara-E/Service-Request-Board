'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();

  const { login, register } =
    useAuth();

  const [isLogin, setIsLogin] =
    useState(true);

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      password: ''
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    let result;

    if (isLogin) {
      result = await login(
        formData.email,
        formData.password
      );
    } else {
      result = await register(
        formData.name,
        formData.email,
        formData.password
      );
    }

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">
          {isLogin
            ? 'Welcome Back'
            : 'Create Account'}
        </h1>

        <p className="text-gray-500 text-center mb-6">
          {isLogin
            ? 'Login to continue'
            : 'Register a new account'}
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg p-3"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name:
                    e.target.value
                })
              }
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email:
                  e.target.value
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password:
                  e.target.value
              })
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
          >
            {loading
              ? 'Please wait...'
              : isLogin
              ? 'Login'
              : 'Register'}
          </button>
        </form>

        <button
          onClick={() =>
            setIsLogin(!isLogin)
          }
          className="mt-5 text-sm text-blue-500 w-full"
        >
          {isLogin
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}