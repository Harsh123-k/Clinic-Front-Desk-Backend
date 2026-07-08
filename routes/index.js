const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const patientRoutes = require('./patientRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/patients', patientRoutes);

module.exports = router;
