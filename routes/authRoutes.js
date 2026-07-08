const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin } = require('../validators/authValidator');

// POST /api/auth/login
router.post('/login', validateLogin, authController.login);

module.exports = router;
