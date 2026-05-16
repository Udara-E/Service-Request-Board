'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-[#1a1a2e] px-8 h-14 flex items-center justify-between sticky top-0 z-50">
      <Link href="/" className="font-syne text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#e8532a]" />
        TradeCraft
      </Link>
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className={`text-sm font-medium px-4 py-1.5 rounded-md transition-all ${
            pathname === '/' 
              ? 'bg-white/15 text-white' 
              : 'bg-white/8 text-white/85 hover:bg-white/15'
          }`}
        >
          Browse Jobs
        </Link>
        {user ? (
          <>
            <Link
              href="/newJob"
              className="text-sm font-medium px-4 py-1.5 rounded-md bg-[#e8532a] text-white hover:bg-[#d44420] transition-all"
            >
              + Post a Job
            </Link>
            <div className="flex items-center gap-2 ml-2">
              <span className="text-white/70 text-sm">{user.name}</span>
              <button
                onClick={logout}
                className="text-sm font-medium px-3 py-1.5 rounded-md bg-white/10 text-white/85 hover:bg-white/20 transition-all"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link
            href="/login"
            className="text-sm font-medium px-4 py-1.5 rounded-md bg-white/10 text-white/85 hover:bg-white/20 transition-all"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}