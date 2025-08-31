import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const buttons = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Student', path: '/dashboard/students', icon: '👨‍🎓' },
    { label: 'Staff', path: '/dashboard/staff', icon: '👨‍💼' },
    { label: 'Room', path: '/dashboard/room', icon: '🏠' },
    { label: 'Visitor', path: '/dashboard/visitor', icon: '👥' },
    { label: 'Complaint', path: '/dashboard/complaint', icon: '📝' },
    { label: 'Payment', path: '/dashboard/payment', icon: '💳' },
  ];

  return (
    <div className="w-full md:w-64 bg-gradient-to-b from-blue-700 to-blue-800 p-4 space-y-2 shadow-lg">
      <div className="p-4 mb-4">
        <h2 className="text-xl font-bold text-white text-center">HostelMS Dashboard</h2>
        <p className="text-blue-200 text-xs text-center mt-1">Management Portal</p>
      </div>
      
      {buttons.map((button) => (
        <NavLink
          key={button.path}
          to={button.path}
          end={button.path === '/dashboard'}
          className={({ isActive }) => 
            `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive 
                ? 'bg-white text-blue-700 shadow-md' 
                : 'text-blue-100 hover:bg-blue-600 hover:text-white'
            }`
          }
        >
          <span className="text-lg mr-3">{button.icon}</span>
          <span className="font-medium">{button.label}</span>
        </NavLink>
      ))}
      
      {/* System Status */}
      <div className="mt-8 p-4 bg-blue-900 bg-opacity-50 rounded-lg">
        <h3 className="text-sm font-semibold text-cyan-300 mb-2">System Status</h3>
        <div className="flex items-center text-green-300 text-xs">
          <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
          All systems operational
        </div>
        <div className="mt-2 text-blue-200 text-xs">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;