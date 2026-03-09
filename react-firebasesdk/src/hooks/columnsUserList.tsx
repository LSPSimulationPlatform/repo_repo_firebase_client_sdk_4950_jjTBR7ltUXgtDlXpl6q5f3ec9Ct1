// Import necessary Ant Design components for UI controls and layout
import { Button, Popconfirm, Space } from "antd";
// Import icons for edit and delete actions
import { 
  EditOutlined, 
  DeleteOutlined, 
} from '@ant-design/icons';
// Import Day.js library for formatting and comparing dates
import dayjs from 'dayjs';

// Define a function that returns column configuration for the User List table
const columnsUserList = ({ navigate, handleDelete }:any) => {

  // Define table columns using Ant Design's column configuration pattern
  const columns = [
    {
      // Column title displayed at the top
      title: 'Name',
      // The key in data source object to display in this column
      dataIndex: 'displayName',
      key: 'displayName',
      // Enable sorting alphabetically by displayName
      sorter: (a: any, b: any) => (a.displayName || '').localeCompare(b.displayName || '')
    },
    {
      // Column title for user email
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      // Column title for age
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      // Enable numerical sorting by age
      sorter: (a: any, b: any) => (a.age || 0) - (b.age || 0)
    },
    {
      // Column title for city
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      // Sort cities alphabetically (case-insensitive)
      sorter: (a: any, b: any) => (a.city || '').localeCompare(b.city || '')
    },
    {
      // Column title for user role
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      // Render role with first letter capitalized
      render: (role: string) => (
        <span style={{ textTransform: 'capitalize' }}>{role}</span>
      )
    },
    {
      // Column title for creation date
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      // Render date formatted with Day.js or show '-' if not available
      render: (date: any) => date ? dayjs(date.toDate()).format('MMM D, YYYY') : '-',
      // Enable sorting by date (oldest → newest)
      sorter: (a: any, b: any) => {
        const dateA = a.createdAt ? a.createdAt.toDate() : new Date(0); // Default to 1970 if missing
        const dateB = b.createdAt ? b.createdAt.toDate() : new Date(0);
        return dateA.getTime() - dateB.getTime();
      }
    },
    {
      // Column title for action buttons
      title: 'Actions',
      key: 'actions',
      // Render custom buttons (Edit and Delete) for each row
      render: (_: any, record: any) => (
        <Space>
          {/* Edit button navigates to user edit page */}
          <Button
            type="primary"
            icon={<EditOutlined />} // Edit icon
            onClick={() => navigate(`/users/edit/${record.id}`)} // Navigate to edit route
            size="small"
          >
            Edit
          </Button>

          {/* Delete button wrapped in a confirmation popup */}
          <Popconfirm
            title="Delete user" // Popup title
            description="Are you sure you want to delete this user?" // Confirmation text
            onConfirm={() => handleDelete(record.id)} // Function to delete the user
            okText="Yes" // Confirm button text
            cancelText="No" // Cancel button text
          >
            <Button 
              danger // Red-colored button for warning
              icon={<DeleteOutlined />} // Delete icon
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  // Return the columns array to be used by Ant Design Table component
  return columns;
};

// Export the column configuration function for reuse
export default columnsUserList;