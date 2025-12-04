import { useAuth } from "../context/AuthContext";

function Header({ onSidebarToggle }) {
    const {logout} = useAuth()

    function onLogout(){

    }
  return (
    <header className="bg-white shadow-sm ">
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
        {/* Search bar */}
        <div className="flex items-center space-x-4">
          <div className="relative ">
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notifications */}
          <div>
            <button className="relative text-gray-600 hover:text-gray-900">
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                className="absolute -top-1 -right-1 w-4 h-4 
                        bg-red-500 font-bold 
                        text-white rounded-full text-xs
                        flex justify-center items-center"
              >
                8
              </span>
            </button>
          </div>

          {/* Profile */}
          <div>
            <p
              className="bg-blue-500 font-bold rounded-full w-10 h-10
             text-white flex justify-center items-center"
            >
              RN
            </p>
          </div>
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>

      <div></div>
    </header>
  );
}

export default Header;
