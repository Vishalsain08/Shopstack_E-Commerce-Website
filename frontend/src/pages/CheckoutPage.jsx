import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const { cartItems, setCartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const orderItems = cartItems.map((item) => ({
      name: item.name,
      qty: item.qty,
      image: item.image,
      price: item.price,
      product: item._id,
    }));

    try {
      await axiosInstance.post(
        '/orders/',
        {
          orderItems,
          shippingAddress,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setCartItems([]);
      localStorage.removeItem('cart');
      toast.success('Order placed successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to place order. Try again.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-primary mb-8">🧾 Checkout</h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-primary">Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between py-2 border-b text-gray-700">
              <span>{item.name} x {item.qty}</span>
              <span>₹{item.qty * item.price}</span>
            </div>
          ))}
          <p className="mt-4 font-bold text-lg text-right text-primary">
            Total: ₹{totalPrice}
          </p>
        </div>

        {/* Shipping Form */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-primary">Shipping Address</h3>
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <input
              name="address"
              placeholder="Address"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={shippingAddress.address}
              onChange={handleChange}
              required
            />
            <input
              name="city"
              placeholder="City"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={shippingAddress.city}
              onChange={handleChange}
              required
            />
            <input
              name="postalCode"
              placeholder="Postal Code"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={shippingAddress.postalCode}
              onChange={handleChange}
              required
            />
            <input
              name="country"
              placeholder="Country"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={shippingAddress.country}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-accent text-white py-2 rounded hover:bg-emerald-700 transition"
            >
              ✅ Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
