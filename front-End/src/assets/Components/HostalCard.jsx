import React from 'react';

const HostelCard = ({ name, studentCount }) => {
  return (

<div className="relative group bg-gradient-to-br from-blue-400 to-cyan-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
    
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 bg-white rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 -mb-12 -ml-12 bg-white rounded-full"></div>
      </div>
      
     
      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-3 tracking-wide">{name}</h2>
        <p className="text-5xl font-extrabold mb-1 drop-shadow-md">{studentCount}</p>
        <p className="text-indigo-100 font-medium text-sm uppercase tracking-wider">Students</p>
      </div>
      
     
      <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
        </svg>
      </div>
      
     
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute -inset-full group-hover:inset-x-0 opacity-30 group-hover:opacity-50 transition-all duration-700 bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>
    </div>
  );
};

export default HostelCard;