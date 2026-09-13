import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { candidateApi, COLLEGE_SLUG, safeSaveSession } from '../../api/candidateApi';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [config, setConfig] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check existing login session
    const raw = localStorage.getItem('candidate_session');

    if (raw) {
      try {
        const cand = JSON.parse(raw);

        if (cand && cand.registrationId) {
          navigate('/application');
          return;
        }
      } catch (error) {
        console.log('Session parse error');
      }
    }

    // Get college config
    candidateApi
      .getConfig(COLLEGE_SLUG)
      .then((cfg) => {
        if (cfg) {
          setConfig(cfg);
        }
      })
      .catch(() => {});
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');

    if (!identifier.trim()) {
      setError('Please enter Application No, Registration No, Mobile or Email.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const res = await candidateApi.candidateLogin(
        COLLEGE_SLUG,
        identifier.trim(),
        password
      );

      if (!res || !res.registrationId) {
        throw new Error('Invalid response from server');
      }

      // Save candidate session safely
      safeSaveSession('candidate_session', res);

      // Redirect application
      navigate('/application');

    } catch (err) {
      console.error('Login error:', err);

      setError(
        err.message ||
        'Login failed. Please check your credentials.'
      );

    } finally {
      setLoading(false);
    }
  };

  const autofillDemo = () => {
    setIdentifier('9053860397');
    setPassword('987654321');
    setError('');
  };

  return (
    <div className="login-page">

      {/* Background Shapes */}

      <div className="login-bg-shape shape-one"></div>
      <div className="login-bg-shape shape-two"></div>

      <div className="login-wrapper">

        {/* Back Button */}

        <div className="login-top-nav">
          <Link
            to="/"
            className="back-home-btn"
          >
            ← Back to Home
          </Link>
        </div>


        {/* College Header */}

        <div className="college-login-header">

          <div className="college-logo-box">

            <img
              src={
                config.logo_url ||
                "https://udbhhoxrstnjytgxpwje.supabase.co/storage/v1/object/public/tenant-assets/tenants/all-india-jat-heroes-memorial-college/logo-1788680557280.png"
              }
              alt="College Logo"
              className="college-login-logo"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

          </div>

          <h1>
            {config.name ||
              "ALL INDIA JAT HEROES’ MEMORIAL COLLEGE"}
          </h1>

          <p>
            📍 {config.tagline || "Rohtak, Haryana"}
          </p>

        </div>


        {/* Main Login Card */}

        <div className="login-card">


          {/* Card Header */}

          <div className="login-card-header">

            <div className="login-title-icon">
              🔐
            </div>

            <div>
              <h2>Candidate Login</h2>

              <p>
                Access your application form securely
              </p>
            </div>

          </div>




          {/* Error */}

          {error && (

            <div className="login-error">

              <span>⚠</span>

              <p>{error}</p>

            </div>

          )}


          {/* Login Form */}

          <form
            onSubmit={handleLogin}
            className="login-form"
          >


            {/* Identifier */}

            <div className="login-field">

              <label>
                Application / Registration Details

                <span>*</span>
              </label>


              <div className="input-wrapper">

                <span className="input-icon">
                  👤
                </span>

                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                  }}
                  placeholder="Application No / Registration No / Mobile / Email"
                  required
                />

              </div>


              <small>
                Use Application No, Registration No, Mobile Number or Email
              </small>

            </div>


            {/* Password */}

            <div className="login-field">

              <label>

                Password

                <span>*</span>

              </label>


              <div className="input-wrapper password-wrapper">

                <span className="input-icon">
                  🔒
                </span>


                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter your password"
                  required
                />


                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >

                  {showPassword ? 'Hide' : 'Show'}

                </button>

              </div>

            </div>


            {/* Submit Button */}

            <button
              type="submit"
              disabled={loading}
              className="login-submit-btn"
            >

              {loading ? (
                <>
                  <span className="login-spinner"></span>

                  Logging in...
                </>
              ) : (
                <>
                  Login & Open Form

                  <span>
                    →
                  </span>
                </>
              )}

            </button>

          </form>


          {/* Divider */}

          <div className="login-divider"></div>


          {/* Register */}

          <div className="new-candidate">

            <p>
              New candidate?
            </p>


            <Link
              to="/register"
              className="register-btn"
            >

              Create New Registration

            </Link>

          </div>


          {/* Help */}

          <div className="login-help">

            <strong>
              NEED HELP?
            </strong>


            <div className="help-links">

              <Link to="/forgot-password">
                Forgot Password?
              </Link>

              <span>•</span>

              <Link to="/forgot-application">
                Forgot Application No?
              </Link>

              <span>•</span>

              <Link to="/forgot-registration">
                Forgot Registration No?
              </Link>

            </div>


            <p className="security-text">
              🔒 Your information is securely protected
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}