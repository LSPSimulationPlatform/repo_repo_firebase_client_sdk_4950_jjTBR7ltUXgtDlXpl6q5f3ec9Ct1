// Import React hooks for state and lifecycle management
import { useState, useEffect } from 'react';
// Import custom authentication context to get the logged-in user
import { useAuth } from '../context/AuthContext';
// Import Firestore methods for document reading and updating
import { doc, updateDoc, getDoc } from 'firebase/firestore';
// Import Firebase Storage functions for uploading and retrieving images
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// Import configured Firestore and Storage instances
import { db, storage } from '../firebase';
// Import Ant Design utilities for form management and notifications
import { Form, message, UploadFile } from 'antd';

// Define a custom hook for managing user profile data and actions
const userProfile = () => {
  // Get the currently authenticated user from AuthContext
  const { user } = useAuth();

  // Initialize Ant Design form instance
  const [form] = Form.useForm();

  // State to manage general loading status (e.g., while fetching or updating)
  const [loading, setLoading] = useState(false);

  // State to manage upload process loading status
  const [uploading, setUploading] = useState(false);

  // State to store current user's profile data fetched from Firestore
  const [profileData, setProfileData] = useState<any>(null);

  // State to manage uploaded file list (used by Ant Design Upload component)
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Load profile data whenever the authenticated user changes
  useEffect(() => {
    loadProfile();
  }, [user]);

  // Function to load user profile data from Firestore
  const loadProfile = async () => {
    // Exit early if user is not authenticated
    if (!user) return;
    
    setLoading(true); // Start loading indicator
    try {
      // Reference the user's document in Firestore
      const docRef = doc(db, 'usersData', user.uid);
      const docSnap = await getDoc(docRef);

      // If the document exists, populate form fields and state
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfileData(data);
        form.setFieldsValue({
          displayName: data.displayName,
          age: data.age,
          city: data.city,
        });
      }
    } catch (error: any) {
      // Display error message if fetching fails
      message.error('Failed to load profile');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Function to handle profile photo upload to Firebase Storage
  const handleUpload = async (file: any) => {
    // Exit early if user is not authenticated
    if (!user) return;

    setUploading(true); // Start upload indicator
    try {
      // Define the storage path based on user's UID and file name
      const storageRef = ref(storage, `users/${user.uid}/${file.name}`);
      
      // Upload file to Firebase Storage
      await uploadBytes(storageRef, file);

      // Get the downloadable URL for the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      // Update user's photoURL field in Firestore
      const docRef = doc(db, 'usersData', user.uid);
      await updateDoc(docRef, { photoURL: downloadURL });

      // Update local state to immediately show new profile photo
      setProfileData({ ...profileData, photoURL: downloadURL });
      message.success('Photo uploaded successfully!');
    } catch (error: any) {
      message.error('Failed to upload photo');
    } finally {
      setUploading(false); // Stop upload indicator
    }

    // Return false to prevent Ant Design Upload from automatically uploading
    return false;
  };

  // Function to handle profile form submission and update Firestore
  const onFinish = async (values: any) => {
    // Exit if no authenticated user
    if (!user) return;

    setLoading(true); // Start loading indicator
    try {
      // Reference user's Firestore document
      const docRef = doc(db, 'usersData', user.uid);

      // Update document fields with form values
      await updateDoc(docRef, {
        displayName: values.displayName,
        age: values.age,
        city: values.city,
      });

      message.success('Profile updated successfully!');
      loadProfile(); // Refresh profile data after update
    } catch (error: any) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Return all states and functions for external usage
  return {
    user,
    form,
    loading,
    setLoading,
    uploading,
    setUploading,
    profileData,
    setProfileData,
    fileList,
    setFileList,
    handleUpload,
    onFinish,
  };
};

// Export the custom hook as default
export default userProfile;
