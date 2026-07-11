const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');
const {
  validateCreateDoctor,
  validateUpdateDoctor,
  validateDoctorId,
} = require('../validators/doctorValidator');
const Doctor = require('../models/Doctor');

// Protect all routes
router.use(protect);

// Custom middleware to check if Admin, or Doctor modifying their own profile
const authorizeDoctorUpdate = async (req, res, next) => {
  try {
    if (req.user.role === 'Admin') {
      return next();
    }
    if (req.user.role === 'Doctor') {
      const doctorProfile = await Doctor.findOne({ user: req.user._id });
      if (doctorProfile && doctorProfile._id.toString() === req.params.id) {
        return next();
      }
    }
    return res.status(403).json({
      success: false,
      message: 'Not authorized to modify this doctor profile',
    });
  } catch (error) {
    next(error);
  }
};

// GET all doctors / POST register doctor
router
  .route('/')
  .post(authorize('Admin'), validateCreateDoctor, doctorController.createDoctor)
  .get(authorize('Admin', 'Receptionist', 'Doctor'), doctorController.getAllDoctors);

// GET / PUT / DELETE single doctor profile
router
  .route('/:id')
  .get(authorize('Admin', 'Receptionist', 'Doctor'), validateDoctorId, doctorController.getDoctorById)
  .put(authorize('Admin', 'Doctor'), authorizeDoctorUpdate, validateUpdateDoctor, doctorController.updateDoctor)
  .delete(authorize('Admin'), validateDoctorId, doctorController.deleteDoctor);

module.exports = router;
