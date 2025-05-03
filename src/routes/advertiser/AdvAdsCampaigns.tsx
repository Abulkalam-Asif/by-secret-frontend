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

  const handleAddCampaign = () => {
    setIsModalOpen(true);
  };

  // const handleEditCampaign = (campaign: Campaign) => {
  //   setNewCampaign(campaign);
  //   setIsModalOpen(true);
  // };

  // const handleSubmitCampaign = () => {
  //   setCampaigns((prev: Campaign[]) => {
  //     const existingIndex = prev.findIndex((c) => c.id === newCampaign.id);
  //     if (existingIndex !== -1) {
  //       // Update existing campaign
  //       const updatedCampaigns = [...prev];
  //       updatedCampaigns[existingIndex] = { ...newCampaign };
  //       return updatedCampaigns;
  //     }
  //     // Add new campaign
  //     return [...prev, { ...newCampaign, status: "pending", id: Date.now() }];
  //   });

  //   setNewCampaign({
  //     id: 0,
  //     name: "",
  //     image: null,
  //     action: "",
  //     dateRange: { from: "", to: "" },
  //     budget: "",
  //     status: "pending",
  //   });
  //   setIsModalOpen(false);
  // };

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
                  {adsCampaigns.length > 0 &&
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
                        <Td>{`${new Date(
                          Number(campaign.startDate)
                        ).toLocaleDateString()} - ${new Date(
                          Number(campaign.endDate)
                        ).toLocaleDateString()}`}</Td>
                        <Td>${campaign.budget}</Td>
                        <Td>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              campaign.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : campaign.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}>
                            {campaign.status.charAt(0).toUpperCase() +
                              campaign.status.slice(1)}
                          </span>
                        </Td>
                        <Td>
                          <Button text="Edit" onClick={() => {}} />
                        </Td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {isModalOpen && (
        <AdvNewAdsCampaignModal setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};

export default AdvAdsCampaigns;
