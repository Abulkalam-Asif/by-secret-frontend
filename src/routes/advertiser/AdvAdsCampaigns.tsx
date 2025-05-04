import { useState, useMemo } from "react";
import Button from "../../components/general/Button";
import Th from "../../components/general/Th";
import Td from "../../components/general/Td";

import { GET_ADS_CAMPAIGNS } from "../../graphql/adsCampaign";
import { useQuery } from "@apollo/client";
import { AdsCampaign } from "../../types";
import Loader from "../../components/general/Loader";
import AdvNewAdsCampaignModal from "./AdvNewAdsCampaignModal";

const AdvAdsCampaigns = () => {
  const { loading: loadingAdsCampaigns, data } = useQuery(GET_ADS_CAMPAIGNS);
  const adsCampaigns = useMemo(
    () => data?.getAdsCampaigns || [],
    [data?.getAdsCampaigns]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignToEdit, setCampaignToEdit] = useState<AdsCampaign | null>(
    null
  );

  const handleAddCampaign = () => {
    setCampaignToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditCampaign = (campaign: AdsCampaign) => {
    setCampaignToEdit(campaign);
    setIsModalOpen(true);
  };

  return (
    <>
      <section>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-theme-gray">
                Ads Campaigns
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Manage your advertising campaigns
              </p>
            </div>
            <div>
              <Button text="+ Add New Campaign" onClick={handleAddCampaign} />
            </div>
          </div>
          {loadingAdsCampaigns ? (
            <Loader text="Loading Ads Campaigns..." />
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-fit">
                <thead>
                  <tr>
                    <Th>Campaign Name</Th>
                    <Th>Ad Image</Th>
                    <Th>Action</Th>
                    <Th>Date Range</Th>
                    <Th>Budget</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {adsCampaigns.length > 0 ? (
                    adsCampaigns.map((campaign: AdsCampaign) => (
                      <tr
                        key={campaign.id}
                        className="border-b border-gray-200 hover:bg-gray-50">
                        <Td>{campaign.name}</Td>
                        <Td>
                          {campaign.adImage ? (
                            <img
                              src={campaign.adImage}
                              alt="Ad"
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            "N/A"
                          )}
                        </Td>
                        <Td>{campaign.action}</Td>
                        <Td>
                          {`${new Date(
                            Number(campaign.startDate)
                          ).toLocaleDateString("en-GB")} - ${new Date(
                            Number(campaign.endDate)
                          ).toLocaleDateString("en-GB")}`}
                        </Td>

                        <Td>${campaign.budget}</Td>
                        <Td>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              campaign.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : campaign.status === "APPROVED"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}>
                            {campaign.status.charAt(0).toUpperCase() +
                              campaign.status.slice(1)}
                          </span>
                        </Td>
                        <Td>
                          <Button
                            text="Edit"
                            onClick={() => handleEditCampaign(campaign)}
                          />
                        </Td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b border-gray-200">
                      <Td colSpan={7} align="center">
                        No campaigns found.
                      </Td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {isModalOpen && (
        <AdvNewAdsCampaignModal
          setIsModalOpen={setIsModalOpen}
          campaignToEdit={campaignToEdit || undefined}
        />
      )}
    </>
  );
};

export default AdvAdsCampaigns;
