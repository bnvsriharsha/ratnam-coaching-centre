import StudyMaterial from '../models/StudyMaterial.js';
import Attendance from '../models/Attendance.js';
import Result from '../models/Result.js';
import Announcement from '../models/Announcement.js';
import Admission from '../models/Admission.js';
import CertificateRequest from '../models/CertificateRequest.js';
import Course from '../models/Course.js';
import User from '../models/User.js';

// @desc Get student dashboard summary
// @route GET /api/portal/dashboard
export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user._id;
    const user = await User.findById(studentId);

    // Get attendance stats
    const attendanceRecords = await Attendance.find({ student: studentId });
    const totalDays = attendanceRecords.length;
    const presentDays = attendanceRecords.filter((a) => a.status === 'Present' || a.status === 'Late').length;
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

    // Get recent results
    const results = await Result.find({ student: studentId }).sort({ createdAt: -1 }).limit(5);

    // Get active certificate requests
    const certificateRequests = await CertificateRequest.find({
      $or: [{ userId: studentId }, { email: req.user.email }],
    }).sort({ createdAt: -1 });

    // Get admission applications
    const admissions = await Admission.find({
      $or: [{ userId: studentId }, { email: req.user.email }],
    }).sort({ createdAt: -1 });

    // Get latest announcements
    const announcements = await Announcement.find({
      isActive: true,
      audience: { $in: ['All', 'Registered Students'] },
    })
      .sort({ createdAt: -1 })
      .limit(6);

    // Get study materials for student
    const studyMaterials = await StudyMaterial.find().sort({ createdAt: -1 }).limit(6);

    res.json({
      success: true,
      data: {
        student: {
          id: user._id,
          name: user.name,
          email: user.email,
          studentId: user.studentId,
          phone: user.phone,
          enrolledCourses: user.enrolledCourses,
          schoolClass: user.schoolClass,
          distanceProgram: user.distanceProgram,
        },
        stats: {
          enrolledCoursesCount: user.enrolledCourses?.length || (user.schoolClass ? 1 : 0),
          attendancePercentage,
          totalAttendanceDays: totalDays,
          presentDays,
          testsAttemptedCount: results.length,
          pendingCertificateRequestsCount: certificateRequests.filter(
            (c) => c.certificateStatus !== 'COMPLETED' && c.certificateStatus !== 'REJECTED'
          ).length,
        },
        recentResults: results,
        certificateRequests,
        admissions,
        announcements,
        recentMaterials: studyMaterials,
      },
    });
  } catch (error) {
    console.error('Student dashboard summary error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= STUDY MATERIALS =================
export const getMaterials = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { courseName: { $regex: search, $options: 'i' } },
      ];
    }
    const materials = await StudyMaterial.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: materials.length, materials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createMaterial = async (req, res) => {
  try {
    const { title, category, subject, courseName, description, fileType, downloadUrl, fileSize, isDemo } = req.body;
    if (!title || !category || !subject) {
      return res.status(400).json({ success: false, message: 'Title, category, and subject are required' });
    }
    const material = await StudyMaterial.create({
      title,
      category,
      subject,
      courseName,
      description,
      fileType: fileType || 'PDF',
      downloadUrl: downloadUrl || '#',
      fileSize: fileSize || '2.5 MB',
      uploadedBy: req.user.name || 'Academic Faculty Wing',
      isDemo: isDemo || false,
    });
    res.status(201).json({ success: true, message: 'Study material added successfully', material });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMaterial = async (req, res) => {
  try {
    const updated = await StudyMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Study material not found' });
    res.json({ success: true, message: 'Study material updated', material: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMaterial = async (req, res) => {
  try {
    await StudyMaterial.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Study material deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= ATTENDANCE =================
export const getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.user._id }).sort({ date: -1 });
    const total = records.length;
    const present = records.filter((r) => r.status === 'Present' || r.status === 'Late').length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 100;
    res.json({ success: true, count: total, percentage, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllAttendance = async (req, res) => {
  try {
    const { date, courseName, studentId } = req.query;
    let query = {};
    if (date) query.date = date;
    if (courseName && courseName !== 'All') query.courseName = courseName;
    if (studentId) query.studentId = studentId;

    const records = await Attendance.find(query).sort({ date: -1, createdAt: -1 });
    res.json({ success: true, count: records.length, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAttendance = async (req, res) => {
  try {
    const { studentId, courseName, date, status, topicCovered, remarks } = req.body;
    if (!studentId || !courseName || !date) {
      return res.status(400).json({ success: false, message: 'Student ID, course name, and date are required' });
    }

    const studentUser = await User.findOne({
      $or: [{ _id: studentId.match(/^[0-9a-fA-F]{24}$/) ? studentId : null }, { studentId: studentId }],
    });

    if (!studentUser) {
      return res.status(404).json({ success: false, message: 'Student not found with this ID' });
    }

    // Check if record already exists for this student + course + date
    let record = await Attendance.findOne({
      student: studentUser._id,
      courseName,
      date,
    });

    if (record) {
      record.status = status || record.status;
      record.topicCovered = topicCovered || record.topicCovered;
      record.remarks = remarks || record.remarks;
      await record.save();
    } else {
      record = await Attendance.create({
        student: studentUser._id,
        studentName: studentUser.name,
        studentId: studentUser.studentId || 'RCC-STU-N/A',
        courseName,
        date,
        status: status || 'Present',
        topicCovered,
        remarks,
      });
    }

    res.status(201).json({ success: true, message: 'Attendance recorded successfully', record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= RESULTS =================
export const getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user._id }).sort({ examDate: -1 });
    res.json({ success: true, count: results.length, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllResults = async (req, res) => {
  try {
    const { examTitle, courseName, search } = req.query;
    let query = {};
    if (examTitle) query.examTitle = { $regex: examTitle, $options: 'i' };
    if (courseName && courseName !== 'All') query.courseName = courseName;
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { examTitle: { $regex: search, $options: 'i' } },
      ];
    }

    const results = await Result.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: results.length, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createResult = async (req, res) => {
  try {
    const { studentId, examTitle, courseName, examDate, totalMarks, scoredMarks, rank, sectionWiseScores, feedback, isDemo } =
      req.body;

    if (!studentId || !examTitle || !courseName || totalMarks === undefined || scoredMarks === undefined) {
      return res.status(400).json({ success: false, message: 'Student ID, exam title, course name, and marks are required' });
    }

    const studentUser = await User.findOne({
      $or: [{ _id: studentId.match(/^[0-9a-fA-F]{24}$/) ? studentId : null }, { studentId: studentId }],
    });

    if (!studentUser) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const percentage = Number(((Number(scoredMarks) / Number(totalMarks)) * 100).toFixed(2));

    const result = await Result.create({
      student: studentUser._id,
      studentName: studentUser.name,
      studentId: studentUser.studentId || 'RCC-STU-N/A',
      examTitle,
      courseName,
      examDate: examDate || new Date().toISOString().split('T')[0],
      totalMarks: Number(totalMarks),
      scoredMarks: Number(scoredMarks),
      percentage,
      rank: rank ? Number(rank) : undefined,
      sectionWiseScores: sectionWiseScores || [],
      facultyFeedback: feedback || 'Performance recorded. Continue diligent practice.',
      isDemo: isDemo || false,
    });

    res.status(201).json({ success: true, message: 'Exam result recorded successfully', result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteResult = async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Result record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= ANNOUNCEMENTS =================
export const getAnnouncements = async (req, res) => {
  try {
    const { audience, category } = req.query;
    let query = { isActive: true };
    if (audience && audience !== 'All') {
      query.audience = { $in: ['All', audience] };
    }
    if (category && category !== 'All') {
      query.category = category;
    }
    const announcements = await Announcement.find(query).sort({ priority: -1, createdAt: -1 });
    res.json({ success: true, count: announcements.length, announcements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, category, audience, priority, link } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const announcement = await Announcement.create({
      title,
      content,
      category: category || 'General',
      audience: audience || 'All',
      priority: priority || 'Normal',
      link,
      isActive: true,
    });

    res.status(201).json({ success: true, message: 'Announcement created successfully', announcement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Announcement not found' });
    res.json({ success: true, message: 'Announcement updated successfully', announcement: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
