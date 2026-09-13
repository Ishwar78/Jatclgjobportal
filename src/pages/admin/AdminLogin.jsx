import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLoginAPI } from '../../lib/api';
import './AdminLogin.css';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError('Please enter your Admin ID and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await adminLoginAPI(email.trim(), password);

      if (result.ok && result.data.success) {
        localStorage.setItem(
          'adminAuth',
          JSON.stringify(result.data.admin)
        );

        navigate('/admin/dashboard');
      } else {
        setError(
          result.data.message ||
          'Login failed. Please check your credentials.'
        );
      }
    } catch (err) {
      console.error(err);
      setError(
        'Login failed. Backend server (Port 5035) is not responding.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">

      {/* Background Shapes */}
      <div className="admin-bg-shape admin-shape-one"></div>
      <div className="admin-bg-shape admin-shape-two"></div>

      <div className="admin-login-wrapper">

        {/* Portal Branding */}
        <div className="admin-brand">

          <div className="admin-logo-box">
            <img
              src="/assets/college-logo.png"
              alt="AIJHM College"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <h1>Admin Portal</h1>

          <p>
            College Recruitment Administration
          </p>

        </div>

        {/* Login Card */}
        <div className="admin-login-card">

          {/* Card Header */}
          <div className="admin-login-header">

            <div className="admin-lock-icon">
              🔐
            </div>

            <div>
              <h2>Welcome Back</h2>

              <p>
                Sign in to manage recruitment activities
              </p>
            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="admin-error">
              <span>⚠</span>
              <p>{error}</p>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleLogin}
            className="admin-login-form"
          >

            {/* Email */}
            <div className="admin-input-group">

              <label>
                Admin Email / ID
                <span>*</span>
              </label>

              <div className="admin-input-box">

                <span className="admin-input-icon">
                  👤
                </span>

                <input
                  type="text"
                  placeholder="Enter admin email or ID"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  autoComplete="username"
                />

              </div>

            </div>

            {/* Password */}
            <div className="admin-input-group">

              <label>
                Password
                <span>*</span>
              </label>

              <div className="admin-input-box">

                <span className="admin-input-icon">
                  🔒
                </span>

                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="admin-show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>

              </div>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="admin-login-btn"
            >

              {loading ? (
                <>
                  <span className="admin-spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  Login to Admin
                  <span>→</span>
                </>
              )}

            </button>

          </form>

          {/* Security Info */}
          <div className="admin-security-info">
            🔒 Your admin session is securely protected
          </div>

          {/* Divider */}
          <div className="admin-divider"></div>

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="admin-back-btn"
          >
            ← Back to Recruitment Portal
          </button>

        </div>

        {/* Footer */}
        <div className="admin-footer">
          © {new Date().getFullYear()} College Recruitment Portal
        </div>

      </div>

    </div>
  );
}