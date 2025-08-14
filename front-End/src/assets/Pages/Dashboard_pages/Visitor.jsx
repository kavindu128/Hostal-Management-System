import React, { useState } from 'react';

const VisitorPage = () => {
  const [visitors, setVisitors] = useState([
    { id: 1, name: 'Michael Brown', student: 'John Doe', purpose: 'Parent Visit', time: '10:30 AM' },
  ]);

  const [newVisitor, setNewVisitor] = useState({
    name: '',
    student: '',
    purpose: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVisitor(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setVisitors([...visitors, { ...newVisitor, id: Date.now(), time: currentTime }]);
    setNewVisitor({ name: '', student: '', purpose: '' });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Visitor Management</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Add New Visitor</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Visitor Name"
            className="p-2 border rounded"
            value={newVisitor.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="student"
            placeholder="Student Name"
            className="p-2 border rounded"
            value={newVisitor.student}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="purpose"
            placeholder="Purpose"
            className="p-2 border rounded"
            value={newVisitor.purpose}
            onChange={handleChange}
            required
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Visitor
          </button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <h2 className="text-xl font-semibold mb-3">Visitor Log</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Visitor</th>
              <th className="py-2 px-4 border-b">Student</th>
              <th className="py-2 px-4 border-b">Purpose</th>
              <th className="py-2 px-4 border-b">Time</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor.id}>
                <td className="py-2 px-4 border-b">{visitor.name}</td>
                <td className="py-2 px-4 border-b">{visitor.student}</td>
                <td className="py-2 px-4 border-b">{visitor.purpose}</td>
                <td className="py-2 px-4 border-b">{visitor.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorPage;