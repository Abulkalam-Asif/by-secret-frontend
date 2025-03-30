import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router";
import AdminSidebar from "../components/admin/AdminSidebar";
import useAuthorizeAdmin from "../hooks/admin/useAuthorizeAdmin";
import Loader from "../components/general/Loader";

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { authorizeAdmin, refreshAuthorization } = useAuthorizeAdmin();
  const navigate = useNavigate();
  const authCheckPerformed = useRef(false);

  // Initial authorization
  useEffect(() => {
    // Only run the auth check once
    if (authCheckPerformed.current) return;

    const checkAuth = async () => {
      try {
        const result = await authorizeAdmin();
        if (result.success) {
          setIsAuthorized(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Authorization failed:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    authCheckPerformed.current = true;
  }, [authorizeAdmin, navigate]);

  // Periodic session validation (every 5 minutes)
  useEffect(() => {
    if (!isAuthorized) return;

    const intervalId = setInterval(async () => {
      const isStillAuthorized = await refreshAuthorization();
      if (!isStillAuthorized) {
        navigate("/login");
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(intervalId);
  }, [isAuthorized, refreshAuthorization, navigate]);

  if (isLoading) {
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
