import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
      unique: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    parentName: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    address: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    courseInterested: {
      type: String,
      required: true,
    },
    examInterested: {
      type: String,
    },
    preferredBatch: {
      type: String,
      default: 'Morning',
    },
    mode: {
      type: String,
      enum: ['Classroom', 'Online', 'Hybrid'],
      default: 'Classroom',
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ['SUBMITTED', 'UNDER REVIEW', 'APPROVED', 'ENROLLED', 'REJECTED'],
      default: 'SUBMITTED',
    },
    adminRemarks: {
      type: String,
      default: 'Application received and queued for administrative review.',
    },
    assignedStudentId: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Admission = mongoose.model('Admission', admissionSchema);
export default Admission;
