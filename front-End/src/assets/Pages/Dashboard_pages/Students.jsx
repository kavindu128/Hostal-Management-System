import React, { use, useEffect, useState } from 'react';
import { listStudents } from '../../api'; // Adjust the import based on your API file structure

const StudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await listStudents();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
                <th className="py-2 px-4 border-b">REG NO</th>
                <th className="py-2 px-4 border-b">FULL NAME</th>
                <th className="py-2 px-4 border-b">DATE OF BIRTH</th>
                <th className="py-2 px-4 border-b">ADDRESS LINE 1</th>
                <th className="py-2 px-4 border-b">ADDRESS LINE 2</th>
                <th className="py-2 px-4 border-b">CITY</th>
                <th className="py-2 px-4 border-b">EMERGENCY CONTACT NAME</th>
                <th className="py-2 px-4 border-b">EMERGENCY CONTACT NUMBER</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="py-2 px-4 border-b">{student.regNo}</td>
                <td className="py-2 px-4 border-b">{student.fullName}</td>
                <td className="py-2 px-4 border-b">{student.dateOfBirth}</td>
                <td className="py-2 px-4 border-b">{student.addressLine1}</td>
                <td className="py-2 px-4 border-b">{student.addressLine2}</td>
                <td className="py-2 px-4 border-b">{student.city}</td>
                <td className="py-2 px-4 border-b">{student.emergencyContactName}</td>
                <td className="py-2 px-4 border-b">{student.emergencyContactNo}</td>
                <td className="py-2 px-4 border-b">
                  <button className="mr-2 text-blue-600 hover:text-blue-900">Edit</button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(student.id)}
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

export default StudentsPage;