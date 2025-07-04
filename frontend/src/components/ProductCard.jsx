import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(product._id);

  return (
    <div className="bg-white rounded-2xl border shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105 overflow-hidden">

      {/* Logo Banner */}
      <div className="flex justify-between items-center bg-indigo-50 px-4 py-2">
        <span className="text-indigo-600 font-bold text-sm">ShopStack</span>
        <span className="text-xs text-gray-400">#{product._id.slice(-4)}</span>
      </div>

      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover"
        />
      </Link>

      {/* Content */}
      <div className="p-4 space-y-2">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition line-clamp-1">
            {product.name}
          </h2>
        </Link>

        {product.brand && (
          <p className="text-sm text-gray-500">by {product.brand}</p>
        )}

        <p className="text-green-600 font-semibold text-lg">₹{product.price}</p>

        {/* Add/Remove from Cart Button */}
        <button
          className={`w-full py-2 mt-2 rounded-xl text-white font-semibold text-sm shadow-sm transition duration-200 flex justify-center items-center gap-2 ${
            inCart
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
          onClick={() =>
            inCart ? removeFromCart(product._id) : addToCart(product)
          }
        >
          {inCart ? (
            <>
              <FaTrashAlt />
              Remove from Cart
            </>
          ) : (
            <>
              <FaShoppingCart />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;