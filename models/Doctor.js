const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      trim: true,
    },
    licenseNumber: {
      type: String,
      required: [true, 'License number is required'],
      unique: true,
      trim: true,
    },
    experienceYears: {
      type: Number,
      min: [0, 'Experience cannot be negative'],
    },
    consultationFee: {
      type: Number,
      required: [true, 'Consultation fee is required'],
      min: [0, 'Consultation fee cannot be negative'],
    },
    availableDays: {
  type: [String],
  default: [],
},

startTime: {
  type: String,
  default: "09:00",
},

endTime: {
  type: String,
  default: "17:00",
},

slotDuration: {
  type: Number,
  default: 30,
},

isAvailable: {
  type: Boolean,
  default: true,
},
    bio: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
