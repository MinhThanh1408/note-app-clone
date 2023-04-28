import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
function ProtectedRoute({ chidlren }) {
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      return <Navigate to='/login' />;
    }
  });

  return <Outlet />;
}

export default ProtectedRoute;
