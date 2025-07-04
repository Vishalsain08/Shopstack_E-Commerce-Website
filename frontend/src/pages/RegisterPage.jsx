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
    <div className="h-screen mx-auto overflow-hidden flex items-center justify-center bg-gradient-to-br from-teal-100 via-sky-100 to-indigo-100 px-4">
      <div className="bg-white/80 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl max-w-md w-full p-10 space-y-6">
        <h2 className="text-3xl font-bold text-center text-accent">Create Account 🚀</h2>
        <p className="text-center text-gray-600 text-sm">Register to start shopping</p>

        {err && <p className="text-red-600 text-sm text-center">{err}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Username</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-accent">
              <FaUser className="text-gray-400 mr-2 text-lg" />
              <input
                name="name"
                type="text"
                placeholder="Enter your Username"
                className="w-full bg-transparent focus:outline-none text-base"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-accent">
              <FaEnvelope className="text-gray-400 mr-2 text-lg" />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent focus:outline-none text-base"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-accent">
              <FaLock className="text-gray-400 mr-2 text-lg" />
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent focus:outline-none text-base"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-accent hover:bg-green-700 transition text-white py-3 rounded-lg text-lg font-semibold shadow-md"
          >
            Register
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
