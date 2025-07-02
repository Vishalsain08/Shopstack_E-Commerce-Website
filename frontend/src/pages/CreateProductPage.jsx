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
    <div className="max-w-2xl mx-auto bg-white shadow-md p-8 mt-10 rounded-lg">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-primary mb-1">➕ Create New Product</h2>
        <p className="text-gray-600 text-sm">Fill out the form below to add a new item to your shop.</p>
      </div>

      <ProductForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreateProductPage;
