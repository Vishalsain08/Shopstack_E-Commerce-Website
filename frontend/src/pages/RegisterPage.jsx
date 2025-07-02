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
    setFormData(prev => ({ ...prev, [name]: value }));
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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-white shadow-xl rounded-xl max-w-md w-full p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary">Create Account 🚀</h2>
        <p className="text-center text-gray-500">Register to start shopping</p>

        {err && <p className="text-red-600 text-sm text-center">{err}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                name="name"
                type="text"
                placeholder="john_doe"
                className="w-full focus:outline-none"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full focus:outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full focus:outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="w-full bg-accent text-white py-2 rounded hover:bg-green-700 transition">
            Register
          </button>
        </form>

        {/* 🔁 Already have an account */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
