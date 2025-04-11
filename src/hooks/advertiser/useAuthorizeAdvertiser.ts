import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import { AUTHORIZE_ADVERTISER } from "../../graphql/advertiserAuth";

export default function useAuthorizeAdvertiser() {
  const { data: authorizeAdvertiserData, loading: loadingAuthorizeAdvertiser } =
    useQuery(AUTHORIZE_ADVERTISER, {
      fetchPolicy: "no-cache",
    });

  const authorizeAdvertiser = useCallback(async () => {
    // Return null if still loading to prevent premature redirects
    if (loadingAuthorizeAdvertiser) {
      return { isLoading: true, email: null };
    }

    // Return the email if data exists, otherwise return null
    return {
      isLoading: false,
      email: authorizeAdvertiserData?.authorizeAdvertiser?.email || null,
    };
  }, [authorizeAdvertiserData, loadingAuthorizeAdvertiser]);

  return { authorizeAdvertiser, loadingAuthorizeAdvertiser };
}
