const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../module/user.model');
const {
  sendRegistrationEmail,
  sendPasswordResetOtpEmail,
  sendRegistrationIdEmail
} = require('../utils/mailer');

// @route   POST /api/user/register
// @desc    Register a new candidate
router.post('/register', async (req, res) => {
  try {
    const { name, fatherName, email, mobile, password } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists with this email or mobile number.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const registrationId = 'AIJHM' + Date.now().toString().slice(-6);

    // Create user
    user = new User({
      name,
      fatherName: fatherName || '',
      email,
      mobile,
      password: hashedPassword,
      registrationId
    });

    await user.save();

    // Send registration email via SMTP
    try {
      await sendRegistrationEmail({
        to: user.email,
        name: user.name,
        fatherName: user.fatherName,
        registrationId: user.registrationId,
        email: user.email,
        mobile: user.mobile
      });
      console.log(`✅ Registration confirmation email sent to ${user.email}`);
    } catch (emailErr) {
      console.warn('⚠️ Could not send registration email:', emailErr.message);
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Registration successful', 
      user: {
        name: user.name,
        fatherName: user.fatherName,
        email: user.email,
        mobile: user.mobile,
        registrationId: user.registrationId
      } 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

// @route   POST /api/user/login
// @desc    Login candidate
router.post('/login', async (req, res) => {
  try {
    const { contact, password } = req.body; // contact can be email or mobile
    
    // Find user by email or mobile
    const user = await User.findOne({ $or: [{ email: contact }, { mobile: contact }] });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please register first.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    res.json({ 
      success: true, 
      message: 'Login successful', 
      user: {
        name: user.name,
        fatherName: user.fatherName || '',
        email: user.email,
        mobile: user.mobile,
        registrationId: user.registrationId,
        formData: user.formData || {},
        fileData: user.fileData || {},
        currentStep: user.currentStep || 1
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// @route   GET /api/user/progress/:registrationId
// @desc    Get candidate's saved draft progress
router.get('/progress/:registrationId', async (req, res) => {
  try {
    const user = await User.findOne({ registrationId: req.params.registrationId }).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({
      success: true,
      name: user.name,
      fatherName: user.fatherName || '',
      email: user.email,
      mobile: user.mobile,
      formData: user.formData || {},
      fileData: user.fileData || {},
      currentStep: user.currentStep || 1
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching progress' });
  }
});

// @route   GET /api/user/all
// @desc    Get all registered candidates (For Admin)
router.get('/all', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching users' });
  }
});

// @route   POST /api/user/forgot-password/send-otp
// @desc    Send 6-digit OTP to candidate's email for password reset
router.post('/forgot-password/send-otp', async (req, res) => {
  try {
    const { identifier } = req.body;
    const cleanId = String(identifier || '').trim();

    if (!cleanId) {
      return res.status(400).json({ success: false, message: 'Please enter your registered Email, Mobile, or Registration ID.' });
    }

    const user = await User.findOne({
      $or: [
        { email: cleanId },
        { mobile: cleanId },
        { registrationId: cleanId }
      ]
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'No registered account found with these details.' });
    }

    // Generate 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetOtp = otp;
    user.resetOtpExpiry = expiry;
    await user.save();

    // Send OTP via SMTP
    try {
      await sendPasswordResetOtpEmail({
        to: user.email,
        name: user.name,
        otp
      });
      console.log(`✅ Password reset OTP sent to ${user.email}`);
    } catch (mailErr) {
      console.error('⚠️ OTP mail error:', mailErr);
      return res.status(500).json({ success: false, message: 'Failed to send OTP to email. Please check your email address or server SMTP configuration.' });
    }

    // Mask email for security display (e.g. s***r@gmail.com)
    const [userPart, domainPart] = user.email.split('@');
    const maskedEmail = userPart.length > 2 
      ? `${userPart[0]}***${userPart[userPart.length - 1]}@${domainPart}`
      : `***@${domainPart}`;

    res.json({
      success: true,
      message: `OTP has been sent to your registered email (${maskedEmail})`,
      email: user.email,
      maskedEmail
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ success: false, message: 'Server error sending OTP' });
  }
});

// @route   POST /api/user/forgot-password/verify-reset
// @desc    Verify OTP and reset password
router.post('/forgot-password/verify-reset', async (req, res) => {
  try {
    const { identifier, otp, newPassword } = req.body;
    const cleanId = String(identifier || '').trim();
    const cleanOtp = String(otp || '').trim();

    if (!cleanId || !cleanOtp || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide identifier, OTP, and new password.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const user = await User.findOne({
      $or: [
        { email: cleanId },
        { mobile: cleanId },
        { registrationId: cleanId }
      ]
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Candidate account not found.' });
    }

    // Verify OTP
    if (!user.resetOtp || user.resetOtp !== cleanOtp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP entered. Please check your email and try again.' });
    }

    if (!user.resetOtpExpiry || user.resetOtpExpiry < new Date()) {
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new OTP.' });
    }

    // Hash and update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetOtp = null;
    user.resetOtpExpiry = null;
    await user.save();

    console.log(`✅ Password reset successful for ${user.email}`);

    res.json({
      success: true,
      message: 'Password has been reset successfully! You can now login with your new password.'
    });

  } catch (error) {
    console.error('Verify OTP and reset error:', error);
    res.status(500).json({ success: false, message: 'Server error resetting password' });
  }
});

// @route   POST /api/user/forgot-registration
// @desc    Email registration number to candidate
router.post('/forgot-registration', async (req, res) => {
  try {
    const { email, mobile, name, fatherName } = req.body;
    const cleanEmail = String(email || '').trim();
    const cleanMobile = String(mobile || '').trim();

    if (!cleanEmail && !cleanMobile) {
      return res.status(400).json({ success: false, message: 'Please enter your registered Email or Mobile number.' });
    }

    const query = [];
    if (cleanEmail) query.push({ email: cleanEmail });
    if (cleanMobile) query.push({ mobile: cleanMobile });

    const user = await User.findOne({ $or: query });

    if (!user) {
      return res.status(404).json({ success: false, message: 'No registered candidate account found with these details.' });
    }

    // Send Registration ID via email
    try {
      await sendRegistrationIdEmail({
        to: user.email,
        name: user.name,
        registrationId: user.registrationId,
        mobile: user.mobile
      });
      console.log(`✅ Registration ID sent to ${user.email} (${user.registrationId})`);
    } catch (mailErr) {
      console.error('⚠️ Registration ID mail error:', mailErr);
      return res.status(500).json({ success: false, message: 'Failed to send email. Please verify SMTP settings.' });
    }

    res.json({
      success: true,
      message: 'Check your email. Your Registration Number has been sent to your registered email address.'
    });

  } catch (error) {
    console.error('Forgot registration error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving registration number' });
  }
});

module.exports = router;
