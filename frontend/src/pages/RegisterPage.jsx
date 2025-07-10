import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/users/', formData);
      login(res.data);
      navigate('/');
      toast.success('Account created successfully');
    } catch (error) {
      setErr(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-100 px-4">
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl max-w-md w-full p-8 sm:p-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800">
          Create Account 🚀
        </h2>
        <p className="text-center text-gray-600 text-sm">Register to start shopping</p>

        {err && <p className="text-red-600 text-sm text-center">{err}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="flex items-center border-2 border-indigo-500 rounded-lg px-4 py-2 bg-white shadow-md transition duration-300">
              <FaUser className="text-indigo-500 mr-2 text-lg" />
              <input
                name="name"
                type="text"
                placeholder="Enter your username"
                className="w-full bg-transparent focus:outline-none text-base text-gray-800"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center border-2 border-indigo-500 rounded-lg px-4 py-2 bg-white shadow-md transition duration-300">
              <FaEnvelope className="text-indigo-500 mr-2 text-lg" />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent focus:outline-none text-base text-gray-800"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border-2 border-indigo-500 rounded-lg px-4 py-2 bg-white shadow-md transition duration-300">
              <FaLock className="text-indigo-500 mr-2 text-lg" />
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent focus:outline-none text-base text-gray-800"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-slate-700 hover:bg-slate-800 transition text-white py-3 rounded-lg text-lg font-semibold shadow-md"
          >
            Register
          </button>
        </form>

        {/* Redirect to login */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
