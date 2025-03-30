import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { AUTHORIZE_ADMIN } from "../../graphql/adminAuth";

export default function useAuthorizeAdmin() {
  const [authorizeAdminMutation] = useMutation(AUTHORIZE_ADMIN, {
    fetchPolicy: "no-cache",
  });

  const authorizeAdmin = useCallback(async () => {
    try {
      const response = await authorizeAdminMutation();
      return response.data.authorizeAdmin;
    } catch (error) {
      console.error("Error authorizing admin:", error);
      throw new Error("Authorization failed");
    }
  }, [authorizeAdminMutation]);

  const refreshAuthorization = useCallback(async () => {
    try {
      const response = await authorizeAdminMutation();
      return response.data.authorizeAdmin.success;
    } catch (error) {
      console.error("Error refreshing authorization:", error);
      return false;
    }
  }, [authorizeAdminMutation]);

  return { authorizeAdmin, refreshAuthorization };
}
