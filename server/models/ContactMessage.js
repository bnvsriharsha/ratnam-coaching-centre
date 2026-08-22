import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
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
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      default: 'General Enquiry',
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Unread', 'Read', 'Contacted', 'Closed'],
      default: 'Unread',
    },
    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;
