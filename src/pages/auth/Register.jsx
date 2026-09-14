import React, { useState } from "react";
import { Link } from "react-router-dom";
import { candidateApi, COLLEGE_SLUG } from "../../api/candidateApi";
import "./Register.css";
export default function Register() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);

  const fields = [
    {
      name: "name",
      label: "Candidate Name",
      placeholder: "Enter your full name",
      type: "text",
      icon: "👤",
    },
    {
      name: "vname",
      label: "Verify Candidate Name",
      placeholder: "Enter candidate name again",
      type: "text",
      icon: "✓",
    },

    {
      name: "father",
      label: "Father's Name",
      placeholder: "Enter father's full name",
      type: "text",
      icon: "👨",
    },
    {
      name: "vfather",
      label: "Verify Father's Name",
      placeholder: "Enter father's name again",
      type: "text",
      icon: "✓",
    },

    {
      name: "mobile",
      label: "Mobile Number",
      placeholder: "Enter 10 digit mobile number",
      type: "tel",
      icon: "📱",
    },
    {
      name: "vmobile",
      label: "Verify Mobile Number",
      placeholder: "Enter mobile number again",
      type: "tel",
      icon: "✓",
    },

    {
      name: "email",
      label: "Email Address",
      placeholder: "Enter your email address",
      type: "email",
      icon: "✉",
    },
    {
      name: "vemail",
      label: "Verify Email Address",
      placeholder: "Enter email address again",
      type: "email",
      icon: "✓",
    },

    {
      name: "password",
      label: "Create Password",
      placeholder: "Minimum 6 characters",
      type: "password",
      icon: "🔒",
    },
    {
      name: "vpassword",
      label: "Verify Password",
      placeholder: "Enter password again",
      type: "password",
      icon: "✓",
    },
  ];

  function handleChange(field, value) {
    let updatedValue = value;

    if (field === "mobile" || field === "vmobile") {
      updatedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: updatedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
      verified: "",
    }));
  }

  async function submit(e) {
    e.preventDefault();

    const newErrors = {};

    // Required Fields
    fields.forEach((field) => {
      if (!formData[field.name]?.trim()) {
        newErrors[field.name] = "This field is required";
      }
    });

    // Name Match
    if (
      formData.name &&
      formData.vname &&
      formData.name.trim() !== formData.vname.trim()
    ) {
      newErrors.vname = "Candidate name must match";
    }

    // Father Name Match
    if (
      formData.father &&
      formData.vfather &&
      formData.father.trim() !== formData.vfather.trim()
    ) {
      newErrors.vfather = "Father's name must match";
    }

    // Mobile Match
    if (
      formData.mobile &&
      formData.vmobile &&
      formData.mobile.trim() !== formData.vmobile.trim()
    ) {
      newErrors.vmobile = "Mobile number must match";
    }

    // Email Match
    if (
      formData.email &&
      formData.vemail &&
      formData.email.trim().toLowerCase() !==
        formData.vemail.trim().toLowerCase()
    ) {
      newErrors.vemail = "Email address must match";
    }

    // Password Match
    if (
      formData.password &&
      formData.vpassword &&
      formData.password !== formData.vpassword
    ) {
      newErrors.vpassword = "Password must match";
    }

    // Mobile Validation
    if (
      formData.mobile &&
      !/^[6-9]\d{9}$/.test(formData.mobile.trim())
    ) {
      newErrors.mobile =
        "Enter valid 10 digit mobile number starting with 6, 7, 8 or 9";
    }

    if (
      formData.vmobile &&
      !/^[6-9]\d{9}$/.test(formData.vmobile.trim())
    ) {
      newErrors.vmobile =
        "Enter valid 10 digit mobile number starting with 6, 7, 8 or 9";
    }

    // Email Validation
    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Password Validation
    if (
      formData.password &&
      formData.password.length < 6
    ) {
      newErrors.password =
        "Password must contain at least 6 characters";
    }

    // Single Verification Checkbox
    if (!verified) {
      newErrors.verified =
        "Please verify all your details before registration";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      return;
    }

    setLoading(true);
    setServerMsg(null);

    try {
      const res = await candidateApi.candidateRegister(
        COLLEGE_SLUG,
        {
          candidateName: formData.name.trim(),
          fatherName: formData.father.trim(),
          mobile: formData.mobile.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }
      );

      setServerMsg({
        success: true,
        text:
          (res.message || "Registration completed successfully!") +
          " Your Registration Number and details have also been sent to your email address.",
        regNo:
          res.registrationId || res.registrationNo ||
          "",
      });
    } catch (err) {
      setServerMsg({
        success: false,
        text:
          err.message ||
          "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">

      {/* Background Decoration */}

      <div className="register-bg-shape shape-one"></div>
      <div className="register-bg-shape shape-two"></div>
      <div className="register-bg-shape shape-three"></div>


      <div className="register-wrapper">

        {/* Top Navigation */}

        <div className="register-topbar">

          <Link
            to="/login"
            className="back-login"
          >
            <span className="back-arrow">←</span>
            Back to Login
          </Link>

          <Link
            to="/"
            className="home-link"
          >
            Home
          </Link>

        </div>


        {/* Registration Card */}

        <div className="register-card">

          {/* Card Header */}

          <div className="register-header">

            <div className="register-icon">
              <span>👨‍💼</span>
            </div>

            <div>
              <h1>
                Candidate Registration
              </h1>

              <p>
                Create your account for applying to the Job portal. 
              </p>
            </div>

          </div>


          {/* Progress */}

          <div className="register-progress">

            <div className="progress-item active">

              <div className="progress-number">
                1
              </div>

              <span>
                Personal Details
              </span>

            </div>

            <div className="progress-line"></div>

            <div className="progress-item">

              <div className="progress-number">
                2
              </div>

              <span>
                Complete
              </span>

            </div>

          </div>


          {/* Success / Error Message */}

          {serverMsg && (

            <div
              className={`server-message ${
                serverMsg.success
                  ? "success-message"
                  : "error-message"
              }`}
            >

              <div className="message-icon">
                {serverMsg.success
                  ? "✓"
                  : "!"}
              </div>

              <div className="message-content">

                <h3>
                  {serverMsg.success
                    ? "Registration Successful"
                    : "Registration Failed"}
                </h3>

                <p>
                  {serverMsg.text}
                </p>

                {serverMsg.regNo && (
                  <div className="registration-number">

                    <span>
                      Registration Number
                    </span>

                    <strong>
                      {serverMsg.regNo}
                    </strong>

                  </div>
                )}

                {serverMsg.success && (
                  <Link
                    to="/login"
                    className="proceed-login-btn"
                  >
                    Proceed to Login
                    <span>→</span>
                  </Link>
                )}

              </div>

            </div>

          )}


          {/* Registration Form */}

          {!serverMsg?.success && (

            <form
              onSubmit={submit}
              className="register-form"
            >

              {/* Section Title */}

              <div className="form-section-title">

                <div>
                  <h3>
                    Registration Details
                  </h3>

                  <p>
                    Please fill all details carefully
                  </p>
                </div>

                <span className="required-note">
                  * Required Fields
                </span>

              </div>


              {/* Fields */}

              <div className="register-fields">

                {fields.map((field, index) => (

                  <div
                    className={`register-field ${
                      field.name.startsWith("v")
                        ? "verify-field"
                        : ""
                    }`}
                    key={field.name}
                  >

                    <label>

                      <span className="label-icon">
                        {field.icon}
                      </span>

                      {field.label}

                      <b>*</b>

                    </label>


                    <div className="input-wrapper">

                      <input
                        type={field.type}
                        value={
                          formData[field.name] || ""
                        }
                        onChange={(e) =>
                          handleChange(
                            field.name,
                            e.target.value
                          )
                        }
                        placeholder={
                          field.placeholder
                        }
                        className={
                          errors[field.name]
                            ? "input-error"
                            : ""
                        }
                      />

                      {formData[field.name] &&
                        !errors[field.name] && (
                          <span className="valid-mark">
                            ✓
                          </span>
                        )}

                    </div>


                    {errors[field.name] && (

                      <p className="field-error">
                        ⚠ {errors[field.name]}
                      </p>

                    )}


                    {/* Small helper */}

                    {field.name === "mobile" && (

                      <p className="input-helper">
                        Must be exactly 10 digits starting with
                        6, 7, 8 or 9
                      </p>

                    )}

                    {field.name === "password" && (

                      <p className="input-helper">
                        Use at least 6 characters
                      </p>

                    )}

                  </div>

                ))}

              </div>


              {/* Single Verification */}

              <div
                className={`verification-box ${
                  errors.verified
                    ? "verification-error"
                    : ""
                }`}
              >

                <label className="verification-label">

                  <input
                    type="checkbox"
                    checked={verified}
                    onChange={(e) => {
                      setVerified(
                        e.target.checked
                      );

                      setErrors((prev) => ({
                        ...prev,
                        verified: "",
                      }));
                    }}
                  />

                  <span className="custom-checkbox">
                    ✓
                  </span>


                  <div className="verification-content">

                    <strong>
                      I have verified all the details
                    </strong>

                    <p>
                      I confirm that my Candidate Name,
                      Father's Name, Mobile Number,
                      Email Address and Password details
                      are correct.
                    </p>

                  </div>

                </label>

                {errors.verified && (

                  <p className="verification-error-text">
                    ⚠ {errors.verified}
                  </p>

                )}

              </div>


              {/* Submit Button */}

              <button
                type="submit"
                disabled={loading}
                className="register-submit-btn"
              >

                {loading ? (

                  <>
                    <span className="loading-spinner"></span>
                    Registering...
                  </>

                ) : (

                  <>
                    <span>
                      Register Now
                    </span>

                    <span className="submit-arrow">
                      →
                    </span>
                  </>

                )}

              </button>


              {/* Bottom Login */}

              <div className="already-account">

                <span>
                  Already registered?
                </span>

                <Link to="/login">
                  Login to your account
                </Link>

              </div>

            </form>

          )}

        </div>


        {/* Bottom Security Text */}

        <div className="register-footer-note">

          <span>🔒</span>

          Your information is securely protected

        </div>

      </div>

    </div>
  );
}