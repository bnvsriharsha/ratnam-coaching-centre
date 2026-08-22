import Faculty from '../models/Faculty.js';

// @desc Get all faculty members
// @route GET /api/faculty
export const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({ createdAt: 1 });
    res.json({ success: true, count: faculty.length, faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create faculty member (Admin)
// @route POST /api/faculty
export const createFaculty = async (req, res) => {
  try {
    const { name, designation, qualification, subject, specialization, experience, coursesHandled, bio, photo, status, isDemo } =
      req.body;

    if (!name || !designation || !qualification || !subject || !experience) {
      return res.status(400).json({ success: false, message: 'Please provide all mandatory faculty fields' });
    }

    const faculty = await Faculty.create({
      name,
      designation,
      qualification,
      subject,
      specialization,
      experience,
      coursesHandled: Array.isArray(coursesHandled)
        ? coursesHandled
        : coursesHandled
        ? coursesHandled.split(',').map((c) => c.trim())
        : [],
      bio,
      photo,
      status: status || 'Active',
      isDemo: isDemo || false,
    });

    res.status(201).json({ success: true, message: 'Faculty profile created successfully', faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update faculty member (Admin)
// @route PUT /api/faculty/:id
export const updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' });
    }

    const updated = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, message: 'Faculty profile updated successfully', faculty: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete faculty member (Admin)
// @route DELETE /api/faculty/:id
export const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' });
    }

    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Faculty profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
