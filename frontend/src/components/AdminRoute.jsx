// src/components/AdminRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || !user.isAdmin) {
    return (
      <Navigate
        to="/"
        state={{ from: location, message: 'Admin access required' }}
        replace
      />
    );
  }

  return children;
};

export default AdminRoute;
