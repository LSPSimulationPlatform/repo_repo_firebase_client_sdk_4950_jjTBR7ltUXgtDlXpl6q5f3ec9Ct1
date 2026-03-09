// Import React hooks for state and lifecycle management
import { useState, useEffect } from 'react';
// Import navigation and route parameter utilities from react-router-dom
import { useNavigate, useParams } from 'react-router-dom';
// Import Firestore functions for document operations
import { doc, getDoc, updateDoc } from 'firebase/firestore';
// Import database instance from Firebase configuration
import { db } from '../firebase';
import { Form, message } from 'antd';

const useEditUser=()=>{
      // Get user ID from URL parameters
  const { id } = useParams();
  // Hook for navigation between pages
  const navigate = useNavigate();
  // Create form instance for Ant Design Form component
  const [form] = Form.useForm();
  // State for submit button loading indicator
  const [loading, setLoading] = useState(false);
  // State for initial data fetching indicator
  const [fetching, setFetching] = useState(true);

  // useEffect runs when component mounts or 'id' changes
  useEffect(() => {
    loadUser();
  }, [id]);

  // Function to fetch user data from Firestore
  const loadUser = async () => {
    // Stop if no user ID found
    if (!id) return;

    try {
      // Reference to specific user document in Firestore
      const docRef = doc(db, 'usersData', id);
      // Fetch the document snapshot
      const docSnap = await getDoc(docRef);

      // If document exists, populate form fields with data
      if (docSnap.exists()) {
        const data = docSnap.data();
        form.setFieldsValue({
          displayName: data.displayName,
          age: data.age,
          city: data.city,
          photoURL: data.photoURL
        });
      } else {
        // If no user found, show error and redirect back to users page
        message.error('User not found');
        navigate('/users');
      }
    } catch (error: any) {
      // Handle Firestore or network error
      message.error('Failed to load user data');
    } finally {
      // Stop the loading spinner once done
      setFetching(false);
    }
  };

  // Function triggered when form is submitted successfully
  const onFinish = async (values: any) => {
    // Stop if user ID is missing
    if (!id) return;

    setLoading(true); // Show loading indicator on button
    try {
      // Get reference to user document
      const docRef = doc(db, 'usersData', id);
      // Update user data in Firestore with form values
      await updateDoc(docRef, {
        displayName: values.displayName,
        age: values.age,
        city: values.city,
        photoURL: values.photoURL || '' // Default to empty string if undefined
      });

      // Show success message and navigate back
      message.success('User data updated successfully!');
      navigate('/users');
    } catch (error: any) {
      // Show error if update fails
      message.error('Failed to update user data');
    } finally {
      // Stop button loading indicator
      setLoading(false);
    }
  };

  return { fetching,navigate,form,onFinish,loading}
}

export default useEditUser