import { Route, Routes } from "react-router";
import Login from "./routes/Login";
import AdminLayout from "./layouts/AdminLayout";
import AdminWiki from "./routes/admin/AdminWiki";
import AdminHome from "./routes/admin/AdminHome";
import Home from "./routes/Home";
import AdminUsers from "./routes/admin/AdminUsers";
import AdminAdsSettings from "./routes/admin/AdminAdsSettings";
import AdminGeneralSettings from "./routes/admin/AdminGeneralSettings";
import AdminAdvertisers from "./routes/admin/AdminAdvertisers";
import AdvRegister from "./routes/advertiser/advRegister/AdvRegister";
import AdminRouletteSettings from "./routes/admin/AdminRouletteSettings";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="advertiser-register" element={<AdvRegister />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="wiki" element={<AdminWiki />} />
          <Route path="admin-users" element={<AdminUsers />} />
          <Route path="ads-settings" element={<AdminAdsSettings />} />
          <Route path="roulette-settings" element={<AdminRouletteSettings />} />
          <Route path="general-settings" element={<AdminGeneralSettings />} />
          <Route path="advertisers" element={<AdminAdvertisers />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
