import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { candidateApi, COLLEGE_SLUG } from '../../api/candidateApi';
import './ForgotRegistration.css';

export default function ForgotRegistration() {

  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    email: '',
    mobile: ''
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);


  const handleChange = (field, value) => {

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    setMsg(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      fatherName,
      email,
      mobile
    } = formData;

    if (!email.trim() && !mobile.trim()) {
      setMsg({
        success: false,
        text: 'Please enter your registered Email or Mobile number.'
      });
      return;
    }

    if (mobile.trim() && !/^\d{10}$/.test(mobile.trim())) {
      setMsg({
        success: false,
        text: 'Please enter a valid 10 digit mobile number.'
      });
      return;
    }

    setLoading(true);
    setMsg(null);

    try {
      const res = await candidateApi.candidateForgotRegNo(
        COLLEGE_SLUG,
        {
          name: name.trim(),
          fatherName: fatherName.trim(),
          email: email.trim(),
          mobile: mobile.trim()
        }
      );

      setMsg({
        success: true,
        text: res.message || 'Check your email. Your Registration Number has been sent to your registered email address.'
      });
    } catch (err) {
      setMsg({
        success: false,
        text: err.message || 'Could not retrieve registration number. Please verify your details.'
      });
    } finally {
      setLoading(false);
    }
  };


  return (

    <div className="forgot-reg-page">


      {/* BACK BUTTON */}

      <div className="forgot-reg-back-wrapper">

        <Link
          to="/login"
          className="forgot-reg-back"
        >
          ← Back to Login
        </Link>

      </div>


      {/* CENTER CONTAINER */}

      <div className="forgot-reg-container">

        <div className="forgot-reg-card">


          {/* HEADER */}

          <div className="forgot-reg-header">

            <div className="forgot-reg-icon">
              📋
            </div>


            <div>

              <h1>
                Forgot Registration Number
              </h1>

              <p>
                Verify your details to recover your registration number
              </p>

            </div>

          </div>


          {/* INFO BOX */}

          <div className="forgot-reg-info">

            <div className="forgot-reg-info-icon">
              ℹ
            </div>


            <div>

              <strong>
                Account Verification Required
              </strong>

              <p>
                Please enter the details exactly as provided during
                registration. This helps us verify your account securely.
              </p>

            </div>

          </div>


          {/* SUCCESS / ERROR MESSAGE */}

          {msg && (

            <div
              className={
                msg.success
                  ? 'forgot-reg-message success'
                  : 'forgot-reg-message error'
              }
            >

              <span>
                {msg.success ? '✓' : '⚠'}
              </span>

              <p>
                {msg.text}
              </p>

            </div>

          )}


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="forgot-reg-form"
          >


            {/* CANDIDATE NAME */}

            <div className="forgot-reg-field">

              <label>
                Candidate Full Name
                <span>*</span>
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) =>
                  handleChange(
                    'name',
                    e.target.value
                  )
                }
              />

            </div>


            {/* FATHER NAME */}

            <div className="forgot-reg-field">

              <label>
                Father's Name
                <span>*</span>
              </label>

              <input
                type="text"
                placeholder="Enter father's name"
                value={formData.fatherName}
                onChange={(e) =>
                  handleChange(
                    'fatherName',
                    e.target.value
                  )
                }
              />

            </div>


            {/* EMAIL */}

            <div className="forgot-reg-field">

              <label>
                Registered Email
                <span>*</span>
              </label>

              <input
                type="email"
                placeholder="Enter registered email"
                value={formData.email}
                onChange={(e) =>
                  handleChange(
                    'email',
                    e.target.value
                  )
                }
              />

            </div>


            {/* MOBILE */}

            <div className="forgot-reg-field">

              <label>
                Registered Mobile Number
                <span>*</span>
              </label>

              <input
                type="tel"
                maxLength="10"
                placeholder="Enter 10 digit mobile number"
                value={formData.mobile}
                onChange={(e) =>
                  handleChange(
                    'mobile',
                    e.target.value.replace(/\D/g, '')
                  )
                }
              />

              <small>
                Enter your registered 10 digit mobile number
              </small>

            </div>


            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="forgot-reg-submit"
            >

              {loading
                ? 'Verifying Details...'
                : 'Verify & Recover Registration No →'
              }

            </button>


          </form>


          {/* FOOTER */}

          <div className="forgot-reg-footer">

            <p>
              Remember your registration details?
            </p>

            <Link to="/login">

              ← Return to Candidate Login

            </Link>

          </div>


          {/* SECURITY */}

          <div className="forgot-reg-security">

            🔒 Your information is securely protected

          </div>


        </div>

      </div>

    </div>

  );

}