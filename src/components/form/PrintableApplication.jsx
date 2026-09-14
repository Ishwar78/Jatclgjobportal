import React from 'react';
import { getFileUrl } from '../../api/candidateApi';
import SelectionCriteriaTables from './SelectionCriteriaTables';

const BII_ITEMS = [
  { label: 'Staff Representative or V.C. Nominee in Managing Committee of any College', marks: '01 Marks for each year Maximum upto 3 marks' },
  { label: 'Coordinator or Organizing Secretary of International/National/State Conference/Event', marks: '01 Marks for each year Maximum upto 3 marks' },
  { label: 'Bursar', marks: '01 Marks for each year Maximum upto 3 marks' },
  { label: 'NSS Programme Officer', marks: '01 Marks for each year Maximum upto 3 marks' },
  { label: 'YRC Counsellor', marks: '01 Marks for each year Maximum upto 3 marks' },
  { label: 'Hostel Warden', marks: '01 Marks for each year Maximum upto 3 marks' },
  { label: 'Member of any Statutory Body of University', marks: '01 Marks for each year Maximum upto 2 marks' },
  { label: 'Experience as Associate NCC Officer in HEI (s)', marks: '01 Marks for each year Maximum upto 3 marks' }
];

const BIII_ITEMS = [
  { label: 'Co-ordinator  IQAC', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'Editor in Chief, College Magazine', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'Member,  College  Advisory  Council', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'Convenor, University Work Committee', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'Convenor,  Cultural  Affairs  Committee', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'Convenor,  Purchase/Procurement  Committee', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'Convenor,  Building/Works  Committee', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'Convenor, Sports Committee', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'Convenor,  Discipline  Committee', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'Convenor, Internal (Complaint) Committee', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'Convenor, Road Safety Club', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'Convenor, Red Ribbon Club', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'Convenor, Eco-Club', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'In-charge, Placement Cell', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'In-charge. Women Cell', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'In-charge, Time-table Committee', marks: '01 Marks for each academic year, Maximum upto 2 marks' },
  { label: 'In-charge, SC/BC Committee', marks: '01 Marks for each academic year, Maximum upto 2 marks' }
];

