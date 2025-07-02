import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';          // ✅ Toast import
import 'react-toastify/dist/ReactToastify.css';           // ✅ Toast styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App />
        <ToastContainer position="top-center" autoClose={3000} /> {/* ✅ Toast global */}
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
