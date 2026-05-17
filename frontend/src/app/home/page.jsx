'use client';

import { useState, useEffect } from 'react';
import JobCard from '@/components/JobCard';
import { useAuth } from '../context/AuthContext';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { token } = useAuth();

  // =========================
  // FETCH JOBS
  // =========================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(`${API_URL}/jobs`);

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();

        setJobs(data);
        setFilteredJobs(data);
      } catch (err) {
        console.log(err);
        setError('Failed to load jobs');
      } finally {
        setLoading(false); 
      }
    };

    fetchJobs();
  }, []);

  // =========================
  // FILTER LOGIC
  // =========================
  useEffect(() => {
    let filtered = [...jobs];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();

      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(term) ||
          job.desc?.toLowerCase().includes(term)
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(
        (job) => job.category === categoryFilter
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (job) => job.status === statusFilter
      );
    }

    setFilteredJobs(filtered);
  }, [searchTerm, categoryFilter, statusFilter, jobs]);

  const categories = [
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Painting',
    'Roofing',
    'HVAC',
    'Gardening',
    'Cleaning',
    'Other'
  ];

  const statuses = ['open', 'inprogress', 'closed'];

  const statusLabels = {
    open: 'Open',
    inprogress: 'In Progress',
    closed: 'Closed'
  };

  // =========================
  // LOADING UI (FIXED SAFE CHECK)
  // =========================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#e8532a]/30 border-t-[#e8532a] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* ================= HERO ================= */}
      <div className="bg-[#1a1a2e] px-8 py-12 text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          Find trusted tradespeople<br />near you
        </h1>

        <p className="text-white/60 mb-6">
          Browse service requests or post your own.
        </p>

        {/* SEARCH */}
        <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-2 max-w-md">
          <input
            type="text"
            placeholder="Search jobs..."
            className="bg-transparent outline-none text-white placeholder-white/50 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="flex flex-wrap gap-3 px-8 py-5 bg-white border-b">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {statusLabels[s]}
            </option>
          ))}
        </select>

        <span className="ml-auto text-sm text-gray-500">
          {filteredJobs.length} jobs found
        </span>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="px-8 py-4 text-red-600">{error}</div>
      )}

      {/* ================= JOB LIST ================= */}
      <div className="p-8">
        {filteredJobs.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            No jobs found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job, idx) => (
              <JobCard
                key={job._id || job.id}
                job={job}
                index={idx}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}