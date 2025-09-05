import React from 'react';

const HomeHostelCard = ({ name, image }) => {
  return (
    <div className="group relative rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl h-full">
     
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      </div>
      
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <h3 className="text-2xl font-bold text-white drop-shadow-lg">{name}</h3>
      </div>

     
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
        <button className="px-6 py-2 bg-white text-blue-700 font-semibold rounded-full shadow-md hover:bg-blue-50 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default HomeHostelCard;
