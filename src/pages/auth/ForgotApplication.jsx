import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { candidateApi, COLLEGE_SLUG } from '../../api/candidateApi';
import './ForgotApplication.css';

export default function ForgotApplication() {

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

    if (
      !name.trim() ||
      !fatherName.trim() ||
      !email.trim() ||
      !mobile.trim()
    ) {
      setMsg({
        success: false,
        text: 'Please fill all required details.'
      });
      return;
    }

    if (!/^\d{10}$/.test(mobile.trim())) {
      setMsg({
        success: false,
        text: 'Please enter a valid 10 digit mobile number.'
      });
      return;
    }

    setLoading(true);
    setMsg(null);

    try {

      const res = await candidateApi.candidateForgotAppNo(
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
        text:
          res.message ||
          'Your application number has been sent to your registered contact.'
      });

    } catch (err) {

      setMsg({
        success: false,
        text:
          err.message ||
          'Could not find your application number. Please verify your details.'
      });

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="forgot-app-page">

      {/* BACK BUTTON */}

      <div className="forgot-app-back-wrapper">

        <Link
          to="/login"
          className="forgot-app-back"
        >
          ← Back to Login
        </Link>

      </div>


      {/* MAIN CARD */}

      <div className="forgot-app-container">

        <div className="forgot-app-card">


          {/* HEADER */}

          <div className="forgot-app-header">

            <div className="forgot-app-icon">
              🔎
            </div>

            <div>

              <h1>
                Forgot Application Number
              </h1>

              <p>
                Verify your details to recover your application number
              </p>

            </div>

          </div>


          {/* INFO BOX */}

          <div className="forgot-app-info">

            <div className="forgot-app-info-icon">
              ℹ
            </div>

            <div>

              <strong>
                Account Verification Required
              </strong>

              <p>
                Please enter your details exactly as provided during
                registration. This helps us verify your account securely.
              </p>

            </div>

          </div>


          {/* MESSAGE */}

          {msg && (

            <div
              className={
                msg.success
                  ? 'forgot-app-message success'
                  : 'forgot-app-message error'
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
            className="forgot-app-form"
          >


            {/* FULL NAME */}

            <div className="forgot-app-field">

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

            <div className="forgot-app-field">

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

            <div className="forgot-app-field">

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

            <div className="forgot-app-field">

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


            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="forgot-app-submit"
            >

              {loading
                ? 'Verifying Details...'
                : 'Verify & Recover Application No →'
              }

            </button>


          </form>


          {/* FOOTER */}

          <div className="forgot-app-footer">

            <p>
              Remember your application details?
            </p>

            <Link to="/login">

              ← Return to Candidate Login

            </Link>

          </div>


          {/* SECURITY */}

          <div className="forgot-app-security">

            🔒 Your information is securely protected

          </div>


        </div>

      </div>

    </div>

  );
}