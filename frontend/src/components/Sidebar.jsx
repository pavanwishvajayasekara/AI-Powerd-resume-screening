import { NavLink } from "react-router-dom";
import { BarChart3, Upload, Users, TrendingUp, Settings, LogOut, Cpu } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#030712] border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/20">
            <Cpu size={24} />
          </div>
          <span className="font-bold text-xl premium-gradient-text tracking-tight">NeuroScreen</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        <NavItem to="/" icon={<BarChart3 size={20} />} label="Dashboard" />
        <NavItem to="/upload-resume" icon={<Upload size={20} />} label="Neural Screening" />
        <NavItem to="/candidates" icon={<Users size={20} />} label="Elite Candidates" />
        <NavItem to="/analytics" icon={<TrendingUp size={20} />} label="Market Trends" />
      </nav>

      {/* Bottom */}
      <div className="px-4 py-8 border-t border-white/5 space-y-2">
        <NavItem to="/settings" icon={<Settings size={20} />} label="System Config" />
        <NavItem to="/logout" icon={<LogOut size={20} />} label="Disconnect" />
      </div>
    </aside>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-5 py-3.5 rounded-xl cursor-pointer transition-all duration-300
        ${isActive
          ? "bg-white/5 text-indigo-400 font-bold border border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
          : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"}`
      }
    >
      <span className={({ isActive }) => (isActive ? "text-indigo-400" : "text-gray-600 group-hover:text-gray-400")}>{icon}</span>
      <span className="text-sm tracking-wide">{label}</span>
    </NavLink>
  );
}
