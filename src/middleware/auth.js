const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const { sendError } = require('../utils/http');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 401, 'Authentication required');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload;
    return next();
  } catch (error) {
    return sendError(res, 401, 'Invalid or expired token');
  }
}

function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return sendError(res, 403, 'You do not have access to this resource');
    }
    return next();
  };
}

module.exports = { authenticate, authorize };
