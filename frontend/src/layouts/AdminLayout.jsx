import { Routes, Route } from "react-router-dom";
import Dashboard    from "../pages/Dashboard";
import UploadResume from "../pages/UploadResume";
import Candidates   from "../pages/Candidates";
import Analytics    from "../pages/Analytics";
import Settings     from "../pages/Settings";

function AdminLayout() {
  return (
    <Routes>
      <Route index                element={<Dashboard />} />
      <Route path="upload-resume" element={<UploadResume />} />
      <Route path="candidates"    element={<Candidates />} />
      <Route path="analytics"     element={<Analytics />} />
      <Route path="settings"      element={<Settings />} />
    </Routes>
  );
}

export default AdminLayout;