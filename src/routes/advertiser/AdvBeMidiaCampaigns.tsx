import { useState, useMemo } from "react";
import Button from "../../components/general/Button";
import Th from "../../components/general/Th";
import Td from "../../components/general/Td";

import { GET_BEMIDIA_CAMPAIGNS } from "../../graphql/beMidiaCampaign";
import { useQuery } from "@apollo/client";
import { BeMidiaCampaign } from "../../types";
import Loader from "../../components/general/Loader";
import AdvNewBeMidiaCampaignModal from "./AdvNewBeMidiaCampaignModal";
import Modal from "../../components/general/Modal";

const AdvBeMidiaCampaigns = () => {
  const { loading: loadingBeMidiaCampaigns, data } = useQuery(
    GET_BEMIDIA_CAMPAIGNS
  );
  const beMidiaCampaigns = useMemo(
    () => data?.getBeMidiaCampaigns || [],
    [data?.getBeMidiaCampaigns]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignToEdit, setCampaignToEdit] = useState<BeMidiaCampaign | null>(
    null
  );

  const handleAddCampaign = () => {
    setCampaignToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditCampaign = (campaign: BeMidiaCampaign) => {
    setCampaignToEdit(campaign);
    setIsModalOpen(true);
  };

  const [campaignToView, setCampaignToView] = useState<BeMidiaCampaign | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleViewCampaign = (campaign: BeMidiaCampaign) => {
    setCampaignToView(campaign);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <section>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-theme-gray">
                BeMidia Campaigns
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Manage your BeMidia advertising campaigns
              </p>
            </div>
            <div>
              <Button text="+ Add New Campaign" onClick={handleAddCampaign} />
            </div>
          </div>
          {loadingBeMidiaCampaigns ? (
            <Loader text="Loading BeMidia Campaigns..." />
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-fit">
                <thead>
                  <tr>
                    <Th>Campaign Name</Th>
                    <Th>Ad Image</Th>
                    <Th>Action</Th>
                    <Th>Date & Time Range</Th>
                    <Th>Budget</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {beMidiaCampaigns.length > 0 ? (
                    beMidiaCampaigns.map((campaign: BeMidiaCampaign) => (
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
                          ).toLocaleDateString("en-GB")} ${
                            campaign.startHour
                          } - ${new Date(
                            Number(campaign.endDate)
                          ).toLocaleDateString("en-GB")} ${campaign.endHour}`}
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
                            text={
                              campaign.status === "PENDING" ? "Edit" : "View"
                            }
                            onClick={() => {
                              if (campaign.status === "PENDING") {
                                handleEditCampaign(campaign);
                              } else {
                                handleViewCampaign(campaign);
                              }
                            }}
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

      {isViewModalOpen && campaignToView && (
        <Modal closeModal={() => setIsViewModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Campaign Details</h2>
            <p>
              <strong>Name:</strong> {campaignToView.name}
            </p>
            <p>
              <strong>Action:</strong> {campaignToView.action}
            </p>
            <p>
              <strong>Start Date & Time:</strong>{" "}
              {`${new Date(Number(campaignToView.startDate)).toLocaleDateString(
                "en-GB"
              )} at ${campaignToView.startHour}`}
            </p>
            <p>
              <strong>End Date & Time:</strong>{" "}
              {`${new Date(Number(campaignToView.endDate)).toLocaleDateString(
                "en-GB"
              )} at ${campaignToView.endHour}`}
            </p>
            <p>
              <strong>Budget:</strong> ${campaignToView.budget}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  campaignToView.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : campaignToView.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                {campaignToView.status.charAt(0).toUpperCase() +
                  campaignToView.status.slice(1)}
              </span>
            </p>
            {campaignToView.status === "REJECTED" && (
              <p>
                <strong>Rejection Reason:</strong>{" "}
                {campaignToView.rejectionReason}
              </p>
            )}
            <div className="mt-4">
              <strong>Ad Image:</strong>
              <img
                src={campaignToView.adImage}
                alt={`${campaignToView.name}-media`}
                className="max-w-full h-auto mt-2 rounded"
              />
            </div>
          </div>
        </Modal>
      )}

      {isModalOpen && (
        <AdvNewBeMidiaCampaignModal
          setIsModalOpen={setIsModalOpen}
          campaignToEdit={campaignToEdit || undefined}
        />
      )}
    </>
  );
};

export default AdvBeMidiaCampaigns;
