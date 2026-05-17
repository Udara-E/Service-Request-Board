'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewJob() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    contactName: '',
    contactEmail: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] =
    useState(false);

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

  const validate = () => {
    const newErrors = {};

    if (formData.title.trim().length < 5) {
      newErrors.title =
        'Please enter a job title (at least 5 characters)';
    }

    if (
      formData.description.trim().length < 20
    ) {
      newErrors.description =
        'Please describe the job (at least 20 characters)';
    }

    if (!formData.category) {
      newErrors.category =
        'Please select a category';
    }

    if (formData.location.trim().length < 2) {
      newErrors.location =
        'Please enter a location';
    }

    if (
      formData.contactName.trim().length < 2
    ) {
      newErrors.contactName =
        'Please enter contact name';
    }

    const emailRegex =
      /^\S+@\S+\.\S+$/;

    if (
      !emailRegex.test(
        formData.contactEmail
      )
    ) {
      newErrors.contactEmail =
        'Please enter a valid email';
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsSubmitting(true);

      const response = await fetch(
        'http://localhost:5000/api/jobs',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json'
          },
          body: JSON.stringify({
            title: formData.title,
            description:
              formData.description,
            category: formData.category,
            location: formData.location,
            contactName:
              formData.contactName,
            contactEmail:
              formData.contactEmail
            
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to create job'
        );
      }

      router.push('/');
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">
      <div className="mb-8">
        <h2 className="font-syne text-2xl font-extrabold tracking-tight mb-1">
          Post a new job request
        </h2>

        <p className="text-[#555560] text-sm">
          Tell tradespeople what you
          need — they'll reach out with
          quotes.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-black/10 rounded-2xl p-8"
      >
        {/* TITLE */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">
            Job Title{' '}
            <span className="text-[#e8532a]">
              *
            </span>
          </label>

          <input
            type="text"
            placeholder="e.g. Leaking kitchen tap needs fixing"
            value={formData.title || ''}
            onChange={(e) =>
              updateField(
                'title',
                e.target.value
              )
            }
            className={`w-full text-sm px-4 py-2.5 border rounded-xl bg-white text-[#111118] outline-none transition-all focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10 ${
              errors.title
                ? 'border-red-500'
                : 'border-black/20'
            }`}
          />

          {errors.title && (
            <div className="text-red-500 text-xs mt-1">
              {errors.title}
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">
            Description{' '}
            <span className="text-[#e8532a]">
              *
            </span>
          </label>

          <textarea
            rows={4}
            placeholder="Describe the problem in detail"
            value={
              formData.description || ''
            }
            onChange={(e) =>
              updateField(
                'description',
                e.target.value
              )
            }
            className={`w-full text-sm px-4 py-2.5 border rounded-xl bg-white text-[#111118] outline-none transition-all resize-y focus:border-[#e8532a] focus:ring-2 focus:ring-[#e8532a]/10 ${
              errors.description
                ? 'border-red-500'
                : 'border-black/20'
            }`}
          />

          {errors.description && (
            <div className="text-red-500 text-xs mt-1">
              {errors.description}
            </div>
          )}
        </div>

        {/* CATEGORY + LOCATION */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">
              Category{' '}
              <span className="text-[#e8532a]">
                *
              </span>
            </label>

            <select
              value={formData.category || ''}
              onChange={(e) =>
                updateField(
                  'category',
                  e.target.value
                )
              }
              className={`w-full text-sm px-4 py-2.5 border rounded-xl bg-white text-[#111118] outline-none transition-all ${
                errors.category
                  ? 'border-red-500'
                  : 'border-black/20'
              }`}
            >
              <option value="">
                Select a category
              </option>

              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>

            {errors.category && (
              <div className="text-red-500 text-xs mt-1">
                {errors.category}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">
              Location{' '}
              <span className="text-[#e8532a]">
                *
              </span>
            </label>

            <input
              type="text"
              placeholder="e.g. Glasgow"
              value={formData.location || ''}
              onChange={(e) =>
                updateField(
                  'location',
                  e.target.value
                )
              }
              className={`w-full text-sm px-4 py-2.5 border rounded-xl bg-white text-[#111118] outline-none transition-all ${
                errors.location
                  ? 'border-red-500'
                  : 'border-black/20'
              }`}
            />

            {errors.location && (
              <div className="text-red-500 text-xs mt-1">
                {errors.location}
              </div>
            )}
          </div>
        </div>

        {/* CONTACT NAME */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">
            Contact Name{' '}
            <span className="text-[#e8532a]">
              *
            </span>
          </label>

          <input
            type="text"
            placeholder="e.g. John"
            value={
              formData.contactName || ''
            }
            onChange={(e) =>
              updateField(
                'contactName',
                e.target.value
              )
            }
            className={`w-full text-sm px-4 py-2.5 border rounded-xl bg-white text-[#111118] outline-none transition-all ${
              errors.contactName
                ? 'border-red-500'
                : 'border-black/20'
            }`}
          />

          {errors.contactName && (
            <div className="text-red-500 text-xs mt-1">
              {errors.contactName}
            </div>
          )}
        </div>

        {/* EMAIL */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-[#555560] uppercase tracking-wide mb-2">
            Contact Email{' '}
            <span className="text-[#e8532a]">
              *
            </span>
          </label>

          <input
            type="email"
            placeholder="e.g. john@gmail.com"
            value={
              formData.contactEmail || ''
            }
            onChange={(e) =>
              updateField(
                'contactEmail',
                e.target.value
              )
            }
            className={`w-full text-sm px-4 py-2.5 border rounded-xl bg-white text-[#111118] outline-none transition-all ${
              errors.contactEmail
                ? 'border-red-500'
                : 'border-black/20'
            }`}
          />

          {errors.contactEmail && (
            <div className="text-red-500 text-xs mt-1">
              {errors.contactEmail}
            </div>
          )}
        </div>

    

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-2.5 rounded-xl hover:bg-blue-800 transition-all disabled:opacity-70"
          >
            {isSubmitting
              ? 'Posting...'
              : 'Post Job Request'}
          </button>

          <button
            type="button"
            onClick={() =>
              router.push('/')
            }
            className="border border-black/20 bg-transparent text-[#555560] font-medium px-6 py-2.5 rounded-xl hover:bg-[#f0ede8] transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}