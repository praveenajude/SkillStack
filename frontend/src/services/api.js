import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Skills API
export const getAllSkills = async () => {
  const response = await api.get('/skills/');
  return response.data;
};

export const getSkill = async (id) => {
  const response = await api.get(`/skills/${id}/`);
  return response.data;
};

export const createSkill = async (skillData) => {
  try {
    console.log('Sending skill data to API:', skillData);
    const response = await api.post('/skills/', skillData);
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API error creating skill:', error.response?.data || error.message);
    throw error;
  }
};

export const updateSkill = async (id, skillData) => {
  const response = await api.put(`/skills/${id}/`, skillData);
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await api.delete(`/skills/${id}/`);
  return response.data;
};

export const addResourceToSkill = async (skillId, resourceData) => {
  const response = await api.post(`/skills/${skillId}/add_resource/`, resourceData);
  return response.data;
};

// Resources API
export const getAllResources = async () => {
  const response = await api.get('/resources/');
  return response.data;
};

export const getResource = async (id) => {
  const response = await api.get(`/resources/${id}/`);
  return response.data;
};

export const createResource = async (resourceData) => {
  const response = await api.post('/resources/', resourceData);
  return response.data;
};

export const updateResource = async (id, resourceData) => {
  const response = await api.patch(`/resources/${id}/`, resourceData);
  return response.data;
};

export const deleteResource = async (id) => {
  const response = await api.delete(`/resources/${id}/`);
  return response.data;
};

// Certifications API
export const getAllCertifications = async () => {
  const response = await api.get('/certifications/');
  return response.data;
};

export const getCertification = async (id) => {
  const response = await api.get(`/certifications/${id}/`);
  return response.data;
};

export const createCertification = async (certificationData) => {
  try {
    console.log('Sending certification data to API:', certificationData);
    const response = await api.post('/certifications/', certificationData);
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API error creating certification:', error.response?.data || error.message);
    throw error;
  }
};

export const updateCertification = async (id, certificationData) => {
  const response = await api.put(`/certifications/${id}/`, certificationData);
  return response.data;
};

export const deleteCertification = async (id) => {
  const response = await api.delete(`/certifications/${id}/`);
  return response.data;
};

// Dashboard API
export const getDashboardStats = async () => {
  const response = await api.get('/skills/dashboard_stats/');
  return response.data;
};

export default api;
