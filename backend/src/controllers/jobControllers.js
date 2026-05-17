// controllers/jobController.js

import Job from '../models/Job.js';

export const getJobs = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
      budget,
      postedBy
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !contactName ||
      !contactEmail
    ) {
      return res.status(400).json({
        message: 'All required fields must be filled'
      });
    }

    const job = await Job.create({
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
      budget,
      postedBy
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      });
    }

    res.status(200).json({
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

