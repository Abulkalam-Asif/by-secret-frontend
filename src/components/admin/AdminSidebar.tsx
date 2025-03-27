"use client";

import { BiPowerOff } from "react-icons/bi";
import {
  FiHome,
  FiFileText,
  FiChevronRight,
  FiChevronLeft,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";

type AdminSidebarProps = {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

const AdminSidebar = ({
  isSidebarCollapsed,
  toggleSidebar,
}: AdminSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <FiHome size={16} /> },
    { name: "Wiki", href: "/admin/wiki", icon: <FiFileText size={16} /> },
    {
      name: "Admin Users",
      href: "/admin/admin-users",
      icon: <FiUsers size={16} />,
    },
    {
      name: "Ads Settings",
      href: "/admin/ads-settings",
      icon: <FiSettings size={16} />,
    },
    {
      name: "Roulette Settings",
      href: "/admin/roulette-settings",
      icon: <FiSettings size={16} />,
    },
    {
      name: "General Settings",
      href: "/admin/general-settings",
      icon: <FiSettings size={16} />,
    },
    {
      name: "Advertisers",
      href: "/admin/advertisers",
      icon: <FiSettings size={16} />,
    },
  ];

  const logoutHandler = () => {
    navigate("/login");
  };

  return (
    <aside
      className={`h-screen duration-300 border-r-2 border-e-theme-light-gray`}>
      <div className="flex flex-col h-full">
        <div className="w-max flex items-center justify-between p-4 border-b-2 border-theme-light-gray">
          <div
            className={`grid ${
              isSidebarCollapsed ? "grid-cols-[0fr]" : "grid-cols-[1fr] pr-3"
            } transition-grid-cols duration-300`}>
            <div className={`overflow-hidden`}>
              <h2 className="whitespace-nowrap text-xl font-bold text-theme-dark-gray">
                By Secret - Admin
              </h2>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-3 rounded-full cursor-pointer text-theme-dark-gray hover:bg-theme-light-gray">
            {isSidebarCollapsed ? (
              <FiChevronRight size={20} />
            ) : (
              <FiChevronLeft size={20} />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`flex text-theme-dark-gray font-medium items-center p-3 rounded transition-colors duration-300 text-sm ${
                      isActive
                        ? "bg-theme-light-gray"
                        : "hover:bg-theme-light-gray"
                    }`}>
                    <span>{item.icon}</span>
                    <div
                      className={`grid ${
                        isSidebarCollapsed
                          ? "grid-cols-[0fr]"
                          : "grid-cols-[1fr] pl-3"
                      } transition-grid-cols duration-300`}>
                      <div className={`overflow-hidden whitespace-nowrap`}>
                        <span>{item.name}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-4 py-3 border-t-2 border-theme-light-gray">
          <button
            onClick={logoutHandler}
            className={`flex w-full cursor-pointer text-red-700 font-medium items-center p-3 rounded transition-colors duration-300 text-sm hover:bg-red-100`}>
            <span>
              <BiPowerOff size={16} />
            </span>
            <div
              className={`grid ${
                isSidebarCollapsed ? "grid-cols-[0fr]" : "grid-cols-[1fr] pl-3"
              } transition-grid-cols duration-300`}>
              <div className={`overflow-hidden`}>
                <span>Logout</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
