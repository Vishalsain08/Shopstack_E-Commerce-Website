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
    <div className="min-h-screen bg-indigo-100 flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800">
          ✏️ Edit Product
        </h2>

        {initialData ? (
          <ProductForm
            initialData={initialData}
            onSubmit={handleUpdate}
            isEditing={true}
          />
        ) : (
          <p className="text-gray-600 text-center text-base sm:text-lg py-8">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};

export default EditProductPage;
