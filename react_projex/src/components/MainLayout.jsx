// MainLayout.jsx
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import StockRecords from "../pages/StockRecords";
import UserSettings from "../pages/UserSettings";
import POS from "./POS/POS";
import Transactions from "./Transactions/Transactions";
import Suppliers from "../pages/Suppliers";
import UserProfile from "../pages/UserProfile";

const MainLayout = ({ sidebarToggle, toggleSidebar }) => (
  <div className="flex h-screen bg-gray-50 overflow-hidden">
    <Sidebar isOpen={sidebarToggle} />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header onSidebarToggle={toggleSidebar} />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/stock" element={<StockRecords />} />
          {/* <Route path="/usersettings" element={<UserSettings />} /> */}
          <Route path="/pos" element={<POS />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/suppliers" element={<Suppliers />} />
          {/* <Route path="/profile" element={<UserProfile />} /> */}
        </Routes>
      </main>
    </div>
  </div>
);

export default MainLayout;