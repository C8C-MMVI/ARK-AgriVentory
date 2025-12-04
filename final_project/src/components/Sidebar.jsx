import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen }) {
  const location = useLocation();
  const menuItems = [
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"
          />
        </svg>
      ),
      text: "Home",
      link: "/",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 12a4 4 0 100-8 4 4 0 000 8z"
          />
        </svg>
      ),
      text: "User Dashboard",
      link: "/users",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm0 0V4m0 16v-4m4-4h4m-16 0H4"
          />
        </svg>
      ),
      text: "Settings",
      link: "/settings",
    },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-60" : "w-0"
      } overflow-hidden bg-gray-900 text-white transition-all duration-300`}
    >
      <div className="p-4">
        <h1 className="text-center font-bold text-2xl">PARK Company</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`flex items-center px-6 py-3 transition-colors ${
              location.pathname === item.link
                ? "bg-gray-800 border-l-4 border-blue-500"
                : "hover:bg-gray-800"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.text}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
