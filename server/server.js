require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./route/admin.route');
const userRoutes = require('./route/user.route');
const applicationRoutes = require('./route/application.route');
const uploadRoutes = require('./route/upload.route');
const path = require('path');
const fs = require('fs');
const dns = require('dns');

// Force Node.js to use Google DNS for SRV lookups (fixes ECONNREFUSED in many cases)
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files: serve uploads folder
app.use('/uploads', express.static(uploadsDir));

// Connect to Database
connectDB();

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5035;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
