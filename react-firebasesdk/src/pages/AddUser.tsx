// Import UI components and utilities from Ant Design
import { Layout } from 'antd';
// Import Navbar component for consistent layout
import Navbar from '../components/Navbar';
// Import custom hook to manage Add User logic
import useAddUser from '../hooks/useAddUser';
// Import AddUserContent component
import AddUserContent from '../components/AddUserContent';

// Destructure Layout for cleaner usage
const { Content } = Layout;

// Define the AddUser functional component
const AddUser = () => {
  // Use the custom hook to access form, loading state, and submission handler
  const { form, loading, onFinish, onCancel } = useAddUser();

  // JSX structure for rendering the Add User page
  return (
    <Layout className="min-h-screen">
      {/* Top navigation bar for consistent page layout */}
      <Navbar />

      {/* Main Add User content: includes form and submission logic */}
      <AddUserContent
        form={form}
        onFinish={onFinish}
        onCancel={onCancel}
        loading={loading}
      />
    </Layout>
  );
};

// Export the AddUser component as default for routing or import in other files
export default AddUser;