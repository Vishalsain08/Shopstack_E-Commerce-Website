import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import Loader from '../components/Loader';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-sky-100 to-white py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
            🛒 Manage Products
          </h2>
          <Link
            to="/admin/products/create"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md"
          >
            <FaPlus /> Add New Product
          </Link>
        </div>

        {/* Products Table */}
        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-md bg-white/90 backdrop-blur">
            <table className="min-w-[640px] w-full text-sm sm:text-base text-left">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-4 font-semibold">Image</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr
                    key={product._id}
                    className={`transition duration-200 hover:bg-indigo-50 ${
                      idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                    }`}
                  >
                    <td className="p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 object-contain rounded shadow-sm"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800 break-words">{product.name}</td>
                    <td className="p-4 font-semibold text-green-700">₹{product.price}</td>
                    <td className="p-4 font-medium text-gray-700 capitalize">
                      {product.category || '—'}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm shadow-sm justify-center"
                        >
                          <FaEdit /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm shadow-sm justify-center"
                        >
                          <FaTrashAlt /> Delete
                        </button>
                      </div>
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

export default AdminProductsPage;
