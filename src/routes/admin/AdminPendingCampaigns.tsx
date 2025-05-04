import { useMemo, useState } from "react";
import Button from "../../components/general/Button";
import Th from "../../components/general/Th";
import Td from "../../components/general/Td";
import Modal from "../../components/general/Modal.tsx"; // Assuming a Modal component exists
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_PENDING_ADS_CAMPAIGNS,
  APPROVE_ADS_CAMPAIGN,
  REJECT_ADS_CAMPAIGN,
} from "../../graphql/pendingCampaigns.ts";
import Loader from "../../components/general/Loader.tsx";
import { useAlert } from "../../contexts/AlertContext.tsx";

type PendingAdsCampaign = {
  id: number;
  name: string;
  advertiser: string;
  dateRequested: string;
  days: number;
  startDate: string;
  budget: string;
  media: string;
  action: string;
};

const AdminPendingCampaigns = () => {
  const { showAlert } = useAlert();
  const { data, loading: loadingPendingAdsCampaigns } = useQuery(
    GET_PENDING_ADS_CAMPAIGNS
  );

  const pendingCampaigns = useMemo(
    () => data?.getPendingAdsCampaigns || [],
    [data?.getPendingAdsCampaigns]
  );

  const [selectedCampaign, setSelectedCampaign] =
    useState<PendingAdsCampaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRejectionNotes, setShowRejectionNotes] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const [approveAdsCampaign] = useMutation(APPROVE_ADS_CAMPAIGN, {
    refetchQueries: [GET_PENDING_ADS_CAMPAIGNS],
  });

  const [rejectAdsCampaign] = useMutation(REJECT_ADS_CAMPAIGN, {
    refetchQueries: [GET_PENDING_ADS_CAMPAIGNS],
  });

  const handleViewCampaign = (campaign: PendingAdsCampaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
    setShowRejectionNotes(false);
    setRejectionReason("");
  };

  const handleApprove = async () => {
    if (!selectedCampaign) return;
    try {
      const response = await approveAdsCampaign({
        variables: { id: selectedCampaign.id },
      });
      if (response.data.approveAdsCampaign.success) {
        showAlert({
          type: "success",
          message: "Campaign approved successfully",
        });
      } else {
        showAlert({
          type: "error",
          message: response.data.approveAdsCampaign.message,
        });
      }
    } catch (error) {
      showAlert({
        type: "error",
        message: "Error approving campaign",
      });
    }
    setIsModalOpen(false);
  };

  const handleReject = () => {
    setShowRejectionNotes(true);
  };

  const handleSubmitRejection = async () => {
    if (!selectedCampaign) return;
    try {
      const response = await rejectAdsCampaign({
        variables: { id: selectedCampaign.id, rejectionReason },
      });
      if (response.data.rejectAdsCampaign.success) {
        showAlert({
          type: "success",
          message: "Campaign rejected successfully",
        });
      } else {
        showAlert({
          type: "error",
          message: response.data.rejectAdsCampaign.message,
        });
      }
    } catch (error) {
      showAlert({
        type: "error",
        message: "Error rejecting campaign",
      });
    }
    setIsModalOpen(false);
    setShowRejectionNotes(false);
    setRejectionReason("");
  };

  const handleCancelRejection = () => {
    setShowRejectionNotes(false);
    setRejectionReason("");
  };

  return (
    <>
      <section>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-theme-gray">
                Pending Campaigns
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                List of all pending campaigns in the system
              </p>
            </div>
          </div>
          <h2 className="text-lg mb-4 font-bold text-theme-gray">
            Ads Campaigns
          </h2>
          {loadingPendingAdsCampaigns ? (
            <Loader text="Loading Pending Ads Campaigns..." />
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
                  {pendingCampaigns.length > 0 ? (
                    pendingCampaigns.map((campaign: PendingAdsCampaign) => (
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
                            alt={`${campaign.advertiser}-media`}
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
                        No pending campaigns found.
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
            <p>
              <strong>Action:</strong> {selectedCampaign.action}
            </p>
            <div className="mt-4">
              <strong>Media:</strong>
              <img
                src={selectedCampaign.media}
                alt={`${selectedCampaign.advertiser} media`}
                className="max-w-full h-auto mt-2 rounded"
              />
            </div>
            {showRejectionNotes ? (
              <div className="mt-4">
                <textarea
                  className="border rounded p-2 w-full"
                  placeholder="Enter rejection reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
                <div className="mt-2 flex justify-end gap-2">
                  <Button text="Submit" onClick={handleSubmitRejection} />
                  <Button text="Cancel" onClick={handleCancelRejection} />
                </div>
              </div>
            ) : (
              <div className="mt-4 flex justify-end gap-2">
                <Button text="Approve" onClick={handleApprove} />
                <Button text="Reject" onClick={handleReject} />
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default AdminPendingCampaigns;
