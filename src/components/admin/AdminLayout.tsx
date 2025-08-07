import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" dir="rtl">
      {/* Sidebar Desktop */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Mobile Topbar */}
      <div className="md:hidden bg-gray-800 text-white flex justify-between items-center p-4">
        <h2 className="font-bold">پنل مدیریت</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <div className="md:hidden bg-gray-800 text-white p-4">
          <AdminSidebar onLogout={handleLogout} />
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 bg-[#f3f4f6] p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
