// components/JobCard.jsx
import Link from 'next/link';

export default function JobCard({ job, index }) {
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

  const getStatusBadge = (status) => {
    if (status === 'open') return <span className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700">● Open</span>;
    if (status === 'inprogress') return <span className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">◐ In Progress</span>;
    return <span className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">○ Closed</span>;
  };

  const timeAgo = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  };

  return (
    <Link href={`/jobDetails/${job.id}`}>
      <div 
        className="bg-white border border-black/10 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-md hover:-translate-y-px animate-fadeIn"
        style={{ animationDelay: `${(index || 0) * 0.04}s` }}
      >
        <div className={`h-1 -mt-5 mb-4 rounded-t-2xl ${getAccentColor(job.category)}`} />
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-syne text-sm font-bold leading-tight text-[#111118]">{job.title}</h3>
          {getStatusBadge(job.status)}
        </div>
        <p className="text-[13px] text-[#555560] mb-3 line-clamp-2">{job.desc}</p>
        <div className="flex items-center gap-4 text-xs text-[#888896]">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {timeAgo(job.createdAt)}
          </span>
          <span className="ml-auto text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#f0ede8] text-[#555560]">
            {job.category}
          </span>
        </div>
      </div>
    </Link>
  );
}