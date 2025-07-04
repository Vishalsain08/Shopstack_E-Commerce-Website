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
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-sky-100 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white shadow-md p-8 rounded-lg">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-1">Create New Product</h2>
          <p className="text-gray-600 text-sm">
            Fill out the form below to add a new item to your shop.
          </p>
        </div>

        <ProductForm onSubmit={handleCreate} />
      </div>
    </div>
  );
};

export default CreateProductPage;
