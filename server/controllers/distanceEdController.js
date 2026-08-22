import DistanceEducation from '../models/DistanceEducation.js';

// @desc Get all distance education programs
// @route GET /api/distance-education
export const getDistancePrograms = async (req, res) => {
  try {
    const { level } = req.query;
    let query = { isActive: true };

    if (level && level !== 'All') {
      query.degreeLevel = level;
    }

    const programs = await DistanceEducation.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: programs.length, programs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single distance education program
// @route GET /api/distance-education/:id
export const getDistanceProgramById = async (req, res) => {
  try {
    const program = await DistanceEducation.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Distance education program not found' });
    }
    res.json({ success: true, program });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create distance education program (Admin)
// @route POST /api/distance-education
export const createDistanceProgram = async (req, res) => {
  try {
    const {
      programName,
      degreeLevel,
      university,
      duration,
      eligibility,
      overview,
      servicesOffered,
      academicSupport,
      status,
      disclaimer,
      isDemo,
    } = req.body;

    if (!programName || !degreeLevel || !duration || !eligibility || !overview) {
      return res.status(400).json({ success: false, message: 'Please provide all required program fields' });
    }

    const program = await DistanceEducation.create({
      programName,
      degreeLevel,
      university: university || 'Andhra University, Visakhapatnam (School of Distance Education)',
      duration,
      eligibility,
      overview,
      servicesOffered: Array.isArray(servicesOffered)
        ? servicesOffered
        : servicesOffered
        ? servicesOffered.split(',').map((s) => s.trim())
        : [
            'Admission process & document guidance',
            'Application form filling assistance',
            'University communications & assignment tracking',
            'Exam hall ticket and center guidance',
          ],
      academicSupport,
      status: status || 'Guidance Active',
      disclaimer,
      isDemo: isDemo || false,
      isActive: true,
    });

    res.status(201).json({ success: true, message: 'Distance education program created successfully', program });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update distance education program (Admin)
// @route PUT /api/distance-education/:id
export const updateDistanceProgram = async (req, res) => {
  try {
    const program = await DistanceEducation.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    const updated = await DistanceEducation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, message: 'Program updated successfully', program: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete distance education program (Admin)
// @route DELETE /api/distance-education/:id
export const deleteDistanceProgram = async (req, res) => {
  try {
    const program = await DistanceEducation.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    await DistanceEducation.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Program deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
