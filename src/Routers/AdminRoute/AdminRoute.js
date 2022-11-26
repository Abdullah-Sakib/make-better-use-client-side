import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useUserRole from '../../CustomHooks/useUserRole/useUserRole';

const AdminRoute = ({children}) => {
  const { user, loading, logOut } = useContext(AuthContext);
  const {role, roleLoading} = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <progress className="progress w-full"></progress>;
  }

  if (user && role === 'admin') {
    return children;
  }

  logOut();
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;