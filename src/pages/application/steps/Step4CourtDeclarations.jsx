import React from 'react';
import './Step4CourtDeclarations.css';

export default function Step4CourtDeclarations({ values = {}, errors = {}, onValueChange }) {
  return (
    <div className="step4-container">
      <div className="step4-header">
        <h2 className="step4-title">Declarations Regarding Court Cases / Disqualification</h2>
      </div>

      <div className="step4-questions-list">
        {/* Question 1 */}
        <div className="step4-card">
          <label className="step4-question-label">
            Have you ever been prosecuted, kept under detention, bound down, fined, convicted by a Court of Law or debarred/disqualified by any University or Public Service Commission from appearing at its examinations/selection?{' '}
            <span className="step4-required">*</span>
          </label>
          <div className="step4-select-wrapper">
            <select
              value={values.courtCase1 || ''}
              onChange={(e) => onValueChange('courtCase1', e.target.value)}
              className={`step4-select ${errors.courtCase1 ? 'step4-select-error' : ''}`}
            >
              <option value="">Select...</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            {errors.courtCase1 && <p className="step4-error-text">{errors.courtCase1}</p>}
          </div>
        </div>

        {/* Question 1 Details (if Yes) */}
        {values.courtCase1 === 'Yes' && (
          <div className="step4-field-group">
            <label className="step4-question-label" style={{ fontWeight: 600 }}>
              If Yes, give full particulars of the case, detention, fine, conviction, sentence, etc.
            </label>
            <textarea
              rows={3}
              value={values.courtCase1Details || ''}
              onChange={(e) => onValueChange('courtCase1Details', e.target.value)}
              className="step4-textarea"
              placeholder="Give full particulars"
            />
          </div>
        )}

        {/* Question 2 */}
        <div className="step4-card" style={{ marginTop: '12px' }}>
          <label className="step4-question-label">
            Is any case pending against you in any court of law at the time of filling up of this form?{' '}
            <span className="step4-required">*</span>
          </label>
          <div className="step4-select-wrapper">
            <select
              value={values.courtCase2 || ''}
              onChange={(e) => onValueChange('courtCase2', e.target.value)}
              className={`step4-select ${errors.courtCase2 ? 'step4-select-error' : ''}`}
            >
              <option value="">Select...</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            {errors.courtCase2 && <p className="step4-error-text">{errors.courtCase2}</p>}
          </div>
        </div>

        {/* Question 2 Details (if Yes) */}
        {values.courtCase2 === 'Yes' && (
          <div className="step4-field-group">
            <label className="step4-question-label" style={{ fontWeight: 600 }}>
              If Yes, give full particulars of the case
            </label>
            <textarea
              rows={3}
              value={values.courtCase2Details || ''}
              onChange={(e) => onValueChange('courtCase2Details', e.target.value)}
              className="step4-textarea"
              placeholder="Give full particulars of the pending case"
            />
          </div>
        )}
      </div>
    </div>
  );
}
