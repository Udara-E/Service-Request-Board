'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const categoryIcons = {
  Plumbing: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h12v6H3z"/><path d="M15 12h3a3 3 0 0 1 0 6h-3"/><path d="M3 6V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2"/></svg>,
  Electrical: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Carpentry: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Painting: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 16s1-1 4-1 5 2 8 2 4-1 4-1V4s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  Roofing: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>,
  HVAC: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2 2 0 1 1 19 12H2"/></svg>,
  Gardening: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12C12 12 7 10 5 6c4 0 7 3 7 6zM12 12c0 0 5-2 7-6-4 0-7 3-7 6z"/></svg>,
  Cleaning: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22L22 3"/><path d="M12 12l-8 8a2 2 0 1 0 3 3l8-8"/><path d="M14 10l4-4"/></svg>,
  Other: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>,
};

function MetaCell({ label, icon, children, border = false }) {
  return (
    <div className={`p-5 ${border ? 'border-r border-slate-100' : ''}`}>
      <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-2">{label}</div>
      <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
        <span className="text-blue-400">{icon}</span>
        {children}
      </div>
    </div>
  );
}

export default function JobDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/jobs/${id}`);
        if (!res.ok) throw new Error('Job not found');
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.log(err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchJob();
  }, [id, router]);

  const updateStatus = async (newStatus) => {
    try {
      const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setJob((prev) => ({ ...prev, status: newStatus }));
        router.refresh();
      }
    } catch (err) { console.log(err); }
  };

  const deleteJob = async () => {
    try {
      await fetch(`${API_URL}/jobs/${id}`, { method: 'DELETE' });
      router.push('/');
    } catch (err) { console.log(err); }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-400 tracking-wide">Loading job details…</p>
      </div>
    );
  }

  if (!job) return null;

  const statusConfig = {
    open: { label: 'Open', dot: 'bg-emerald-500 animate-pulse', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    inprogress: { label: 'In Progress', dot: 'bg-amber-400', pill: 'bg-amber-50 text-amber-700 border-amber-200' },
    closed: { label: 'Closed', dot: 'bg-slate-300', pill: 'bg-slate-100 text-slate-500 border-slate-200' },
  };
  const sc = statusConfig[job.status] || statusConfig.open;
  const icon = categoryIcons[job.category] || categoryIcons.Other;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-6 md:px-10 py-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to all jobs
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8">

        {/* ── HEADER CARD ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">

          {/* Category + icon banner */}
          <div className="bg-linear-to-r from-blue-900 to-blue-500 px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
                {icon}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-blue-200 font-semibold mb-0.5">Category</div>
                <div className="text-white font-semibold text-sm">{job.category}</div>
              </div>
            </div>
            {/* Status badge */}
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide px-3 py-1.5 rounded-full border bg-white/15 border-white/30 text-white`}>
              <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
              {sc.label}
            </span>
          </div>

          {/* Title + description */}
          <div className="px-6 py-6 border-b border-slate-100">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 mb-2 leading-snug">{job.title}</h2>
            <p className="text-slate-500 text-sm leading-relaxed">{job.description}</p>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 border-b border-slate-100">
            <MetaCell label="Location" border icon={
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            }>
              {job.location}
            </MetaCell>
            <MetaCell label="Contact Name" icon={
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            }>
              {job.contactName}
            </MetaCell>
          </div>
          <div className="grid grid-cols-2">
            <MetaCell label="Posted" border icon={
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            }>
              {new Date(job.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </MetaCell>
            <MetaCell label="Email" icon={
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            }>
              <span className="font-mono text-xs text-slate-500">{job.contactEmail}</span>
            </MetaCell>
          </div>
        </div>

        {/* ── ACTIONS CARD ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-5 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600">Update status:</span>
            <div className="relative">
              <select
                className="appearance-none text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pr-8 cursor-pointer hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                value={job.status}
                onChange={(e) => updateStatus(e.target.value)}
              >
                <option value="open">Open</option>
                <option value="inprogress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="ml-auto inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
            </svg>
            Delete Job
          </button>
        </div>
      </div>

      {/* ── DELETE MODAL ── */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
              </svg>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">Delete this job?</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              This action cannot be undone. The job request will be permanently removed from the board.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 border border-slate-200 bg-slate-50 text-slate-600 font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deleteJob}
                className="flex-1 bg-red-600 text-white font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-red-700 transition-colors"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}