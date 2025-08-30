import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const listStudents = async () => {
  try {
    const response = await api.get('/students');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching student list:', error);
    return [];
  }
};

export const createStudent = async (data) => {
  try {
    const response = await api.post('/students', data);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    await api.delete(`/students/${id}`);
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

export const updateStudent = async (regNo, data) => {
  try {
    const response = await api.put(`/students/${regNo}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};