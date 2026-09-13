import React from 'react';
import ResearchScoreTable from '../../../components/form/ResearchScoreTable';
import './Step14ResearchScore.css';

export default function Step14ResearchScore({ values = {}, errors = {}, onValueChange }) {
  return (
    <div className="step14-container">
      <div className="step14-header">
        <h2 className="step14-title">Part III: Academic/Research Score</h2>
        <p className="step14-subtitle">
          Assessment criteria as per Table 2, Appendix II (specified by DGHE)
        </p>
      </div>

      <ResearchScoreTable
        values={values}
        errors={errors}
        onValueChange={onValueChange}
      />
    </div>
  );
}
