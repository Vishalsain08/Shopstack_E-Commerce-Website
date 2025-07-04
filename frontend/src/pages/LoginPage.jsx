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
    <div className="h-screen mx-auto overflow-hidden flex items-center justify-center bg-gradient-to-br from-teal-100 via-sky-100 to-indigo-100 px-4">
      <div className="bg-white/80 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl max-w-md w-full p-10 space-y-6">
        <h2 className="text-3xl font-bold text-center text-accent">Welcome Back 👋</h2>
        <p className="text-center text-gray-600 text-sm">Login to your ShopStack account</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-accent">
              <FaEnvelope className="text-gray-400 mr-2 text-lg" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent focus:outline-none text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-accent">
              <FaLock className="text-gray-400 mr-2 text-lg" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent focus:outline-none text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-accent hover:bg-green-700 transition text-white py-3 rounded-lg text-lg font-semibold shadow-md"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          New user?{' '}
          <Link to="/register" className="text-accent hover:underline font-medium">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
