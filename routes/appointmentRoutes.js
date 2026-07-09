const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');

// Protect all appointment routes
router.use(protect);

// Create + Get All
router
  .route('/')
  .post(
    authorize('Admin', 'Receptionist'),
    appointmentController.createAppointment
  )
  .get(
    authorize('Admin', 'Receptionist', 'Doctor'),
    appointmentController.getAllAppointments
  );

// Get + Update + Delete
router
  .route('/:id')
  .get(
    authorize('Admin', 'Receptionist', 'Doctor'),
    appointmentController.getAppointmentById
  )
  .put(
    authorize('Admin', 'Receptionist'),
    appointmentController.updateAppointment
  )
  .delete(
    authorize('Admin'),
    appointmentController.deleteAppointment
  );

// Update Status
router.patch(
  '/:id/status',
  authorize('Admin', 'Receptionist', 'Doctor'),
  appointmentController.updateAppointmentStatus
);

module.exports = router;