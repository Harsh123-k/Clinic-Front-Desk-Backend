const { body } = require('express-validator');
const { validateResult } = require('../middleware/validator');

const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validateResult,
];

module.exports = {
  validateLogin,
};
