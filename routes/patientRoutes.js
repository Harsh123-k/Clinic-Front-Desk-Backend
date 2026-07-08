const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/auth');
const {
  validateCreatePatient,
  validateUpdatePatient,
  validatePatientId,
} = require('../validators/patientValidator');

// Protect all routes under /api/patients
router.use(protect);

// POST /api/patients - Register new patient (Admin, Receptionist)
// GET /api/patients - Get all patients / Search (Admin, Receptionist, Doctor)
router
  .route('/')
  .post(authorize('Admin', 'Receptionist'), validateCreatePatient, patientController.createPatient)
  .get(authorize('Admin', 'Receptionist', 'Doctor'), patientController.getAllPatients);

// GET /api/patients/:id - View single patient (Admin, Receptionist, Doctor)
// PUT /api/patients/:id - Update patient (Admin, Receptionist)
// DELETE /api/patients/:id - Delete patient (Admin only)
router
  .route('/:id')
  .get(authorize('Admin', 'Receptionist', 'Doctor'), validatePatientId, patientController.getPatientById)
  .put(authorize('Admin', 'Receptionist'), validateUpdatePatient, patientController.updatePatient)
  .delete(authorize('Admin'), validatePatientId, patientController.deletePatient);

module.exports = router;
