// Import React hooks for managing state and lifecycle
import { useState, useEffect } from 'react';
// Import navigation hook from React Router for redirection
import { useNavigate } from 'react-router-dom';
// Import authentication context to access current user and their profile
import { useAuth } from '../context/AuthContext';
// Import Firebase Firestore methods for querying, listening, and deleting data
import { collection, query, where, onSnapshot, deleteDoc, doc, getDocs } from 'firebase/firestore';
// Import Firestore database instance
import { db } from '../firebase';
// Import Ant Design message for notifications
import { message } from 'antd';

// Custom React hook for fetching and managing the user list
const useUserList = () => {
  // Extract current authenticated user and profile data from AuthContext
  const { user, userProfile } = useAuth();

  // Initialize navigation utility to redirect between pages
  const navigate = useNavigate();

  // State to hold all user documents fetched from Firestore
  const [users, setUsers] = useState<any[]>([]);

  // State to hold filtered users based on search input
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  // State to track whether data is being loaded
  const [loading, setLoading] = useState(true);

  // State to store the current text entered in the search input
  const [searchText, setSearchText] = useState('');

  // Fetch and listen to user data whenever `user` or `userProfile` changes
  useEffect(() => {
    // Stop execution if no user is authenticated
    if (!user) return;

    // Check if the logged-in user has an admin role
    const isAdmin = userProfile?.role === 'admin';

    // Define Firestore query:
    // Admins see all users; non-admins see only their own data
    const q = 
     query(collection(db, 'usersData'))

    // Subscribe to live updates using Firestore onSnapshot (real-time listener)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // Convert Firestore snapshot into a plain array of user objects
        const userData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Update both `users` and `filteredUsers` state
        setUsers(userData);
        setFilteredUsers(userData);
        setLoading(false);
      },
      (error) => {
        // Display error message if fetching fails
        message.error('Failed to load users');
        setLoading(false);
      }
    );

    // Clean up the real-time listener when the component unmounts
    return () => unsubscribe();
  }, [user, userProfile]);

  // Function to filter users based on search text
  const handleSearch = (value: string) => {
    // Update search text state
    setSearchText(value);

    // If the search box is empty, reset to show all users
    if (!value) {
      setFilteredUsers(users);
      return;
    }

    // Filter users by name, email, or city (case-insensitive)
    const filtered = users.filter(user =>
      user.displayName?.toLowerCase().includes(value.toLowerCase()) ||
      user.email?.toLowerCase().includes(value.toLowerCase()) ||
      user.city?.toLowerCase().includes(value.toLowerCase())
    );

    // Update filtered users list
    setFilteredUsers(filtered);
  };

  // Function to delete a user document from Firestore
  const handleDelete = async (id: string) => {
    try {
      // Delete the selected user's document by ID
      await deleteDoc(doc(db, 'usersData', id));
      // Show success message
      message.success('User deleted successfully!');
    } catch (error: any) {
      // Display error if deletion fails
      message.error('Failed to delete user');
    }
  };

  // Function to manually refresh (re-fetch) all users from Firestore
  const handleRefresh = async () => {
    setLoading(true); // Start loading indicator
    try {
      // Determine admin privileges again
      const isAdmin = userProfile?.role === 'admin';
      // Define query based on user role
      const q = isAdmin
        ? query(collection(db, 'usersData'))
        : query(collection(db, 'usersData'), where('uid', '==', user?.uid));

      // Fetch snapshot data manually (not live)
      const snapshot = await getDocs(q);

      // Map snapshot to array of user objects
      const userData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Update user states
      setUsers(userData);
      setFilteredUsers(userData);

      // Notify successful refresh
      message.success('Users refreshed!');
    } catch (error) {
      // Notify failure
      message.error('Failed to refresh users');
    } finally {
      // Stop loading indicator
      setLoading(false);
    }
  };

  // Return states and handlers to be used in user management components
  return {
    user,                // Authenticated user
    userProfile,         // Profile details (e.g., role)
    users,               // All users from Firestore
    setUsers,            // Setter for users
    navigate,            // Navigation function
    filteredUsers,       // Filtered list after search
    setFilteredUsers,    // Setter for filtered users
    loading,             // Loading state
    setLoading,          // Setter for loading state
    searchText,          // Current search input text
    setSearchText,       // Setter for search input text
    handleSearch,        // Search handler
    handleDelete,        // Delete handler
    handleRefresh        // Refresh handler
  };
};

// Export the custom hook for use in user management components
export default useUserList;