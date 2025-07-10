import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty, setCartItems } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-indigo-100">
      <div className="max-w-4xl mx-auto font-sans text-text">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="bg-background p-6 rounded shadow text-center">
            <p className="text-lg text-gray-600">Your cart is empty.</p>
            <Link
              to="/"
              className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
            >
              Go Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border rounded-lg p-4 shadow-sm bg-white transition-transform hover:scale-[1.01] duration-200"
                >
                  {/* Image & Details */}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md shadow"
                    />
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-500">₹{item.price}</p>
                    </div>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(item._id, parseInt(e.target.value))
                      }
                      className="w-20 border rounded px-2 py-1 text-center"
                    />
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-danger hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Price */}
            <div className="mt-8 text-left">
              <p className="text-lg sm:text-xl font-semibold">
                <span className="text-black">Total amount:</span>{' '}
                <span className="text-green-600">₹{total.toFixed(2)}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                onClick={() => {
                  setCartItems([]);
                  localStorage.removeItem('cart');
                }}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
              >
                🗑️ Clear Cart
              </button>

              <Link to="/checkout" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-accent hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
