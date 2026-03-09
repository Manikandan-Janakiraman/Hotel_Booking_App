import React from "react";

const AttractionCard = ({ title, image, places }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden w-full max-w-sm">
      
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover"
      />

      {/* Content */}
      <div className="p-6 flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {title}
        </h2>

        <ul className="text-gray-600 text-sm space-y-1">
          {places.map((place, index) => (
            <li key={index}>• {place}</li>
          ))}
        </ul>

        <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl transition duration-300">
          Get More Details
        </button>
      </div>
    </div>
  );
};

export default AttractionCard;
