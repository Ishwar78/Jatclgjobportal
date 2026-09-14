import React from 'react';
import './Step15Annexures.css';

export default function Step15Annexures({
  values = {},
  errors = {},
  fileMeta = {},
  uploadingField = null,
  uploadProgress = 0,
  onValueChange,
  onFileChange
}) {
  const uploadFields = [
    {
      id: 'annexure1List',
      label: 'Annexure I: Attach a List of Research Papers in Peer-Reviewed or UGC Listed Journals (consolidated list)',
      required: true,
      fullWidth: true
    },
    { id: 'annexure1_1to5', label: 'Annexure I: Full papers 1–5' },
    { id: 'annexure1_6to10', label: 'Annexure I: Full papers 6–10' },
    { id: 'annexure1_11to15', label: 'Annexure I: Full papers 11–15' },
    { id: 'annexure1_16to20', label: 'Annexure I: Full papers 16–20' },
    { id: 'annexure1_21to25', label: 'Annexure I: Full papers 21–25' },
    { id: 'annexure1_26to30', label: 'Annexure I: Full papers 26-30 or above' },
    {
      id: 'annexure2List',
      label: 'Annexure II: Publications (other than research papers) — Attach a list of publications with reference to Part III',
      required: true,
      fullWidth: true
    },
    { id: 'annexure2Full', label: 'Annexure II: Full texts of publications (other than research papers) — single PDF' },
    {
      id: 'annexure3',
      label: 'Annexure III: Creation of ICT Mediated Teaching Learning Pedagogy and Content & Curricula — consolidated list with full supporting documents',
      required: true,
      fullWidth: true
    },
    {
      id: 'annexure4',
      label: 'Annexure IV: Research Guidance / Research Projects Completed & Ongoing / Consultancy — consolidated list with supporting documents',
      required: true,
      fullWidth: true
    },
    {
      id: 'annexure5List',
      label: 'Annexure V: Patents / Policy Documents / Awards Fellowship — attach a consolidated list with reference to Part III',
      required: true,
      fullWidth: true
    },
    { id: 'annexure5Full', label: 'Annexure V: Arrange and attach supporting documents in a single PDF' },
    {
      id: 'annexure6List',
      label: 'Annexure VI: Invited Lectures / Resource Person / Paper Presentation in Seminars / Conferences — attach a complete list',
      required: true,
      fullWidth: true
    },
    { id: 'annexure6Full', label: 'Annexure VI: Arrange and attach supporting documents in a single PDF' }
  ];

  const formatLabel = (label) => {
    const match = label.match(/^(Annexure\s+[IVXLCDM]+:?)(.*)$/i);
    if (match) {
      return (
        <>
          <span className="step15-annexure-tag">{match[1]}</span>
          <span className="step15-label-text">{match[2]}</span>
        </>
      );
    }
    return <span className="step15-label-text">{label}</span>;
  };

  const renderUpload = (item) => {
    const file = fileMeta[item.id];
    const isUploading = uploadingField === item.id;
    const error = errors[item.id];

    return (
      <div
        key={item.id}
        className={`step15-upload-field ${item.fullWidth ? 'step15-full-width' : ''}`}
      >
        <label className="step15-label">
          {formatLabel(item.label)} {item.required && <span className="step15-required">*</span>}
        </label>

        {file && file.url ? (
          <div className="step15-file-preview">
            <div className="step15-file-info">
              <span className="step15-file-check">✓</span>
              <div>
                <p className="step15-file-name">{file.originalName || 'Uploaded PDF'}</p>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="step15-file-link"
                >
                  View File
                </a>
              </div>
            </div>
            <label className="step15-replace-btn">
              Replace
              <input
                type="file"
                style={{ display: 'none' }}
                accept="application/pdf,image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFileChange(item.id, f, 20480);
                }}
              />
            </label>
          </div>
        ) : (
          <label className={`step15-upload-card ${error ? 'has-error' : ''}`}>
            <input
              type="file"
              style={{ display: 'none' }}
              accept="application/pdf,image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onFileChange(item.id, f, 20480);
              }}
            />
            {isUploading ? (
              <p className="step15-upload-text" style={{ color: '#2563eb' }}>
                Uploading... {uploadProgress}%
              </p>
            ) : (
              <>
                <span className="step15-upload-icon">📄</span>
                <p className="step15-upload-text">Click to choose PDF</p>
                <p className="step15-upload-hint">PDF (Max 20 MB)</p>
              </>
            )}
          </label>
        )}
        {error && <p className="step15-error-text">{error}</p>}
      </div>
    );
  };

  return (
    <div className="step15-container">
      <div className="step15-header">
        <h2 className="step15-title">Annexures I–VI: Research Supporting Documents</h2>
        <p className="step15-subtitle">
          Attach full copies of research papers and other documents for your claimed API score as mentioned under Annexures I-VI of Appendix II, Table-2 (specified by DGHE for Part III ). In case of nil information, write 'Nil' on plain paper and upload its scanned image.
        </p>
      </div>

      <div className="step15-grid">
        {uploadFields.map(renderUpload)}

        <div className="step15-upload-field step15-full-width" style={{ marginTop: '6px' }}>
          <label className="step15-label">
            Google Drive Link (sharing: "Anyone with the link can view")
          </label>
          <input
            type="text"
            value={values.googleDriveLink || ''}
            onChange={(e) => onValueChange('googleDriveLink', e.target.value)}
            className="step15-input"
            placeholder="https://drive.google.com/..."
          />
          {errors.googleDriveLink && (
            <p className="step15-error-text">{errors.googleDriveLink}</p>
          )}
        </div>
      </div>
    </div>
  );
}
