import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const buttons = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Student', path: '/dashboard/students' },
    { label: 'Staff', path: '/dashboard/staff' },
    { label: 'Room', path: '/dashboard/room' },
    { label: 'Visitor', path: '/dashboard/visitor' },
    { label: 'Complaint', path: '/dashboard/complaint' },
    { label: 'Payment', path: '/dashboardlayout/payment' },
  ];

  return (
    <div className="w-full md:w-1/5 bg-gradient-to-b from-blue-400 to-blue-500 p-4 space-y-4">
      {buttons.map((button) => (
        <NavLink
          key={button.path}
          to={button.path}
          className={({ isActive }) => 
            `block w-full text-center font-bold py-2 rounded-md transition ${
              isActive 
                ? 'bg-blue-700 text-white' 
                : 'bg-white text-blue-700 hover:bg-blue-600 hover:text-white'
            }`
          }
        >
          {button.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;