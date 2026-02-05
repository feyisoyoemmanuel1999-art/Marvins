const prisma = require('../config/prisma');
const authService = require('../services/authService');

async function listUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return res.json({ success: true, data: users });
  } catch (error) {
    return next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const user = await authService.createUser(req.body);
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }
    return next(error);
  }
}

module.exports = { listUsers, createUser };
