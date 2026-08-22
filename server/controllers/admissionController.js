import Admission from '../models/Admission.js';
import User from '../models/User.js';

// Helper to generate next unique Admission ID
const generateAdmissionId = async () => {
  const currentYear = new Date().getFullYear();
  const count = await Admission.countDocuments();
  return `RCC-ADM-${currentYear}-${String(count + 1).padStart(5, '0')}`;
};

// @desc Submit online admission form
// @route POST /api/admissions
export const submitAdmission = async (req, res) => {
  try {
    const {
      studentName,
      parentName,
      mobile,
      email,
      dob,
      gender,
      address,
      qualification,
      courseInterested,
      examInterested,
      preferredBatch,
      mode,
      message,
    } = req.body;

    if (!studentName || !parentName || !mobile || !email || !address || !qualification || !courseInterested) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: Name, Parent Name, Mobile, Email, Address, Qualification, and Course Interested.',
      });
    }

    const applicationId = await generateAdmissionId();

    // Check if user is logged in
    let userId = null;
    if (req.user) {
      userId = req.user._id;
    } else {
      // Find existing user with matching email
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        userId = existing._id;
      }
    }

    const admission = await Admission.create({
      applicationId,
      studentName,
      parentName,
      mobile,
      email: email.toLowerCase(),
      dob,
      gender,
      address,
      qualification,
      courseInterested,
      examInterested,
      preferredBatch: preferredBatch || 'Morning',
      mode: mode || 'Classroom',
      message,
      status: 'SUBMITTED',
      adminRemarks: 'Admission application received and queued for administrative review.',
      userId,
    });

    res.status(201).json({
      success: true,
      message: 'Your admission application has been submitted successfully.',
      applicationId: admission.applicationId,
      admission,
    });
  } catch (error) {
    console.error('Admission submission error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error submitting admission application' });
  }
};

// @desc Track admission application status
// @route POST /api/admissions/track
export const trackAdmission = async (req, res) => {
  try {
    const { applicationId, mobile } = req.body;

    if (!applicationId || !mobile) {
      return res.status(400).json({ success: false, message: 'Please provide Application ID and Mobile number' });
    }

    const cleanAppId = applicationId.trim().toUpperCase();
    const cleanMobile = mobile.trim();

    const admission = await Admission.findOne({
      applicationId: cleanAppId,
      mobile: { $regex: cleanMobile.slice(-10) },
    });

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'No admission record found matching this Application ID and Mobile number. Please verify details.',
      });
    }

    res.json({ success: true, admission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get student's own admissions (Logged-in Student)
// @route GET /api/admissions/my-admissions
export const getMyAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find({
      $or: [{ userId: req.user._id }, { email: req.user.email }],
    }).sort({ createdAt: -1 });

    res.json({ success: true, count: admissions.length, admissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all admissions (Admin)
// @route GET /api/admissions
export const getAllAdmissions = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.status = status.toUpperCase();
    }

    if (search) {
      query.$or = [
        { applicationId: { $regex: search, $options: 'i' } },
        { studentName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { courseInterested: { $regex: search, $options: 'i' } },
      ];
    }

    const admissions = await Admission.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: admissions.length, admissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update admission status and remarks (Admin)
// @route PUT /api/admissions/:id
export const updateAdmissionStatus = async (req, res) => {
  try {
    const { status, adminRemarks, assignedStudentId } = req.body;
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({ success: false, message: 'Admission application not found' });
    }

    if (status) admission.status = status;
    if (adminRemarks) admission.adminRemarks = adminRemarks;
    if (assignedStudentId) admission.assignedStudentId = assignedStudentId;

    const updated = await admission.save();
    res.json({ success: true, message: 'Admission application updated successfully', admission: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete admission (Admin)
// @route DELETE /api/admissions/:id
export const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ success: false, message: 'Admission application not found' });
    }

    await Admission.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Admission application deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
