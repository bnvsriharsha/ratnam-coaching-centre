import express from 'express';
import {
  submitAdmission,
  trackAdmission,
  getMyAdmissions,
  getAllAdmissions,
  updateAdmissionStatus,
  deleteAdmission,
} from '../controllers/admissionController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', submitAdmission);
router.post('/track', trackAdmission);

// Student route
router.get('/my-admissions', protect, getMyAdmissions);

// Admin routes
router.get('/', protect, adminOnly, getAllAdmissions);
router.put('/:id', protect, adminOnly, updateAdmissionStatus);
router.delete('/:id', protect, adminOnly, deleteAdmission);

export default router;
