const mongoose = require('mongoose');
const User = require('../models/User');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/clinic_db');
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Seed default Admin if not exists
    await seedDefaultAdmin();
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

const seedDefaultAdmin = async () => {
  try {
    const adminEmail = 'admin@clinic.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      const adminUser = new User({
        fullName: 'System Admin',
        email: adminEmail,
        password: 'Admin@123', // Will be hashed via pre-save hook
        role: 'Admin',
        phone: '1234567890',
        status: 'Active',
      });
      await adminUser.save();
      console.log('----------------------------------------');
      console.log('Default Admin User Seeded:');
      console.log(`Email: ${adminEmail}`);
      console.log('Password: Admin@123');
      console.log('----------------------------------------');
    } else {
      console.log('Default Admin user already exists.');
    }
  } catch (error) {
    console.error(`Error seeding default Admin user: ${error.message}`);
  }
};

module.exports = connectDB;
