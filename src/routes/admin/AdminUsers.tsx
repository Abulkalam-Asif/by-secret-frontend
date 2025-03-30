import AdminUsersTable from "../../components/admin/AdminUsersTable";
import CreateAdminUserForm from "../../components/admin/CreateAdminUserForm";
import { useMutation, useQuery } from "@apollo/client";
import { CHANGE_ADMIN_STATUS, GET_ALL_ADMINS } from "../../graphql/adminAuth";
import { useEffect, useState } from "react";
import Loader from "../../components/general/Loader";
import { useAlert } from "../../contexts/AlertContext";
import { AdminUserDisplayType } from "../../types";

const AdminUsers = () => {
  const { showAlert } = useAlert();

  const [changeAdminStatusMutation, { loading: loadingChangeAdminStatus }] =
    useMutation(CHANGE_ADMIN_STATUS, {
      refetchQueries: [GET_ALL_ADMINS],
    });

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
        ) : loadingChangeAdminStatus ? (
          <Loader text="Changing Admin Status..." />
        ) : (
          <AdminUsersTable
            adminsData={adminsData}
            changeAdminStatusMutation={changeAdminStatusMutation}
          />
        )}
      </section>
    </>
  );
};

export default AdminUsers;
