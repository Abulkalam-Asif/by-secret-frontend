import { useMemo, useState } from "react";
import Button from "../../components/general/Button";
import Th from "../../components/general/Th";
import Td from "../../components/general/Td";
import Modal from "../../components/general/Modal";
import { GET_APPROVED_ADS_CAMPAIGNS } from "../../graphql/approvedCampaigns";
import { GET_APPROVED_ROULETTE_CAMPAIGNS } from "../../graphql/approvedCampaigns";
import { GET_APPROVED_BEMIDIA_CAMPAIGNS } from "../../graphql/approvedCampaigns";
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

type ApprovedRouletteCampaign = {
  id: number;
  name: string;
  advertiser: string;
  dateCreated: string;
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
};

type ApprovedBeMidiaCampaign = {
  id: number;
  name: string;
  advertiser: string;
  dateCreated: string;
  startDate: string;
  startHour: string;
  endDate: string;
  endHour: string;
  budget: string;
};

const AdminApprovedCampaigns = () => {
  const { data: adsData, loading: loadingApprovedAdsCampaigns } = useQuery(
    GET_APPROVED_ADS_CAMPAIGNS
  );
  const { data: rouletteData, loading: loadingApprovedRouletteCampaigns } =
    useQuery(GET_APPROVED_ROULETTE_CAMPAIGNS);
  const { data: bemidiaData, loading: loadingApprovedBeMidiaCampaigns } =
    useQuery(GET_APPROVED_BEMIDIA_CAMPAIGNS);

  const approvedAdsCampaigns = useMemo(
    () => adsData?.getApprovedAdsCampaigns || [],
    [adsData?.getApprovedAdsCampaigns]
  );
  const approvedRouletteCampaigns = useMemo(
    () => rouletteData?.getApprovedRouletteCampaigns || [],
    [rouletteData?.getApprovedRouletteCampaigns]
  );
  const approvedBeMidiaCampaigns = useMemo(
    () => bemidiaData?.getApprovedBeMidiaCampaigns || [],
    [bemidiaData?.getApprovedBeMidiaCampaigns]
  );

  const [selectedCampaign, setSelectedCampaign] = useState<
    ApprovedAdsCampaign | ApprovedRouletteCampaign | ApprovedBeMidiaCampaign | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignType, setCampaignType] = useState<"ads" | "roulette" | "bemidia">("ads");

  const handleViewCampaign = (
    campaign: ApprovedAdsCampaign | ApprovedRouletteCampaign | ApprovedBeMidiaCampaign,
    type: "ads" | "roulette" | "bemidia"
  ) => {
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
              Approved Campaigns
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              View all approved campaigns in the system
            </p>
          </div>

          {/* Ads Campaigns Section */}
          <h2 className="text-lg mb-4 font-bold text-theme-gray">
            Ads Campaigns
          </h2>
          {loadingApprovedAdsCampaigns ? (
            <Loader text="Loading Approved Ads Campaigns..." />
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
                  {approvedAdsCampaigns.length > 0 ? (
                    approvedAdsCampaigns.map(
                      (campaign: ApprovedAdsCampaign) => (
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
                              onClick={() =>
                                handleViewCampaign(campaign, "ads")
                              }
                              className="bg-blue-500 text-white rounded px-4 py-2"
                            />
                          </Td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <Td colSpan={7} align="center">
                        No approved ads campaigns found.
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
          {loadingApprovedRouletteCampaigns ? (
            <Loader text="Loading Approved Roulette Campaigns..." />
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
                    <Th>Main Prize</Th>
                    <Th>Budget</Th>
                    <Th>Action</Th>
                  </tr>
                </thead>
                <tbody>
                  {approvedRouletteCampaigns.length > 0 ? (
                    approvedRouletteCampaigns.map(
                      (campaign: ApprovedRouletteCampaign) => (
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
                          <Td>{campaign.mainPrize}</Td>
                          <Td>${campaign.budget}</Td>
                          <Td>
                            <Button
                              text="View"
                              onClick={() =>
                                handleViewCampaign(campaign, "roulette")
                              }
                              className="bg-blue-500 text-white rounded px-4 py-2"
                            />
                          </Td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <Td colSpan={8} align="center">
                        No approved roulette campaigns found.
                      </Td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* BeMidia Campaigns Section */}
          <h2 className="text-lg mb-4 font-bold text-theme-gray">
            BeMidia Campaigns
          </h2>
          {loadingApprovedBeMidiaCampaigns ? (
            <Loader text="Loading Approved BeMidia Campaigns..." />
          ) : (
            <div className="w-full overflow-x-auto mb-8">
              <table className="w-full min-w-fit">
                <thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Advertiser</Th>
                    <Th>Date Created</Th>
                    <Th>Start Date</Th>
                    <Th>Start Hour</Th>
                    <Th>End Date</Th>
                    <Th>End Hour</Th>
                    <Th>Budget</Th>
                    <Th>Action</Th>
                  </tr>
                </thead>
                <tbody>
                  {approvedBeMidiaCampaigns.length > 0 ? (
                    approvedBeMidiaCampaigns.map(
                      (campaign: ApprovedBeMidiaCampaign) => (
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
                          <Td>{campaign.startHour}</Td>
                          <Td>
                            {`${new Date(
                              Number(campaign.endDate)
                            ).toLocaleDateString("en-GB")}`}
                          </Td>
                          <Td>{campaign.endHour}</Td>
                          <Td>${campaign.budget}</Td>
                          <Td>
                            <Button
                              text="View"
                              onClick={() =>
                                handleViewCampaign(campaign, "bemidia")
                              }
                              className="bg-blue-500 text-white rounded px-4 py-2"
                            />
                          </Td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <Td colSpan={9} align="center">
                        No approved BeMidia campaigns found.
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

            {campaignType === "roulette" && (
              <>
                <p>
                  <strong>Main Prize:</strong>{" "}
                  {(selectedCampaign as ApprovedRouletteCampaign).mainPrize}
                </p>
                <p>
                  <strong>Main Prize Amount:</strong> $
                  {
                    (selectedCampaign as ApprovedRouletteCampaign)
                      .mainPrizeAmount
                  }
                </p>
                {(selectedCampaign as ApprovedRouletteCampaign).secPrize1 && (
                  <p>
                    <strong>Secondary Prize 1:</strong>{" "}
                    {(selectedCampaign as ApprovedRouletteCampaign).secPrize1}
                    {(selectedCampaign as ApprovedRouletteCampaign).amount1 &&
                      ` ($${
                        (selectedCampaign as ApprovedRouletteCampaign).amount1
                      })`}
                  </p>
                )}
                {(selectedCampaign as ApprovedRouletteCampaign).secPrize2 && (
                  <p>
                    <strong>Secondary Prize 2:</strong>{" "}
                    {(selectedCampaign as ApprovedRouletteCampaign).secPrize2}
                    {(selectedCampaign as ApprovedRouletteCampaign).amount2 &&
                      ` ($${
                        (selectedCampaign as ApprovedRouletteCampaign).amount2
                      })`}
                  </p>
                )}
                {(selectedCampaign as ApprovedRouletteCampaign).secPrize3 && (
                  <p>
                    <strong>Secondary Prize 3:</strong>{" "}
                    {(selectedCampaign as ApprovedRouletteCampaign).secPrize3}
                    {(selectedCampaign as ApprovedRouletteCampaign).amount3 &&
                      ` ($${
                        (selectedCampaign as ApprovedRouletteCampaign).amount3
                      })`}
                  </p>
                )}
              </>
            )}

            {campaignType === "bemidia" && (
              <>
                <p>
                  <strong>Start Hour:</strong>{" "}
                  {(selectedCampaign as ApprovedBeMidiaCampaign).startHour}
                </p>
                <p>
                  <strong>End Hour:</strong>{" "}
                  {(selectedCampaign as ApprovedBeMidiaCampaign).endHour}
                </p>
              </>
            )}

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
