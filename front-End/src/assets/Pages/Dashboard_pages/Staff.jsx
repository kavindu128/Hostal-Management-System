import React, { useState, useEffect } from 'react';

const StaffPage = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    regNo: '',
    name: '',
    position: '',
    contact: ''
  });

 
  const positionOptions = [
    'Warden',
    'Academic Sub Warden',
    'Non Academic Sub Warden',
    'Security Officer',
    'Maintenance Supervisor',
    'Cleanliness Incharge',
    'Administrative Officer'
  ];

  const API_BASE_URL = 'http://localhost:8080/api';

  
  useEffect(() => {
    fetchStaffMembers();
  }, []);

  const fetchStaffMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/staff`);
      if (response.ok) {
        const data = await response.json();
        setStaffMembers(data);
      } else {
        console.error('Failed to fetch staff members');
      }
    } catch (error) {
      console.error('Error fetching staff members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/staff`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newStaff = await response.json();
        setStaffMembers([...staffMembers, newStaff]);
        setFormData({
          regNo: '',
          name: '',
          position: '',
          contact: ''
        });
        alert('Staff member added successfully!');
      } else {
        const errorText = await response.text();
        alert('Failed to add staff member: ' + errorText);
      }
    } catch (error) {
      console.error('Error adding staff member:', error);
      alert('Error adding staff member');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (regNo) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/staff/${regNo}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setStaffMembers(staffMembers.filter(staff => staff.regNo !== regNo));
        alert('Staff member deleted successfully!');
      } else {
        const errorText = await response.text();
        alert('Failed to delete staff member: ' + errorText);
      }
    } catch (error) {
      console.error('Error deleting staff member:', error);
      alert('Error deleting staff member');
    }
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
      <h1 className="text-2xl font-bold mb-4">Staff Management</h1>
      
     
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Add New Staff Member</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Registration Number</label>
            <input
              type="text"
              name="regNo"
              placeholder="Staff Registration Number"
              className="w-full p-2 border rounded"
              value={formData.regNo}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Position</label>
            <select
              name="position"
              className="w-full p-2 border rounded"
              value={formData.position}
              onChange={handleChange}
              required
            >
              <option value="">Select Position</option>
              {positionOptions.map(position => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
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
          
          <div className="md:col-span-2">
            <button 
              type="submit" 
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
              disabled={loading}
            >
              {loading ? 'Adding Staff...' : 'Add Staff Member'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Staff Members</h2>
        
        {staffMembers.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No staff members found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">Reg No</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Position</th>
                  <th className="py-2 px-4 border-b">Contact</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffMembers.map((staff) => (
                  <tr key={staff.regNo}>
                    <td className="py-2 px-4 border-b">{staff.regNo}</td>
                    <td className="py-2 px-4 border-b">{staff.name}</td>
                    <td className="py-2 px-4 border-b">{staff.position}</td>
                    <td className="py-2 px-4 border-b">{staff.contact}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleDelete(staff.regNo)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
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

export default StaffPage;