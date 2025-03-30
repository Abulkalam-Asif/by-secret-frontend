import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import { AUTHORIZE_ADMIN } from "../../graphql/adminAuth";

export default function useAuthorizeAdmin() {
  const { data: authorizeAdminData, loading: loadingAuthorizeAdmin } = useQuery(
    AUTHORIZE_ADMIN,
    {
      fetchPolicy: "no-cache",
    }
  );

  const authorizeAdmin = useCallback(async () => {
    // Return null if still loading to prevent premature redirects
    if (loadingAuthorizeAdmin) {
      return { isLoading: true, email: null };
    }

    // Return the email if data exists, otherwise return null
    return {
      isLoading: false,
      email: authorizeAdminData?.authorizeAdmin?.email || null,
    };
  }, [authorizeAdminData, loadingAuthorizeAdmin]);

  return { authorizeAdmin, loadingAuthorizeAdmin };
}
