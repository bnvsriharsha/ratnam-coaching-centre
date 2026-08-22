import express from 'express';
import {
  getDistancePrograms,
  getDistanceProgramById,
  createDistanceProgram,
  updateDistanceProgram,
  deleteDistanceProgram,
} from '../controllers/distanceEdController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getDistancePrograms);
router.get('/:id', getDistanceProgramById);

// Admin routes
router.post('/', protect, adminOnly, createDistanceProgram);
router.put('/:id', protect, adminOnly, updateDistanceProgram);
router.delete('/:id', protect, adminOnly, deleteDistanceProgram);

export default router;
