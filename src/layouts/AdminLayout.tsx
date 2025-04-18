import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router";
import AdminSidebar from "../components/admin/AdminSidebar";
import useAuthorizeAdmin from "../hooks/admin/useAuthorizeAdmin";
import Loader from "../components/general/Loader";
import { useUser } from "../contexts/UserContext";

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { authorizeAdmin, loadingAuthorizeAdmin } = useAuthorizeAdmin();
  const navigate = useNavigate();
  const authCheckPerformed = useRef(false);
  const { setEmail } = useUser();

  // Initial authorization
  useEffect(() => {
    if (authCheckPerformed.current && !loadingAuthorizeAdmin) return;

    const checkAuth = async () => {
      try {
        const result = await authorizeAdmin();

        if (result.isLoading) return;

        authCheckPerformed.current = true;

        if (result.email) {
          setIsAuthorized(true);
          setEmail(result.email);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Authorization failed:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [authorizeAdmin, navigate, setEmail, loadingAuthorizeAdmin]);

  // Periodic session validation (every 5 minutes)
  useEffect(() => {
    if (!isAuthorized) return;

    const intervalId = setInterval(async () => {
      const result = await authorizeAdmin();
      if (result.isLoading) return;

      if (!result.email) {
        navigate("/login");
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [isAuthorized, navigate, authorizeAdmin]);

  if (loadingAuthorizeAdmin) {
    return <Loader text="Loading..." />;
  }

  if (!isAuthorized) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <div className="flex h-screen">
        <AdminSidebar
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

export default AdminLayout;
