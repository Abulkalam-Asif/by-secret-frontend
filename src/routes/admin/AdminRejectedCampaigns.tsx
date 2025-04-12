import Th from "../../components/general/Th.tsx";
import Td from "../../components/general/Td.tsx";

const sampleRejectedCampaigns = [
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
  },
];

const AdminRejectedCampaigns = () => {
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminRejectedCampaigns;
