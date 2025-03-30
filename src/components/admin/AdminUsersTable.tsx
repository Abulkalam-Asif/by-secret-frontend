import Th from "../general/Th";
import Td from "../general/Td";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { MdChangeCircle, MdOutlinePassword } from "react-icons/md";
import IconButton from "../general/IconButton";
import { useAdmin } from "../../contexts/AdminContext";
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";
import { useAlert } from "../../contexts/AlertContext";

type AdminUsersTableProps = {
  adminsData: {
    fullName: string;
    email: string;
    isActive: boolean;
  }[];
  changeAdminStatusMutation: (
    options?:
      | MutationFunctionOptions<
          unknown,
          OperationVariables,
          DefaultContext,
          ApolloCache<unknown>
        >
      | undefined
  ) => Promise<unknown>;
};

function AdminUsersTable({
  adminsData,
  changeAdminStatusMutation,
}: AdminUsersTableProps) {
  const { showAlert } = useAlert();
  const { email: adminEmail } = useAdmin();
  const isPseudoSuperAdminLoggedIn = adminEmail === "admin@admin.com";

  const changeAdminStatusHandler = async (
    event: React.MouseEvent,
    email: string
  ) => {
    event.preventDefault();
    const response = (await changeAdminStatusMutation({
      variables: {
        email,
      },
    })) as { data: { changeAdminStatus: { message: string } } };

    showAlert({
      message: response.data.changeAdminStatus.message,
      type: "success",
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-theme-gray">Admin Users</h1>
          <p className="text-sm text-gray-500 mt-2">
            List of all admin users in the system
          </p>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-fit">
            <thead>
              <tr>
                <Th>No.</Th>
                <Th>Full Name</Th>
                <Th>Email</Th>
                <Th align="center">Is Active?</Th>
                {/* isPseudoSuperAdminLoggedIn makes sure that the logged in admin is admin@admin.com and only allows that admin to change the status and password of other admins */}
                {isPseudoSuperAdminLoggedIn && <Th align="center">Actions</Th>}
              </tr>
            </thead>
            <tbody>
              {adminsData?.length > 0 ? (
                adminsData.map(
                  (
                    admin: {
                      fullName: string;
                      email: string;
                      isActive: boolean;
                    },
                    index: number
                  ) => (
                    <tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{admin.fullName}</Td>
                      <Td>{admin.email}</Td>
                      <Td align="center">
                        {admin.isActive ? (
                          <FaCheck className="text-green-600" />
                        ) : (
                          <FaX className="text-red-600" />
                        )}
                      </Td>
                      {/* isPseudoSuperAdminLoggedIn makes sure that the logged in admin is admin@admin.com and only allows that admin to change the status and password of other admins */}
                      {isPseudoSuperAdminLoggedIn && (
                        <Td>
                          <div className="flex justify-center items-center space-x-4">
                            {/* admin.email !== "admin@admin.com" makes sure that admin@admin.com stays active */}
                            {admin.email !== "admin@admin.com" && (
                              <IconButton
                                icon={<MdChangeCircle />}
                                onClick={(event: React.MouseEvent) =>
                                  changeAdminStatusHandler(event, admin.email)
                                }
                                className="text-xl"
                                title="Change Status"
                              />
                            )}
                            <IconButton
                              icon={<MdOutlinePassword />}
                              onClick={() => {}}
                              className="text-xl"
                              title="Change Password"
                            />
                          </div>
                        </Td>
                      )}
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <Td colSpan={4} align="center">
                    No admin users found
                  </Td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminUsersTable;
