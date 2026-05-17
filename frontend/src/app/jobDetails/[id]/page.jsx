'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setJob((prev) => ({ ...prev, status: newStatus }));
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteJob = async () => {
    try {
      await fetch(`${API_URL}/jobs/${id}`, { method: 'DELETE' });
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#e8532a]/30 border-t-[#e8532a] rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) return null;

  const statusColors = {
    open: { bg: 'bg-green-50', text: 'text-green-700', label: '● Open' },
    inprogress: { bg: 'bg-amber-50', text: 'text-amber-700', label: '◐ In Progress' },
    closed: { bg: 'bg-gray-100', text: 'text-gray-600', label: '○ Closed' }
  };
  const statusStyle = statusColors[job.status] || statusColors.open;

  const getAccentColor = (category) => {
    const colors = {
      Plumbing: 'bg-blue-600',
      Electrical: 'bg-orange-600',
      Carpentry: 'bg-amber-800',
      Painting: 'bg-purple-700',
      Roofing: 'bg-red-700',
      HVAC: 'bg-teal-700',
      Gardening: 'bg-green-700',
      Cleaning: 'bg-sky-700',
      Other: 'bg-slate-500'
    };
    return colors[category] || 'bg-slate-500';
  };

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#555560] hover:text-[#111118] mb-6">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to all jobs
      </Link>

      <div className="bg-white border border-black/10 rounded-2xl overflow-hidden">
        <div className={`h-1 ${getAccentColor(job.category)}`} />

        <div className="p-8 border-b border-black/10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
              {statusStyle.label}
            </span>
            <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-[#f0ede8] text-[#555560]">
              {job.category}
            </span>
          </div>
          <h2 className="font-syne text-2xl font-extrabold tracking-tight mb-3">{job.title}</h2>
          <p className="text-[#555560] text-base leading-relaxed">{job.description}</p>
        </div>

        {/* ✅ FIXED: 2-column grid — Location + Contact Name */}
        <div className="grid grid-cols-2 border-b border-black/10">
          <div className="p-5 border-r border-black/10">
            <div className="text-[11px] uppercase tracking-wide text-[#888896] font-medium mb-1">Location</div>
            <div className="text-sm font-medium text-[#111118] flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {job.location}
            </div>
          </div>

          <div className="p-5">
            <div className="text-[11px] uppercase tracking-wide text-[#888896] font-medium mb-1">Contact Name</div>
            <div className="text-sm font-medium text-[#111118] flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {job.contactName}
            </div>
          </div>
        </div>

        {/* Posted + Email */}
        <div className="grid grid-cols-2 border-b border-black/10">
          <div className="p-5 border-r border-black/10">
            <div className="text-[11px] uppercase tracking-wide text-[#888896] font-medium mb-1">Posted</div>
            <div className="text-sm font-medium text-[#111118] flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {new Date(job.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>

          <div className="p-5">
            <div className="text-[11px] uppercase tracking-wide text-[#888896] font-medium mb-1">Email</div>
            {/* ✅ FIXED: proper envelope icon */}
            <div className="text-xs font-mono text-[#888896] flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {job.contactEmail}
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#555560]">Update status:</span>
            <select
              className="text-sm font-medium px-3 py-2 pr-8 border border-black/20 rounded-xl bg-white text-[#111118] cursor-pointer appearance-none bg-no-repeat bg-right_12px_center focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10 outline-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")` }}
              value={job.status}
              onChange={(e) => updateStatus(e.target.value)}
            >
              <option value="open">Open</option>
              <option value="inprogress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="ml-auto flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
            </svg>
            Delete Job
          </button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-4" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-syne text-lg font-bold mb-2">Delete this job?</h3>
            <p className="text-[#555560] text-sm leading-relaxed mb-6">This action cannot be undone. The job request will be permanently removed from the board.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="border border-black/20 bg-transparent text-[#555560] font-medium px-4 py-1.5 rounded-xl text-sm hover:bg-[#f0ede8]"
              >
                Cancel
              </button>
              <button
                onClick={deleteJob}
                className="bg-red-600 text-white font-medium px-4 py-1.5 rounded-xl text-sm hover:bg-red-700"
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