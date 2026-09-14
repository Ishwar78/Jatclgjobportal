import React from 'react';
import './Step7EducationDocuments.css';

export default function Step7EducationDocuments({
  values = {},
  fileMeta = {},
  uploadingField = null,
  uploadProgress = 0,
  errors = {},
  onValueChange,
  onFileChange
}) {
  const documents = [
    {
      id: 'docMatric',
      label: 'Certificate for Matriculation',
      required: true,
      limitKB: 10240,
      helperText: 'Merge certificate and marksheet into one PDF — PDF only, max 10 MB'
    },
    {
      id: 'docInter',
      label: 'Certificate for Prep/Pre/10+2',
      required: true,
      limitKB: 10240,
      helperText: 'Merge certificate and marksheet into one PDF — PDF only, max 10 MB'
    },
    {
      id: 'docGrad',
      label: 'Certificate for Graduation (BA/B.Sc./B.Com/Other)',
      required: true,
      limitKB: 10240,
      helperText: 'Merge certificate and marksheet into one PDF — PDF only, max 10 MB'
    },
    {
      id: 'docPG',
      label: 'Certificate for Post-Graduation (MA/M.Sc./M.Com/Other)',
      required: false,
      limitKB: 10240,
      helperText: 'Merge certificate and marksheet into one PDF — PDF only, max 10 MB'
    },
    {
      id: 'docBEd',
      label: 'Certificate for B.Ed.',
      required: false,
      limitKB: 10240,
      helperText: 'If applicable — merge certificate and marksheet into one PDF — PDF only, max 10 MB'
    },
    {
      id: 'docMEd',
      label: 'Certificate for M.Ed.',
      required: false,
      limitKB: 10240,
      helperText: 'If applicable — merge certificate and marksheet into one PDF — PDF only, max 10 MB'
    },
    {
      id: 'docMPhil',
      label: 'Certificate for M.Phil',
      required: false,
      limitKB: 10240,
      helperText: 'If applicable — PDF only, max 10 MB'
    },
    {
      id: 'docPhd',
      label: 'Certificate for PhD',
      required: false,
      limitKB: 10240,
      helperText: 'If applicable — PDF only, max 10 MB'
    },
    {
      id: 'docNetSlet',
      label: 'Certificate for NET/SLET',
      required: false,
      limitKB: 10240,
      helperText: 'If applicable — PDF only, max 10 MB'
    }
  ];

  const renderDocUpload = (doc) => {
    const file = fileMeta[doc.id];
    const isUploading = uploadingField === doc.id;
    const error = errors[doc.id];

    return (
      <div key={doc.id} className="step7-upload-field">
        <label className="step7-label">
          {doc.label} {doc.required && <span className="step7-required">*</span>}
        </label>

        {file && file.url ? (
          <div className="step7-file-preview">
            <div className="step7-file-info">
              <span className="step7-file-check">✓</span>
              <div>
                <p className="step7-file-name">{file.originalName || 'Uploaded PDF'}</p>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="step7-file-link"
                >
                  View Document
                </a>
              </div>
            </div>
            <label className="step7-replace-btn">
              Replace
              <input
                type="file"
                style={{ display: 'none' }}
                accept="application/pdf"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFileChange(doc.id, f, doc.limitKB);
                }}
              />
            </label>
          </div>
        ) : (
          <label className={`step7-upload-card ${error ? 'has-error' : ''}`}>
            <input
              type="file"
              style={{ display: 'none' }}
              accept="application/pdf"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onFileChange(doc.id, f, doc.limitKB);
              }}
            />
            {isUploading ? (
              <div>
                <p className="step7-upload-text">Uploading... {uploadProgress}%</p>
              </div>
            ) : (
              <>
                <span className="step7-upload-icon">📄</span>
                <p className="step7-upload-text">Click to choose PDF</p>
                <p className="step7-upload-hint">{doc.helperText}</p>
              </>
            )}
          </label>
        )}
        {error && <p className="step7-error-text">{error}</p>}
      </div>
    );
  };

  const otherFile = fileMeta.docAnyOther;
  const isOtherUploading = uploadingField === 'docAnyOther';

  return (
    <div className="step7-container">
      <div className="step7-header">
        <h2 className="step7-title">Upload Educational Documents</h2>
        <p className="step7-subtitle">
          Combine Certificate and/or Marksheet/Degree for each class into one PDF. Max size: 10 MB.
        </p>
      </div>

      <div className="step7-grid">
        {documents.map(renderDocUpload)}

        {/* Name of Any Other Qualification */}
        <div className="step7-upload-field" style={{ gridColumn: '1 / -1' }}>
          <label className="step7-label">Name of Any Other Qualification (s)</label>
          <input
            type="text"
            value={values.anyOtherQualName || ''}
            onChange={(e) => onValueChange('anyOtherQualName', e.target.value)}
            className="step5-textarea"
            style={{ height: '42px', padding: '8px 12px' }}
            placeholder="e.g. MBA, LLB, Diploma in Computer Science, etc."
          />
        </div>

        {/* Certificate for Any Other Qualification */}
        <div className="step7-upload-field" style={{ gridColumn: '1 / -1' }}>
          <label className="step7-label">
            Certificate for Any Other Qualification (Merge If more than one Certificate)
          </label>

          {otherFile && otherFile.url ? (
            <div className="step7-file-preview">
              <div className="step7-file-info">
                <span className="step7-file-check">✓</span>
                <div>
                  <p className="step7-file-name">{otherFile.originalName || 'Uploaded PDF'}</p>
                  <a
                    href={otherFile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="step7-file-link"
                  >
                    View Document
                  </a>
                </div>
              </div>
              <label className="step7-replace-btn">
                Replace
                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept="application/pdf"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onFileChange('docAnyOther', f, 10240);
                  }}
                />
              </label>
            </div>
          ) : (
            <label className="step7-upload-card">
              <input
                type="file"
                style={{ display: 'none' }}
                accept="application/pdf"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFileChange('docAnyOther', f, 10240);
                }}
              />
              {isOtherUploading ? (
                <div>
                  <p className="step7-upload-text">Uploading... {uploadProgress}%</p>
                </div>
              ) : (
                <>
                  <span className="step7-upload-icon">📄</span>
                  <p className="step7-upload-text">Click to choose PDF</p>
                  <p className="step7-upload-hint">
                    Combine multiple into one PDF if needed — PDF only, max 10 MB
                  </p>
                </>
              )}
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
