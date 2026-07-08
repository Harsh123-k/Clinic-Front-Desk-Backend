const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Emergency contact name is required'],
    trim: true,
  },
  relationship: {
    type: String,
    required: [true, 'Emergency contact relationship is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Emergency contact phone is required'],
    trim: true,
  },
});

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: '{VALUE} is not a valid gender (Male, Female, Other)',
      },
    },
    dob: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    age: {
      type: Number,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    address: {
      type: String,
      trim: true,
    },
    emergencyContact: {
      type: emergencyContactSchema,
      required: [true, 'Emergency contact is required'],
    },
    allergies: {
      type: [String],
      default: [],
    },
    medicalHistory: {
      type: [String],
      default: [],
    },
    currentMedication: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate age and generate patientId
patientSchema.pre('save', function (next) {
  // Calculate Age
  if (this.dob) {
    const today = new Date();
    const birthDate = new Date(this.dob);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    this.age = calculatedAge;
  }

  // Generate Unique patientId if not present
  if (!this.patientId) {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4-digit number
    this.patientId = `PAT-${dateStr}-${randomDigits}`;
  }

  next();
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
