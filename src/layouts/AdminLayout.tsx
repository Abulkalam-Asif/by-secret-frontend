import { useState } from "react";
import { Outlet } from "react-router";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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
