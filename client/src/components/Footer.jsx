// import React from 'react'
// import { Link } from 'react-router-dom'

// const Footer = () => {

//     const cities = [
//         { name: "Chennai", route: "/chennai" },
//         { name: "Mumbai", route: "/mumbai" },
//         { name: "Hyderabad", route: "/hyderabad" },
//         { name: "Pune", route: "/pune" },
//         { name: "Kolkata", route: "/kolkata" },
//     ];

//     const support = [
//         { name: "Help Centre", route: "/helpcentre" },
//         { name: "Get help with a safety issue", route: "/" },
//         { name: "AirCover", route: "/" },
//         { name: "Anti-discrimination", route: "/" },
//         { name: "Disability support", route: "/" },
//         { name: "Cancellation options", route: "/" },
//         { name: "Report neighbourhood concern", route: "/" },

//     ];

//     const room = [
//         { name: "Single Room", route: "/" },
//         { name: "Double Room", route: "/" },
//         { name: "Executive", route: "/" },
//         { name: "Business Class", route: "/" },
//     ]

//     const nest = [
//         { name: "Summer Release", route: "/" },
//         { name: "Newsroom", route: "/" },
//         { name: "Career", route: "/" },
//         { name: "Investors", route: "/" },
//         { name: "Emergency", route: "/login" },
//     ]

//     return (
//         <>

//             <div className='bg-gray-100 grid grid-cols-4 gap-4 p-20'>

//                 <div className='flex flex-col p-10 gap-2'>
//                     <h2 className='text-red-400 font-bold text-xl'>Support</h2>
//                     {support.map(({ name, route }) => (
//                         <Link key={name} route={route} className="text-gray-700">
//                             {name}
//                         </Link>
//                     ))}
//                 </div>

//                 <div className='flex flex-col p-10 gap-2'>
//                     <h2 className='text-red-400 font-bold text-xl'>Popular Destinations</h2>
//                     {cities.map(({ name, route }) => (
//                         <Link key={name} route={route} className="text-gray-700">
//                             {name}
//                         </Link>
//                     ))}
//                 </div>

//                 <div className='flex flex-col p-10 gap-2'>
//                     <h2 className='text-red-400 font-bold text-xl'>Budget Rooms</h2>
//                     {room.map(({ name, route }) => (
//                         <Link key={name} route={route} className='text-gray-700'>
//                             {name}
//                         </Link>
//                     ))}
//                 </div>


//                 <div className='flex flex-col p-10 gap-2'>
//                     <h2 className='text-red-400 font-bold text-xl'>Urban Nest</h2>
//                     {nest.map(({ name, route }) => (
//                         <Link key={name} route={route} className='text-gray-700'>
//                             {name}
//                         </Link>
//                     ))}
//                 </div>

//                 <div className='flex flex-row justify-center items-center text-gray-600'>
//                     <p>&copy; 2026.UrbanNest. All Copyrights Reserved.</p>
//                 </div>

//             </div>




//         </>
//     )
// }

// export default Footer

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const cities = [
    { name: "Chennai", route: "/chennai" },
    { name: "Mumbai", route: "/mumbai" },
    { name: "Hyderabad", route: "/hyderabad" },
    { name: "Pune", route: "/pune" },
    { name: "Kolkata", route: "/kolkata" },
  ];

  const support = [
    { name: "Help Centre", route: "/helpcentre" },
    { name: "Safety Information", route: "/" },
    { name: "AirCover", route: "/" },
    { name: "Anti-discrimination", route: "/" },
    { name: "Disability support", route: "/" },
    { name: "Cancellation options", route: "/" },
    { name: "Report concern", route: "/" },
  ];

  const room = [
    { name: "Single Room", route: "/" },
    { name: "Double Room", route: "/" },
    { name: "Executive Suite", route: "/" },
    { name: "Business Class", route: "/" },
  ];

  const nest = [
    { name: "Summer Release", route: "/" },
    { name: "Newsroom", route: "/" },
    { name: "Career", route: "/" },
    { name: "Investors", route: "/" },
    { name: "Emergency", route: "/login" },
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Support */}
        <div>
          <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
            Support
          </h2>
          <div className="flex flex-col space-y-2">
            {support.map(({ name, route }) => (
              <Link
                key={name}
                to={route}
                className="text-gray-600 text-sm hover:text-blue-500 transition"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* Destinations */}
        <div>
          <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
            Popular Destinations
          </h2>
          <div className="flex flex-col space-y-2">
            {cities.map(({ name, route }) => (
              <Link
                key={name}
                to={route}
                className="text-gray-600 text-sm hover:text-blue-500 transition"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* Rooms */}
        <div>
          <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
            Budget Rooms
          </h2>
          <div className="flex flex-col space-y-2">
            {room.map(({ name, route }) => (
              <Link
                key={name}
                to={route}
                className="text-gray-600 text-sm hover:text-blue-500 transition"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
            Urban Nest
          </h2>
          <div className="flex flex-col space-y-2">
            {nest.map(({ name, route }) => (
              <Link
                key={name}
                to={route}
                className="text-gray-600 text-sm hover:text-blue-500 transition"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6
                        flex flex-col md:flex-row 
                        items-center justify-between 
                        text-sm text-gray-500 space-y-3 md:space-y-0">

          <p className="text-center md:text-left">
            © 2026 UrbanNest. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="hover:text-blue-500 transition">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-blue-500 transition">
              Terms
            </Link>
            <Link to="/" className="hover:text-blue-500 transition">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
