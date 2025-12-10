import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ onSidebarToggle }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/"); // Redirect to landing page after logout
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Hamburger Icon / Toggle */}
        <button onClick={onSidebarToggle}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Right Section */}
        <div className="relative">
          {/* Profile Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="bg-blue-500 font-bold rounded-full w-10 h-10
                       text-white flex justify-center items-center"
          >
            RN
          </button>

          {/* Modal Pop-up */}
          {menuOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg w-64 p-4 relative">
                <h3 className="text-lg font-semibold mb-4">Profile Options</h3>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      navigate("/dashboard"); // Navigate to dashboard correctly
                      setMenuOpen(false);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    To Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Log Out
                  </button>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
