// app/page.js (instead of app/home/page.jsx - this is the main route)
'use client';
import { useState, useEffect } from 'react';
import JobCard from '@/components/JobCard';
import { jobs as initialJobs } from '@/data/jobs';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('tradecraft_jobs');
    if (stored) {
      setJobs(JSON.parse(stored));
    } else {
      setJobs(initialJobs);
      localStorage.setItem('tradecraft_jobs', JSON.stringify(initialJobs));
    }
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, categoryFilter, statusFilter, jobs]);

  const filterJobs = () => {
    let filtered = [...jobs];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(j => 
        j.title.toLowerCase().includes(term) || 
        j.desc.toLowerCase().includes(term)
      );
    }
    if (categoryFilter) {
      filtered = filtered.filter(j => j.category === categoryFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter(j => j.status === statusFilter);
    }
    setFilteredJobs(filtered);
  };

  const categories = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Roofing', 'HVAC', 'Gardening', 'Cleaning', 'Other'];
  const statuses = ['open', 'inprogress', 'closed'];
  const statusLabels = { open: 'Open', inprogress: 'In Progress', closed: 'Closed' };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[#1a1a2e] px-8 py-12 text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          Find trusted tradespeople<br />near you
        </h1>
        <p className="text-white/60 text-base mb-6">
          Browse service requests or post your own — plumbers, electricians, builders & more.
        </p>
        <div className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-xl px-4 py-2 max-w-md">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search job title or description..."
            className="bg-transparent border-none outline-none text-white placeholder-white/40 flex-1 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 px-10 py-5 bg-white border-b border-black/10">
        <span className="text-xs font-medium text-[#888896] uppercase tracking-wide">Filter by</span>
        <select
          className="text-sm px-3 py-1.5 border border-black/20 rounded-md bg-white text-[#111118] cursor-pointer appearance-none pr-7 bg-no-repeat bg-right_10px_center"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")` }}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select
          className="text-sm px-3 py-1.5 border border-black/20 rounded-md bg-white text-[#111118] cursor-pointer appearance-none pr-7 bg-no-repeat bg-right_10px_center"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")` }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          {statuses.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
        </select>
        <span className="text-xs text-[#888896] ml-auto">
          {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Jobs Grid */}
      <div className="p-8">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 text-[#888896]">
            <div className="text-4xl mb-3 opacity-30">📋</div>
            <h3 className="font-syne font-bold text-base text-[#555560] mb-1">No jobs found</h3>
            <p className="text-sm">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job, idx) => (
              <JobCard key={job.id} job={job} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}