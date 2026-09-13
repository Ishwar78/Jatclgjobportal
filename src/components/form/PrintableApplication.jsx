import React from 'react';
import { getFileUrl } from '../../api/candidateApi';

export default function PrintableApplication({ applicationNo, candidate, values = {}, tableValues = {}, fileMeta = {} }) {
  const v = { ...values, ...(candidate?.formData || {}) };
  const t = { ...tableValues, ...(candidate?.formData || {}) };
  const rawFiles = { ...fileMeta, ...(candidate?.fileData || {}) };
  const f = {};
  for (const [k, val] of Object.entries(rawFiles)) {
    if (val && typeof val === 'object') {
      f[k] = { ...val, url: getFileUrl(val.url) };
    }
  }

  const eduRows = Array.isArray(t.educationDetails) ? t.educationDetails : [];
  const empRows = Array.isArray(t.employmentTable) ? t.employmentTable.filter(r => r && (r.employer || r.designation)) : [];

  return (
    <div className="printable-application-root" id="printable-application-area">
      {/* Header */}
      <div className="print-header">
        <h1 className="print-college-title">ALL INDIA JAT HEROES’ MEMORIAL COLLEGE</h1>
        <p className="print-college-sub">ROHTAK, HARYANA (Affiliated to Maharshi Dayanand University, Rohtak)</p>
        <p style={{ margin: '6px 0 0 0', fontWeight: 'bold', color: '#1e3a8a', fontSize: '14px' }}>
          APPLICATION FORM FOR APPOINTMENT TO THE POST OF {v.postAppliedFor ? v.postAppliedFor.toUpperCase() : 'PRINCIPAL'}
        </p>

        {/* Candidate Photo */}
        <div className="print-photo-box">
          {f.photo?.url ? (
            <img src={f.photo.url} alt="Candidate" className="print-photo-img" />
          ) : (
            <span style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center' }}>Passport Photo</span>
          )}
        </div>
      </div>

      {/* Application Meta Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f1f5f9', padding: '8px 12px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px', fontWeight: '600' }}>
        <span>Application No: <strong style={{ color: '#1e3a8a' }}>{applicationNo || 'AIJHM-APP-2026-XXXX'}</strong></span>
        <span>Registration ID: <strong>{candidate?.registrationId || v.registrationId || 'N/A'}</strong></span>
        <span>Date: <strong>{v.date || new Date().toLocaleDateString('en-IN')}</strong></span>
      </div>

      {/* Section 1: Personal Information */}
      <div className="print-section">
        <div className="print-section-title">1. PERSONAL INFORMATION</div>
        <div className="print-grid-2">
          <div className="print-field-row">
            <span className="print-field-label">Post Applied For:</span>
            <span className="print-field-val">{v.postAppliedFor || 'Principal'}</span>
          </div>
          <div className="print-field-row">
            <span className="print-field-label">Candidate Name:</span>
            <span className="print-field-val">{v.name || candidate?.candidateName || '-'}</span>
          </div>
          <div className="print-field-row">
            <span className="print-field-label">Father's Name:</span>
            <span className="print-field-val">{v.fatherName || candidate?.fatherName || '-'}</span>
          </div>
          <div className="print-field-row">
            <span className="print-field-label">Mother's Name:</span>
            <span className="print-field-val">{v.motherName || '-'}</span>
          </div>
          <div className="print-field-row">
            <span className="print-field-label">Date of Birth:</span>
            <span className="print-field-val">{v.dob || '-'}</span>
          </div>
          <div className="print-field-row">
            <span className="print-field-label">Social Category:</span>
            <span className="print-field-val">{v.socialCategory || 'General'}</span>
          </div>
          <div className="print-field-row">
            <span className="print-field-label">Nationality:</span>
            <span className="print-field-val">{v.nationality || 'Indian'}</span>
          </div>
          <div className="print-field-row">
            <span className="print-field-label">Marital Status:</span>
            <span className="print-field-val">{v.maritalStatus || '-'}</span>
          </div>
          <div className="print-field-row">
            <span className="print-field-label">Contact Mobile:</span>
            <span className="print-field-val">{v.contactNo1 || candidate?.mobile || '-'}</span>
          </div>
          <div className="print-field-row">
            <span className="print-field-label">Email ID:</span>
            <span className="print-field-val">{v.email || candidate?.email || '-'}</span>
          </div>
          <div className="print-field-row">
            <span className="print-field-label">Aadhaar Number:</span>
            <span className="print-field-val">{v.aadhaarNo || '-'}</span>
          </div>
          <div className="print-field-row">
            <span className="print-field-label">Family ID / PPP:</span>
            <span className="print-field-val">{v.familyId || 'N/A'}</span>
          </div>
        </div>
        <div style={{ marginTop: '8px' }}>
          <span className="print-field-label">Present Address: </span>
          <span className="print-field-val">
            {[v.presentStreet, v.presentCity, v.presentState, v.presentPostalCode, v.presentCountry].filter(Boolean).join(', ') || 'N/A'}
          </span>
        </div>
      </div>

      {/* Section 2: References */}
      <div className="print-section">
        <div className="print-section-title">2. REFEREES</div>
        <div className="print-grid-2">
          <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px' }}>
            <p style={{ margin: '0 0 4px', fontWeight: 'bold', color: '#1e3a8a', fontSize: '12px' }}>Referee 1:</p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>Name:</strong> {v.ref1FirstName} {v.ref1LastName}</p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>Occupation:</strong> {v.ref1Occupation || '-'}</p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>Address:</strong> {v.ref1Address || '-'}</p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>Contact:</strong> {v.ref1Phone} | {v.ref1Email}</p>
          </div>
          <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px' }}>
            <p style={{ margin: '0 0 4px', fontWeight: 'bold', color: '#1e3a8a', fontSize: '12px' }}>Referee 2:</p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>Name:</strong> {v.ref2FirstName} {v.ref2LastName}</p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>Occupation:</strong> {v.ref2Occupation || '-'}</p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>Address:</strong> {v.ref2Address || '-'}</p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>Contact:</strong> {v.ref2Phone} | {v.ref2Email}</p>
          </div>
        </div>
      </div>

      {/* Section 3: Educational Qualifications */}
      <div className="print-section">
        <div className="print-section-title">3. EDUCATIONAL QUALIFICATIONS</div>
        <table className="print-table">
          <thead>
            <tr>
              <th>Exam Passed</th>
              <th>Univ / Board</th>
              <th>Roll No</th>
              <th>Year</th>
              <th>Max</th>
              <th>Obt</th>
              <th>%</th>
              <th>Div</th>
            </tr>
          </thead>
          <tbody>
            {eduRows.length > 0 ? (
              eduRows.map((r, i) => (
                <tr key={i}>
                  <td>{r.exam || `Exam ${i+1}`}</td>
                  <td>{r.university || '-'}</td>
                  <td>{r.rollNo || '-'}</td>
                  <td>{r.yearOfPassing || '-'}</td>
                  <td>{r.marksMax || '-'}</td>
                  <td>{r.marksObtained || '-'}</td>
                  <td>{r.percentage ? `${r.percentage}%` : '-'}</td>
                  <td>{r.division || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No educational details recorded</td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ marginTop: '10px', fontSize: '12px' }}>
          <p style={{ margin: '2px 0' }}><strong>Ph.D. Topic:</strong> {v.phdTopic || '-'}</p>
          <p style={{ margin: '2px 0' }}><strong>Field of Specialization:</strong> {v.fieldOfSpecialization || '-'}</p>
        </div>
      </div>

      {/* Section 4: Employment & Experience */}
      {empRows.length > 0 && (
        <div className="print-section">
          <div className="print-section-title">4. EMPLOYMENT & EXPERIENCE</div>
          <table className="print-table">
            <thead>
              <tr>
                <th>Employer / Organization</th>
                <th>Designation</th>
                <th>From</th>
                <th>To</th>
                <th>Years</th>
              </tr>
            </thead>
            <tbody>
              {empRows.map((r, i) => (
                <tr key={i}>
                  <td>{r.employer || '-'}</td>
                  <td>{r.designation || '-'}</td>
                  <td>{r.durationFrom || '-'}</td>
                  <td>{r.durationTo || '-'}</td>
                  <td>{r.teachingYears || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Section 5: Scores Summary */}
      <div className="print-section">
        <div className="print-section-title">5. SCORE ASSESSMENT</div>
        <div className="print-grid-3">
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Academic Record</span>
            <strong style={{ fontSize: '18px', color: '#1e3a8a' }}>{v.academicTotal || '0'}</strong>
          </div>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Teaching & Admin</span>
            <strong style={{ fontSize: '18px', color: '#1e3a8a' }}>{v.teachingTotalScore || '0'}</strong>
          </div>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Research Score</span>
            <strong style={{ fontSize: '18px', color: '#1e3a8a' }}>{v.resTotal || '0'}</strong>
          </div>
        </div>
      </div>

      {/* Section 6: Payment Details */}
      <div className="print-section">
        <div className="print-section-title">6. APPLICATION FEE PAYMENT</div>
        <div className="print-grid-2">
          <div>
            <p style={{ margin: '2px 0', fontSize: '13px' }}><strong>Amount:</strong> ₹{v.paymentAmount || '1000'}</p>
            <p style={{ margin: '2px 0', fontSize: '13px' }}><strong>UTR / Txn No:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{v.utrNo || '-'}</span></p>
            <p style={{ margin: '2px 0', fontSize: '13px' }}><strong>UPI Provider:</strong> {v.upiProvider || 'UPI'}</p>
            <p style={{ margin: '2px 0', fontSize: '13px' }}><strong>Payer Name:</strong> {v.accountHolderName || '-'}</p>
          </div>
          {f.filePaymentScreenshot?.url && (
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Payment Receipt:</span>
              <img
                src={f.filePaymentScreenshot.url}
                alt="Payment Receipt"
                style={{ maxHeight: '80px', maxWidth: '140px', objectFit: 'contain', border: '1px solid #cbd5e1', borderRadius: '4px' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Section 7: Declaration & Signature */}
      <div className="print-section" style={{ pageBreakInside: 'avoid' }}>
        <div className="print-section-title">7. DECLARATION & VERIFICATION</div>
        <p style={{ fontSize: '11px', color: '#475569', lineHeight: '1.5', margin: '0 0 10px 0' }}>
          I hereby declare and undertake that all the information provided by me in this application form is true, correct and complete to the best of my knowledge and belief and nothing has been concealed therein. In case any information is found to be false, incorrect or misleading, my candidature/appointment is liable to be cancelled.
        </p>
        <div className="print-sig-box">
          <div>
            <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>Place:</strong> {v.place || 'Rohtak'}</p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>Date:</strong> {v.date || new Date().toLocaleDateString('en-IN')}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            {f.signature?.url ? (
              <img
                src={f.signature.url}
                alt="Candidate Signature"
                style={{ width: '130px', height: '50px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
              />
            ) : (
              <div style={{ width: '130px', height: '40px', borderBottom: '1px solid #000' }}></div>
            )}
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a' }}>Candidate Signature</span>
          </div>
        </div>
      </div>
    </div>
  );
}
