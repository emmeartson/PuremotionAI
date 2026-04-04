import React from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Home, Landmark, Gift, MessageSquare, User } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mobileNavItems = [
    { label: "Home", path: "/dashboard", icon: Home },
    { label: "Credits", path: "/dashboard/get-Credit", icon: Landmark },
    { label: "Invite", path: "/dashboard/invite", icon: Gift },
    { label: "Survey", path: "/dashboard/survey", icon: MessageSquare },
    { label: "Profile", path: "/dashboard/settings", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#fdfcfb] flex flex-col font-sans text-[#1a1a1a]">
      <Topbar />
      <div className="flex flex-1 pt-[64px] sm:pt-[72px]">
        {" "}
        {/* pt for fixed topbar height */}
        <Sidebar className="hidden lg:flex w-72 fixed left-0 h-[calc(100vh-72px)] border-r border-primary" />
        <main className="flex-1 lg:ml-72 relative flex flex-col pb-20 lg:pb-0">
          <Outlet />
        </main>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-2">
        <div className="grid grid-cols-5 gap-1">
          {mobileNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center gap-1 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "text-[#7c602e] bg-[#f2ede4]/70"
                    : "text-gray-500 hover:text-[#7c602e] hover:bg-gray-50"
                }`}
                aria-label={item.label}
              >
                <Icon size={16} />
                <span className="text-[10px] font-semibold leading-none">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
