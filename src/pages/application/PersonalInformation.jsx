import React, { useState } from "react";
import "./PersonalInformation.css";
import {
  FaLock,
  FaCalendarAlt,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";

export default function PersonalInformation() {
  const [formData, setFormData] = useState({
    post: "developer",
    fullName: "ISHWAR",
    address: "Delhi, India",
    city: "Delhi",
    state: "",
    postalCode: "",
    country: "India",
    mobile: "9053860397",
    whatsapp: "",
    email: "ishwarwebmok@gmail.com",
    reEmail: "ishwarwebmok@gmail.com",
    fatherName: "DINESH",
    motherName: "",
    nationality: "",
    maritalStatus: "",
    dateOfBirth: "",
    socialCategory: "",
    aadhaar: "",
    familyId: "",
  });

  const [photo, setPhoto] = useState(null);
  const [categoryCertificate, setCategoryCertificate] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleCertificateChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCategoryCertificate(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);
    console.log("Photo:", photo);
    console.log("Category Certificate:", categoryCertificate);

    alert("Personal Information Saved Successfully!");
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="personal-info-page">
      <div className="personal-info-container">

        {/* ================= HEADER ================= */}

        <div className="form-header">
          <h2>Personal Information</h2>
          <p>Please enter your details exactly as per your ID proofs</p>
        </div>


        <form onSubmit={handleSubmit}>

          {/* ================= TOP ROW ================= */}

          <div className="form-grid">

            {/* Applying Post */}

            <div className="form-group">
              <label>
                Applying for the Post of (Give full name of post along with Advt. No. and date)
                <span>*</span>
              </label>

              <input
                type="text"
                name="post"
                value={formData.post}
                onChange={handleChange}
                placeholder="Enter Post Name"
              />
            </div>


            {/* Full Name */}

            <div className="form-group">
              <label>
                Name in Full (in Block Letters)
                <span>*</span>
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                readOnly
                className="locked-input"
              />

              <div className="field-note lock-note">
                <FaLock />
                <span>
                  From your registration — contact the office if this needs to change
                </span>
              </div>
            </div>

          </div>


          {/* ================= PHOTO ================= */}

          <div className="photo-section">

            <label className="upload-main-label">
              Upload Candidate Passport Size Photo (50 KB, JPEG)
              <span>*</span>
            </label>

            <div className="upload-wrapper">

              <input
                type="file"
                id="candidatePhoto"
                accept="image/*"
                onChange={handlePhotoChange}
              />

              <label
                htmlFor="candidatePhoto"
                className="upload-box photo-upload"
              >
                {photo ? (
                  <span className="selected-file">
                    {photo.name}
                  </span>
                ) : (
                  <>
                    <span>Click to choose file</span>
                    <small>(image/*)</small>
                  </>
                )}
              </label>

            </div>

            <div className="upload-note">
              Max size: 51 KB
            </div>

          </div>


          {/* ================= ADDRESS ================= */}

          <div className="form-group address-group">

            <label>
              Present Address — Street
              <span>*</span>
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              placeholder="Enter Present Address"
            />

          </div>


          {/* ================= CITY / STATE ================= */}

          <div className="form-grid">

            <div className="form-group">

              <label>
                City
                <span>*</span>
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter City"
              />

            </div>


            <div className="form-group">

              <label>
                State / Region / Province
                <span>*</span>
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter State"
              />

            </div>

          </div>


          {/* ================= POSTAL / COUNTRY ================= */}

          <div className="form-grid">

            <div className="form-group">

              <label>
                Postal / Zip Code
              </label>

              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Enter Postal Code"
              />

            </div>


            <div className="form-group">

              <label>
                Country
                <span>*</span>
              </label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter Country"
              />

            </div>

          </div>


          {/* ================= MOBILE / WHATSAPP ================= */}

          <div className="form-grid">

            <div className="form-group">

              <label>
                Telephone / Mobile No.
                <span>*</span>
              </label>

              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                readOnly
                className="locked-input"
              />

              <div className="field-note lock-note">
                <FaLock />

                <span>
                  From your registration — contact the office if this needs to change
                </span>
              </div>

              <div className="field-note">
                Must be exactly 10 digits starting with 6/7/8/9
              </div>

            </div>


            <div className="form-group">

              <label>
                WhatsApp No. <span className="required-star">*</span>
              </label>

              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder=""
              />

              <div className="field-note">
                Must be exactly 10 digits starting with 6/7/8/9
              </div>

            </div>

          </div>


          {/* ================= EMAIL ================= */}

          <div className="form-grid">

            <div className="form-group">

              <label>
                E-mail ID (in Block Letters)
                <span>*</span>
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="locked-input"
              />

              <div className="field-note lock-note">
                <FaLock />

                <span>
                  From your registration — contact the office if this needs to change
                </span>
              </div>

            </div>


            <div className="form-group">

              <label>
                Re-enter E-mail ID
                <span>*</span>
              </label>

              <input
                type="email"
                name="reEmail"
                value={formData.reEmail}
                readOnly
                className="locked-input"
              />

              <div className="field-note lock-note">
                <FaLock />

                <span>
                  From your registration — contact the office if this needs to change
                </span>
              </div>

            </div>

          </div>


          {/* ================= FATHER / MOTHER ================= */}

          <div className="form-grid">

            <div className="form-group">

              <label>
                Father's Name
                <span>*</span>
              </label>

              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                readOnly
                className="locked-input"
              />

              <div className="field-note lock-note">
                <FaLock />

                <span>
                  From your registration — contact the office if this needs to change
                </span>
              </div>

            </div>


            <div className="form-group">

              <label>
                Mother's Name
                <span>*</span>
              </label>

              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                placeholder=""
              />

            </div>

          </div>


          {/* ================= NATIONALITY / MARITAL ================= */}

          <div className="form-grid">

            <div className="form-group">

              <label>
                Nationality of the Candidate
                <span>*</span>
              </label>

              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder=""
              />

              <div className="field-note">
                Default: Indian
              </div>

            </div>


            <div className="form-group">

              <label>
                Marital Status
                <span>*</span>
              </label>

              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>

            </div>

          </div>


          {/* ================= DOB / CATEGORY ================= */}

          <div className="form-grid">

            <div className="form-group">

              <label>
                Date of Birth
                <span>*</span>
              </label>

              <div className="date-input-wrapper">

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />

                <FaCalendarAlt className="calendar-icon-form" />

              </div>

            </div>


            <div className="form-group">

              <label>
                Social Category
              </label>

              <select
                name="socialCategory"
                value={formData.socialCategory}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>

            </div>

          </div>


          {/* ================= CERTIFICATE / AADHAAR ================= */}

          <div className="form-grid certificate-row">

            <div className="form-group certificate-group">

              <label>
                Category Certificate
              </label>

              <div className="upload-wrapper">

                <input
                  type="file"
                  id="categoryCertificate"
                  accept=".pdf,image/*"
                  onChange={handleCertificateChange}
                />

                <label
                  htmlFor="categoryCertificate"
                  className="upload-box certificate-upload"
                >
                  {categoryCertificate ? (
                    <span className="selected-file">
                      {categoryCertificate.name}
                    </span>
                  ) : (
                    <>
                      <span>Click to choose file</span>
                      <small>(application/pdf,image/*)</small>
                    </>
                  )}
                </label>

              </div>

              <div className="upload-note">
                Max size: 10 MB
              </div>

              <div className="field-note upload-applicable">
                Upload if applicable
              </div>

            </div>


            <div className="form-group">

              <label>
                Aadhaar Card Number
              </label>

              <input
                type="text"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
                placeholder=""
                maxLength="12"
              />

            </div>

          </div>


          {/* ================= FAMILY ID ================= */}

          <div className="family-section">

            <div className="form-group family-group">

              <label>
                Family ID (PPP)
              </label>

              <input
                type="text"
                name="familyId"
                value={formData.familyId}
                onChange={handleChange}
                placeholder=""
              />

            </div>

          </div>


          {/* ================= BUTTONS ================= */}

          <div className="form-footer">

            <button
              type="button"
              className="back-btn"
              onClick={handleBack}
            >
              <FaChevronLeft />
              <span>Back</span>
            </button>


            <button
              type="submit"
              className="save-next-btn"
            >
              <span>Save & Next</span>
              <FaChevronRight />
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}