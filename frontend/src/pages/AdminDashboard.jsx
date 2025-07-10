import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { FaClipboardList, FaBoxes, FaCrown } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user?.isAdmin) return <Navigate to="/" />;

  return (
    <div className="relative isolate overflow-hidden min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16 bg-indigo-100">
      {/* 🎨 Background blobs */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1024 1024" fill="none" className="w-full h-full">
          <circle cx="700" cy="300" r="400" fill="#6366f1" />
          <circle cx="300" cy="700" r="300" fill="#14b8a6" />
        </svg>
      </div>

      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-xl border border-slate-300 rounded-2xl shadow-2xl px-6 py-8 sm:p-10">
        {/* 👑 Logo & Title */}
        <div className="flex flex-col items-center gap-2 mb-8 sm:mb-10 text-center">
          <FaCrown className="text-yellow-500 text-3xl sm:text-4xl" />
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-800">Welcome to Admin Dashboard</h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-md">
            You have admin privileges to manage ShopStack. View customer orders or manage the product catalog efficiently.
          </p>
        </div>

        {/* ⚙️ Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <Link
            to="/admin/orders"
            className="flex flex-col items-center justify-center gap-3 bg-emerald-600 text-white p-5 sm:p-6 rounded-xl shadow hover:bg-emerald-700 transition text-center"
          >
            <FaClipboardList className="text-4xl sm:text-5xl" />
            <h3 className="text-lg sm:text-xl font-semibold">View All Orders</h3>
            <p className="text-sm sm:text-base text-white">
              Access and manage orders placed by customers in real-time.
            </p>
          </Link>

          <Link
            to="/admin/products"
            className="flex flex-col items-center justify-center gap-3 bg-indigo-600 text-white p-5 sm:p-6 rounded-xl shadow hover:bg-indigo-700 transition text-center"
          >
            <FaBoxes className="text-4xl sm:text-5xl" />
            <h3 className="text-lg sm:text-xl font-semibold">Manage Products</h3>
            <p className="text-sm sm:text-base text-white">
              Create new products, update existing ones, and control inventory.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
