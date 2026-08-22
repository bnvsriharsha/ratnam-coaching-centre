import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['General', 'Exam Alert', 'Batch Notification', 'Holiday', 'Distance Education', 'Certificate Notice', 'Urgent'],
      default: 'General',
    },
    audience: {
      type: String,
      enum: ['All', 'Competitive Exams', 'School Tuitions', 'Distance Education', 'Registered Students'],
      default: 'All',
    },
    priority: {
      type: String,
      enum: ['Normal', 'High', 'Urgent'],
      default: 'Normal',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;
