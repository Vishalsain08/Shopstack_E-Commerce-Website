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
    <div className="min-h-screen bg-indigo-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-10 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800">
          🧾 Checkout
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Order Summary */}
          <div className="bg-white border-2 border-indigo-500 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-indigo-600 border-b pb-2 mb-4">
              Order Summary
            </h3>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center text-gray-700 text-sm sm:text-base py-2 border-b"
              >
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.qty * item.price}</span>
              </div>
            ))}
            <p className="mt-4 text-right text-lg font-bold text-emerald-600">
              Total: ₹{totalPrice}
            </p>
          </div>

          {/* Shipping Address */}
          <div className="bg-white border-2 border-indigo-500 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-indigo-600 border-b pb-2 mb-4">
              Shipping Address
            </h3>
            <form onSubmit={handleOrderSubmit} className="space-y-5">
              {['address', 'city', 'postalCode', 'country'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field === 'postalCode' ? 'Pin Code' : field}
                  </label>
                  <input
                    name={field}
                    type="text"
                    placeholder={
                      field === 'address'
                        ? 'Area, Street, Sector, Village'
                        : field === 'city'
                        ? 'Town / City'
                        : field === 'postalCode'
                        ? 'Pin Code'
                        : 'Country'
                    }
                    value={shippingAddress[field]}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-indigo-500 rounded-lg px-4 py-2 shadow-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-sm sm:placeholder:text-base transition"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition"
              >
                ✅ Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
