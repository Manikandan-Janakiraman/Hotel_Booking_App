// components/admin/AdminSidebar.jsx
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminSidebar = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        axios.get("https://hotel-booking-app-chi.vercel.app/api/menus")
            .then(res => setMenus(res.data));
    }, []);

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
            <h2 className="text-3xl font-bold mb-6 flex flex-row justify-center">
                <span className="text-red-400">Urban</span>Nest
            </h2>

            <div className="flex flex-col gap-3 p-4">
                <Link to='/admin' className='text-white text-lg hover:text-red-400'>Home</Link>
                {/* <Link to='/admin/adminprofile' className='text-white text-lg hover:text-red-400'>Profile</Link> */}
                <Link to='/admin/properties' className='text-white text-lg hover:text-red-400'>Manage Properties</Link>
                <Link to='/admin/menus' className='text-white text-lg hover:text-red-400'>Menu Management</Link>
                <Link to='/admin/bookings' className='text-white text-lg hover:text-red-400'>Booking Details</Link>
                <Link to='/login' className='text-white text-lg hover:text-red-400'>Log out</Link>
            </div>

            <nav className="flex flex-col gap-2">
                {menus.map(menu => (
                    <NavLink
                        key={menu._id}
                        to={menu.path}
                        className={({ isActive }) =>
                            `px-4 py-2 rounded ${isActive
                                ? "bg-red-500"
                                : "hover:bg-gray-700"
                            }`
                        }
                    >
                        {menu.title}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default AdminSidebar;
