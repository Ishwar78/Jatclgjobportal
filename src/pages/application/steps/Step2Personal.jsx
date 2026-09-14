import React from 'react';
import './Step2Personal.css';

export default function Step2Personal({
  values = {},
  errors = {},
  fileMeta = {},
  uploadingField = null,
  uploadProgress = 0,
  onValueChange,
  onFileChange,
  onFileRemove
}) {
  const lockedFields = {
    name: 'From your registration — contact the office if this needs to change',
    contactNo1: 'From your registration — contact the office if this needs to change',
    email: 'From your registration — contact the office if this needs to change',
    confirmEmail: 'From your registration — contact the office if this needs to change'
  };

  const renderFileUpload = (fieldId, label, required, accept, limitKB, helperText) => {
    const file = fileMeta[fieldId];
    const isUploading = uploadingField === fieldId;
    const error = errors[fieldId];

    return (
      <div className="step2-field-group">
        <label className="step2-label">
          {label} {required && <span className="step2-required">*</span>}
        </label>

        {file && file.url ? (
          <div className="step2-file-preview">
            {fieldId === 'photo' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <img
                  src={file.url}
                  alt="Candidate Photo Preview"
                  style={{
                    width: '90px',
                    height: '110px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '2px solid #2563eb',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <div>
                  <p style={{ margin: '0 0 6px', fontWeight: 600, fontSize: '13px', color: '#15803d' }}>
                    ✓ Photo uploaded ({file.originalName || 'photo.jpg'})
                  </p>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <label className="step2-replace-btn" style={{ cursor: 'pointer', margin: 0 }}>
                      Change Photo
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        accept={accept}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) onFileChange(fieldId, f, limitKB);
                        }}
                      />
                    </label>
                    {onFileRemove && (
                      <button
                        type="button"
                        onClick={() => onFileRemove(fieldId)}
                        style={{
                          backgroundColor: '#fee2e2',
                          color: '#b91c1c',
                          border: '1px solid #fca5a5',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div className="step2-file-info">
                  <span className="step2-file-check">✓</span>
                  <div>
                    <p className="step2-file-name">{file.originalName || 'Uploaded File'}</p>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="step2-file-link"
                    >
                      View Document
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <label className="step2-replace-btn" style={{ cursor: 'pointer', margin: 0 }}>
                    Replace
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      accept={accept}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) onFileChange(fieldId, f, limitKB);
                      }}
                    />
                  </label>
                  {onFileRemove && (
                    <button
                      type="button"
                      onClick={() => onFileRemove(fieldId)}
                      style={{
                        backgroundColor: '#fee2e2',
                        color: '#b91c1c',
                        border: '1px solid #fca5a5',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <label className={`step2-upload-card ${error ? 'has-error' : ''}`}>
            <input
              type="file"
              style={{ display: 'none' }}
              accept={accept}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onFileChange(fieldId, f, limitKB);
              }}
            />
            {isUploading ? (
              <div>
                <p className="step2-upload-text">Uploading... {uploadProgress}%</p>
              </div>
            ) : (
              <>
                <span className="step2-upload-icon">📁</span>
                <p className="step2-upload-text">Click to choose file</p>
                <p className="step2-upload-hint">
                  {helperText || `Max size: ${limitKB >= 1024 ? `${limitKB / 1024} MB` : `${limitKB} KB`}`}
                </p>
              </>
            )}
          </label>
        )}
        {error && <p className="step2-error-text">{error}</p>}
      </div>
    );
  };

  return (
    <div className="step2-container">
      <div className="step2-header">
        <h2 className="step2-title">Personal Information</h2>
        <p className="step2-subtitle">
          Please enter your details exactly as per your ID proofs
        </p>
      </div>

      <div className="step2-grid">
        {/* 1. Post Applied For */}
        <div className="step2-field-group step2-full-width">
          <label className="step2-label">
            Applying for the Post of (Give full name of post along with Advt. No. and date){' '}
            <span className="step2-required">*</span>
          </label>
          <input
            type="text"
            value={values.postAppliedFor || ''}
            onChange={(e) => onValueChange('postAppliedFor', e.target.value)}
            className={`step2-input ${errors.postAppliedFor ? 'step2-input-error' : ''}`}
            placeholder="Give full name of post along with Advt. No. and date"
          />
          {errors.postAppliedFor && <p className="step2-error-text">{errors.postAppliedFor}</p>}
        </div>

        {/* 2. Full Name (Locked) */}
        <div className="step2-field-group">
          <label className="step2-label">
            Name in Full (in Block Letters) <span className="step2-required">*</span>
          </label>
          <input
            type="text"
            value={values.name || ''}
            readOnly
            className="step2-input step2-input-locked"
          />
          <p className="step2-locked-hint">🔒 {lockedFields.name}</p>
        </div>

        {/* 3. Photo Upload */}
        {renderFileUpload(
          'photo',
          'Upload Candidate Passport Size Photo (Max 2 MB, JPG/PNG)',
          true,
          'image/*',
          2048,
          'Passport Size Photo — max 2 MB, JPG or PNG'
        )}

        {/* 4. Present Street */}
        <div className="step2-field-group step2-full-width">
          <label className="step2-label">
            Present Address — Street <span className="step2-required">*</span>
          </label>
          <textarea
            rows={2}
            value={values.presentStreet || ''}
            onChange={(e) => onValueChange('presentStreet', e.target.value)}
            className={`step2-textarea ${errors.presentStreet ? 'step2-input-error' : ''}`}
          />
          {errors.presentStreet && <p className="step2-error-text">{errors.presentStreet}</p>}
        </div>

        {/* 5. City */}
        <div className="step2-field-group">
          <label className="step2-label">
            City <span className="step2-required">*</span>
          </label>
          <input
            type="text"
            value={values.presentCity || ''}
            onChange={(e) => onValueChange('presentCity', e.target.value)}
            className={`step2-input ${errors.presentCity ? 'step2-input-error' : ''}`}
          />
          {errors.presentCity && <p className="step2-error-text">{errors.presentCity}</p>}
        </div>

        {/* 6. State */}
        <div className="step2-field-group">
          <label className="step2-label">
            State / Region / Province <span className="step2-required">*</span>
          </label>
          <input
            type="text"
            value={values.presentState || ''}
            onChange={(e) => onValueChange('presentState', e.target.value)}
            className={`step2-input ${errors.presentState ? 'step2-input-error' : ''}`}
          />
          {errors.presentState && <p className="step2-error-text">{errors.presentState}</p>}
        </div>

        {/* 7. Postal / Zip Code */}
        <div className="step2-field-group">
          <label className="step2-label">Postal / Zip Code</label>
          <input
            type="text"
            value={values.presentPostalCode || ''}
            onChange={(e) => onValueChange('presentPostalCode', e.target.value)}
            className={`step2-input ${errors.presentPostalCode ? 'step2-input-error' : ''}`}
          />
          {errors.presentPostalCode && <p className="step2-error-text">{errors.presentPostalCode}</p>}
        </div>

        {/* 8. Country */}
        <div className="step2-field-group">
          <label className="step2-label">
            Country <span className="step2-required">*</span>
          </label>
          <input
            type="text"
            value={values.presentCountry !== undefined ? values.presentCountry : 'India'}
            onChange={(e) => onValueChange('presentCountry', e.target.value)}
            className={`step2-input ${errors.presentCountry ? 'step2-input-error' : ''}`}
            placeholder="Enter Country"
          />
          {errors.presentCountry && <p className="step2-error-text">{errors.presentCountry}</p>}
        </div>

        {/* 9. Contact No (Locked) */}
        <div className="step2-field-group">
          <label className="step2-label">
            Telephone / Mobile No. <span className="step2-required">*</span>
          </label>
          <input
            type="tel"
            value={values.contactNo1 || ''}
            readOnly
            className="step2-input step2-input-locked"
          />
          <p className="step2-locked-hint">🔒 {lockedFields.contactNo1}</p>
        </div>

        {/* 10. WhatsApp No */}
        <div className="step2-field-group">
          <label className="step2-label">WhatsApp No.</label>
          <input
            type="tel"
            value={values.whatsappNo || ''}
            onChange={(e) => onValueChange('whatsappNo', e.target.value)}
            className={`step2-input ${errors.whatsappNo ? 'step2-input-error' : ''}`}
            placeholder="10-digit mobile number"
          />
          <p className="step2-helper-text">Must be exactly 10 digits starting with 6/7/8/9</p>
          {errors.whatsappNo && <p className="step2-error-text">{errors.whatsappNo}</p>}
        </div>

        {/* 11. Email ID (Locked) */}
        <div className="step2-field-group">
          <label className="step2-label">
            E-mail ID (in Block Letters) <span className="step2-required">*</span>
          </label>
          <input
            type="email"
            value={values.email || ''}
            readOnly
            className="step2-input step2-input-locked"
          />
          <p className="step2-locked-hint">🔒 {lockedFields.email}</p>
        </div>

        {/* 12. Confirm Email ID (Locked / pre-filled) */}
        <div className="step2-field-group">
          <label className="step2-label">
            Re-enter E-mail ID <span className="step2-required">*</span>
          </label>
          <input
            type="email"
            value={values.confirmEmail || values.email || ''}
            onChange={(e) => onValueChange('confirmEmail', e.target.value)}
            className={`step2-input ${errors.confirmEmail ? 'step2-input-error' : ''}`}
          />
          {errors.confirmEmail && <p className="step2-error-text">{errors.confirmEmail}</p>}
        </div>

        {/* 13. Father's Name */}
        <div className="step2-field-group">
          <label className="step2-label">
            Father's Name <span className="step2-required">*</span>
          </label>
          <input
            type="text"
            value={values.fatherName || ''}
            onChange={(e) => onValueChange('fatherName', e.target.value)}
            className={`step2-input ${errors.fatherName ? 'step2-input-error' : ''}`}
            placeholder="Enter Father's Name"
          />
          {errors.fatherName && <p className="step2-error-text">{errors.fatherName}</p>}
        </div>

        {/* 14. Mother's Name */}
        <div className="step2-field-group">
          <label className="step2-label">
            Mother's Name <span className="step2-required">*</span>
          </label>
          <input
            type="text"
            value={values.motherName || ''}
            onChange={(e) => onValueChange('motherName', e.target.value)}
            className={`step2-input ${errors.motherName ? 'step2-input-error' : ''}`}
          />
          {errors.motherName && <p className="step2-error-text">{errors.motherName}</p>}
        </div>

        {/* 15. Nationality */}
        <div className="step2-field-group">
          <label className="step2-label">
            Nationality of the Candidate <span className="step2-required">*</span>
          </label>
          <input
            type="text"
            value={values.nationality !== undefined ? values.nationality : 'Indian'}
            onChange={(e) => onValueChange('nationality', e.target.value)}
            className={`step2-input ${errors.nationality ? 'step2-input-error' : ''}`}
            placeholder="Enter Nationality"
          />
          <p className="step2-helper-text">Default: Indian</p>
          {errors.nationality && <p className="step2-error-text">{errors.nationality}</p>}
        </div>

        {/* 16. Marital Status */}
        <div className="step2-field-group">
          <label className="step2-label">
            Marital Status <span className="step2-required">*</span>
          </label>
          <select
            value={values.maritalStatus || ''}
            onChange={(e) => onValueChange('maritalStatus', e.target.value)}
            className={`step2-select ${errors.maritalStatus ? 'step2-input-error' : ''}`}
          >
            <option value="">Select...</option>
            <option value="Unmarried">Unmarried</option>
            <option value="Married">Married</option>
            <option value="Widow/Widower">Widow/Widower</option>
            <option value="Divorced">Divorced</option>
          </select>
          {errors.maritalStatus && <p className="step2-error-text">{errors.maritalStatus}</p>}
        </div>

        {/* 17. Date of Birth */}
        <div className="step2-field-group">
          <label className="step2-label">
            Date of Birth <span className="step2-required">*</span>
          </label>
          <input
            type="date"
            value={values.dob || ''}
            onChange={(e) => onValueChange('dob', e.target.value)}
            className={`step2-input ${errors.dob ? 'step2-input-error' : ''}`}
          />
          {errors.dob && <p className="step2-error-text">{errors.dob}</p>}
        </div>

        {/* 18. Social Category */}
        <div className="step2-field-group">
          <label className="step2-label">Social Category</label>
          <select
            value={values.socialCategory || ''}
            onChange={(e) => onValueChange('socialCategory', e.target.value)}
            className="step2-select"
          >
            <option value="">Select Category...</option>
            <option value="General">General</option>
            <option value="SC">SC</option>
            <option value="BC-A">BC-A</option>
            <option value="BC-B">BC-B</option>
            <option value="EWS">EWS</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* 19. Category Certificate */}
        {renderFileUpload(
          'categoryCertificate',
          'Category Certificate',
          false,
          'application/pdf,image/*',
          10240,
          'Upload if applicable (Max 10 MB)'
        )}

        {/* 20. Aadhaar Card Number */}
        <div className="step2-field-group">
          <label className="step2-label">Aadhaar Card Number</label>
          <input
            type="text"
            value={values.aadhaarNo || ''}
            onChange={(e) => onValueChange('aadhaarNo', e.target.value)}
            className={`step2-input ${errors.aadhaarNo ? 'step2-input-error' : ''}`}
            placeholder="12-digit Aadhaar Number"
          />
          {errors.aadhaarNo && <p className="step2-error-text">{errors.aadhaarNo}</p>}
        </div>

        {/* 21. Family ID (PPP) */}
        <div className="step2-field-group">
          <label className="step2-label">Family ID (PPP)</label>
          <input
            type="text"
            value={values.familyId || ''}
            onChange={(e) => onValueChange('familyId', e.target.value)}
            className="step2-input"
            placeholder="Parivar Pehchan Patra ID"
          />
        </div>
      </div>
    </div>
  );
}
