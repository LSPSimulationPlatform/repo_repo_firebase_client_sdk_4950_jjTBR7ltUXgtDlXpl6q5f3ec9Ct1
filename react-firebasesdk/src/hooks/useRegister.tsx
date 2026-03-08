// Import necessary hooks and components
import { useState, useEffect } from 'react'; // React hooks for managing state and side effects
import { useNavigate, Link } from 'react-router-dom'; // Navigation and linking for routing
import { useAuth } from '../context/AuthContext'; // Custom authentication context (register, Google login, etc.)
const useRegister=()=>{

      const [loading, setLoading] = useState(false); // Local state for loading spinner
  const { register, loginWithGoogle, user } = useAuth(); // Extract auth methods and user object from context
  const navigate = useNavigate(); // Hook to programmatically navigate between pages

  // Redirect to dashboard if the user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard'); // Navigate to dashboard if user exists
    }
  }, [user, navigate]); // Runs when user or navigate changes

  // Handle form submission
  const onFinish = async (values: { email: string; password: string; displayName: string }) => {
    setLoading(true); // Start loading state
    try {
      await register(values.email, values.password, values.displayName); // Call register function from AuthContext
      navigate('/dashboard'); // Redirect to dashboard after successful registration
    } catch (error) {
      console.error(error); // Log error if registration fails
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true); // Start loading spinner
    try {
      await loginWithGoogle(); // Call Google login method
      navigate('/dashboard'); // Redirect to dashboard after login
    } catch (error) {
      console.error(error); // Log any errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return {loading, setLoading,onFinish,handleGoogleLogin}
}

export default useRegister;