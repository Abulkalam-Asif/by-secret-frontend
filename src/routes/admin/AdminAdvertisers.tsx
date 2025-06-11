import Th from "../../components/general/Th";
import Td from "../../components/general/Td";
import { GET_ADVERTISERS } from "../../graphql/advertiserAuth";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import Loader from "../../components/general/Loader";

const AdminAdvertisers = () => {
  const { data, loading: loadingAdvertisers } = useQuery(GET_ADVERTISERS);
  const advertisersData = useMemo(
    () => data?.getAdvertisers || [],
    [data?.getAdvertisers]
  );

  return (
    <>
      <section>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-theme-gray">Advertisers</h1>
            <p className="text-sm text-gray-500 mt-2">
              List of all the advertisers in the system
            </p>
          </div>
          {loadingAdvertisers ? (
            <Loader text="Loading Advertisers..." />
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-fit">
                <thead>
                  <tr>
                    <Th>Company Name</Th>
                    <Th align="center">Logo</Th>
                    <Th>Full Contact Name</Th>
                    <Th>Phone Number</Th>
                    <Th>Email</Th>
                    <Th>Address</Th>
                  </tr>
                </thead>
                <tbody>
                  {advertisersData.length > 0 ? (
                    advertisersData.map(
                      (advertiser: {
                        id: string;
                        companyName: string;
                        logo: string;
                        fullContactName: string;
                        phone: string;
                        email: string;
                        address: string;
                      }) => (
                        <tr key={advertiser.id}>
                          <Td>{advertiser.companyName}</Td>
                          <Td align="center">
                            <img
                              src={advertiser.logo}
                              alt={advertiser.companyName}
                              className="h-8 w-auto"
                            />
                          </Td>
                          <Td>{advertiser.fullContactName}</Td>
                          <Td>{advertiser.phone}</Td>
                          <Td>{advertiser.email}</Td>
                          <Td>{advertiser.address}</Td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <Td colSpan={6} align="center">
                        No advertisers found.
                      </Td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminAdvertisers;
