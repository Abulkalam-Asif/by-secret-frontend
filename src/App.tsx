import { Route, Routes } from "react-router";
import Login from "./routes/Login";
import AdminLayout from "./layouts/AdminLayout";
import AdminWiki from "./routes/admin/AdminWiki";
import AdminHome from "./routes/admin/AdminHome";
import Home from "./routes/Home";
import AdminUser from "./routes/admin/AdminUser";
import AdminAdsSetting from "./routes/admin/AdminAdsSetting";
import AdminRouletteSetting from "./routes/admin/AdminRouletteSetting";
import AdminGeneralSettings from "./routes/admin/AdminGeneralSettings";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="wiki" element={<AdminWiki />} />
          <Route path="user" element={<AdminUser />} />
          <Route path="ads-setting" element={<AdminAdsSetting />} />
          <Route path="roulette-setting" element={<AdminRouletteSetting />} />
          <Route path="general-settings" element={<AdminGeneralSettings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
