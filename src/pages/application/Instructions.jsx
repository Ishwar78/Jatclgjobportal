import React from "react";
import "./Instructions.css";
import { FaCalendarAlt, FaExclamationTriangle, FaChevronRight } from "react-icons/fa";

export default function Instructions() {
  return (
    <div className="instructions-page">
      <div className="instructions-container">

        {/* Heading */}
        <div className="page-heading">
          <h2>Please Read the Instructions Below</h2>
        </div>

        {/* Application Timeline */}
        <div className="timeline-card">

          <div className="timeline-left">
            <div className="calendar-icon">
              <FaCalendarAlt />
            </div>

            <div className="timeline-content">
              <h3>Application Timeline</h3>

              <p>
                Closing Date: <strong>2026-11-30</strong> at{" "}
                <strong>23:59:59</strong>
              </p>
            </div>
          </div>

          <div className="timeline-warning">
            <FaExclamationTriangle />
            <span>
              No consideration for incomplete and after last date application.
            </span>
          </div>

        </div>

        {/* Instructions */}
        <div className="instruction-list">

          <div className="instruction-box">
            <p>
              The last date for the receipt of hard copy of application will be
              the same as the closing date of the portal mentioned in the
              advertisment. Applications found incomplete and/or received after
              the due date will not be considered.
            </p>
          </div>

          <div className="instruction-box">
            <p>
              This application form should be properly filled. Photocopies of all
              certificates/testimonials must be attached. Originals will have to
              be shown at the time of Interview.
            </p>
          </div>

          <div className="instruction-box">
            <p>
              The printout/hard copy of the generated PDF must be submitted to :-
              1. The Dean, College Development Council, M.D. University Rohtak;
              2. The Director General, Higher Education, Shiksha Sadan, Sector-5,
              Panchkula; 3. The Office of the President, Jat Education Society
              (Regd.) Rohtak
            </p>
          </div>

        </div>

        {/* Bottom Button */}
        <div className="bottom-section">
          <button className="save-next-btn">
            <span>Save & Next</span>
            <FaChevronRight />
          </button>
        </div>

      </div>
    </div>
  );
}