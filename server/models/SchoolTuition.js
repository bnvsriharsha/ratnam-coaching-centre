import mongoose from 'mongoose';

const schoolTuitionSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    classGrade: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    subjects: [
      {
        type: String,
      },
    ],
    dailyTuition: {
      type: Boolean,
      default: true,
    },
    homeworkSupport: {
      type: Boolean,
      default: true,
    },
    doubtClarification: {
      type: Boolean,
      default: true,
    },
    testPracticeSupport: {
      type: Boolean,
      default: true,
    },
    timings: {
      type: String,
      default: '5:00 PM – 7:30 PM (Daily)',
    },
    feeDetails: {
      type: String,
      default: 'Affordable monthly fee structure. Contact office for details.',
    },
    batchCapacity: {
      type: Number,
      default: 20,
    },
    currentEnrollment: {
      type: Number,
      default: 0,
    },
    assignedTeachers: {
      type: String,
      default: 'Dedicated School Academic Mentors',
    },
    status: {
      type: String,
      enum: ['Admissions Open', 'Limited Seats', 'Batch Full'],
      default: 'Admissions Open',
    },
    description: {
      type: String,
      default: 'Comprehensive academic coaching, daily concept building, homework monitoring, and weekly syllabus-oriented test series for school excellence.',
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

const SchoolTuition = mongoose.model('SchoolTuition', schoolTuitionSchema);
export default SchoolTuition;
