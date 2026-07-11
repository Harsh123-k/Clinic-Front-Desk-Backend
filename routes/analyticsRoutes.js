const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');

// Protect all routes
router.use(protect);

// Authorize clinic roles
router.use(authorize('Admin', 'Doctor', 'Receptionist'));

// GET /api/analytics/appointments
router.get('/appointments', analyticsController.getAppointmentAnalytics);

// GET /api/analytics/patients
router.get('/patients', analyticsController.getPatientAnalytics);

// GET /api/analytics/doctors
router.get('/doctors', analyticsController.getDoctorAnalytics);

module.exports = router;
