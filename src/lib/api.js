const API_URL = import.meta.env.VITE_API_URL || 'https://jatclgjobportal.onrender.com/api';

export const adminLoginAPI = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error('API Connection Error:', error);
    throw new Error('Failed to connect to backend server');
  }
};

export const userRegisterAPI = async (name, email, mobile, password) => {
  try {
    const response = await fetch(`${API_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, mobile, password }),
    });
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    throw new Error('Failed to connect to backend server');
  }
};

export const userLoginAPI = async (contact, password) => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact, password }),
    });
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    throw new Error('Failed to connect to backend server');
  }
};

export const getAllUsersAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/user/all`);
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    throw new Error('Failed to connect to backend server');
  }
};

export const getInstructionsAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/instructions`);
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.warn('API error fetching instructions:', error);
    return { ok: false, data: null };
  }
};

export const updateInstructionsAPI = async (payload) => {
  try {
    const response = await fetch(`${API_URL}/admin/instructions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error('API error updating instructions:', error);
    throw new Error('Failed to connect to backend server');
  }
};

export const getAdminApplicationsAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/applications`);
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error('API error fetching applications:', error);
    throw new Error('Failed to connect to backend server');
  }
};

export const getAdminApplicationByIdAPI = async (id) => {
  try {
    const response = await fetch(`${API_URL}/admin/applications/${id}`);
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error('API error fetching application details:', error);
    throw new Error('Failed to connect to backend server');
  }
};

export const getSettingAPI = async (key) => {
  try {
    const response = await fetch(`${API_URL}/settings/${key}`);
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error('API error fetching setting:', error);
    throw new Error('Failed to connect to backend server');
  }
};

export const updateSettingAPI = async (key, value) => {
  try {
    const response = await fetch(`${API_URL}/settings/${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error('API error updating setting:', error);
    throw new Error('Failed to connect to backend server');
  }
};

export const uploadFileAPI = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error('API error uploading file:', error);
    throw new Error('Failed to connect to backend server');
  }
};

export const getBaseUrl = () => {
    return API_URL.replace('/api', '');
};


