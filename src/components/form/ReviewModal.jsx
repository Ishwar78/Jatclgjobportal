import React, { useState } from 'react';
import { getFileUrl } from '../../api/candidateApi';
import SelectionCriteriaTables from './SelectionCriteriaTables';

export default function ReviewModal({
  sections = [],
  values = {},
  tableValues = {},
  fileMeta = {},
  missingFields = [],
  onEditSection,
  onSubmit,
  onSaveForLater,
  onBack,
  submitting = false,
  savingForLater = false,
  submitError = null,
  isEmbedded = false
}) {
  // Expand all sections by default so candidate can review everything
  const [openSections, setOpenSections] = useState(
    sections.map((_, i) => i)
  );

  const toggleSection = (idx) => {
    setOpenSections(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const expandAll = () => setOpenSections(sections.map((_, i) => i));
  const collapseAll = () => setOpenSections([]);

  const handleFinalSubmit = () => {
    if (window.confirm("Are you sure you want to submit your application? Once submitted, no further edits will be permitted.")) {
      onSubmit();
    }
  };

  const eduRows = Array.isArray(tableValues.educationDetails) ? tableValues.educationDetails : [];
  const empRows = Array.isArray(tableValues.employmentTable)
    ? tableValues.employmentTable.filter((r) => r && (r.employer || r.designation))
    : [];
  const respBiiRows = Array.isArray(tableValues.respBiiTable)
    ? tableValues.respBiiTable.filter((r) => r && Object.values(r).some((x) => String(x || '').trim()))
    : [];
  const respBiiiRows = Array.isArray(tableValues.respBiiiTable)
    ? tableValues.respBiiiTable.filter((r) => r && Object.values(r).some((x) => String(x || '').trim()))
    : [];

  const resolveUrl = (fileObj) => {
    if (!fileObj || !fileObj.url) return null;
    return getFileUrl(fileObj.url);
  };

  return (
    <div className="space-y-6">
      {/* Review Header Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-blue-950 flex items-center gap-2">
            <span>📋</span>
            <span>Review Application Details (All 16 Sections)</span>
          </h2>
          <p className="text-xs md:text-sm text-blue-800 mt-1">
            Please carefully review all 16 sections before final submission. Click <strong>Edit</strong> on any section to make corrections.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={openSections.length === sections.length ? collapseAll : expandAll}
            className="border border-blue-300 bg-white hover:bg-blue-100 text-blue-900 font-semibold px-3 py-1.5 rounded-xl text-xs transition"
          >
            {openSections.length === sections.length ? 'Collapse All' : 'Expand All'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="border border-blue-400 bg-white hover:bg-blue-100 text-blue-900 font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm transition whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <span>🖨️</span>
            <span>Print Preview</span>
          </button>
        </div>
      </div>

      {/* Missing Mandatory Fields Warning Banner */}
      {missingFields && missingFields.length > 0 && (
        <div className="validation-error-banner">
          <div className="validation-error-header">
            <span>⚠️</span>
            <span>Incomplete Application — The following {missingFields.length} mandatory field(s) are required:</span>
          </div>
          <ul className="validation-error-list">
            {missingFields.map((m, idx) => (
              <li key={idx}>
                <strong>Step {m.step}:</strong> {m.label}
                <span
                  className="validation-fix-link"
                  onClick={() => onEditSection(m.step)}
                >
                  [Go to Step {m.step}]
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs md:text-sm rounded-xl p-4">
          ⚠️ {submitError}
        </div>
      )}

      {/* Accordion List of All 16 Sections */}
      <div className="space-y-3">
        {sections.map((sec, idx) => {
          const isOpen = openSections.includes(idx);
          const stepNum = idx + 1;

          return (
            <div
              key={sec.id || idx}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
            >
              {/* Section Accordion Header */}
              <div
                onClick={() => toggleSection(idx)}
                className="px-5 py-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition select-none bg-slate-50/50"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
                    {stepNum}
                  </span>
                  <h3 className="font-bold text-slate-800 text-sm md:text-base">
                    {sec.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditSection(stepNum);
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition"
                  >
                    Edit
                  </button>
                  <span className="text-slate-400 text-xs">{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>

              {/* Section Accordion Body */}
              {isOpen && (
                <div className="p-4 md:p-5 border-t border-slate-100 bg-white">
                  {/* STEP 1: INSTRUCTIONS */}
                  {stepNum === 1 && (
                    <div className="space-y-3 text-xs text-slate-700">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                        <p><strong>1.1 Submission of Hard Copy:</strong> The last date for the receipt of hard copy of application will be the same as the closing date of the portal mentioned in the advertisement. Incomplete applications will not be considered.</p>
                        <p><strong>1.2 Verification & Testimonials:</strong> Application form should be properly filled. Photocopies of all certificates/testimonials must be attached. Originals will have to be shown at the time of Interview.</p>
                        <p><strong>1.3 Forwarding through Employer:</strong> The applicants should send their applications after getting forwarded by their current employer. Printout of filled application must also be sent to the Dean of Colleges, M.D. University, Rohtak and DGHE Panchkula.</p>
                        <p><strong>1.4 Incomplete Applications:</strong> Applications received after the due date or found incomplete in any respect will be rejected summarily.</p>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-700 font-semibold bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                        <span>✓</span>
                        <span>Candidate has carefully read, understood and confirmed all instructions and conditions.</span>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: PERSONAL INFORMATION */}
                  {stepNum === 2 && (
                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Post Applied For:</span>
                          <span className="text-slate-900 font-bold">{values.postAppliedFor || 'Principal'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Candidate Name:</span>
                          <span className="text-slate-900 font-medium">{values.name || '-'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Father's Name:</span>
                          <span className="text-slate-900 font-medium">{values.fatherName || '-'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Mother's Name:</span>
                          <span className="text-slate-900 font-medium">{values.motherName || '-'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Date of Birth:</span>
                          <span className="text-slate-900 font-medium">{values.dob || '-'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Social Category:</span>
                          <span className="text-slate-900 font-medium">
                            {values.socialCategory || 'General'}
                            {fileMeta.categoryCertificate?.url && (
                              <a
                                href={resolveUrl(fileMeta.categoryCertificate)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 font-bold ml-1 hover:underline"
                              >
                                [View Certificate]
                              </a>
                            )}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Nationality:</span>
                          <span className="text-slate-900 font-medium">{values.nationality || 'Indian'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Marital Status:</span>
                          <span className="text-slate-900 font-medium">{values.maritalStatus || '-'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Mobile Number:</span>
                          <span className="text-slate-900 font-medium">{values.contactNo1 || '-'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">WhatsApp Number:</span>
                          <span className="text-slate-900 font-medium">{values.whatsappNo || '-'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Email ID:</span>
                          <span className="text-slate-900 font-medium">{values.email || '-'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Aadhaar Number:</span>
                          <span className="text-slate-900 font-medium">{values.aadhaarNo || '-'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Family ID / PPP:</span>
                          <span className="text-slate-900 font-medium">{values.familyId || 'N/A'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 sm:col-span-2">
                          <span className="text-slate-500 font-semibold block">Present Address:</span>
                          <span className="text-slate-900 font-medium">
                            {[values.presentStreet, values.presentCity, values.presentState, values.presentPostalCode, values.presentCountry]
                              .filter(Boolean)
                              .join(', ') || 'N/A'}
                          </span>
                        </div>
                      </div>
                      {fileMeta.photo?.url && (
                        <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold">Candidate Photo:</span>
                          <img
                            src={resolveUrl(fileMeta.photo)}
                            alt="Candidate"
                            className="w-12 h-14 object-cover rounded border border-slate-300"
                          />
                          <a
                            href={resolveUrl(fileMeta.photo)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 font-semibold hover:underline"
                          >
                            {fileMeta.photo.originalName || 'View Photo'}
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 3: REFERENCES */}
                  {stepNum === 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                        <span className="font-bold text-blue-900 block border-b border-slate-200 pb-1">Referee 1</span>
                        <p><strong>Name:</strong> {values.ref1FirstName} {values.ref1LastName}</p>
                        <p><strong>Occupation:</strong> {values.ref1Occupation || '-'}</p>
                        <p><strong>Address:</strong> {values.ref1Address || '-'}</p>
                        <p><strong>Contact:</strong> {values.ref1Phone} | {values.ref1Email}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                        <span className="font-bold text-blue-900 block border-b border-slate-200 pb-1">Referee 2</span>
                        <p><strong>Name:</strong> {values.ref2FirstName} {values.ref2LastName}</p>
                        <p><strong>Occupation:</strong> {values.ref2Occupation || '-'}</p>
                        <p><strong>Address:</strong> {values.ref2Address || '-'}</p>
                        <p><strong>Contact:</strong> {values.ref2Phone} | {values.ref2Email}</p>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: COURT DECLARATIONS */}
                  {stepNum === 4 && (
                    <div className="space-y-2 text-xs">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-slate-600 block mb-1">
                          Ever prosecuted, detained, fined, convicted or debarred/disqualified?
                        </span>
                        <span className={`font-bold ${values.courtCase1 === 'Yes' ? 'text-red-600' : 'text-emerald-700'}`}>
                          {values.courtCase1 || 'No'}
                        </span>
                        {values.courtCase1 === 'Yes' && values.courtCase1Details && (
                          <p className="mt-1 text-red-700 bg-red-50 p-2 rounded">
                            <strong>Details:</strong> {values.courtCase1Details}
                          </p>
                        )}
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-slate-600 block mb-1">
                          Is any court case pending against you?
                        </span>
                        <span className={`font-bold ${values.courtCase2 === 'Yes' ? 'text-red-600' : 'text-emerald-700'}`}>
                          {values.courtCase2 || 'No'}
                        </span>
                        {values.courtCase2 === 'Yes' && values.courtCase2Details && (
                          <p className="mt-1 text-red-700 bg-red-50 p-2 rounded">
                            <strong>Details:</strong> {values.courtCase2Details}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 5: EDUCATIONAL QUALIFICATIONS */}
                  {stepNum === 5 && (
                    <div className="space-y-3 text-xs">
                      {eduRows.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse border border-slate-200 text-xs">
                            <thead className="bg-slate-100 text-slate-700">
                              <tr>
                                <th className="p-2 border border-slate-200">Exam Passed</th>
                                <th className="p-2 border border-slate-200">Board / Univ</th>
                                <th className="p-2 border border-slate-200">Roll No</th>
                                <th className="p-2 border border-slate-200">Year</th>
                                <th className="p-2 border border-slate-200">Max</th>
                                <th className="p-2 border border-slate-200">Obt</th>
                                <th className="p-2 border border-slate-200">%</th>
                                <th className="p-2 border border-slate-200">Div</th>
                              </tr>
                            </thead>
                            <tbody>
                              {eduRows.map((r, i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                  <td className="p-2 border border-slate-200 font-semibold">{r.exam || `Exam ${i+1}`}</td>
                                  <td className="p-2 border border-slate-200">{r.university || '-'}</td>
                                  <td className="p-2 border border-slate-200">{r.rollNo || '-'}</td>
                                  <td className="p-2 border border-slate-200">{r.yearOfPassing || '-'}</td>
                                  <td className="p-2 border border-slate-200">{r.marksMax || '-'}</td>
                                  <td className="p-2 border border-slate-200">{r.marksObtained || '-'}</td>
                                  <td className="p-2 border border-slate-200 font-bold">{r.percentage ? `${r.percentage}%` : '-'}</td>
                                  <td className="p-2 border border-slate-200">{r.division || '-'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-slate-400 italic">No qualifications recorded.</p>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                        {values.mphilTopic && (
                          <p><strong>M.Phil Dissertation:</strong> {values.mphilTopic}</p>
                        )}
                        <p><strong>Ph.D. Research Topic:</strong> {values.phdTopic || '-'}</p>
                        <p><strong>Field of Specialization:</strong> {values.fieldOfSpecialization || '-'}</p>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: EMPLOYMENT & EXPERIENCE */}
                  {stepNum === 6 && (
                    <div className="space-y-3 text-xs">
                      {empRows.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse border border-slate-200 text-xs">
                            <thead className="bg-slate-100 text-slate-700">
                              <tr>
                                <th className="p-2 border border-slate-200">Employer</th>
                                <th className="p-2 border border-slate-200">Designation</th>
                                <th className="p-2 border border-slate-200">From</th>
                                <th className="p-2 border border-slate-200">To</th>
                                <th className="p-2 border border-slate-200">Exp (Yrs)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {empRows.map((r, i) => (
                                <tr key={i} className="hover:bg-slate-50">
                                  <td className="p-2 border border-slate-200 font-medium">{r.employer || '-'}</td>
                                  <td className="p-2 border border-slate-200">{r.designation || '-'}</td>
                                  <td className="p-2 border border-slate-200">{r.durationFrom || '-'}</td>
                                  <td className="p-2 border border-slate-200">{r.durationTo || '-'}</td>
                                  <td className="p-2 border border-slate-200 font-bold">{r.teachingYears || '-'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-slate-400 italic">No employment records listed.</p>
                      )}
                      <div className="pt-2">
                        <span className="text-slate-500 font-semibold">Experience Certificates: </span>
                        {fileMeta.fileExperienceCerts?.url ? (
                          <a
                            href={resolveUrl(fileMeta.fileExperienceCerts)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 font-bold hover:underline ml-1"
                          >
                            ✓ {fileMeta.fileExperienceCerts.originalName || 'View Certificates'}
                          </a>
                        ) : (
                          <span className="text-slate-400 italic">Not attached</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 7: UPLOADED EDUCATIONAL DOCUMENTS */}
                  {stepNum === 7 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
                      {[
                        { key: 'docMatric', label: 'Matriculation' },
                        { key: 'docInter', label: '10+2 / Intermediate' },
                        { key: 'docGrad', label: 'Graduation' },
                        { key: 'docPG', label: 'Post-Graduation' },
                        { key: 'docBEd', label: 'B.Ed.' },
                        { key: 'docMEd', label: 'M.Ed.' },
                        { key: 'docMPhil', label: 'M.Phil.' },
                        { key: 'docPhd', label: 'Ph.D.' },
                        { key: 'docNetSlet', label: 'NET / SLET' },
                        { key: 'docAnyOther', label: `Other: ${values.anyOtherQualName || 'Certificate'}` }
                      ].map(({ key, label }) => {
                        const file = fileMeta[key];
                        return (
                          <div key={key} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                            <span className="text-slate-500 font-semibold block">{label}:</span>
                            {file?.url ? (
                              <a
                                href={resolveUrl(file)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 font-semibold hover:underline truncate block"
                              >
                                📄 {file.originalName || 'View Document'}
                              </a>
                            ) : (
                              <span className="text-slate-400 italic">Pending / N/A</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* STEP 8: EMPLOYMENT STATUS, NOC & OTHER SERVICE DETAILS */}
                  {stepNum === 8 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <span className="text-slate-500 font-semibold block">Presently Employed:</span>
                        <span className="font-bold text-slate-900">{values.isPresEmployed || 'No'}</span>
                      </div>
                      {values.isPresEmployed === 'Yes' && (
                        <>
                          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                            <span className="text-slate-500 font-semibold block">Current Employer / College:</span>
                            <span className="text-slate-900 font-medium">{values.nocCurrentCollege || '-'}</span>
                          </div>
                          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                            <span className="text-slate-500 font-semibold block">Department / Subject:</span>
                            <span className="text-slate-900 font-medium">{values.nocDepartment || '-'}</span>
                          </div>
                          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                            <span className="text-slate-500 font-semibold block">Current Designation:</span>
                            <span className="text-slate-900 font-medium">{values.nocDesignation || '-'}</span>
                          </div>
                          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                            <span className="text-slate-500 font-semibold block">NOC Certificate:</span>
                            {fileMeta.fileNOC?.url ? (
                              <a
                                href={resolveUrl(fileMeta.fileNOC)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-700 font-bold hover:underline"
                              >
                                ✓ {fileMeta.fileNOC.originalName || 'View NOC Certificate'}
                              </a>
                            ) : (
                              <span className="text-amber-600 italic">Pending upload</span>
                            )}
                          </div>
                        </>
                      )}
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <span className="text-slate-500 font-semibold block">Basic Pay Acceptable:</span>
                        <span className="font-bold text-slate-900">{values.basicPayAcceptable || 'As per norms'}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <span className="text-slate-500 font-semibold block">Joining Period Required:</span>
                        <span className="font-bold text-slate-900">{values.joiningPeriod || 'Immediately'}</span>
                      </div>
                    </div>
                  )}

                  {/* STEP 9: CRITERIA FOR SELECTION OF PRINCIPAL */}
                  {stepNum === 9 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-emerald-700 font-semibold bg-emerald-50 px-3 py-2.5 rounded-lg border border-emerald-200 text-xs md:text-sm">
                        <span className="text-base">✓</span>
                        <span>Candidate has carefully studied and accepted the Haryana Govt Selection Criteria for Principal.</span>
                      </div>
                      <SelectionCriteriaTables />
                    </div>
                  )}

                  {/* STEP 10: PART I ACADEMIC RECORD SCORE */}
                  {stepNum === 10 && (() => {
                    const m = parseFloat(values.academicMasters || 0) || 0;
                    const g = parseFloat(values.academicGrad || 0) || 0;
                    const h = parseFloat(values.academic12th || 0) || 0;
                    const s = parseFloat(values.academicMatric || 0) || 0;
                    const calcAcademic = (m + g + h + s).toFixed(2).replace(/\.00$/, '');
                    const academicScoreDisplay = (values.academicTotal && values.academicTotal !== '0')
                      ? values.academicTotal
                      : (calcAcademic !== '0' ? calcAcademic : (values.academicTotal || '0'));

                    return (
                      <div className="space-y-2 text-xs">
                        <table className="w-full text-left border-collapse border border-slate-200 text-xs">
                          <thead className="bg-slate-100 text-slate-700">
                            <tr>
                              <th className="p-2 border border-slate-200">Qualification</th>
                              <th className="p-2 border border-slate-200 text-center">Max Marks</th>
                              <th className="p-2 border border-slate-200 text-center">Marks Claimed</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-2 border border-slate-200">Master's Degree (&gt;55%)</td>
                              <td className="p-2 border border-slate-200 text-center">5</td>
                              <td className="p-2 border border-slate-200 text-center font-bold">{values.academicMasters || '0'}</td>
                            </tr>
                            <tr>
                              <td className="p-2 border border-slate-200">Graduation (&gt;55%)</td>
                              <td className="p-2 border border-slate-200 text-center">5</td>
                              <td className="p-2 border border-slate-200 text-center font-bold">{values.academicGrad || '0'}</td>
                            </tr>
                            <tr>
                              <td className="p-2 border border-slate-200">10+2 / Prep (&gt;55%)</td>
                              <td className="p-2 border border-slate-200 text-center">5</td>
                              <td className="p-2 border border-slate-200 text-center font-bold">{values.academic12th || '0'}</td>
                            </tr>
                            <tr>
                              <td className="p-2 border border-slate-200">Matriculation (&gt;55%)</td>
                              <td className="p-2 border border-slate-200 text-center">5</td>
                              <td className="p-2 border border-slate-200 text-center font-bold">{values.academicMatric || '0'}</td>
                            </tr>
                            <tr className="bg-blue-50 font-bold">
                              <td className="p-2 border border-slate-200 text-blue-900">Total Academic Score (Part I)</td>
                              <td className="p-2 border border-slate-200 text-center text-blue-900">20</td>
                              <td className="p-2 border border-slate-200 text-center text-blue-900 text-sm font-extrabold">{academicScoreDisplay}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    );
                  })()}

                  {/* STEP 11: PART II TEACHING & ADMIN SKILLS SCORE */}
                  {stepNum === 11 && (() => {
                    const exp15 = parseFloat(values.teachingExpAbove15 || 0) || 0;
                    const jd = parseFloat(values.adminJointDirector || 0) || 0;
                    const reg = parseFloat(values.adminRegistrar || 0) || 0;
                    const head = parseFloat(values.adminHead || 0) || 0;
                    const adminCombined = Math.min(jd + reg + head, 25);
                    const calcTeaching = (exp15 + adminCombined).toFixed(2).replace(/\.00$/, '');
                    const teachingScoreDisplay = (values.teachingTotalScore && values.teachingTotalScore !== '0')
                      ? values.teachingTotalScore
                      : (calcTeaching !== '0' ? calcTeaching : (values.teachingTotalScore || '0'));

                    return (
                      <div className="space-y-2 text-xs">
                        <table className="w-full text-left border-collapse border border-slate-200 text-xs">
                          <thead className="bg-slate-100 text-slate-700">
                            <tr>
                              <th className="p-2 border border-slate-200">Category</th>
                              <th className="p-2 border border-slate-200 text-center">Max Marks</th>
                              <th className="p-2 border border-slate-200 text-center">Marks Claimed</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-2 border border-slate-200">A. Teaching Experience (&gt;15 years)</td>
                              <td className="p-2 border border-slate-200 text-center">10</td>
                              <td className="p-2 border border-slate-200 text-center font-bold">{values.teachingExpAbove15 || '0'}</td>
                            </tr>
                            <tr>
                              <td className="p-2 border border-slate-200">B(i).1 Joint/Deputy/Asst Director in DHE</td>
                              <td className="p-2 border border-slate-200 text-center" rowSpan="3">25 (Combined)</td>
                              <td className="p-2 border border-slate-200 text-center">{values.adminJointDirector || '0'}</td>
                            </tr>
                            <tr>
                              <td className="p-2 border border-slate-200">B(i).2 Registrar or Admin post in University</td>
                              <td className="p-2 border border-slate-200 text-center">{values.adminRegistrar || '0'}</td>
                            </tr>
                            <tr>
                              <td className="p-2 border border-slate-200">B(i).3 Head of HEI (Principal / Officiating / DDO)</td>
                              <td className="p-2 border border-slate-200 text-center">{values.adminHead || '0'}</td>
                            </tr>
                            <tr className="bg-blue-50 font-bold">
                              <td className="p-2 border border-slate-200 text-blue-900">Total Part II Score</td>
                              <td className="p-2 border border-slate-200 text-center text-blue-900">35</td>
                              <td className="p-2 border border-slate-200 text-center text-blue-900 text-sm font-extrabold">{teachingScoreDisplay}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    );
                  })()}

                  {/* STEP 12: B(ii) RESPONSIBILITIES & B(iii) COMMITTEES */}
                  {stepNum === 12 && (
                    <div className="space-y-4 text-xs">
                      {/* Sub-table (ii) */}
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1.5 text-xs bg-slate-100 p-2 rounded border border-slate-200">
                          (ii) Experience of Key Responsibilities in Colleges
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse border border-slate-200 text-xs">
                            <thead className="bg-slate-50 text-slate-700">
                              <tr>
                                <th className="p-2 border border-slate-200 w-10 text-center">Sr.</th>
                                <th className="p-2 border border-slate-200">Particulars</th>
                                <th className="p-2 border border-slate-200">Marks / Criteria</th>
                                <th className="p-2 border border-slate-200 w-32">Academic Session</th>
                                <th className="p-2 border border-slate-200 w-24 text-right">Score</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { label: 'Staff Representative or V.C. Nominee in Managing Committee of any College', marks: '01 Marks for each year Maximum upto 3 marks' },
                                { label: 'Coordinator or Organizing Secretary of International/National/State Conference/Event', marks: '01 Marks for each year Maximum upto 3 marks' },
                                { label: 'Bursar', marks: '01 Marks for each year Maximum upto 3 marks' },
                                { label: 'NSS Programme Officer', marks: '01 Marks for each year Maximum upto 3 marks' },
                                { label: 'YRC Counsellor', marks: '01 Marks for each year Maximum upto 3 marks' },
                                { label: 'Hostel Warden', marks: '01 Marks for each year Maximum upto 3 marks' },
                                { label: 'Member of any Statutory Body of University', marks: '01 Marks for each year Maximum upto 2 marks' },
                                { label: 'Experience as Associate NCC Officer in HEI (s)', marks: '01 Marks for each year Maximum upto 3 marks' }
                              ].map((item, i) => {
                                const row = (tableValues.respBiiTable || [])[i] || {};
                                return (
                                  <tr key={i} className="hover:bg-slate-50">
                                    <td className="p-2 border border-slate-200 text-center font-semibold text-slate-600">{i + 1}</td>
                                    <td className="p-2 border border-slate-200 font-medium">{item.label}</td>
                                    <td className="p-2 border border-slate-200 text-slate-600">{item.marks}</td>
                                    <td className="p-2 border border-slate-200">{row.session || <span className="text-slate-400 italic">-</span>}</td>
                                    <td className="p-2 border border-slate-200 text-right font-bold text-blue-900">{row.score || '0.0'}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Sub-table (iii) */}
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1.5 text-xs bg-slate-100 p-2 rounded border border-slate-200">
                          (iii) Experience of Committees in Colleges
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse border border-slate-200 text-xs">
                            <thead className="bg-slate-50 text-slate-700">
                              <tr>
                                <th className="p-2 border border-slate-200 w-10 text-center">Sr.</th>
                                <th className="p-2 border border-slate-200">Particulars</th>
                                <th className="p-2 border border-slate-200">Marks / Criteria</th>
                                <th className="p-2 border border-slate-200 w-32">Academic Session</th>
                                <th className="p-2 border border-slate-200 w-24 text-right">Score</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
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
                              ].map((item, i) => {
                                const row = (tableValues.respBiiiTable || [])[i] || {};
                                return (
                                  <tr key={i} className="hover:bg-slate-50">
                                    <td className="p-2 border border-slate-200 text-center font-semibold text-slate-600">{i + 1}</td>
                                    <td className="p-2 border border-slate-200 font-medium">{item.label}</td>
                                    <td className="p-2 border border-slate-200 text-slate-600">{item.marks}</td>
                                    <td className="p-2 border border-slate-200">{row.session || <span className="text-slate-400 italic">-</span>}</td>
                                    <td className="p-2 border border-slate-200 text-right font-bold text-blue-900">{row.score || '0.0'}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-slate-500 font-semibold">Part II Merged Supporting Proof: </span>
                        {fileMeta.filePart2?.url ? (
                          <a
                            href={resolveUrl(fileMeta.filePart2)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 font-bold hover:underline ml-1"
                          >
                            ✓ {fileMeta.filePart2.originalName || 'View Part II Proofs'}
                          </a>
                        ) : (
                          <span className="text-slate-400 italic">Not attached</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 13: PART III RESEARCH SCORE */}
                  {stepNum === 13 && (
                    <div className="space-y-2 text-xs">
                      <table className="w-full text-left border-collapse border border-slate-200 text-xs">
                        <thead className="bg-slate-100 text-slate-700">
                          <tr>
                            <th className="p-2 border border-slate-200">Research Category</th>
                            <th className="p-2 border border-slate-200 text-center">Score Claimed</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-2 border border-slate-200">1. Research Papers in Peer-Reviewed/CARE Journals</td>
                            <td className="p-2 border border-slate-200 text-center font-bold">{values.resPapers || '0'}</td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-slate-200">2. Publications (Books, Chapters, Translations)</td>
                            <td className="p-2 border border-slate-200 text-center font-bold">
                              {(
                                parseFloat(values.resBooksInt || 0) +
                                parseFloat(values.resBooksNat || 0) +
                                parseFloat(values.resChapter || 0) +
                                parseFloat(values.resEditorInt || 0) +
                                parseFloat(values.resEditorNat || 0) +
                                parseFloat(values.resTransChapter || 0) +
                                parseFloat(values.resTransBook || 0)
                              ).toFixed(1)}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-slate-200">3. ICT Pedagogy & Content Creation</td>
                            <td className="p-2 border border-slate-200 text-center font-bold">
                              {(
                                parseFloat(values.resIctCurricula || 0) +
                                parseFloat(values.resIctMoocsCourse || 0) +
                                parseFloat(values.resIctMoocsModule || 0) +
                                parseFloat(values.resIctEContent || 0)
                              ).toFixed(1)}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-slate-200">4. Research Guidance, Projects & Consultancy</td>
                            <td className="p-2 border border-slate-200 text-center font-bold">
                              {(
                                parseFloat(values.resGuidancePhd || 0) +
                                parseFloat(values.resGuidanceMPhil || 0) +
                                parseFloat(values.resProjectsMajor || 0) +
                                parseFloat(values.resProjectsMinor || 0) +
                                parseFloat(values.resConsultancy || 0)
                              ).toFixed(1)}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-slate-200">5. Patents, Policy Documents, Awards & Invited Lectures</td>
                            <td className="p-2 border border-slate-200 text-center font-bold">
                              {(
                                parseFloat(values.resPatentsInt || 0) +
                                parseFloat(values.resPatentsNat || 0) +
                                parseFloat(values.resPolicyInt || 0) +
                                parseFloat(values.resAwardsInt || 0) +
                                parseFloat(values.resAwardsNat || 0) +
                                parseFloat(values.resLecturesInt || 0) +
                                parseFloat(values.resLecturesNat || 0)
                              ).toFixed(1)}
                            </td>
                          </tr>
                          <tr className="bg-blue-50 font-bold">
                            <td className="p-2 border border-slate-200 text-blue-900">Total Research Score (Part III)</td>
                            <td className="p-2 border border-slate-200 text-center text-blue-900 text-sm">{values.resTotal || '0'} / 32.5</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* STEP 14: ANNEXURES */}
                  {stepNum === 14 && (
                    <div className="text-xs">
                      <span className="text-slate-500 font-semibold">Merged Annexures Document: </span>
                      {fileMeta.fileAnnexures?.url ? (
                        <a
                          href={resolveUrl(fileMeta.fileAnnexures)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 font-bold hover:underline ml-1"
                        >
                          ✓ {fileMeta.fileAnnexures.originalName || 'View Annexures'}
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">Not attached</span>
                      )}
                    </div>
                  )}

                  {/* STEP 15: PAYMENT DETAILS */}
                  {stepNum === 15 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-2">
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Fee Amount:</span>
                          <span className="text-slate-900 font-bold text-sm">₹{values.paymentAmount || '1000'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">12-Digit UTR / Transaction No:</span>
                          <span className="font-mono font-bold text-blue-900">{values.utrNo || '-'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">UPI Provider / App:</span>
                          <span className="text-slate-900 font-medium">{values.upiProvider || 'UPI'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Account Holder Name:</span>
                          <span className="text-slate-900 font-medium">{values.accountHolderName || '-'}</span>
                        </div>
                      </div>
                      <div>
                        {fileMeta.filePaymentScreenshot?.url ? (
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <span className="text-slate-500 font-semibold block mb-2">Payment Receipt Screenshot:</span>
                            <img
                              src={resolveUrl(fileMeta.filePaymentScreenshot)}
                              alt="Payment Screenshot"
                              className="max-h-36 max-w-full rounded border border-slate-300 object-contain"
                            />
                            <a
                              href={resolveUrl(fileMeta.filePaymentScreenshot)}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 font-semibold hover:underline block mt-2"
                            >
                              View Full Size Receipt
                            </a>
                          </div>
                        ) : (
                          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-800">
                            ⚠️ Payment screenshot receipt pending upload.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 16: DECLARATION & SIGNATURE */}
                  {stepNum === 16 && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                        <p><strong>Undertaking:</strong> I hereby declare and undertake that all the information provided by me in this application form is true, correct and complete to the best of my knowledge and belief and nothing has been concealed therein.</p>
                        <p className="text-emerald-700 font-bold">
                          ✓ Final Verification: {values.finalVerification === 'true' || values.finalVerification === true ? 'Confirmed by Applicant' : 'Pending Confirmation'}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Place:</span>
                          <span className="text-slate-900 font-medium">{values.place || '-'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Date:</span>
                          <span className="text-slate-900 font-medium">{values.date || '-'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 font-semibold block">Digital Signature:</span>
                          {fileMeta.signature?.url ? (
                            <div className="mt-1">
                              <img
                                src={resolveUrl(fileMeta.signature)}
                                alt="Signature"
                                className="h-10 max-w-full object-contain border border-slate-300 rounded bg-white p-1"
                              />
                            </div>
                          ) : (
                            <span className="text-red-500 font-bold">Pending upload</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto border border-slate-300 hover:bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm transition"
            >
              ‹ Back to Step 15
            </button>
          )}
          <button
            type="button"
            onClick={onSaveForLater}
            disabled={savingForLater}
            className="w-full sm:w-auto border border-slate-300 hover:bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm transition"
          >
            {savingForLater ? "Saving..." : "Save for Later"}
          </button>
        </div>

        <button
          type="button"
          onClick={handleFinalSubmit}
          disabled={submitting}
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md transition"
        >
          {submitting ? "Submitting Application..." : "Submit Application Final"}
        </button>
      </div>
    </div>
  );
}
