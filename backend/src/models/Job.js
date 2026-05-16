import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    desc: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    budget: {
      type: String
    },

    postedBy: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ['open', 'inprogress', 'closed'],
      default: 'open'
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Job', jobSchema);