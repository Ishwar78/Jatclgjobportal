import React from 'react';
import TeachingAdminScoreTable from '../../../components/form/TeachingAdminScoreTable';
import './Step12TeachingAdminScore.css';

export default function Step12TeachingAdminScore({ values = {}, errors = {}, onValueChange }) {
  return (
    <div className="step12-container">
      <div className="step12-header">
        <h2 className="step12-title">Part II: Teaching Experience and Assessment of Administrative Skills</h2>
        <p className="step12-subtitle">
          Maximum Score: 30 (Teaching: 20 + Administrative: 10)
        </p>
      </div>

      <TeachingAdminScoreTable
        values={values}
        errors={errors}
        onValueChange={onValueChange}
      />
    </div>
  );
}
