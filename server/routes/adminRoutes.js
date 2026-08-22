import express from 'express';
import {
  getDashboardStats,
  getSiteSettings,
  updateSiteSettings,
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  submitContactMessage,
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Dashboard overview
router.get('/dashboard-stats', protect, adminOnly, getDashboardStats);

// Site Settings (Public GET, Admin PUT)
router.get('/settings', getSiteSettings);
router.put('/settings', protect, adminOnly, updateSiteSettings);

// Achievements (Public GET, Admin CRUD)
router.get('/achievements', getAchievements);
router.post('/achievements', protect, adminOnly, createAchievement);
router.put('/achievements/:id', protect, adminOnly, updateAchievement);
router.delete('/achievements/:id', protect, adminOnly, deleteAchievement);

// Testimonials (Public GET, Admin CRUD)
router.get('/testimonials', getTestimonials);
router.post('/testimonials', protect, adminOnly, createTestimonial);
router.put('/testimonials/:id', protect, adminOnly, updateTestimonial);
router.delete('/testimonials/:id', protect, adminOnly, deleteTestimonial);

// Contact messages
router.post('/contact', submitContactMessage);
router.get('/contact-messages', protect, adminOnly, getContactMessages);
router.put('/contact-messages/:id', protect, adminOnly, updateContactStatus);
router.delete('/contact-messages/:id', protect, adminOnly, deleteContactMessage);

export default router;
