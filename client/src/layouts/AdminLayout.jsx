import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminHeader from "../Admin/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 bg-gray-100">
        <AdminHeader />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
