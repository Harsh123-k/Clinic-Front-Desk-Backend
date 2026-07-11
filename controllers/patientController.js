const patientService = require('../services/patientService');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

/**
 * @desc    Create a new patient
 * @route   POST /api/patients
 * @access  Private (Admin, Receptionist)
 */
const createPatient = async (req, res, next) => {
  try {
    const patient = await patientService.createPatient(req.body);
    res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all patients (with search, pagination, and sorting)
 * @route   GET /api/patients
 * @access  Private (Admin, Receptionist, Doctor)
 */
const getAllPatients = async (req, res, next) => {
  try {
    const queryParams = { ...req.query };

    // If logged-in user is a Doctor, restrict to their own patients
    if (req.user.role === 'Doctor') {
      const doctorProfile = await Doctor.findOne({ user: req.user._id });
      if (!doctorProfile) {
        return res.status(404).json({
          success: false,
          message: 'Doctor profile not found',
        });
      }
      // Get IDs of patients who have appointments with this doctor
      const patientIds = await Appointment.find({ doctor: doctorProfile._id }).distinct('patient');
      queryParams.allowedPatientIds = patientIds.map((id) => id.toString());
    }

    const result = await patientService.getAllPatients(queryParams);
    res.status(200).json({
      success: true,
      message: 'Patients retrieved successfully',
      data: result.patients,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get patient by ID
 * @route   GET /api/patients/:id
 * @access  Private (Admin, Receptionist, Doctor)
 */
const getPatientById = async (req, res, next) => {
  try {
    // If logged-in user is a Doctor, restrict access to their own patients
    if (req.user.role === 'Doctor') {
      const doctorProfile = await Doctor.findOne({ user: req.user._id });
      if (!doctorProfile) {
        return res.status(404).json({
          success: false,
          message: 'Doctor profile not found',
        });
      }
      // Check for any appointment between this doctor and the patient
      const appointmentExists = await Appointment.findOne({
        doctor: doctorProfile._id,
        patient: req.params.id,
      });
      if (!appointmentExists) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this patient (no appointment history)',
        });
      }
    }

    const patient = await patientService.getPatientById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Patient found successfully',
      data: patient,
    });
  } catch (error) {
    if (error.message === 'Patient not found') {
      res.status(404);
    }
    next(error);
  }
};

/**
 * @desc    Update patient details
 * @route   PUT /api/patients/:id
 * @access  Private (Admin, Receptionist)
 */
const updatePatient = async (req, res, next) => {
  try {
    const patient = await patientService.updatePatient(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      data: patient,
    });
  } catch (error) {
    if (error.message === 'Patient not found') {
      res.status(404);
    }
    next(error);
  }
};

/**
 * @desc    Delete patient
 * @route   DELETE /api/patients/:id
 * @access  Private (Admin)
 */
const deletePatient = async (req, res, next) => {
  try {
    await patientService.deletePatient(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Patient deleted successfully',
    });
  } catch (error) {
    if (error.message === 'Patient not found') {
      res.status(404);
    }
    next(error);
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
