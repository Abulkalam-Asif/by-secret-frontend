import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useState } from "react";
import Button from "../../components/general/Button";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { useQuery } from "@apollo/client";
import { GET_CAMPAIGNS_COUNT } from "../../graphql/campaignsCount";

// Define types for chart data
interface ChartDataItem {
  name: string;
  value: number;
}

// Define types for component props
interface StatCardProps {
  title: string;
  value: number;
  subtitle?: string;
}

interface ChartCardProps {
  title: string;
  data: ChartDataItem[];
  colors: string[];
  donut?: boolean;
  loading?: boolean;
}

// Define type for tooltip props
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      percent: number;
    };
  }>;
}

// Custom tooltip formatter
const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
        <p className="font-medium text-sm">{`${payload[0].name}`}</p>
        <p className="text-sm text-gray-700">{`Value: ${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

// Stat Card component for reusability
const StatCard = ({ title, value, subtitle }: StatCardProps) => (
  <div className="bg-white rounded-xl shadow-lg p-6 h-full">
    <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
    <p className="text-3xl font-bold text-theme-gray mb-2">
      {value.toLocaleString()}
    </p>
    {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
  </div>
);

// Chart Card component for reusability
const ChartCard = ({
  title,
  data,
  colors,
  donut = true,
  loading,
}: ChartCardProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const dataWithPercent = data.map((item) => ({
    ...item,
    percent: item.value / total,
  }));

  const [opacity, setOpacity] = useState<
    Record<string, string | number | undefined>
  >(data.reduce((acc, item) => ({ ...acc, [item.name]: 1 }), {}));

  const handleLegendMouseEnter = (data: Payload) => {
    const { value } = data;
    setOpacity((op) => ({ ...op, [value]: 0.5 }));
  };
  const handleLegendMouseLeave = (data: Payload) => {
    const { value } = data;
    setOpacity((op) => ({ ...op, [value]: 1 }));
  };

  return total > 0 ? (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      <h3 className="text-gray-500 text-sm font-medium mb-4">{title}</h3>
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="animate-pulse bg-gray-200 h-40 w-40 rounded-full sm:h-52 sm:w-52"></div>
          <div className="animate-pulse bg-gray-200 h-6 w-1/2 rounded"></div>
        </div>
      ) : (
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithPercent}
                cx="50%"
                cy="50%"
                outerRadius="80%"
                innerRadius={donut ? "32%" : 0}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={1}
                cornerRadius={4}>
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    opacity={opacity[_.name]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                onMouseEnter={handleLegendMouseEnter}
                onMouseLeave={handleLegendMouseLeave}
                iconType="circle"
                iconSize={10}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  ) : (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full flex items-center justify-center">
      <p className="text-gray-500 text-sm font-medium">
        No campaigns available
      </p>
    </div>
  );
};

const AdvertiserDashboard = () => {
  const { data: campaignsCountData, loading: loadingCampaignsCount } =
    useQuery(GET_CAMPAIGNS_COUNT);

  const dashboardData = {
    totalClicks: 1200,
    totalViews: 4500,
    averageClicksPerCampaign: 150,
    averageViewsPerCampaign: 375,
    campaigns: {
      pending: campaignsCountData?.getCampaignsCount?.pending || 0,
      approved: campaignsCountData?.getCampaignsCount?.approved || 0,
      rejected: campaignsCountData?.getCampaignsCount?.rejected || 0,
    },
  };

  const COLORS = ["#008236", "#a65f00", "#c10007"];

  const campaignStatusData: ChartDataItem[] = [
    { name: "Approved", value: dashboardData.campaigns.approved },
    { name: "Pending", value: dashboardData.campaigns.pending },
    { name: "Rejected", value: dashboardData.campaigns.rejected },
  ];

  const refreshData = () => {
    alert("Dashboard data refreshed!");
  };

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-theme-gray">
            Advertiser Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of your campaign performance
          </p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <Button
            onClick={refreshData}
            text="Refresh Data"
            type="button"
            className="md:w-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <ChartCard
            title="Campaign Status"
            data={campaignStatusData}
            colors={COLORS}
            donut={true}
            loading={loadingCampaignsCount}
          />
        </div>
        <div className="md:col-span-4">
          <StatCard
            title="Total Clicks"
            value={dashboardData.totalClicks}
            subtitle="All ad interactions"
          />
        </div>
        <div className="md:col-span-4">
          <StatCard
            title="Total Approved Campaigns"
            value={dashboardData.campaigns.approved}
            subtitle="Approved campaigns"
          />
        </div>
        <div className="md:col-span-4">
          <StatCard
            title="Total Pending Campaigns"
            value={dashboardData.campaigns.pending}
            subtitle="Pending campaigns"
          />
        </div>
        <div className="md:col-span-4">
          <StatCard
            title="Total Rejected Campaigns"
            value={dashboardData.campaigns.rejected}
            subtitle="Rejected campaigns"
          />
        </div>
        <div className="md:col-span-4">
          <StatCard
            title="Total Views"
            value={dashboardData.totalViews}
            subtitle="All ad impressions"
          />
        </div>
        <div className="md:col-span-4">
          <StatCard
            title="Avg Clicks per Campaign"
            value={dashboardData.averageClicksPerCampaign}
            subtitle="Average clicks"
          />
        </div>
        <div className="md:col-span-4">
          <StatCard
            title="Avg Views per Campaign"
            value={dashboardData.averageViewsPerCampaign}
            subtitle="Average views"
          />
        </div>
      </div>
    </section>
  );
};

export default AdvertiserDashboard;
