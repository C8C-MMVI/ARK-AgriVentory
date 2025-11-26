import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import { useState } from "react"
import { Routes, Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"

const App = () => {
  const [sidebarToggle, setSidebarToggle] = useState(true);

  function toggleSidebar(){
    setSidebarToggle(!sidebarToggle)
  }

  return (
    <div className="flex h-screen bg-gray-50">
    <Sidebar isOpen = {sidebarToggle} />
      <div className="flex-1 flex flex-col">
        <Header onSidebarToggle = {toggleSidebar} />
        <main className="flex-1 bg-slate-200">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Users />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App