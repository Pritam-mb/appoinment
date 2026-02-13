import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    specialization: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    phone: {
      type: String
    },

    workingHours: {
      start: {
        type: String, // "10:00"
        required: true
      },
      end: {
        type: String, // "18:00"
        required: true
      }
    },

    slotDuration: {
      type: Number, // minutes
      default: 30
    },

    daysAvailable: {
      type: [String],
      enum: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata"
    },

    isActive: {
      type: Boolean,
      default: true
    },
    
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
