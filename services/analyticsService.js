const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

/**
 * Get appointment counts breakdown (total, completed, cancelled, pending)
 */
const getAppointmentAnalytics = async (filter) => {
  const stats = await Appointment.aggregate([
    { $match: filter },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  const completed = stats.find((s) => s._id === 'Completed')?.count || 0;
  const cancelled = stats.find((s) => s._id === 'Cancelled')?.count || 0;
  const pending = stats.find((s) => s._id === 'Scheduled')?.count || 0;
  const noShow = stats.find((s) => s._id === 'No Show')?.count || 0;
  const total = completed + cancelled + pending + noShow;

  return {
    total,
    completed,
    cancelled,
    pending,
    noShow,
  };
};

/**
 * Get top visiting patients based on appointment count
 */
const getPatientAnalytics = async (filter) => {
  return await Appointment.aggregate([
    { $match: filter },
    {
      $group: {
        _id: '$patient',
        visitCount: { $sum: 1 },
      },
    },
    { $sort: { visitCount: -1 } },
    { $limit: 10 }, // Limit to top 10 visiting patients
    {
      $lookup: {
        from: 'patients',
        localField: '_id',
        foreignField: '_id',
        as: 'patientDetails',
      },
    },
    { $unwind: '$patientDetails' },
    {
      $project: {
        _id: 0,
        patientId: '$_id',
        visitCount: 1,
        patient: {
          _id: '$patientDetails._id',
          patientId: '$patientDetails.patientId',
          firstName: '$patientDetails.firstName',
          lastName: '$patientDetails.lastName',
          email: '$patientDetails.email',
          phone: '$patientDetails.phone',
        },
      },
    },
  ]);
};

/**
 * Get doctor activity summary and appointment counts
 */
const getDoctorAnalytics = async (filter) => {
  return await Appointment.aggregate([
    { $match: filter },
    {
      $group: {
        _id: '$doctor',
        appointmentCount: { $sum: 1 },
        completedCount: {
          $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] },
        },
        pendingCount: {
          $sum: { $cond: [{ $eq: ['$status', 'Scheduled'] }, 1, 0] },
        },
        cancelledCount: {
          $sum: { $cond: [{ $eq: ['$status', 'Cancelled'] }, 1, 0] },
        },
      },
    },
    {
      $lookup: {
        from: 'doctors',
        localField: '_id',
        foreignField: '_id',
        as: 'doctorDetails',
      },
    },
    { $unwind: '$doctorDetails' },
    {
      $lookup: {
        from: 'users',
        localField: 'doctorDetails.user',
        foreignField: '_id',
        as: 'userDetails',
      },
    },
    { $unwind: '$userDetails' },
    {
      $project: {
        _id: 0,
        doctorId: '$_id',
        appointmentCount: 1,
        completedCount: 1,
        pendingCount: 1,
        cancelledCount: 1,
        doctor: {
          _id: '$doctorDetails._id',
          specialization: '$doctorDetails.specialization',
          licenseNumber: '$doctorDetails.licenseNumber',
          consultationFee: '$doctorDetails.consultationFee',
          fullName: '$userDetails.fullName',
          email: '$userDetails.email',
        },
      },
    },
  ]);
};

module.exports = {
  getAppointmentAnalytics,
  getPatientAnalytics,
  getDoctorAnalytics,
};
