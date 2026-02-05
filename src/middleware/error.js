function notFound(req, res) {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
  });
}

function globalErrorHandler(error, req, res, next) {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}

module.exports = { notFound, globalErrorHandler };
