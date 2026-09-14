import React from 'react';
import './Step9EmploymentNoc.css';

export default function Step9EmploymentNoc({
  values = {},
  errors = {},
  fileMeta = {},
  uploadingField = null,
  uploadProgress = 0,
  onValueChange,
  onFileChange,
  onOpenNocDraft
}) {
  const isEmployed = values.isPresEmployed === 'Yes';
  const nocFile = fileMeta.fileNOC;
  const isUploading = uploadingField === 'fileNOC';

  return (
    <div className="step9-container">
      <div className="step9-header">
        <h2 className="step9-title">Employment Status & No Objection Certificate</h2>
      </div>

      <div className="step9-field-group">
        <label className="step9-label">
          Are you presently employed? <span className="step9-required">*</span>
        </label>
        <select
          value={values.isPresEmployed || ''}
          onChange={(e) => onValueChange('isPresEmployed', e.target.value)}
          className={`step9-select ${errors.isPresEmployed ? 'step9-select-error' : ''}`}
        >
          <option value="">Select...</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {errors.isPresEmployed && <p className="step9-error-text">{errors.isPresEmployed}</p>}
      </div>

      {isEmployed && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
          {/* NOC Instructions Banner */}
          {/* <div className="step9-noc-banner">
            <p className="step9-noc-text">
              <strong>If Yes:</strong> Submit No Objection Certificate from the employer as per the Standard Format. Download the Standard Format, fill it, get it signed and stamped by your current employer on official letterhead, then upload the signed copy below.
            </p>
          </div> */}

          {/* Name of Current Employer / College / Institution */}
          <div className="step2-field-group">
            <label className="step9-label">
              Name of Current Employer / College / Institution <span className="step9-required">*</span>
            </label>
            <input
              type="text"
              value={values.nocCurrentCollege || ''}
              onChange={(e) => onValueChange('nocCurrentCollege', e.target.value)}
              className={`step9-select ${errors.nocCurrentCollege ? 'step9-select-error' : ''}`}
              placeholder="College / Institution / Organization Name"
            />
            {errors.nocCurrentCollege && <p className="step9-error-text">{errors.nocCurrentCollege}</p>}
          </div>

          {/* Department / Subject */}
          <div className="step2-field-group">
            <label className="step9-label">
              Department / Subject <span className="step9-required">*</span>
            </label>
            <input
              type="text"
              value={values.nocDepartment || ''}
              onChange={(e) => onValueChange('nocDepartment', e.target.value)}
              className={`step9-select ${errors.nocDepartment ? 'step9-select-error' : ''}`}
              placeholder="e.g. Department of Commerce"
            />
            {errors.nocDepartment && <p className="step9-error-text">{errors.nocDepartment}</p>}
          </div>

          {/* Current Designation */}
          <div className="step2-field-group">
            <label className="step9-label">
              Current Designation <span className="step9-required">*</span>
            </label>
            <input
              type="text"
              value={values.nocDesignation || ''}
              onChange={(e) => onValueChange('nocDesignation', e.target.value)}
              className={`step9-select ${errors.nocDesignation ? 'step9-select-error' : ''}`}
              placeholder="e.g. Associate Professor"
            />
            {errors.nocDesignation && <p className="step9-error-text">{errors.nocDesignation}</p>}
          </div>

          {/* NOC Note & Draft Action */}
          <div className="step9-noc-banner">
            <p className="step9-noc-text">
              <strong>If Yes</strong> Click "Generate NOC Draft" button to download your pre-filled NOC certificate draft. Print it on your employer's official letterhead, get it signed and stamped, then upload the signed copy below.
            </p>
            {onOpenNocDraft && (
              <button
                type="button"
                onClick={onOpenNocDraft}
                className="step9-draft-btn"
              >
                Generate NOC Draft
              </button>
            )}
          </div>

          {/* Upload NOC Certificate (fileNOC) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label className="step9-label">
              Upload NOC Certificate from Employer (PDF, as per Standard Format){' '}
              <span className="step9-required">*</span>
            </label>

            {nocFile && nocFile.url ? (
              <div className="step9-file-preview">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#16a34a', fontSize: '18px' }}>✓</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '13px', color: '#14532d' }}>
                      {nocFile.originalName || 'NOC Document'}
                    </p>
                    <a
                      href={nocFile.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600 }}
                    >
                      View Uploaded NOC
                    </a>
                  </div>
                </div>
                <label className="step9-replace-btn">
                  Replace
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    accept="application/pdf"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onFileChange('fileNOC', f, 1024);
                    }}
                  />
                </label>
              </div>
            ) : (
              <label className={`step9-upload-card ${errors.fileNOC ? 'has-error' : ''}`}>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept="application/pdf"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onFileChange('fileNOC', f, 1024);
                  }}
                />
                {isUploading ? (
                  <p style={{ fontWeight: 600, color: '#2563eb', margin: 0 }}>
                    Uploading... {uploadProgress}%
                  </p>
                ) : (
                  <>
                    <span style={{ fontSize: '26px', marginBottom: '4px' }}>📄</span>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#334155' }}>
                      Click to choose signed NOC file
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
                      PDF only, max 1 MB. Must be on employer letterhead with signature and stamp.
                    </p>
                  </>
                )}
              </label>
            )}
            {errors.fileNOC && <p className="step9-error-text">{errors.fileNOC}</p>}
          </div>
        </div>
      )}

      {/* Other Service Details (Merged below NOC) */}
      <div className="step9-other-service">
        {/* <div className="step9-section-header">
          <h3 className="step9-subtitle-title">Other Service Details</h3>
        </div> */}

        <div className="step9-grid">
          <div className="step9-field-group">
            <label className="step9-label">Basic Pay Acceptable</label>
            <input
              type="text"
              value={values.basicPayAcceptable || ''}
              onChange={(e) => onValueChange('basicPayAcceptable', e.target.value)}
              className="step9-input"
              placeholder="e.g. As per norms / 70,000"
            />
            <p className="step9-helper-text">e.g. As per norms / 70,000</p>
          </div>

          <div className="step9-field-group">
            <label className="step9-label">
              Period required for joining the post, if selected
            </label>
            <input
              type="text"
              value={values.joiningPeriod || ''}
              onChange={(e) => onValueChange('joiningPeriod', e.target.value)}
              className="step9-input"
              placeholder="e.g. 30 days / One month / Immediately"
            />
            <p className="step9-helper-text">e.g. 30 days / One month / Immediately</p>
          </div>
        </div>
      </div>
    </div>
  );
}
