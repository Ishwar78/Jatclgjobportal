const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    
    // Check if it's the specific DNS issue
    if (error.message.includes('querySrv ECONNREFUSED')) {
      console.error('\n======================================================');
      console.error('ERROR: DNS Resolution Failed for MongoDB SRV record.');
      console.error('This usually happens because your current Wi-Fi/ISP is blocking the DNS query,');
      console.error('or your PC DNS settings need to be changed.');
      console.error('FIX 1: Connect your PC to a Mobile Hotspot and try again.');
      console.error('FIX 2: Change your PC IPv4 DNS to Google DNS (8.8.8.8 and 8.8.4.4).');
      console.error('FIX 3: In MongoDB Atlas, change your Node.js version to 2.2.12 or earlier to get a standard (non+srv) connection string.');
      console.error('======================================================\n');
    }
  }
};

module.exports = connectDB;
