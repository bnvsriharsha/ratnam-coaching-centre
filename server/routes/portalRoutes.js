import express from 'express';
import {
  getStudentDashboard,
  getMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMyAttendance,
  getAllAttendance,
  markAttendance,
  getMyResults,
  getAllResults,
  createResult,
  deleteResult,
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/portalController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Student Portal Dashboard
router.get('/dashboard', protect, getStudentDashboard);

// Study Materials
router.get('/materials', getMaterials);
router.post('/materials', protect, adminOnly, createMaterial);
router.put('/materials/:id', protect, adminOnly, updateMaterial);
router.delete('/materials/:id', protect, adminOnly, deleteMaterial);

// Attendance
router.get('/attendance/my', protect, getMyAttendance);
router.get('/attendance', protect, adminOnly, getAllAttendance);
router.post('/attendance', protect, adminOnly, markAttendance);

// Results
router.get('/results/my', protect, getMyResults);
router.get('/results', protect, adminOnly, getAllResults);
router.post('/results', protect, adminOnly, createResult);
router.delete('/results/:id', protect, adminOnly, deleteResult);

// Announcements
router.get('/announcements', getAnnouncements);
router.post('/announcements', protect, adminOnly, createAnnouncement);
router.put('/announcements/:id', protect, adminOnly, updateAnnouncement);
router.delete('/announcements/:id', protect, adminOnly, deleteAnnouncement);

export default router;
