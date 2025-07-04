import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';

const EditProductPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setInitialData(res.data);
      } catch (err) {
        alert('Failed to load product');
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async (productData) => {
    try {
      await axiosInstance.put(`/products/${id}`, productData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate('/admin/products');
    } catch (err) {
      alert('Failed to update product');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-sky-100 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-600 flex items-center gap-2">
          <span>✏️</span> Edit Product
        </h2>
        {initialData ? (
          <ProductForm
            initialData={initialData}
            onSubmit={handleUpdate}
            isEditing={true}
            className="text-lg"
          />
        ) : (
          <p className="text-gray-600 text-lg text-center py-8">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default EditProductPage;
