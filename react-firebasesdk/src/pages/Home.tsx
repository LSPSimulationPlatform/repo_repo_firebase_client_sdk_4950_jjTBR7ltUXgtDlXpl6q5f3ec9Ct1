// Importing Ant Design components for layout and UI (though some like Button, Space, Card, Row, Col are not used here)
import { Layout, Button, Space, Card, Row, Col } from 'antd';

// Importing the Navbar component
import Navbar from '../components/Navbar';

// Importing custom hook that provides navigation and features for the home page
import useHome from '../hooks/useHome';

// Importing HomeContent component which renders the main home page content
import HomeContent from '../components/HomeContent';

// Defining the Home page component
const Home = () => {
  // Destructuring navigate function and features array from useHome custom hook
  const { navigate, features } = useHome();

  return (
    // Main Layout wrapper from Ant Design; min-h-screen ensures full viewport height
    <Layout className="min-h-screen">
      
      {/* Navbar component displayed at the top */}
      <Navbar />

      {/* HomeContent component renders the main content of the home page
          - navigate: used for routing to different pages
          - features: array of features displayed on the home page */}
      <HomeContent navigate={navigate} features={features} />

    </Layout>
  );
};

// Exporting the Home component as default
export default Home;