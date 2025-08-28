import { useAuth } from '../context/AuthContext.jsx';
import { Navigate, Outlet } from 'react-router-dom';

export default function SellerProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // Or a spinner component
  }

  // Check if the user is logged in and has the 'SELLER' role
  if (user && user.roles?.includes('SELLER')) {
    return <Outlet />; // Renders the child route (e.g., SellerDashboard)
  }

  // Redirect to login or an unauthorized page if checks fail
  return <Navigate to="/login" replace />;
}