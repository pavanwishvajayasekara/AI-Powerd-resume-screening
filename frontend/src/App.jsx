import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AuthPage    from "./pages/Authpage";
import Client      from "./pages/client";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"        element={<AuthPage />} />
        <Route path="/login"   element={<AuthPage />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/client"  element={<Client />} />
      </Routes>
    </Router>
  );
}

export default App;