import Th from "../general/Th";
import Td from "../general/Td";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

type AdminUsersTableProps = {
  adminsData: {
    fullName: string;
    username: string;
    isActive: boolean;
  }[];
};

const AdminUsersTable = ({ adminsData }: AdminUsersTableProps) => {
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
                <Th>Username</Th>
                <Th align="center">Is Active?</Th>
              </tr>
            </thead>
            <tbody>
              {adminsData?.length > 0 ? (
                adminsData.map(
                  (
                    admin: {
                      fullName: string;
                      username: string;
                      isActive: boolean;
                    },
                    index: number
                  ) => (
                    <tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{admin.fullName}</Td>
                      <Td>{admin.username}</Td>
                      <Td align="center">
                        {admin.isActive ? (
                          <FaCheck className="text-green-600" />
                        ) : (
                          <FaX className="text-red-600" />
                        )}
                      </Td>
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
};

export default AdminUsersTable;
