// import React from 'react'
// import NavBar from './components/NavBar'
// import Banner from './components/Banner'
// import Icons from './components/Icons'
// import PopularDestination from './components/PopularDestination'
// import Hotels from './components/Hotels'
// import Gallery from './components/Gallery'
// import Footer from './components/Footer'
// import Properties from './components/Properties'
// import { Route, Routes } from 'react-router-dom'
// import Login from './Admin/Login'

// const AppRoute = () => {
//     return (
//         <>

//             <NavBar />
//             <Banner />
//             <Icons />
//             <PopularDestination />
//             <Hotels />
//             <Gallery />
//             <Footer />



//             <Routes>
//                 <Route path='properties' element={<Properties />} />
//                 <Route path='attraction' element={<Login />} />
//             </Routes>
//         </>
//     )
// }

// export default AppRoute


import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./Home";
import Properties from "./components/Properties";
import Login from "./Admin/Login";
import PopularDestination from "./components/PopularDestination";
import Attraction from "./components/Attraction";
import Register from "./Admin/Register";
import Dashboard from "./dashboard/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import AdminProperties from "./Admin/AdminProperties";
import AdminDashboard from "./Admin/AdminDashboard";
import MenuManagement from "./Admin/MenuManagement";
import StatCard from "./Admin/StatCard";
import Booking from "./booking/Booking";
import AdminBookings from "./Admin/AdminBookings";

import ProtectedRoute from "./Admin/ProtectectedRoute";




const AppRoute = () => {
  return (

    <Routes>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="properties" element={<Properties />} />
        <Route path="attraction" element={<Attraction />} />
        <Route path="popular" element={<PopularDestination />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="booking" element={<Booking />} />
        <Route path="/booking/:id" element={<Booking />} />

        {/* <Route path="dashboard" element={<Dashboard />} /> */}p;'
        '
      </Route>


      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        
        <Route path="properties" element={<AdminProperties />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="menus" element={<MenuManagement />} />
        <Route path="state" element={<StatCard />} />
      </Route>
      

      {/* <Route path="/admin/dashboard" element={<ProtectedRoute> <AdminDashboard />
      </ProtectedRoute>
      } /> */}

    </Routes>



  );
};

export default AppRoute;
