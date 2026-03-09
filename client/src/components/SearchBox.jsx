// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';

// const SearchBox = () => {


//     const navigate = useNavigate();
//     const [light, setLight] = useState(0)
//     const handleClick = () => {
//         setLight(!light)
//     }

//     const handleChange = (e) => {
//         navigate('/properties')
//         e.preventDefault();
//     }


//     const cities = [
//         "Chennai",
//         "Mumbai",
//         "Bangalore",
//         "Hyderabad",
//         "Kolkata",
//         "Pune"
//     ];

//     const [city, setCity] = useState("");
//     const [checkIn, setCheckIn] = useState("");
//     const [checkOut, setCheckOut] = useState("");
//     const [guests, setGuests] = useState("");
//     const [filteredCities, setFilteredCities] = useState([]);

//     const handleCityChange = (e) => {
//         const value = e.target.value;
//         setCity(value);

//         if (value.length > 0) {
//             const matches = cities.filter((c) =>
//                 c.toLowerCase().includes(value.toLowerCase())
//             );
//             setFilteredCities(matches);
//         } else {
//             setFilteredCities([]);
//         }
//     };

//     const handleSearch = (e) => {
//         e.preventDefault();

//         navigate(
//             `/properties?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
//         );
//     };


//     return (
//         <>

//             <div className='flex justify-center'>

//                 <form className={light ? 'bg-black border-1 border-gray-300 rounded-full text-white w-250 p-2 flex justify-around shadow-md -mb-15 z-10' : 'bg-white border-1 border-gray-300 rounded-full w-250 p-2 flex justify-around shadow-md -mb-15 z-10'}>

//                     <label className='w-full mr-2 py-2 pl-5 rounded-full flex flex-col'>Where to?
//                         <input type='text'
//                             value={city}
//                             onChange={handleCityChange}
//                             className='text-gray-400 flex justify-between'
//                             placeholder='Search City, Area or Hotel' />



//                         {filteredCities.length > 0 && (
//                             <ul className="absolute bg-white shadow rounded mt-1">
//                                 {filteredCities.map((c) => (
//                                     <li
//                                         key={c}
//                                         onClick={() => {
//                                             setCity(c);
//                                             setFilteredCities([]);
//                                         }}
//                                         className="p-2 hover:bg-gray-200 cursor-pointer"
//                                     >
//                                         {c}
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}

//                     </label>


//                     <label className='w-full mr-2 py-2 pl-5 rounded-full flex flex-col'>Check In
//                         <input type='date' value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
//                             className='text-gray-400 flex justify-between' placeholder='Pick Date' /></label>

//                     <label className='w-full mr-2 py-2 pl-5 rounded-full flex flex-col'>Check Out
//                         <input type='date'
//                             value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
//                             className='text-gray-400 flex justify-between' placeholder='Pick Date' /></label>

//                     <label className='w-full mr-2 py-2 pl-5 rounded-full flex flex-col'>Guests
//                         <select value={guests} onChange={(e) => setGuests(e.target.value)}
//                             placeholder='Number of Guests' className='text-gray-400 flex justify-around'>
//                             <option>1 guest</option>
//                             <option>2 Guests</option>
//                             <option>3 Guests</option>
//                             <option>4 Guests</option>
//                             <option>5 Guests</option>
//                             <option>6 Guests</option>
//                             <option>7 Guests</option>
//                             <option>8 Guests</option>
//                             <option>9 Guests</option>
//                             <option>10 Guests</option>
//                         </select>


//                     </label>

//                     <div className='flex items-center bg-red-400 rounded-full m-1'>
//                         <button onClick={handleSearch} className='text-white p-2 m-1 mr-3 w-25 h-10'>Search</button>
//                     </div>
//                 </form>

//             </div>


//         </>
//     )
// }

// export default SearchBox



import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  const cities = [
    "Chennai",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Kolkata",
    "Pune",
  ];

  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [listening, setListening] = useState(false);

  
  const convertSpokenDate = (text) => {
    const currentYear = new Date().getFullYear();

    // Remove words like "check in", "check out"
    text = text.replace(/check in|check out/gi, "").trim();

    const parsedDate = new Date(text);

    if (!isNaN(parsedDate)) {
      let year = parsedDate.getFullYear();
      if (!text.match(/\d{4}/)) {
        year = currentYear;
      }

      const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
      const day = String(parsedDate.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }

    return "";
  };

  
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Voice:", transcript);

      // 🔹 City detection
      cities.forEach((c) => {
        if (transcript.includes(c.toLowerCase())) {
          setCity(c);
        }
      });

      // 🔹 Extract check-in
      const checkInMatch = transcript.match(/check in (.*?)(check out|$)/);
      if (checkInMatch) {
        const formatted = convertSpokenDate(checkInMatch[1]);
        if (formatted) setCheckIn(formatted);
      }

      // 🔹 Extract check-out
      const checkOutMatch = transcript.match(/check out (.*)/);
      if (checkOutMatch) {
        const formatted = convertSpokenDate(checkOutMatch[1]);
        if (formatted) setCheckOut(formatted);
      }

      // 🔹 Guests detection
      const guestMatch = transcript.match(/\d+/);
      if (guestMatch) {
        const num = guestMatch[0];
        setGuests(`${num} Guest${num > 1 ? "s" : ""}`);
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/properties?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  
return (
  <div className="flex justify-center relative -mb-10 md:-mb-16 z-20 px-4">
    <form
      onSubmit={handleSearch}
      className="
        bg-white/90 backdrop-blur-lg border border-gray-200
        rounded-2xl shadow-xl w-full max-w-6xl
        p-5
        flex flex-col gap-5
        md:flex-row md:items-end md:gap-4
      "
    >
      {/* CITY */}
      <div className="flex-1 w-full">
        <label className="text-sm font-semibold text-gray-600">
          Where to?
        </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search City"
          className="
            w-full mt-2 px-4 py-3 rounded-xl border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-red-400
          "
        />
      </div>

      {/* CHECK IN */}
      <div className="flex-1 w-full">
        <label className="text-sm font-semibold text-gray-600">
          Check In
        </label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="
            w-full mt-2 px-4 py-3 rounded-xl border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-red-400
          "
        />
      </div>

      {/* CHECK OUT */}
      <div className="flex-1 w-full">
        <label className="text-sm font-semibold text-gray-600">
          Check Out
        </label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="
            w-full mt-2 px-4 py-3 rounded-xl border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-red-400
          "
        />
      </div>

      {/* GUESTS */}
      <div className="flex-1 w-full">
        <label className="text-sm font-semibold text-gray-600">
          Guests
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="
            w-full mt-2 px-4 py-3 rounded-xl border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-red-400
          "
        >
          <option value="">Select Guests</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1}>
              {i + 1} Guest{i > 0 && "s"}
            </option>
          ))}
        </select>
      </div>

      {/* BUTTON SECTION */}
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <button
          type="button"
          onClick={startListening}
          className={`
            w-full sm:w-auto
            p-3 rounded-xl border text-center
            ${listening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-gray-100"}
            hover:bg-red-100 transition
          `}
        >
          🎤 Voice
        </button>

        <button
          type="submit"
          className="
            w-full sm:w-auto
            px-8 py-3 bg-red-400
            text-white font-semibold rounded-xl
            shadow-lg hover:scale-105
            transition duration-300
          "
        >
          Search
        </button>
      </div>
    </form>
  </div>
);


};

export default SearchBox;
