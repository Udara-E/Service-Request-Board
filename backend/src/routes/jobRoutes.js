// routes/jobRoutes.js

import express from 'express';
import {
  getJobs,
  getJob,
  createJob,
  updateJobStatus,
  deleteJob
} from '../controllers/jobControllers.js';

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/', createJob);
router.patch('/:id', updateJobStatus);
router.delete('/:id', deleteJob);

export default router;