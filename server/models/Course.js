import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      enum: ['SSC', 'Banking', 'Railways', 'RBI', 'Other Competitive', 'Special'],
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    whyChoose: [
      {
        type: String,
      },
    ],
    subjects: [
      {
        type: String,
      },
    ],
    eligibility: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    batchTiming: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ['Classroom', 'Online', 'Hybrid', 'Classroom & Online'],
      default: 'Classroom & Online',
    },
    facultyName: {
      type: String,
      default: 'Subject Expert Faculty Panel',
    },
    feeAmount: {
      type: Number,
      default: 0,
    },
    feeDetails: {
      type: String,
      default: 'Contact administration office for current fee structure and installment plans.',
    },
    startDate: {
      type: String,
      default: 'New Batches Starting 1st & 15th of Every Month',
    },
    admissionStatus: {
      type: String,
      enum: ['Admissions Open', 'Upcoming Batch', 'Limited Seats', 'Batch Full'],
      default: 'Admissions Open',
    },
    teachingMethodology: [
      {
        type: String,
      },
    ],
    studyMaterialInfo: {
      type: String,
      default: 'Complete printed modules, previous year question banks with comprehensive solutions, daily practice problem sheets (DPPs).',
    },
    mockTestsInfo: {
      type: String,
      default: 'Weekly sectional tests, full-length computer-based test (CBT) simulations aligned with real exam patterns, and detailed performance analytics.',
    },
    previousQuestionPractice: {
      type: String,
      default: 'Last 10-15 years solved papers, high-yield topic drill sets, and error analysis workshops.',
    },
    doubtClarification: {
      type: String,
      default: 'Dedicated 1-on-1 daily doubt resolution sessions after regular lecture hours with senior subject mentors.',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
