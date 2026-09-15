import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import StepProgress from '../../components/common/StepProgress';
import NocDraftModal from '../../components/form/NocDraftModal';
import ReviewModal from '../../components/form/ReviewModal';
import {
  Step1Instructions,
  Step2Personal,
  Step3References,
  Step5EducationQualifications,
  Step6Employment,
  Step7EducationDocuments,
  Step9EmploymentNoc,
  Step10CriteriaInfo,
  Step11AcademicRecord,
  Step12TeachingAdminScore,
  Step13ResponsibilitiesCommittees,
  Step14ResearchScore,
  Step15Annexures,
  Step16Payment,
  Step17Declaration
} from './steps';
import { STEPS_CONFIG } from './stepsConfig';
import { candidateApi, COLLEGE_SLUG, safeSaveSession, getFileUrl } from '../../api/candidateApi';
import { getInstructionsAPI } from '../../lib/api';
import PrintableApplication from '../../components/form/PrintableApplication';
import './ApplicationPortal.css';

export default function ApplicationPortal() {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [sections, setSections] = useState(STEPS_CONFIG);
  const [config, setConfig] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isReview, setIsReview] = useState(false);

  // Form states
  const [values, setValues] = useState({});
  const [tableValues, setTableValues] = useState({});
  const [fileMeta, setFileMeta] = useState({});
  const [errors, setErrors] = useState({});
  const [missingFields, setMissingFields] = useState([]);

  // Loading & upload states
  const [uploadingField, setUploadingField] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submittedInfo, setSubmittedInfo] = useState(null);

  // NOC Modal state
  const [showNocModal, setShowNocModal] = useState(false);

  const sessionIdRef = useRef('sess_' + Math.random().toString(36).substring(2, 9));

  // 1. Initialize candidate session & config
  useEffect(() => {
    const raw = localStorage.getItem('candidate_session');
    if (!raw) {
      navigate('/login');
      return;
    }

    try {
      const cand = JSON.parse(raw);
      setCandidate(cand);

      // Pre-fill fields from registration & existing progress
      const initialVals = {
        name: cand.candidateName || cand.name || '',
        fatherName: cand.fatherName || cand.formData?.fatherName || '',
        email: cand.email || '',
        confirmEmail: cand.email || '',
        contactNo1: cand.mobile || '',
        presentCountry: 'India',
        nationality: 'Indian',
        paymentAmount: '1000'
      };

      const initialTables = {};

      // Load saved formData if exists
      if (cand.formData && typeof cand.formData === 'object') {
        for (const [k, v] of Object.entries(cand.formData)) {
          if (Array.isArray(v)) {
            initialTables[k] = v;
          } else if (v !== null && v !== undefined) {
            initialVals[k] = String(v);
          }
        }
      }

      if (!initialVals.fatherName && cand.fatherName) {
        initialVals.fatherName = cand.fatherName;
      }
      if (initialVals.presentCountry === undefined) {
        initialVals.presentCountry = 'India';
      }
      if (initialVals.nationality === undefined) {
        initialVals.nationality = 'Indian';
      }

      // Initialize default table rows if not present
      if (!initialTables.educationDetails) {
        initialTables.educationDetails = [
          'Matriculation',
          '10+2 / Pre-Medical / Pre-Engg',
          "Bachelor's Degree",
          "Master's Degree",
          'M.Phil',
          'Ph.D',
          'NET / JRF',
          'SLET',
          'Other'
        ].map(() => ({}));
      }
      if (!initialTables.employmentTable) {
        initialTables.employmentTable = [{}, {}, {}, {}, {}];
      }
      if (!initialTables.respBiiTable) {
        initialTables.respBiiTable = [{}, {}, {}, {}, {}, {}, {}, {}];
      }
      if (!initialTables.respBiiiTable) {
        initialTables.respBiiiTable = Array.from({ length: 17 }, () => ({}));
      }

      setValues(initialVals);
      setTableValues(initialTables);

      if (cand.fileData && typeof cand.fileData === 'object') {
        const normalizedFiles = {};
        for (const [k, v] of Object.entries(cand.fileData)) {
          if (v && typeof v === 'object') {
            normalizedFiles[k] = {
              ...v,
              url: getFileUrl(v.url)
            };
          }
        }
        setFileMeta(normalizedFiles);
      }

      // Start at Step 1 so the applicant can view and fill the 16 steps in serial order
      setCurrentStep(1);
      setIsReview(false);
    } catch (e) {
      console.error('Session parse error:', e);
      navigate('/login');
    }

    // Load backend config & schema
    candidateApi.getConfig(COLLEGE_SLUG)
      .then(cfg => {
        if (cfg) setConfig(prev => ({ ...prev, ...cfg }));
      })
      .catch(err => console.warn('Could not load remote config:', err));

    getInstructionsAPI()
      .then(res => {
        if (res && res.ok && res.data && res.data.data) {
          setConfig(prev => ({ ...prev, ...res.data.data }));
        }
      })
      .catch(err => console.warn('Using default instructions:', err));

    candidateApi.getSchema(COLLEGE_SLUG)
      .then(remoteSchema => {
        const list = Array.isArray(remoteSchema) ? remoteSchema : remoteSchema?.sections;
        if (Array.isArray(list) && list.length >= 15) {
          setSections(list);
        }
      })
      .catch(err => console.warn('Using local schema:', err));
  }, [navigate]);

  // Handle value change
  const handleValueChange = (fieldId, val) => {
    setValues(prev => ({ ...prev, [fieldId]: val }));
    if (errors[fieldId]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  // Handle table cell change
  const handleTableCellChange = (tableId, rowIndex, colKey, val) => {
    setTableValues(prev => {
      const rows = [...(prev[tableId] || [])];
      rows[rowIndex] = { ...(rows[rowIndex] || {}), [colKey]: val };
      return { ...prev, [tableId]: rows };
    });
  };

  // Handle adding table row
  const handleAddTableRow = (tableId) => {
    setTableValues(prev => {
      const rows = [...(prev[tableId] || [])];
      rows.push({});
      return { ...prev, [tableId]: rows };
    });
  };

  // Handle removing table row
  const handleRemoveTableRow = (tableId, rowIndex) => {
    setTableValues(prev => {
      const rows = [...(prev[tableId] || [])];
      if (rows.length > 1) {
        rows.splice(rowIndex, 1);
      }
      return { ...prev, [tableId]: rows };
    });
  };

  // Handle file remove
  const handleFileRemove = (fieldId) => {
    setFileMeta(prev => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  };

  // Handle file uploads directly to server /uploads directory
  const handleFileChange = async (fieldId, file, limitKB) => {
    // 1. Validate file size
    const sizeKB = file.size / 1024;
    if (sizeKB > limitKB) {
      const limitDisplay = limitKB >= 1024 ? `${Math.round(limitKB / 1024)} MB` : `${limitKB} KB`;
      alert(`"${file.name}" is larger than the ${limitDisplay} limit for this field.`);
      return;
    }

    setUploadingField(fieldId);
    setUploadProgress(15);

    try {
      // Physical multipart upload to server
      const uploadedFile = await candidateApi.uploadFile(file, (progress) => {
        setUploadProgress(Math.min(95, Math.max(15, progress)));
      });
      setUploadProgress(100);

      // Save file metadata with server URL
      const newFileObj = {
        originalName: uploadedFile.originalName || file.name,
        mimeType: uploadedFile.mimeType || file.type,
        size: uploadedFile.size || file.size,
        url: uploadedFile.url,
        path: uploadedFile.path || uploadedFile.url
      };

      const updatedFiles = { ...fileMeta, [fieldId]: newFileObj };
      setFileMeta(updatedFiles);

      // Save progress to backend
      if (candidate?.registrationId) {
        await candidateApi.candidateSaveProgress(
          candidate.registrationId,
          COLLEGE_SLUG,
          { ...values, ...tableValues },
          updatedFiles,
          currentStep
        );
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert(`File upload failed: ${err.message || 'Please ensure the backend server is running'}`);
    } finally {
      setUploadingField(null);
      setUploadProgress(0);
    }
  };

  // Step Validation Logic
  const validateCurrentStep = (sec) => {
    if (!sec || !sec.fields) return {};
    const errs = {};

    for (const field of sec.fields) {
      if (field.type === 'heading') continue;

      // Check showIf
      if (field.showIf) {
        const { fieldId, equals } = field.showIf;
        if (values[fieldId] !== equals) continue;
      }

      const val = values[field.id];

      // Required checks
      if (field.required) {
        if (field.type === 'file') {
          if (!fileMeta[field.id] || !fileMeta[field.id].url) {
            errs[field.id] = `${field.label} is required`;
          }
        } else if (field.type === 'table') {
          const rows = tableValues[field.id] || [];
          const hasAny = rows.some(r => Object.values(r || {}).some(x => String(x || '').trim()));
          if (!hasAny) {
            errs[field.id] = `Please fill in at least one row of "${field.label}"`;
          }
          // Special rule for Step 5 Education Table
          if (field.id === 'educationDetails') {
            const matricRow = rows[0] || {};
            const matricFilled = Object.values(matricRow).some(x => String(x || '').trim());
            if (!matricFilled) {
              errs[field.id] = 'Matriculation row is mandatory — please fill in the educational details for row: Matriculation';
            }
          }
        } else if (field.type === 'checkbox') {
          if (val !== 'true' && val !== true) {
            errs[field.id] = `Please confirm "${field.label}"`;
          }
        } else {
          if (!val || !String(val).trim()) {
            errs[field.id] = `${field.label} is required`;
          }
        }
      }

      // Pattern / Matching checks
      if (field.pattern && val && !errs[field.id]) {
        try {
          const re = new RegExp(field.pattern);
          if (!re.test(val.trim())) {
            errs[field.id] = field.patternError || `Invalid format for ${field.label}`;
          }
        } catch {}
      }

      if (field.id === 'confirmEmail' && values.email && values.confirmEmail) {
        if (values.email.trim().toLowerCase() !== values.confirmEmail.trim().toLowerCase()) {
          errs.confirmEmail = 'Email IDs do not match.';
        }
      }
    }

    return errs;
  };

  // Next Step / Save & Next
  const handleSaveAndNext = async () => {
    const stepNum = Number(currentStep);

    // Step 1 is instructions, bypass validation completely so it never blocks
    if (stepNum > 1) {
      const currentSection = sections[stepNum - 1];
      const stepErrs = validateCurrentStep(currentSection);

      if (Object.keys(stepErrs).length > 0) {
        setErrors(stepErrs);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    setErrors({});
    setIsSaving(true);

    const mergedPayload = { ...values };
    for (const [k, rows] of Object.entries(tableValues)) {
      mergedPayload[k] = rows;
    }

    const nextStep = Math.min(stepNum + 1, sections.length);

    try {
      if (candidate?.registrationId) {
        await candidateApi.candidateSaveProgress(
          candidate.registrationId,
          COLLEGE_SLUG,
          mergedPayload,
          fileMeta,
          nextStep
        );

        // Update local session
        const updatedCand = {
          ...candidate,
          fatherName: values.fatherName || candidate.fatherName || '',
          formData: mergedPayload,
          fileData: fileMeta,
          currentStep: nextStep
        };
        safeSaveSession('candidate_session', updatedCand);
        setCandidate(updatedCand);
      }
    } catch (e) {
      console.warn('Failed to auto-save to backend:', e);
    } finally {
      setIsSaving(false);
    }

    if (stepNum < sections.length) {
      setCurrentStep(nextStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // On Step 16, smooth scroll down to the Review section at the bottom
      const revEl = document.getElementById('step16-review-section');
      if (revEl) {
        revEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Back button
  const handleBack = () => {
    setErrors({});
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Jump to specific step
  const handleJumpToStep = (stepNum) => {
    setErrors({});
    const target = Math.min(Math.max(Number(stepNum), 1), sections.length);
    setCurrentStep(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save for Later handler
  const handleSaveForLater = async () => {
    setIsSaving(true);
    const mergedPayload = { ...values };
    for (const [k, rows] of Object.entries(tableValues)) {
      mergedPayload[k] = rows;
    }
    try {
      if (candidate?.registrationId) {
        await candidateApi.candidateSaveProgress(
          candidate.registrationId,
          COLLEGE_SLUG,
          mergedPayload,
          fileMeta,
          currentStep
        );
        const updatedCand = {
          ...candidate,
          fatherName: values.fatherName || candidate.fatherName || '',
          formData: mergedPayload,
          fileData: fileMeta,
          currentStep
        };
        safeSaveSession('candidate_session', updatedCand);
        setCandidate(updatedCand);
      }
      alert('Your application progress has been saved successfully! You can resume anytime using your registration credentials.');
    } catch (e) {
      console.warn('Save for later error:', e);
      alert('Application saved locally in your browser session.');
    } finally {
      setIsSaving(false);
    }
  };

  // Validate all mandatory fields across the entire form
  const validateAllMandatoryFields = () => {
    const missing = [];

    // Step 2
    if (!values.postAppliedFor?.trim()) missing.push({ step: 2, label: 'Post Applied For' });
    if (!fileMeta.photo?.url) missing.push({ step: 2, label: 'Candidate Photograph (Photo)' });
    if (!values.name?.trim()) missing.push({ step: 2, label: 'Candidate Name' });
    if (!values.fatherName?.trim()) missing.push({ step: 2, label: "Father's Name" });
    if (!values.motherName?.trim()) missing.push({ step: 2, label: "Mother's Name" });
    if (!values.dob?.trim()) missing.push({ step: 2, label: 'Date of Birth' });
    if (!values.presentStreet?.trim()) missing.push({ step: 2, label: 'Present Street Address' });
    if (!values.presentCity?.trim()) missing.push({ step: 2, label: 'Present City' });
    if (!values.presentState?.trim()) missing.push({ step: 2, label: 'Present State' });
    if (!values.presentPostalCode?.trim()) missing.push({ step: 2, label: 'Present Postal Code' });
    if (!values.aadhaarNo?.trim()) missing.push({ step: 2, label: 'Aadhaar Number' });
    if (values.socialCategory && values.socialCategory !== 'General' && !fileMeta.categoryCertificate?.url) {
      missing.push({ step: 2, label: 'Social Category Certificate' });
    }

    // Step 3
    if (!values.ref1FirstName?.trim() || !values.ref1Phone?.trim()) {
      missing.push({ step: 3, label: 'Referee 1 (Name & Phone)' });
    }
    if (!values.ref2FirstName?.trim() || !values.ref2Phone?.trim()) {
      missing.push({ step: 3, label: 'Referee 2 (Name & Phone)' });
    }

    // Step 4 (Educational Qualifications)
    const eduRows = tableValues.educationDetails || [];
    const matricRow = eduRows[0] || {};
    if (!matricRow.yearOfPassing && !matricRow.percentage && !matricRow.marksObtained && !matricRow.university) {
      missing.push({ step: 4, label: 'Matriculation Educational Details' });
    }
    if (!values.phdTopic?.trim()) missing.push({ step: 4, label: 'Ph.D. Topic' });
    if (!values.fieldOfSpecialization?.trim()) missing.push({ step: 4, label: 'Field of Specialization' });

    // Step 6 (Education Documents)
    if (!fileMeta.docMatric?.url) missing.push({ step: 6, label: 'Matriculation Certificate/Marksheet PDF' });
    if (!fileMeta.docInter?.url) missing.push({ step: 6, label: '10+2 / Prep Certificate/Marksheet PDF' });
    if (!fileMeta.docGrad?.url) missing.push({ step: 6, label: 'Graduation Certificate/Marksheet PDF' });

    // Step 7 (Employment Status, NOC & Other Service Details)
    if (!values.isPresEmployed) missing.push({ step: 7, label: 'Presently Employed (Yes/No)' });

    // Step 8 (Criteria for Selection)
    if (values.criteriaAccepted !== 'true' && values.criteriaAccepted !== true) {
      missing.push({ step: 8, label: 'Accept Criteria for Selection' });
    }

    // Step 14 (Payment)
    if (!values.paymentAmount?.trim()) missing.push({ step: 14, label: 'Payment Amount' });
    if (!values.utrNo?.trim()) missing.push({ step: 14, label: '12-Digit UTR / Transaction No.' });
    if (!fileMeta.filePaymentScreenshot?.url) missing.push({ step: 14, label: 'Payment Screenshot Upload' });

    // Step 15 (Declaration)
    if (values.finalVerification !== 'true' && values.finalVerification !== true) {
      missing.push({ step: 15, label: 'Final Verification Checkbox' });
    }
    if (!values.place?.trim()) missing.push({ step: 15, label: 'Declaration Place' });
    if (!values.date?.trim()) missing.push({ step: 15, label: 'Declaration Date' });
    if (!fileMeta.signature?.url) missing.push({ step: 15, label: 'Candidate Signature Upload' });

    return missing;
  };

  // Final Submission
  const handleFinalSubmit = async () => {
    // 1. Mandatory Fields Guard
    const missing = validateAllMandatoryFields();
    if (missing.length > 0) {
      setMissingFields(missing);
      setSubmitError(
        `Cannot submit application yet. There are ${missing.length} incomplete mandatory field(s). Please review and complete them before final submission.`
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setMissingFields([]);

    setIsSubmitting(true);
    setSubmitError(null);

    const mergedPayload = { ...values };
    for (const [k, rows] of Object.entries(tableValues)) {
      mergedPayload[k] = rows;
    }

    try {
      const res = await candidateApi.submitApplication(COLLEGE_SLUG, {
        registrationId: candidate?.registrationId,
        formData: mergedPayload,
        fileData: fileMeta
      });

      const appNo = res.applicationNo || 'AIJHM-APP-' + (candidate?.registrationNo || Date.now());

      if (candidate?.registrationId) {
        await candidateApi.candidateMarkSubmitted(candidate.registrationId, appNo);
      }

      const updatedCand = {
        ...candidate,
        submitted: true,
        applicationNo: appNo,
        pdfUrl: res.pdfUrl || ''
      };
      safeSaveSession('candidate_session', updatedCand);
      setCandidate(updatedCand);
      setSubmittedInfo({ applicationNo: appNo, pdfUrl: res.pdfUrl || '' });
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(err.message || 'Failed to submit application to server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('candidate_session');
    navigate('/login');
  };

  // SUBMITTED STATE VIEW
  if (submittedInfo) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4">
        <Header
          collegeName={config.name || "ALL INDIA JAT HEROES’ MEMORIAL COLLEGE"}
          tagline={config.tagline || "Rohtak, Haryana"}
          logoUrl={config.logo_url}
          candidate={candidate}
          onLogout={handleLogout}
        />
        <div className="max-w-4xl mx-auto text-center no-print my-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-200">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
              Application Submitted Successfully!
            </h2>
            <div className="bg-emerald-50 text-emerald-900 px-5 py-2 rounded-xl border border-emerald-200 font-mono font-bold text-lg inline-block my-3">
              APPLICATION NO: {submittedInfo.applicationNo}
            </div>
            <p className="text-slate-600 text-xs md:text-sm mb-5 leading-relaxed max-w-xl mx-auto">
              Thank you, <strong>{candidate?.candidateName || 'Applicant'}</strong>. Your recruitment application has been successfully saved in the database.
              A confirmation email has also been sent to your registered email and the recruitment committee.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl shadow transition text-sm cursor-pointer"
              >
                🖨️ Print Application Form
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow transition text-sm cursor-pointer"
              >
                📄 Download / Save PDF
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Printable Form */}
        <PrintableApplication
          applicationNo={submittedInfo.applicationNo}
          candidate={candidate}
          values={values}
          tableValues={tableValues}
          fileMeta={fileMeta}
        />
      </div>
    );
  }

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Instructions
            config={config}
            instructions={config.instructions}
            onProceed={handleSaveAndNext}
          />
        );
      case 2:
        return (
          <Step2Personal
            values={values}
            errors={errors}
            fileMeta={fileMeta}
            uploadingField={uploadingField}
            uploadProgress={uploadProgress}
            onValueChange={handleValueChange}
            onFileChange={handleFileChange}
            onFileRemove={handleFileRemove}
          />
        );
      case 3:
        return (
          <Step3References
            values={values}
            errors={errors}
            onValueChange={handleValueChange}
          />
        );
      case 4:
        return (
          <Step5EducationQualifications
            values={values}
            errors={errors}
            tableValues={tableValues}
            onValueChange={handleValueChange}
            onTableCellChange={handleTableCellChange}
            onAddTableRow={handleAddTableRow}
            onRemoveTableRow={handleRemoveTableRow}
          />
        );
      case 5:
        return (
          <Step6Employment
            tableValues={tableValues}
            fileMeta={fileMeta}
            uploadingField={uploadingField}
            uploadProgress={uploadProgress}
            errors={errors}
            onTableCellChange={handleTableCellChange}
            onAddTableRow={handleAddTableRow}
            onRemoveTableRow={handleRemoveTableRow}
            onFileChange={handleFileChange}
          />
        );
      case 6:
        return (
          <Step7EducationDocuments
            values={values}
            fileMeta={fileMeta}
            uploadingField={uploadingField}
            uploadProgress={uploadProgress}
            errors={errors}
            onValueChange={handleValueChange}
            onFileChange={handleFileChange}
            onFileRemove={handleFileRemove}
          />
        );
      case 7:
        return (
          <Step9EmploymentNoc
            values={values}
            errors={errors}
            fileMeta={fileMeta}
            uploadingField={uploadingField}
            uploadProgress={uploadProgress}
            onValueChange={handleValueChange}
            onFileChange={handleFileChange}
            onOpenNocDraft={() => setShowNocModal(true)}
          />
        );
      case 8:
        return (
          <Step10CriteriaInfo
            values={values}
            errors={errors}
            onValueChange={handleValueChange}
          />
        );
      case 9:
        return (
          <Step11AcademicRecord
            values={values}
            errors={errors}
            onValueChange={handleValueChange}
          />
        );
      case 10:
        return (
          <Step12TeachingAdminScore
            values={values}
            errors={errors}
            onValueChange={handleValueChange}
          />
        );
      case 11:
        return (
          <Step13ResponsibilitiesCommittees
            tableValues={tableValues}
            fileMeta={fileMeta}
            uploadingField={uploadingField}
            uploadProgress={uploadProgress}
            errors={errors}
            onTableCellChange={handleTableCellChange}
            onFileChange={handleFileChange}
          />
        );
      case 12:
        return (
          <Step14ResearchScore
            values={values}
            errors={errors}
            onValueChange={handleValueChange}
          />
        );
      case 13:
        return (
          <Step15Annexures
            values={values}
            errors={errors}
            fileMeta={fileMeta}
            uploadingField={uploadingField}
            uploadProgress={uploadProgress}
            onValueChange={handleValueChange}
            onFileChange={handleFileChange}
          />
        );
      case 14:
        return (
          <Step16Payment
            values={values}
            errors={errors}
            fileMeta={fileMeta}
            uploadingField={uploadingField}
            uploadProgress={uploadProgress}
            config={config}
            onValueChange={handleValueChange}
            onFileChange={handleFileChange}
            onFileRemove={handleFileRemove}
          />
        );
      case 15:
        return (
          <div className="space-y-8">
            <Step17Declaration
              values={values}
              errors={errors}
              fileMeta={fileMeta}
              uploadingField={uploadingField}
              uploadProgress={uploadProgress}
              onValueChange={handleValueChange}
              onFileChange={handleFileChange}
              onFileRemove={handleFileRemove}
            />

            {/* Review Section on final Step at the Bottom */}
            <div className="mt-12 pt-8 border-t-2 border-slate-200" id="step16-review-section">
              <ReviewModal
                sections={sections}
                values={values}
                tableValues={tableValues}
                fileMeta={fileMeta}
                missingFields={missingFields}
                onEditSection={handleJumpToStep}
                onSubmit={handleFinalSubmit}
                onSaveForLater={handleSaveForLater}
                onBack={handleBack}
                submitting={isSubmitting}
                submitError={submitError}
                isEmbedded={true}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isLastStep = currentStep === sections.length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Header */}
      <Header
        collegeName={config.name || "ALL INDIA JAT HEROES’ MEMORIAL COLLEGE"}
        tagline={config.tagline || "Rohtak, Haryana"}
        logoUrl={config.logo_url}
        currentStep={currentStep}
        totalSteps={sections.length}
        isReview={currentStep === sections.length}
        candidate={candidate}
        onLogout={handleLogout}
      />

      {/* Step Numbers 1 to 16 Navigation Bar */}
      <StepProgress
        sections={sections}
        currentStep={currentStep}
        onStepClick={handleJumpToStep}
      />

      {/* Main Form Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-10">
            {renderStepComponent()}

            {/* Bottom Actions Bar: Back, Save & Next (Steps 1 to 15 only; Step 16 has Review actions below) */}
            {currentStep < sections.length && (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 border border-slate-300 hover:bg-slate-100 text-slate-700 px-6 py-2.5 rounded-xl font-semibold text-sm transition"
                  >
                    ‹ Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleSaveAndNext}
                  disabled={isSaving}
                  className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-blue-200 transition"
                >
                  {isSaving ? "Saving..." : currentStep === sections.length - 1 ? "Proceed to Declaration & Review ›" : "Save & Next ›"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Notes & Links */}
        <div className="mt-8 text-center text-xs text-slate-400 space-x-4">
          <a
            href={config.admin_sheet_url || "#"}
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-600 transition"
          >
            Admin Database Access
          </a>
          <span>•</span>
          <span>Recruitment Portal v2.0</span>
        </div>
      </main>

      {/* Printable Form (Mounted for Window Print & PDF Export) */}
      <div className="print-only">
        <PrintableApplication
          applicationNo={candidate?.applicationNo || 'DRAFT-PREVIEW'}
          candidate={candidate}
          values={values}
          tableValues={tableValues}
          fileMeta={fileMeta}
        />
      </div>

      {/* Pre-filled NOC Certificate Generator Modal */}
      <NocDraftModal
        isOpen={showNocModal}
        onClose={() => setShowNocModal(false)}
        candidateName={values.name}
        fatherName={values.fatherName}
        currentCollege={values.nocCurrentCollege}
        department={values.nocDepartment}
        designation={values.nocDesignation}
        collegeName={config.name}
      />
    </div>
  );
}
