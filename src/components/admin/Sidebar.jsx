import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const activeClass = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-gray-800";

  return (
    <>
      {/* MOBILE TOP BAR */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-900 text-white sticky top-0 z-40">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
        <button onClick={() => setOpen(true)}>
          <FaBars size={22} />
        </button>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-64 bg-gray-900 text-white z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button
            className="md:hidden text-gray-400"
            onClick={() => setOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex flex-col p-4 gap-2">
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeClass(
              "/admin/dashboard"
            )}`}
            onClick={() => setOpen(false)}
          >
            <FaTachometerAlt /> Dashboard
          </Link>

          <Link
            to="/admin/products"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeClass(
              "/admin/products"
            )}`}
            onClick={() => setOpen(false)}
          >
            <FaBoxOpen /> Products
          </Link>

          <Link
            to="/admin/orders"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeClass(
              "/admin/orders"
            )}`}
            onClick={() => setOpen(false)}
          >
            <FaShoppingCart /> Orders
          </Link>

          <Link
            to="/admin/users"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeClass(
              "/admin/users"
            )}`}
            onClick={() => setOpen(false)}
          >
            <FaUsers /> Users
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 mt-6 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* OVERLAY (mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
