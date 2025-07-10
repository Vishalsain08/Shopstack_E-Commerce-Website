import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axios';
import Loader from '../components/Loader';

const ProfilePage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get('/orders/myorders', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-100 px-4 py-10">
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-10 space-y-8">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600">
          👤 My Profile
        </h2>

        {/* User Info */}
        <div className="bg-white border border-indigo-200 rounded-lg shadow p-5 space-y-2">
          <p className="text-base sm:text-lg text-gray-800">
            <span className="font-semibold text-indigo-600">Username:</span> {user.name}
          </p>
          <p className="text-base sm:text-lg text-gray-800">
            <span className="font-semibold text-indigo-600">Email:</span> {user.email}
          </p>
        </div>

        {/* Order History */}
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            🧾 Order History
          </h3>

          {loading ? (
            <Loader />
          ) : orders.length === 0 ? (
            <p className="text-gray-500 italic">You haven't placed any orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base border border-gray-200 rounded-md shadow-sm">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Items</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-gray-700">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-t hover:bg-gray-100 transition duration-150"
                    >
                      <td className="p-3 font-mono break-all">{order._id}</td>
                      <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-3 font-medium text-green-600">₹{order.totalPrice}</td>
                      <td className="p-3">{order.orderItems.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
