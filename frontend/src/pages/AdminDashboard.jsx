import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { FaClipboardList, FaBoxes, FaCrown } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user?.isAdmin) return <Navigate to="/" />;

  return (
    <div className="relative isolate overflow-hidden min-h-screen flex items-center justify-center px-6 py-16 bg-background">
      {/* 🎨 Background blobs */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1024 1024" fill="none" className="w-full h-full">
          <circle cx="700" cy="300" r="400" fill="#3b82f6" />
          <circle cx="300" cy="700" r="300" fill="#10b981" />
        </svg>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200 p-10">
        {/* 👑 Logo & Title */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <FaCrown className="text-yellow-500 text-4xl" />
          <h2 className="text-4xl font-bold text-primary">Welcome to admin Dashboard</h2>
          <p className="text-gray-500 text-center max-w-md">
            You have admin privileges to manage ShopStack. View customer orders or manage the entire product catalog efficiently.
          </p>
        </div>

        {/* ⚙️ Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to="/admin/orders"
            className="flex flex-col items-center justify-center gap-3 bg-accent text-white p-6 rounded-xl shadow hover:bg-emerald-700 transition"
          >
            <FaClipboardList className="text-5xl" />
            <h3 className="text-xl font-semibold">View All Orders</h3>
            <p className="text-sm text-white text-center">
              Access and manage orders placed by customers in real-time.
            </p>
          </Link>

          <Link
            to="/admin/products"
            className="flex flex-col items-center justify-center gap-3 bg-primary text-white p-6 rounded-xl shadow hover:bg-blue-700 transition"
          >
            <FaBoxes className="text-5xl" />
            <h3 className="text-xl font-semibold">Manage Products</h3>
            <p className="text-sm text-white text-center">
              Create new products, update existing ones, and control inventory.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
