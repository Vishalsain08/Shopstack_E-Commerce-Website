import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import {
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaTools,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const { cartItems, setCartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
    setCartItems([]);
    toast.success('Logged out successfully');
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-slate-700 shadow-md border-b border-indigo-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-300 flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          🛍️ ShopStack
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-indigo-200 text-xl focus:outline-none">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } absolute sm:static top-16 left-0 w-full sm:w-auto bg-slate-800 sm:bg-transparent sm:flex sm:items-center gap-4 px-4 sm:px-0 py-4 sm:py-0 flex-col sm:flex-row`}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-1 text-slate-100 hover:text-white hover:bg-slate-600 rounded transition"
          >
            Home
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="relative px-3 py-1 text-slate-100 hover:text-white hover:bg-slate-600 rounded transition flex items-center gap-1"
          >
            <FaShoppingCart />
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-1 flex items-center gap-1 text-slate-100 hover:text-white hover:bg-slate-600 rounded transition capitalize"
              >
                <FaUser />
                Profile
              </Link>

              <Link
                to="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-1 flex items-center gap-1 text-indigo-300 hover:text-white hover:bg-slate-600 rounded transition text-sm"
              >
                <FaTools />
                Admin Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-3 py-1 flex items-center gap-1 text-red-400 hover:text-red-200 hover:bg-slate-600 rounded transition text-sm"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-1 flex items-center gap-1 text-slate-100 hover:text-white hover:bg-slate-600 rounded transition"
              >
                <FaSignInAlt />
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-1 flex items-center gap-1 text-slate-100 hover:text-white hover:bg-slate-600 rounded transition"
              >
                <FaUserPlus />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
