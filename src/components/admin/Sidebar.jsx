import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaBars,
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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <h1 className="font-semibold">Admin Panel</h1>
        <button onClick={() => setOpen(!open)}>
          <FaBars size={20} />
        </button>
      </div>

      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 h-screen text-white transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-200 z-50`}
      >
        <div className="p-5 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex flex-col p-4 space-y-3">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
          >
            <FaTachometerAlt /> Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
          >
            <FaBoxOpen /> Products
          </Link>

          <Link
            to="/admin/orders"
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
          >
            <FaShoppingCart /> Orders
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
          >
            <FaUsers /> Users
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 mt-4 hover:bg-red-600 rounded"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black opacity-50 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
