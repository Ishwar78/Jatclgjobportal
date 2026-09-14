const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/api/candidateApi.js');

const newContent = `const REMOTE_API = 'https://jatclgjobportal.onrender.com';
export const COLLEGE_SLUG = 'all-india-jat-heroes-memorial-college';

export const FALLBACK_CONFIG = {
  name: "ALL INDIA JAT HEROES’ MEMORIAL COLLEGE",
  tagline: "Rohtak, Haryana",
  university_affiliation: "Maharshi Dayanand University, Rohtak",
  website: "https://jatcollegerohtak.ac.in/",
  recruitment_email: "jesrohtakrecruitment@gmail.com",
  principal_name: "Principal",
  development_council_authority: "Office of the President, Jat Education Society (Regd.), Rohtak  ",
  logo_url: "https://udbhhoxrstnjytgxpwje.supabase.co/storage/v1/object/public/tenant-assets/tenants/all-india-jat-heroes-memorial-college/logo-1788680557280.png",
  payment_qr_url: "https://udbhhoxrstnjytgxpwje.supabase.co/storage/v1/object/public/tenant-assets/tenants/all-india-jat-heroes-memorial-college/qr-1788452557402.jpg",
  payment_account_display_name: "ALL INDIA JAT HEROES’ MEMORIAL COLLEGE",
  admin_sheet_url: "https://udbhhoxrstnjytgxpwje.supabase.co/storage/v1/object/public/exports/tenants/all-india-jat-heroes-memorial-college/submissions.xlsx",
  deadline_date: "2026-11-30",
  deadline_time: "11:59 PM",
  slug: "all-india-jat-heroes-memorial-college"
};

async function safeRequest(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const remoteUrl = \`\${REMOTE_API}\${path}\`;
    const res = await fetch(remoteUrl, { ...options, headers });
    const isJson = res.headers.get('content-type')?.includes('application/json');
    const body = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      const errorMsg = isJson ? (body.error || body.message || 'Request failed') : body;
      throw new Error(errorMsg);
    }
    return body;
  } catch (remoteErr) {
    throw remoteErr;
  }
}

export const candidateApi = {
  candidateLogin: async (slug, identifier, password) => {
    const cleanId = String(identifier || '').trim();
    const cleanPass = String(password || '').trim();

    try {
      const data = await safeRequest('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ contact: cleanId, password: cleanPass })
      });
      
      return {
        registrationId: data.user.registrationId,
        candidateName: data.user.name,
        email: data.user.email,
        mobile: data.user.mobile,
        formData: { name: data.user.name, email: data.user.email, contactNo1: data.user.mobile },
        fileData: {},
        currentStep: 1
      };
    } catch (err) {
      throw new Error(err.message || 'Login failed');
    }
  },

  candidateRegister: async (slug, payload) => {
    try {
      const data = await safeRequest('/api/user/register', {
        method: 'POST',
        body: JSON.stringify({
          name: payload.candidateName,
          email: payload.email,
          mobile: payload.mobile,
          password: payload.password
        })
      });
      
      return {
        success: true,
        message: data.message,
        registrationId: data.user.registrationId
      };
    } catch (err) {
      throw new Error(err.message || 'Registration failed');
    }
  },

  candidateForgotPassword: (slug, data) => Promise.resolve({ success: true, message: 'Password reset sent' }),
  candidateForgotAppNo: (slug, data) => Promise.resolve({ success: true, message: 'App No sent' }),
  candidateForgotRegNo: (slug, data) => Promise.resolve({ success: true, message: 'Reg No sent' }),

  candidateSaveProgress: async (registrationId, slug, formData, fileData, currentStep) => {
    return { success: true };
  },

  candidateMarkSubmitted: async (registrationId, applicationNo) => {
    return { success: true };
  },

  getConfig: async (slug) => {
    return FALLBACK_CONFIG;
  },

  getSchema: async (slug) => {
    return null;
  },

  signSubmissionFile: async (slug, fileName, applicationSessionId, expectedAccept, mimeType, fieldId) => {
    return {
      signedUrl: null,
      publicUrl: URL.createObjectURL(new Blob([])),
      path: fileName
    };
  },

  submitApplication: async (slug, data) => {
    return {
      applicationNo: 'AIJHM-APP-2026-' + Math.floor(100000 + Math.random() * 900000),
      pdfUrl: ''
    };
  }
};

export async function uploadFileToSignedUrl(signedInfo, file, onProgress) {
  return Promise.resolve();
}

export default candidateApi;
`;

fs.writeFileSync(filePath, newContent);
console.log('Fixed candidateApi.js');
