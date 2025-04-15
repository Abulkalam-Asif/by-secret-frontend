import { useState } from "react";
import Button from "../../components/general/Button";
import Th from "../../components/general/Th";
import Td from "../../components/general/Td";
import Modal from "../../components/general/Modal";
import InputBox from "../../components/general/InputBox";
import ImageInput from "../../components/general/ImageInput";

type Campaign = {
  id: number;
  name: string;
  image: File | null;
  action: string;
  dateRange: { from: string; to: string };
  budget: string;
  status: string;
};

const sampleCampaigns = [
  {
    id: 1,
    name: "Spring Sale Campaign",
    image: null,
    action: "https://example.com/spring-sale",
    dateRange: { from: "2025-04-15T09:00", to: "2025-04-20T18:00" },
    budget: "500",
    status: "pending",
  },
  {
    id: 2,
    name: "Summer Discount Campaign",
    image: null,
    action: "https://example.com/summer-discount",
    dateRange: { from: "2025-05-01T10:00", to: "2025-05-10T20:00" },
    budget: "1000",
    status: "pending",
  },
  {
    id: 3,
    name: "Holiday Special Campaign",
    image: null,
    action: "https://example.com/holiday-special",
    dateRange: { from: "2025-12-01T08:00", to: "2025-12-31T23:59" },
    budget: "2000",
    status: "pending",
  },
];

const AdvAdsCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(sampleCampaigns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState<Campaign>({
    id: 0,
    name: "",
    image: null,
    action: "",
    dateRange: { from: "", to: "" },
    budget: "",
    status: "pending",
  });

  const handleAddCampaign = () => {
    setIsModalOpen(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setNewCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleSubmitCampaign = () => {
    setCampaigns((prev: Campaign[]) => {
      const existingIndex = prev.findIndex((c) => c.id === newCampaign.id);
      if (existingIndex !== -1) {
        // Update existing campaign
        const updatedCampaigns = [...prev];
        updatedCampaigns[existingIndex] = { ...newCampaign };
        return updatedCampaigns;
      }
      // Add new campaign
      return [...prev, { ...newCampaign, status: "pending", id: Date.now() }];
    });

    setNewCampaign({
      id: 0,
      name: "",
      image: null,
      action: "",
      dateRange: { from: "", to: "" },
      budget: "",
      status: "pending",
    });
    setIsModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    setNewCampaign((prev) => ({ ...prev, image: file }));
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
                {campaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="border-b border-gray-200 hover:bg-gray-50">
                    <Td>{campaign.name}</Td>
                    <Td>
                      {campaign.image ? (
                        <img
                          src={URL.createObjectURL(campaign.image)}
                          alt="Ad"
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        "N/A"
                      )}
                    </Td>
                    <Td>{campaign.action}</Td>
                    <Td>
                      {campaign.dateRange.from} - {campaign.dateRange.to}
                    </Td>
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
                      <Button
                        text="Edit"
                        onClick={() => handleEditCampaign(campaign)}
                      />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
              {newCampaign.id ? "Edit Campaign" : "Add New Campaign"}
            </h2>
            <div className="mb-4">
              <InputBox
                name="campaignName"
                id="campaignName"
                type="text"
                value={newCampaign.name}
                placeholder="Enter campaign name"
                onChange={(e) =>
                  setNewCampaign((prev) => ({ ...prev, name: e.target.value }))
                }
                label="Campaign Name"
                required
              />
            </div>
            <div className="mb-4">
              <ImageInput
                label="Ad Image"
                idHtmlFor="adImage"
                value={{ file: newCampaign.image, base64: "" }}
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-4">
              <InputBox
                name="actionUrl"
                id="actionUrl"
                type="text"
                value={newCampaign.action}
                placeholder="Enter action URL"
                onChange={(e) =>
                  setNewCampaign((prev) => ({
                    ...prev,
                    action: e.target.value,
                  }))
                }
                label="Action (URL)"
                required
              />
            </div>
            <div className="mb-4">
              <div className="flex gap-2 flex-col sm:flex-row">
                <InputBox
                  name="fromDate"
                  id="fromDate"
                  type="date"
                  value={newCampaign.dateRange.from}
                  onChange={(e) =>
                    setNewCampaign((prev) => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, from: e.target.value },
                    }))
                  }
                  label="From Date"
                  required
                />
                <InputBox
                  name="toDate"
                  id="toDate"
                  type="date"
                  value={newCampaign.dateRange.to}
                  onChange={(e) =>
                    setNewCampaign((prev) => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, to: e.target.value },
                    }))
                  }
                  label="To Date"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <InputBox
                name="budget"
                id="budget"
                type="number"
                value={newCampaign.budget}
                placeholder="Enter budget"
                onChange={(e) =>
                  setNewCampaign((prev) => ({
                    ...prev,
                    budget: e.target.value,
                  }))
                }
                label="Budget (in dollars)"
                required
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button text="Submit" onClick={handleSubmitCampaign} />
              <Button text="Cancel" onClick={() => setIsModalOpen(false)} />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AdvAdsCampaigns;
