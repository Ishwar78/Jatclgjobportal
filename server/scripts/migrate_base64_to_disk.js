const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config({ path: path.join(__dirname, '../.env') });
const User = require('../module/user.model');
const Application = require('../module/application.model');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

function saveBase64File(base64Str, prefix) {
  if (!base64Str || typeof base64Str !== 'string' || !base64Str.startsWith('data:')) {
    return null;
  }
  try {
    const matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return null;
    }
    const mimeType = matches[1];
    const dataBuffer = Buffer.from(matches[2], 'base64');
    
    let ext = '.bin';
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) ext = '.jpg';
    else if (mimeType.includes('png')) ext = '.png';
    else if (mimeType.includes('webp')) ext = '.webp';
    else if (mimeType.includes('pdf')) ext = '.pdf';

    const filename = `${prefix}-${Date.now()}-${Math.round(Math.random() * 1e4)}${ext}`;
    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, dataBuffer);
    console.log(`  💾 Extracted ${mimeType} (${(dataBuffer.length / 1024).toFixed(1)} KB) -> ${filename}`);
    return `/uploads/${filename}`;
  } catch (err) {
    console.error(`  ⚠️ Error saving base64 to file:`, err.message);
    return null;
  }
}

async function runMigration() {
  console.log('🚀 Starting Base64 to Disk Migration...');
  const mongoUri = process.env.MONGODB_URL || process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URL is not defined in environment');
  }

  await mongoose.connect(mongoUri);
  console.log('✅ Connected to MongoDB');

  // 1. Migrate Users
  const users = await User.find({});
  console.log(`Found ${users.length} user(s) to check.`);

  for (const user of users) {
    let modified = false;
    const regId = user.registrationId || user.mobile || 'user';
    const beforeSize = Buffer.byteLength(JSON.stringify(user));

    if (user.fileData && typeof user.fileData === 'object') {
      for (const [key, item] of Object.entries(user.fileData)) {
        if (item && item.url && typeof item.url === 'string' && item.url.startsWith('data:')) {
          const newUrl = saveBase64File(item.url, `user-${regId}-${key}`);
          if (newUrl) {
            user.fileData[key].url = newUrl;
            user.fileData[key].path = newUrl;
            modified = true;
          }
        }
      }
    }

    if (modified) {
      user.markModified('fileData');
      await user.save();
      const afterSize = Buffer.byteLength(JSON.stringify(user));
      console.log(`✅ Migrated User ${regId}: ${(beforeSize / 1024).toFixed(1)} KB -> ${(afterSize / 1024).toFixed(1)} KB!`);
    } else {
      console.log(`ℹ️ User ${regId} has no base64 files. Size: ${(beforeSize / 1024).toFixed(1)} KB`);
    }
  }

  // 2. Migrate Applications
  const applications = await Application.find({});
  console.log(`Found ${applications.length} application(s) to check.`);

  for (const app of applications) {
    let modified = false;
    const appNo = app.applicationNo || 'app';
    const beforeSize = Buffer.byteLength(JSON.stringify(app));

    if (app.fileData && typeof app.fileData === 'object') {
      for (const [key, item] of Object.entries(app.fileData)) {
        if (item && item.url && typeof item.url === 'string' && item.url.startsWith('data:')) {
          const newUrl = saveBase64File(item.url, `app-${appNo}-${key}`);
          if (newUrl) {
            app.fileData[key].url = newUrl;
            app.fileData[key].path = newUrl;
            modified = true;
          }
        }
      }
    }

    if (app.paymentDetails && app.paymentDetails.screenshotUrl && app.paymentDetails.screenshotUrl.startsWith('data:')) {
      const newUrl = saveBase64File(app.paymentDetails.screenshotUrl, `app-${appNo}-payment`);
      if (newUrl) {
        app.paymentDetails.screenshotUrl = newUrl;
        modified = true;
      }
    }

    if (modified) {
      app.markModified('fileData');
      app.markModified('paymentDetails');
      await app.save();
      const afterSize = Buffer.byteLength(JSON.stringify(app));
      console.log(`✅ Migrated App ${appNo}: ${(beforeSize / 1024).toFixed(1)} KB -> ${(afterSize / 1024).toFixed(1)} KB!`);
    } else {
      console.log(`ℹ️ App ${appNo} has no base64 files. Size: ${(beforeSize / 1024).toFixed(1)} KB`);
    }
  }

  console.log('\n🎉 Migration completed successfully!');
  process.exit(0);
}

runMigration().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
