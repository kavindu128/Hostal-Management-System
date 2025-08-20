import React, { useState } from 'react';

const RoomPage = () => {
  const [allocations, setAllocations] = useState([
    { id: 1, student: 'John Doe', hostel: 'Hostel A', room: '101' },
    { id: 2, student: 'Jane Smith', hostel: 'Hostel B', room: '202' },
  ]);

  const [newAllocation, setNewAllocation] = useState({
    student: '',
    hostel: '',
    room: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAllocation(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllocations([...allocations, { ...newAllocation, id: Date.now() }]);
    setNewAllocation({ student: '', hostel: '', room: '' });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Room Allocation</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Allocate Room</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="regNo"
            placeholder="Registration Number"
            className="p-2 border rounded"
            value={newAllocation.regNo}
            onChange={handleChange}
            required
          />
          <select
            name="hostel"
            className="p-2 border rounded"
            value={newAllocation.hostel}
            onChange={handleChange}
            required
          >
            <option value="">Select Hostel</option>
            <option value="Hostel A">Hostel A</option>
            <option value="Hostel B">Hostel B</option>
            <option value="Hostel C">Hostel C</option>
            <option value="Hostel D">Hostel D</option>
            <option value="Hostel E">Hostel E</option>

          </select>
          <input
            type="text"
            name="room"
            placeholder="Room Number"
            className="p-2 border rounded"
            value={newAllocation.room}
            onChange={handleChange}
            required
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Allocate
          </button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <h2 className="text-xl font-semibold mb-3">Current Allocations</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Student</th>
              <th className="py-2 px-4 border-b">Hostel</th>
              <th className="py-2 px-4 border-b">Room</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((allocation) => (
              <tr key={allocation.id}>
                <td className="py-2 px-4 border-b">{allocation.student}</td>
                <td className="py-2 px-4 border-b">{allocation.hostel}</td>
                <td className="py-2 px-4 border-b">{allocation.room}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-red-600 hover:text-red-900">
                    Deallocate
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

export default RoomPage;