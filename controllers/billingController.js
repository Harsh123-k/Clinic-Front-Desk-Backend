const billingService = require('../services/billingService');
const { success } = require('../utils/response');

/**
 * Generate invoice from an appointment
 */
const generateInvoice = async (req, res, next) => {
  try {
    const invoice = await billingService.generateInvoice(
      req.params.appointmentId,
      req.body
    );
    return success(res, 201, 'Invoice generated successfully', invoice);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieve invoice details by ID
 */
const getInvoiceById = async (req, res, next) => {
  try {
    const invoice = await billingService.getInvoiceById(req.params.invoiceId);
    return success(res, 200, 'Invoice details retrieved successfully', invoice);
  } catch (error) {
    if (error.message === 'Invoice not found') {
      res.status(404);
    }
    next(error);
  }
};

/**
 * Pay invoice (mark as Paid)
 */
const payInvoice = async (req, res, next) => {
  try {
    const invoice = await billingService.payInvoice(
      req.params.invoiceId,
      req.body.paymentMethod
    );
    return success(res, 200, 'Invoice paid successfully', invoice);
  } catch (error) {
    if (error.message === 'Invoice not found') {
      res.status(404);
    }
    next(error);
  }
};

/**
 * Retrieve all invoices (with filtering & pagination)
 */
const getAllInvoices = async (req, res, next) => {
  try {
    const result = await billingService.getAllInvoices(req.query);
    return success(
      res,
      200,
      'Invoices retrieved successfully',
      result.invoices,
      result.pagination
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateInvoice,
  getInvoiceById,
  payInvoice,
  getAllInvoices,
};
