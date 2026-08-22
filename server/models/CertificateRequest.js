import mongoose from 'mongoose';

const certificateRequestSchema = new mongoose.Schema(
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
    university: {
      type: String,
      required: true,
      trim: true,
    },
    college: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    graduationYear: {
      type: String,
      required: true,
    },
    hallTicketNumber: {
      type: String,
      trim: true,
    },
    certificateRequired: {
      type: String,
      required: true,
      enum: [
        'Degree Certificate (Original / Convocation)',
        'Provisional Certificate (PC)',
        'Consolidated Marks Memo (CMM)',
        'Semester-wise Marks Memos',
        'Transfer Certificate (TC)',
        'Migration Certificate',
        'Study & Conduct Certificate',
        'Duplicate Certificate Assistance',
        'Other Educational Document Assistance',
      ],
    },
    certificateStatus: {
      type: String,
      enum: [
        'SUBMITTED',
        'UNDER REVIEW',
        'DOCUMENTS REQUIRED',
        'APPLICATION PROCESSED',
        'READY FOR COLLECTION',
        'COMPLETED',
        'REJECTED',
      ],
      default: 'SUBMITTED',
    },
    additionalDetails: {
      type: String,
    },
    supportingDocuments: [
      {
        type: String,
      },
    ],
    adminRemarks: {
      type: String,
      default: 'Application received and logged into student assistance tracking system.',
    },
    statusHistory: [
      {
        status: String,
        remarks: String,
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const CertificateRequest = mongoose.model('CertificateRequest', certificateRequestSchema);
export default CertificateRequest;
