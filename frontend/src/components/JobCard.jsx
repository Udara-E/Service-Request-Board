// components/JobCard.jsx
import Link from 'next/link';

export default function JobCard({ job, index }) {
  const jobId = job._id || job.id;

  const categoryIcons = {
    Plumbing: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9h12v6H3z"/><path d="M15 12h3a3 3 0 0 1 0 6h-3"/><path d="M3 6V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2"/>
      </svg>
    ),
    Electrical: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    Carpentry: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    Painting: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 16s1-1 4-1 5 2 8 2 4-1 4-1V4s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
    Roofing: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      </svg>
    ),
    HVAC: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2 2 0 1 1 19 12H2"/>
      </svg>
    ),
    Gardening: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12C12 12 7 10 5 6c4 0 7 3 7 6zM12 12c0 0 5-2 7-6-4 0-7 3-7 6z"/>
      </svg>
    ),
    Cleaning: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 22L22 3"/><path d="M12 12l-8 8a2 2 0 1 0 3 3l8-8"/>
        <path d="M14 10l4-4"/><path d="M16 8l2-2"/>
      </svg>
    ),
    Other: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
      </svg>
    ),
  };

  const getStatusBadge = (status) => {
    if (status === 'open') return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
        Open
      </span>
    );
    if (status === 'inprogress') return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
        In Progress
      </span>
    );
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-400 border border-neutral-200">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 inline-block" />
        Closed
      </span>
    );
  };

  const timeAgo = (dateStr) => {
    if (!dateStr) return 'recently';
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  };

  const icon = categoryIcons[job.category] || categoryIcons.Other;

  return (
    <Link href={`/jobDetails/${jobId}`} className="block group">
      <div
        className="relative bg-white border border-neutral-200/80 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-neutral-300"
        style={{ animationDelay: `${(index || 0) * 0.04}s` }}
      >
        {/* Header row: icon badge + title + status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-2.5 min-w-0">
            {/* Category icon badge */}
            <div className="shrink-0 mt-0.5 w-8 h-8 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:bg-neutral-900 group-hover:text-white group-hover:border-neutral-900 transition-colors duration-300">
              {icon}
            </div>
            <h3 className="font-semibold text-sm leading-snug text-neutral-900 line-clamp-2 tracking-tight">
              {job.title}
            </h3>
          </div>
          <div className="shrink-0">
            {getStatusBadge(job.status)}
          </div>
        </div>

        {/* Description */}
        <p className="text-[13px] text-neutral-400 leading-relaxed line-clamp-2 mb-4 pl-10">
          {job.description}
        </p>

        {/* Footer meta */}
        <div className="flex items-center gap-3 text-[11px] text-neutral-400 pl-10">
          <span className="flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            {timeAgo(job.createdAt)}
          </span>

          {/* Category pill pushed to the right */}
          <span className="ml-auto text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-500 border border-neutral-200 tracking-wide">
            {job.category}
          </span>
        </div>

        {/* Subtle arrow hint on hover */}
        <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}