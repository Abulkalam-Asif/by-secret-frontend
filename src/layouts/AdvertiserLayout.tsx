import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Loader from "../components/general/Loader";
import { useUser } from "../contexts/UserContext";
import AdvertiserSidebar from "../components/advertiser/AdvertiserSidebar";
import useAuthorizeAdvertiser from "../hooks/advertiser/useAuthorizeAdvertiser";

const AdvertiserLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { authorizeAdvertiser, loadingAuthorizeAdvertiser } =
    useAuthorizeAdvertiser();
  const navigate = useNavigate();
  const authCheckPerformed = useRef(false);
  const { setEmail } = useUser();

  // Initial authorization
  useEffect(() => {
    if (authCheckPerformed.current && !loadingAuthorizeAdvertiser) return;

    const checkAuth = async () => {
      try {
        const result = await authorizeAdvertiser();

        if (result.isLoading) return;

        authCheckPerformed.current = true;

        if (result.email) {
          setIsAuthorized(true);
          setEmail(result.email);
        } else {
          navigate("/advertiser-login");
        }
      } catch (error) {
        console.error("Authorization failed:", error);
        navigate("/advertiser-login");
      }
    };

    checkAuth();
  }, [authorizeAdvertiser, navigate, setEmail, loadingAuthorizeAdvertiser]);

  // Periodic session validation (every 5 minutes)
  useEffect(() => {
    if (!isAuthorized) return;

    const intervalId = setInterval(async () => {
      const result = await authorizeAdvertiser();
      if (result.isLoading) return;

      if (!result.email) {
        navigate("/advertiser-login");
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(intervalId);
  }, [isAuthorized, navigate, authorizeAdvertiser]);

  if (loadingAuthorizeAdvertiser) {
    return <Loader text="Loading..." />;
  }

  if (!isAuthorized) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <div className="flex h-screen">
        <AdvertiserSidebar
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        />
        <div
          className={`transition-margin w-full duration-300 p-6 overflow-y-auto`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdvertiserLayout;
