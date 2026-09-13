require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./module/admin.model');
const dns = require('dns');

// Force Node.js to use Google DNS for SRV lookups (fixes ECONNREFUSED)
dns.setServers(['8.8.8.8', '8.8.4.4']);

const seedAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...', process.env.MONGODB_URL);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB for seeding');

    const adminEmail = 'jatcollegeadmin@gmail.com';
    const adminPassword = 'Jatclg@#123';

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin already exists! No need to seed again.');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const admin = new Admin({
      email: adminEmail,
      password: hashedPassword
    });

    await admin.save();
    console.log('Admin seeded successfully! Email:', adminEmail);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
