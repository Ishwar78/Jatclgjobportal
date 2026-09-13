const mongoose = require('mongoose');

const instructionSchema = new mongoose.Schema({
  deadline_date: {
    type: String,
    default: '2026-03-31'
  },
  deadline_time: {
    type: String,
    default: '23:59:59'
  },
  warning_text: {
    type: String,
    default: '⚠️ No consideration for incomplete and after last date application.'
  },
  instructions: [
    {
      id: { type: String },
      text: { type: String, required: true }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Instruction', instructionSchema);
