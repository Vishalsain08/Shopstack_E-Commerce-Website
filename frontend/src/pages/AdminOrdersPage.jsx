import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList } from 'react-icons/fa';
import Loader from '../components/Loader'; // ✅ Make sure this path is correct

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
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-sky-100 to-indigo-100 py-10 px-4">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
        <div className="flex items-center gap-3 mb-6">
          <FaClipboardList className="text-accent text-3xl" />
          <h2 className="text-3xl font-bold text-text">Admin Orders Panel</h2>
        </div>

        {loading ? (
          <Loader />
        ) : orders.length === 0 ? (
          <p className="text-text font-medium text-base">No orders found.</p>
        ) : (
          <div className="overflow-x-auto rounded shadow border border-gray-200 bg-white">
            <table className="min-w-full text-base text-left">
              <thead className="bg-accent text-white">
                <tr className="h-16">
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
                    className={`h-16 transition hover:bg-green-50 ${
                      idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="p-4 font-semibold text-gray-800">{order._id}</td>
                    <td className="p-4 font-semibold capitalize text-gray-700">
                      {order.user?.name || 'Unknown'}
                    </td>
                    <td className="p-4 font-semibold text-green-700">
                      ₹{order.totalPrice}
                    </td>
                    <td className="p-4 font-semibold text-gray-700">
                      {order.shippingAddress?.city}
                    </td>
                    <td className="p-4 font-semibold text-gray-700">
                      {order.shippingAddress?.country}
                    </td>
                    <td className="p-4 font-semibold text-gray-500">
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
