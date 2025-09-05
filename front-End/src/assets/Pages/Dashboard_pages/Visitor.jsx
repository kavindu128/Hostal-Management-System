import React, { useState, useEffect } from 'react';

const VisitorPage = () => {
  const [visitors, setVisitors] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    relationToStudent: '',
    student: { regNo: '' }
  });

  const API_BASE_URL = 'http://localhost:8080/api';

 
  useEffect(() => {
    fetchVisitors();
    fetchStudents();
  }, []);

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/visitors`);
      if (response.ok) {
        const data = await response.json();
        setVisitors(data);
      } else {
        console.error('Failed to fetch visitors');
      }
    } catch (error) {
      console.error('Error fetching visitors:', error);
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
      const response = await fetch(`${API_BASE_URL}/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newVisitor = await response.json();
        setVisitors([...visitors, newVisitor]);
        setFormData({
          name: '',
          contact: '',
          relationToStudent: '',
          student: { regNo: '' }
        });
        alert('Visitor added successfully!');
      } else {
        const errorText = await response.text();
        alert('Failed to add visitor: ' + errorText);
      }
    } catch (error) {
      console.error('Error adding visitor:', error);
      alert('Error adding visitor');
    } finally {
      setLoading(false);
    }
  };

  const handleRecordExit = async (visitorId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/visitors/${visitorId}/exit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedVisitor = await response.json();
        setVisitors(visitors.map(visitor => 
          visitor.visitorId === updatedVisitor.visitorId ? updatedVisitor : visitor
        ));
        alert('Exit time recorded successfully!');
      } else {
        const errorText = await response.text();
        alert('Failed to record exit: ' + errorText);
      }
    } catch (error) {
      console.error('Error recording exit:', error);
      alert('Error recording exit');
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'N/A';
    return new Date(dateTime).toLocaleString();
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
      <h1 className="text-2xl font-bold mb-4">Visitor Management</h1>
      
     
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Add New Visitor</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Visitor Name</label>
            <input
              type="text"
              name="name"
              placeholder="Visitor Name"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              className="w-full p-2 border rounded"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Relation to Student</label>
            <input
              type="text"
              name="relationToStudent"
              placeholder="Relation to Student"
              className="w-full p-2 border rounded"
              value={formData.relationToStudent}
              onChange={handleChange}
              required
            />
          </div>
          
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
          
          <div className="md:col-span-2 lg:col-span-4">
            <button 
              type="submit" 
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
              disabled={loading}
            >
              {loading ? 'Adding Visitor...' : 'Add Visitor'}
            </button>
          </div>
        </form>
      </div>

     
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Visitor Log</h2>
        
        {visitors.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No visitors recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">Visitor Name</th>
                  <th className="py-2 px-4 border-b">Contact</th>
                  <th className="py-2 px-4 border-b">Relation</th>
                  <th className="py-2 px-4 border-b">Student Reg No</th>
                  <th className="py-2 px-4 border-b">Student Name</th>
                  <th className="py-2 px-4 border-b">Entry Time</th>
                  <th className="py-2 px-4 border-b">Exit Time</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor) => (
                  <tr key={visitor.visitorId}>
                    <td className="py-2 px-4 border-b">{visitor.name}</td>
                    <td className="py-2 px-4 border-b">{visitor.contact}</td>
                    <td className="py-2 px-4 border-b">{visitor.relationToStudent}</td>
                    <td className="py-2 px-4 border-b">{visitor.student?.regNo || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{visitor.student?.fullName || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{formatDateTime(visitor.entryTime)}</td>
                    <td className="py-2 px-4 border-b">{formatDateTime(visitor.exitTime)}</td>
                    <td className="py-2 px-4 border-b">
                      {!visitor.exitTime && (
                        <button
                          onClick={() => handleRecordExit(visitor.visitorId)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Record Exit
                        </button>
                      )}
                    </td>
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

export default VisitorPage;