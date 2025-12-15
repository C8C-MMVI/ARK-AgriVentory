// Components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import MainLayout from "./components/MainLayout";

// ReactJS dependencies
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Home from "./pages/HomePAge";
import UserSettings from "./pages/UserSettings";
import POS from "./pages/PointOfSales";
import Transactions from "./pages/Transactions";
import UserProfile from "./pages/UserProfile";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import StockRecords from "./pages/StockRecords";
import Login from "./pages/Login";
import Suppliers from "./pages/Suppliers";

const App = () => {
  const [sidebarToggle, setSidebarToggle] = useState(true);

  function toggleSidebar() {
    setSidebarToggle(!sidebarToggle);
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainLayout sidebarToggle={sidebarToggle} toggleSidebar={toggleSidebar}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/stock" element={<StockRecords />} />
                <Route path="/usersettings" element={<UserSettings />} />
                <Route path="/pos" element={<POS />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/profile" element={<UserProfile />} />
              </Routes>
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
