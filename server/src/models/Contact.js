import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      minlength: [3, 'Subject must be at least 3 characters long'],
      maxlength: [150, 'Subject cannot exceed 150 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters long'],
      maxlength: [3000, 'Message cannot exceed 3000 characters'],
    },
    ipAddress: {
      type: String,
      default: 'Unknown',
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    emailError: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = mongoose.model('Contact', contactSchema);

// Fallback in-memory store if MongoDB is not running locally during demonstration
export const inMemoryContacts = [];
