import React from 'react';
import './Step5EducationQualifications.css';

export default function Step5EducationQualifications({
  values = {},
  errors = {},
  tableValues = {},
  onValueChange,
  onTableCellChange,
  onAddTableRow,
  onRemoveTableRow
}) {
  const defaultDegrees = [
    'Matriculation',
    'Prep/Pre/10+2',
    'Graduation',
    'Post-Graduation',
    'B.Ed.',
    'M.Ed.',
    'M.Phil',
    'Ph.D.',
    'NET/SLET',
    'Any Other'
  ];

  const columns = [
    { key: 'university', label: 'University/Board' },
    { key: 'rollNo', label: 'Roll No.' },
    { key: 'yearOfPassing', label: 'Year of Passing' },
    { key: 'marksMax', label: 'Marks Maximum' },
    { key: 'marksObtained', label: 'Marks Obtained' },
    { key: 'percentage', label: '% age Marks' },
    { key: 'division', label: 'Division' },
    { key: 'subjects', label: 'Subjects' },
    { key: 'insb', label: 'Distinction/Remark (if any)' }
  ];

  const rows = tableValues.educationDetails || defaultDegrees.map(() => ({}));

  return (
    <div className="step5-container">
      <div className="step5-header">
        <h2 className="step5-title">Educational Qualifications</h2>
        <p className="step5-subtitle">
          Scroll right to fill all columns. Enter details exactly as per certificates.
        </p>
      </div>

      {errors.educationDetails && (
        <p className="step5-error-banner">⚠️ {errors.educationDetails}</p>
      )}

      {/* Qualifications Dynamic Table */}
      <div className="step5-table-wrapper">
        <table className="step5-table">
          <thead>
            <tr>
              <th className="step5-th" style={{ width: '40px', textAlign: 'center' }}>#</th>
              <th className="step5-th" style={{ minWidth: '150px' }}>Degree</th>
              {columns.map((c) => (
                <th key={c.key} className="step5-th" style={{ minWidth: '130px' }}>
                  {c.label}
                </th>
              ))}
              <th className="step5-th" style={{ width: '40px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => {
              const degreeName = defaultDegrees[rIdx] || 'Additional';
              const isExtra = rIdx >= defaultDegrees.length;

              return (
                <tr key={rIdx}>
                  <td className="step5-td" style={{ textAlign: 'center', color: '#64748b' }}>
                    {rIdx + 1}
                  </td>
                  <td className="step5-td step5-degree-label">{degreeName}</td>
                  {columns.map((c) => (
                    <td key={c.key} className="step5-td">
                      <input
                        type="text"
                        value={row[c.key] || ''}
                        onChange={(e) =>
                          onTableCellChange('educationDetails', rIdx, c.key, e.target.value)
                        }
                        className="step5-table-input"
                      />
                    </td>
                  ))}
                  <td className="step5-td" style={{ textAlign: 'center' }}>
                    {isExtra ? (
                      <button
                        type="button"
                        onClick={() => onRemoveTableRow('educationDetails', rIdx)}
                        className="step5-delete-btn"
                        title="Remove row"
                      >
                        ×
                      </button>
                    ) : (
                      <span style={{ color: '#cbd5e1' }}>—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={() => onAddTableRow('educationDetails')}
        className="step5-add-btn"
      >
        + Add Row
      </button>

      {/* Topic of M.Phil Dissertation */}
      <div className="step5-textarea-group" style={{ marginTop: '16px' }}>
        <label className="step5-score-label">Topic of M.Phil Dissertation</label>
        <textarea
          rows={2}
          value={values.mphilTopic || ''}
          onChange={(e) => onValueChange('mphilTopic', e.target.value)}
          className="step5-textarea"
          placeholder="Topic of M.Phil Dissertation (if applicable)"
        />
      </div>

      {/* Topic of Research for Ph.D. */}
      <div className="step5-textarea-group">
        <label className="step5-score-label">
          Topic of Research for Ph.D. <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <textarea
          rows={2}
          value={values.phdTopic || ''}
          onChange={(e) => onValueChange('phdTopic', e.target.value)}
          className="step5-textarea"
          placeholder="Topic of Research for Ph.D."
        />
        {errors.phdTopic && <p className="step5-error-banner">{errors.phdTopic}</p>}
      </div>

      {/* Field of Specialization */}
      <div className="step5-textarea-group">
        <label className="step5-score-label">
          Field of Specialization <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          type="text"
          value={values.fieldOfSpecialization || ''}
          onChange={(e) => onValueChange('fieldOfSpecialization', e.target.value)}
          className="step5-textarea"
          placeholder="Field of Specialization"
          style={{ height: '42px', padding: '8px 12px' }}
        />
        {errors.fieldOfSpecialization && (
          <p className="step5-error-banner">{errors.fieldOfSpecialization}</p>
        )}
      </div>
    </div>
  );
}
