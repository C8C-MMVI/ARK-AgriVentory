import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen }) {
  const location = useLocation();

  const menuItems = [
    { icon: "🏠", text: "Home", link: "/" },
    { icon: "📊", text: "Dashboard", link: "/dashboard" },
    { icon: "👥", text: "User Settings", link: "/usersettings" },
    { icon: "💰", text: "Point of Sales", link: "/pos" },
    { icon: "📜", text: "Transactions", link: "/transactions" },
    { icon: "🧑‍💼", text: "User Profile", link: "/profile" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-72 " : "w-0"
      } overflow-hidden bg-[#4C763B] text-white transition-all duration-300 flex flex-col justify-between`}
    >
      {/* Logo */}
      <div className="flex justify-center items-center h-20">
        <img
          src="/ARK.png"
          alt="ARK Agriventory Logo"
          className="h-16 w-auto object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`flex items-center mx-2 my-2 px-6 py-1 rounded transition-colors font-bold font-lexend
              ${
                location.pathname === item.link
                  ? "bg-white text-[#4C763B] border-l-4 border-[#B8C4A9]"
                  : "bg-[#B8C4A9] text-[#4C763B] hover:bg-white hover:text-[#4C763B]"
              }`}
          >
            <span className="text-xl mr-3">{item.icon}</span>
            {item.text}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 text-center text-sm text-white/80">
        <p className="font-lexend flex align-middle flex-col text-xs">
          Copyright © 2025. <span>All Rights Reserved, ARK Agri Trading</span>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
