const Invoice = require('../models/Invoice');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

/**
 * Generate invoice from an appointment
 */
const generateInvoice = async (appointmentId, billingData) => {
  // Check if appointment exists
  const appointment = await Appointment.findById(appointmentId)
    .populate('patient')
    .populate('doctor');

  if (!appointment) {
    throw new Error('Appointment not found');
  }

  // Check if invoice already exists for this appointment
  const existingInvoice = await Invoice.findOne({ appointment: appointmentId });
  if (existingInvoice) {
    throw new Error('An invoice has already been generated for this appointment');
  }

  // Fetch doctor to get consultation fee
  const doctor = await Doctor.findById(appointment.doctor);
  if (!doctor) {
    throw new Error('Doctor profile not found for this appointment');
  }

  const consultationCharge = doctor.consultationFee;
  const additionalCharges = parseFloat(billingData.additionalCharges || 0);

  const invoice = new Invoice({
    appointment: appointment._id,
    patient: appointment.patient._id,
    doctor: appointment.doctor._id,
    consultationCharge,
    additionalCharges,
    paymentStatus: billingData.paymentStatus || 'Pending',
    paymentMethod: billingData.paymentMethod,
  });

  const savedInvoice = await invoice.save();

  // Populate references for the final response
  return await Invoice.findById(savedInvoice._id)
    .populate('patient')
    .populate({
      path: 'doctor',
      populate: {
        path: 'user',
        select: 'fullName email phone',
      },
    })
    .populate('appointment');
};

/**
 * Get invoice by ID
 */
const getInvoiceById = async (id) => {
  const invoice = await Invoice.findById(id)
    .populate('patient')
    .populate({
      path: 'doctor',
      populate: {
        path: 'user',
        select: 'fullName email phone',
      },
    })
    .populate('appointment');

  if (!invoice) {
    throw new Error('Invoice not found');
  }

  return invoice;
};

/**
 * Pay invoice (mark as Paid)
 */
const payInvoice = async (id, paymentMethod) => {
  const invoice = await Invoice.findById(id);
  if (!invoice) {
    throw new Error('Invoice not found');
  }

  if (invoice.paymentStatus === 'Paid') {
    throw new Error('Invoice is already paid');
  }

  invoice.paymentStatus = 'Paid';
  invoice.paymentMethod = paymentMethod;

  const savedInvoice = await invoice.save();

  return await Invoice.findById(savedInvoice._id)
    .populate('patient')
    .populate({
      path: 'doctor',
      populate: {
        path: 'user',
        select: 'fullName email phone',
      },
    })
    .populate('appointment');
};

/**
 * Get all invoices with pagination and filters
 */
const getAllInvoices = async (queryParams) => {
  const {
    paymentStatus,
    patient,
    doctor,
    page = 1,
    limit = 10,
  } = queryParams;

  const filter = {};

  if (paymentStatus) {
    filter.paymentStatus = paymentStatus;
  }
  if (patient) {
    filter.patient = patient;
  }
  if (doctor) {
    filter.doctor = doctor;
  }

  // Pagination
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skipNum = (pageNum - 1) * limitNum;

  const [total, invoices] = await Promise.all([
    Invoice.countDocuments(filter),
    Invoice.find(filter)
      .populate('patient')
      .populate({
        path: 'doctor',
        populate: {
          path: 'user',
          select: 'fullName email phone',
        },
      })
      .populate('appointment')
      .sort({ createdAt: -1 })
      .skip(skipNum)
      .limit(limitNum),
  ]);

  return {
    invoices,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
    },
  };
};

module.exports = {
  generateInvoice,
  getInvoiceById,
  payInvoice,
  getAllInvoices,
};
