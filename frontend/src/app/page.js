// app/page.js
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import HomePage from './home/page';

export default function MainPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-3 border-[#e8532a]/30 border-t-[#e8532a] rounded-full animate-spin" />
      </div>
    );
  }

  // If user is logged in, show home page
  if (user) {
    return <HomePage />;
  }

  // Otherwise show nothing while redirecting
  return null;
}