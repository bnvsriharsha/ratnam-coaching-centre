import express from 'express';
import {
  registerStudent,
  loginUser,
  getProfile,
  updateProfile,
  getAllStudents,
  updateStudentByAdmin,
  deleteStudentByAdmin,
} from '../controllers/authController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin Student Management routes
router.get('/students', protect, adminOnly, getAllStudents);
router.put('/students/:id', protect, adminOnly, updateStudentByAdmin);
router.delete('/students/:id', protect, adminOnly, deleteStudentByAdmin);

export default router;
