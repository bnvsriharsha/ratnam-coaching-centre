import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
    },
    experience: {
      type: String,
      required: true,
    },
    coursesHandled: [
      {
        type: String,
      },
    ],
    bio: {
      type: String,
      default: 'Experienced educator committed to student success, disciplined learning, and rigorous conceptual clarity.',
    },
    photo: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Active', 'Visiting', 'On Leave'],
      default: 'Active',
    },
    isPlaceholder: {
      type: Boolean,
      default: false,
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

const Faculty = mongoose.model('Faculty', facultySchema);
export default Faculty;
