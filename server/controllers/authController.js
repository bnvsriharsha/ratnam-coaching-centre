import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'ratnam_coaching_centre_secret_key_1998_bhimavaram_secure_jwt',
    { expiresIn: '30d' }
  );
};

// @desc Register a new student
// @route POST /api/auth/register
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, phone, parentName, address, courseInterested, schoolClass, distanceProgram } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const studentCount = await User.countDocuments({ role: 'student' });
    const currentYear = new Date().getFullYear();
    const studentId = `RCC-STU-${currentYear}-${String(studentCount + 1).padStart(4, '0')}`;

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'student',
      phone,
      studentId,
      parentName,
      address,
      schoolClass,
      distanceProgram,
    });

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        phone: user.phone,
        parentName: user.parentName,
        address: user.address,
        schoolClass: user.schoolClass,
        distanceProgram: user.distanceProgram,
      },
    });
  } catch (error) {
    console.error('Register student error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during registration' });
  }
};

// @desc Login user (student or admin)
// @route POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password, requiredRole } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please check your email.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Your account is deactivated. Please contact administration.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password. Please try again.' });
    }

    if (requiredRole && user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: `Unauthorized access: This portal is strictly for ${requiredRole} accounts.`,
      });
    }

    res.json({
      success: true,
      message: 'Logged in successfully',
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        phone: user.phone,
        parentName: user.parentName,
        address: user.address,
        enrolledCourses: user.enrolledCourses,
        schoolClass: user.schoolClass,
        distanceProgram: user.distanceProgram,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during login' });
  }
};

// @desc Get logged-in user profile
// @route GET /api/auth/profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update student profile
// @route PUT /api/auth/profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.parentName = req.body.parentName || user.parentName;
    user.address = req.body.address || user.address;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        studentId: updatedUser.studentId,
        phone: updatedUser.phone,
        parentName: updatedUser.parentName,
        address: updatedUser.address,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all students (Admin only)
// @route GET /api/auth/students
export const getAllStudents = async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = { role: 'student' };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    if (status !== undefined && status !== 'all') {
      query.isActive = status === 'active';
    }

    const students = await User.find(query).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: students.length, students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update student by Admin
// @route PUT /api/auth/students/:id
export const updateStudentByAdmin = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student || student.role !== 'student') {
      return res.status(404).json({ success: false, message: 'Student record not found' });
    }

    if (req.body.name) student.name = req.body.name;
    if (req.body.phone) student.phone = req.body.phone;
    if (req.body.parentName) student.parentName = req.body.parentName;
    if (req.body.address) student.address = req.body.address;
    if (req.body.schoolClass) student.schoolClass = req.body.schoolClass;
    if (req.body.distanceProgram) student.distanceProgram = req.body.distanceProgram;
    if (req.body.isActive !== undefined) student.isActive = req.body.isActive;
    if (req.body.enrolledCourses) student.enrolledCourses = req.body.enrolledCourses;

    if (req.body.password) {
      student.password = req.body.password;
    }

    const updated = await student.save();
    res.json({ success: true, message: 'Student updated successfully', student: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete student by Admin
// @route DELETE /api/auth/students/:id
export const deleteStudentByAdmin = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student || student.role !== 'student') {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
