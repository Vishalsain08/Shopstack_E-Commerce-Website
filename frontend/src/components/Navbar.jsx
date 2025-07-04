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
} from 'react-icons/fa';

const Navbar = () => {
  const { cartItems, setCartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleLogout = () => {
    logout();             // from AuthContext, clears user auth data (e.g. token)
    navigate('/');        // redirects user to Home
    setCartItems([]);
    toast.success('Logged out successfully');     // from CartContext, clears the cart on logout
  };

  return (
    <nav className="bg-indigo-100 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
          🛍️ ShopStack
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="px-3 py-1 text-gray-800 hover:text-indigo-600 hover:bg-indigo-200 rounded transition"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="relative px-3 py-1 text-gray-800 hover:text-indigo-600 hover:bg-indigo-200 rounded transition flex items-center gap-1"
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
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="px-3 py-1 flex items-center gap-1 text-gray-800 hover:text-indigo-600 hover:bg-indigo-200 rounded transition capitalize"
              >
                <FaUser />
                Profile
              </Link>

              <Link
                to="/admin/dashboard"
                className="px-3 py-1 flex items-center gap-1 text-indigo-700 hover:underline text-sm"
              >
                <FaTools />
                Admin Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-3 py-1 flex items-center gap-1 text-red-600 hover:underline text-sm"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 text-sm">
              <Link
                to="/login"
                className="px-3 py-1 flex items-center gap-1 text-gray-800 hover:text-indigo-600 hover:bg-indigo-200 rounded transition"
              >
                <FaSignInAlt />
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 flex items-center gap-1 text-gray-800 hover:text-indigo-600 hover:bg-indigo-200 rounded transition"
              >
                <FaUserPlus />
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;