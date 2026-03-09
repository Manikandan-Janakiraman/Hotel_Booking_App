
import React, { useState, useEffect } from "react";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import r1 from "../assets/r1.png";
import r2 from "../assets/r2.png";
import r3 from "../assets/r3.png";
import r4 from "../assets/r4.png";
import r5 from "../assets/r1.png";

const Hotels = () => {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  const properties = [
    { image: r1, title: "FAB Hotels" },
    { image: r2, title: "ITC Hotel" },
    { image: r3, title: "GRT Hotel" },
    { image: r4, title: "Taj Hotel" },
    { image: r5, title: "The Park" },
  ];

  // Responsive card count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2); // Tablet
      } else {
        setVisibleCards(4); // Desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    if (index < properties.length - visibleCards) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section className="px-4 md:px-10 py-12 bg-white relative overflow-hidden">
      <h2 className="text-xl md:text-2xl font-semibold mb-8">
        Popular Hotels
      </h2>

      {/* Arrows (hide on small mobile if needed) */}
      {visibleCards < properties.length && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 
             bg-white shadow-md p-2 md:p-3 
             rounded-full z-10"
          >
            <FaChevronLeft className="text-sm md:text-base" />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 
             bg-white shadow-md p-2 md:p-3 
             rounded-full z-10"
          >
            <FaChevronRight className="text-sm md:text-base" />
          </button>

        </>
      )}

      {/* Slider */}
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500"
          style={{
            transform: `translateX(-${(index * 100) / visibleCards}%)`,
          }}
        >
          {properties.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{ width: `${100 / visibleCards}%` }}
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[250px] md:h-[300px] object-cover"
                />

                <span className="absolute top-3 left-3 bg-white text-xs px-3 py-1 rounded-full shadow">
                  Guest favourite
                </span>

                <div className="absolute top-3 right-3 bg-white/80 p-2 rounded-full">
                  <FaHeart className="text-gray-600 text-sm" />
                </div>
              </div>

              <div className="mt-3">
                <h3 className="font-medium text-sm md:text-base">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hotels;