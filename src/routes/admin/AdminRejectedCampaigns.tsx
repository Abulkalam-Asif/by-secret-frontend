import Th from "../../components/general/Th.tsx";
import Td from "../../components/general/Td.tsx";
import { useState, useMemo } from "react";
import Button from "../../components/general/Button";
import Modal from "../../components/general/Modal";
import { useQuery } from "@apollo/client";
import { GET_REJECTED_ADS_CAMPAIGNS } from "../../graphql/rejectedCampaigns";
import { GET_REJECTED_ROULETTE_CAMPAIGNS } from "../../graphql/rejectedCampaigns";
import Loader from "../../components/general/Loader";

// Define rejected campaign type with rejectionReason
type RejectedAdsCampaign = {
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

type RejectedRouletteCampaign = {
  id: number;
  name: string;
  advertiser: string;
  dateRequested: string;
  days: number;
  startDate: string;
  mainPrize: string;
  mainPrizeAmount: string;
  secPrize1: string;
  amount1: string;
  secPrize2: string;
  amount2: string;
  secPrize3: string;
  amount3: string;
  budget: string;
  rejectionReason: string;
};

const AdminRejectedCampaigns = () => {
  const { data: adsData, loading: loadingRejectedAdsCampaigns } = useQuery(
    GET_REJECTED_ADS_CAMPAIGNS
  );
  const { data: rouletteData, loading: loadingRejectedRouletteCampaigns } = useQuery(
    GET_REJECTED_ROULETTE_CAMPAIGNS
  );

  const rejectedAdsCampaigns = useMemo(
    () => adsData?.getRejectedAdsCampaigns || [],
    [adsData?.getRejectedAdsCampaigns]
  );
  const rejectedRouletteCampaigns = useMemo(
    () => rouletteData?.getRejectedRouletteCampaigns || [],
    [rouletteData?.getRejectedRouletteCampaigns]
  );

  const [selectedCampaign, setSelectedCampaign] = useState<RejectedAdsCampaign | RejectedRouletteCampaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignType, setCampaignType] = useState<"ads" | "roulette">("ads");

  const handleViewCampaign = (campaign: RejectedAdsCampaign | RejectedRouletteCampaign, type: "ads" | "roulette") => {
    setSelectedCampaign(campaign);
    setCampaignType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <section>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-theme-gray">
              Rejected Campaigns
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              View all rejected campaigns in the system
            </p>
          </div>

          {/* Ads Campaigns Section */}
          <h2 className="text-lg mb-4 font-bold text-theme-gray">
            Ads Campaigns
          </h2>
          {loadingRejectedAdsCampaigns ? (
            <Loader text="Loading Rejected Ads Campaigns..." />
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
                  {rejectedAdsCampaigns.length > 0 ? (
                    rejectedAdsCampaigns.map((campaign: RejectedAdsCampaign) => (
                      <tr
                        key={campaign.id}
                        className="border-b border-gray-200 hover:bg-gray-50">
                        <Td>{campaign.name}</Td>
                        <Td>{campaign.advertiser}</Td>
                        <Td>{`${new Date(
                          Number(campaign.dateRequested)
                        ).toLocaleDateString("en-GB")}`}</Td>
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
                            onClick={() => handleViewCampaign(campaign, "ads")}
                            className="bg-blue-500 text-white rounded px-4 py-2"
                          />
                        </Td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <Td colSpan={9} align="center">
                        No rejected ads campaigns found.
                      </Td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Roulette Campaigns Section */}
          <h2 className="text-lg mb-4 font-bold text-theme-gray">
            Roulette Campaigns
          </h2>
          {loadingRejectedRouletteCampaigns ? (
            <Loader text="Loading Rejected Roulette Campaigns..." />
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
                    <Th>Main Prize</Th>
                    <Th>Budget</Th>
                    <Th>Action</Th>
                  </tr>
                </thead>
                <tbody>
                  {rejectedRouletteCampaigns.length > 0 ? (
                    rejectedRouletteCampaigns.map((campaign: RejectedRouletteCampaign) => (
                      <tr
                        key={campaign.id}
                        className="border-b border-gray-200 hover:bg-gray-50">
                        <Td>{campaign.name}</Td>
                        <Td>{campaign.advertiser}</Td>
                        <Td>{`${new Date(
                          Number(campaign.dateRequested)
                        ).toLocaleDateString("en-GB")}`}</Td>
                        <Td>{campaign.days}</Td>
                        <Td>{`${new Date(
                          Number(campaign.startDate)
                        ).toLocaleDateString("en-GB")}`}</Td>
                        <Td>{campaign.mainPrize}</Td>
                        <Td>${campaign.budget}</Td>
                        <Td>
                          <Button
                            text="View"
                            onClick={() => handleViewCampaign(campaign, "roulette")}
                            className="bg-blue-500 text-white rounded px-4 py-2"
                          />
                        </Td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <Td colSpan={8} align="center">
                        No rejected roulette campaigns found.
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
              <strong>Date Requested:</strong>{" "}
              {`${new Date(
                Number(selectedCampaign.dateRequested)
              ).toLocaleDateString("en-GB")}`}
            </p>
            <p>
              <strong>Days:</strong> {selectedCampaign.days}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {`${new Date(
                Number(selectedCampaign.startDate)
              ).toLocaleDateString("en-GB")}`}
            </p>
            <p>
              <strong>Budget:</strong> ${selectedCampaign.budget}
            </p>

            {campaignType === "ads" ? (
              <>
                <p>
                  <strong>Action:</strong> {(selectedCampaign as RejectedAdsCampaign).action}
                </p>
                <div className="mt-4">
                  <strong>Media:</strong>
                  <img
                    src={(selectedCampaign as RejectedAdsCampaign).media}
                    alt="Media"
                    className="h-12 w-12 object-cover rounded mt-2"
                  />
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Main Prize:</strong> {(selectedCampaign as RejectedRouletteCampaign).mainPrize}
                </p>
                <p>
                  <strong>Main Prize Amount:</strong> ${(selectedCampaign as RejectedRouletteCampaign).mainPrizeAmount}
                </p>
                {(selectedCampaign as RejectedRouletteCampaign).secPrize1 && (
                  <p>
                    <strong>Secondary Prize 1:</strong> {(selectedCampaign as RejectedRouletteCampaign).secPrize1}
                    {(selectedCampaign as RejectedRouletteCampaign).amount1 && ` ($${(selectedCampaign as RejectedRouletteCampaign).amount1})`}
                  </p>
                )}
                {(selectedCampaign as RejectedRouletteCampaign).secPrize2 && (
                  <p>
                    <strong>Secondary Prize 2:</strong> {(selectedCampaign as RejectedRouletteCampaign).secPrize2}
                    {(selectedCampaign as RejectedRouletteCampaign).amount2 && ` ($${(selectedCampaign as RejectedRouletteCampaign).amount2})`}
                  </p>
                )}
                {(selectedCampaign as RejectedRouletteCampaign).secPrize3 && (
                  <p>
                    <strong>Secondary Prize 3:</strong> {(selectedCampaign as RejectedRouletteCampaign).secPrize3}
                    {(selectedCampaign as RejectedRouletteCampaign).amount3 && ` ($${(selectedCampaign as RejectedRouletteCampaign).amount3})`}
                  </p>
                )}
              </>
            )}

            <p>
              <strong>Rejection Reason:</strong> {selectedCampaign.rejectionReason}
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

export default AdminRejectedCampaigns;
