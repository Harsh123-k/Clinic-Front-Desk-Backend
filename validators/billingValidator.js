const { body, param } = require('express-validator');
const { validateResult } = require('../middleware/validator');

const validateGenerateInvoice = [
  param('appointmentId')
    .isMongoId()
    .withMessage('Invalid Appointment ID format in URL'),
  body('additionalCharges')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Additional charges must be a non-negative number'),
  body('paymentStatus')
    .optional()
    .isIn(['Pending', 'Paid'])
    .withMessage('Payment status must be Pending or Paid'),
  body('paymentMethod')
    .optional()
    .isIn(['Cash', 'UPI', 'Card'])
    .withMessage('Payment method must be Cash, UPI, or Card')
    .custom((value, { req }) => {
      if (req.body.paymentStatus === 'Paid' && !value) {
        throw new Error('Payment method is required when status is Paid');
      }
      return true;
    }),
  validateResult,
];

const validatePayInvoice = [
  param('invoiceId')
    .isMongoId()
    .withMessage('Invalid Invoice ID format in URL'),
  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required')
    .isIn(['Cash', 'UPI', 'Card'])
    .withMessage('Payment method must be Cash, UPI, or Card'),
  validateResult,
];

const validateInvoiceId = [
  param('invoiceId')
    .isMongoId()
    .withMessage('Invalid Invoice ID format in URL'),
  validateResult,
];

module.exports = {
  validateGenerateInvoice,
  validatePayInvoice,
  validateInvoiceId,
};
