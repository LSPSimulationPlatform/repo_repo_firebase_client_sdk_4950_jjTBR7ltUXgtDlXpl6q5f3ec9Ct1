// Import custom authentication hook to get user profile
import { useAuth } from '../context/AuthContext';
// Import navigation hook from react-router-dom
import { useNavigate } from "react-router-dom";
// Import icons for quick action cards
import { 
  UserAddOutlined, 
  TeamOutlined, 
  UserOutlined
} from '@ant-design/icons';

// Custom hook for dashboard logic
const useDashBoard = () => {

  // Get current user's profile from AuthContext
  const { userProfile } = useAuth();
  // Hook for programmatically navigating between routes
  const navigate = useNavigate();

  // Define quick actions to display on the dashboard
  const quickActions = [
    {
      title: 'Add User', // Action title
      description: 'Create a new user profile', // Action description
      icon: <UserAddOutlined className="text-4xl text-primary" />, // Icon for action
      path: '/users/add', // Route to navigate on click
      color: '#1890ff' // Optional color for styling
    },
    {
      title: 'View Users',
      description: 'Browse all user profiles',
      icon: <TeamOutlined className="text-4xl text-primary" />,
      path: '/users',
      color: '#52c41a'
    },
    {
      title: 'My Profile',
      description: 'View and edit your profile',
      icon: <UserOutlined className="text-4xl text-primary" />,
      path: '/profile',
      color: '#faad14'
    }
  ];

  // Return values needed in the dashboard component
  return { userProfile, navigate, quickActions };
}

// Export hook for use in dashboard components
export default useDashBoard;
