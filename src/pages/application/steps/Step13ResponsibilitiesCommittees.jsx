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
  // Exact 8 rows as per Image (ii): Experience of Key Responsibilities in Colleges
  const biiItems = [
    {
      id: 'bii_1',
      label: 'Staff Representative or V.C. Nominee in Managing Committee of any College',
      marks: '01 Marks for each year Maximum upto 3 marks',
      maxMarks: 3
    },
    {
      id: 'bii_2',
      label: 'Coordinator or Organizing Secretary of International/National/State Conference/Event',
      marks: '01 Marks for each year Maximum upto 3 marks',
      maxMarks: 3
    },
    {
      id: 'bii_3',
      label: 'Bursar',
      marks: '01 Marks for each year Maximum upto 3 marks',
      maxMarks: 3
    },
    {
      id: 'bii_4',
      label: 'NSS Programme Officer',
      marks: '01 Marks for each year Maximum upto 3 marks',
      maxMarks: 3
    },
    {
      id: 'bii_5',
      label: 'YRC Counsellor',
      marks: '01 Marks for each year Maximum upto 3 marks',
      maxMarks: 3
    },
    {
      id: 'bii_6',
      label: 'Hostel Warden',
      marks: '01 Marks for each year Maximum upto 3 marks',
      maxMarks: 3
    },
    {
      id: 'bii_7',
      label: 'Member of any Statutory Body of University',
      marks: '01 Marks for each year Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'bii_8',
      label: 'Experience as Associate NCC Officer in HEI (s)',
      marks: '01 Marks for each year Maximum upto 3 marks',
      maxMarks: 3
    }
  ];

  // Exact 17 rows as per Image (iii): Experience of Committees in Colleges
  const biiiItems = [
    {
      id: 'biii_1',
      label: 'Co-ordinator  IQAC',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_2',
      label: 'Editor in Chief, College Magazine',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_3',
      label: 'Member,  College  Advisory  Council',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_4',
      label: 'Convenor, University Work Committee',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_5',
      label: 'Convenor,  Cultural  Affairs  Committee',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_6',
      label: 'Convenor,  Purchase/Procurement  Committee',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_7',
      label: 'Convenor,  Building/Works  Committee',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_8',
      label: 'Convenor, Sports Committee',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_9',
      label: 'Convenor,  Discipline  Committee',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_10',
      label: 'Convenor, Internal (Complaint) Committee',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_11',
      label: 'Convenor, Road Safety Club',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_12',
      label: 'Convenor, Red Ribbon Club',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_13',
      label: 'Convenor, Eco-Club',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_14',
      label: 'In-charge, Placement Cell',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_15',
      label: 'In-charge. Women Cell',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_16',
      label: 'In-charge, Time-table Committee',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    },
    {
      id: 'biii_17',
      label: 'In-charge, SC/BC Committee',
      marks: '01 Marks for each academic year, Maximum upto 2 marks',
      maxMarks: 2
    }
  ];

  const biiData = tableValues.respBiiTable || biiItems.map(() => ({}));
  const biiiData = tableValues.respBiiiTable || biiiItems.map(() => ({}));

  const part2File = fileMeta.filePart2;
  const isUploading = uploadingField === 'filePart2';

  // Calculate total scores claimed
  const totalBiiScore = biiItems.reduce((acc, _, i) => {
    const val = parseFloat(biiData[i]?.score || 0);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  const totalBiiiScore = biiiItems.reduce((acc, _, i) => {
    const val = parseFloat(biiiData[i]?.score || 0);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <div className="step13-container">
      {/* Step Header */}
      <div className="step13-header">
        <h2 className="step13-title">
          Part II B(ii) & B(iii): Responsibilities & Committees in Colleges
        </h2>
        <p className="step13-subtitle">
          Experience of Key Responsibilities and Committees in Colleges as per Selection Criteria
        </p>
      </div>

      {/* Table (ii) Experience of Key Responsibilities in Colleges */}
      <div className="step13-table-section">
        <h3 className="step13-table-heading">
          (ii) Experience of Key Responsibilities in Colleges
        </h3>
        <div className="step13-table-wrapper">
          <table className="step13-table">
            <thead>
              <tr>
                <th className="step13-th" style={{ width: '45px', textAlign: 'center' }}>Sr. No</th>
                <th className="step13-th" style={{ minWidth: '220px' }}>Particulars</th>
                <th className="step13-th" style={{ minWidth: '180px' }}>Marks / Criteria</th>
                <th className="step13-th" style={{ minWidth: '130px' }}>Academic Session</th>
                <th className="step13-th" style={{ width: '110px', textAlign: 'right' }}>Score Claimed</th>
              </tr>
            </thead>
            <tbody>
              {biiItems.map((item, idx) => {
                const row = biiData[idx] || {};
                return (
                  <tr key={item.id || idx}>
                    <td className="step13-td" style={{ textAlign: 'center', color: '#64748b', fontWeight: 600 }}>
                      {idx + 1}.
                    </td>
                    <td className="step13-td step13-row-label">
                      {item.label}
                    </td>
                    <td className="step13-td step13-criteria-cell">
                      {item.marks}
                    </td>
                    <td className="step13-td">
                      <input
                        type="text"
                        placeholder="e.g. 2021-22"
                        value={row.session || ''}
                        onChange={(e) => {
                          onTableCellChange('respBiiTable', idx, 'particulars', item.label);
                          onTableCellChange('respBiiTable', idx, 'marksCriteria', item.marks);
                          onTableCellChange('respBiiTable', idx, 'session', e.target.value);
                        }}
                        className="step13-input"
                      />
                    </td>
                    <td className="step13-td">
                      <input
                        type="number"
                        step="any"
                        min="0"
                        max={item.maxMarks}
                        placeholder="0.0"
                        value={row.score || ''}
                        onChange={(e) => {
                          onTableCellChange('respBiiTable', idx, 'particulars', item.label);
                          onTableCellChange('respBiiTable', idx, 'marksCriteria', item.marks);
                          onTableCellChange('respBiiTable', idx, 'score', e.target.value);
                        }}
                        className="step13-input step13-score-input"
                      />
                    </td>
                  </tr>
                );
              })}
              <tr className="step13-total-row">
                <td colSpan={4} className="step13-td step13-total-label">
                  Total B(ii) Score Claimed:
                </td>
                <td className="step13-td step13-total-val">
                  {totalBiiScore.toFixed(1)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Table (iii) Experience of Committees in Colleges */}
      <div className="step13-table-section" style={{ marginTop: '20px' }}>
        <h3 className="step13-table-heading">
          (iii) Experience of Committees in Colleges
        </h3>
        <div className="step13-table-wrapper">
          <table className="step13-table">
            <thead>
              <tr>
                <th className="step13-th" style={{ width: '45px', textAlign: 'center' }}>Sr. No</th>
                <th className="step13-th" style={{ minWidth: '220px' }}>Particulars</th>
                <th className="step13-th" style={{ minWidth: '180px' }}>Marks / Criteria</th>
                <th className="step13-th" style={{ minWidth: '130px' }}>Academic Session</th>
                <th className="step13-th" style={{ width: '110px', textAlign: 'right' }}>Score Claimed</th>
              </tr>
            </thead>
            <tbody>
              {biiiItems.map((item, idx) => {
                const row = biiiData[idx] || {};
                return (
                  <tr key={item.id || idx}>
                    <td className="step13-td" style={{ textAlign: 'center', color: '#64748b', fontWeight: 600 }}>
                      {idx + 1}.
                    </td>
                    <td className="step13-td step13-row-label">
                      {item.label}
                    </td>
                    <td className="step13-td step13-criteria-cell">
                      {item.marks}
                    </td>
                    <td className="step13-td">
                      <input
                        type="text"
                        placeholder="e.g. 2021-22"
                        value={row.session || ''}
                        onChange={(e) => {
                          onTableCellChange('respBiiiTable', idx, 'particulars', item.label);
                          onTableCellChange('respBiiiTable', idx, 'marksCriteria', item.marks);
                          onTableCellChange('respBiiiTable', idx, 'session', e.target.value);
                        }}
                        className="step13-input"
                      />
                    </td>
                    <td className="step13-td">
                      <input
                        type="number"
                        step="any"
                        min="0"
                        max={item.maxMarks}
                        placeholder="0.0"
                        value={row.score || ''}
                        onChange={(e) => {
                          onTableCellChange('respBiiiTable', idx, 'particulars', item.label);
                          onTableCellChange('respBiiiTable', idx, 'marksCriteria', item.marks);
                          onTableCellChange('respBiiiTable', idx, 'score', e.target.value);
                        }}
                        className="step13-input step13-score-input"
                      />
                    </td>
                  </tr>
                );
              })}
              <tr className="step13-total-row">
                <td colSpan={4} className="step13-td step13-total-label">
                  Total B(iii) Score Claimed:
                </td>
                <td className="step13-td step13-total-val">
                  {totalBiiiScore.toFixed(1)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Note on Category II B Rules */}
      {/* <div className="step13-note-box">
        <strong>Important Rule (Category II B):</strong> Marks of only one experience under Category II B shall be allowed in one academic year. The convener/In-charge shall be entitled to mark(s) allotted to each category of experience. Similarly, the member(s) of Committee shall also be entitled to 0.25 mark for each Committee up to maximum marks allotted above. In case of repetition of any assignment/Committee under Category II (B) (ii & iii), the maximum marks allotted above shall be allowed.
      </div> */}

      {/* Download Standard Format for Part II Button */}
      <div className="step13-download-box">
        <a
          href="/Standard-format-for-Part-II.pdf"
          download="Standard format for Part II [(A), B(i), B(ii), and B(iii)].pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="step13-download-btn"
        >
          <svg
            className="step13-download-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download Standard format for Part II [(A), B(i), B(ii), and B(iii)]</span>
        </a>
      </div>

      {/* Upload Document (Part II Supporting Documents) */}
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>
          Upload Document (Part II Supporting Documents - combined PDF, max 20 MB){' '}
          <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
          Upload filled standard format merging all supporting appointment/office orders and certificates in a single PDF.
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
