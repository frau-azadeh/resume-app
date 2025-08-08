import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, LogOut } from "lucide-react";

type AdminLink = {
  to: string;
  label: string;
  icon: ReactNode;
  /** exact match for this route */
  end?: boolean;
};

const adminLinks: AdminLink[] = [
  { to: "/admin", label: "داشبورد", icon: <LayoutDashboard size={18} />, end: true },
  { to: "/admin/applications", label: "رزومه‌ها", icon: <FileText size={18} /> },
];

const AdminSidebar = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4 hidden md:block">
      <div className="mb-8">
        <img src="/resume.jpg" alt="لوگو" className="w-10 h-10 rounded-full mx-auto" />
        <h2 className="text-center font-bold mt-2">پنل مدیریت</h2>
      </div>

      <nav className="space-y-2">
        {adminLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end === true}   // بدون any
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-blue-700 ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}

        <button
          onClick={onLogout}
          className="flex items-center gap-2 p-2 rounded hover:bg-red-700 mt-8 w-full text-left"
        >
          <LogOut size={18} />
          <span>خروج</span>
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
