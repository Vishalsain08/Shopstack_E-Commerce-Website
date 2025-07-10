import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList } from 'react-icons/fa';
import Loader from '../components/Loader';

const AdminOrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.isAdmin) {
        navigate('/');
        return;
      }

      try {
        const res = await axiosInstance.get('/orders', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrders(res.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-sky-100 to-white py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-lg p-6 sm:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <FaClipboardList className="text-indigo-600 text-2xl sm:text-3xl" />
            <h2 className="text-xl sm:text-3xl font-bold text-slate-800">
              Admin Orders Panel
            </h2>
          </div>
        </div>

        {/* Loading or Table */}
        {loading ? (
          <Loader />
        ) : orders.length === 0 ? (
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            No orders found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-300 shadow-inner bg-white">
            <table className="min-w-[640px] w-full text-sm sm:text-base text-left">
              <thead className="bg-indigo-600 text-white">
                <tr className="h-14 sm:h-16">
                  <th className="p-4 font-semibold">Order ID</th>
                  <th className="p-4 font-semibold">User</th>
                  <th className="p-4 font-semibold">Total</th>
                  <th className="p-4 font-semibold">City</th>
                  <th className="p-4 font-semibold">Country</th>
                  <th className="p-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={order._id}
                    className={`transition duration-200 hover:bg-indigo-50 ${
                      idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                    }`}
                  >
                    <td className="p-4 font-medium text-gray-800 break-words">
                      {order._id}
                    </td>
                    <td className="p-4 font-medium capitalize text-gray-700">
                      {order.user?.name || 'Unknown'}
                    </td>
                    <td className="p-4 font-medium text-green-600">
                      ₹{order.totalPrice}
                    </td>
                    <td className="p-4 font-medium text-gray-700">
                      {order.shippingAddress?.city}
                    </td>
                    <td className="p-4 font-medium text-gray-700">
                      {order.shippingAddress?.country}
                    </td>
                    <td className="p-4 font-medium text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
