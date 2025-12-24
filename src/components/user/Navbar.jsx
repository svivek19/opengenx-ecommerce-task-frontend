import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaBars,
  FaShoppingCart,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "bg-white/20" : "hover:bg-white/10";

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold tracking-wide">VCart</h1>

          <nav className="hidden md:flex items-center gap-3">
            <Link
              to="/products"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${isActive(
                "/products"
              )}`}
            >
              <FaBoxOpen /> Products
            </Link>

            <Link
              to="/cart"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${isActive(
                "/cart"
              )}`}
            >
              <FaShoppingCart /> Cart
            </Link>

            <Link
              to="/my-orders"
              className={`px-4 py-2 rounded-full transition ${isActive(
                "/my-orders"
              )}`}
            >
              My Orders
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/90 hover:bg-red-600 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition"
            onClick={() => setOpen(!open)}
          >
            <FaBars size={20} />
          </button>
        </div>
      </header>

      {open && (
        <div className="md:hidden bg-gradient-to-b from-blue-600 to-indigo-600 text-white px-4 py-4 space-y-3 shadow-lg">
          <Link
            to="/products"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 rounded-lg hover:bg-white/20"
          >
            Products
          </Link>

          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 rounded-lg hover:bg-white/20"
          >
            Cart
          </Link>

          <Link
            to="/my-orders"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 rounded-lg hover:bg-white/20"
          >
            My Orders
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg bg-red-500/90 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
