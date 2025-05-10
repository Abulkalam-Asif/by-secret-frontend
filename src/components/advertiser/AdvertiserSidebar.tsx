"use client";

import { BiPowerOff } from "react-icons/bi";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { RiAdvertisementLine } from "react-icons/ri";
import { GiPokerHand } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import { useAlert } from "../../contexts/AlertContext";
import { LOGOUT_ADVERTISER } from "../../graphql/advertiserAuth";

type AdvertiserSidebarProps = {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

const AdvertiserSidebar = ({
  isSidebarCollapsed,
  toggleSidebar,
}: AdvertiserSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [logoutAdvertiserMutation, { loading: loadingLogoutAdvertiser }] =
    useMutation(LOGOUT_ADVERTISER, {
      fetchPolicy: "no-cache",
    });

  const navItems = [
    {
      name: "Dashboard",
      href: "/advertiser",
      icon: <AiOutlineDashboard size={16} />,
    },
    {
      name: "Ads Campaigns",
      href: "/advertiser/ads-campaigns",
      icon: <RiAdvertisementLine size={16} />,
    },
    {
      name: "Roulette Campaigns",
      href: "/advertiser/roulette-campaigns",
      icon: <GiPokerHand size={16} />,
    },
    {
      name: "My Settings",
      href: "/advertiser/settings",
      icon: <FiSettings size={16} />,
    },
    {
      name: "Billing",
      href: "/advertiser/billing",
      icon: <BiBook size={16} />,
    },
  ];

  const logoutHandler = async () => {
    try {
      const response = await logoutAdvertiserMutation();
      const { data } = response;

      if (data && data.logoutAdvertiser) {
        showAlert({
          type: data.logoutAdvertiser.success ? "success" : "error",
          message: data.logoutAdvertiser.message || "Logged out successfully",
        });

        if (data.logoutAdvertiser.success) {
          // Redirect to login page
          navigate("/advertiser-login");
        }
      }
    } catch (err) {
      console.error("Logout error:", err);
      showAlert({
        type: "error",
        message: "An error occurred during logout",
      });
      // If there's an error, still try to logout
      navigate("/advertiser-login");
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
                By Secret - Advertiser
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
            disabled={loadingLogoutAdvertiser}
            className={`flex w-full cursor-pointer text-red-700 font-medium items-center p-3 rounded transition-colors duration-300 text-sm hover:bg-red-100 ${
              loadingLogoutAdvertiser ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            <span>
              <BiPowerOff size={16} />
            </span>
            <div
              className={`grid ${
                isSidebarCollapsed ? "grid-cols-[0fr]" : "grid-cols-[1fr] pl-3"
              } transition-grid-cols duration-300`}>
              <div className={`overflow-hidden whitespace-nowrap`}>
                <span>
                  {loadingLogoutAdvertiser ? "Logging out..." : "Logout"}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdvertiserSidebar;
