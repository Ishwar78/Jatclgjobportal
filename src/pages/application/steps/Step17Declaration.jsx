import React from 'react';
import './Step17Declaration.css';

export default function Step17Declaration({
  values = {},
  errors = {},
  fileMeta = {},
  uploadingField = null,
  uploadProgress = 0,
  onValueChange,
  onFileChange,
  onFileRemove
}) {
  const sigFile = fileMeta.signature;
  const isUploading = uploadingField === 'signature';
  const isVerified =
    values.finalVerification === 'true' || values.finalVerification === true;

  return (
    <div className="step17-container">
      <div className="step17-header">
        <h2 className="step17-title">Declaration</h2>
        <p className="step17-subtitle">Final verification and sign-off</p>
      </div>
{/* Final Verification Checkbox - placed ABOVE Date, Place & Signature as requested */}
      <div>
        <label className="step17-verification-card">
          <input
            type="checkbox"
            checked={isVerified}
            onChange={(e) =>
              onValueChange('finalVerification', e.target.checked ? 'true' : 'false')
            }
            className="step17-checkbox"
          />
          <span className="step17-checkbox-label">
            I have checked and re-verified all the information provided in this application form as
            per the Criteria for selection of Principal.{' '}
            <span className="step17-required">*</span>
          </span>
        </label>
        {errors.finalVerification && (
          <p className="step17-error-text" style={{ marginTop: '6px' }}>
            {errors.finalVerification}
          </p>
        )}
      </div>
      {/* Prominent Declaration Note - placed ABOVE Date, Place & Signature as requested */}
      <div className="step17-declaration-box">
        <strong>Undertaking:</strong> I hereby declare and undertake that all the information
        provided by me in this application form is true, correct and complete to the best of my
        knowledge and belief and nothing has been concealed therein. In case any information is
        found to be false, incorrect or misleading, my candidature/appointment is liable to be
        cancelled.
      </div>

      

      {/* Place, Date, and Signature Grid */}
      <div className="step17-grid" style={{ marginTop: '10px' }}>
        {/* Place */}
        <div className="step17-field-group">
          <label className="step17-label">
            Place <span className="step17-required">*</span>
          </label>
          <input
            type="text"
            value={values.place || ''}
            onChange={(e) => onValueChange('place', e.target.value)}
            className={`step17-input ${errors.place ? 'step17-input-error' : ''}`}
            placeholder="Enter City / Town"
          />
          {errors.place && <p className="step17-error-text">{errors.place}</p>}
        </div>

        {/* Date */}
        <div className="step17-field-group">
          <label className="step17-label">
            Date <span className="step17-required">*</span>
          </label>
          <input
            type="date"
            value={values.date || ''}
            onChange={(e) => onValueChange('date', e.target.value)}
            className={`step17-input ${errors.date ? 'step17-input-error' : ''}`}
          />
          {errors.date && <p className="step17-error-text">{errors.date}</p>}
        </div>

        {/* Candidate Signature Upload with Image Preview */}
        <div className="step17-field-group step17-full-width">
          <label className="step17-label">
            Upload Candidate Signature <span className="step17-required">*</span>
          </label>

          {sigFile && sigFile.url ? (
            <div className="step17-file-preview" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <img
                src={sigFile.url}
                alt="Candidate Signature Preview"
                style={{
                  width: '140px',
                  height: '60px',
                  objectFit: 'contain',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '4px'
                }}
              />
              <div>
                <p style={{ margin: '0 0 6px', fontWeight: 600, fontSize: '13px', color: '#15803d' }}>
                  ✓ Signature uploaded ({sigFile.originalName || 'signature.png'})
                </p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <label className="step17-replace-btn" style={{ cursor: 'pointer', margin: 0 }}>
                    Change Signature
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) onFileChange('signature', f, 2048);
                      }}
                    />
                  </label>
                  {onFileRemove && (
                    <button
                      type="button"
                      onClick={() => onFileRemove('signature')}
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
            <label className={`step17-upload-card ${errors.signature ? 'step17-input-error' : ''}`}>
              <input
                type="file"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFileChange('signature', f, 2048);
                }}
              />
              {isUploading ? (
                <p style={{ fontWeight: 600, color: '#2563eb', margin: 0 }}>
                  Uploading... {uploadProgress}%
                </p>
              ) : (
                <>
                  <span style={{ fontSize: '24px', marginBottom: '4px' }}>✍️</span>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#334155' }}>
                    Click to upload signature
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
                    Image format (Max 2 MB, JPEG / PNG)
                  </p>
                </>
              )}
            </label>
          )}
          {errors.signature && <p className="step17-error-text">{errors.signature}</p>}
        </div>
      </div>
    </div>
  );
}
