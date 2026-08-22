import mongoose from 'mongoose';

const studyMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Competitive Exams', 'School Tuitions', 'Distance Education', 'General Aptitude'],
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
    },
    description: {
      type: String,
    },
    fileType: {
      type: String,
      enum: ['PDF', 'Document', 'Notes', 'Practice Paper', 'Answer Key'],
      default: 'PDF',
    },
    downloadUrl: {
      type: String,
      default: '#',
    },
    uploadedBy: {
      type: String,
      default: 'Academic Faculty Wing',
    },
    fileSize: {
      type: String,
      default: '2.4 MB',
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

const StudyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);
export default StudyMaterial;
