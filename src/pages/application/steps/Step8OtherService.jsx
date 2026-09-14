import React from 'react';
import './Step8OtherService.css';

export default function Step8OtherService({ values = {}, errors = {}, onValueChange }) {
  return (
    <div className="step8-container">
      {/* <div className="step8-header">
        <h2 className="step8-title">Other Service Details</h2>
      </div> */}

      <div className="step8-grid">
        <div className="step8-field-group">
          <label className="step8-label">Basic Pay Acceptable</label>
          <input
            type="text"
            value={values.basicPayAcceptable || ''}
            onChange={(e) => onValueChange('basicPayAcceptable', e.target.value)}
            className="step8-input"
            placeholder="e.g. As per norms / 70,000"
          />
          <p className="step2-helper-text">e.g. As per norms / 70,000</p>
        </div>

        <div className="step8-field-group">
          <label className="step8-label">
            Period required for joining the post, if selected
          </label>
          <input
            type="text"
            value={values.joiningPeriod || ''}
            onChange={(e) => onValueChange('joiningPeriod', e.target.value)}
            className="step8-input"
            placeholder="e.g. 30 days / One month / Immediately"
          />
          <p className="step2-helper-text">e.g. 30 days / One month / Immediately</p>
        </div>
      </div>
    </div>
  );
}
