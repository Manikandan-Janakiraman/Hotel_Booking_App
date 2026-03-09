// import React, { useState } from "react";
// import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// import ban1 from "../assets/attraction/ban1.png"
// import mahab from "../assets/attraction/mahab.png"
// import mum from "../assets/attraction/mum.png"
// import hyd from "../assets/attraction/hyd.png"
// import ban from "../assets/attraction/ban.png"

// const PopularDestination = () => {
//   const [index, setIndex] = useState(0);

//   const properties = [
//     {
//     //   title: "Chennai",
//       image: mahab,
//     },
//     {
//     //   title: "Bengaluru",
//       image: ban1,
//     },
//     {
//     //   title: "Mumbai",
//       image: mum,
//     },
//     {
//     //   title: "Hyderabad",
//       image: hyd,
//     },
//     {
//     //   title: "Hyderabad",
//       image: ban,
//     },
//   ];

//   const visibleCards = 4;
//   const cardWidth = 300;

//   const next = () => {
//     if (index < properties.length - visibleCards) {
//       setIndex(index + 1);
//     }
//   };

//   const prev = () => {
//     if (index > 0) {
//       setIndex(index - 1);
//     }
//   };

//   return (
//     <section className="px-10 py-16 bg-white relative overflow-hidden">

//       <h2 className="text-2xl font-semibold mb-8">
//         Popular Destination 
//       </h2>

//       {/* Arrows */}
//       <button
//         onClick={prev}
//         className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10"
//       >
//         <FaChevronLeft />
//       </button>

//       <button
//         onClick={next}
//         className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10"
//       >
//         <FaChevronRight />
//       </button>

//       {/* Slider Track */}
//       <div className="overflow-hidden">
//         <div
//           className="flex gap-6 transition-transform duration-500"
//           style={{
//             transform: `translateX(-${index * cardWidth}px)`,
//           }}
//         >
//           {properties.map((item, i) => (
//             <div key={i} className="w-[440px] flex-shrink-0">
//               <div className="relative rounded-2xl overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-[300px] object-cover"
//                 />

//                 <span className="absolute top-3 left-3 bg-white text-xs px-3 py-1 rounded-full shadow">
//                   Guest favourite
//                 </span>

//                 <div className="absolute top-3 right-3 bg-white/80 p-2 rounded-full">
//                   <FaHeart className="text-gray-600 text-sm" />
//                 </div>
//               </div>

//               <div className="mt-3">
//                 <h3 className="font-medium text-sm">{item.title}</h3>

//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PopularDestination;


import React, { useState, useEffect } from "react";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import ban1 from "../assets/attraction/ban1.png";
import mahab from "../assets/attraction/mahab.png";
import mum from "../assets/attraction/mum.png";
import hyd from "../assets/attraction/hyd.png";
import ban from "../assets/attraction/ban.png";

const PopularDestination = () => {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  const properties = [
    { image: mahab, title: "Mahabalipuram" },
    { image: ban1, title: "Bengaluru" },
    { image: mum, title: "Mumbai" },
    { image: hyd, title: "Hyderabad" },
    { image: ban, title: "Goa" },
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
        Popular Destination
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

export default PopularDestination;
