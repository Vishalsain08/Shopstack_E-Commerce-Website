import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const inCart = product ? isInCart(product._id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <p className="p-6 font-sans text-danger">Product not found.</p>;

  return (
    <div className="min-h-screen bg-indigo-100 py-10 px-4">
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-xl shadow-md font-sans">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded-xl shadow-md"
        />

        <div className="space-y-5 text-text">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-1">
            <p><span className="font-medium">Brand:</span> {product.brand}</p>
            <p><span className="font-medium">Category:</span> {product.category}</p>
            <p><span className="font-medium">Price:</span> ₹{product.price}</p>
            <p>
              <span className="font-medium">Stock:</span>{' '}
              {product.countInStock > 0 ? (
                <span className="text-accent font-semibold">In Stock</span>
              ) : (
                <span className="text-danger font-semibold">Out of Stock</span>
              )}
            </p>
          </div>

          <button
            onClick={() =>
              inCart ? removeFromCart(product._id) : addToCart(product)
            }
            disabled={product.countInStock === 0}
            className={`w-full py-3 rounded-lg text-white font-semibold transition duration-200 ${
              product.countInStock === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : inCart
                ? 'bg-danger hover:bg-red-700'
                : 'bg-primary hover:bg-blue-700'
            }`}
          >
            {inCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
