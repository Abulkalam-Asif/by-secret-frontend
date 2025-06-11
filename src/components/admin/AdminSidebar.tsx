"use client";

import { BiPowerOff } from "react-icons/bi";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiBook, BiUser } from "react-icons/bi";
import { MdPendingActions, MdOutlineApproval, MdCancel } from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";
import { GiPokerHand } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import { LOGOUT_ADMIN } from "../../graphql/adminAuth";
import { useAlert } from "../../contexts/AlertContext";

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
  const { showAlert } = useAlert();
  const [logoutAdminMutation, { loading: loadingLogoutAdmin }] = useMutation(
    LOGOUT_ADMIN,
    {
      fetchPolicy: "no-cache",
    }
  );

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <AiOutlineDashboard size={16} />,
    },
    { name: "Wiki", href: "/admin/wiki", icon: <BiBook size={16} /> },
    {
      name: "Admin Users",
      href: "/admin/admin-users",
      icon: <BiUser size={16} />,
    },
    {
      name: "Ads Settings",
      href: "/admin/ads-settings",
      icon: <RiAdvertisementLine size={16} />,
    },
    {
      name: "Roulette Settings",
      href: "/admin/roulette-settings",
      icon: <GiPokerHand size={16} />,
    },
    {
      name: "General Settings",
      href: "/admin/general-settings",
      icon: <FiSettings size={16} />,
    },
    {
      name: "Email Templates",
      href: "/admin/email-templates",
      icon: <HiOutlineMail size={16} />,
    },
    {
      name: "Advertisers",
      href: "/admin/advertisers",
      icon: <BiUser size={16} />,
    },
    {
      name: "Approved Campaigns",
      href: "/admin/approved-campaigns",
      icon: <MdOutlineApproval size={16} />,
    },
    {
      name: "Pending Campaigns",
      href: "/admin/pending-campaigns",
      icon: <MdPendingActions size={16} />,
    },
    {
      name: "Rejected Campaigns",
      href: "/admin/rejected-campaigns",
      icon: <MdCancel size={16} />,
    },
    {
      name: "Invoices",
      href: "/admin/invoices",
      icon: <BiBook size={16} />,
    },
  ];

  const logoutHandler = async () => {
    try {
      const response = await logoutAdminMutation();
      const { data } = response;

      if (data && data.logoutAdmin) {
        showAlert({
          type: data.logoutAdmin.success ? "success" : "error",
          message: data.logoutAdmin.message || "Logged out successfully",
        });

        if (data.logoutAdmin.success) {
          // Redirect to login page
          navigate("/login");
        }
      }
    } catch (err) {
      console.error("Logout error:", err);
      showAlert({
        type: "error",
        message: "An error occurred during logout",
      });
      // If there's an error, still try to logout
      navigate("/login");
    }
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
            disabled={loadingLogoutAdmin}
            className={`flex w-full cursor-pointer text-red-700 font-medium items-center p-3 rounded transition-colors duration-300 text-sm hover:bg-red-100 ${
              loadingLogoutAdmin ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            <span>
              <BiPowerOff size={16} />
            </span>
            <div
              className={`grid ${
                isSidebarCollapsed ? "grid-cols-[0fr]" : "grid-cols-[1fr] pl-3"
              } transition-grid-cols duration-300`}>
              <div className={`overflow-hidden whitespace-nowrap`}>
                <span>{loadingLogoutAdmin ? "Logging out..." : "Logout"}</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
