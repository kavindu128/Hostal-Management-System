import { useEffect, useState } from "react";
import { listStudents, deleteStudent, updateStudent } from "../../../api";
import { Link } from "react-router-dom";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingRegNo, setEditingRegNo] = useState(null);
  const [editData, setEditData] = useState({
    fullName: "",
    dateOfBirth: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    emergencyContactName: "",
    emergencyContactNo: ""
  });

  const fetchStudents = async () => {
    try {
      const data = await listStudents();
      setStudents(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEditClick = (student) => {
    setEditingRegNo(student.regNo);
    setEditData({
      fullName: student.fullName || "",
      dateOfBirth: student.dateOfBirth ? student.dateOfBirth.split('T')[0] : "",
      addressLine1: student.addressLine1 || "",
      addressLine2: student.addressLine2 || "",
      city: student.city || "",
      emergencyContactName: student.emergencyContactName || "",
      emergencyContactNo: student.emergencyContactNo || ""
    });
  };

  const handleSaveClick = async (regNo) => {
    try {
      await updateStudent(regNo, editData);
      setEditingRegNo(null);
      fetchStudents(); 
    } catch (error) {
      console.error("Error updating student:", error);
      
      alert("Failed to update student. Check console for details.");
    }
  };

  const handleDelete = async (regNo) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(regNo);
        setStudents(students.filter((student) => student.regNo !== regNo));
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student. Check console for details.");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingRegNo(null);
  };

  const filteredStudents = Array.isArray(students)
    ? students.filter(
        (student) =>
          student.regNo.toLowerCase().includes(search.toLowerCase()) ||
          student.fullName.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="p-6" id="1">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      
      <div className="flex items-center mb-4 gap-4">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Register New Student
        </Link>
        <input
          type="text"
          placeholder="Search by Name or Reg No"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full max-w-md"
        />
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">REG NO</th>
              <th className="py-2 px-4 border-b">FULL NAME</th>
              <th className="py-2 px-4 border-b">DATE OF BIRTH</th>
              <th className="py-2 px-4 border-b w-64">ADDRESS</th>
              <th className="py-2 px-4 border-b">EMERGENCY CONTACT NAME</th>
              <th className="py-2 px-4 border-b">EMERGENCY CONTACT NUMBER</th>
              <th className="py-2 px-4 border-b">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.regNo}>
                  <td className="py-2 px-4 border-b">{student.regNo}</td>

                  
                  <td className="py-2 px-4 border-b">
                    {editingRegNo === student.regNo ? (
                      <input
                        type="text"
                        value={editData.fullName}
                        onChange={(e) =>
                          setEditData({ ...editData, fullName: e.target.value })
                        }
                        className="border p-1 w-full"
                      />
                    ) : (
                      student.fullName
                    )}
                  </td>

                 
                  <td className="py-2 px-4 border-b">
                    {editingRegNo === student.regNo ? (
                      <input
                        type="date"
                        value={editData.dateOfBirth}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            dateOfBirth: e.target.value
                          })
                        }
                        className="border p-1 w-full"
                      />
                    ) : (
                      student.dateOfBirth
                    )}
                  </td>

              
                  <td className="py-2 px-4 border-b w-64">
                    {editingRegNo === student.regNo ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Address Line 1"
                          value={editData.addressLine1}
                          onChange={(e) =>
                            setEditData({ ...editData, addressLine1: e.target.value })
                          }
                          className="border p-1 w-full"
                        />
                        <input
                          type="text"
                          placeholder="Address Line 2"
                          value={editData.addressLine2}
                          onChange={(e) =>
                            setEditData({ ...editData, addressLine2: e.target.value })
                          }
                          className="border p-1 w-full"
                        />
                        <input
                          type="text"
                          placeholder="City"
                          value={editData.city}
                          onChange={(e) =>
                            setEditData({ ...editData, city: e.target.value })
                          }
                          className="border p-1 w-full"
                        />
                      </div>
                    ) : (
                      `${student.addressLine1 || ''}, ${student.addressLine2 || ''}, ${student.city || ''}`
                    )}
                  </td>

                
                  <td className="py-2 px-4 border-b">
                    {editingRegNo === student.regNo ? (
                      <input
                        type="text"
                        value={editData.emergencyContactName}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            emergencyContactName: e.target.value
                          })
                        }
                        className="border p-1 w-full"
                      />
                    ) : (
                      student.emergencyContactName
                    )}
                  </td>

                
                  <td className="py-2 px-4 border-b">
                    {editingRegNo === student.regNo ? (
                      <input
                        type="text"
                        value={editData.emergencyContactNo}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            emergencyContactNo: e.target.value
                          })
                        }
                        className="border p-1 w-full"
                      />
                    ) : (
                      student.emergencyContactNo
                    )}
                  </td>

             
                  <td className="py-2 px-4 border-b">
                    {editingRegNo === student.regNo ? (
                      <>
                        <button
                          className="mr-2 text-green-600 hover:text-green-900 font-semibold"
                          onClick={() => handleSaveClick(student.regNo)}
                        >
                          Save
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 font-semibold"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="mr-2 text-blue-600 hover:text-blue-900 font-semibold"
                          onClick={() => handleEditClick(student)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 font-semibold"
                          onClick={() => handleDelete(student.regNo)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-2 px-4 border-b text-center text-gray-500"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsPage;