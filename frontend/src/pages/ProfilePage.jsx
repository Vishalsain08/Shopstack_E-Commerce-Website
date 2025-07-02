import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axios';

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
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h2 className="text-3xl font-bold text-primary mb-6">👤 My Profile</h2>

      {/* User Info Section */}
      <div className="bg-background p-5 rounded-lg border border-gray-200 mb-8 shadow-sm">
        <p className="text-lg text-text mb-1">
          <span className="font-semibold text-accent">Username : </span> {user.name}
        </p>
        <p className="text-lg text-text">
          <span className="font-semibold text-accent">Email Id : </span> {user.email}
        </p>
      </div>

      <h3 className="text-2xl font-semibold text-text mb-4">🧾 Order History</h3>

      {loading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 italic">You haven't placed any orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-md shadow-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Items</th>
              </tr>
            </thead>
            <tbody className="text-text bg-white">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-3 font-mono">{order._id}</td>
                  <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 font-medium text-accent">₹{order.totalPrice}</td>
                  <td className="p-3">{order.orderItems.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
