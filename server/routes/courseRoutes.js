import express from 'express';
import {
  getCourses,
  getCourseBySlugOrId,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/:idOrSlug', getCourseBySlugOrId);

// Admin course management
router.post('/', protect, adminOnly, createCourse);
router.put('/:id', protect, adminOnly, updateCourse);
router.delete('/:id', protect, adminOnly, deleteCourse);

export default router;
