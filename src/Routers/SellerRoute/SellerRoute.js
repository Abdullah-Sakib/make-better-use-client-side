import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useUserRole from '../../CustomHooks/useUserRole/useUserRole';

const SellerRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const {role, roleLoading} = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <progress className="progress w-full"></progress>;
  }

  console.log(role);

  if (user && role === 'seller') {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;