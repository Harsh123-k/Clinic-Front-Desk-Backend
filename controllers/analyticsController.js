const analyticsService = require('../services/analyticsService');
const Doctor = require('../models/Doctor');
const { success } = require('../utils/response');

/**
 * Helper to build analytics query filter based on role.
 * Doctors are limited to their own ID. Admin and Receptionist have full access.
 */
const getFilterForUser = async (req) => {
  const filter = {};
  if (req.user.role === 'Doctor') {
    const doctorProfile = await Doctor.findOne({ user: req.user._id });
    if (!doctorProfile) {
      throw new Error('Doctor profile not found');
    }
    filter.doctor = doctorProfile._id;
  }
  return filter;
};

/**
 * Get appointment status counts
 */
const getAppointmentAnalytics = async (req, res, next) => {
  try {
    const filter = await getFilterForUser(req);
    const data = await analyticsService.getAppointmentAnalytics(filter);
    return success(res, 200, 'Appointment analytics retrieved successfully', data);
  } catch (error) {
    if (error.message === 'Doctor profile not found') {
      res.status(404);
    }
    next(error);
  }
};

/**
 * Get top patients by visit count
 */
const getPatientAnalytics = async (req, res, next) => {
  try {
    const filter = await getFilterForUser(req);
    const data = await analyticsService.getPatientAnalytics(filter);
    return success(res, 200, 'Patient analytics retrieved successfully', data);
  } catch (error) {
    if (error.message === 'Doctor profile not found') {
      res.status(404);
    }
    next(error);
  }
};

/**
 * Get doctor activity breakdown
 */
const getDoctorAnalytics = async (req, res, next) => {
  try {
    const filter = await getFilterForUser(req);
    const data = await analyticsService.getDoctorAnalytics(filter);
    return success(res, 200, 'Doctor analytics retrieved successfully', data);
  } catch (error) {
    if (error.message === 'Doctor profile not found') {
      res.status(404);
    }
    next(error);
  }
};

module.exports = {
  getAppointmentAnalytics,
  getPatientAnalytics,
  getDoctorAnalytics,
};
