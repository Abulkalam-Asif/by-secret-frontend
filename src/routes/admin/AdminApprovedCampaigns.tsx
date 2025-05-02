import { useState } from "react";
import Button from "../../components/general/Button";
import Th from "../../components/general/Th";
import Td from "../../components/general/Td";
import Modal from "../../components/general/Modal";

type ApprovedCampaign = {
  id: number;
  advertiser: string;
  dateCreated: string;
  fromDate: string;
  toDate: string;
  type: string;
  budget: string;
  status: string;
};

const sampleApprovedCampaigns = [
  {
    id: 1,
    advertiser: "ABC Company",
    dateCreated: "2023-05-15",
    fromDate: "2023-06-01",
    toDate: "2023-07-01",
    type: "Ads",
    budget: "$5,000",
    status: "running",
  },
  {
    id: 2,
    advertiser: "XYZ Corporation",
    dateCreated: "2023-05-20",
    fromDate: "2023-05-25",
    toDate: "2023-06-09",
    type: "Roulette",
    budget: "$10,000",
    status: "queue",
  },
  {
    id: 3,
    advertiser: "123 Industries",
    dateCreated: "2023-04-18",
    fromDate: "2023-05-01",
    toDate: "2023-06-15",
    type: "Ads",
    budget: "$7,500",
    status: "completed",
  },
  {
    id: 4,
    advertiser: "Global Tech",
    dateCreated: "2023-05-05",
    fromDate: "2023-06-10",
    toDate: "2023-07-25",
    type: "Roulette",
    budget: "$12,000",
    status: "queue",
  },
  {
    id: 5,
    advertiser: "Local Business Inc.",
    dateCreated: "2023-04-28",
    fromDate: "2023-05-10",
    toDate: "2023-05-25",
    type: "Ads",
    budget: "$3,000",
    status: "completed",
  },
];

const AdminApprovedCampaigns = () => {
  const [selectedCampaign, setSelectedCampaign] =
    useState<ApprovedCampaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewCampaign = (campaign: ApprovedCampaign) => {
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
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-fit">
              <thead>
                <tr>
                  <Th>Advertiser</Th>
                  <Th>Date Created</Th>
                  <Th>From Date</Th>
                  <Th>To Date</Th>
                  <Th>Type</Th>
                  <Th>Budget</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {sampleApprovedCampaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="border-b border-gray-200 hover:bg-gray-50">
                    <Td>{campaign.advertiser}</Td>
                    <Td>{campaign.dateCreated}</Td>
                    <Td>{campaign.fromDate}</Td>
                    <Td>{campaign.toDate}</Td>
                    <Td>{campaign.type}</Td>
                    <Td>{campaign.budget}</Td>
                    <Td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          campaign.status === "queue"
                            ? "bg-blue-100 text-blue-700"
                            : campaign.status === "running"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
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
              <strong>Date Created:</strong> {selectedCampaign.dateCreated}
            </p>
            <p>
              <strong>From Date:</strong> {selectedCampaign.fromDate}
            </p>
            <p>
              <strong>To Date:</strong> {selectedCampaign.toDate}
            </p>
            <p>
              <strong>Type:</strong> {selectedCampaign.type}
            </p>
            <p>
              <strong>Budget:</strong> {selectedCampaign.budget}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedCampaign.status.charAt(0).toUpperCase() +
                selectedCampaign.status.slice(1)}
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
