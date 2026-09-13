import React from 'react';
import AcademicRecordScoreTable from '../../../components/form/AcademicRecordScoreTable';
import './Step11AcademicRecord.css';

export default function Step11AcademicRecord({ values = {}, errors = {}, onValueChange }) {
  return (
    <div className="step11-container">
      <div className="step11-header">
        <h2 className="step11-title">Part I: Academic Record</h2>
        <p className="step11-subtitle">
          Consolidated Academic Record Score as per Table 2, Appendix II (Maximum 20 Marks)
        </p>
      </div>

      <AcademicRecordScoreTable
        values={values}
        errors={errors}
        onValueChange={onValueChange}
      />
    </div>
  );
}
