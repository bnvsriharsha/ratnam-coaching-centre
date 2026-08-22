import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'student'],
      default: 'student',
    },
    phone: {
      type: String,
      trim: true,
    },
    studentId: {
      type: String,
      unique: true,
      sparse: true,
    },
    parentName: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    enrolledCourses: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course',
        },
        courseTitle: String,
        enrolledDate: {
          type: Date,
          default: Date.now,
        },
        batchTiming: String,
        status: {
          type: String,
          enum: ['Active', 'Completed', 'Paused'],
          default: 'Active',
        },
      },
    ],
    schoolClass: {
      type: String,
    },
    distanceProgram: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
