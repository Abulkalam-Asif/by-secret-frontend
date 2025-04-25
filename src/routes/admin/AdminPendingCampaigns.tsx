import { useState } from "react";
import Button from "../../components/general/Button";
import Th from "../../components/general/Th";
import Td from "../../components/general/Td";
import Modal from "../../components/general/Modal.tsx"; // Assuming a Modal component exists

type PendingCampaign = {
  id: number;
  advertiser: string;
  dateRequested: string;
  days: number;
  startDate: string;
  type: string;
  budget: string;
  media: string;
  action: string;
  urlOrPhone: string;
  prizes: string;
  status: string;
};

const samplePendingCampaigns = [
  {
    id: 1,
    advertiser: "ABC Company",
    dateRequested: "2023-05-10",
    days: 30,
    startDate: "2023-06-01",
    type: "Ads",
    budget: "$5,000",
    media:
      "https://images.unsplash.com/photo-1736279206455-afb3b27b44d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWRzfGVufDB8fDB8fHww",
    action: "Click",
    urlOrPhone: "https://example.com",
    prizes: "",
    status: "pending",
  },
  {
    id: 2,
    advertiser: "XYZ Corporation",
    dateRequested: "2023-05-12",
    days: 15,
    startDate: "2023-05-25",
    type: "Roulette",
    budget: "$10,000",
    media:
      "https://images.unsplash.com/photo-1712757057495-016f69c8edbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWRzfGVufDB8fDB8fHww",
    action: "Spin",
    urlOrPhone: "+1 555-123-4567",
    prizes: "Gift cards, Electronics, Cash",
    status: "pending",
  },
  {
    id: 3,
    advertiser: "123 Industries",
    dateRequested: "2023-05-08",
    days: 45,
    startDate: "2023-06-15",
    type: "Ads",
    budget: "$7,500",
    media:
      "https://images.unsplash.com/photo-1551383616-a9e150c07fca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFkc3xlbnwwfHwwfHx8MA%3D%3D",
    action: "View",
    urlOrPhone: "https://123industries.com",
    prizes: "",
    status: "pending",
  },
];

const AdminPendingCampaigns = () => {
  const [selectedCampaign, setSelectedCampaign] =
    useState<PendingCampaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRejectionNotes, setShowRejectionNotes] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleViewCampaign = (campaign: PendingCampaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
    setShowRejectionNotes(false);
    setRejectionReason("");
  };

  const handleApprove = () => {
    // Logic to approve the campaign
    setIsModalOpen(false);
  };

  const handleReject = () => {
    // Show rejection notes field
    setShowRejectionNotes(true);
  };

  const handleSubmitRejection = () => {
    // Logic to reject the campaign with reason
    console.log(`Campaign rejected with reason: ${rejectionReason}`);
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
            <div>
              <Button text="+ Add New Campaign" onClick={() => {}} />
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-fit">
              <thead>
                <tr>
                  <Th>Advertiser</Th>
                  <Th>Date Requested</Th>
                  <Th>Days</Th>
                  <Th>Start Date</Th>
                  <Th>Type</Th>
                  <Th>Budget</Th>
                  <Th>Media</Th>
                  <Th>Action</Th>
                  <Th>URL or Phone</Th>
                  <Th>Prizes</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {samplePendingCampaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="border-b border-gray-200 hover:bg-gray-50">
                    <Td>{campaign.advertiser}</Td>
                    <Td>{campaign.dateRequested}</Td>
                    <Td>{campaign.days}</Td>
                    <Td>{campaign.startDate}</Td>
                    <Td>{campaign.type}</Td>
                    <Td>{campaign.budget}</Td>
                    <Td>
                      <img
                        src={campaign.media}
                        alt={`${campaign.advertiser} media`}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </Td>
                    <Td>{campaign.action}</Td>
                    <Td>{campaign.urlOrPhone}</Td>
                    <Td>{campaign.prizes || "N/A"}</Td>
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
                      <Button
                        text="View"
                        onClick={() => handleViewCampaign(campaign)}
                        className="bg-blue-500 text-white rounded px-4 py-2"
                      />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              <strong>Type:</strong> {selectedCampaign.type}
            </p>
            <p>
              <strong>Budget:</strong> {selectedCampaign.budget}
            </p>
            <div className="mt-4">
              <strong>Media:</strong>
              <img
                src={selectedCampaign.media}
                alt={`${selectedCampaign.advertiser} media`}
                className="max-w-full h-auto mt-2 rounded"
              />
            </div>
            <p>
              <strong>Action:</strong> {selectedCampaign.action}
            </p>
            <p>
              <strong>URL or Phone:</strong> {selectedCampaign.urlOrPhone}
            </p>
            <p>
              <strong>Prizes:</strong> {selectedCampaign.prizes || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {selectedCampaign.status}
            </p>
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
