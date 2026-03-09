import { Layout, Table, Button, Space, Input, Card } from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import Navbar from '../components/Navbar';
import useUserList from '../hooks/useUserList';
import columnsUserList from '../hooks/columnsUserList';

const { Content } = Layout;
const { Search } = Input;

const UserList = () => {
  const {
    user,
    userProfile,
    users,
    setUsers,
    navigate,
    filteredUsers,
    setFilteredUsers,
    loading,
    setLoading,
    searchText,
    setSearchText,
    handleSearch,
    handleDelete,
    handleRefresh
  } = useUserList();

  // Inline styles
  const styles = {
    layout: {
      minHeight: '100vh'
    },
    content: {
      backgroundColor: '#f0f2f5',
      padding: '24px'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    card: {
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '16px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#262626',
      margin: 0
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px'
    },
    refreshButton: {
      borderColor: '#d9d9d9',
      color: '#595959'
    },
    addButton: {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff'
    },
    searchBar: {
      marginBottom: '24px'
    },
    table: {
      borderRadius: '8px',
      overflow: 'hidden'
    },
    pagination: {
      marginTop: '24px'
    }
  };

  return (
    <Layout style={styles.layout}>
      <Navbar />
      <Content style={styles.content}>
        <div style={styles.container}>
          <Card style={styles.card}>
            {/* Page Header */}
            <div style={styles.header}>
              <h1 style={styles.title}>
                {userProfile?.role === 'admin' ? 'All Users' : 'My Data'}
              </h1>
              <Space style={styles.buttonGroup}>
                <Button 
                  icon={<ReloadOutlined />}
                  onClick={handleRefresh}
                  style={styles.refreshButton}
                >
                  Refresh
                </Button>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => navigate('/users/add')}
                  style={styles.addButton}
                >
                  Add User
                </Button>
              </Space>
            </div>

            {/* Search Bar */}
            <Search
              placeholder="Search by name, email, or city"
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={styles.searchBar}
            />

            {/* User Table */}
            <Table
              columns={columnsUserList({ navigate, handleDelete })}
              dataSource={filteredUsers}
              rowKey="id"
              loading={loading}
              style={styles.table}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total:any) => `Total ${total} users`,
                style: styles.pagination
              }}
            />
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default UserList;