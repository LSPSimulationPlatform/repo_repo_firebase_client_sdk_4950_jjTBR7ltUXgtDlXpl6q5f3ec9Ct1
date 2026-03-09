// Import functions from Firebase SDK
import { initializeApp } from 'firebase/app';          // Initializes Firebase app
import { getAuth, GoogleAuthProvider } from 'firebase/auth';  // Firebase Authentication
import { getFirestore } from 'firebase/firestore';    // Firestore database
import { getStorage } from 'firebase/storage';        // Firebase Storage

// Firebase configuration object
// Uses environment variables from Vite to keep sensitive info secure
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,                  // Your Firebase API key
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,          // Auth domain for Firebase Auth
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,            // Firebase project ID
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,    // Firebase storage bucket
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,  // Messaging sender ID
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  apiMonaco: import.meta.env.VITE_API_MONACO,
 firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY                     // Firebase app ID
};

// Initialize Firebase app with the configuration object
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication instance
export const auth = getAuth(app);

// Export Google Auth Provider instance for OAuth login
export const googleProvider = new GoogleAuthProvider();

// Export Firestore database instance
export const db = getFirestore(app);

// Export Firebase Storage instance
export const storage = getStorage(app);

// Export initialized Firebase app (optional, in case needed elsewhere)
export default app;
