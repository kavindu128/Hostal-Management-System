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

export const createStudent = async (data) => {
  return fetch('http://localhost:8080/api/students', {  // use your backend URL
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }
    return res.json();
  });
};

export const deleteStudent = async (id) => {
  const res = await fetch(`http://localhost:8080/api/students/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Delete error:', errorText);
  }
  return res;
};

