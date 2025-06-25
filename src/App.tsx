import { Route, Routes } from "react-router";
import Login from "./routes/Login";
import AdminLayout from "./layouts/AdminLayout";
import AdminWiki from "./routes/admin/AdminWiki";
import AdminDashboard from "./routes/admin/AdminDashboard";
import Home from "./routes/Home";
import AdminUsers from "./routes/admin/AdminUsers";
import AdminAdsSettings from "./routes/admin/AdminAdsSettings";
import AdminBemidiaAdsSettings from "./routes/admin/AdminBemidiaAdsSettings";
import AdminGeneralSettings from "./routes/admin/AdminGeneralSettings";
import AdminAdvertisers from "./routes/admin/AdminAdvertisers";
import AdvRegister from "./routes/advertiser/advRegister/AdvRegister";
import AdminRouletteSettings from "./routes/admin/AdminRouletteSettings";
import AdminPendingCampaigns from "./routes/admin/AdminPendingCampaigns";
import AdminApprovedCampaigns from "./routes/admin/AdminApprovedCampaigns";
import AdminEmailTemplates from "./routes/admin/AdminEmailTemplates";
import AdvertiserDashboard from "./routes/advertiser/AdvertiserDashboard";
import AdvertiserLayout from "./layouts/AdvertiserLayout";
import AdvertiserLogin from "./routes/advertiser/AdvertiserLogin";
import AdminRejectedCampaigns from "./routes/admin/AdminRejectedCampaigns";
import AdvAdsCampaigns from "./routes/advertiser/AdvAdsCampaigns";
import AdvRouletteCampaigns from "./routes/advertiser/AdvRouletteCampaigns";
import AdvBeMidiaCampaigns from "./routes/advertiser/AdvBeMidiaCampaigns";
import AdvSettings from "./routes/advertiser/AdvSettings";
import AdminInvoices from "./routes/admin/AdminInvoices";
import AdvertiserInvoices from "./routes/advertiser/AdvertiserInvoices";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />

        <Route path="advertiser-login" element={<AdvertiserLogin />} />
        <Route path="advertiser-register" element={<AdvRegister />} />

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="wiki" element={<AdminWiki />} />
          <Route path="admin-users" element={<AdminUsers />} />
          <Route path="ads-settings" element={<AdminAdsSettings />} />
          <Route
            path="bemidia-ads-settings"
            element={<AdminBemidiaAdsSettings />}
          />
          <Route path="roulette-settings" element={<AdminRouletteSettings />} />
          <Route path="general-settings" element={<AdminGeneralSettings />} />
          <Route path="email-templates" element={<AdminEmailTemplates />} />
          <Route path="advertisers" element={<AdminAdvertisers />} />
          <Route
            path="approved-campaigns"
            element={<AdminApprovedCampaigns />}
          />
          <Route path="pending-campaigns" element={<AdminPendingCampaigns />} />
          <Route
            path="rejected-campaigns"
            element={<AdminRejectedCampaigns />}
          />
          <Route path="invoices" element={<AdminInvoices />} />
        </Route>

        <Route path="advertiser" element={<AdvertiserLayout />}>
          <Route index element={<AdvertiserDashboard />} />
          <Route path="ads-campaigns" element={<AdvAdsCampaigns />} />
          <Route path="roulette-campaigns" element={<AdvRouletteCampaigns />} />
          <Route path="bemidia-campaigns" element={<AdvBeMidiaCampaigns />} />
          <Route path="settings" element={<AdvSettings />} />
          <Route path="invoices" element={<AdvertiserInvoices />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
