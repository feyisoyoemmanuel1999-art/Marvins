const { validationResult } = require('express-validator');
const { sendError } = require('../utils/http');

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 400, 'Validation failed', errors.array());
  }
  return next();
}

module.exports = { validateRequest };
