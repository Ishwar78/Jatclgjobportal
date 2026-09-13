import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaLock,
  FaKey,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaRedo
} from 'react-icons/fa';

import { candidateApi, COLLEGE_SLUG } from '../../api/candidateApi';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const navigate = useNavigate();

  // step: 1 = Request OTP, 2 = Verify OTP & Reset Password, 3 = Success
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [maskedEmail, setMaskedEmail] = useState('');

  // STEP 1: SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setMsg({ success: false, text: 'Please enter your registered Email, Mobile, or Registration ID.' });
      return;
    }

    setLoading(true);
    setMsg(null);

    try {
      const res = await candidateApi.candidateSendResetOtp(COLLEGE_SLUG, identifier.trim());
      setMaskedEmail(res.maskedEmail || res.email || 'your registered email');
      setStep(2);
      setMsg({
        success: true,
        text: res.message || `OTP sent to your registered email (${res.maskedEmail || res.email}). Valid for 10 minutes.`
      });
    } catch (err) {
      setMsg({
        success: false,
        text: err.message || 'Failed to send OTP. Please check your registered details.'
      });
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: VERIFY OTP & RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (!otp.trim()) {
      setMsg({ success: false, text: 'Please enter the 6-digit OTP received on your email.' });
      return;
    }

    if (!newPassword) {
      setMsg({ success: false, text: 'Please enter a new password.' });
      return;
    }

    if (newPassword.length < 6) {
      setMsg({ success: false, text: 'Password must be at least 6 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMsg({ success: false, text: 'New password and confirm password do not match.' });
      return;
    }

    setLoading(true);

    try {
      const res = await candidateApi.candidateVerifyResetPassword(
        COLLEGE_SLUG,
        identifier.trim(),
        otp.trim(),
        newPassword
      );

      setStep(3);
      setMsg({
        success: true,
        text: res.message || 'Password has been reset successfully! You can now login with your new password.'
      });
    } catch (err) {
      setMsg({
        success: false,
        text: err.message || 'Invalid or expired OTP. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const res = await candidateApi.candidateSendResetOtp(COLLEGE_SLUG, identifier.trim());
      setMsg({
        success: true,
        text: `New OTP resent to ${res.maskedEmail || res.email || 'your email'}. Valid for 10 minutes.`
      });
    } catch (err) {
      setMsg({ success: false, text: err.message || 'Failed to resend OTP.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-wrapper">
        {/* BACK BUTTON */}
        <div className="forgot-top-nav">
          <Link to="/login" className="forgot-back-btn">
            <FaArrowLeft />
            Back to Login
          </Link>
        </div>

        {/* MAIN CARD */}
        <div className="forgot-password-card">
          {/* HEADER */}
          <div className="forgot-card-header">
            <div className="forgot-header-icon">
              <FaLock />
            </div>
            <div className="forgot-header-content">
              <h1>Forgot Password?</h1>
              <p>
                {step === 1 && 'Request a 6-digit verification OTP to your registered email'}
                {step === 2 && 'Enter OTP and set your new password'}
                {step === 3 && 'Password successfully updated'}
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="forgot-card-body">
            {/* STEP 1 & 2 INFO BOX */}
            {step === 1 && (
              <div className="forgot-info-box">
                <div className="forgot-info-icon">
                  <FaShieldAlt />
                </div>
                <div>
                  <h3>Email OTP Verification</h3>
                  <p>
                    Enter your Registered Email, Mobile Number, or Registration ID. We will send a secure 6-digit OTP to your registered email.
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="forgot-info-box" style={{ borderColor: '#bfdbfe', backgroundColor: '#eff6ff' }}>
                <div className="forgot-info-icon" style={{ color: '#2563eb' }}>
                  <FaKey />
                </div>
                <div>
                  <h3>Enter OTP & Create New Password</h3>
                  <p>
                    A 6-digit OTP was sent to <strong>{maskedEmail || 'your email'}</strong>. Enter it below along with your new password.
                  </p>
                </div>
              </div>
            )}

            {/* MESSAGE ALERT */}
            {msg && (
              <div
                className={`forgot-message ${
                  msg.success ? 'forgot-success' : 'forgot-error'
                }`}
              >
                <div className="forgot-message-icon">
                  {msg.success ? <FaCheckCircle /> : <FaExclamationCircle />}
                </div>
                <div>
                  <strong>{msg.success ? 'Success' : 'Error'}</strong>
                  <p>{msg.text}</p>
                </div>
              </div>
            )}

            {/* STEP 1 FORM: REQUEST OTP */}
            {step === 1 && (
              <form onSubmit={handleSendOtp} className="forgot-form">
                <div className="forgot-field">
                  <label>
                    Email / Mobile / Registration ID <span>*</span>
                  </label>
                  <div className="forgot-input-wrapper">
                    <FaEnvelope className="forgot-input-icon" />
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. your@email.com or 9876543210 or AIJHM12345"
                      required
                    />
                  </div>
                  <small>Enter the Email, Mobile or Registration ID used during registration.</small>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="forgot-submit-btn"
                >
                  {loading ? (
                    <>
                      <span className="forgot-loader"></span>
                      Sending OTP to Email...
                    </>
                  ) : (
                    <>
                      <FaKey />
                      Send Verification OTP ›
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP 2 FORM: ENTER OTP & NEW PASSWORD */}
            {step === 2 && (
              <form onSubmit={handleResetPassword} className="forgot-form">
                {/* OTP INPUT */}
                <div className="forgot-field">
                  <label>
                    6-Digit OTP from Email <span>*</span>
                  </label>
                  <div className="forgot-input-wrapper">
                    <FaKey className="forgot-input-icon" />
                    <input
                      type="text"
                      maxLength="6"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit OTP"
                      style={{ letterSpacing: '4px', fontWeight: 'bold', fontSize: '18px' }}
                      required
                    />
                  </div>
                  <small>Check your spam/junk folder if you don't see it in your inbox.</small>
                </div>

                {/* NEW PASSWORD WITH VIEW TOGGLE */}
                <div className="forgot-field">
                  <label>
                    New Password <span>*</span>
                  </label>
                  <div className="forgot-input-wrapper password-wrapper" style={{ position: 'relative' }}>
                    <FaLock className="forgot-input-icon" />
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      style={{ paddingRight: '45px' }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      title={showNewPass ? 'Hide password' : 'Show password'}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {showNewPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* CONFIRM NEW PASSWORD WITH VIEW TOGGLE */}
                <div className="forgot-field">
                  <label>
                    Confirm New Password <span>*</span>
                  </label>
                  <div className="forgot-input-wrapper password-wrapper" style={{ position: 'relative' }}>
                    <FaLock className="forgot-input-icon" />
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your new password"
                      style={{ paddingRight: '45px' }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      title={showConfirmPass ? 'Hide password' : 'Show password'}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="forgot-submit-btn"
                >
                  {loading ? (
                    <>
                      <span className="forgot-loader"></span>
                      Updating Password...
                    </>
                  ) : (
                    <>
                      <FaLock />
                      Verify OTP & Reset Password
                    </>
                  )}
                </button>

                {/* RESEND & BACK OPTIONS */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '13px' }}>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#2563eb',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <FaRedo style={{ fontSize: '11px' }} /> Resend OTP
                  </button>

                  <button
                    type="button"
                    onClick={() => { setStep(1); setMsg(null); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#64748b',
                      cursor: 'pointer'
                    }}
                  >
                    Change Email / ID
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: SUCCESS STATE */}
            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  margin: '0 auto 16px'
                }}>
                  ✓
                </div>
                <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px' }}>
                  Password Changed Successfully!
                </h3>
                <p style={{ color: '#475569', fontSize: '14px', margin: '0 0 24px', lineHeight: 1.5 }}>
                  Your password has been securely updated. You can now login with your new credentials.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="forgot-submit-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Proceed to Login ›
                </button>
              </div>
            )}

            {/* FOOTER */}
            <div className="forgot-card-footer">
              <p>Remember your password?</p>
              <Link to="/login">
                <FaArrowLeft />
                Return to Candidate Login
              </Link>
            </div>
          </div>
        </div>

        {/* SECURITY TEXT */}
        <div className="forgot-security">
          <FaShieldAlt />
          Your information is securely protected by SSL encryption
        </div>
      </div>
    </div>
  );
}