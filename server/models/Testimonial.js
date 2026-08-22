import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    selectedFor: {
      type: String,
    },
    year: {
      type: String,
      default: '2025',
    },
    message: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    photo: {
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

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
