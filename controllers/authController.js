const authService = require('../services/authService');

/**
 * @desc    Login user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          phone: user.phone,
          status: user.status,
        },
      },
    });
  } catch (error) {
    // If invalid credentials, respond with 401 Unauthorized
    if (error.message === 'Invalid email or password' || error.message === 'User account is deactivated. Please contact administrator.') {
      res.status(401);
    }
    next(error);
  }
};

module.exports = {
  login,
};
