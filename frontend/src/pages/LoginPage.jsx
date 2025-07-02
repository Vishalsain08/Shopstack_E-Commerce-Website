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
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="bg-white shadow-xl rounded-xl max-w-xl w-full p-12 space-y-8">
        <h2 className="text-4xl font-extrabold text-center text-primary">Welcome Back 👋</h2>
        <p className="text-center text-gray-600 text-lg">Login to your ShopStack account</p>

        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Email</label>
            <div className="flex items-center border rounded-lg px-4 py-3">
              <FaEnvelope className="text-gray-400 mr-3 text-xl" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full text-lg focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Password</label>
            <div className="flex items-center border rounded-lg px-4 py-3">
              <FaLock className="text-gray-400 mr-3 text-xl" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full text-lg focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
          >
            Login
          </button>
        </form>

        <div className="text-center text-base text-gray-600">
          New user?{' '}
          <Link to="/register" className="text-primary hover:underline font-semibold">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
