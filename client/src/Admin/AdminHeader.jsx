// components/admin/AdminHeader.jsx
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold text-gray-700">
        Admin Dashboard
      </h1>

     
    </header>
  );
};

export default AdminHeader;
