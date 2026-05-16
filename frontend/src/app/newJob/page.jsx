'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewJob() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    category: '',
    location: '',
    budget: '',
    postedBy: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Roofing', 'HVAC', 'Gardening', 'Cleaning', 'Other'];

  const validate = () => {
    const newErrors = {};
    if (formData.title.length < 5) newErrors.title = 'Please enter a job title (at least 5 characters)';
    if (formData.desc.length < 20) newErrors.desc = 'Please describe the job (at least 20 characters)';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (formData.location.length < 2) newErrors.location = 'Please enter a location';
    if (formData.postedBy.length < 2) newErrors.postedBy = 'Please enter your name';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      const newJob = {
        id: 'j' + Date.now(),
        ...formData,
        status: 'open',
        createdAt: new Date().toISOString()
      };
      
      const stored = localStorage.getItem('tradecraft_jobs');
      const jobs = stored ? JSON.parse(stored) : [];
      jobs.unshift(newJob);
      localStorage.setItem('tradecraft_jobs', JSON.stringify(jobs));
      
      setIsSubmitting(false);
      router.push('/');
    }, 800);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">
      <div className="mb-8">
        <h2 className="font-syne text-2xl font-extrabold tracking-tight mb-1">Post a new job request</h2>
        <p className="text-[#555560] text-sm">Tell tradespeople what you need — they'll reach out with quotes.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white border border-black/10 rounded-2xl p-8">
        <div className="mb-5">
          <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">
            Job Title <span className="text-[#e8532a]">*</span>
          </label>
          <input
            type="text"
            className={`w-full text-sm px-4 py-2.5 border rounded-xl bg-white text-[#111118] outline-none transition-all focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10 ${errors.title ? 'border-red-500' : 'border-black/20'}`}
            placeholder="e.g. Leaking kitchen tap needs fixing"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
          />
          {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
        </div>
        
        <div className="mb-5">
          <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">
            Description <span className="text-[#e8532a]">*</span>
          </label>
          <textarea
            rows={4}
            className={`w-full text-sm px-4 py-2.5 border rounded-xl bg-white text-[#111118] outline-none transition-all focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10 resize-y ${errors.desc ? 'border-red-500' : 'border-black/20'}`}
            placeholder="Describe the problem in detail — what's broken, how urgent it is, access notes, etc."
            value={formData.desc}
            onChange={(e) => updateField('desc', e.target.value)}
          />
          {errors.desc && <div className="text-red-500 text-xs mt-1">{errors.desc}</div>}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">
              Category <span className="text-[#e8532a]">*</span>
            </label>
            <select
              className={`w-full text-sm px-4 py-2.5 border rounded-xl bg-white text-[#111118] outline-none transition-all focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10 appearance-none pr-8 bg-no-repeat bg-right_12px_center ${errors.category ? 'border-red-500' : 'border-black/20'}`}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")` }}
              value={formData.category}
              onChange={(e) => updateField('category', e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
          </div>
          <div>
            <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">
              Location <span className="text-[#e8532a]">*</span>
            </label>
            <input
              type="text"
              className={`w-full text-sm px-4 py-2.5 border rounded-xl bg-white text-[#111118] outline-none transition-all focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10 ${errors.location ? 'border-red-500' : 'border-black/20'}`}
              placeholder="e.g. Glasgow, Scotland"
              value={formData.location}
              onChange={(e) => updateField('location', e.target.value)}
            />
            {errors.location && <div className="text-red-500 text-xs mt-1">{errors.location}</div>}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">Budget (optional)</label>
            <input
              type="text"
              className="w-full text-sm px-4 py-2.5 border border-black/20 rounded-xl bg-white text-[#111118] outline-none focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10"
              placeholder="e.g. £150–£200"
              value={formData.budget}
              onChange={(e) => updateField('budget', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">
              Your Name <span className="text-[#e8532a]">*</span>
            </label>
            <input
              type="text"
              className={`w-full text-sm px-4 py-2.5 border rounded-xl bg-white text-[#111118] outline-none transition-all focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10 ${errors.postedBy ? 'border-red-500' : 'border-black/20'}`}
              placeholder="e.g. Sarah M."
              value={formData.postedBy}
              onChange={(e) => updateField('postedBy', e.target.value)}
            />
            {errors.postedBy && <div className="text-red-500 text-xs mt-1">{errors.postedBy}</div>}
          </div>
        </div>
        
        <hr className="border-t border-black/10 my-6" />
        
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-[#e8532a] text-white font-medium px-6 py-2.5 rounded-xl hover:bg-[#d44420] transition-all disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
                Post Job Request
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="border border-black/20 bg-transparent text-[#555560] font-medium px-6 py-2.5 rounded-xl hover:bg-[#f0ede8] transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}