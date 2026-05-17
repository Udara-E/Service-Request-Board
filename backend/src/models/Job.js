import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    contactName: { type: String, required: true },
    contactEmail: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

    status: {
      type: String,
      enum: ['open', 'inprogress', 'closed'],
      default: 'open'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Job', jobSchema);