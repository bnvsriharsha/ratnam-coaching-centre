import Course from '../models/Course.js';

// @desc Get all courses with optional category filter
// @route GET /api/courses
export const getCourses = async (req, res) => {
  try {
    const { category, search, includeInactive } = req.query;
    let query = {};

    if (!includeInactive) {
      query.isActive = true;
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { subjects: { $elemMatch: { $regex: search, $options: 'i' } } },
      ];
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: courses.length, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get course by slug or ID
// @route GET /api/courses/:idOrSlug
export const getCourseBySlugOrId = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let course;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      course = await Course.findById(idOrSlug);
    }

    if (!course) {
      course = await Course.findOne({ slug: idOrSlug.toLowerCase() });
    }

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create new course (Admin only)
// @route POST /api/courses
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      category,
      shortDescription,
      overview,
      whyChoose,
      subjects,
      eligibility,
      duration,
      batchTiming,
      mode,
      facultyName,
      feeAmount,
      feeDetails,
      startDate,
      admissionStatus,
      teachingMethodology,
      studyMaterialInfo,
      mockTestsInfo,
      previousQuestionPractice,
      doubtClarification,
      isFeatured,
      isDemo,
    } = req.body;

    if (!title || !category || !shortDescription || !overview || !eligibility || !duration || !batchTiming) {
      return res.status(400).json({ success: false, message: 'Please provide all mandatory course fields.' });
    }

    // Generate unique slug
    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    let slug = baseSlug;
    let counter = 1;
    while (await Course.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const course = await Course.create({
      title,
      slug,
      category,
      shortDescription,
      overview,
      whyChoose: Array.isArray(whyChoose) ? whyChoose : whyChoose ? [whyChoose] : [],
      subjects: Array.isArray(subjects) ? subjects : subjects ? subjects.split(',').map((s) => s.trim()) : [],
      eligibility,
      duration,
      batchTiming,
      mode: mode || 'Classroom & Online',
      facultyName: facultyName || 'Subject Expert Faculty Panel',
      feeAmount: feeAmount || 0,
      feeDetails: feeDetails || 'Contact office for fee structure.',
      startDate: startDate || 'New Batches Starting 1st & 15th of Every Month',
      admissionStatus: admissionStatus || 'Admissions Open',
      teachingMethodology: Array.isArray(teachingMethodology) ? teachingMethodology : [],
      studyMaterialInfo,
      mockTestsInfo,
      previousQuestionPractice,
      doubtClarification,
      isFeatured: isFeatured || false,
      isDemo: isDemo || false,
      isActive: true,
    });

    res.status(201).json({ success: true, message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update course (Admin only)
// @route PUT /api/courses/:id
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, message: 'Course updated successfully', course: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete course (Admin only)
// @route DELETE /api/courses/:id
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
