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

  const educationRows = Array.isArray(fd.educationDetails)
    ? fd.educationDetails
        .filter(r => r && (r.exam || r.university || r.percentage))
        .map((r, i) => `<tr>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.exam || `Exam ${i+1}`}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.university || '-'}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.yearOfPassing || '-'}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.marksObtained ? `${r.marksObtained}/${r.marksMax || ''}` : '-'}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.percentage ? `${r.percentage}%` : '-'}</td>
            <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${r.division || '-'}</td>
          </tr>`).join('')
    : '<tr><td colspan="6" style="padding: 6px; text-align: center; border: 1px solid #cbd5e1;">No educational rows listed</td></tr>';

  const attachments = [];

  // Safe payment screenshot handling - supports /uploads/ disk files, http urls, and base64
  let paymentScreenshotHtml = '';
  if (files.filePaymentScreenshot?.url) {
    const rawUrl = files.filePaymentScreenshot.url;
    if (rawUrl.startsWith('/uploads/') || rawUrl.startsWith('uploads/')) {
      const cleanRel = rawUrl.startsWith('/') ? rawUrl.slice(1) : rawUrl;
      const diskPath = path.join(__dirname, '..', cleanRel);
      if (fs.existsSync(diskPath)) {
        attachments.push({
          filename: files.filePaymentScreenshot.originalName || 'payment_receipt.jpg',
          path: diskPath,
          cid: 'payment_screenshot_img'
        });
        paymentScreenshotHtml = `
          <p style="margin: 4px 0;"><strong>Screenshot:</strong> <span style="background-color: #ecfdf5; color: #065f46; padding: 2px 8px; border-radius: 4px; font-weight: 600;">✓ Payment Screenshot Attached (${files.filePaymentScreenshot.originalName || 'payment_receipt.jpg'})</span></p>
          <div style="margin-top: 8px;">
            <img src="cid:payment_screenshot_img" alt="Payment Receipt" style="max-width: 300px; max-height: 220px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>
        `;
      } else {
        paymentScreenshotHtml = `<p style="margin: 4px 0;"><strong>Screenshot:</strong> <a href="https://jatclgjobportal.onrender.com${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}" target="_blank" style="color: #2563eb;">View Payment Receipt</a></p>`;
      }
    } else if (rawUrl.startsWith('data:image/')) {
      const parts = rawUrl.split(';base64,');
      const mime = parts[0].replace('data:', '') || 'image/jpeg';
      const b64Data = parts[1];
      attachments.push({
        filename: files.filePaymentScreenshot.originalName || 'payment_receipt.jpg',
        content: Buffer.from(b64Data, 'base64'),
        contentType: mime,
        cid: 'payment_screenshot_img'
      });
      paymentScreenshotHtml = `
        <p style="margin: 4px 0;"><strong>Screenshot:</strong> <span style="background-color: #ecfdf5; color: #065f46; padding: 2px 8px; border-radius: 4px; font-weight: 600;">✓ Payment Screenshot Attached (${files.filePaymentScreenshot.originalName || 'payment_receipt.jpg'})</span></p>
        <div style="margin-top: 8px;">
          <img src="cid:payment_screenshot_img" alt="Payment Receipt" style="max-width: 300px; max-height: 220px; border: 1px solid #cbd5e1; border-radius: 6px;" />
        </div>
      `;
    } else if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
      paymentScreenshotHtml = `<p style="margin: 4px 0;"><strong>Screenshot:</strong> <a href="${rawUrl}" target="_blank" style="color: #2563eb;">View Payment Receipt</a></p>`;
    } else {
      paymentScreenshotHtml = `<p style="margin: 4px 0;"><strong>Screenshot:</strong> <span style="color: #059669; font-weight: 600;">✓ Payment Receipt Uploaded with Application</span></p>`;
    }
  }

  // Safe uploaded files list - points to server files if /uploads/
  const uploadedFilesList = Object.entries(files).map(([key, f]) => {
    let fileLink = '<span style="color: #64748b;">(Uploaded with Application)</span>';
    if (f.url) {
      if (f.url.startsWith('/uploads/') || f.url.startsWith('uploads/')) {
        const fullUrl = `https://jatclgjobportal.onrender.com${f.url.startsWith('/') ? '' : '/'}${f.url}`;
        fileLink = `<a href="${fullUrl}" target="_blank" style="color: #2563eb; font-weight: 600;">[Download / View File]</a>`;
      } else if (f.url.startsWith('http://') || f.url.startsWith('https://')) {
        fileLink = `<a href="${f.url}" target="_blank" style="color: #2563eb; font-weight: 600;">[View Document]</a>`;
      }
    }
    return `<li style="margin-bottom: 4px;"><strong>${key}:</strong> ${f.originalName || 'Uploaded'} ${fileLink}</li>`;
  }).join('');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 750px; margin: 0 auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 8px; background-color: #ffffff;">
      <div style="text-align: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="color: #1e3a8a; margin: 0; font-size: 20px;">ALL INDIA JAT HEROES’ MEMORIAL COLLEGE, ROHTAK</h2>
        <p style="color: #475569; font-size: 13px; margin: 4px 0 0;">Application Form for Recruitment to Teaching / Principal Post</p>
      </div>

      <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="color: #065f46; font-weight: bold; font-size: 16px;">Application No: ${application.applicationNo}</span>
            <br/>
            <span style="color: #047857; font-size: 13px;">Submitted on: ${new Date(application.createdAt || Date.now()).toLocaleString()}</span>
          </div>
          <span style="background-color: #059669; color: #ffffff; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold;">SUBMITTED</span>
        </div>
      </div>

      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 20px;">1. Candidate & Post Summary</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 15px;">
        <tr>
          <td style="padding: 6px; width: 25%; color: #64748b;"><strong>Post Applied For:</strong></td>
          <td style="padding: 6px; width: 25%; color: #0f172a; font-weight: bold;">${application.postAppliedFor || fd.postAppliedFor || 'Principal'}</td>
          <td style="padding: 6px; width: 25%; color: #64748b;"><strong>Registration ID:</strong></td>
          <td style="padding: 6px; width: 25%; color: #0f172a;">${application.registrationId || fd.registrationId || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 6px; color: #64748b;"><strong>Candidate Name:</strong></td>
          <td style="padding: 6px; color: #0f172a; font-weight: bold;">${application.candidateName}</td>
          <td style="padding: 6px; color: #64748b;"><strong>Father's Name:</strong></td>
          <td style="padding: 6px; color: #0f172a;">${application.fatherName || fd.fatherName || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 6px; color: #64748b;"><strong>Mother's Name:</strong></td>
          <td style="padding: 6px; color: #0f172a;">${fd.motherName || 'N/A'}</td>
          <td style="padding: 6px; color: #64748b;"><strong>Date of Birth:</strong></td>
          <td style="padding: 6px; color: #0f172a;">${fd.dob || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 6px; color: #64748b;"><strong>Email:</strong></td>
          <td style="padding: 6px; color: #0f172a;">${application.email}</td>
          <td style="padding: 6px; color: #64748b;"><strong>Mobile:</strong></td>
          <td style="padding: 6px; color: #0f172a;">${application.mobile}</td>
        </tr>
        <tr>
          <td style="padding: 6px; color: #64748b;"><strong>Social Category:</strong></td>
          <td style="padding: 6px; color: #0f172a;">${fd.socialCategory || 'General'}</td>
          <td style="padding: 6px; color: #64748b;"><strong>Aadhaar No:</strong></td>
          <td style="padding: 6px; color: #0f172a;">${fd.aadhaarNo || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 6px; color: #64748b;"><strong>Present Address:</strong></td>
          <td colspan="3" style="padding: 6px; color: #0f172a;">
            ${[fd.presentStreet, fd.presentCity, fd.presentState, fd.presentPostalCode, fd.presentCountry].filter(Boolean).join(', ') || 'N/A'}
          </td>
        </tr>
      </table>

      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 20px;">2. Educational Qualifications</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 15px;">
        <thead>
          <tr style="background-color: #f1f5f9; color: #334155;">
            <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Exam</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Board/Univ</th>
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

      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 20px;">3. Score & Research Summary</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 15px;">
        <tr>
          <td style="padding: 6px; color: #64748b; width: 35%;"><strong>Calculated Academic Score:</strong></td>
          <td style="padding: 6px; color: #0f172a; font-weight: bold;">${fd.academicTotal || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 6px; color: #64748b;"><strong>Teaching & Admin Score:</strong></td>
          <td style="padding: 6px; color: #0f172a; font-weight: bold;">${fd.teachingTotalScore || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 6px; color: #64748b;"><strong>Research Score Total:</strong></td>
          <td style="padding: 6px; color: #0f172a; font-weight: bold;">${fd.resTotal || 'N/A'}</td>
        </tr>
      </table>

      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 20px;">4. Payment Details</h3>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; font-size: 13px; margin-bottom: 15px;">
        <p style="margin: 4px 0;"><strong>Amount Paid:</strong> ₹${fd.paymentAmount || '1000'}</p>
        <p style="margin: 4px 0;"><strong>UTR / Transaction No:</strong> <span style="font-family: monospace; font-weight: bold; color: #1e3a8a;">${fd.utrNo || 'N/A'}</span></p>
        <p style="margin: 4px 0;"><strong>UPI App / Method:</strong> ${fd.upiProvider || 'UPI'}</p>
        <p style="margin: 4px 0;"><strong>Account Holder:</strong> ${fd.accountHolderName || 'N/A'}</p>
        ${paymentScreenshotHtml}
      </div>

      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 20px;">5. Uploaded Documents & Testimonials</h3>
      <ul style="font-size: 13px; color: #334155; padding-left: 20px;">
        ${uploadedFilesList || '<li>No documents uploaded</li>'}
      </ul>

      <h3 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 20px;">6. Declaration & Verification</h3>
      <div style="background-color: #f1f5f9; padding: 10px; border-radius: 6px; font-size: 12px; color: #334155;">
        <p style="margin: 2px 0;"><strong>Place:</strong> ${fd.place || 'N/A'} | <strong>Date:</strong> ${fd.date || new Date().toISOString().split('T')[0]}</p>
        <p style="margin: 4px 0;"><strong>Undertaking:</strong> Verified and signed by applicant.</p>
        ${files.signature?.url && (files.signature.url.startsWith('http://') || files.signature.url.startsWith('https://')) ? `<p style="margin: 4px 0;"><strong>Signature:</strong> <a href="${files.signature.url}" target="_blank" style="color: #2563eb;">View Signature</a></p>` : `<p style="margin: 4px 0;"><strong>Signature:</strong> <span style="color: #059669; font-weight: bold;">✓ Digital Signature Uploaded</span></p>`}
      </div>

      <p style="color: #64748b; font-size: 11px; margin-top: 25px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 10px;">
        All India Jat Heroes’ Memorial College Recruitment Portal • Generated automatically upon submission.
      </p>
    </div>
  `;

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
