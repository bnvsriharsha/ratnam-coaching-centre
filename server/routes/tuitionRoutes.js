import express from 'express';
import {
  getTuitions,
  getTuitionByIdOrGrade,
  createTuition,
  updateTuition,
  deleteTuition,
} from '../controllers/tuitionController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getTuitions);
router.get('/:idOrGrade', getTuitionByIdOrGrade);

// Admin routes
router.post('/', protect, adminOnly, createTuition);
router.put('/:id', protect, adminOnly, updateTuition);
router.delete('/:id', protect, adminOnly, deleteTuition);

export default router;
