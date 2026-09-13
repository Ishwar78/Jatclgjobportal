const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fatherName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  registrationId: {
    type: String,
    unique: true
  },
  formData: {
    type: Object,
    default: {}
  },
  fileData: {
    type: Object,
    default: {}
  },
  currentStep: {
    type: Number,
    default: 1
  },
  resetOtp: {
    type: String
  },
  resetOtpExpiry: {
    type: Date
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
