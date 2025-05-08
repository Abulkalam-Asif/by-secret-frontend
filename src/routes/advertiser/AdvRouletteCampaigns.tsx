import { useState, useMemo } from "react";
import Button from "../../components/general/Button";
import Th from "../../components/general/Th";
import Td from "../../components/general/Td";
import Modal from "../../components/general/Modal";
import { useQuery } from "@apollo/client";
import { GET_ROULETTE_CAMPAIGNS } from "../../graphql/rouletteCampaign";
import Loader from "../../components/general/Loader";
import AdvNewRouletteCampaignModal from "./AdvNewRouletteCampaignModal";

type RouletteCampaign = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  mainPrize: string;
  mainPrizeAmount: string;
  secPrize1: string;
  amount1: string;
  secPrize2: string;
  amount2: string;
  secPrize3: string;
  amount3: string;
  budget: string;
  status: string;
  rejectionReason: string;
};

const AdvRouletteCampaigns = () => {
  const { loading: loadingRouletteCampaigns, data } = useQuery(GET_ROULETTE_CAMPAIGNS);
  const rouletteCampaigns = useMemo(
    () => data?.getRouletteCampaigns || [],
    [data?.getRouletteCampaigns]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignToEdit, setCampaignToEdit] = useState<RouletteCampaign | null>(null);

  const handleAddCampaign = () => {
    setCampaignToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditCampaign = (campaign: RouletteCampaign) => {
    setCampaignToEdit(campaign);
    setIsModalOpen(true);
  };

  const [campaignToView, setCampaignToView] = useState<RouletteCampaign | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleViewCampaign = (campaign: RouletteCampaign) => {
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
                Roulette Campaigns
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Manage your roulette campaigns
              </p>
            </div>
            <div>
              <Button text="+ Add New Campaign" onClick={handleAddCampaign} />
            </div>
          </div>
          {loadingRouletteCampaigns ? (
            <Loader text="Loading Roulette Campaigns..." />
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-fit">
                <thead>
                  <tr>
                    <Th>Campaign Name</Th>
                    <Th>Date Range</Th>
                    <Th>Main Prize</Th>
                    <Th>Amount</Th>
                    <Th>Budget</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {rouletteCampaigns.length > 0 ? (
                    rouletteCampaigns.map((campaign: RouletteCampaign) => (
                      <tr
                        key={campaign.id}
                        className="border-b border-gray-200 hover:bg-gray-50">
                        <Td>{campaign.name}</Td>
                        <Td>
                          {`${new Date(
                            Number(campaign.startDate)
                          ).toLocaleDateString("en-GB")} - ${new Date(
                            Number(campaign.endDate)
                          ).toLocaleDateString("en-GB")}`}
                        </Td>
                        <Td>{campaign.mainPrize}</Td>
                        <Td>${campaign.mainPrizeAmount}</Td>
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
              <strong>Start Date:</strong>{" "}
              {`${new Date(Number(campaignToView.startDate)).toLocaleDateString(
                "en-GB"
              )}`}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {`${new Date(Number(campaignToView.endDate)).toLocaleDateString(
                "en-GB"
              )}`}
            </p>
            <p>
              <strong>Main Prize:</strong> {campaignToView.mainPrize}
            </p>
            <p>
              <strong>Main Prize Amount:</strong> ${campaignToView.mainPrizeAmount}
            </p>
            {campaignToView.secPrize1 && (
              <p>
                <strong>Secondary Prize 1:</strong> {campaignToView.secPrize1}
                {campaignToView.amount1 && ` ($${campaignToView.amount1})`}
              </p>
            )}
            {campaignToView.secPrize2 && (
              <p>
                <strong>Secondary Prize 2:</strong> {campaignToView.secPrize2}
                {campaignToView.amount2 && ` ($${campaignToView.amount2})`}
              </p>
            )}
            {campaignToView.secPrize3 && (
              <p>
                <strong>Secondary Prize 3:</strong> {campaignToView.secPrize3}
                {campaignToView.amount3 && ` ($${campaignToView.amount3})`}
              </p>
            )}
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
          </div>
        </Modal>
      )}

      {isModalOpen && (
        <AdvNewRouletteCampaignModal
          setIsModalOpen={setIsModalOpen}
          campaignToEdit={campaignToEdit || undefined}
        />
      )}
    </>
  );
};

export default AdvRouletteCampaigns;
