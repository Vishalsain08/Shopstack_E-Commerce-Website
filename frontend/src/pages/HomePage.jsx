import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

// ... (imports remain unchanged)

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      toast.info(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/products/');
        setProducts(res.data);
        setFiltered(res.data);
      } catch (err) {
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/products/categories');
        setCategories(res.data);
      } catch (err) {
        toast.error('Failed to fetch categories');
      }
    };

    fetchData();
    fetchCategories();
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === category));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-sky-100 to-white py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 🛍️ Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-slate-800" />
            All Products
          </h2>
        </div>

        {/* 🔘 Category Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
          <button
            onClick={() => handleFilter('')}
            className={`px-4 py-1.5 sm:py-2 rounded-full border border-indigo-400 shadow-sm transition text-sm font-medium ${
              selectedCategory === ''
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-800 hover:bg-indigo-100 hover:border-indigo-500'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-4 py-1.5 sm:py-2 rounded-full border border-indigo-400 capitalize shadow-sm transition text-sm font-medium ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-indigo-100 hover:border-indigo-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🔄 Loader or Products */}
        {loading ? (
          <Loader />
        ) : filtered.length === 0 ? (
          <p className="text-gray-600 text-sm">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
