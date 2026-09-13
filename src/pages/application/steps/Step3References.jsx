import React from 'react';
import './Step3References.css';

export default function Step3References({ values = {}, errors = {}, onValueChange }) {
  return (
    <div className="step3-container">
      <div className="step3-header">
        <h2 className="step3-title">References</h2>
        <p className="step3-subtitle">Two referees who are well acquainted with the applicant</p>
      </div>

      <div className="step3-note-box">
        These should be professionally competent persons who are well acquainted with some aspects
        of the applicant’s training, accomplishments, capabilities and character but must not be
        relations. At least one referee should be citizen of India. For applicants having done
        doctoral or post-doctoral research, the research supervisors must be listed.
      </div>

      {/* REFEREE 1 */}
      <div className="step3-referee-section">
        <div className="step3-referee-banner">Referee 1</div>

        <div className="step3-grid">
          {/* First Name */}
          <div className="step3-field-group">
            <label className="step3-label">
              First Name <span className="step3-required">*</span>
            </label>
            <input
              type="text"
              value={values.ref1FirstName || ''}
              onChange={(e) => onValueChange('ref1FirstName', e.target.value)}
              className={`step3-input ${errors.ref1FirstName ? 'step3-input-error' : ''}`}
            />
            {errors.ref1FirstName && <p className="step3-error-text">{errors.ref1FirstName}</p>}
          </div>

          {/* Last Name */}
          <div className="step3-field-group">
            <label className="step3-label">
              Last Name <span className="step3-required">*</span>
            </label>
            <input
              type="text"
              value={values.ref1LastName || ''}
              onChange={(e) => onValueChange('ref1LastName', e.target.value)}
              className={`step3-input ${errors.ref1LastName ? 'step3-input-error' : ''}`}
            />
            {errors.ref1LastName && <p className="step3-error-text">{errors.ref1LastName}</p>}
          </div>

          {/* Occupation */}
          <div className="step3-field-group">
            <label className="step3-label">
              Occupation or Position <span className="step3-required">*</span>
            </label>
            <input
              type="text"
              value={values.ref1Occupation || ''}
              onChange={(e) => onValueChange('ref1Occupation', e.target.value)}
              className={`step3-input ${errors.ref1Occupation ? 'step3-input-error' : ''}`}
            />
            {errors.ref1Occupation && <p className="step3-error-text">{errors.ref1Occupation}</p>}
          </div>

          {/* Empty spacer on desktop to push Address to full row or let Address take full width */}
          <div className="step3-field-group step3-full-width">
            <label className="step3-label">
              Address <span className="step3-required">*</span>
            </label>
            <textarea
              rows={3}
              value={values.ref1Address || ''}
              onChange={(e) => onValueChange('ref1Address', e.target.value)}
              className={`step3-textarea ${errors.ref1Address ? 'step3-input-error' : ''}`}
            />
            {errors.ref1Address && <p className="step3-error-text">{errors.ref1Address}</p>}
          </div>

          {/* Contact Phone */}
          <div className="step3-field-group">
            <label className="step3-label">
              Contact Phone <span className="step3-required">*</span>
            </label>
            <input
              type="tel"
              value={values.ref1Phone || ''}
              onChange={(e) => onValueChange('ref1Phone', e.target.value)}
              className={`step3-input ${errors.ref1Phone ? 'step3-input-error' : ''}`}
            />
            <p className="step3-helper-text">Must be exactly 10 digits starting with 6/7/8/9</p>
            {errors.ref1Phone && <p className="step3-error-text">{errors.ref1Phone}</p>}
          </div>

          {/* Contact Email */}
          <div className="step3-field-group">
            <label className="step3-label">
              Contact Email <span className="step3-required">*</span>
            </label>
            <input
              type="email"
              value={values.ref1Email || ''}
              onChange={(e) => onValueChange('ref1Email', e.target.value)}
              className={`step3-input ${errors.ref1Email ? 'step3-input-error' : ''}`}
            />
            {errors.ref1Email && <p className="step3-error-text">{errors.ref1Email}</p>}
          </div>
        </div>
      </div>

      {/* REFEREE 2 */}
      <div className="step3-referee-section" style={{ marginTop: '12px' }}>
        <div className="step3-referee-banner">Referee 2</div>

        <div className="step3-grid">
          {/* First Name */}
          <div className="step3-field-group">
            <label className="step3-label">
              First Name <span className="step3-required">*</span>
            </label>
            <input
              type="text"
              value={values.ref2FirstName || ''}
              onChange={(e) => onValueChange('ref2FirstName', e.target.value)}
              className={`step3-input ${errors.ref2FirstName ? 'step3-input-error' : ''}`}
            />
            {errors.ref2FirstName && <p className="step3-error-text">{errors.ref2FirstName}</p>}
          </div>

          {/* Last Name */}
          <div className="step3-field-group">
            <label className="step3-label">
              Last Name <span className="step3-required">*</span>
            </label>
            <input
              type="text"
              value={values.ref2LastName || ''}
              onChange={(e) => onValueChange('ref2LastName', e.target.value)}
              className={`step3-input ${errors.ref2LastName ? 'step3-input-error' : ''}`}
            />
            {errors.ref2LastName && <p className="step3-error-text">{errors.ref2LastName}</p>}
          </div>

          {/* Occupation */}
          <div className="step3-field-group">
            <label className="step3-label">
              Occupation or Position <span className="step3-required">*</span>
            </label>
            <input
              type="text"
              value={values.ref2Occupation || ''}
              onChange={(e) => onValueChange('ref2Occupation', e.target.value)}
              className={`step3-input ${errors.ref2Occupation ? 'step3-input-error' : ''}`}
            />
            {errors.ref2Occupation && <p className="step3-error-text">{errors.ref2Occupation}</p>}
          </div>

          {/* Address */}
          <div className="step3-field-group step3-full-width">
            <label className="step3-label">
              Address <span className="step3-required">*</span>
            </label>
            <textarea
              rows={3}
              value={values.ref2Address || ''}
              onChange={(e) => onValueChange('ref2Address', e.target.value)}
              className={`step3-textarea ${errors.ref2Address ? 'step3-input-error' : ''}`}
            />
            {errors.ref2Address && <p className="step3-error-text">{errors.ref2Address}</p>}
          </div>

          {/* Contact Phone */}
          <div className="step3-field-group">
            <label className="step3-label">
              Contact Phone <span className="step3-required">*</span>
            </label>
            <input
              type="tel"
              value={values.ref2Phone || ''}
              onChange={(e) => onValueChange('ref2Phone', e.target.value)}
              className={`step3-input ${errors.ref2Phone ? 'step3-input-error' : ''}`}
            />
            <p className="step3-helper-text">Must be exactly 10 digits starting with 6/7/8/9</p>
            {errors.ref2Phone && <p className="step3-error-text">{errors.ref2Phone}</p>}
          </div>

          {/* Contact Email */}
          <div className="step3-field-group">
            <label className="step3-label">
              Contact Email <span className="step3-required">*</span>
            </label>
            <input
              type="email"
              value={values.ref2Email || ''}
              onChange={(e) => onValueChange('ref2Email', e.target.value)}
              className={`step3-input ${errors.ref2Email ? 'step3-input-error' : ''}`}
            />
            {errors.ref2Email && <p className="step3-error-text">{errors.ref2Email}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
