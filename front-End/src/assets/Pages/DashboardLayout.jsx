
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/sidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <Outlet /> {/* This is where the selected route content will load */}
      </div>
    </div>
  );
};

export default DashboardLayout;
