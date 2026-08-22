import CertificateRequest from '../models/CertificateRequest.js';
import User from '../models/User.js';

// Helper to generate next unique Certificate Request ID
const generateCertificateId = async () => {
  const currentYear = new Date().getFullYear();
  const count = await CertificateRequest.countDocuments();
  return `RCC-CERT-${currentYear}-${String(count + 1).padStart(5, '0')}`;
};

// @desc Submit certificate assistance request
// @route POST /api/certificates
export const submitCertificateRequest = async (req, res) => {
  try {
    const {
      studentName,
      mobile,
      email,
      university,
      college,
      course,
      graduationYear,
      hallTicketNumber,
      certificateRequired,
      additionalDetails,
      supportingDocuments,
    } = req.body;

    if (
      !studentName ||
      !mobile ||
      !email ||
      !university ||
      !college ||
      !course ||
      !graduationYear ||
      !certificateRequired
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all mandatory details including University, College, Course, Graduation Year, and Certificate Type.',
      });
    }

    const applicationId = await generateCertificateId();

    let userId = null;
    if (req.user) {
      userId = req.user._id;
    } else {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        userId = existing._id;
      }
    }

    const initialRemark = 'Your certificate assistance request has been submitted successfully and logged into our verification queue.';

    const certRequest = await CertificateRequest.create({
      applicationId,
      studentName,
      mobile,
      email: email.toLowerCase(),
      university,
      college,
      course,
      graduationYear,
      hallTicketNumber,
      certificateRequired,
      certificateStatus: 'SUBMITTED',
      additionalDetails,
      supportingDocuments: supportingDocuments || [],
      adminRemarks: initialRemark,
      statusHistory: [
        {
          status: 'SUBMITTED',
          remarks: initialRemark,
          updatedAt: new Date(),
        },
      ],
      userId,
    });

    res.status(201).json({
      success: true,
      message: 'Your certificate assistance request has been submitted successfully.',
      applicationId: certRequest.applicationId,
      certificateRequest: certRequest,
    });
  } catch (error) {
    console.error('Certificate request submission error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error submitting certificate request' });
  }
};

// @desc Track certificate request status by ID and Mobile
// @route POST /api/certificates/track
export const trackCertificateRequest = async (req, res) => {
  try {
    const { applicationId, mobile } = req.body;

    if (!applicationId || !mobile) {
      return res.status(400).json({ success: false, message: 'Please provide both Application ID and Mobile number' });
    }

    const cleanAppId = applicationId.trim().toUpperCase();
    const cleanMobile = mobile.trim();

    const certRequest = await CertificateRequest.findOne({
      applicationId: cleanAppId,
      mobile: { $regex: cleanMobile.slice(-10) },
    });

    if (!certRequest) {
      return res.status(404).json({
        success: false,
        message: 'No certificate request record found for the provided Application ID and Mobile number. Please verify and retry.',
      });
    }

    res.json({ success: true, certificateRequest: certRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get student's own certificate requests (Logged-in Student)
// @route GET /api/certificates/my-requests
export const getMyCertificateRequests = async (req, res) => {
  try {
    const requests = await CertificateRequest.find({
      $or: [{ userId: req.user._id }, { email: req.user.email }],
    }).sort({ createdAt: -1 });

    res.json({ success: true, count: requests.length, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all certificate requests (Admin)
// @route GET /api/certificates
export const getAllCertificateRequests = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.certificateStatus = status.toUpperCase();
    }

    if (search) {
      query.$or = [
        { applicationId: { $regex: search, $options: 'i' } },
        { studentName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { university: { $regex: search, $options: 'i' } },
        { certificateRequired: { $regex: search, $options: 'i' } },
      ];
    }

    const requests = await CertificateRequest.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: requests.length, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update certificate request status and admin remarks (Admin)
// @route PUT /api/certificates/:id
export const updateCertificateStatus = async (req, res) => {
  try {
    const { certificateStatus, adminRemarks } = req.body;
    const certRequest = await CertificateRequest.findById(req.params.id);

    if (!certRequest) {
      return res.status(404).json({ success: false, message: 'Certificate request not found' });
    }

    const newStatus = certificateStatus || certRequest.certificateStatus;
    const newRemarks = adminRemarks || certRequest.adminRemarks;

    certRequest.certificateStatus = newStatus;
    certRequest.adminRemarks = newRemarks;

    certRequest.statusHistory.push({
      status: newStatus,
      remarks: newRemarks,
      updatedAt: new Date(),
    });

    const updated = await certRequest.save();
    res.json({ success: true, message: 'Certificate request updated successfully', certificateRequest: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete certificate request (Admin)
// @route DELETE /api/certificates/:id
export const deleteCertificateRequest = async (req, res) => {
  try {
    const certRequest = await CertificateRequest.findById(req.params.id);
    if (!certRequest) {
      return res.status(404).json({ success: false, message: 'Certificate request not found' });
    }

    await CertificateRequest.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Certificate request deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
