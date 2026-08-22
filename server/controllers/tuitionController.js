import SchoolTuition from '../models/SchoolTuition.js';

// @desc Get all school tuition classes (1-10)
// @route GET /api/tuitions
export const getTuitions = async (req, res) => {
  try {
    const tuitions = await SchoolTuition.find().sort({ classGrade: 1 });
    res.json({ success: true, count: tuitions.length, tuitions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single class tuition details
// @route GET /api/tuitions/:idOrGrade
export const getTuitionByIdOrGrade = async (req, res) => {
  try {
    const { idOrGrade } = req.params;
    let tuition;

    if (idOrGrade.match(/^[0-9a-fA-F]{24}$/)) {
      tuition = await SchoolTuition.findById(idOrGrade);
    } else {
      tuition = await SchoolTuition.findOne({
        $or: [{ classGrade: Number(idOrGrade) }, { className: new RegExp(idOrGrade, 'i') }],
      });
    }

    if (!tuition) {
      return res.status(404).json({ success: false, message: 'Class tuition not found' });
    }

    res.json({ success: true, tuition });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create or init tuition class (Admin)
// @route POST /api/tuitions
export const createTuition = async (req, res) => {
  try {
    const { className, classGrade, subjects, timings, feeDetails, batchCapacity, assignedTeachers, status, description, isDemo } =
      req.body;

    const existing = await SchoolTuition.findOne({ classGrade });
    if (existing) {
      return res.status(400).json({ success: false, message: `Tuition class for grade ${classGrade} already exists` });
    }

    const tuition = await SchoolTuition.create({
      className,
      classGrade,
      subjects: Array.isArray(subjects) ? subjects : subjects ? subjects.split(',').map((s) => s.trim()) : [],
      timings: timings || '5:00 PM – 7:30 PM (Daily)',
      feeDetails: feeDetails || 'Contact office for fee details.',
      batchCapacity: batchCapacity || 20,
      assignedTeachers: assignedTeachers || 'Dedicated School Academic Mentors',
      status: status || 'Admissions Open',
      description,
      isDemo: isDemo || false,
      isActive: true,
    });

    res.status(201).json({ success: true, message: 'Class tuition created successfully', tuition });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update tuition class (Admin)
// @route PUT /api/tuitions/:id
export const updateTuition = async (req, res) => {
  try {
    const tuition = await SchoolTuition.findById(req.params.id);
    if (!tuition) {
      return res.status(404).json({ success: false, message: 'Class tuition record not found' });
    }

    const updated = await SchoolTuition.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, message: 'Class tuition updated successfully', tuition: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete tuition class (Admin)
// @route DELETE /api/tuitions/:id
export const deleteTuition = async (req, res) => {
  try {
    const tuition = await SchoolTuition.findById(req.params.id);
    if (!tuition) {
      return res.status(404).json({ success: false, message: 'Class tuition not found' });
    }

    await SchoolTuition.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Class tuition deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
