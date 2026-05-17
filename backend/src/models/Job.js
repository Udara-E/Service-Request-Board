import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    location: { type: String, required: true },

    // ✅ ADD THESE
    budget: { type: String, default: '' },
    postedBy: { type: String, default: '' },

    contactName: { type: String, required: true },
    contactEmail: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

   
  },
  {
    timestamps: true // createdAt + updatedAt auto
  }
);

export default mongoose.model('Job', jobSchema);