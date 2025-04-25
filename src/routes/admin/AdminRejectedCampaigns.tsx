import Th from "../../components/general/Th.tsx";
import Td from "../../components/general/Td.tsx";
import { useState } from "react";
import Button from "../../components/general/Button";
import Modal from "../../components/general/Modal";

// Define rejected campaign type with rejectionNote
type RejectedCampaign = {
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
  rejectionNote: string;
};

const sampleRejectedCampaigns: RejectedCampaign[] = [
  {
    id: 1,
    advertiser: "ABC Company",
    dateRequested: "2023-05-10",
    days: 30,
    startDate: "2023-06-01",
    type: "Ads",
    budget: "$5,000",
    media: "Social, Display",
    action: "Click",
    urlOrPhone: "https://example.com",
    prizes: "",
    status: "rejected",
    rejectionNote: "Insufficient budget details provided.",
  },
  {
    id: 2,
    advertiser: "XYZ Corporation",
    dateRequested: "2023-05-12",
    days: 15,
    startDate: "2023-05-25",
    type: "Roulette",
    budget: "$10,000",
    media: "Web, Mobile",
    action: "Spin",
    urlOrPhone: "+1 555-123-4567",
    prizes: "Gift cards, Electronics, Cash",
    status: "rejected",
    rejectionNote: "Promotion rules not met.",
  },
  {
    id: 3,
    advertiser: "123 Industries",
    dateRequested: "2023-05-08",
    days: 45,
    startDate: "2023-06-15",
    type: "Ads",
    budget: "$7,500",
    media: "Display, Email",
    action: "View",
    urlOrPhone: "https://123industries.com",
    prizes: "",
    status: "rejected",
    rejectionNote: "Media assets missing.",
  },
];

const AdminRejectedCampaigns = () => {
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
                {sampleRejectedCampaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="border-b border-gray-200 hover:bg-gray-50">
                    <Td>{campaign.advertiser}</Td>
                    <Td>{campaign.dateRequested}</Td>
                    <Td>{campaign.days}</Td>
                    <Td>{campaign.startDate}</Td>
                    <Td>{campaign.type}</Td>
                    <Td>{campaign.budget}</Td>
                    <Td>{campaign.media}</Td>
                    <Td>{campaign.action}</Td>
                    <Td>{campaign.urlOrPhone}</Td>
                    <Td>{campaign.prizes || "N/A"}</Td>
                    <Td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700`}>
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
            <p>
              <strong>Media:</strong> {selectedCampaign.media}
            </p>
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
            <p className="mt-2">
              <strong>Rejection Note:</strong> {selectedCampaign.rejectionNote}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AdminRejectedCampaigns;
