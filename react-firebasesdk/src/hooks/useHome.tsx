// Importing the useNavigate hook from React Router
// This hook allows programmatic page navigation (redirects without <Link>)
import { useNavigate } from "react-router-dom";

// Importing Ant Design icons to visually represent feature cards
// Each imported icon is actually a React component
import { RocketOutlined, SafetyOutlined, ThunderboltOutlined, CloudOutlined } from '@ant-design/icons';

// Defining a TypeScript interface for each feature item on the home page
// - icon: React component reference (not a JSX element)
// - title: short heading for the feature
// - description: text describing what the feature does
interface Feature {
  icon: any; 
  title: string;
  description: string;
}

// Defining the custom hook: useHome
// This hook encapsulates both navigation and feature data
const useHome = () => {
  // Initialize navigate to handle programmatic routing
  const navigate = useNavigate();

  // Define an array of home page features
  // Each object follows the Feature interface defined above
  const features: Feature[] = [
    {
      icon: <SafetyOutlined className="text-5xl text-primary" />,
      title: 'Secure Authentication',
      description: 'Email/password and Google sign-in with Firebase Auth'
    },
    {
      icon: <CloudOutlined className="text-5xl text-primary" />,
      title: 'Cloud Firestore',
      description: 'Real-time database with automatic sync and offline support'
    },
    {
      icon: <ThunderboltOutlined className="text-5xl text-primary" />,
      title: 'Fast & Responsive',
      description: 'Built with React and Ant Design for optimal performance'
    },
    {
      icon: <RocketOutlined className="text-5xl text-primary" />,
      title: 'Modern Stack',
      description: 'Vite, TypeScript, and latest web technologies'
    }
  ];

  // Return both navigate (for routing) and features (for UI display)
  // Other components like HomeContent can import and use these
  return { navigate, features };
};

// Exporting the custom hook so it can be used in other components
export default useHome;
