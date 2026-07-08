const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Generate JWT token
 * @param {string} id - User ID
 * @param {string} role - User role
 * @returns {string} JWT Token
 */
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'supersecretjwtkeyforclinicmanagementphaseone',
    { expiresIn: process.env.JWT_EXPIRES || '7d' }
  );
};

/**
 * Login user service
 * @param {string} email
 * @param {string} password
 * @returns {Object} User and Token info
 */
const loginUser = async (email, password) => {
  // Find user and explicitly select password since it has select: false
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if status is Active
  if (user.status !== 'Active') {
    throw new Error('User account is deactivated. Please contact administrator.');
  }

  // Compare passwords
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate Token
  const token = generateToken(user._id, user.role);

  // Exclude password from the returned user details
  user.password = undefined;

  return {
    user,
    token,
  };
};

module.exports = {
  loginUser,
  generateToken,
};
