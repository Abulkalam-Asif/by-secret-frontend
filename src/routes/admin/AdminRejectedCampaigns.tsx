import Th from "../../components/general/Th.tsx";
import Td from "../../components/general/Td.tsx";
import { useState, useMemo } from "react";
import Button from "../../components/general/Button";
import Modal from "../../components/general/Modal";
import { useQuery } from "@apollo/client";
import { GET_REJECTED_ADS_CAMPAIGNS } from "../../graphql/rejectedCampaigns";
import Loader from "../../components/general/Loader";

// Define rejected campaign type with rejectionReason
type RejectedCampaign = {
  id: number;
  name: string;
  advertiser: string;
  dateRequested: string;
  days: number;
  startDate: string;
  budget: string;
  media: string;
  action: string;
  rejectionReason: string;
};

const AdminRejectedCampaigns = () => {
  const { data, loading: loadingRejectedCampaigns } = useQuery(
    GET_REJECTED_ADS_CAMPAIGNS
  );

  const rejectedCampaigns = useMemo(
    () => data?.getRejectedAdsCampaigns || [],
    [data?.getRejectedAdsCampaigns]
  );

  const [selectedCampaign, setSelectedCampaign] =
    useState<RejectedCampaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewCampaign = (campaign: RejectedCampaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  return (
    <>
      <section>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-theme-gray">
                Rejected Campaigns
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                List of all rejected campaigns in the system
              </p>
            </div>
          </div>
          <h2 className="text-lg mb-4 font-bold text-theme-gray">
            Ads Campaigns
          </h2>
          {loadingRejectedCampaigns ? (
            <Loader text="Loading Rejected Campaigns..." />
          ) : (
            <div className="w-full overflow-x-auto mb-8">
              <table className="w-full min-w-fit">
                <thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Advertiser</Th>
                    <Th>Date Requested</Th>
                    <Th>Days</Th>
                    <Th>Start Date</Th>
                    <Th>Budget</Th>
                    <Th>Media</Th>
                    <Th>Action</Th>
                    <Th>View</Th>
                  </tr>
                </thead>
                <tbody>
                  {rejectedCampaigns.length > 0 ? (
                    rejectedCampaigns.map((campaign: RejectedCampaign) => (
                      <tr
                        key={campaign.id}
                        className="border-b border-gray-200 hover:bg-gray-50">
                        <Td>{campaign.name}</Td>
                        <Td>{campaign.advertiser}</Td>
                        <Td>{`${new Date(
                          Number(campaign.dateRequested)
                        ).toLocaleDateString("en-GB")} `}</Td>
                        <Td>{campaign.days}</Td>
                        <Td>{`${new Date(
                          Number(campaign.startDate)
                        ).toLocaleDateString("en-GB")}`}</Td>
                        <Td>${campaign.budget}</Td>
                        <Td>
                          <img
                            src={campaign.media}
                            alt="Media"
                            className="h-12 w-12 object-cover rounded"
                          />
                        </Td>
                        <Td>{campaign.action}</Td>
                        <Td>
                          <Button
                            text="View"
                            onClick={() => handleViewCampaign(campaign)}
                            className="bg-blue-500 text-white rounded px-4 py-2"
                          />
                        </Td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <Td colSpan={9} align="center">
                        No rejected campaigns found.
                      </Td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {isModalOpen && selectedCampaign && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Campaign Details</h2>
            <p>
              <strong>Advertiser:</strong> {selectedCampaign.advertiser}
            </p>
            <p>
              <strong>Date Requested:</strong> {selectedCampaign.dateRequested}
            </p>
            <p>
              <strong>Days:</strong> {selectedCampaign.days}
            </p>
            <p>
              <strong>Start Date:</strong> {selectedCampaign.startDate}
            </p>
            <p>
              <strong>Budget:</strong> ${selectedCampaign.budget}
            </p>
            <p>
              <strong>Media:</strong>
              <img
                src={selectedCampaign.media}
                alt="Media"
                className="h-12 w-12 object-cover rounded mt-2"
              />
            </p>
            <p>
              <strong>Action:</strong> {selectedCampaign.action}
            </p>
            <p>
              <strong>Rejection Reason:</strong>{" "}
              {selectedCampaign.rejectionReason || "N/A"}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AdminRejectedCampaigns;
