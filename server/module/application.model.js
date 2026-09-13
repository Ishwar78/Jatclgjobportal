const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  registrationId: {
    type: String,
    index: true
  },
  postAppliedFor: {
    type: String,
    default: 'Principal'
  },
  candidateName: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Shortlisted', 'Rejected', 'Approved'],
    default: 'Submitted'
  },
  formData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  fileData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  academicScore: {
    type: Number,
    default: 0
  },
  teachingScore: {
    type: Number,
    default: 0
  },
  researchScore: {
    type: Number,
    default: 0
  },
  paymentDetails: {
    amount: { type: String, default: '1000' },
    utrNo: { type: String, default: '' },
    upiProvider: { type: String, default: 'UPI' },
    accountHolderName: { type: String, default: '' },
    screenshotUrl: { type: String, default: '' }
  }
}, {
  timestamps: true
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
