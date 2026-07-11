const doctorService = require('../services/doctorService');
const { success } = require('../utils/response');

/**
 * Register a new Doctor profile
 */
const createDoctor = async (req, res, next) => {
  try {
    const doctor = await doctorService.createDoctor(req.body);
    return success(res, 201, 'Doctor registered successfully', doctor);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieve all Doctor profiles
 */
const getAllDoctors = async (req, res, next) => {
  try {
    const result = await doctorService.getAllDoctors(req.query);
    return success(
      res,
      200,
      'Doctors retrieved successfully',
      result.doctors,
      result.pagination
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get single Doctor profile by ID
 */
const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await doctorService.getDoctorById(req.params.id);
    return success(res, 200, 'Doctor found successfully', doctor);
  } catch (error) {
    if (error.message === 'Doctor profile not found') {
      res.status(404);
    }
    next(error);
  }
};

/**
 * Update Doctor profile details
 */
const updateDoctor = async (req, res, next) => {
  try {
    const doctor = await doctorService.updateDoctor(req.params.id, req.body);
    return success(res, 200, 'Doctor profile updated successfully', doctor);
  } catch (error) {
    if (error.message === 'Doctor profile not found') {
      res.status(404);
    }
    next(error);
  }
};

/**
 * Delete Doctor profile
 */
const deleteDoctor = async (req, res, next) => {
  try {
    await doctorService.deleteDoctor(req.params.id);
    return success(res, 200, 'Doctor profile and account deleted successfully');
  } catch (error) {
    if (error.message === 'Doctor profile not found') {
      res.status(404);
    }
    next(error);
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
