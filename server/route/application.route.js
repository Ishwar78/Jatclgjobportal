const express = require('express');
const router = express.Router();
const Application = require('../module/application.model');
const User = require('../module/user.model');
const { sendApplicationSubmissionEmail } = require('../utils/mailer');

// @route   POST /api/application/submit
// @desc    Submit a recruitment application
router.post('/submit', async (req, res) => {
  try {
    const { registrationId, formData = {}, fileData = {} } = req.body;

    const candidateName = formData.name || formData.candidateName || 'Candidate';
    const fatherName = formData.fatherName || formData.father || '';
    const email = formData.email || '';
    const mobile = formData.contactNo1 || formData.mobile || '';
    const postAppliedFor = formData.postAppliedFor || 'Principal';

    // Generate unique application number
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const applicationNo = `AIJHM-APP-${new Date().getFullYear()}-${randomSuffix}`;

    // Extract scores if available
    const academicScore = parseFloat(formData.academicTotal || 0) || 0;
    const teachingScore = parseFloat(formData.teachingTotalScore || 0) || 0;
    const researchScore = parseFloat(formData.resTotal || 0) || 0;

    // Payment details
    const paymentDetails = {
      amount: formData.paymentAmount || '1000',
      utrNo: formData.utrNo || '',
      upiProvider: formData.upiProvider || 'UPI',
      accountHolderName: formData.accountHolderName || '',
      screenshotUrl: fileData.filePaymentScreenshot?.url || ''
    };

    const newApp = new Application({
      applicationNo,
      registrationId: registrationId || '',
      postAppliedFor,
      candidateName,
      fatherName,
      email,
      mobile,
      status: 'Submitted',
      formData,
      fileData,
      academicScore,
      teachingScore,
      researchScore,
      paymentDetails
    });

    const savedApp = await newApp.save();
    console.log(`✅ Application ${savedApp.applicationNo} saved to MongoDB`);

    // Asynchronously dispatch emails to the 3 committee emails + candidate email
    sendApplicationSubmissionEmail({
      application: savedApp,
      recipients: [
        'sharmaishwar970@gmail.com',
        'a60196141@gmail.com',
        'shar54ma2334@gmail.com'
      ]
    })
      .then(() => console.log(`✅ Submission emails dispatched successfully for ${savedApp.applicationNo}`))
      .catch((mailErr) => console.warn('⚠️ Submission email error:', mailErr.message));

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      applicationNo: savedApp.applicationNo,
      application: savedApp
    });

  } catch (error) {
    console.error('Application submit error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    });
  }
});

// @route   GET /api/application/my/:registrationId
// @desc    Get candidate's submitted application by registrationId
router.get('/my/:registrationId', async (req, res) => {
  try {
    const { registrationId } = req.params;
    const app = await Application.findOne({ registrationId }).sort({ createdAt: -1 });
    if (!app) {
      return res.status(404).json({ success: false, message: 'No application found' });
    }
    res.json({ success: true, application: app });
  } catch (error) {
    console.error('Fetch my application error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching application' });
  }
});

// @route   GET /api/application/:id
// @desc    Get application details by id or applicationNo
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isObjectId = id.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: id } : { applicationNo: id };
    
    const app = await Application.findOne(query);
    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, application: app });
  } catch (error) {
    console.error('Fetch application error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/application/save-progress
// @desc    Save step-by-step draft progress for candidate
router.post('/save-progress', async (req, res) => {
  try {
    const { registrationId, formData = {}, fileData = {}, currentStep = 1 } = req.body;

    if (!registrationId) {
      return res.status(400).json({ success: false, message: 'registrationId is required' });
    }

    const updateObj = {
      formData,
      fileData,
      currentStep: Number(currentStep)
    };

    if (formData.fatherName) {
      updateObj.fatherName = formData.fatherName;
    }

    const updatedUser = await User.findOneAndUpdate(
      { registrationId },
      { $set: updateObj },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Candidate not found for registrationId' });
    }

    res.json({
      success: true,
      message: 'Draft progress saved successfully',
      currentStep: updatedUser.currentStep
    });
  } catch (error) {
    console.error('Save progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error saving progress',
      error: error.message
    });
  }
});

module.exports = router;
