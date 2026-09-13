const REMOTE_API = 'https://jatclgjobportal.onrender.com';
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
  deadline_time: "23:59:59",
  slug: "all-india-jat-heroes-memorial-college"
};

async function safeRequest(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const remoteUrl = `${REMOTE_API}${path}`;
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

export const getFileUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:') || url.startsWith('data:')) {
    return url;
  }
  return `${REMOTE_API}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const safeSaveSession = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Storage quota warning for ${key}:`, err);
    try {
      const sanitized = JSON.parse(JSON.stringify(data));
      if (sanitized.fileData && typeof sanitized.fileData === 'object') {
        for (const k of Object.keys(sanitized.fileData)) {
          if (sanitized.fileData[k]?.url?.startsWith('data:')) {
            sanitized.fileData[k].url = '';
          }
        }
      }
      localStorage.setItem(key, JSON.stringify(sanitized));
    } catch (fallbackErr) {
      console.error('Failed to save fallback session:', fallbackErr);
    }
  }
};

export const candidateApi = {
  candidateLogin: async (slug, identifier, password) => {
    const cleanId = String(identifier || '').trim();
    const cleanPass = String(password || '').trim();

    try {
      const data = await safeRequest('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ contact: cleanId, password: cleanPass })
      });
      
      const rawFiles = data.user.fileData || {};
      const normalizedFiles = {};
      for (const [k, v] of Object.entries(rawFiles)) {
        if (v && typeof v === 'object') {
          normalizedFiles[k] = {
            ...v,
            url: getFileUrl(v.url)
          };
        }
      }

      return {
        registrationId: data.user.registrationId,
        candidateName: data.user.name,
        fatherName: data.user.fatherName || '',
        email: data.user.email,
        mobile: data.user.mobile,
        formData: {
          name: data.user.name,
          fatherName: data.user.fatherName || '',
          email: data.user.email,
          contactNo1: data.user.mobile,
          ...(data.user.formData || {})
        },
        fileData: normalizedFiles,
        currentStep: data.user.currentStep || 1
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
          fatherName: payload.fatherName,
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

  candidateSendResetOtp: async (slug, identifier) => {
    try {
      const data = await safeRequest('/api/user/forgot-password/send-otp', {
        method: 'POST',
        body: JSON.stringify({ identifier })
      });
      return data;
    } catch (err) {
      throw new Error(err.message || 'Failed to send OTP');
    }
  },

  candidateVerifyResetPassword: async (slug, identifier, otp, newPassword) => {
    try {
      const data = await safeRequest('/api/user/forgot-password/verify-reset', {
        method: 'POST',
        body: JSON.stringify({ identifier, otp, newPassword })
      });
      return data;
    } catch (err) {
      throw new Error(err.message || 'Failed to reset password');
    }
  },

  candidateForgotRegNo: async (slug, payload) => {
    try {
      const data = await safeRequest('/api/user/forgot-registration', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      return data;
    } catch (err) {
      throw new Error(err.message || 'Failed to retrieve Registration Number');
    }
  },

  getMyApplication: async (registrationId) => {
    try {
      const data = await safeRequest(`/api/application/my/${registrationId}`);
      if (data?.application?.fileData) {
        for (const [k, v] of Object.entries(data.application.fileData)) {
          if (v && v.url) {
            data.application.fileData[k].url = getFileUrl(v.url);
          }
        }
      }
      return data;
    } catch (err) {
      return null;
    }
  },

  uploadFile: async (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${REMOTE_API}/api/upload`);

      if (xhr.upload && onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            onProgress(percent);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const res = JSON.parse(xhr.responseText);
            if (res.success && res.file) {
              const fullUrl = getFileUrl(res.file.url);
              resolve({
                originalName: res.file.originalName,
                filename: res.file.filename,
                mimeType: res.file.mimeType,
                size: res.file.size,
                url: fullUrl,
                path: res.file.path
              });
            } else {
              reject(new Error(res.message || 'Upload failed'));
            }
          } catch (e) {
            reject(new Error('Invalid response from server'));
          }
        } else {
          try {
            const errRes = JSON.parse(xhr.responseText);
            reject(new Error(errRes.message || `Upload failed with status ${xhr.status}`));
          } catch (e) {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network connection error during file upload'));
      };

      xhr.send(formData);
    });
  },

  candidateSaveProgress: async (registrationId, slug, formData, fileData, currentStep) => {
    try {
      const data = await safeRequest('/api/application/save-progress', {
        method: 'POST',
        body: JSON.stringify({
          registrationId,
          formData,
          fileData,
          currentStep
        })
      });
      return data;
    } catch (err) {
      console.warn('Backend save progress error:', err);
      return { success: false, error: err.message };
    }
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
    try {
      const res = await safeRequest('/api/application/submit', {
        method: 'POST',
        body: JSON.stringify({
          registrationId: data.registrationId,
          formData: data.formData,
          fileData: data.fileData
        })
      });
      return res;
    } catch (err) {
      console.error('Submit application API error:', err);
      throw err;
    }
  }
};

export async function uploadFileToSignedUrl(signedInfo, file, onProgress) {
  return Promise.resolve();
}

export default candidateApi;
