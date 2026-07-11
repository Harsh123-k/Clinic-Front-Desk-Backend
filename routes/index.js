const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const patientRoutes = require('./patientRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const doctorRoutes = require('./doctorRoutes');
const billingRoutes = require('./billingRoutes');
const analyticsRoutes = require('./analyticsRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/patients', patientRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/doctors', doctorRoutes);
router.use('/billing', billingRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;