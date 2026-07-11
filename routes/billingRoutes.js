const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');
const { protect, authorize } = require('../middleware/auth');
const {
  validateGenerateInvoice,
  validatePayInvoice,
  validateInvoiceId,
} = require('../validators/billingValidator');

// Protect all routes
router.use(protect);

// Only Admin and Receptionist can access Billing Management (Doctors are blocked)
router.use(authorize('Admin', 'Receptionist'));

// GET /api/billing - List all invoices
router.route('/').get(billingController.getAllInvoices);

// POST /api/billing/generate/:appointmentId - Create invoice from appointment
router.post('/generate/:appointmentId', validateGenerateInvoice, billingController.generateInvoice);

// GET /api/billing/:invoiceId - Retrieve invoice details
router.get('/:invoiceId', validateInvoiceId, billingController.getInvoiceById);

// PUT /api/billing/pay/:invoiceId - Pay/mark invoice as Paid
router.put('/pay/:invoiceId', validatePayInvoice, billingController.payInvoice);

module.exports = router;
