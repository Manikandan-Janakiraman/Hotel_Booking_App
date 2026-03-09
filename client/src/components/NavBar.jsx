// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
// import { FaBars, FaTimes } from "react-icons/fa";
// import SearchBox from "./SearchBox";

// const NavBar = () => {
//   const navigate = useNavigate();

//   const [light, setLight] = useState(true);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleTheme = () => {
//     setLight(!light);
//   };

//   return (
//     <div className={light ? "bg-white shadow-sm" : "bg-black text-white"}>
//       {/* Top Navbar */}
//       <div className="flex justify-around items-center px-6 py-6 md:px-10">
        
//         {/* Logo */}
//         <div className="text-red-400 font-bold text-xl">
//           <h1>
//             Urban<span className="text-gray-600">Nest</span>
//           </h1>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex gap-6 items-center font-medium">
//           <Link to="/" className="hover:text-red-400">Home</Link>
//           <Link to="/properties" className="hover:text-red-400">Properties</Link>
//           <Link to="/attraction" className="hover:text-red-400">Attractions</Link>
//           <Link to="/popular" className="hover:text-red-400">Popular</Link>

//           <Link
//             to="/login"
//             className="px-5 py-2 bg-red-400 text-white rounded-lg hover:scale-105 transition"
//           >
//             Login
//           </Link>

//           <Link
//             to="/register"
//             className="px-5 py-2 bg-red-400 text-white rounded-lg hover:scale-105 transition"
//           >
//             Register
//           </Link>

//           <button onClick={handleTheme}>
//             {light ? <MdOutlineDarkMode size={22} /> : <MdOutlineLightMode size={22} />}
//           </button>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center gap-4">
//           <button onClick={handleTheme}>
//             {light ? <MdOutlineDarkMode size={22} /> : <MdOutlineLightMode size={22} />}
//           </button>

//           <button onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {menuOpen && (
//         <div className="md:hidden flex flex-col gap-4 px-6 pb-6 font-medium bg-white shadow-md">
//           <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
//           <Link to="/properties" onClick={() => setMenuOpen(false)}>Properties</Link>
//           <Link to="/attraction" onClick={() => setMenuOpen(false)}>Attractions</Link>
//           <Link to="/popular" onClick={() => setMenuOpen(false)}>Popular</Link>

//           <Link
//             to="/login"
//             className="px-4 py-2 bg-red-400 text-white rounded-lg text-center"
//             onClick={() => setMenuOpen(false)}
//           >
//             Login
//           </Link>

//           <Link
//             to="/register"
//             className="px-4 py-2 bg-red-400 text-white rounded-lg text-center"
//             onClick={() => setMenuOpen(false)}
//           >
//             Register
//           </Link>
//         </div>
//       )}

//       {/* Search Box Section */}
//       <div className="px-4 md:px-10 pb-4">
//         <SearchBox />
//       </div>
//     </div>
//   );
// };

// export default NavBar;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import SearchBox from "./SearchBox";

const NavBar = () => {
  const navigate = useNavigate();

  const [light, setLight] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check localStorage for user login info
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  

  const handleTheme = () => {
    setLight(!light);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // redirect to home after logout
    setMenuOpen(false);
  };


   

  
  return (
    <div className={light ? "bg-white shadow-sm" : "bg-black text-white"}>
      {/* Top Navbar */}
      <div className="flex justify-around items-center px-6 py-6 md:px-10">
        
        {/* Logo */}
        <div className="text-red-400 font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>
          Urban<span className="text-gray-600">Nest</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center font-medium">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <Link to="/properties" className="hover:text-red-400">Properties</Link>
          <Link to="/attraction" className="hover:text-red-400">Attractions</Link>
          <Link to="/popular" className="hover:text-red-400">Popular</Link>

          {user ? (
            <>
              <span className="text-gray-700 font-medium">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 bg-red-400 text-white rounded-lg hover:scale-105 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 bg-red-400 text-white rounded-lg hover:scale-105 transition"
              >
                Register
              </Link>
            </>
          )}

          <button onClick={handleTheme}>
            {light ? <MdOutlineDarkMode size={22} /> : <MdOutlineLightMode size={22} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={handleTheme}>
            {light ? <MdOutlineDarkMode size={22} /> : <MdOutlineLightMode size={22} />}
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 font-medium bg-white shadow-md">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/properties" onClick={() => setMenuOpen(false)}>Properties</Link>
          <Link to="/attraction" onClick={() => setMenuOpen(false)}>Attractions</Link>
          <Link to="/popular" onClick={() => setMenuOpen(false)}>Popular</Link>

          {user ? (
            <>
              <span className="text-gray-700 font-medium">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-red-400 text-white rounded-lg text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-red-400 text-white rounded-lg text-center"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}

      {/* Search Box Section */}
      <div className="px-4 md:px-10 pb-4">
        <SearchBox />
      </div>
    </div>
  );
};

export default NavBar;
