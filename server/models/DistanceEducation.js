import mongoose from 'mongoose';

const distanceEducationSchema = new mongoose.Schema(
  {
    programName: {
      type: String,
      required: true,
      trim: true,
    },
    degreeLevel: {
      type: String,
      enum: ['Undergraduate', 'Postgraduate', 'Diploma', 'Certificate'],
      required: true,
    },
    university: {
      type: String,
      default: 'Andhra University, Visakhapatnam (School of Distance Education)',
    },
    duration: {
      type: String,
      required: true,
    },
    eligibility: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    servicesOffered: [
      {
        type: String,
      },
    ],
    academicSupport: {
      type: String,
      default: 'Weekend contact classes, syllabus guidance, assignment assistance, and exam preparation sessions.',
    },
    status: {
      type: String,
      enum: ['Guidance Active', 'Admissions Open', 'Enquiry Open'],
      default: 'Guidance Active',
    },
    disclaimer: {
      type: String,
      default: 'Ratnam Coaching Centre acts as a guidance and student support center. Degree conferral and official examinations are handled exclusively by Andhra University.',
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

const DistanceEducation = mongoose.model('DistanceEducation', distanceEducationSchema);
export default DistanceEducation;
