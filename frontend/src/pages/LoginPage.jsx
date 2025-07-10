import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';
import { FaLock, FaEnvelope } from 'react-icons/fa';

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (location.state?.message) {
      toast.info(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/users/login', { email, password });
      login(res.data);
      toast.success('Login successful');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-indigo-100 px-4 sm:px-6">
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl max-w-md w-full p-6 sm:p-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800">Welcome Back 👋</h2>
        <p className="text-center text-gray-600 text-sm">Login to your ShopStack account</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center border-2 border-indigo-400 rounded-lg px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition">
              <FaEnvelope className="text-indigo-500 mr-2 text-base" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent focus:outline-none text-sm sm:text-base text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border-2 border-indigo-400 rounded-lg px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition">
              <FaLock className="text-indigo-500 mr-2 text-base" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent focus:outline-none text-sm sm:text-base text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-700 hover:bg-slate-800 transition text-white py-3 rounded-lg text-sm sm:text-lg font-semibold shadow-md"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          New user?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline font-medium">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
