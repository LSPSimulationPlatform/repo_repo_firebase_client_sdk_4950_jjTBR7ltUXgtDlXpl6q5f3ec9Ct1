// Import necessary React and Firebase tools
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User} from 'firebase/auth';
import { 
  onAuthStateChanged, // Listener for authentication state changes
  signInWithEmailAndPassword, // Email/password login
  createUserWithEmailAndPassword, // Email/password registration
  signOut, // Logout function
  sendPasswordResetEmail, // Send reset password email
  signInWithPopup // Google login
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore document utilities
import { auth, googleProvider, db } from '../firebase.ts'; // Firebase config
import { message } from 'antd'; // For showing messages (success/error)

// Define the structure of user profile stored in Firestore
interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'user'; // Only two roles possible
  createdAt: Date;
}

// Define the structure of the authentication context
interface AuthContextType {
  user: User | null; // Firebase user
  userProfile: UserProfile | null; // Firestore user profile
  loading: boolean; // Loading state while checking auth
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for using AuthContext easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component that wraps the entire app and provides auth state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // States for Firebase user, Firestore profile, and loading indicator
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if a user is logged in (runs when app loads or auth changes)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user); // Set Firebase user

      if (user) {
        // Get user profile from Firestore
        const profileDoc = await getDoc(doc(db, 'usersData', user.uid));
        if (profileDoc.exists()) {
          setUserProfile(profileDoc.data() as UserProfile); // Save profile
        }
      } else {
        // If no user is logged in, clear the profile
        setUserProfile(null);
      }

      setLoading(false); // Stop loading once checked
    });

    // Cleanup listener when component unmounts
    return unsubscribe;
  }, []);

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.success('Login successful!');
    } catch (error: any) {
      message.error(error.message || 'Login failed');
      throw error;
    }
  };

  // Register new user with email and password
  const register = async (email: string, password: string, displayName?: string) => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save user info in Firestore
      await setDoc(doc(db, 'usersData', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: displayName || email.split('@')[0], // Default to email name if no displayName
        role: 'user',
        createdAt: new Date()
      });
      
      message.success('Registration successful!');
    } catch (error: any) {
      message.error(error.message || 'Registration failed');
      throw error;
    }
  };

  // Login with Google account
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider); // Open Google login popup
      
      // Check if user already exists in Firestore
      const userDoc = await getDoc(doc(db, 'usersData', result.user.uid));
      if (!userDoc.exists()) {
        // If not, create a new user document
        await setDoc(doc(db, 'usersData', result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          role: 'user',
          createdAt: new Date()
        });
      }
      
      message.success('Login successful!');
    } catch (error: any) {
      message.error(error.message || 'Google login failed');
      throw error;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await signOut(auth); // Firebase logout
      message.success('Logged out successfully!');
    } catch (error: any) {
      message.error(error.message || 'Logout failed');
      throw error;
    }
  };

  // Send password reset email
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      message.success('Password reset email sent!');
    } catch (error: any) {
      message.error(error.message || 'Failed to send reset email');
      throw error;
    }
  };

  // Context value that will be available to all components
  const value = {
    user,
    userProfile,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    resetPassword
  };

  // Return the provider wrapping the app
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};