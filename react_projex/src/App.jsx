import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import { useState } from "react"
import { Routes, Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"
import Settings from "./pages/Settings"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"

const App = () => {
  const [sidebarToggle, setSidebarToggle] = useState(true);

  function toggleSidebar(){
    setSidebarToggle(!sidebarToggle)
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/settings" element={<Settings />} />
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

export default App