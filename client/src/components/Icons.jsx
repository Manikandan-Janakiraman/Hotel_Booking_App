// import React from 'react'
// import { FaWifi } from "react-icons/fa";
// import { MdTv } from "react-icons/md";
// import { TbAirConditioning } from "react-icons/tb";
// import { PiSecurityCamera } from "react-icons/pi";
// import { PiTowel } from "react-icons/pi";
// import { BiShower } from "react-icons/bi";
// import { TbHotelService } from "react-icons/tb";




// const Icons = () => {
//     return (
//         <>

//             <div className='bg-red-500'>

//                 <div className='flex flex-row justify-center gap-8 items-center p-4'>
//                     <FaWifi className='border-white text-white w-20 h-20 p-4' />
//                     <p className='text-white'>Free WiFi</p> 

//                     <MdTv className='border-white text-white  w-20 h-20 p-4' />
//                     <p className='text-white'>  Television</p>

//                     <PiSecurityCamera className='border-white rounded-full text-white w-20 h-20 p-4' />
//                     <p className='text-white'> Security</p>

//                     <PiTowel className='border-white rounded-full text-white w-20 h-20 p-4' />
//                     <p className='text-white'>  Towel</p>

//                     <BiShower className='border-white rounded-full text-white w-20 h-20 p-4' />
//                     <p className='text-white'> Hot Water</p>

//                     <TbHotelService className='border-white rounded-full text-white w-20 h-20 p-4' />
//                     <p className='text-white'>  Room Service </p>

//                      <TbAirConditioning className='border-white rounded-full text-white w-20 h-20 p-4' />
//                     <p className='text-white'> Air Conditioner</p>

//                 </div>

//             </div>

//         </>
//     )
// }

// export default Icons


import React from "react";
import { FaWifi } from "react-icons/fa";
import { MdTv } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { PiSecurityCamera, PiTowel } from "react-icons/pi";
import { BiShower } from "react-icons/bi";
import { TbHotelService } from "react-icons/tb";

const Icons = () => {
  const facilities = [
    { icon: <FaWifi />, name: "Free WiFi" },
    { icon: <MdTv />, name: "Television" },
    { icon: <PiSecurityCamera />, name: "Security" },
    { icon: <PiTowel />, name: "Towel" },
    { icon: <BiShower />, name: "Hot Water" },
    { icon: <TbHotelService />, name: "Room Service" },
    { icon: <TbAirConditioning />, name: "Air Conditioner" },
  ];

  return (
    <div className="bg-red-500 py-6 overflow-hidden">
      
      {/* MOBILE AUTO SLIDER */}
      <div className="flex md:hidden animate-slide whitespace-nowrap">
        {[...facilities, ...facilities].map((item, index) => (
          <div
            key={index}
            className="min-w-[120px] flex flex-col items-center text-white mx-6"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <p className="text-sm">{item.name}</p>
          </div>
        ))}
      </div>

      {/* TABLET + DESKTOP GRID */}
      <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-7 gap-6 px-6 text-center">
        {facilities.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-white">
            <div className="text-4xl mb-2">{item.icon}</div>
            <p className="text-sm">{item.name}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Icons;
