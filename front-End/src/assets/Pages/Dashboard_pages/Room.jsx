import React, { useState, useEffect } from 'react';

const RoomPage = () => {
  const [allocations, setAllocations] = useState([]);
  const [students, setStudents] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    regNo: '',
    hostelName: '',
    roomNo: '',
    dateFrom: '',
    dateTo: '',
    status: 'ACTIVE'
  });

  // API Base URL
  const API_BASE_URL = 'http://localhost:8080/api';

  // API Functions
  const getAllAllocations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/allocations`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching allocations:', error);
      throw error;
    }
  };

  const createAllocation = async (allocationData) => {
    try {
      console.log('Sending allocation data:', allocationData);
      
      const response = await fetch(`${API_BASE_URL}/allocations`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allocationData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating allocation:', error);
      throw error;
    }
  };

  const deleteAllocation = async (allocId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/allocations/${allocId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      console.error('Error deleting allocation:', error);
      throw error;
    }
  };

  const listStudents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  };

  const getAvailableRooms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/available`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching available rooms:', error);
      throw error;
    }
  };

  const getRoomsByHostel = async (hostelName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/hostel/${hostelName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching rooms by hostel:', error);
      throw error;
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [allocationsData, studentsData, roomsData] = await Promise.all([
        getAllAllocations(),
        listStudents(),
        getAvailableRooms()
      ]);
      
      setAllocations(allocationsData);
      setStudents(studentsData);
      setAvailableRooms(roomsData);
      
      // Extract unique hostel names
      const uniqueHostels = [...new Set(roomsData.map(room => room.hostelName))];
      setHostels(uniqueHostels);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please check your backend server.');
    } finally {
      setLoading(false);
    }
  };

  const handleHostelChange = async (e) => {
    const hostelName = e.target.value;
    setFormData(prev => ({ ...prev, hostelName, roomNo: '' }));
    
    if (hostelName) {
      try {
        // Fetch rooms for the selected hostel
        const rooms = await getRoomsByHostel(hostelName);
        setFilteredRooms(rooms.filter(room => room.status === 'AVAILABLE'));
      } catch (error) {
        console.error('Error fetching rooms by hostel:', error);
      }
    } else {
      setFilteredRooms([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  // Transform the data to match what the backend expects
  const backendData = {
    regNo: newAllocation.studentRegNo,
    roomNo: newAllocation.roomNo,
    dateFrom: newAllocation.dateFrom,
    dateTo: newAllocation.dateTo
    // Note: If your backend doesn't expect a status field, don't include it
  };

  try {
    const response = await fetch('http://localhost:8080/api/allocations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendData),
    });

    if (response.ok) {
      setSuccess('Room allocated successfully!');
      setNewAllocation({
        studentRegNo: '',
        roomNo: '',
        dateFrom: new Date().toISOString().split('T')[0],
        dateTo: '',
        status: 'Active'
      });
      onClose();
      fetchAllocations(); // Refresh the allocations list
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Failed to allocate room');
    }
  } catch (error) {
    setError('Error allocating room: ' + error.message);
  }
};

  const handleDeallocate = async (allocId) => {
    if (!window.confirm('Are you sure you want to deallocate this room?')) {
      return;
    }
    
    try {
      setLoading(true);
      await deleteAllocation(allocId);
      
      // Update local state
      setAllocations(allocations.filter(allocation => allocation.allocId !== allocId));
      
      alert('Room deallocated successfully!');
    } catch (error) {
      console.error('Error deleting allocation:', error);
      alert('Failed to deallocate room');
    } finally {
      setLoading(false);
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
      <h1 className="text-2xl font-bold mb-4">Room Allocation</h1>
      
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Allocate Room</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Student</label>
            <select
              name="regNo"
              className="w-full p-2 border rounded"
              value={formData.regNo}
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
            <label className="block text-sm font-medium mb-1">Hostel</label>
            <select
              name="hostelName"
              className="w-full p-2 border rounded"
              value={formData.hostelName}
              onChange={handleHostelChange}
              required
            >
              <option value="">Select Hostel</option>
              {hostels.map(hostel => (
                <option key={hostel} value={hostel}>
                  {hostel}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Room</label>
            <select
              name="roomNo"
              className="w-full p-2 border rounded"
              value={formData.roomNo}
              onChange={handleChange}
              required
              disabled={!formData.hostelName}
            >
              <option value="">Select Room</option>
              {filteredRooms.map(room => (
                <option key={room.roomNo} value={room.roomNo}>
                  {room.roomNo} (Capacity: {room.capacity})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">From Date</label>
            <input
              type="date"
              name="dateFrom"
              className="w-full p-2 border rounded"
              value={formData.dateFrom}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">To Date</label>
            <input
              type="date"
              name="dateTo"
              className="w-full p-2 border rounded"
              value={formData.dateTo}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex items-end lg:col-span-5">
            <button 
              type="submit" 
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full md:w-auto px-8"
              disabled={loading}
            >
              {loading ? 'Allocating...' : 'Allocate Room'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Current Allocations</h2>
        {allocations.length === 0 ? (
          <p className="text-gray-500">No room allocations found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Student</th>
                  <th className="py-2 px-4 border-b">Registration No</th>
                  <th className="py-2 px-4 border-b">Hostel</th>
                  <th className="py-2 px-4 border-b">Room</th>
                  <th className="py-2 px-4 border-b">From Date</th>
                  <th className="py-2 px-4 border-b">To Date</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allocations.map((allocation) => (
                  <tr key={allocation.allocId}>
                    <td className="py-2 px-4 border-b">
                      {allocation.student?.fullName || 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {allocation.student?.regNo || 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {allocation.room?.hostelName || 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {allocation.room?.roomNo || 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {allocation.dateFrom}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {allocation.dateTo}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded text-xs ${
                        allocation.status === 'ACTIVE' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {allocation.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button 
                        onClick={() => handleDeallocate(allocation.allocId)}
                        className="text-red-600 hover:text-red-900 px-2 py-1 border border-red-300 rounded hover:bg-red-50"
                        disabled={loading}
                      >
                        Deallocate
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

export default RoomPage;