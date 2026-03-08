// Import necessary React hooks and libraries
import { useState, useEffect } from 'react'; // useState for managing local state, useEffect for side effects
import { useNavigate } from 'react-router-dom'; // Navigation and linking for routing
import { useAuth } from '../context/AuthContext'; // Custom authentication context providing login methods and user info

const useLogin=()=>{

      // Local state for loading indicator (e.g., showing spinner while logging in)
  const [loading, setLoading] = useState(false);

  // Destructure authentication methods and user from AuthContext
  const { login, loginWithGoogle, user } = useAuth();

  // Hook for navigating programmatically between routes
  const navigate = useNavigate();

  // Effect: if the user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]); // Runs when `user` or `navigate` changes

  // Function triggered when form is successfully submitted
  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true); // Start loading state
    try {
      await login(values.email, values.password); // Call login function from AuthContext
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      console.error(error); // Log error for debugging
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Function for handling Google sign-in
  const handleGoogleLogin = async () => {
    setLoading(true); // Start loading state
    try {
      await loginWithGoogle(); // Call Google login method from AuthContext
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      console.error(error); // Log any errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return {
    loading, setLoading,navigate,onFinish,handleGoogleLogin
  }
}

export default useLogin 