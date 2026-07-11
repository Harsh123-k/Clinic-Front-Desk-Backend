const { body, param } = require('express-validator');
const { validateResult } = require('../middleware/validator');

const validateCreateDoctor = [
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required')
    .trim(),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone')
    .optional({ checkFalsy: true })
    .trim(),
  body('specialization')
    .notEmpty()
    .withMessage('Specialization is required')
    .trim(),
  body('licenseNumber')
    .notEmpty()
    .withMessage('License number is required')
    .trim(),
  body('experienceYears')
    .optional({ checkFalsy: true })
    .isInt({ min: 0 })
    .withMessage('Experience years must be a non-negative integer'),
  body('consultationFee')
    .notEmpty()
    .withMessage('Consultation fee is required')
    .isFloat({ min: 0 })
    .withMessage('Consultation fee must be a non-negative number'),
  body('availableDays')
    .optional()
    .isArray()
    .withMessage('Available days must be an array of strings'),
  body('startTime')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM format'),
  body('endTime')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('End time must be in HH:MM format'),
  body('slotDuration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Slot duration must be a positive integer'),
  body('bio')
    .optional({ checkFalsy: true })
    .trim(),
  validateResult,
];

const validateUpdateDoctor = [
  param('id')
    .isMongoId()
    .withMessage('Invalid Doctor ID format in URL'),
  body('fullName')
    .optional()
    .notEmpty()
    .withMessage('Full name cannot be empty')
    .trim(),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('phone')
    .optional({ checkFalsy: true })
    .trim(),
  body('specialization')
    .optional()
    .notEmpty()
    .withMessage('Specialization cannot be empty')
    .trim(),
  body('licenseNumber')
    .optional()
    .notEmpty()
    .withMessage('License number cannot be empty')
    .trim(),
  body('experienceYears')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Experience years must be a non-negative integer'),
  body('consultationFee')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Consultation fee must be a non-negative number'),
  body('availableDays')
    .optional()
    .isArray()
    .withMessage('Available days must be an array of strings'),
  body('startTime')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Start time must be in HH:MM format'),
  body('endTime')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('End time must be in HH:MM format'),
  body('slotDuration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Slot duration must be a positive integer'),
  body('bio')
    .optional({ checkFalsy: true })
    .trim(),
  validateResult,
];

const validateDoctorId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid Doctor ID format in URL'),
  validateResult,
];

module.exports = {
  validateCreateDoctor,
  validateUpdateDoctor,
  validateDoctorId,
};
