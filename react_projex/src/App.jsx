import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPAge";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(true);

  const toggleSidebar = () => setSidebarToggle(!sidebarToggle);

  return (
    <Routes>
      {/* Landing page pops up first */}
      <Route path="/" element={<LandingPage />} />

      {/* Home page after pressing Enter */}
      <Route path="/home" element={<HomePage />} />

      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard with sidebar and nested pages */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <div className="flex h-screen bg-gray-50">
              <Sidebar isOpen={sidebarToggle} />
              <div className="flex-1 flex flex-col">
                <Header onSidebarToggle={toggleSidebar} />
                <main className="flex-1 bg-slate-200 p-4">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="settings" element={<Settings />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
