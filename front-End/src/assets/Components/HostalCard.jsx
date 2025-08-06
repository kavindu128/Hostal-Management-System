import React from 'react';

const HostelCard = ({ name, studentCount }) => {
  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-600 text-blue-900 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 text-center">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-4xl font-extrabold">{studentCount}</p>
      <p className="mt-1 font-semibold">Students</p>
    </div>
  );
};

export default HostelCard;
