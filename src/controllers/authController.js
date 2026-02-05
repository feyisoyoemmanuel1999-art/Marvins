const authService = require('../services/authService');
const { sendError } = require('../utils/http');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    if (!result) {
      return sendError(res, 401, 'Invalid credentials');
    }

    return res.json({ success: true, data: result });
  } catch (error) {
    return next(error);
  }
}

module.exports = { login };
