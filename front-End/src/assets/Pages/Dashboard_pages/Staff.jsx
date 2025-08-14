import React, { useState } from 'react';

const StaffPage = () => {
  const [staffMembers, setStaffMembers] = useState([
    { id: 1, name: 'Robert Johnson', position: 'Warden', contact: '555-1234' },
    { id: 2, name: 'Emily Chen', position: 'Security', contact: '555-5678' },
  ]);

  const handleDelete = (id) => {
    setStaffMembers(staffMembers.filter(staff => staff.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Staff Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Position</th>
              <th className="py-2 px-4 border-b">Contact</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.map((staff) => (
              <tr key={staff.id}>
                <td className="py-2 px-4 border-b">{staff.name}</td>
                <td className="py-2 px-4 border-b">{staff.position}</td>
                <td className="py-2 px-4 border-b">{staff.contact}</td>
                <td className="py-2 px-4 border-b">
                  <button className="mr-2 text-blue-600 hover:text-blue-900">Edit</button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(staff.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffPage;