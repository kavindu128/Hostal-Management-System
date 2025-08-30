// api.js
const API_BASE_URL = 'http://localhost:8080/api';

// Student API functions
export const listStudents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/students`);
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("Invalid JSON response:", text);
      throw new Error("Backend did not return JSON");
    }
  } catch (error) {
    console.error("Error fetching student list:", error);
    throw error;
  }
};

export const createStudent = async (data) => {
  return fetch(`${API_BASE_URL}/students`, {
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
  const res = await fetch(`${API_BASE_URL}/students/${id}`, {
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

  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

// Room API functions
export const getAllRooms = async () => {
  const response = await fetch(`${API_BASE_URL}/rooms`);
  return response.json();
};

export const getAvailableRooms = async () => {
  const response = await fetch(`${API_BASE_URL}/rooms/available`);
  return response.json();
};

export const getRoomsByHostel = async (hostelName) => {
  const response = await fetch(`${API_BASE_URL}/rooms/hostel/${hostelName}`);
  return response.json();
};

// Allocation API functions
export const getAllAllocations = async () => {
  const response = await fetch(`${API_BASE_URL}/allocations`);
  return response.json();
};

export const createAllocation = async (allocationData) => {
  const response = await fetch(`${API_BASE_URL}/allocations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(allocationData),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return response.json();
};

export const deleteAllocation = async (allocId) => {
  const response = await fetch(`${API_BASE_URL}/allocations/${allocId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  
  return response;
};

// Staff API functions
export const getAllStaff = async () => {
  const response = await fetch(`${API_BASE_URL}/staff`);
  return response.json();
};

export const createStaff = async (staffData) => {
  const response = await fetch(`${API_BASE_URL}/staff`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(staffData),
  });
  return response.json();
};

// Visitor API functions
export const getAllVisitors = async () => {
  const response = await fetch(`${API_BASE_URL}/visitors`);
  return response.json();
};

export const createVisitor = async (visitorData) => {
  const response = await fetch(`${API_BASE_URL}/visitors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(visitorData),
  });
  return response.json();
};

// Complaint API functions
export const getAllComplaints = async () => {
  const response = await fetch(`${API_BASE_URL}/complaints`);
  return response.json();
};

export const createComplaint = async (complaintData) => {
  const response = await fetch(`${API_BASE_URL}/complaints`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(complaintData),
  });
  return response.json();
};

// Payment API functions
export const getAllPayments = async () => {
  const response = await fetch(`${API_BASE_URL}/payments`);
  return response.json();
};

export const createPayment = async (paymentData) => {
  const response = await fetch(`${API_BASE_URL}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });
  return response.json();
};

export default {
  listStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  getAllRooms,
  getAvailableRooms,
  getRoomsByHostel,
  getAllAllocations,
  createAllocation,
  deleteAllocation,
  getAllStaff,
  createStaff,
  getAllVisitors,
  createVisitor,
  getAllComplaints,
  createComplaint,
  getAllPayments,
  createPayment
};