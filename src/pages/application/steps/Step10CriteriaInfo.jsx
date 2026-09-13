import React from 'react';
import SelectionCriteriaTables from '../../../components/form/SelectionCriteriaTables';
import './Step10CriteriaInfo.css';

export default function Step10CriteriaInfo({ values = {}, errors = {}, onValueChange }) {
  const isAccepted = values.criteriaAccepted === 'true' || values.criteriaAccepted === true;

  return (
    <div className="step10-container">
      <div className="step10-header">
        <h2 className="step10-title">Criteria for Selection of Principal</h2>
        <p className="step10-subtitle">
          Selection criteria as notified by the Directorate General Higher Education (DGHE), Haryana
        </p>
      </div>

      <SelectionCriteriaTables />

      <div style={{ marginTop: '10px' }}>
        <label className="step10-checkbox-card">
          <input
            type="checkbox"
            checked={isAccepted}
            onChange={(e) => onValueChange('criteriaAccepted', e.target.checked ? 'true' : 'false')}
            className="step10-checkbox"
          />
          <span className="step10-checkbox-label">
            I have read and understood the above criteria for selection of Principal{' '}
            <span className="step10-required">*</span>
          </span>
        </label>
        {errors.criteriaAccepted && (
          <p className="step10-error-text">{errors.criteriaAccepted}</p>
        )}
      </div>
    </div>
  );
}
