import AdminUsersTable from "../../components/admin/AdminUsersTable";
import CreateAdminUserForm from "../../components/admin/CreateAdminUserForm";
import { useQuery } from "@apollo/client";
import { GET_ALL_ADMINS } from "../../graphql/adminAuth";
import { useEffect, useState } from "react";
import Loader from "../../components/general/Loader";
import { useAlert } from "../../contexts/AlertContext";
import { AdminUserDisplayType } from "../../types";

const AdminUsers = () => {
  const { showAlert } = useAlert();

  const {
    loading: loadingAdmins,
    data: adminsDataFromServer,
    error: adminDataFetchError,
  } = useQuery(GET_ALL_ADMINS);
  const [adminsData, setAdminsData] = useState<AdminUserDisplayType[]>([]);

  useEffect(() => {
    if (adminsDataFromServer) {
      setAdminsData(adminsDataFromServer.getAllAdmins);
    }
    if (adminsDataFromServer?.getAllAdmins === null) {
      showAlert({
        message:
          "An error occurred while fetching admin users. Please try again later.",
        type: "error",
      });
    }
  }, [adminsDataFromServer]);

  useEffect(() => {
    if (adminDataFetchError) {
      showAlert({
        message:
          "An error occurred while fetching admin users. Please try again later.",
        type: "error",
      });
    }
  }, [adminDataFetchError]);

  return (
    <>
      <section className="space-y-8">
        <CreateAdminUserForm />
        {loadingAdmins ? (
          <Loader text="Loading Admin Users..." />
        ) : (
          <AdminUsersTable adminsData={adminsData} />
        )}
      </section>
    </>
  );
};

export default AdminUsers;
