import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    exam: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    achievement: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
    },
    photo: {
      type: String,
      default: '',
    },
    supportingDoc: {
      type: String,
      default: '',
    },
    isVerified: {
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

const Achievement = mongoose.model('Achievement', achievementSchema);
export default Achievement;
