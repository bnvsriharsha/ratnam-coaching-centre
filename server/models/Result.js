import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    examTitle: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    examDate: {
      type: String,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    scoredMarks: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    rank: {
      type: Number,
    },
    sectionWiseScores: [
      {
        section: String,
        scored: Number,
        total: Number,
      },
    ],
    facultyFeedback: {
      type: String,
      default: 'Good performance. Keep practicing speed calculation and accuracy.',
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

const Result = mongoose.model('Result', resultSchema);
export default Result;
