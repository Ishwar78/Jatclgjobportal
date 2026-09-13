const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../module/admin.model');
const Instruction = require('../module/instructions.model');
const Application = require('../module/application.model');

// Default initial instructions seed
const defaultInstructions = [
  {
    id: 'instrDeadline',
    text: 'The last date for the receipt of hard copy of application will be the same as the closing date of the portal mentioned in the advertisement. Applications found incomplete and/or received after the due date will not be considered.'
  },
  {
    id: 'instrFill',
    text: 'This application form should be properly filled. Photocopies of all certificates/testimonials must be attached. Originals will have to be shown at the time of Interview.'
  },
  {
    id: 'instrForward',
    text: 'The applicants should send their applications after getting forwarded by their current employer. Printout of the completely filled application form must also be sent to the Dean of Colleges, M.D. University, Rohtak and also to the Director General Higher Education, Shiksha Sadan, Sector 5, Panchkula by the last date given in the advertisement.'
  },
  {
    id: 'instrIncomplete',
    text: 'Applications received after the due date or found incomplete will not be considered.'
  }
];

// @route   POST /api/admin/login
// @desc    Authenticate admin & return success
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Login successful
    res.json({
      success: true,
      message: 'Login successful',
      admin: {
        _id: admin._id,
        email: admin.email
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

// @route   GET /api/admin/instructions
// @desc    Get portal instructions and timeline
router.get('/instructions', async (req, res) => {
  try {
    let doc = await Instruction.findOne().sort({ updatedAt: -1 });
    if (!doc) {
      // Seed default instructions
      doc = await Instruction.create({
        deadline_date: '2026-03-31',
        deadline_time: '23:59:59',
        warning_text: '⚠️ No consideration for incomplete and after last date application.',
        instructions: defaultInstructions
      });
    }

    res.json({
      success: true,
      data: doc
    });
  } catch (error) {
    console.error('Fetch instructions error:', error);
    res.status(500).json({ message: 'Failed to fetch instructions', error: error.message });
  }
});

// @route   POST /api/admin/instructions
// @desc    Save/update portal instructions and timeline
router.post('/instructions', async (req, res) => {
  try {
    const { deadline_date, deadline_time, warning_text, instructions } = req.body;

    let doc = await Instruction.findOne().sort({ updatedAt: -1 });
    if (doc) {
      doc.deadline_date = deadline_date || doc.deadline_date;
      doc.deadline_time = deadline_time || doc.deadline_time;
      doc.warning_text = warning_text || doc.warning_text;
      if (Array.isArray(instructions)) {
        doc.instructions = instructions;
      }
      await doc.save();
    } else {
      doc = await Instruction.create({
        deadline_date: deadline_date || '2026-03-31',
        deadline_time: deadline_time || '23:59:59',
        warning_text: warning_text || '⚠️ No consideration for incomplete and after last date application.',
        instructions: Array.isArray(instructions) ? instructions : defaultInstructions
      });
    }

    res.json({
      success: true,
      message: 'Instructions updated successfully',
      data: doc
    });
  } catch (error) {
    console.error('Save instructions error:', error);
    res.status(500).json({ message: 'Failed to save instructions', error: error.message });
  }
});

// @route   GET /api/admin/applications
// @desc    Get all submitted applications
router.get('/applications', async (req, res) => {
  try {
    const apps = await Application.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      applications: apps
    });
  } catch (error) {
    console.error('Fetch all applications error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch applications', error: error.message });
  }
});

// @route   GET /api/admin/applications/:id
// @desc    Get application details by id or applicationNo
router.get('/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isObjectId = id.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: id } : { applicationNo: id };
    const app = await Application.findOne(query);
    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({
      success: true,
      application: app
    });
  } catch (error) {
    console.error('Fetch application details error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch application details', error: error.message });
  }
});

module.exports = router;
