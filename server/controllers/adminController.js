import User from '../models/User.js';
import Course from '../models/Course.js';
import Admission from '../models/Admission.js';
import CertificateRequest from '../models/CertificateRequest.js';
import Faculty from '../models/Faculty.js';
import Achievement from '../models/Achievement.js';
import Testimonial from '../models/Testimonial.js';
import ContactMessage from '../models/ContactMessage.js';
import SiteSetting from '../models/SiteSetting.js';
import Announcement from '../models/Announcement.js';

// @desc Get Admin Dashboard Statistics & Recent Activity
// @route GET /api/admin/dashboard-stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const activeCourses = await Course.countDocuments({ isActive: true });
    const totalAdmissions = await Admission.countDocuments();
    const pendingAdmissions = await Admission.countDocuments({ status: { $in: ['SUBMITTED', 'UNDER REVIEW'] } });
    const totalCertRequests = await CertificateRequest.countDocuments();
    const pendingCertRequests = await CertificateRequest.countDocuments({
      certificateStatus: { $in: ['SUBMITTED', 'UNDER REVIEW', 'DOCUMENTS REQUIRED', 'APPLICATION PROCESSED'] },
    });
    const facultyCount = await Faculty.countDocuments();
    const activeAnnouncements = await Announcement.countDocuments({ isActive: true });
    const unreadMessages = await ContactMessage.countDocuments({ status: 'Unread' });

    // Recent items
    const recentAdmissions = await Admission.find().sort({ createdAt: -1 }).limit(5);
    const recentCertRequests = await CertificateRequest.find().sort({ createdAt: -1 }).limit(5);
    const recentMessages = await ContactMessage.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      stats: {
        totalStudents,
        activeCourses,
        totalAdmissions,
        pendingAdmissions,
        totalCertRequests,
        pendingCertRequests,
        facultyCount,
        activeAnnouncements,
        unreadMessages,
      },
      recentAdmissions,
      recentCertRequests,
      recentMessages,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= SITE SETTINGS & TIMELINE =================
export const getSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create({
        instituteName: 'RATNAM COACHING CENTRE',
        establishedYear: 1998,
        primaryTagline: "Don't Sit Like a Rock, Work Like a Clock.",
        secondaryTagline: 'Building Careers Through Quality Education Since 1998.',
        address: 'Main Road, Bhimavaram, West Godavari District, Andhra Pradesh - 534201, India',
        primaryPhone: 'Contact details will be updated soon',
        email: 'contact@ratnamcoaching.com',
        officeHours: 'Monday – Saturday: 7:00 AM – 8:30 PM | Sunday: 8:00 AM – 1:00 PM',
        timeline: [
          {
            year: '1998',
            title: 'Inception of Ratnam Coaching Centre',
            description: 'Founded with the mission to deliver disciplined competitive examination coaching and school academic excellence.',
          },
        ],
      });
    }
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = new SiteSetting(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    const updated = await settings.save();
    res.json({ success: true, message: 'Site configuration updated successfully', settings: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= ACHIEVEMENTS =================
export const getAchievements = async (req, res) => {
  try {
    const { year, search } = req.query;
    let query = {};
    if (year && year !== 'All') query.year = year;
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { exam: { $regex: search, $options: 'i' } },
        { achievement: { $regex: search, $options: 'i' } },
      ];
    }
    const achievements = await Achievement.find(query).sort({ year: -1, createdAt: -1 });
    res.json({ success: true, count: achievements.length, achievements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createAchievement = async (req, res) => {
  try {
    const { year, exam, studentName, achievement, rank, photo, supportingDoc, isDemo } = req.body;
    if (!year || !exam || !studentName || !achievement) {
      return res.status(400).json({ success: false, message: 'Year, Exam, Student Name, and Achievement are required' });
    }
    const record = await Achievement.create({
      year,
      exam,
      studentName,
      achievement,
      rank,
      photo,
      supportingDoc,
      isVerified: true,
      isDemo: isDemo || false,
    });
    res.status(201).json({ success: true, message: 'Achievement added successfully', achievement: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAchievement = async (req, res) => {
  try {
    const updated = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Achievement not found' });
    res.json({ success: true, message: 'Achievement updated', achievement: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Achievement deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= TESTIMONIALS =================
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, count: testimonials.length, testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { studentName, course, selectedFor, year, message, rating, photo, isDemo } = req.body;
    if (!studentName || !course || !message) {
      return res.status(400).json({ success: false, message: 'Student Name, Course, and Message are required' });
    }
    const testimonial = await Testimonial.create({
      studentName,
      course,
      selectedFor,
      year: year || '2025',
      message,
      rating: rating || 5,
      photo,
      isVerified: true,
      isDemo: isDemo || false,
    });
    res.status(201).json({ success: true, message: 'Testimonial added successfully', testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.json({ success: true, message: 'Testimonial updated', testimonial: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= CONTACT ENQUIRIES =================
export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in Name, Email, Phone, and Message' });
    }
    const msg = await ContactMessage.create({
      name,
      email: email.toLowerCase(),
      phone,
      subject: subject || 'General Enquiry',
      message,
      status: 'Unread',
    });
    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. The administration office will contact you shortly.',
      contactMessage: msg,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== 'All') query.status = status;
    const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const msg = await ContactMessage.findById(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
    if (status) msg.status = status;
    if (adminNotes) msg.adminNotes = adminNotes;
    const updated = await msg.save();
    res.json({ success: true, message: 'Enquiry updated', contactMessage: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteContactMessage = async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
