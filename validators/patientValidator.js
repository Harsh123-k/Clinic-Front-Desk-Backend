const { body, param } = require('express-validator');
const { validateResult } = require('../middleware/validator');

const validateCreatePatient = [
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .trim(),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .trim(),
  body('gender')
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other'),
  body('dob')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Date of birth must be a valid ISO 8601 date (YYYY-MM-DD)')
    .custom((value) => {
      const birthDate = new Date(value);
      if (birthDate > new Date()) {
        throw new Error('Date of birth cannot be in the future');
      }
      return true;
    }),
  body('bloodGroup')
    .optional({ checkFalsy: true })
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .withMessage('Invalid blood group'),
  body('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .trim(),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('address')
    .optional({ checkFalsy: true })
    .trim(),
  body('emergencyContact')
    .notEmpty()
    .withMessage('Emergency contact details are required'),
  body('emergencyContact.name')
    .notEmpty()
    .withMessage('Emergency contact name is required')
    .trim(),
  body('emergencyContact.relationship')
    .notEmpty()
    .withMessage('Emergency contact relationship is required')
    .trim(),
  body('emergencyContact.phone')
    .notEmpty()
    .withMessage('Emergency contact phone is required')
    .trim(),
  body('allergies')
    .optional()
    .isArray()
    .withMessage('Allergies must be an array of strings'),
  body('medicalHistory')
    .optional()
    .isArray()
    .withMessage('Medical history must be an array of strings'),
  body('currentMedication')
    .optional()
    .isArray()
    .withMessage('Current medication must be an array of strings'),
  validateResult,
];

const validateUpdatePatient = [
  param('id')
    .isMongoId()
    .withMessage('Invalid Patient ID format in URL'),
  body('firstName')
    .optional()
    .notEmpty()
    .withMessage('First name cannot be empty')
    .trim(),
  body('lastName')
    .optional()
    .notEmpty()
    .withMessage('Last name cannot be empty')
    .trim(),
  body('gender')
    .optional()
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other'),
  body('dob')
    .optional()
    .isISO8601()
    .withMessage('Date of birth must be a valid ISO 8601 date (YYYY-MM-DD)')
    .custom((value) => {
      const birthDate = new Date(value);
      if (birthDate > new Date()) {
        throw new Error('Date of birth cannot be in the future');
      }
      return true;
    }),
  body('bloodGroup')
    .optional({ checkFalsy: true })
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .withMessage('Invalid blood group'),
  body('phone')
    .optional()
    .notEmpty()
    .withMessage('Phone number cannot be empty')
    .trim(),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('address')
    .optional()
    .trim(),
  body('emergencyContact.name')
    .optional()
    .notEmpty()
    .withMessage('Emergency contact name cannot be empty')
    .trim(),
  body('emergencyContact.relationship')
    .optional()
    .notEmpty()
    .withMessage('Emergency contact relationship cannot be empty')
    .trim(),
  body('emergencyContact.phone')
    .optional()
    .notEmpty()
    .withMessage('Emergency contact phone cannot be empty')
    .trim(),
  body('allergies')
    .optional()
    .isArray()
    .withMessage('Allergies must be an array of strings'),
  body('medicalHistory')
    .optional()
    .isArray()
    .withMessage('Medical history must be an array of strings'),
  body('currentMedication')
    .optional()
    .isArray()
    .withMessage('Current medication must be an array of strings'),
  validateResult,
];

const validatePatientId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid Patient ID format in URL'),
  validateResult,
];

module.exports = {
  validateCreatePatient,
  validateUpdatePatient,
  validatePatientId,
};
