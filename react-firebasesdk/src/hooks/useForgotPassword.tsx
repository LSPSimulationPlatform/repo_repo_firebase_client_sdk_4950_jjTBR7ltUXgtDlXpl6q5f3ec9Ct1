import { useAuth } from '../context/AuthContext'; // Custom auth context for password reset functionality
import { useState } from "react";

const useForgotPassword=()=>{
  const [loading, setLoading] = useState(false); // State to control loading spinner during async actions
  const [emailSent, setEmailSent] = useState(false); // State to track whether reset email has been sent
  const { resetPassword } = useAuth(); // Get the password reset function from AuthContext

  // Handler for form submission
  const onFinish = async (values: { email: string }) => {
    setLoading(true); // Start loading indicator
    try {
      await resetPassword(values.email); // Call the password reset function with the email
      setEmailSent(true); // Mark email as sent to update UI message
    } catch (error) {
      console.error(error); // Log any errors that occur
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };
    return {loading, setLoading,emailSent, setEmailSent,onFinish}
}

export default useForgotPassword;