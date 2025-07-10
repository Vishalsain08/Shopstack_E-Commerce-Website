import ProductForm from '../components/ProductForm';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreateProductPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreate = async (productData) => {
    try {
      await axiosInstance.post('/products', productData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate('/admin/products');
    } catch (err) {
      alert('Failed to create product');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-sky-100 to-white flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-lg border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
            🛍️ Create New Product
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Fill out the details to add a new item to your shop.
          </p>
        </div>

        {/* Product Form */}
        <ProductForm onSubmit={handleCreate} />
      </div>
    </div>
  );
};

export default CreateProductPage;
