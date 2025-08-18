import React, { use, useEffect, useState } from 'react';
import { listStudents, deleteStudent } from "../../../api";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState(""); // Add search state


  // Show Students list
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

  const handleDelete = async (regNo) => {
  try {
    const res = await deleteStudent(regNo);
    if (res.status === 200 || res.status === 204) {
      setStudents(students.filter(student => student.regNo !== regNo));
    } else {
      alert('Delete failed on server!');
    }
  } catch (error) {
    console.error('Error deleting student:', error);
  }
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      <input
        type="text"
        placeholder="Search by Name or Reg No"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
                <th className="py-2 px-4 border-b">REG NO</th>
                <th className="py-2 px-4 border-b">FULL NAME</th>
                <th className="py-2 px-4 border-b">DATE OF BIRTH</th>
                <th className="py-2 px-4 border-b w-64">ADDRESS </th>
                <th className="py-2 px-4 border-b">EMERGENCY CONTACT NAME</th>
                <th className="py-2 px-4 border-b">EMERGENCY CONTACT NUMBER</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.regNo}>
                <td className="py-2 px-4 border-b">{student.regNo}</td>
                <td className="py-2 px-4 border-b">{student.fullName}</td>
                <td className="py-2 px-4 border-b">{student.dateOfBirth}</td>
                <td className="py-2 px-4 border-b w-64">{`${student.addressLine1}, ${student.addressLine2}, ${student.city}`}</td>
                <td className="py-2 px-4 border-b">{student.emergencyContactName}</td>
                <td className="py-2 px-4 border-b">{student.emergencyContactNo}</td>
                <td className="py-2 px-4 border-b">
                  <button className="mr-2 text-blue-600 hover:text-blue-900">Edit</button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(student.regNo)}
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