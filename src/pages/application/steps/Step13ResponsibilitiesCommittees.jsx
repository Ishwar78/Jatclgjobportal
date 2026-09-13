import React from 'react';
import './Step13ResponsibilitiesCommittees.css';

export default function Step13ResponsibilitiesCommittees({
  tableValues = {},
  fileMeta = {},
  uploadingField = null,
  uploadProgress = 0,
  errors = {},
  onTableCellChange,
  onFileChange
}) {
  const biiRows = [
    'Vice-Principal',
    'Bursar',
    'Warden / Hostel Incharge',
    'Proctor / Proctorial Board Member',
    'Incharge Placement Cell',
    'Incharge IQAC',
    'Incharge NAAC',
    'Editor-in-Chief College Journal / Magazine'
  ];

  const biiiRows = [
    'Advisory Committee',
    'Academic Affairs',
    'Time Table',
    'Examination',
    'Library',
    'Sports',
    'Cultural',
    'Purchase',
    'Disciplinary',
    'Women Cell',
    'Youth Red Cross',
    'NSS / NCC Incharge',
    'Nodal Officer (AISHE / MIS)',
    'Incharge College Website',
    'Canteen Committee',
    'Grievances Redressal',
    'Legal Cell'
  ];

  const biiData = tableValues.respBiiTable || biiRows.map(() => ({}));
  const biiiData = tableValues.respBiiiTable || biiiRows.map(() => ({}));

  const part2File = fileMeta.filePart2;
  const isUploading = uploadingField === 'filePart2';

  return (
    <div className="step13-container">
      <div className="step13-header">
        <h2 className="step13-title">
          B(ii) Experience of Key Responsibilities in Colleges & B(iii) Experience of Committees in Colleges
        </h2>
      </div>

      {/* Table B(ii) */}
      <div className="step13-table-section">
        <h3 className="step13-table-heading">
          B(ii) Experience of Key Responsibilities in Colleges — Marks Claimed (Max 3 Marks each)
        </h3>
        <div className="step13-table-wrapper">
          <table className="step13-table">
            <thead>
              <tr>
                <th className="step13-th" style={{ width: '40px', textAlign: 'center' }}>#</th>
                <th className="step13-th" style={{ minWidth: '180px' }}>Responsibility</th>
                <th className="step13-th" style={{ minWidth: '140px' }}>Academic Session</th>
                <th className="step13-th" style={{ minWidth: '180px' }}>College Name</th>
                <th className="step13-th" style={{ minWidth: '150px' }}>From Date – To Date</th>
                <th className="step13-th" style={{ width: '100px', textAlign: 'right' }}>Score Claimed</th>
              </tr>
            </thead>
            <tbody>
              {biiRows.map((label, idx) => {
                const row = biiData[idx] || {};
                return (
                  <tr key={idx}>
                    <td className="step13-td" style={{ textAlign: 'center', color: '#64748b' }}>
                      {idx + 1}
                    </td>
                    <td className="step13-td step13-row-label">{label}</td>
                    <td className="step13-td">
                      <input
                        type="text"
                        placeholder="e.g. 2021-22"
                        value={row.session || ''}
                        onChange={(e) =>
                          onTableCellChange('respBiiTable', idx, 'session', e.target.value)
                        }
                        className="step13-input"
                      />
                    </td>
                    <td className="step13-td">
                      <input
                        type="text"
                        value={row.college || ''}
                        onChange={(e) =>
                          onTableCellChange('respBiiTable', idx, 'college', e.target.value)
                        }
                        className="step13-input"
                      />
                    </td>
                    <td className="step13-td">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY - DD/MM/YYYY"
                        value={row.dates || ''}
                        onChange={(e) =>
                          onTableCellChange('respBiiTable', idx, 'dates', e.target.value)
                        }
                        className="step13-input"
                      />
                    </td>
                    <td className="step13-td">
                      <input
                        type="number"
                        step="any"
                        placeholder="0.0"
                        value={row.score || ''}
                        onChange={(e) =>
                          onTableCellChange('respBiiTable', idx, 'score', e.target.value)
                        }
                        className="step13-input step13-score-input"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table B(iii) */}
      <div className="step13-table-section" style={{ marginTop: '16px' }}>
        <h3 className="step13-table-heading">
          B(iii) Committees in College — Marks Claimed (Max 2 Marks each)
        </h3>
        <div className="step13-table-wrapper">
          <table className="step13-table">
            <thead>
              <tr>
                <th className="step13-th" style={{ width: '40px', textAlign: 'center' }}>#</th>
                <th className="step13-th" style={{ minWidth: '180px' }}>Committee Name</th>
                <th className="step13-th" style={{ minWidth: '140px' }}>Academic Session</th>
                <th className="step13-th" style={{ minWidth: '180px' }}>College Name</th>
                <th className="step13-th" style={{ minWidth: '150px' }}>From Date – To Date</th>
                <th className="step13-th" style={{ width: '100px', textAlign: 'right' }}>Score Claimed</th>
              </tr>
            </thead>
            <tbody>
              {biiiRows.map((label, idx) => {
                const row = biiiData[idx] || {};
                return (
                  <tr key={idx}>
                    <td className="step13-td" style={{ textAlign: 'center', color: '#64748b' }}>
                      {idx + 1}
                    </td>
                    <td className="step13-td step13-row-label">{label}</td>
                    <td className="step13-td">
                      <input
                        type="text"
                        placeholder="e.g. 2021-22"
                        value={row.session || ''}
                        onChange={(e) =>
                          onTableCellChange('respBiiiTable', idx, 'session', e.target.value)
                        }
                        className="step13-input"
                      />
                    </td>
                    <td className="step13-td">
                      <input
                        type="text"
                        value={row.college || ''}
                        onChange={(e) =>
                          onTableCellChange('respBiiiTable', idx, 'college', e.target.value)
                        }
                        className="step13-input"
                      />
                    </td>
                    <td className="step13-td">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY - DD/MM/YYYY"
                        value={row.dates || ''}
                        onChange={(e) =>
                          onTableCellChange('respBiiiTable', idx, 'dates', e.target.value)
                        }
                        className="step13-input"
                      />
                    </td>
                    <td className="step13-td">
                      <input
                        type="number"
                        step="any"
                        placeholder="0.0"
                        value={row.score || ''}
                        onChange={(e) =>
                          onTableCellChange('respBiiiTable', idx, 'score', e.target.value)
                        }
                        className="step13-input step13-score-input"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Document (Part II Supporting Documents) */}
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>
          Upload Document (Part II Supporting Documents - combined PDF, max 20 MB){' '}
          <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
          Upload filled standard format merging all supporting documents in a single PDF
        </p>

        {part2File && part2File.url ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#16a34a', fontSize: '18px' }}>✓</span>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '13px', color: '#14532d' }}>
                  {part2File.originalName || 'Part II Supporting Documents'}
                </p>
                <a
                  href={part2File.url}
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
                  if (f) onFileChange('filePart2', f, 20480);
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
                if (f) onFileChange('filePart2', f, 20480);
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
                  Combined PDF (Max 20 MB)
                </p>
              </>
            )}
          </label>
        )}
        {errors.filePart2 && (
          <p style={{ color: '#dc2626', fontSize: '12px', fontWeight: 600, margin: '2px 0 0 0' }}>
            {errors.filePart2}
          </p>
        )}
      </div>
    </div>
  );
}
