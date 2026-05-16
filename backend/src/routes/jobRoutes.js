import express from 'express';

import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  updateJobStatus
} from '../controllers/jobControllers.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getJobs);

router.get('/:id', getJob);

router.post('/', protect, createJob);

router.patch('/:id', protect, updateJobStatus);

router.delete('/:id', protect, deleteJob);

export default router;