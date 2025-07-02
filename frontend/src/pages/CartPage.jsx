import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans text-text">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

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
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border rounded-lg p-4 shadow-sm bg-white transition-transform transform hover:scale-105 duration-200 ease-in-out"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md shadow"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-500">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQty(item._id, parseInt(e.target.value))}
                    className="w-16 border rounded px-2 py-1 text-center"
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

          <div className="mt-8 text-right">
            <p className="text-xl font-semibold mb-3">Total: ₹{total.toFixed(2)}</p>
            <Link to="/checkout">
              <button className="bg-accent hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
