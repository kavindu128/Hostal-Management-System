import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; 

export const listStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching student list:', error);
    return []; // return empty array on error
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


export const updateStudent = async (regNo, data) => {
  const response = await fetch(`${API_BASE_URL}/students/${regNo}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Update failed with status ${response.status}`);
  }

  // if backend returns empty body (204 No Content), avoid JSON.parse error
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

