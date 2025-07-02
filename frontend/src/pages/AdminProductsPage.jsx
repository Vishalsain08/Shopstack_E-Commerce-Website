import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';

const AdminProductsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get('/products', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axiosInstance.delete(`/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProducts(products.filter((p) => p._id !== productId));
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    } else {
      fetchProducts();
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-text flex items-center gap-2">
          🛒 Manage Products
        </h2>
        <Link
          to="/admin/products/create"
          className="flex items-center gap-2 bg-accent hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          <FaPlus /> Add New Product
        </Link>
      </div>

      {loading ? (
        <p className="text-text">Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-3 font-bold text-left">Image</th>
                <th className="p-3 font-bold text-left">Name</th>
                <th className="p-3 font-bold text-left">Price</th>
                <th className="p-3 font-bold text-left">Category</th>
                <th className="p-3 font-bold text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="p-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded shadow-sm"
                    />
                  </td>
                  <td className="p-3 font-medium text-text">{product.name}</td>
                  <td className="p-3 font-semibold text-green-700">₹{product.price}</td>
                  <td className="p-3 font-medium text-gray-700">
                    {product.category || '—'}
                  </td>
                  <td className="p-3 flex gap-2">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm shadow-sm"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center gap-1 bg-danger hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm shadow-sm"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
