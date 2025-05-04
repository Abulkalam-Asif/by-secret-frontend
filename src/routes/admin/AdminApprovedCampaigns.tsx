import { useMemo, useState } from "react";
import Button from "../../components/general/Button";
import Th from "../../components/general/Th";
import Td from "../../components/general/Td";
import Modal from "../../components/general/Modal";
import { GET_APPROVED_ADS_CAMPAIGNS } from "../../graphql/approvedCampaigns";
import { useQuery } from "@apollo/client";
import Loader from "../../components/general/Loader";

type ApprovedAdsCampaign = {
  id: number;
  name: string;
  advertiser: string;
  dateCreated: string;
  startDate: string;
  endDate: string;
  budget: string;
};

const AdminApprovedCampaigns = () => {
  const { data, loading: loadingApprovedCampaigns } = useQuery(
    GET_APPROVED_ADS_CAMPAIGNS
  );
  const approvedCampaigns = useMemo(
    () => data?.getApprovedAdsCampaigns || [],
    [data?.getApprovedAdsCampaigns]
  );

  const [selectedCampaign, setSelectedCampaign] =
    useState<ApprovedAdsCampaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewCampaign = (campaign: ApprovedAdsCampaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  return (
    <>
      <section>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-theme-gray">
              Approved Campaigns
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              View all approved campaigns in the system
            </p>
          </div>
          <h2 className="text-lg mb-4 font-bold text-theme-gray">
            Ads Campaigns
          </h2>
          {loadingApprovedCampaigns ? (
            <Loader text="Loading Approved Campaigns..." />
          ) : (
            <div className="w-full overflow-x-auto mb-8">
              <table className="w-full min-w-fit">
                <thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Advertiser</Th>
                    <Th>Date Created</Th>
                    <Th>Start Date</Th>
                    <Th>End Date</Th>
                    <Th>Budget</Th>
                    <Th>Action</Th>
                  </tr>
                </thead>
                <tbody>
                  {approvedCampaigns.length > 0 ? (
                    approvedCampaigns.map((campaign: ApprovedAdsCampaign) => (
                      <tr
                        key={campaign.id}
                        className="border-b border-gray-200 hover:bg-gray-50">
                        <Td>{campaign.name}</Td>
                        <Td>{campaign.advertiser}</Td>
                        <Td>{`${new Date(
                          Number(campaign.dateCreated)
                        ).toLocaleDateString("en-GB")}`}</Td>
                        <Td>
                          {`${new Date(
                            Number(campaign.startDate)
                          ).toLocaleDateString("en-GB")}`}
                        </Td>
                        <Td>
                          {`${new Date(
                            Number(campaign.endDate)
                          ).toLocaleDateString("en-GB")}`}
                        </Td>
                        <Td>${campaign.budget}</Td>
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
                      <Td colSpan={7} align="center">
                        No approved campaigns found.
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
              <strong>Campaign Name:</strong> {selectedCampaign.name}
            </p>
            <p>
              <strong>Advertiser:</strong> {selectedCampaign.advertiser}
            </p>
            <p>
              <strong>Date Created:</strong>{" "}
              {`${new Date(
                Number(selectedCampaign.dateCreated)
              ).toLocaleDateString("en-GB")}`}
            </p>
            <p>
              <strong>From Date:</strong>{" "}
              {`${new Date(
                Number(selectedCampaign.startDate)
              ).toLocaleDateString("en-GB")}`}
            </p>
            <p>
              <strong>To Date:</strong>{" "}
              {`${new Date(Number(selectedCampaign.endDate)).toLocaleDateString(
                "en-GB"
              )}`}
            </p>
            <p>
              <strong>Budget:</strong> ${selectedCampaign.budget}
            </p>
            <div className="mt-4 flex justify-end">
              <Button text="Close" onClick={() => setIsModalOpen(false)} />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AdminApprovedCampaigns;
