import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
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
    courseName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late', 'Excused'],
      default: 'Present',
    },
    topicCovered: {
      type: String,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
