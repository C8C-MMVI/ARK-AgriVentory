import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/HomePage";
import UserSettings from "./pages/UserSettings";
import POS from "./pages/PointOfSales";
import Transactions from "./pages/Transactions";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

const App = () => {
  const [sidebarToggle, setSidebarToggle] = useState(true);

  function toggleSidebar() {
    setSidebarToggle(!sidebarToggle);
  }

  return (
    <Routes>
      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="flex h-screen bg-gray-50">
              <Sidebar isOpen={sidebarToggle} />
              <div className="flex-1 flex flex-col">
                <Header onSidebarToggle={toggleSidebar} />
                <main className="flex-1 bg-slate-200">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/usersettings" element={<UserSettings />} />
                    <Route path="/pos" element={<POS />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/profile" element={<UserProfile />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
