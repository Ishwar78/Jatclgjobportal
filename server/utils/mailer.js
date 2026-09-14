const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: parseInt(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.warn('⚠️ SMTP Transporter configuration warning:', error.message);
  } else {
    console.log('✅ SMTP Mailer is ready to send emails');
  }
});

/**
 * Send registration confirmation email to candidate
 */
async function sendRegistrationEmail({ to, name, fatherName, registrationId, email, mobile }) {
  const mailOptions = {
    from: `"AIJHM Recruitment Portal" <${process.env.SMTP_USER}>`,
    to: to || email,
    subject: `Registration Successful - AIJHM Recruitment Portal [Reg No: ${registrationId}]`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #1e3a8a; margin: 0; font-size: 20px;">ALL INDIA JAT HEROES’ MEMORIAL COLLEGE</h2>
          <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Rohtak, Haryana (Affiliated to M.D. University, Rohtak)</p>
        </div>
        
        <h3 style="color: #0f172a; margin-top: 0;">Dear ${name || 'Candidate'},</h3>
        <p style="color: #334155; line-height: 1.6;">
          Your registration on the AIJHM College Faculty Recruitment Portal has been completed successfully.
          Please find your registration credentials and details below:
        </p>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #64748b; width: 45%;"><strong>Registration Number:</strong></td>
              <td style="padding: 6px 0; color: #1e3a8a; font-weight: bold; font-size: 16px;">${registrationId}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;"><strong>Candidate Name:</strong></td>
              <td style="padding: 6px 0; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;"><strong>Father's Name:</strong></td>
              <td style="padding: 6px 0; color: #0f172a;">${fatherName || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;"><strong>Email Address:</strong></td>
              <td style="padding: 6px 0; color: #0f172a;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;"><strong>Mobile Number:</strong></td>
              <td style="padding: 6px 0; color: #0f172a;">${mobile}</td>
            </tr>
          </table>
        </div>

        <p style="color: #334155; line-height: 1.6;">
          You can now login using your registered Email ID / Mobile Number and the password you created to fill out the recruitment application form.
        </p>

        <div style="margin: 25px 0; text-align: center;">
          <a href="http://localhost:5173/login" style="background-color: #1e3a8a; color: #ffffff; padding: 10px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Login to Application Portal
          </a>
        </div>

        <p style="color: #64748b; font-size: 12px; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
          This is an automated notification from the Recruitment Portal of All India Jat Heroes’ Memorial College, Rohtak. Please do not reply directly to this email.
        </p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
}

/**
 * Send application submission confirmation to candidate and committee emails
 */
async function sendApplicationSubmissionEmail({ application, recipients }) {
  const defaultCommittees = [
    'sharmaishwar970@gmail.com',
    'a60196141@gmail.com',
    'shar54ma2334@gmail.com'
  ];

  // Merge unique recipients including candidate email
  const allRecipients = Array.from(new Set([
    ...(recipients || defaultCommittees),
    ...(application.email ? [application.email] : [])
  ]));

  const fd = application.formData || {};
  const files = application.fileData || {};

  const attachments = [];

  // Helper to resolve file link or embed attachment
  const resolveFileLink = (fileObj, cidName = null) => {
    if (!fileObj || !fileObj.url) return '<span style="color: #94a3b8; font-style: italic;">Not uploaded / N/A</span>';
    const rawUrl = fileObj.url;

    if (cidName && (rawUrl.startsWith('/uploads/') || rawUrl.startsWith('uploads/'))) {
      const cleanRel = rawUrl.startsWith('/') ? rawUrl.slice(1) : rawUrl;
      const diskPath = path.join(__dirname, '..', cleanRel);
      if (fs.existsSync(diskPath)) {
        attachments.push({
          filename: fileObj.originalName || `${cidName}.jpg`,
          path: diskPath,
          cid: cidName
        });
        return `cid:${cidName}`;
      }
    }

    if (rawUrl.startsWith('/uploads/') || rawUrl.startsWith('uploads/')) {
      const fullUrl = `https://jatclgjobportal.onrender.com${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`;
      return `<a href="${fullUrl}" target="_blank" style="color: #2563eb; font-weight: 600;">[Download ${fileObj.originalName || 'File'}]</a>`;
    }
    if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
      return `<a href="${rawUrl}" target="_blank" style="color: #2563eb; font-weight: 600;">[View ${fileObj.originalName || 'Document'}]</a>`;
    }
    return `<span style="color: #059669; font-weight: 600;">✓ Uploaded (${fileObj.originalName || 'Document'})</span>`;
  };

  // Payment Screenshot Handling
  let paymentScreenshotHtml = '';
  if (files.filePaymentScreenshot?.url) {
    const cidPayment = resolveFileLink(files.filePaymentScreenshot, 'payment_screenshot_img');
    if (cidPayment.startsWith('cid:')) {
      paymentScreenshotHtml = `
        <div style="margin-top: 8px;">
          <p style="margin: 2px 0 6px 0; color: #065f46; font-weight: 600; font-size: 12px;">✓ Payment Receipt Screenshot Attached (${files.filePaymentScreenshot.originalName || 'Receipt.jpg'}):</p>
          <img src="${cidPayment}" alt="Payment Receipt" style="max-width: 260px; max-height: 180px; border: 1px solid #cbd5e1; border-radius: 6px;" />
        </div>
      `;
    } else {
      paymentScreenshotHtml = `<p style="margin: 4px 0;"><strong>Receipt Screenshot:</strong> ${cidPayment}</p>`;
    }
  }

  // Candidate Signature Handling
  let signatureHtml = '<span style="color: #dc2626; font-weight: 600;">Pending signature</span>';
  if (files.signature?.url) {
    const cidSig = resolveFileLink(files.signature, 'signature_img');
    if (cidSig.startsWith('cid:')) {
      signatureHtml = `<img src="${cidSig}" alt="Signature" style="max-width: 140px; max-height: 50px; object-fit: contain; border: 1px solid #cbd5e1; padding: 2px; background: #fff;" />`;
    } else {
      signatureHtml = files.signature.url.startsWith('http') 
        ? `<a href="${files.signature.url}" target="_blank" style="color: #2563eb; font-weight: 600;">[View Candidate Signature]</a>` 
        : '<span style="color: #059669; font-weight: bold;">✓ Digital Signature Attached</span>';
    }
  }

  // Candidate Photo Handling
  let photoHtml = '';
  if (files.photo?.url) {
    const cidPhoto = resolveFileLink(files.photo, 'photo_img');
    if (cidPhoto.startsWith('cid:')) {
      photoHtml = `<img src="${cidPhoto}" alt="Candidate Photo" style="width: 80px; height: 100px; object-fit: cover; border: 1px solid #cbd5e1; border-radius: 4px;" />`;
    } else if (files.photo.url.startsWith('http')) {
      photoHtml = `<a href="${files.photo.url}" target="_blank" style="color: #2563eb; font-size: 12px;">[View Photo]</a>`;
    }
  }

  // Education Rows Table
  const educationRows = Array.isArray(fd.educationDetails)
    ? fd.educationDetails
        .filter(r => r && (r.exam || r.university || r.percentage))
        .map((r, i) => `<tr>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1; font-weight: 600;">${r.exam || `Exam ${i+1}`}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.university || '-'}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.rollNo || '-'}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.yearOfPassing || '-'}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.marksObtained ? `${r.marksObtained} / ${r.marksMax || ''}` : '-'}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #1e3a8a;">${r.percentage ? `${r.percentage}%` : '-'}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.division || '-'}</td>
          </tr>`).join('')
    : '<tr><td colspan="7" style="padding: 6px; text-align: center; border: 1px solid #cbd5e1; color: #64748b;">No educational rows entered</td></tr>';

  // Employment Rows Table
  const employmentRows = Array.isArray(fd.employmentTable)
    ? fd.employmentTable
        .filter(r => r && (r.employer || r.designation))
        .map(r => `<tr>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1; font-weight: 600;">${r.employer || '-'}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.designation || '-'}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.durationFrom || '-'}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.durationTo || '-'}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1; font-weight: bold;">${r.teachingYears || '-'}</td>
          </tr>`).join('')
    : '<tr><td colspan="5" style="padding: 6px; text-align: center; border: 1px solid #cbd5e1; color: #64748b;">No employment history recorded</td></tr>';

  // Section 12: B(ii) and B(iii) Items
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

  const biiTotal = Array.isArray(fd.respBiiTable)
    ? fd.respBiiTable.reduce((sum, r) => sum + (parseFloat(r?.score) || 0), 0).toFixed(1)
    : '0.0';

  const biiiTotal = Array.isArray(fd.respBiiiTable)
    ? fd.respBiiiTable.reduce((sum, r) => sum + (parseFloat(r?.score) || 0), 0).toFixed(1)
    : '0.0';

  const acadM = parseFloat(fd.academicMasters || 0) || 0;
  const acadG = parseFloat(fd.academicGrad || 0) || 0;
  const acad12 = parseFloat(fd.academic12th || 0) || 0;
  const acadMat = parseFloat(fd.academicMatric || 0) || 0;
  const calcAcadTotal = (acadM + acadG + acad12 + acadMat).toFixed(2).replace(/\.00$/, '');
  const displayAcadTotal = (fd.academicTotal && fd.academicTotal !== '0')
    ? fd.academicTotal
    : (calcAcadTotal !== '0' ? calcAcadTotal : (fd.academicTotal || '0'));

  const exp15 = parseFloat(fd.teachingExpAbove15 || 0) || 0;
  const adminJd = parseFloat(fd.adminJointDirector || 0) || 0;
  const adminReg = parseFloat(fd.adminRegistrar || 0) || 0;
  const adminHead = parseFloat(fd.adminHead || 0) || 0;
  const adminCombined = Math.min(adminJd + adminReg + adminHead, 25);
  const calcTeachTotal = (exp15 + adminCombined).toFixed(2).replace(/\.00$/, '');
  const displayTeachTotal = (fd.teachingTotalScore && fd.teachingTotalScore !== '0')
    ? fd.teachingTotalScore
    : (calcTeachTotal !== '0' ? calcTeachTotal : (fd.teachingTotalScore || '0'));

  const biiRowsHtml = BII_ITEMS.map((item, idx) => {
    const row = (Array.isArray(fd.respBiiTable) ? fd.respBiiTable[idx] : null) || {};
    return `<tr>
      <td style="padding: 5px 6px; border: 1px solid #cbd5e1; text-align: center;">${idx + 1}</td>
      <td style="padding: 5px 6px; border: 1px solid #cbd5e1;">${item.label}</td>
      <td style="padding: 5px 6px; border: 1px solid #cbd5e1; font-size: 11px; color: #475569;">${item.marks}</td>
      <td style="padding: 5px 6px; border: 1px solid #cbd5e1; text-align: center;">${row.session || '-'}</td>
      <td style="padding: 5px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">${row.score || '0.0'}</td>
    </tr>`;
  }).join('');

  const biiiRowsHtml = BIII_ITEMS.map((item, idx) => {
    const row = (Array.isArray(fd.respBiiiTable) ? fd.respBiiiTable[idx] : null) || {};
    return `<tr>
      <td style="padding: 5px 6px; border: 1px solid #cbd5e1; text-align: center;">${idx + 1}</td>
      <td style="padding: 5px 6px; border: 1px solid #cbd5e1;">${item.label}</td>
      <td style="padding: 5px 6px; border: 1px solid #cbd5e1; font-size: 11px; color: #475569;">${item.marks}</td>
      <td style="padding: 5px 6px; border: 1px solid #cbd5e1; text-align: center;">${row.session || '-'}</td>
      <td style="padding: 5px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">${row.score || '0.0'}</td>
    </tr>`;
  }).join('');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 8px; background-color: #ffffff; color: #0f172a;">
      {/* College Header */}
      <div style="text-align: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #1e3a8a; margin: 0; font-size: 20px; text-transform: uppercase;">ALL INDIA JAT HEROES’ MEMORIAL COLLEGE</h2>
        <p style="color: #475569; font-size: 13px; margin: 4px 0 0;">Rohtak, Haryana (Affiliated to M.D. University, Rohtak)</p>
        <p style="margin: 6px 0 0; font-weight: bold; color: #1e3a8a; font-size: 14px;">
          APPLICATION FORM FOR APPOINTMENT TO THE POST OF ${(application.postAppliedFor || fd.postAppliedFor || 'Principal').toUpperCase()}
        </p>
      </div>

      {/* Submission Status Bar */}
      <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="color: #065f46; font-weight: bold; font-size: 16px;">Application No: ${application.applicationNo}</span>
          <br/>
          <span style="color: #047857; font-size: 13px;">Registration ID: <strong>${application.registrationId || fd.registrationId || 'N/A'}</strong> | Submitted: ${new Date(application.createdAt || Date.now()).toLocaleString('en-IN')}</span>
        </div>
        <span style="background-color: #059669; color: #ffffff; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: bold;">SUBMITTED</span>
      </div>

      {/* ================= 1. INSTRUCTIONS & GENERAL GUIDELINES ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        1. Instructions & General Guidelines
      </h3>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 14px; font-size: 12px; line-height: 1.5; color: #334155;">
        <p style="margin: 0 0 4px 0;">✓ Hard copy of application must be submitted by the closing date of the portal.</p>
        <p style="margin: 0 0 4px 0;">✓ Originals of all certificates/testimonials must be presented during the interview.</p>
        <p style="margin: 0 0 4px 0;">✓ Application must be forwarded through employer, with copies sent to Dean of Colleges, MDU Rohtak & DGHE Panchkula.</p>
        <p style="margin: 4px 0 0 0; color: #15803d; font-weight: bold;">
          ✓ Confirmation: Candidate has read, understood and agreed to all 4 instructions and conditions.
        </p>
      </div>

      {/* ================= 2. PERSONAL INFORMATION ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        2. Personal Information
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 12.5px; margin-bottom: 15px;">
        <tr>
          <td style="padding: 5px; width: 25%; color: #64748b;"><strong>Post Applied For:</strong></td>
          <td style="padding: 5px; width: 25%; font-weight: bold; color: #1e3a8a;">${application.postAppliedFor || fd.postAppliedFor || 'Principal'}</td>
          <td style="padding: 5px; width: 25%; color: #64748b;"><strong>Candidate Name:</strong></td>
          <td style="padding: 5px; width: 25%; font-weight: bold;">${application.candidateName}</td>
        </tr>
        <tr>
          <td style="padding: 5px; color: #64748b;"><strong>Father's Name:</strong></td>
          <td style="padding: 5px;">${application.fatherName || fd.fatherName || 'N/A'}</td>
          <td style="padding: 5px; color: #64748b;"><strong>Mother's Name:</strong></td>
          <td style="padding: 5px;">${fd.motherName || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 5px; color: #64748b;"><strong>Date of Birth:</strong></td>
          <td style="padding: 5px;">${fd.dob || 'N/A'}</td>
          <td style="padding: 5px; color: #64748b;"><strong>Social Category:</strong></td>
          <td style="padding: 5px;">
            ${fd.socialCategory || 'General'}
            ${files.categoryCertificate?.url ? ` (${resolveFileLink(files.categoryCertificate)})` : ''}
          </td>
        </tr>
        <tr>
          <td style="padding: 5px; color: #64748b;"><strong>Nationality:</strong></td>
          <td style="padding: 5px;">${fd.nationality || 'Indian'}</td>
          <td style="padding: 5px; color: #64748b;"><strong>Marital Status:</strong></td>
          <td style="padding: 5px;">${fd.maritalStatus || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 5px; color: #64748b;"><strong>Mobile:</strong></td>
          <td style="padding: 5px;">${application.mobile}</td>
          <td style="padding: 5px; color: #64748b;"><strong>WhatsApp No:</strong></td>
          <td style="padding: 5px;">${fd.whatsappNo || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 5px; color: #64748b;"><strong>Email Address:</strong></td>
          <td style="padding: 5px;">${application.email}</td>
          <td style="padding: 5px; color: #64748b;"><strong>Aadhaar No:</strong></td>
          <td style="padding: 5px;">${fd.aadhaarNo || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 5px; color: #64748b;"><strong>Family ID / PPP:</strong></td>
          <td style="padding: 5px;">${fd.familyId || 'N/A'}</td>
          <td style="padding: 5px; color: #64748b;"><strong>Candidate Photo:</strong></td>
          <td style="padding: 5px;">${photoHtml || resolveFileLink(files.photo)}</td>
        </tr>
        <tr>
          <td style="padding: 5px; color: #64748b;"><strong>Present Address:</strong></td>
          <td colspan="3" style="padding: 5px;">
            ${[fd.presentStreet, fd.presentCity, fd.presentState, fd.presentPostalCode, fd.presentCountry].filter(Boolean).join(', ') || 'N/A'}
          </td>
        </tr>
      </table>

      {/* ================= 3. REFERENCES ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        3. References
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 12.5px; margin-bottom: 15px;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding: 6px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px;">
            <p style="margin: 0 0 4px; font-weight: bold; color: #1e3a8a;">Referee 1:</p>
            <p style="margin: 2px 0;"><strong>Name:</strong> ${fd.ref1FirstName || ''} ${fd.ref1LastName || ''}</p>
            <p style="margin: 2px 0;"><strong>Position:</strong> ${fd.ref1Occupation || 'N/A'}</p>
            <p style="margin: 2px 0;"><strong>Address:</strong> ${fd.ref1Address || 'N/A'}</p>
            <p style="margin: 2px 0;"><strong>Contact:</strong> ${fd.ref1Phone || '-'} | ${fd.ref1Email || '-'}</p>
          </td>
          <td style="width: 50%; vertical-align: top; padding: 6px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px;">
            <p style="margin: 0 0 4px; font-weight: bold; color: #1e3a8a;">Referee 2:</p>
            <p style="margin: 2px 0;"><strong>Name:</strong> ${fd.ref2FirstName || ''} ${fd.ref2LastName || ''}</p>
            <p style="margin: 2px 0;"><strong>Position:</strong> ${fd.ref2Occupation || 'N/A'}</p>
            <p style="margin: 2px 0;"><strong>Address:</strong> ${fd.ref2Address || 'N/A'}</p>
            <p style="margin: 2px 0;"><strong>Contact:</strong> ${fd.ref2Phone || '-'} | ${fd.ref2Email || '-'}</p>
          </td>
        </tr>
      </table>

      {/* ================= 4. COURT DECLARATIONS ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        4. Declarations Regarding Court Cases / Disqualification
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 15px;">
        <tr>
          <td style="padding: 6px; border: 1px solid #e2e8f0;">Ever prosecuted, detained, fined, convicted, or debarred?</td>
          <td style="padding: 6px; border: 1px solid #e2e8f0; font-weight: bold; color: ${fd.courtCase1 === 'Yes' ? '#dc2626' : '#15803d'}; width: 20%;">${fd.courtCase1 || 'No'}</td>
        </tr>
        ${fd.courtCase1 === 'Yes' && fd.courtCase1Details ? `<tr><td colspan="2" style="padding: 6px; background: #fff1f2; color: #991b1b; border: 1px solid #fecdd3;">Details: ${fd.courtCase1Details}</td></tr>` : ''}
        <tr>
          <td style="padding: 6px; border: 1px solid #e2e8f0;">Any case pending in any court of law?</td>
          <td style="padding: 6px; border: 1px solid #e2e8f0; font-weight: bold; color: ${fd.courtCase2 === 'Yes' ? '#dc2626' : '#15803d'};">${fd.courtCase2 || 'No'}</td>
        </tr>
        ${fd.courtCase2 === 'Yes' && fd.courtCase2Details ? `<tr><td colspan="2" style="padding: 6px; background: #fff1f2; color: #991b1b; border: 1px solid #fecdd3;">Details: ${fd.courtCase2Details}</td></tr>` : ''}
      </table>

      {/* ================= 5. EDUCATIONAL QUALIFICATIONS ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        5. Educational Qualifications
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 8px;">
        <thead>
          <tr style="background-color: #f1f5f9; color: #334155;">
            <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Exam</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Board/Univ</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Roll No</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Year</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Marks</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">%</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Div</th>
          </tr>
        </thead>
        <tbody>
          ${educationRows}
        </tbody>
      </table>
      <div style="font-size: 12px; margin-bottom: 15px; color: #334155;">
        ${fd.mphilTopic ? `<p style="margin: 2px 0;"><strong>M.Phil Dissertation:</strong> ${fd.mphilTopic}</p>` : ''}
        <p style="margin: 2px 0;"><strong>Ph.D. Topic:</strong> ${fd.phdTopic || '-'}</p>
        <p style="margin: 2px 0;"><strong>Specialization:</strong> ${fd.fieldOfSpecialization || '-'}</p>
      </div>

      {/* ================= 6. EMPLOYMENT & EXPERIENCE ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        6. Employment History & Experience
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 8px;">
        <thead>
          <tr style="background-color: #f1f5f9; color: #334155;">
            <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Employer</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Designation</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">From</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">To</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Teaching Exp (Yrs)</th>
          </tr>
        </thead>
        <tbody>
          ${employmentRows}
        </tbody>
      </table>
      <p style="font-size: 12px; color: #334155; margin: 4px 0 15px 0;">
        <strong>Experience Certificates:</strong> ${resolveFileLink(files.fileExperienceCerts)}
      </p>

      {/* ================= 7. UPLOADED EDUCATIONAL DOCUMENTS ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        7. Uploaded Educational Documents
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 15px;">
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px; border: 1px solid #e2e8f0; width: 35%;"><strong>Matriculation:</strong></td>
          <td style="padding: 5px; border: 1px solid #e2e8f0;">${resolveFileLink(files.docMatric)}</td>
          <td style="padding: 5px; border: 1px solid #e2e8f0; width: 35%;"><strong>10+2 / Inter:</strong></td>
          <td style="padding: 5px; border: 1px solid #e2e8f0;">${resolveFileLink(files.docInter)}</td>
        </tr>
        <tr>
          <td style="padding: 5px; border: 1px solid #e2e8f0;"><strong>Graduation:</strong></td>
          <td style="padding: 5px; border: 1px solid #e2e8f0;">${resolveFileLink(files.docGrad)}</td>
          <td style="padding: 5px; border: 1px solid #e2e8f0;"><strong>Post Graduation:</strong></td>
          <td style="padding: 5px; border: 1px solid #e2e8f0;">${resolveFileLink(files.docPG)}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px; border: 1px solid #e2e8f0;"><strong>B.Ed. / M.Ed.:</strong></td>
          <td style="padding: 5px; border: 1px solid #e2e8f0;">${resolveFileLink(files.docBEd)} / ${resolveFileLink(files.docMEd)}</td>
          <td style="padding: 5px; border: 1px solid #e2e8f0;"><strong>M.Phil / Ph.D.:</strong></td>
          <td style="padding: 5px; border: 1px solid #e2e8f0;">${resolveFileLink(files.docMPhil)} / ${resolveFileLink(files.docPhd)}</td>
        </tr>
        <tr>
          <td style="padding: 5px; border: 1px solid #e2e8f0;"><strong>NET / SLET:</strong></td>
          <td style="padding: 5px; border: 1px solid #e2e8f0;">${resolveFileLink(files.docNetSlet)}</td>
          <td style="padding: 5px; border: 1px solid #e2e8f0;"><strong>Other Certificate:</strong></td>
          <td style="padding: 5px; border: 1px solid #e2e8f0;">${resolveFileLink(files.docAnyOther)}</td>
        </tr>
      </table>

      {/* ================= 8. EMPLOYMENT STATUS, NOC & OTHER SERVICE DETAILS ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        8. Employment Status, NOC & Other Service Details
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 12.5px; margin-bottom: 15px;">
        <tr>
          <td style="padding: 5px; width: 30%; color: #64748b;"><strong>Presently Employed:</strong></td>
          <td style="padding: 5px; width: 70%; font-weight: bold;">${fd.isPresEmployed || 'No'}</td>
        </tr>
        ${fd.isPresEmployed === 'Yes' ? `
          <tr>
            <td style="padding: 5px; color: #64748b;"><strong>Current Employer / College:</strong></td>
            <td style="padding: 5px;">${fd.nocCurrentCollege || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 5px; color: #64748b;"><strong>Department / Designation:</strong></td>
            <td style="padding: 5px;">${fd.nocDepartment || '-'} • ${fd.nocDesignation || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 5px; color: #64748b;"><strong>Employer NOC Certificate:</strong></td>
            <td style="padding: 5px;">${resolveFileLink(files.fileNOC)}</td>
          </tr>
        ` : ''}
        <tr>
          <td style="padding: 5px; color: #64748b;"><strong>Basic Pay Acceptable:</strong></td>
          <td style="padding: 5px; font-weight: bold;">${fd.basicPayAcceptable || 'As per norms'}</td>
        </tr>
        <tr>
          <td style="padding: 5px; color: #64748b;"><strong>Joining Period Required:</strong></td>
          <td style="padding: 5px; font-weight: bold;">${fd.joiningPeriod || 'Immediately'}</td>
        </tr>
      </table>

      {/* ================= 9. CRITERIA FOR SELECTION OF PRINCIPAL ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 6px; margin-top: 24px; font-size: 14px; text-transform: uppercase;">
        9. Criteria for Selection of Principal in Govt. Aided Private Colleges in Haryana
      </h3>

      {/* Revised criteria line (without box) */}
      <p style="font-size: 11.5px; font-weight: bold; color: #1e293b; line-height: 1.5; margin: 10px 0 6px 0;">
        Revised criteria for the recruitment of Assistant Professor and Principals in Govt. Aided Private Colleges in State of Haryana with reference to: Memo No. KW 8/36-2009 C-IV(3) dated 18/04/2023 and Memo no. KW 8/36-2009 C-IV(3) dated 12.12.2022
      </p>
      <div style="color: #15803d; font-weight: bold; font-size: 11.5px; margin-bottom: 12px;">
        ✓ Candidate Confirmation: I have carefully studied and understood the Criteria for Selection of Principal.
      </div>

      {/* Overall Summary Table */}
      <table style="width: 100%; border-collapse: collapse; font-size: 11.5px; margin-bottom: 14px;">
        <thead>
          <tr style="background-color: #f1f5f9; color: #1e293b;">
            <th style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: left;">Category</th>
            <th style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: right; width: 120px;">Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">I. Academic Record</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: right; font-weight: 600;">20 Marks</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">II. Teaching Experience and Assessment of Administrative Skill</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: right; font-weight: 600;">35 Marks</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">III. Academic/Research Score</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: right; font-weight: 600;">32.5 Marks</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">IV. Interview</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: right; font-weight: 600;">12.5 Marks</td>
          </tr>
          <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-transform: uppercase;">TOTAL:</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: right;">100 Marks</td>
          </tr>
        </tbody>
      </table>

      {/* Category I Table */}
      <h4 style="color: #0f172a; margin: 10px 0 4px 0; font-size: 12px; font-weight: bold;">
        I. Academic Record: Maximum 20 marks
      </h4>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 12px;">
        <thead>
          <tr style="background-color: #f8fafc; color: #334155;">
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 8%; text-align: center;">Sr. No.</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 62%; text-align: left;">Particulars</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 30%; text-align: left;">Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">1</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Above 55 % marks in Master's degree</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">0.5 mark for each percentage (max 5 marks)</td>
          </tr>
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">2</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Above 55 % marks in Graduation</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">0.4 mark for each percentage (max 5 marks)</td>
          </tr>
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">3</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Above 55 % marks in 10+2/Prep.</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">0.3 mark for each percentage (max 5 marks)</td>
          </tr>
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">4</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Above 55 % marks in Matriculation</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">0.2 mark for each percentage (max 5 marks)</td>
          </tr>
        </tbody>
      </table>

      {/* Category II Table */}
      <h4 style="color: #0f172a; margin: 10px 0 4px 0; font-size: 12px; font-weight: bold;">
        II. Teaching Experience and Assessment of Administrative Skill: Maximum 35 marks
      </h4>

      {/* II. A. Teaching Experience */}
      <p style="margin: 4px 0 2px 0; font-weight: bold; font-size: 11.5px; color: #1e3a8a;">A. Teaching Experience: Maximum 10 marks</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 10px;">
        <thead>
          <tr style="background-color: #f8fafc; color: #334155;">
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 8%; text-align: center;">Sr. No.</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 62%; text-align: left;">Particulars</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 30%; text-align: left;">Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">1</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Above 15 years teaching experience</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">1 mark for each year</td>
          </tr>
        </tbody>
      </table>

      {/* II. B. (i) Experience of Administrative Responsibilities */}
      <p style="margin: 6px 0 2px 0; font-weight: bold; font-size: 11.5px; color: #1e3a8a;">B. Assessment of Administrative Skill: Maximum 25 marks</p>
      <p style="margin: 2px 0 2px 0; font-weight: 600; font-size: 11px; color: #334155;">(i) Experience of Administrative Responsibilities</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 10px;">
        <thead>
          <tr style="background-color: #f8fafc; color: #334155;">
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 8%; text-align: center;">Sr. No.</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 62%; text-align: left;">Particulars</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 30%; text-align: left;">Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">1</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Experience as Joint/Deputy/Assistant Director in Directorate of Higher Education, Haryana</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">1 mark for each year</td>
          </tr>
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">2</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Experience as Registrar or any other administrative post in any University</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">1 mark for each year</td>
          </tr>
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">3</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Experience as Head of the Higher Education Institution i.e. Principal, Officiating Principal/DDO</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">1 mark for each year</td>
          </tr>
        </tbody>
      </table>

      {/* II. B. (ii) Key Responsibilities */}
      <p style="margin: 6px 0 2px 0; font-weight: 600; font-size: 11px; color: #334155;">(ii) Experience of Key responsibilities in colleges</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 10px;">
        <thead>
          <tr style="background-color: #f8fafc; color: #334155;">
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 8%; text-align: center;">Sr. No.</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 62%; text-align: left;">Particulars</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 30%; text-align: left;">Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">1</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Staff Representative or V.C. Nominee in Managing Committee of any College</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">1 mark for each year maximum upto 3 marks</td></tr>
          <tr><td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">2</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Co-ordinator or Organizing Secretary of International/National/State Conference/Event</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">1 mark for each event maximum upto 3 marks</td></tr>
          <tr><td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">3</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Bursar</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">1 mark for each year maximum upto 3 marks</td></tr>
          <tr><td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">4</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">NSS Programme Officer</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">1 mark for each year maximum upto 3 marks</td></tr>
          <tr><td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">5</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">YRC Counsellor</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">1 mark for each year maximum upto 3 marks</td></tr>
          <tr><td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">6</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Hostel Warden</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">1 mark for each year maximum upto 3 marks</td></tr>
          <tr><td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">7</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Member of any Statutory Body of University</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">1 mark for each year maximum upto 2 marks</td></tr>
          <tr><td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">8</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Experience as Associate NCC Officer in HEI (s)</td><td style="padding: 4px 6px; border: 1px solid #cbd5e1;">1 mark for each year maximum upto 3 marks</td></tr>
        </tbody>
      </table>

      {/* II. B. (iii) Committees */}
      <p style="margin: 6px 0 2px 0; font-weight: 600; font-size: 11px; color: #334155;">(iii) Experience of Committees in College</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 10px;">
        <thead>
          <tr style="background-color: #f8fafc; color: #334155;">
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 8%; text-align: center;">Sr. No.</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 62%; text-align: left;">Particulars</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 30%; text-align: left;">Marks</th>
          </tr>
        </thead>
        <tbody>
          ${[
            'Co-ordinator IQAC',
            'Editor in Chief, College Magazine',
            'Member, College Advisory Council',
            'Convenor, University Work Committee',
            'Convenor, Cultural Affairs Committee',
            'Convenor, Purchase/Procurement Committee',
            'Convenor, Building/Works Committee',
            'Convenor, Sports Committee',
            'Convenor, Discipline Committee',
            'Convenor, Internal (Complaint)Committee',
            'Convenor, Road Safety Club',
            'Convenor, Red Ribbon Club',
            'Convenor, Eco Club',
            'In-charge, Placement Cell',
            'In-charge, Women Cell',
            'In-charge, Time-table Committee',
            'In-charge, SC/BC Committee'
          ].map((cName, cIdx) => `<tr>
            <td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center;">${cIdx + 1}</td>
            <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">${cName}</td>
            <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">1 mark for each academic year maximum upto 2 marks</td>
          </tr>`).join('')}
        </tbody>
      </table>

      {/* Category III Table */}
      <h4 style="color: #0f172a; margin: 10px 0 4px 0; font-size: 12px; font-weight: bold;">
        III. Academic/Research Score: Maximum 32.5 marks
      </h4>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 10px;">
        <thead>
          <tr style="background-color: #f8fafc; color: #334155;">
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 8%; text-align: center;">Sr. No.</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 62%; text-align: left;">Particulars</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 30%; text-align: left;">Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">1</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Research Score above 110 as per the criteria given in Appendix II, Table 2.</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">0.3 mark for each 1 Research Score above 110</td>
          </tr>
        </tbody>
      </table>

      {/* Category IV Table */}
      <h4 style="color: #0f172a; margin: 10px 0 4px 0; font-size: 12px; font-weight: bold;">
        IV. Interview: 12.5 marks
      </h4>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 10px;">
        <thead>
          <tr style="background-color: #f8fafc; color: #334155;">
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 8%; text-align: center;">Sr. No.</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 62%; text-align: left;">Particulars</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 30%; text-align: left;">Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">1</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Knowledge of Service rules, financial matters & ICT tools</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">4 Marks</td>
          </tr>
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">2</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Leadership Qualities and Decision- making power</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">5.5 Marks</td>
          </tr>
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1; text-align: center;">3</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Overall Personality</td>
            <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">3 Marks</td>
          </tr>
        </tbody>
      </table>

      {/* Notes */}
      <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 8px 12px; font-size: 11px; color: #92400e; margin-bottom: 14px; line-height: 1.5;">
        <p style="margin: 0 0 4px 0;"><strong>Guidelines & Rules:</strong></p>
        <ul style="margin: 0; padding-left: 18px;">
          <li>Marks of only one experience under Category II B shall be allowed in one academic year. The convenor/In-charge shall be entitled mark (s) allotted to each category of experience. Similarly, member(s) of Committee shall also be entitled for 0.25 mark for each Committee up to maximum marks allotted.</li>
          <li>Performance in interview shall be assessed on the basis of above-mentioned criteria. Marks obtained by candidates in Categories I to III will be added to the average marks assigned by all members of Selection Committee.</li>
          <li>Teaching experience shall be considered only in case of teaching the concerned subject after acquiring eligibility qualifications determined by the Govt.</li>
        </ul>
      </div>

      {/* ================= 10. PART I ACADEMIC RECORD SCORE ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        10. Part I: Academic Record Score (Max 20 Marks)
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 15px;">
        <thead>
          <tr style="background-color: #f1f5f9; color: #334155;">
            <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left;">Category</th>
            <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Max</th>
            <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Claimed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Master's Degree (&gt;55%)</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">${fd.academicMasters || '0'}</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Graduation (&gt;55%)</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">${fd.academicGrad || '0'}</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">10+2 / Prep (&gt;55%)</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">${fd.academic12th || '0'}</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Matriculation (&gt;55%)</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">${fd.academicMatric || '0'}</td>
          </tr>
          <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Total Academic Score (Part I)</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-size: 13px;">${displayAcadTotal}</td>
          </tr>
        </tbody>
      </table>

      {/* ================= 11. PART II TEACHING & ADMIN SCORE ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        11. Part II: Teaching & Administrative Experience (Max 35 Marks)
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 15px;">
        <thead>
          <tr style="background-color: #f1f5f9; color: #334155;">
            <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left;">Category</th>
            <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Max</th>
            <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Claimed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">A. Teaching Experience above 15 years</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">10</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">${fd.teachingExpAbove15 || '0'}</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">B(i).1 Joint/Deputy/Asst Director in DHE</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;" rowspan="3">25 (Combined)</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">${fd.adminJointDirector || '0'}</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">B(i).2 Registrar or Admin post in University</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">${fd.adminRegistrar || '0'}</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">B(i).3 Head of HEI (Principal / Officiating / DDO)</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">${fd.adminHead || '0'}</td>
          </tr>
          <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Total Teaching & Admin Score (Part II)</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">35</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-size: 13px;">${displayTeachTotal}</td>
          </tr>
        </tbody>
      </table>

      {/* ================= 12. B(ii) RESPONSIBILITIES & B(iii) COMMITTEES ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        12. B(ii) Responsibilities & B(iii) Committees in Colleges
      </h3>

      <p style="font-weight: bold; font-size: 12px; color: #1e3a8a; margin: 8px 0 4px 0;">
        (ii) Experience of Key Responsibilities in Colleges
      </p>
      <table style="width: 100%; border-collapse: collapse; font-size: 11.5px; margin-bottom: 10px;">
        <thead>
          <tr style="background-color: #f1f5f9; color: #334155;">
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 5%; text-align: center;">Sr.</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 45%; text-align: left;">Particulars</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 25%; text-align: left;">Marks / Criteria</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 15%; text-align: center;">Academic Session</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 10%; text-align: center;">Score</th>
          </tr>
        </thead>
        <tbody>
          ${biiRowsHtml}
          <tr style="background-color: #eff6ff; font-weight: bold;">
            <td colspan="4" style="padding: 5px 6px; border: 1px solid #cbd5e1; text-align: right;">Total B(ii) Score Claimed:</td>
            <td style="padding: 5px 6px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">${biiTotal}</td>
          </tr>
        </tbody>
      </table>

      <p style="font-weight: bold; font-size: 12px; color: #1e3a8a; margin: 8px 0 4px 0;">
        (iii) Experience of Committees in Colleges
      </p>
      <table style="width: 100%; border-collapse: collapse; font-size: 11.5px; margin-bottom: 8px;">
        <thead>
          <tr style="background-color: #f1f5f9; color: #334155;">
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 5%; text-align: center;">Sr.</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 45%; text-align: left;">Particulars</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 25%; text-align: left;">Marks / Criteria</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 15%; text-align: center;">Academic Session</th>
            <th style="padding: 5px 6px; border: 1px solid #cbd5e1; width: 10%; text-align: center;">Score</th>
          </tr>
        </thead>
        <tbody>
          ${biiiRowsHtml}
          <tr style="background-color: #eff6ff; font-weight: bold;">
            <td colspan="4" style="padding: 5px 6px; border: 1px solid #cbd5e1; text-align: right;">Total B(iii) Score Claimed:</td>
            <td style="padding: 5px 6px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">${biiiTotal}</td>
          </tr>
        </tbody>
      </table>

      <div style="font-size: 11px; color: #475569; font-style: italic; margin: 4px 0 8px 0;">
        *Note: More than one experience in an academic year is not allowed. In the case of member of any committee, 0.25 mark for each academic session.
      </div>

      <div style="font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 6px; margin-bottom: 15px;">
        <strong>Part II Merged Proof Document:</strong> ${resolveFileLink(files.filePart2)}
      </div>

      {/* ================= 13. PART III RESEARCH SCORE ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        13. Part III: Academic / Research Score (Max 32.5 Marks)
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 15px;">
        <thead>
          <tr style="background-color: #f1f5f9; color: #334155;">
            <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left;">Category</th>
            <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Score Claimed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">1. Research Papers in Peer-Reviewed / CARE Journals</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">${fd.resPapers || '0'}</td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">2. Publications (Books, Chapters, Translations)</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">
              ${(
                parseFloat(fd.resBooksInt || 0) +
                parseFloat(fd.resBooksNat || 0) +
                parseFloat(fd.resChapter || 0) +
                parseFloat(fd.resEditorInt || 0) +
                parseFloat(fd.resEditorNat || 0) +
                parseFloat(fd.resTransChapter || 0) +
                parseFloat(fd.resTransBook || 0)
              ).toFixed(1)}
            </td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">3. ICT Pedagogy & E-Content</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">
              ${(
                parseFloat(fd.resIctCurricula || 0) +
                parseFloat(fd.resIctMoocsCourse || 0) +
                parseFloat(fd.resIctMoocsModule || 0) +
                parseFloat(fd.resIctEContent || 0)
              ).toFixed(1)}
            </td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">4. Research Guidance, Projects & Consultancy</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">
              ${(
                parseFloat(fd.resGuidancePhd || 0) +
                parseFloat(fd.resGuidanceMPhil || 0) +
                parseFloat(fd.resProjectsMajor || 0) +
                parseFloat(fd.resProjectsMinor || 0) +
                parseFloat(fd.resConsultancy || 0)
              ).toFixed(1)}
            </td>
          </tr>
          <tr>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">5. Patents, Policy Documents, Awards & Lectures</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">
              ${(
                parseFloat(fd.resPatentsInt || 0) +
                parseFloat(fd.resPatentsNat || 0) +
                parseFloat(fd.resPolicyInt || 0) +
                parseFloat(fd.resAwardsInt || 0) +
                parseFloat(fd.resAwardsNat || 0) +
                parseFloat(fd.resLecturesInt || 0) +
                parseFloat(fd.resLecturesNat || 0)
              ).toFixed(1)}
            </td>
          </tr>
          <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Total Research Score (Part III)</td>
            <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; font-size: 13px;">${fd.resTotal || '0'} / 32.5</td>
          </tr>
        </tbody>
      </table>

      {/* ================= 14. ANNEXURES ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        14. Annexures & Supporting Documents
      </h3>
      <p style="font-size: 12px; color: #334155; margin-bottom: 15px;">
        <strong>Merged Annexures:</strong> ${resolveFileLink(files.fileAnnexures)}
      </p>

      {/* ================= 15. PAYMENT DETAILS ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        15. Application Fee Payment Details
      </h3>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; font-size: 13px; margin-bottom: 15px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 4px; width: 40%; color: #64748b;"><strong>Amount Paid:</strong></td>
            <td style="padding: 4px; font-weight: bold; color: #1e3a8a;">₹${fd.paymentAmount || '1000'}</td>
          </tr>
          <tr>
            <td style="padding: 4px; color: #64748b;"><strong>12-Digit UTR / Transaction No:</strong></td>
            <td style="padding: 4px; font-family: monospace; font-weight: bold; color: #0f172a;">${fd.utrNo || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 4px; color: #64748b;"><strong>UPI App / Method:</strong></td>
            <td style="padding: 4px;">${fd.upiProvider || 'UPI'}</td>
          </tr>
          <tr>
            <td style="padding: 4px; color: #64748b;"><strong>Account Holder Name:</strong></td>
            <td style="padding: 4px;">${fd.accountHolderName || 'N/A'}</td>
          </tr>
        </table>
        ${paymentScreenshotHtml}
      </div>

      {/* ================= 16. DECLARATION & SIGNATURE ================= */}
      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; font-size: 14px;">
        16. Declaration & Verification
      </h3>
      <div style="background-color: #f1f5f9; padding: 12px; border-radius: 6px; font-size: 12px; color: #334155;">
        <p style="margin: 0 0 6px 0;">
          <strong>Undertaking:</strong> I hereby declare that all information provided in this form is true, correct and complete to the best of my knowledge and belief.
        </p>
        <p style="margin: 0 0 6px 0; color: #15803d; font-weight: bold;">
          ✓ Final Verification: Confirmed by candidate as per Criteria for selection of Principal.
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="width: 50%;">
              <p style="margin: 2px 0;"><strong>Place:</strong> ${fd.place || 'Rohtak'}</p>
              <p style="margin: 2px 0;"><strong>Date:</strong> ${fd.date || new Date().toISOString().split('T')[0]}</p>
            </td>
            <td style="width: 50%; text-align: right;">
              <span style="font-weight: bold; display: block; margin-bottom: 4px;">Candidate Signature:</span>
              ${signatureHtml}
            </td>
          </tr>
        </table>
      </div>

      <p style="color: #64748b; font-size: 11px; margin-top: 25px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 10px;">
        All India Jat Heroes’ Memorial College Recruitment Portal • Generated automatically upon application submission.
      </p>
    </div>
  `;

  // Generate and attach complete application PDF using puppeteer-core
  try {
    const puppeteer = require('puppeteer-core');
    const possiblePaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
    ];
    const execPath = possiblePaths.find(p => fs.existsSync(p));

    if (execPath) {
      console.log(`[Mailer] Generating PDF attachment using: ${execPath}`);
      const browser = await puppeteer.launch({
        executablePath: execPath,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
      });
      const page = await browser.newPage();

      // Convert any cid: image links to base64 so they render directly in PDF
      let pdfHtml = htmlContent;
      for (const att of attachments) {
        if (att.cid && att.path && fs.existsSync(att.path)) {
          try {
            const ext = path.extname(att.path).toLowerCase().replace('.', '') || 'jpeg';
            const b64 = fs.readFileSync(att.path).toString('base64');
            const dataUri = `data:image/${ext === 'jpg' ? 'jpeg' : ext};base64,${b64}`;
            pdfHtml = pdfHtml.split(`cid:${att.cid}`).join(dataUri);
          } catch (e) {
            console.warn(`[Mailer] Could not inline image cid:${att.cid} for PDF:`, e.message);
          }
        }
      }

      await page.setContent(pdfHtml, { waitUntil: 'networkidle0' });
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' }
      });
      await browser.close();

      const pdfFilename = `Application_Form_${application.applicationNo || application.registrationId || 'Submitted'}.pdf`;
      attachments.push({
        filename: pdfFilename,
        content: pdfBuffer,
        contentType: 'application/pdf'
      });
      console.log(`[Mailer] Application PDF attached successfully: ${pdfFilename} (${pdfBuffer.length} bytes)`);
    } else {
      console.warn('[Mailer] Headless browser binary not found. Skipping PDF generation.');
    }
  } catch (pdfErr) {
    console.error('[Mailer] Error generating application PDF attachment:', pdfErr.message);
  }

  const mailOptions = {
    from: `"AIJHM Recruitment Portal" <${process.env.SMTP_USER}>`,
    to: allRecipients.join(', '),
    subject: `Application Submitted: ${application.applicationNo} - ${application.candidateName} - [${application.postAppliedFor || 'Principal'}]`,
    html: htmlContent,
    attachments
  };

  return transporter.sendMail(mailOptions);
}

/**
 * Send password reset OTP email
 */
async function sendPasswordResetOtpEmail({ to, name, otp }) {
  const mailOptions = {
    from: `"AIJHM Recruitment Portal" <${process.env.SMTP_USER}>`,
    to,
    subject: `Password Reset OTP: ${otp} - AIJHM Recruitment Portal`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 12px; margin-bottom: 18px;">
          <h2 style="color: #1e3a8a; margin: 0; font-size: 18px;">ALL INDIA JAT HEROES’ MEMORIAL COLLEGE</h2>
          <p style="color: #64748b; font-size: 12px; margin: 4px 0 0;">Rohtak, Haryana • Recruitment Portal</p>
        </div>
        <h3 style="color: #0f172a; margin-top: 0;">Password Reset Request</h3>
        <p style="color: #334155; font-size: 14px; line-height: 1.6;">
          Hello <strong>${name || 'Candidate'}</strong>,<br/>
          We received a request to reset the password for your AIJHM Recruitment Portal account. Use the following One-Time Password (OTP) to reset your password:
        </p>
        <div style="text-align: center; margin: 25px 0;">
          <div style="display: inline-block; background-color: #eff6ff; border: 2px dashed #2563eb; padding: 12px 28px; border-radius: 8px;">
            <span style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #1e3a8a; font-family: monospace;">${otp}</span>
          </div>
          <p style="color: #dc2626; font-size: 12px; margin-top: 8px; font-weight: 600;">
            ⏱ This OTP is valid for 10 minutes only.
          </p>
        </div>
        <p style="color: #64748b; font-size: 12px; line-height: 1.5;">
          If you did not request a password reset, please ignore this email or contact the recruitment support office.
        </p>
        <p style="color: #94a3b8; font-size: 11px; margin-top: 25px; border-top: 1px solid #f1f5f9; padding-top: 10px; text-align: center;">
          AIJHM Recruitment Portal • Automated Security Notification
        </p>
      </div>
    `
  };
  return transporter.sendMail(mailOptions);
}

