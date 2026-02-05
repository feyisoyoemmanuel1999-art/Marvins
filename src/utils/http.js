function sendError(res, status, message, details = null) {
  return res.status(status).json({
    success: false,
    message,
    details,
  });
}

module.exports = { sendError };
