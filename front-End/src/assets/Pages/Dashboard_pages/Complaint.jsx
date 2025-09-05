import React, { useState, useEffect } from 'react';

const ComplaintPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    student: { regNo: '' }
  });

  const API_BASE_URL = 'http://localhost:8080/api';

  
  useEffect(() => {
    fetchComplaints();
    fetchStudents();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/complaints`);
      if (response.ok) {
        const data = await response.json();
        setComplaints(data);
      } else {
        console.error('Failed to fetch complaints');
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error('Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'regNo') {
      setFormData(prev => ({
        ...prev,
        student: { regNo: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/complaints`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newComplaint = await response.json();
        setComplaints([...complaints, newComplaint]);
        setFormData({
          description: '',
          student: { regNo: '' }
        });
        alert('Complaint submitted successfully!');
      } else {
        const errorText = await response.text();
        alert('Failed to submit complaint: ' + errorText);
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Error submitting complaint');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Complaint Management</h1>
      
     
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Submit New Complaint</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Student</label>
            <select
              name="regNo"
              className="w-full p-2 border rounded"
              value={formData.student.regNo}
              onChange={handleChange}
              required
            >
              <option value="">Select Student</option>
              {students.map(student => (
                <option key={student.regNo} value={student.regNo}>
                  {student.regNo} - {student.fullName}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Complaint Description</label>
            <textarea
              name="description"
              placeholder="Describe your complaint in detail"
              className="w-full p-2 border rounded h-32"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <button 
              type="submit" 
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
              disabled={loading}
            >
              {loading ? 'Submitting Complaint...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>

     
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Complaint History</h2>
        
        {complaints.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No complaints submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">Complaint ID</th>
                  <th className="py-2 px-4 border-b">Student Reg No</th>
                  <th className="py-2 px-4 border-b">Student Name</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.complaintId}>
                    <td className="py-2 px-4 border-b">{complaint.complaintId}</td>
                    <td className="py-2 px-4 border-b">{complaint.student?.regNo || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{complaint.student?.fullName || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{complaint.description}</td>
                    <td className="py-2 px-4 border-b">{formatDate(complaint.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintPage;