import { useState } from "react";
import Button from "../../components/general/Button";
import Th from "../../components/general/Th";
import Td from "../../components/general/Td";
import Modal from "../../components/general/Modal";
import InputBox from "../../components/general/InputBox";

type RouletteCampaign = {
  id: number;
  name: string;
  dateRange: { from: string; to: string };
  mainPrize: string;
  mainPrizeAmount: string;
  secondaryPrize1: string;
  secondaryAmount1: string;
  secondaryPrize2: string;
  secondaryAmount2: string;
  secondaryPrize3: string;
  secondaryAmount3: string;
  budget: string;
};

const initialCampaign: RouletteCampaign = {
  id: 0,
  name: "",
  dateRange: { from: "", to: "" },
  mainPrize: "",
  mainPrizeAmount: "",
  secondaryPrize1: "",
  secondaryAmount1: "",
  secondaryPrize2: "",
  secondaryAmount2: "",
  secondaryPrize3: "",
  secondaryAmount3: "",
  budget: "",
};

const sampleRouletteCampaigns: RouletteCampaign[] = [
  {
    id: 1,
    name: "Weekly Spin Giveaway",
    dateRange: { from: "2025-04-01T08:00", to: "2025-04-07T23:59" },
    mainPrize: "$100 Gift Card",
    mainPrizeAmount: "100",
    secondaryPrize1: "$50 Gift Card",
    secondaryAmount1: "50",
    secondaryPrize2: "$20 Gift Card",
    secondaryAmount2: "20",
    secondaryPrize3: "",
    secondaryAmount3: "",
    budget: "500",
  },
  {
    id: 2,
    name: "Monthly Spin Bonanza",
    dateRange: { from: "2025-05-01T08:00", to: "2025-05-31T23:59" },
    mainPrize: "$500 Shopping Spree",
    mainPrizeAmount: "500",
    secondaryPrize1: "$100 Gift Card",
    secondaryAmount1: "100",
    secondaryPrize2: "$50 Gift Card",
    secondaryAmount2: "50",
    secondaryPrize3: "$25 Gift Card",
    secondaryAmount3: "25",
    budget: "2000",
  },
  {
    id: 3,
    name: "Holiday Spin Extravaganza",
    dateRange: { from: "2025-12-01T08:00", to: "2025-12-31T23:59" },
    mainPrize: "$1000 Holiday Package",
    mainPrizeAmount: "1000",
    secondaryPrize1: "$200 Gift Card",
    secondaryAmount1: "200",
    secondaryPrize2: "$100 Gift Card",
    secondaryAmount2: "100",
    secondaryPrize3: "$50 Gift Card",
    secondaryAmount3: "50",
    budget: "5000",
  },
];

const AdvRouletteCampaigns = () => {
  const [campaigns, setCampaigns] = useState<RouletteCampaign[]>(
    sampleRouletteCampaigns
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] =
    useState<RouletteCampaign>(initialCampaign);

  const handleAddCampaign = () => {
    setNewCampaign(initialCampaign);
    setIsModalOpen(true);
  };

  const handleEditCampaign = (camp: RouletteCampaign) => {
    setNewCampaign(camp);
    setIsModalOpen(true);
  };

  const handleSubmitCampaign = () => {
    setCampaigns((prev) => {
      const idx = prev.findIndex((c) => c.id === newCampaign.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = { ...newCampaign };
        return updated;
      }
      return [...prev, { ...newCampaign, id: Date.now() }];
    });
    setNewCampaign(initialCampaign);
    setIsModalOpen(false);
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
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-fit">
              <thead>
                <tr>
                  <Th>Campaign Name</Th>
                  <Th>Date Range</Th>
                  <Th>Main Prize</Th>
                  <Th>Amount</Th>
                  <Th>Sec Prize 1</Th>
                  <Th>Amount 1</Th>
                  <Th>Sec Prize 2</Th>
                  <Th>Amount 2</Th>
                  <Th>Sec Prize 3</Th>
                  <Th>Amount 3</Th>
                  <Th>Budget</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-gray-200 hover:bg-gray-50">
                    <Td>{c.name}</Td>
                    <Td>
                      {c.dateRange.from} - {c.dateRange.to}
                    </Td>
                    <Td>{c.mainPrize}</Td>
                    <Td>${c.mainPrizeAmount}</Td>
                    <Td>{c.secondaryPrize1 || "N/A"}</Td>
                    <Td>
                      {c.secondaryAmount1 ? `$${c.secondaryAmount1}` : "N/A"}
                    </Td>
                    <Td>{c.secondaryPrize2 || "N/A"}</Td>
                    <Td>
                      {c.secondaryAmount2 ? `$${c.secondaryAmount2}` : "N/A"}
                    </Td>
                    <Td>{c.secondaryPrize3 || "N/A"}</Td>
                    <Td>
                      {c.secondaryAmount3 ? `$${c.secondaryAmount3}` : "N/A"}
                    </Td>
                    <Td>${c.budget}</Td>
                    <Td>
                      <Button
                        text="Edit"
                        onClick={() => handleEditCampaign(c)}
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
                label="Campaign Name"
                id="campaignName"
                name="campaignName"
                type="text"
                value={newCampaign.name}
                onChange={(e) =>
                  setNewCampaign((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="mb-4 flex gap-2 flex-col sm:flex-row">
              <InputBox
                label="From"
                id="fromDateTime"
                name="fromDateTime"
                type="datetime-local"
                value={newCampaign.dateRange.from}
                onChange={(e) =>
                  setNewCampaign((prev) => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, from: e.target.value },
                  }))
                }
                required
              />
              <InputBox
                label="To"
                id="toDateTime"
                name="toDateTime"
                type="datetime-local"
                value={newCampaign.dateRange.to}
                onChange={(e) =>
                  setNewCampaign((prev) => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, to: e.target.value },
                  }))
                }
                required
              />
            </div>
            <div className="mb-4">
              <InputBox
                label="Main Prize"
                id="mainPrize"
                name="mainPrize"
                type="text"
                value={newCampaign.mainPrize}
                onChange={(e) =>
                  setNewCampaign((prev) => ({
                    ...prev,
                    mainPrize: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="mb-4">
              <InputBox
                label="Main Prize Amount"
                id="mainPrizeAmount"
                name="mainPrizeAmount"
                type="number"
                value={newCampaign.mainPrizeAmount}
                onChange={(e) =>
                  setNewCampaign((prev) => ({
                    ...prev,
                    mainPrizeAmount: e.target.value,
                  }))
                }
                required
              />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-4 flex gap-2 flex-col sm:flex-row">
                <InputBox
                  label={`Secondary Prize ${i}`}
                  id={`secondaryPrize${i}`}
                  name={`secondaryPrize${i}`}
                  type="text"
                  value={
                    newCampaign[
                      `secondaryPrize${i}` as keyof RouletteCampaign
                    ] as string
                  }
                  onChange={(e) =>
                    setNewCampaign(
                      (prev) =>
                        ({
                          ...prev,
                          [`secondaryPrize${i}`]: e.target.value,
                        } as RouletteCampaign)
                    )
                  }
                />
                <InputBox
                  label={`Amount ${i}`}
                  id={`secondaryAmount${i}`}
                  name={`secondaryAmount${i}`}
                  type="number"
                  value={
                    newCampaign[
                      `secondaryAmount${i}` as keyof RouletteCampaign
                    ] as string
                  }
                  onChange={(e) =>
                    setNewCampaign(
                      (prev) =>
                        ({
                          ...prev,
                          [`secondaryAmount${i}`]: e.target.value,
                        } as RouletteCampaign)
                    )
                  }
                />
              </div>
            ))}
            <div className="mb-4">
              <InputBox
                label="Budget"
                id="budget"
                name="budget"
                type="number"
                value={newCampaign.budget}
                onChange={(e) =>
                  setNewCampaign((prev) => ({
                    ...prev,
                    budget: e.target.value,
                  }))
                }
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

export default AdvRouletteCampaigns;
