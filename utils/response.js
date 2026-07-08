/**
 * Standard API response formatter utilities
 */

/**
 * Send standard success response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Response message
 * @param {any} data - Response payload data
 * @param {Object} [pagination] - Pagination metadata if any
 */
const success = (res, statusCode, message, data, pagination = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(pagination && { pagination }),
  });
};

/**
 * Send standard error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error details message
 * @param {any} [errors] - Specific field validation or validation list
 */
const error = (res, statusCode, message, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};

module.exports = {
  success,
  error,
};
