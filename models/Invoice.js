const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
      trim: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: [true, 'Appointment reference is required'],
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient reference is required'],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'Doctor reference is required'],
    },
    consultationCharge: {
      type: Number,
      required: [true, 'Consultation charge is required'],
      min: [0, 'Consultation charge cannot be negative'],
    },
    additionalCharges: {
      type: Number,
      default: 0,
      min: [0, 'Additional charges cannot be negative'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount cannot be negative'],
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['Pending', 'Paid'],
        message: '{VALUE} is not a valid payment status (Pending, Paid)',
      },
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ['Cash', 'UPI', 'Card'],
        message: '{VALUE} is not a valid payment method (Cash, UPI, Card)',
      },
      required: function () {
        return this.paymentStatus === 'Paid';
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-validate hook to generate invoiceNumber and calculate totalAmount
invoiceSchema.pre('validate', function (next) {
  // Generate Unique invoiceNumber if not present
  if (!this.invoiceNumber) {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const randomDigits = Math.floor(10000 + Math.random() * 90000); // 5-digit number
    this.invoiceNumber = `INV-${dateStr}-${randomDigits}`;
  }

  // Calculate totalAmount
  if (this.consultationCharge !== undefined && this.additionalCharges !== undefined) {
    this.totalAmount = this.consultationCharge + this.additionalCharges;
  }

  next();
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
