import { Route, Routes } from "react-router";
import Login from "./routes/Login";
import AdminLayout from "./layouts/AdminLayout";
import AdminWiki from "./routes/admin/AdminWiki";
import AdminHome from "./routes/admin/AdminHome";
import Home from "./routes/Home";
import AdminUser from "./routes/admin/AdminUser";

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
