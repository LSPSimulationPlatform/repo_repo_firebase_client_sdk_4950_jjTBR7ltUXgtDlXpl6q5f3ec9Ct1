// Import required tools and components
import { Navigate } from 'react-router-dom'; // Used to redirect users to another route
import { useAuth } from '../context/AuthContext'; // Custom hook to access authentication data
import { Spin } from 'antd'; // Loading spinner component from Ant Design

// Define the expected props for this component
interface ProtectedRouteProps {
  children: React.ReactNode; // The content (page or component) to protect
  adminOnly?: boolean;       // Optional flag to restrict access to admin users only
}

// ProtectedRoute component: wraps around any page that requires authentication
const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  // Destructure authentication data from context
  const { user, userProfile, loading } = useAuth();

  // While authentication state is still loading, show a centered loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" /> {/* Large Ant Design spinner */}
      </div>
    );
  }

  // If there is no logged-in user, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" replace />; // "replace" prevents going back to the protected page
  }

  // If the route is for admins only and the user is not an admin, redirect to the dashboard
  if (adminOnly && userProfile?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />; // Redirect unauthorized user
  }

  // If all checks pass, render the protected children components
  return <>{children}</>;
};

// Export the component for use in route definitions
export default ProtectedRoute;
