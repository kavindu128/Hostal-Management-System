import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; 

export const listStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student list:', error);
    throw error;
  }
};
