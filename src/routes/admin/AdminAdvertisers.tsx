import React from "react";

const sampleData = [
  {
    id: 1,
    companyName: "Global Tech Solutions",
    logo: "https://cdn.worldvectorlogo.com/logos/digitalocean-icon-1.svg",
    fullContactName: "John Smith",
    phoneNumber: "(555) 123-4567",
    email: "john.smith@globaltech.com",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    zipCode: "94105",
    status: "Active",
  },
  {
    id: 2,
    companyName: "Innovative Marketing",
    logo: "https://cdn.worldvectorlogo.com/logos/svelte-1.svg",
    fullContactName: "Sarah Johnson",
    phoneNumber: "(555) 987-6543",
    email: "sarah@innovativemarketing.com",
    address: "456 Market Street",
    city: "New York",
    state: "NY",
    country: "USA",
    zipCode: "10001",
    status: "Active",
  },
  {
    id: 3,
    companyName: "EcoTech Industries",
    logo: "https://cdn.worldvectorlogo.com/logos/swatch-group-5.svg",
    fullContactName: "Michael Chen",
    phoneNumber: "(555) 234-5678",
    email: "mchen@ecotech.com",
    address: "789 Green Ave",
    city: "Austin",
    state: "TX",
    country: "USA",
    zipCode: "73301",
    status: "Suspended",
  },
  {
    id: 4,
    companyName: "Digital Dynamics",
    logo: "https://cdn.worldvectorlogo.com/logos/djurgarden.svg",
    fullContactName: "Emily Rodriguez",
    phoneNumber: "(555) 345-6789",
    email: "emily@digitaldynamics.com",
    address: "321 Tech Blvd",
    city: "Seattle",
    state: "WA",
    country: "USA",
    zipCode: "98101",
    status: "Active",
  },
  {
    id: 5,
    companyName: "Nordic Solutions",
    logo: "https://cdn.worldvectorlogo.com/logos/spotify-2.svg",
    fullContactName: "Lars Erikson",
    phoneNumber: "+46 70 123 4567",
    email: "lars@nordicsolutions.se",
    address: "Kungsgatan 12",
    city: "Stockholm",
    state: "",
    country: "Sweden",
    zipCode: "11122",
    status: "Suspended",
  },
];

const AdminAdvertisers = () => {
  return (
    <>
      <section>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-theme-gray">Advertisers</h1>
            <p className="text-sm text-gray-500 mt-2">
              Here is a table of all the advertisers.
            </p>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-fit">
              <thead>
                <tr>
                  <Th>Company Name</Th>
                  <Th>Logo</Th>
                  <Th>Full Contact Name</Th>
                  <Th>Phone Number</Th>
                  <Th>Email</Th>
                  <Th>Address</Th>
                  <Th>City</Th>
                  <Th>State</Th>
                  <Th>Country</Th>
                  <Th>Zip Code</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((data) => (
                  <tr key={data.id}>
                    <Td>{data.companyName}</Td>
                    <Td align="center">
                      <img
                        src={data.logo}
                        alt={data.companyName}
                        className="h-8 w-auto"
                      />
                    </Td>
                    <Td>{data.fullContactName}</Td>
                    <Td>{data.phoneNumber}</Td>
                    <Td>{data.email}</Td>
                    <Td>{data.address}</Td>
                    <Td>{data.city}</Td>
                    <Td>{data.state}</Td>
                    <Td>{data.country}</Td>
                    <Td>{data.zipCode}</Td>
                    <Td>{data.status}</Td>
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

export default AdminAdvertisers;

type ThProps = {
  children: React.ReactNode;
};
const Th = ({ children }: ThProps) => (
  <th className="text-xs font-semibold text-theme-gray uppercase border-2 border-theme-light-gray p-2">
    {children}
  </th>
);

type TdProps = {
  children: React.ReactNode;
  align?: "center" | "left" | "right";
};
const Td = ({ children, align = "left" }: TdProps) => (
  <td
    align={align}
    className="text-sm text-theme-dark-gray border-2 border-theme-light-gray p-2">
    {children}
  </td>
);
