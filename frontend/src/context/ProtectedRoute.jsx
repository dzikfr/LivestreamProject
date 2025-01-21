import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isUserAuthenticated = localStorage.getItem('validation') !== null;

  if (!isUserAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;