/**
 * Send recovered registration ID email
 */
async function sendRegistrationIdEmail({ to, name, registrationId, mobile }) {
  const mailOptions = {
    from: `"AIJHM Recruitment Portal" <${process.env.SMTP_USER}>`,
    to,
    subject: `Your Registration Number: ${registrationId} - AIJHM Recruitment Portal`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 12px; margin-bottom: 18px;">
          <h2 style="color: #1e3a8a; margin: 0; font-size: 18px;">ALL INDIA JAT HEROES’ MEMORIAL COLLEGE</h2>
          <p style="color: #64748b; font-size: 12px; margin: 4px 0 0;">Rohtak, Haryana • Recruitment Portal</p>
        </div>
        <h3 style="color: #0f172a; margin-top: 0;">Registration Number Recovery</h3>
        <p style="color: #334155; font-size: 14px; line-height: 1.6;">
          Hello <strong>${name || 'Candidate'}</strong>,<br/>
          As requested, here is your Registration Number for the faculty recruitment portal:
        </p>
        <div style="background-color: #f8fafc; border-left: 4px solid #059669; padding: 14px 18px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 4px 0; font-size: 14px;"><strong>Candidate Name:</strong> ${name}</p>
          <p style="margin: 6px 0; font-size: 14px;">
            <strong>Registration Number:</strong> 
            <span style="font-size: 18px; font-weight: bold; color: #065f46; font-family: monospace;">${registrationId}</span>
          </p>
          ${mobile ? `<p style="margin: 4px 0; font-size: 13px; color: #64748b;">Registered Mobile: ${mobile}</p>` : ''}
        </div>
        <p style="color: #334155; font-size: 13px; line-height: 1.5;">
          You can use this Registration Number along with your password to login to your recruitment portal account.
        </p>
        <p style="color: #94a3b8; font-size: 11px; margin-top: 25px; border-top: 1px solid #f1f5f9; padding-top: 10px; text-align: center;">
          AIJHM Recruitment Portal • Automated Account Recovery
        </p>
      </div>
    `
  };
  return transporter.sendMail(mailOptions);
}

module.exports = {
  transporter,
  sendRegistrationEmail,
  sendApplicationSubmissionEmail,
  sendPasswordResetOtpEmail,
  sendRegistrationIdEmail
};
