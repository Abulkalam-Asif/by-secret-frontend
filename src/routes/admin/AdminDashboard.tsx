import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import Button from "../../components/general/Button";
import { useEffect, useState } from "react";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { useUser } from "../../contexts/UserContext";
import { useQuery } from "@apollo/client";
import { GET_ADVERTISERS_COUNT } from "../../graphql/advertiserAuth";
import { GET_ALL_CAMPAIGNS_COUNT } from "../../graphql/campaignsCount";

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
  loading?: boolean;
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
        <p className="text-xs text-gray-500">{`(${(
          payload[0].payload.percent * 100
        ).toFixed(1)}%)`}</p>
      </div>
    );
  }
  return null;
};

// Stat Card component for reusability
const StatCard = ({ title, value, subtitle, loading }: StatCardProps) => (
  <div className="bg-white rounded-xl shadow-lg p-6 h-full">
    <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
    {loading ? (
      <div className="animate-pulse bg-gray-200 h-6 w-1/2 rounded"></div>
    ) : (
      <p className="text-3xl font-bold text-theme-gray mb-2">
        {value.toLocaleString()}
      </p>
    )}

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
  // Calculate percentages for each item
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercent = data.map((item) => ({
    ...item,
    percent: item.value / total,
  }));

  const [opacity, setOpacity] = useState<
    Record<string, string | number | undefined>
  >({
    ...data.reduce((acc, item) => ({ ...acc, [item.name]: 1 }), {}),
  });

  // Handle legend mouse events
  const handleLegendMouseEnter = (data: Payload) => {
    const { value } = data;
    setOpacity((op) => ({ ...op, [value]: 0.5 }));
  };
  const handleLegendMouseLeave = (data: Payload) => {
    const { value } = data;
    setOpacity((op) => ({ ...op, [value]: 1 }));
  };

  return (
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
              <defs>
                {colors.map((color, index) => (
                  <linearGradient
                    key={`gradient-${index}`}
                    id={`gradient-${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={color} stopOpacity={1} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={dataWithPercent}
                cx="50%"
                cy="50%"
                outerRadius="80%"
                innerRadius={donut ? "32%" : 0}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive={true}
                animationDuration={800}
                animationBegin={300}
                paddingAngle={4}
                cornerRadius={4}>
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#gradient-${index % colors.length})`}
                    stroke={colors[index % colors.length]}
                    strokeWidth={1}
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
  );
};

const AdminDashboard = () => {
  const { data: advertisersCount, loading: loadingAdvertisersCount } = useQuery(
    GET_ADVERTISERS_COUNT
  );

  const { data: campaignsCountData, loading: loadingCampaignsCount } = useQuery(
    GET_ALL_CAMPAIGNS_COUNT
  );

  const { email } = useUser();
  const sampleDashboardData = {
    totalAdvertisers: 125,
    activeAdvertisers: 98,
    suspendedAdvertisers: 27,
    totalCampaigns: 243,
    scheduledCampaigns: 42,
    runningCampaigns: 86,
    completedCampaigns: 115,
    totalEndUsers: 5842,
    totalAdClicks: 28976,
    totalAdViews: 145832,
  };

  const [dashboardData, setDashboardData] = useState(sampleDashboardData);

  useEffect(() => {
    if (advertisersCount && !loadingAdvertisersCount) {
      setDashboardData((prevData) => ({
        ...prevData,
        totalAdvertisers: advertisersCount.getAdvertisersCount,
      }));
    }
  }, [advertisersCount, loadingAdvertisersCount]);

  useEffect(() => {
    if (campaignsCountData && !loadingCampaignsCount) {
      setDashboardData((prevData) => ({
        ...prevData,
        totalCampaigns:
          campaignsCountData.getAllCampaignsCount.pending +
          campaignsCountData.getAllCampaignsCount.approved +
          campaignsCountData.getAllCampaignsCount.rejected,
        scheduledCampaigns: campaignsCountData.getAllCampaignsCount.pending,
        runningCampaigns: campaignsCountData.getAllCampaignsCount.approved,
        completedCampaigns: campaignsCountData.getAllCampaignsCount.rejected,
      }));
    }
  }, [campaignsCountData, loadingCampaignsCount]);

  // Chart colors - using theme colors
  const COLORS = ["#008236", "#a65f00", "#c10007"];

  // Advertiser status data for pie chart
  const advertiserStatusData: ChartDataItem[] = [
    { name: "Active", value: dashboardData.activeAdvertisers },
    { name: "Suspended", value: dashboardData.suspendedAdvertisers },
  ];

  // Campaign status data for pie chart
  const campaignStatusData: ChartDataItem[] = [
    { name: "Pending", value: dashboardData.scheduledCampaigns },
    { name: "Approved", value: dashboardData.runningCampaigns },
    { name: "Rejected", value: dashboardData.completedCampaigns },
  ];

  // Ad performance data for pie chart
  const adPerformanceData: ChartDataItem[] = [
    { name: "Clicks", value: dashboardData.totalAdClicks },
    {
      name: "Views (no click)",
      value: dashboardData.totalAdViews - dashboardData.totalAdClicks,
    },
  ];

  const refreshData = () => {
    // In a real application, this would fetch fresh data from the API
    // For now, we'll just simulate a refresh with the same data
    alert("Dashboard data refreshed!");
  };

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-theme-gray">
            Welcome, {email}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of platform metrics and performance
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
        {/* First row - Advertiser Stats */}
        <div className="md:col-span-4">
          <StatCard
            title="Total Advertisers"
            value={dashboardData.totalAdvertisers}
            subtitle="All registered advertisers"
            loading={loadingAdvertisersCount}
          />
        </div>
        <div className="md:col-span-8">
          <ChartCard
            title="Advertiser Status"
            data={advertiserStatusData}
            colors={COLORS}
            donut={true}
          />
        </div>

        {/* Second row - Campaign Stats */}
        <div className="md:col-span-4">
          <StatCard
            title="Total Campaigns"
            value={dashboardData.totalCampaigns}
            subtitle="All advertising campaigns"
            loading={loadingCampaignsCount}
          />
        </div>
        <div className="md:col-span-8">
          <ChartCard
            title="Campaign Status"
            data={campaignStatusData}
            colors={COLORS}
            donut={true}
            loading={loadingCampaignsCount}
          />
        </div>

        {/* Third row - User and Ad Performance Stats */}
        <div className="md:col-span-4">
          <StatCard
            title="Total End Users"
            value={dashboardData.totalEndUsers}
            subtitle="Registered platform users"
          />
        </div>
        <div className="md:col-span-4">
          <StatCard
            title="Total Ad Views"
            value={dashboardData.totalAdViews}
            subtitle="All ad impressions"
          />
        </div>
        <div className="md:col-span-4">
          <StatCard
            title="Total Ad Clicks"
            value={dashboardData.totalAdClicks}
            subtitle="All ad interactions"
          />
        </div>

        {/* Fourth row - Ad Performance Chart */}
        <div className="md:col-span-12">
          <ChartCard
            title="Ad Clicks vs Ad Views"
            data={adPerformanceData}
            colors={COLORS}
            donut={true}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