export default function PrintableApplication({
  applicationNo,
  candidate,
  values = {},
  tableValues = {},
  fileMeta = {}
}) {
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
  const empRows = Array.isArray(t.employmentTable)
    ? t.employmentTable.filter((r) => r && (r.employer || r.designation))
    : [];

  const respBiiRows = Array.isArray(t.respBiiTable)
    ? t.respBiiTable.filter((r) => r && Object.values(r).some((x) => String(x || '').trim()))
    : [];

  const respBiiiRows = Array.isArray(t.respBiiiTable)
    ? t.respBiiiTable.filter((r) => r && Object.values(r).some((x) => String(x || '').trim()))
    : [];

  const acadM = parseFloat(v.academicMasters || 0) || 0;
  const acadG = parseFloat(v.academicGrad || 0) || 0;
  const acad12 = parseFloat(v.academic12th || 0) || 0;
  const acadMat = parseFloat(v.academicMatric || 0) || 0;
  const calcAcadTotal = (acadM + acadG + acad12 + acadMat).toFixed(2).replace(/\.00$/, '');
  const displayAcadTotal = (v.academicTotal && v.academicTotal !== '0')
    ? v.academicTotal
    : (calcAcadTotal !== '0' ? calcAcadTotal : (v.academicTotal || '0'));

  const exp15 = parseFloat(v.teachingExpAbove15 || 0) || 0;
  const adminJd = parseFloat(v.adminJointDirector || 0) || 0;
  const adminReg = parseFloat(v.adminRegistrar || 0) || 0;
  const adminHead = parseFloat(v.adminHead || 0) || 0;
  const adminCombined = Math.min(adminJd + adminReg + adminHead, 25);
  const calcTeachTotal = (exp15 + adminCombined).toFixed(2).replace(/\.00$/, '');
  const displayTeachTotal = (v.teachingTotalScore && v.teachingTotalScore !== '0')
    ? v.teachingTotalScore
    : (calcTeachTotal !== '0' ? calcTeachTotal : (v.teachingTotalScore || '0'));

  return (
    <div className="printable-application-root" id="printable-application-area">
      {/* ================= PAGE / HEADER ================= */}
      <div className="print-header">
        <h1 className="print-college-title">ALL INDIA JAT HEROES’ MEMORIAL COLLEGE</h1>
        <p className="print-college-sub">
          ROHTAK, HARYANA (Affiliated to Maharshi Dayanand University, Rohtak)
        </p>
        <p style={{ margin: '6px 0 0 0', fontWeight: 'bold', color: '#1e3a8a', fontSize: '13.5px' }}>
          APPLICATION FORM FOR APPOINTMENT TO THE POST OF{' '}
          {v.postAppliedFor ? v.postAppliedFor.toUpperCase() : 'PRINCIPAL'}
        </p>

        {/* Candidate Photo */}
        <div className="print-photo-box">
          {f.photo?.url ? (
            <img src={f.photo.url} alt="Candidate" className="print-photo-img" />
          ) : (
            <span style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center' }}>
              Passport Photo
            </span>
          )}
        </div>
      </div>

      {/* Application Meta Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#f1f5f9',
          padding: '8px 12px',
          borderRadius: '6px',
          marginBottom: '16px',
          fontSize: '12.5px',
          fontWeight: '600'
        }}
      >
        <span>
          Application No:{' '}
          <strong style={{ color: '#1e3a8a' }}>
            {applicationNo || 'AIJHM-APP-2026-XXXX'}
          </strong>
        </span>
        <span>
          Registration ID:{' '}
          <strong>{candidate?.registrationId || v.registrationId || 'N/A'}</strong>
        </span>
        <span>
          Date:{' '}
          <strong>
            {v.date || new Date().toLocaleDateString('en-IN')}
          </strong>
        </span>
      </div>

      {/* ================= 1. INSTRUCTIONS & UNDERTAKING ================= */}
      <div className="print-section">
        <div className="print-section-title">1. INSTRUCTIONS & GENERAL GUIDELINES</div>
        <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '11.5px', lineHeight: '1.6', color: '#334155' }}>
          <p style={{ margin: '0 0 6px 0' }}>
            <strong>1.1 Submission of Hard Copy:</strong> The last date for the receipt of hard copy of application will be the same as the closing date of the portal mentioned in the advertisement. Applications found incomplete and/or received after the due date will not be considered.
          </p>
          <p style={{ margin: '0 0 6px 0' }}>
            <strong>1.2 Verification & Testimonials:</strong> This application form should be properly filled. Photocopies of all certificates/testimonials must be attached. Originals will have to be shown at the time of Interview.
          </p>
          <p style={{ margin: '0 0 6px 0' }}>
            <strong>1.3 Forwarding through Employer:</strong> The applicants should send their applications after getting forwarded by their current employer. Printout of the completely filled application form must also be sent to the Dean of Colleges, M.D. University, Rohtak and to the Director General Higher Education, Shiksha Sadan, Sector 5, Panchkula by the last date given in the advertisement.
          </p>
          <p style={{ margin: '0 0 6px 0' }}>
            <strong>1.4 Incomplete Applications:</strong> Applications received after the due date or found incomplete in any respect will be rejected summarily without any correspondence.
          </p>
          <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed #cbd5e1', color: '#15803d', fontWeight: 'bold' }}>
            ✓ Candidate Confirmation: I have carefully read, understood and agree to all the instructions and conditions mentioned above.
          </div>
        </div>
      </div>

      {/* ================= 2. PERSONAL INFORMATION ================= */}
      <div className="print-section">
        <div className="print-section-title">2. PERSONAL INFORMATION</div>
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
            <span className="print-field-val">
              {v.socialCategory || 'General'}
              {f.categoryCertificate?.url ? ' (Certificate Attached)' : ''}
            </span>
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
            <span className="print-field-label">WhatsApp No:</span>
            <span className="print-field-val">{v.whatsappNo || '-'}</span>
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
            {[v.presentStreet, v.presentCity, v.presentState, v.presentPostalCode, v.presentCountry]
              .filter(Boolean)
              .join(', ') || 'N/A'}
          </span>
        </div>
      </div>

      {/* ================= 3. REFEREES ================= */}
      <div className="print-section">
        <div className="print-section-title">3. REFERENCES</div>
        <div className="print-grid-2">
          <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 4px', fontWeight: 'bold', color: '#1e3a8a', fontSize: '12px' }}>
              Referee 1:
            </p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}>
              <strong>Name:</strong> {v.ref1FirstName} {v.ref1LastName}
            </p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}>
              <strong>Occupation / Position:</strong> {v.ref1Occupation || '-'}
            </p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}>
              <strong>Address:</strong> {v.ref1Address || '-'}
            </p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}>
              <strong>Contact:</strong> {v.ref1Phone} | {v.ref1Email}
            </p>
          </div>
          <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 4px', fontWeight: 'bold', color: '#1e3a8a', fontSize: '12px' }}>
              Referee 2:
            </p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}>
              <strong>Name:</strong> {v.ref2FirstName} {v.ref2LastName}
            </p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}>
              <strong>Occupation / Position:</strong> {v.ref2Occupation || '-'}
            </p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}>
              <strong>Address:</strong> {v.ref2Address || '-'}
            </p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}>
              <strong>Contact:</strong> {v.ref2Phone} | {v.ref2Email}
            </p>
          </div>
        </div>
      </div>

      {/* ================= 4. COURT DECLARATIONS ================= */}
      <div className="print-section">
        <div className="print-section-title">
          4. DECLARATIONS REGARDING COURT CASES / DISQUALIFICATION
        </div>
        <table className="print-table">
          <tbody>
            <tr>
              <td style={{ width: '80%' }}>
                Have you ever been prosecuted, kept under detention, bound down, fined, convicted by a Court of Law or debarred/disqualified by any University or Public Service Commission?
              </td>
              <td style={{ width: '20%', fontWeight: 'bold', color: v.courtCase1 === 'Yes' ? '#dc2626' : '#15803d' }}>
                {v.courtCase1 || 'No'}
              </td>
            </tr>
            {v.courtCase1 === 'Yes' && v.courtCase1Details && (
              <tr>
                <td colSpan="2" style={{ backgroundColor: '#fff1f2', color: '#991b1b', fontSize: '11px' }}>
                  <strong>Particulars:</strong> {v.courtCase1Details}
                </td>
              </tr>
            )}
            <tr>
              <td>
                Is any case pending against you in any court of law at the time of filling up of this form?
              </td>
              <td style={{ fontWeight: 'bold', color: v.courtCase2 === 'Yes' ? '#dc2626' : '#15803d' }}>
                {v.courtCase2 || 'No'}
              </td>
            </tr>
            {v.courtCase2 === 'Yes' && v.courtCase2Details && (
              <tr>
                <td colSpan="2" style={{ backgroundColor: '#fff1f2', color: '#991b1b', fontSize: '11px' }}>
                  <strong>Particulars:</strong> {v.courtCase2Details}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= 5. EDUCATIONAL QUALIFICATIONS ================= */}
      <div className="print-section">
        <div className="print-section-title">5. EDUCATIONAL QUALIFICATIONS</div>
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
                  <td>{r.exam || `Exam ${i + 1}`}</td>
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
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  No educational details recorded
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ marginTop: '10px', fontSize: '12px' }}>
          {v.mphilTopic && (
            <p style={{ margin: '2px 0' }}>
              <strong>Topic of M.Phil Dissertation:</strong> {v.mphilTopic}
            </p>
          )}
          <p style={{ margin: '2px 0' }}>
            <strong>Topic of Research for Ph.D.:</strong> {v.phdTopic || '-'}
          </p>
          <p style={{ margin: '2px 0' }}>
            <strong>Field of Specialization:</strong> {v.fieldOfSpecialization || '-'}
          </p>
        </div>
      </div>

      {/* ================= 6. EMPLOYMENT & EXPERIENCE ================= */}
      <div className="print-section">
        <div className="print-section-title">6. DETAILS OF PRESENT / PREVIOUS EMPLOYMENT</div>
        {empRows.length > 0 ? (
          <table className="print-table">
            <thead>
              <tr>
                <th>Employer / Organization</th>
                <th>Designation</th>
                <th>From</th>
                <th>To</th>
                <th>Teaching Exp (Yrs)</th>
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
        ) : (
          <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0' }}>
            No prior employment records listed.
          </p>
        )}
        <div style={{ marginTop: '8px', fontSize: '12px' }}>
          <span className="print-field-label">Experience Certificates: </span>
          <span className="print-field-val">
            {f.fileExperienceCerts?.url
              ? `✓ Attached (${f.fileExperienceCerts.originalName || 'Experience_Certificates.pdf'})`
              : 'Not attached'}
          </span>
        </div>
      </div>

      {/* ================= 7. EDUCATIONAL DOCUMENTS UPLOADED ================= */}
      <div className="print-section">
        <div className="print-section-title">7. UPLOADED EDUCATIONAL DOCUMENTS</div>
        <table className="print-table">
          <thead>
            <tr>
              <th style={{ width: '50%' }}>Document / Certificate Name</th>
              <th style={{ width: '50%' }}>Upload Status / File Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Matriculation Certificate & Marksheet</td>
              <td>{f.docMatric?.originalName || (f.docMatric?.url ? '✓ Uploaded' : 'Pending')}</td>
            </tr>
            <tr>
              <td>10+2 / Pre-Medical / Pre-Engg Certificate</td>
              <td>{f.docInter?.originalName || (f.docInter?.url ? '✓ Uploaded' : 'Pending')}</td>
            </tr>
            <tr>
              <td>Graduation Degree & Marksheet</td>
              <td>{f.docGrad?.originalName || (f.docGrad?.url ? '✓ Uploaded' : 'Pending')}</td>
            </tr>
            <tr>
              <td>Post-Graduation Degree & Marksheet</td>
              <td>{f.docPG?.originalName || (f.docPG?.url ? '✓ Uploaded' : 'N/A')}</td>
            </tr>
            <tr>
              <td>B.Ed. Certificate & Marksheet</td>
              <td>{f.docBEd?.originalName || (f.docBEd?.url ? '✓ Uploaded' : 'N/A')}</td>
            </tr>
            <tr>
              <td>M.Ed. Certificate & Marksheet</td>
              <td>{f.docMEd?.originalName || (f.docMEd?.url ? '✓ Uploaded' : 'N/A')}</td>
            </tr>
            <tr>
              <td>M.Phil Degree / Certificate</td>
              <td>{f.docMPhil?.originalName || (f.docMPhil?.url ? '✓ Uploaded' : 'N/A')}</td>
            </tr>
            <tr>
              <td>Ph.D. Degree / Certificate</td>
              <td>{f.docPhd?.originalName || (f.docPhd?.url ? '✓ Uploaded' : 'N/A')}</td>
            </tr>
            <tr>
              <td>NET / SLET Certificate</td>
              <td>{f.docNetSlet?.originalName || (f.docNetSlet?.url ? '✓ Uploaded' : 'N/A')}</td>
            </tr>
            {v.anyOtherQualName && (
              <tr>
                <td>Any Other: {v.anyOtherQualName}</td>
                <td>{f.docAnyOther?.originalName || (f.docAnyOther?.url ? '✓ Uploaded' : 'N/A')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= 8. EMPLOYMENT STATUS, NOC & OTHER SERVICE ================= */}
      <div className="print-section">
        <div className="print-section-title">
          8. EMPLOYMENT STATUS, NO OBJECTION CERTIFICATE & OTHER SERVICE DETAILS
        </div>
        <div className="print-grid-2">
          <div className="print-field-row">
            <span className="print-field-label">Are you presently employed?</span>
            <span className="print-field-val" style={{ fontWeight: 'bold' }}>
              {v.isPresEmployed || 'No'}
            </span>
          </div>
          {v.isPresEmployed === 'Yes' && (
            <>
              <div className="print-field-row">
                <span className="print-field-label">Current Employer / College:</span>
                <span className="print-field-val">{v.nocCurrentCollege || '-'}</span>
              </div>
              <div className="print-field-row">
                <span className="print-field-label">Department / Subject:</span>
                <span className="print-field-val">{v.nocDepartment || '-'}</span>
              </div>
              <div className="print-field-row">
                <span className="print-field-label">Current Designation:</span>
                <span className="print-field-val">{v.nocDesignation || '-'}</span>
              </div>
              <div className="print-field-row">
                <span className="print-field-label">Employer NOC Certificate:</span>
                <span className="print-field-val" style={{ color: f.fileNOC?.url ? '#15803d' : '#b91c1c' }}>
                  {f.fileNOC?.url
                    ? `✓ Attached (${f.fileNOC.originalName || 'Signed_NOC.pdf'})`
                    : 'Not attached'}
                </span>
              </div>
            </>
          )}
          <div className="print-field-row">
            <span className="print-field-label">Basic Pay Acceptable:</span>
            <span className="print-field-val">{v.basicPayAcceptable || 'As per norms'}</span>
          </div>
          <div className="print-field-row">
            <span className="print-field-label">Joining Period Required:</span>
            <span className="print-field-val">{v.joiningPeriod || 'Immediately'}</span>
          </div>
        </div>
      </div>

      {/* ================= 9. CRITERIA FOR SELECTION OF PRINCIPAL ================= */}
      <div className="print-section" style={{ pageBreakInside: 'auto', breakInside: 'auto' }}>
        <div className="print-section-title">9. CRITERIA FOR SELECTION OF PRINCIPAL</div>
        <div style={{ backgroundColor: '#f0fdf4', padding: '10px 14px', borderRadius: '6px', border: '1px solid #bbf7d0', marginBottom: '14px' }}>
          <div style={{ color: '#15803d', fontWeight: 'bold', fontSize: '12px' }}>
            ✓ Status: Candidate has carefully read, understood and agreed to the Criteria for Selection of Principal (Haryana Govt Memo No. KW 8/36-2009 C-IV(3) Dated 18/04/2023).
          </div>
        </div>
        <SelectionCriteriaTables />
      </div>

      {/* ================= 10. PART I: ACADEMIC RECORD SCORE ================= */}
      <div className="print-section">
        <div className="print-section-title">10. PART I: ACADEMIC RECORD SCORE (MAX 20 MARKS)</div>
        <table className="print-table">
          <thead>
            <tr>
              <th>Evaluation Criteria</th>
              <th style={{ width: '25%', textAlign: 'center' }}>Maximum Marks</th>
              <th style={{ width: '25%', textAlign: 'center' }}>Marks Claimed by Candidate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Above 55% marks in Master's degree (0.5 mark for each % above 55%)</td>
              <td style={{ textAlign: 'center' }}>5</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{v.academicMasters || '0'}</td>
            </tr>
            <tr>
              <td>Above 55% marks in Graduation (0.4 mark for each % above 55%)</td>
              <td style={{ textAlign: 'center' }}>5</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{v.academicGrad || '0'}</td>
            </tr>
            <tr>
              <td>Above 55% marks in 10+2/Prep. (0.3 mark for each % above 55%)</td>
              <td style={{ textAlign: 'center' }}>5</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{v.academic12th || '0'}</td>
            </tr>
            <tr>
              <td>Above 55% marks in Matriculation (0.2 mark for each % above 55%)</td>
              <td style={{ textAlign: 'center' }}>5</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{v.academicMatric || '0'}</td>
            </tr>
            <tr style={{ backgroundColor: '#eff6ff', fontWeight: 'bold' }}>
              <td>TOTAL ACADEMIC SCORE (PART I)</td>
              <td style={{ textAlign: 'center' }}>20</td>
              <td style={{ textAlign: 'center', color: '#1e3a8a', fontSize: '13px' }}>
                {displayAcadTotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= 11. PART II: TEACHING & ADMINISTRATIVE SKILLS ================= */}
      <div className="print-section">
        <div className="print-section-title">
          11. PART II: TEACHING EXPERIENCE & ADMINISTRATIVE SKILLS (MAX 35 MARKS)
        </div>
        <table className="print-table">
          <thead>
            <tr>
              <th>Evaluation Criteria</th>
              <th style={{ width: '25%', textAlign: 'center' }}>Maximum Marks</th>
              <th style={{ width: '25%', textAlign: 'center' }}>Marks Claimed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A. Teaching Experience above 15 years (1 mark/year above 15 yrs)</td>
              <td style={{ textAlign: 'center' }}>10</td>
              <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{v.teachingExpAbove15 || '0'}</td>
            </tr>
            <tr>
              <td>B(i).1 Exp as Joint/Deputy/Asst Director in DHE (1 mark/year)</td>
              <td style={{ textAlign: 'center' }} rowSpan="3">
                25<br />
                <span style={{ fontSize: '10px', color: '#64748b' }}>(Combined Max)</span>
              </td>
              <td style={{ textAlign: 'center' }}>{v.adminJointDirector || '0'}</td>
            </tr>
            <tr>
              <td>B(i).2 Exp as Registrar or Admin post in University (1 mark/year)</td>
              <td style={{ textAlign: 'center' }}>{v.adminRegistrar || '0'}</td>
            </tr>
            <tr>
              <td>B(i).3 Exp as Head of HEI (Principal / Officiating / DDO) (1 mark/yr)</td>
              <td style={{ textAlign: 'center' }}>{v.adminHead || '0'}</td>
            </tr>
            <tr style={{ backgroundColor: '#eff6ff', fontWeight: 'bold' }}>
              <td>TOTAL TEACHING & ADMIN SCORE (PART II)</td>
              <td style={{ textAlign: 'center' }}>35</td>
              <td style={{ textAlign: 'center', color: '#1e3a8a', fontSize: '13px' }}>
                {displayTeachTotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= 12. PART II B(ii) & B(iii) RESPONSIBILITIES & COMMITTEES ================= */}
      <div className="print-section">
        <div className="print-section-title">
          12. B(ii) KEY RESPONSIBILITIES & B(iii) COMMITTEES IN COLLEGES
        </div>

        {/* Sub-table (ii) */}
        <p style={{ fontWeight: 'bold', fontSize: '12px', color: '#1e3a8a', margin: '8px 0 4px 0' }}>
          (ii) Experience of Key Responsibilities in Colleges
        </p>
        <table className="print-table" style={{ marginBottom: '10px' }}>
          <thead>
            <tr>
              <th style={{ width: '5%', textAlign: 'center' }}>Sr.</th>
              <th style={{ width: '45%' }}>Particulars</th>
              <th style={{ width: '25%' }}>Marks / Criteria</th>
              <th style={{ width: '15%', textAlign: 'center' }}>Academic Session</th>
              <th style={{ width: '10%', textAlign: 'center' }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {BII_ITEMS.map((item, idx) => {
              const row = (t.respBiiTable || [])[idx] || {};
              return (
                <tr key={idx}>
                  <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                  <td>{item.label}</td>
                  <td style={{ fontSize: '10.5px', color: '#475569' }}>{item.marks}</td>
                  <td style={{ textAlign: 'center' }}>{row.session || '-'}</td>
                  <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{row.score || '0.0'}</td>
                </tr>
              );
            })}
            <tr style={{ backgroundColor: '#eff6ff', fontWeight: 'bold' }}>
              <td colSpan="4" style={{ textAlign: 'right' }}>Total B(ii) Score Claimed:</td>
              <td style={{ textAlign: 'center', color: '#1e3a8a' }}>
                {(t.respBiiTable || []).reduce((sum, r) => sum + (parseFloat(r?.score) || 0), 0).toFixed(1)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Sub-table (iii) */}
        <p style={{ fontWeight: 'bold', fontSize: '12px', color: '#1e3a8a', margin: '8px 0 4px 0' }}>
          (iii) Experience of Committees in Colleges
        </p>
        <table className="print-table" style={{ marginBottom: '8px' }}>
          <thead>
            <tr>
              <th style={{ width: '5%', textAlign: 'center' }}>Sr.</th>
              <th style={{ width: '45%' }}>Particulars</th>
              <th style={{ width: '25%' }}>Marks / Criteria</th>
              <th style={{ width: '15%', textAlign: 'center' }}>Academic Session</th>
              <th style={{ width: '10%', textAlign: 'center' }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {BIII_ITEMS.map((item, idx) => {
              const row = (t.respBiiiTable || [])[idx] || {};
              return (
                <tr key={idx}>
                  <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                  <td>{item.label}</td>
                  <td style={{ fontSize: '10.5px', color: '#475569' }}>{item.marks}</td>
                  <td style={{ textAlign: 'center' }}>{row.session || '-'}</td>
                  <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{row.score || '0.0'}</td>
                </tr>
              );
            })}
            <tr style={{ backgroundColor: '#eff6ff', fontWeight: 'bold' }}>
              <td colSpan="4" style={{ textAlign: 'right' }}>Total B(iii) Score Claimed:</td>
              <td style={{ textAlign: 'center', color: '#1e3a8a' }}>
                {(t.respBiiiTable || []).reduce((sum, r) => sum + (parseFloat(r?.score) || 0), 0).toFixed(1)}
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ fontSize: '11px', color: '#475569', fontStyle: 'italic', margin: '4px 0 8px 0' }}>
          *Note: More than one experience in an academic year is not allowed. In the case of member of any committee, 0.25 mark for each academic session.
        </div>

        <div style={{ fontSize: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '6px' }}>
          <span className="print-field-label">Part II Merged Supporting Proof: </span>
          <span className="print-field-val">
            {f.filePart2?.url
              ? `✓ Uploaded (${f.filePart2.originalName || 'Part_II_Proofs.pdf'})`
              : 'Not attached'}
          </span>
        </div>
      </div>

      {/* ================= 13. PART III: RESEARCH SCORE ================= */}
      <div className="print-section">
        <div className="print-section-title">
          13. PART III: ACADEMIC / RESEARCH SCORE (MAX 32.5 MARKS)
        </div>
        <table className="print-table">
          <thead>
            <tr>
              <th>Research Score Sub-Categories</th>
              <th style={{ width: '30%', textAlign: 'center' }}>Score Claimed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1. Research Papers in Peer-reviewed / UGC CARE Listed Journals</td>
              <td style={{ textAlign: 'center' }}>{v.resPapers || '0'}</td>
            </tr>
            <tr>
              <td>2. Publications (Books authored, Chapters, Edited Books, Translations)</td>
              <td style={{ textAlign: 'center' }}>
                {(
                  parseFloat(v.resBooksInt || 0) +
                  parseFloat(v.resBooksNat || 0) +
                  parseFloat(v.resChapter || 0) +
                  parseFloat(v.resEditorInt || 0) +
                  parseFloat(v.resEditorNat || 0) +
                  parseFloat(v.resTransChapter || 0) +
                  parseFloat(v.resTransBook || 0)
                ).toFixed(1)}
              </td>
            </tr>
            <tr>
              <td>3. Creation of ICT mediated Teaching Learning pedagogy & Content</td>
              <td style={{ textAlign: 'center' }}>
                {(
                  parseFloat(v.resIctCurricula || 0) +
                  parseFloat(v.resIctMoocsCourse || 0) +
                  parseFloat(v.resIctMoocsModule || 0) +
                  parseFloat(v.resIctEContent || 0)
                ).toFixed(1)}
              </td>
            </tr>
            <tr>
              <td>4. Research Guidance, Projects & Consultancy</td>
              <td style={{ textAlign: 'center' }}>
                {(
                  parseFloat(v.resGuidancePhd || 0) +
                  parseFloat(v.resGuidanceMPhil || 0) +
                  parseFloat(v.resProjectsMajor || 0) +
                  parseFloat(v.resProjectsMinor || 0) +
                  parseFloat(v.resConsultancy || 0)
                ).toFixed(1)}
              </td>
            </tr>
            <tr>
              <td>5. Patents, Policy Documents, Awards & Invited Lectures</td>
              <td style={{ textAlign: 'center' }}>
                {(
                  parseFloat(v.resPatentsInt || 0) +
                  parseFloat(v.resPatentsNat || 0) +
                  parseFloat(v.resPolicyInt || 0) +
                  parseFloat(v.resAwardsInt || 0) +
                  parseFloat(v.resAwardsNat || 0) +
                  parseFloat(v.resLecturesInt || 0) +
                  parseFloat(v.resLecturesNat || 0)
                ).toFixed(1)}
              </td>
            </tr>
            <tr style={{ backgroundColor: '#eff6ff', fontWeight: 'bold' }}>
              <td>TOTAL ACADEMIC / RESEARCH SCORE (PART III)</td>
              <td style={{ textAlign: 'center', color: '#1e3a8a', fontSize: '13px' }}>
                {v.resTotal || '0'} / 32.5
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= 14. ANNEXURES ================= */}
      <div className="print-section">
        <div className="print-section-title">14. ANNEXURES & SUPPORTING DOCUMENTS</div>
        <div style={{ fontSize: '12px' }}>
          <span className="print-field-label">Merged Annexures Document: </span>
          <span className="print-field-val">
            {f.fileAnnexures?.url
              ? `✓ Uploaded (${f.fileAnnexures.originalName || 'Annexures_Proof.pdf'})`
              : 'Not attached'}
          </span>
        </div>
      </div>

      {/* ================= 15. PAYMENT DETAILS ================= */}
      <div className="print-section">
        <div className="print-section-title">15. APPLICATION FEE PAYMENT</div>
        <div className="print-grid-2">
          <div>
            <p style={{ margin: '2px 0', fontSize: '12.5px' }}>
              <strong>Application Fee Amount:</strong> ₹{v.paymentAmount || '1000'}
            </p>
            <p style={{ margin: '2px 0', fontSize: '12.5px' }}>
              <strong>12-Digit UTR / Transaction No:</strong>{' '}
              <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#1e3a8a' }}>
                {v.utrNo || '-'}
              </span>
            </p>
            <p style={{ margin: '2px 0', fontSize: '12.5px' }}>
              <strong>UPI Provider / App:</strong> {v.upiProvider || 'UPI'}
            </p>
            <p style={{ margin: '2px 0', fontSize: '12.5px' }}>
              <strong>Account Holder / Payer Name:</strong> {v.accountHolderName || '-'}
            </p>
          </div>
          {f.filePaymentScreenshot?.url && (
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                Payment Screenshot Receipt:
              </span>
              <img
                src={f.filePaymentScreenshot.url}
                alt="Payment Receipt"
                style={{
                  maxHeight: '100px',
                  maxWidth: '160px',
                  objectFit: 'contain',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px'
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* ================= 16. DECLARATION & SIGNATURE ================= */}
      <div className="print-section" style={{ pageBreakInside: 'avoid' }}>
        <div className="print-section-title">16. DECLARATION & VERIFICATION</div>
        <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
          <p style={{ fontSize: '11px', color: '#334155', lineHeight: '1.6', margin: '0 0 8px 0' }}>
            <strong>Undertaking:</strong> I hereby declare and undertake that all the information provided by me in this application form is true, correct and complete to the best of my knowledge and belief and nothing has been concealed therein. In case any information is found to be false, incorrect or misleading, my candidature/appointment is liable to be cancelled without any notice.
          </p>
          <p style={{ fontSize: '11px', color: '#15803d', fontWeight: 'bold', margin: '0' }}>
            ✓ Final Verification: Confirmed by the applicant as per the Criteria for selection of Principal.
          </p>
        </div>

        <div className="print-sig-box">
          <div>
            <p style={{ margin: '2px 0', fontSize: '12px' }}>
              <strong>Place:</strong> {v.place || 'Rohtak'}
            </p>
            <p style={{ margin: '2px 0', fontSize: '12px' }}>
              <strong>Date:</strong> {v.date || new Date().toLocaleDateString('en-IN')}
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            {f.signature?.url ? (
              <img
                src={f.signature.url}
                alt="Candidate Signature"
                style={{
                  width: '130px',
                  height: '50px',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            ) : (
              <div style={{ width: '130px', height: '40px', borderBottom: '1px solid #000' }}></div>
            )}
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a' }}>
              Candidate Signature
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
