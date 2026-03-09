// Import Ant Design Layout component for page structure
import { Layout } from 'antd';

// Import Navbar component for top navigation
import Navbar from '../components/Navbar';

// Import custom hook for dashboard logic (userProfile, navigation, quick actions)
import useDashBoard from '@/hooks/useDashBoard';

// Import main dashboard content component
import DashBoardContent from '@/components/DashBoardContent';

// Define the Dashboard page component
const Dashboard = () => {
  // Destructure values from custom hook
  const { userProfile, navigate, quickActions } = useDashBoard();

  // Return JSX for Dashboard page
  return (
    // Ant Design Layout wrapper for full height
    <Layout className="min-h-screen">
      {/* Navbar displayed at the top */}
      <Navbar />
      
      {/* Main dashboard content, passing props */}
      <DashBoardContent 
        userProfile={userProfile} 
        quickActions={quickActions} 
        navigate={navigate} 
      />
    </Layout>
  );
};

// Export Dashboard component for use in routing
export default Dashboard;
