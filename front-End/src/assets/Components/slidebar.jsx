import React from 'react';

const Sidebar = () => {
  const buttons = ['Student', 'Staff', 'Room', 'Visitor', 'Complaint', 'Payment'];

  return (
    <div className="w-full md:w-1/5 bg-gradient-to-b from-blue-400 to-blue-500 p-4 space-y-4">
      {buttons.map((label, index) => (
        <button
          key={index}
          className="w-full bg-white text-blue-700 font-bold py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
