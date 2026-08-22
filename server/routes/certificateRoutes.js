import express from 'express';
import {
  submitCertificateRequest,
  trackCertificateRequest,
  getMyCertificateRequests,
  getAllCertificateRequests,
  updateCertificateStatus,
  deleteCertificateRequest,
} from '../controllers/certificateController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', submitCertificateRequest);
router.post('/track', trackCertificateRequest);

// Student route
router.get('/my-requests', protect, getMyCertificateRequests);

// Admin routes
router.get('/', protect, adminOnly, getAllCertificateRequests);
router.put('/:id', protect, adminOnly, updateCertificateStatus);
router.delete('/:id', protect, adminOnly, deleteCertificateRequest);

export default router;
