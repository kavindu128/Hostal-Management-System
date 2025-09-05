import React from "react";
import {createStudent } from "../../api"
import { useNavigate } from "react-router-dom";


const RegistrationPage = () => {


    const [formData, setFormData] = React.useState({
        fullName: '',
        regNo: '',
        contactNumber: '',
        dateOfBirth: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        emergencyContactName: '',
        emergencyContactNo: '',
    });

    const navigate = useNavigate();

    const saveFormData = (e) => {
        e.preventDefault();
        createStudent(formData)
            .then((response) => {
                console.log('Student created successfully:', response)
                navigate('/dashboard/students');
                
            })
            .catch((error) => {
                console.error('Error creating student:', error);
            });
    };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <form className="space-y-6" onSubmit={saveFormData}>
        
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Registration</h2>
          </div>

        
          <div className="flex items-center">
            <label className="w-1/3 font-semibold text-blue-900 text-lg">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="flex-grow bg-transparent rounded-lg px-4 py-2 text-lg text-black placeholder-gray-700 border border-gray-400"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

         
          <div className="flex items-center">
            <label className="w-1/3 font-semibold text-blue-900 text-lg">
              Reg No
            </label>
            <input
              type="text"
              placeholder="EG5016"
              className="flex-grow bg-transparent rounded-lg px-4 py-2 text-lg text-black placeholder-gray-700 border border-gray-400"
              value={formData.regNo}
              onChange={(e) => setFormData({ ...formData, regNo: e.target.value })} 
            />
          </div>

          
          <div className="flex items-center">
            <label className="w-1/3 font-semibold text-blue-900 text-lg">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="+94XXXXXXXXX"
              className="flex-grow bg-transparent rounded-lg px-4 py-2 text-lg text-black placeholder-gray-700 border border-gray-400"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            />
          </div>

          
          <div className="flex items-center">
            <label className="w-1/3 font-semibold text-blue-900 text-lg">
              Date of Birth
            </label>
            <input
              type="date"
              className="flex-grow bg-transparent rounded-lg px-4 py-2 text-lg text-black border border-gray-400"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            />
          </div>

          
          <div className="flex items-start">
            <label className="w-1/3 font-semibold text-blue-900 text-lg">
              Address
            </label>
            <div className="flex-grow space-y-4">
              <input
                type="text"
                placeholder="House No / Apartment"
                className="w-full bg-transparent rounded-lg px-4 py-2 text-lg text-black placeholder-gray-700 border border-gray-400"
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              />
              <input
                type="text"
                placeholder="Street"
                className="w-full bg-transparent rounded-lg px-4 py-2 text-lg text-black placeholder-gray-700 border border-gray-400"
                value={formData.addressLine2}
                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
              />
              <input
                type="text"
                placeholder="City"
                className="w-full bg-transparent rounded-lg px-4 py-2 text-lg text-black placeholder-gray-700 border border-gray-400"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>

         
          <div className="flex items-center">
            <label className="w-1/3 font-semibold text-blue-900 text-lg">
              Emergency Contact Name
            </label>
            <input
              type="text"
              placeholder="Enter emergency contact name"
              className="flex-grow bg-transparent rounded-lg px-4 py-2 text-lg text-black placeholder-gray-700 border border-gray-400"
              value={formData.emergencyContactName}
              onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
            />
          </div>

          
          <div className="flex items-center">
            <label className="w-1/3 font-semibold text-blue-900 text-lg">
              Emergency Contact Number
            </label>
            <input
              type="text"
              placeholder="+94XXXXXXXXX"
              className="flex-grow bg-transparent rounded-lg px-4 py-2 text-lg text-black placeholder-gray-700 border border-gray-400"
              value={formData.emergencyContactNo}
              onChange={(e) => setFormData({ ...formData, emergencyContactNo: e.target.value })}
            />
          </div>

          
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-10 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-full hover:opacity-90"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
  );
};

export default RegistrationPage;
