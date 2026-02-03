import { NavLink } from "react-router-dom";
import { BarChart3, Upload, Users, TrendingUp, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            AI
          </div>
          <span className="font-semibold text-gray-900">ResumeAI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <NavItem to="/" icon={<BarChart3 size={20} />} label="Dashboard" />
        <NavItem to="/upload-resume" icon={<Upload size={20} />} label="Upload Resumes" />
        <NavItem to="/candidates" icon={<Users size={20} />} label="Candidates" />
        <NavItem to="/analytics" icon={<TrendingUp size={20} />} label="Analytics" />
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
        <NavItem to="/logout" icon={<LogOut size={20} />} label="Logout" />
      </div>
    </aside>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
        ${isActive
          ? "bg-indigo-50 text-indigo-600 font-medium"
          : "text-gray-600 hover:bg-gray-50"}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
