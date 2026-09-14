import React from 'react';
import {
  formatIndianDate,
  formatIndianDateLong,
  formatIndianTime
} from '../../../utils/indianDateTime';
import './Step1Instructions.css';

export default function Step1Instructions({ config = {}, instructions: customInstructions, onProceed }) {
  const [accepted, setAccepted] = React.useState(true);

  const defaultInstructions = [
    {
      id: 'instrDeadline',
      text: 'The last date for the receipt of hard copy of application will be the same as the closing date of the portal mentioned in the advertisement. Applications found incomplete and/or received after the due date will not be considered.'
    },
    {
      id: 'instrFill',
      text: 'This application form should be properly filled. Photocopies of all certificates/testimonials must be attached. Originals will have to be shown at the time of Interview.'
    },
    {
      id: 'instrForward',
      text: 'The applicants should send their applications after getting forwarded by their current employer. Printout of the completely filled application form must also be sent to the Dean of Colleges, M.D. University, Rohtak and also to the Director General Higher Education, Shiksha Sadan, Sector 5, Panchkula by the last date given in the advertisement.'
    },
    {
      id: 'instrIncomplete',
      text: 'Applications received after the due date or found incomplete will not be considered.'
    }
  ];

  const items =
    Array.isArray(customInstructions) && customInstructions.length > 0
      ? customInstructions
      : Array.isArray(config.instructions) && config.instructions.length > 0
      ? config.instructions
      : defaultInstructions;

  const deadlineDate = config.deadline_date || config.closingDate || '2026-03-31';
  const deadlineTime = config.deadline_time || config.closingTime || '11:59 PM';
  const warningText =
    config.warning_text || '⚠️ No consideration for incomplete and after last date application.';

  return (
    <div className="step1-container">
      <div className="step1-header">
        <h2 className="step1-title">Please Read the Instructions Below</h2>
      </div>

      <div className="step1-timeline-box">
        <div className="step1-timeline-content">
          <div className="step1-timeline-icon">📅</div>
          <div>
            <h3 className="step1-timeline-heading">Application Timeline</h3>
            <p className="step1-timeline-dates">
              Closing Date: <strong>{formatIndianDate(deadlineDate)}</strong> {deadlineDate && `(${formatIndianDateLong(deadlineDate)})`} at <strong>{formatIndianTime(deadlineTime, true)}</strong>
            </p>
          </div>
        </div>
        <div className="step1-timeline-badge">{warningText}</div>
      </div>

      <div className="step1-instructions-list">
        {items.map((item, index) => (
          <div key={item.id || index} className="step1-instruction-card">
            <span className="step1-instruction-num">{index + 1}</span>
            <p className="step1-instruction-text">{typeof item === 'string' ? item : item.text}</p>
          </div>
        ))}
      </div>

      {/* Candidate Undertaking & Proceed Button */}
      <div className="step1-proceed-box">
        <label className="step1-checkbox-label">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="step1-checkbox"
          />
          <span>
            I have carefully read and understood all the general instructions, eligibility conditions, and guidelines mentioned above before proceeding to fill the application form.
          </span>
        </label>

        {onProceed && (
          <button
            type="button"
            onClick={onProceed}
            disabled={!accepted}
            className={`step1-proceed-btn ${!accepted ? 'step1-btn-disabled' : ''}`}
          >
            Save & Continue to Step 2: Personal Information ›
          </button>
        )}
      </div>
    </div>
  );
}
