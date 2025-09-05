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

  const API_BASE_URL = 'http://localhost:8080/api';

  
  const fetchData = async () => {
    try {
      setLoading(true);
      
      
      const allocationsResponse = await fetch(`${API_BASE_URL}/allocations`);
      if (!allocationsResponse.ok) throw new Error('Failed to fetch allocations');
      const allocationsData = await allocationsResponse.json();
      
     
      const studentsResponse = await fetch(`${API_BASE_URL}/students`);
      if (!studentsResponse.ok) throw new Error('Failed to fetch students');
      const studentsData = await studentsResponse.json();
      
      
      const roomsResponse = await fetch(`${API_BASE_URL}/rooms`);
      if (!roomsResponse.ok) throw new Error('Failed to fetch rooms');
      const roomsData = await roomsResponse.json();
      
      setAllocations(allocationsData);
      setStudents(studentsData);
      setAvailableRooms(roomsData);
      
      
      const uniqueHostels = [...new Set(roomsData.map(room => room.hostelName))];
      setHostels(uniqueHostels);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error loading data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHostelChange = (e) => {
    const hostelName = e.target.value;
    setFormData(prev => ({ ...prev, hostelName, roomNo: '' }));
    
    if (hostelName) {
      const roomsForHostel = availableRooms.filter(room => 
        room.hostelName === hostelName && room.status === 'AVAILABLE'
      );
      setFilteredRooms(roomsForHostel);
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
    
    if (!formData.regNo || !formData.roomNo || !formData.dateFrom) {
      alert('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      
      const allocationData = {
        regNo: formData.regNo,
        roomNo: formData.roomNo,
        dateFrom: formData.dateFrom,
        dateTo: formData.dateTo || null
      };

      const response = await fetch(`${API_BASE_URL}/allocations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allocationData),
      });

      if (response.ok) {
       
        setFormData({
          regNo: '',
          hostelName: '',
          roomNo: '',
          dateFrom: '',
          dateTo: '',
          status: 'ACTIVE'
        });
        
       
        await fetchData();
        alert('Room allocated successfully!');
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error('Error allocating room:', error);
      alert('Failed to allocate room: ' + error.message);
    } finally {
      setLoading(false);
    }
  };



const handleDeallocate = async (allocId) => {
  if (!window.confirm('Are you sure you want to deallocate this room?')) {
    return;
  }
  
  try {
    // Fixed API endpoint and method
    const response = await fetch(`${API_BASE_URL}/allocations/${allocId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Refresh the data
      await fetchData();
      alert('Room deallocated successfully!');
    } else {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to deallocate room');
    }
  } catch (error) {
    console.error('Error deallocating room:', error);
    alert('Failed to deallocate room: ' + error.message);
  }
};



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
                  <th className="py-2 px-4 border-b">ID</th>
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
                    <td className="py-2 px-4 border-b">{allocation.allocId}</td>
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
                      {allocation.dateTo || 'N/A'}
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
                        className="text-red-600 hover:text-red-900 px-2 py-1 border border-red-300 rounded hover:bg-red-50 transition-colors"
                        disabled={loading}
                      >
                        {loading ? 'Deallocating...' : 'Deallocate'}
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