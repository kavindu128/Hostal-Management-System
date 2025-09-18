import React from 'react';
import HostelCard from '../Components/HostalCard';


const DashboardPage = () => {
  const hostels = [
    { name: 'Hostel A', studentCount: 345 },
    { name: 'Hostel B', studentCount: 254 },
    { name: 'Hostel C', studentCount: 156 },
    { name: 'Hostel D', studentCount: 451 },
    { name: 'Hostel E', studentCount: 387 },
    { name: 'Hostel F', studentCount: 256 },
    
  ];

   return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="Dashboard">
      {hostels.map((hostel, index) => (
        <HostelCard key={index} name={hostel.name} studentCount={hostel.studentCount} />
      ))}
    </div>
  );
};

export default DashboardPage;
