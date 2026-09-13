import React from 'react';
import './Step6Employment.css';

export default function Step6Employment({
  tableValues = {},
  fileMeta = {},
  uploadingField = null,
  uploadProgress = 0,
  errors = {},
  onTableCellChange,
  onAddTableRow,
  onRemoveTableRow,
  onFileChange
}) {
  const columns = [
    { key: 'employer', label: 'Name of Employer' },
    { key: 'designation', label: 'Designation' },
    { key: 'durationFrom', label: 'Duration From', type: 'date' },
    { key: 'durationTo', label: 'Duration To', type: 'date' },
    { key: 'teachingYears', label: 'Teaching Exp. (Years)', type: 'number' }
  ];

  const rows = tableValues.employmentTable && tableValues.employmentTable.length > 0
    ? tableValues.employmentTable
    : [{}, {}, {}, {}, {}];

  const expFile = fileMeta.fileExperienceCerts;
  const isUploading = uploadingField === 'fileExperienceCerts';

  return (
    <div className="step6-container">
      <div className="step6-header">
        <h2 className="step6-title">Details of Present/Previous Employment</h2>
      </div>

      {errors.employmentTable && (
        <p className="step6-error-text">⚠️ {errors.employmentTable}</p>
      )}

      <div className="step6-table-wrapper">
        <table className="step6-table">
          <thead>
            <tr>
              <th className="step6-th" style={{ width: '40px', textAlign: 'center' }}>#</th>
              {columns.map((c) => (
                <th key={c.key} className="step6-th" style={{ minWidth: '160px' }}>
                  {c.label}
                </th>
              ))}
              <th className="step6-th" style={{ width: '40px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx}>
                <td className="step6-td" style={{ textAlign: 'center', color: '#64748b' }}>
                  {rIdx + 1}
                </td>
                {columns.map((c) => (
                  <td key={c.key} className="step6-td">
                    <input
                      type={c.type || 'text'}
                      value={row[c.key] || ''}
                      onChange={(e) =>
                        onTableCellChange('employmentTable', rIdx, c.key, e.target.value)
                      }
                      className="step6-input"
                    />
                  </td>
                ))}
                <td className="step6-td" style={{ textAlign: 'center' }}>
                  {rows.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => onRemoveTableRow('employmentTable', rIdx)}
                      className="step6-delete-btn"
                      title="Remove row"
                    >
                      ×
                    </button>
                  ) : (
                    <span style={{ color: '#cbd5e1' }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={() => onAddTableRow('employmentTable')}
        className="step6-add-btn"
      >
        + Add Row
      </button>

      {/* Attach All Experience Certificates in a Single PDF */}
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>
          Attach All Experience Certificates in a Single PDF{' '}
          <span style={{ color: '#ef4444' }}>*</span>
        </label>

        {expFile && expFile.url ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#16a34a', fontSize: '18px' }}>✓</span>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '13px', color: '#14532d' }}>
                  {expFile.originalName || 'Experience Certificates'}
                </p>
                <a
                  href={expFile.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600 }}
                >
                  View Document
                </a>
              </div>
            </div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', background: '#ffffff', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>
              Replace
              <input
                type="file"
                style={{ display: 'none' }}
                accept="application/pdf"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFileChange('fileExperienceCerts', f, 10240);
                }}
              />
            </label>
          </div>
        ) : (
          <label style={{ border: '2px dashed #94a3b8', borderRadius: '10px', padding: '18px', textAlign: 'center', backgroundColor: '#f8fafc', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '600px' }}>
            <input
              type="file"
              style={{ display: 'none' }}
              accept="application/pdf"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onFileChange('fileExperienceCerts', f, 10240);
              }}
            />
            {isUploading ? (
              <p style={{ fontWeight: 600, color: '#2563eb', margin: 0 }}>
                Uploading... {uploadProgress}%
              </p>
            ) : (
              <>
                <span style={{ fontSize: '24px', marginBottom: '4px' }}>📄</span>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#334155' }}>
                  Click to choose PDF
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
                  ATTACH ALL EXPERIENCE CERTIFICATES IN A SINGLE MERGED PDF (Max 10 MB)
                </p>
              </>
            )}
          </label>
        )}
        {errors.fileExperienceCerts && (
          <p className="step6-error-text">{errors.fileExperienceCerts}</p>
        )}
      </div>
    </div>
  );
}
