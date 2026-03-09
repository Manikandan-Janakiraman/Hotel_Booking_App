import React from "react";
import g1 from "../assets/gallery/g1.png";
import g2 from "../assets/gallery/g2.png";
import g3 from "../assets/gallery/g3.png";
import g4 from "../assets/gallery/g4.png";
import g5 from "../assets/gallery/g5.png";
import g6 from "../assets/gallery/g6.png";
import g7 from "../assets/gallery/g7.png";
import g8 from "../assets/gallery/g8.png";

const Gallery = () => {
  const images = [g1, g8, g3, g4, g5, g6, g7, g2];

  return (
    <section className="px-4 md:px-10 py-12 bg-white">
      
      {/* Title */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Gallery
        </h2>
      </div>

      {/* Responsive Grid */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-4 
        gap-4
      ">
        {images.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl shadow-md group"
          >
            <img
              src={img}
              alt="Gallery"
              className="w-full h-60 object-cover 
                         transition-transform duration-500 
                         group-hover:scale-110"
            />
          </div>
        ))}
      </div>

    </section>
  );
};

export default Gallery;
