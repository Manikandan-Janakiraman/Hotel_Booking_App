import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBuilding,
  FaCity,
  FaStar,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaBan,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    properties: 0,
    cities: 0,
    reviews: 0,
    success: 0,
    failed: 0,
    cancelled: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch properties
        const propertyRes = await axios.get(
          "https://hotel-booking-app-2lg2.onrender.com/api/properties"
        );

        // Fetch bookings
        const bookingRes = await axios.get(
          "https://hotel-booking-app-2lg2.onrender.com/api/bookings"
        );

        const properties = propertyRes.data.length;
        const cities = new Set(propertyRes.data.map((p) => p.city)).size;
        const reviews = new Set(propertyRes.data.map((p) => p.review)).size;

        // Booking status counts (SAFE LOWERCASE CHECK)
        const success = bookingRes.data.filter(
          (b) => b.status?.toLowerCase() === "booked"
        ).length;

        const failed = bookingRes.data.filter(
          (b) => b.status?.toLowerCase() === "failed"
        ).length;

        const cancelled = bookingRes.data.filter(
          (b) => b.status?.toLowerCase() === "cancelled"
        ).length;

        setStats({
          properties,
          cities,
          reviews,
          success,
          failed,
          cancelled,
        });
      } catch (error) {
        console.log("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Complete Booking & Property Overview
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <StatCard
          icon={<FaBuilding />}
          title="Total Properties"
          value={stats.properties}
          color="bg-gradient-to-r from-red-500 to-red-600"
          onClick={() => navigate("/admin/properties")}
        />

        <StatCard
          icon={<FaCity />}
          title="Cities Covered"
          value={stats.cities}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />

        <StatCard
          icon={<FaStar />}
          title="Review Types"
          value={stats.reviews}
          color="bg-gradient-to-r from-green-500 to-green-600"
        />

        <StatCard
          icon={<FaCheckCircle />}
          title="Booking Success"
          value={stats.success}
          color="bg-gradient-to-r from-emerald-500 to-emerald-600"
        />

        <StatCard
          icon={<FaTimesCircle />}
          title="Booking Failed"
          value={stats.failed}
          color="bg-gradient-to-r from-yellow-500 to-yellow-600"
        />

        <StatCard
          icon={<FaBan />}
          title="Booking Cancelled"
          value={stats.cancelled}
          color="bg-gradient-to-r from-gray-700 to-gray-900"
        />

      </div>
    </div>
  );
};

export default AdminDashboard;


/* ================= STAT CARD ================= */

const StatCard = ({ icon, title, value, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${color} text-white rounded-2xl p-6 shadow-lg cursor-pointer transform hover:scale-105 transition duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="text-3xl opacity-90">{icon}</div>
        <FaClipboardList className="opacity-20 text-6xl" />
      </div>

      <div className="mt-6">
        <h3 className="text-sm uppercase tracking-wide opacity-90">
          {title}
        </h3>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
};
