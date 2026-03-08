import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContex;
import { Layout, Menu, Button, Avatar, Dropdown, Space } from 'antd';
import { 
  HomeOutlined, 
  UserOutlined, 
  TeamOutlined, 
  LogoutOutlined,
  DashboardOutlined
} from '@ant-design/icons';

const { Header } = Layout;

const Navbar = () => {
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = user ? [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>
    },
    {
      key: 'users',
      icon: <TeamOutlined />,
      label: <Link to="/users">Users</Link>
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>
    }
  ] : [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>
    }
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout
    }
  ];

  // Inline styles
  const styles = {
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
      height: '64px',
      lineHeight: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px',
      flex: 1
    },
    logo: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1677ff',
      textDecoration: 'none',
      whiteSpace: 'nowrap'
    },
    menu: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      lineHeight: '62px',
      backgroundColor: 'transparent'
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    userInfo: {
      cursor: 'pointer',
      padding: '4px 8px',
      borderRadius: '6px',
      transition: 'background-color 0.3s'
    },
    userInfoHover: {
      backgroundColor: '#f5f5f5'
    },
    userName: {
      color: '#262626',
      marginLeft: '8px'
    },
    loginButton: {
      color: '#595959',
      border: 'none',
      padding: '4px 12px',
      height: '32px',
      fontSize: '14px',
      borderRadius: '6px',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    loginButtonHover: {
      color: '#1677ff',
      backgroundColor: '#f0f0f0'
    },
    signupButton: {
      backgroundColor: '#1677ff',
      border: 'none',
      padding: '4px 16px',
      height: '32px',
      fontSize: '14px',
      borderRadius: '6px',
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    signupButtonHover: {
      backgroundColor: '#4096ff',
      boxShadow: '0 2px 8px rgba(22, 119, 255, 0.2)'
    }
  };

  // Hover handler functions
  const handleUserInfoHover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = styles.userInfoHover.backgroundColor;
  };

  const handleUserInfoLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  const handleLoginHover = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.style) {
      e.currentTarget.style.color = styles.loginButtonHover.color;
      e.currentTarget.style.backgroundColor = styles.loginButtonHover.backgroundColor;
    }
  };

  const handleLoginLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.style) {
      e.currentTarget.style.color = styles.loginButton.color;
      e.currentTarget.style.backgroundColor = styles.loginButton.backgroundColor;
    }
  };

  const handleSignupHover = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.style) {
      e.currentTarget.style.backgroundColor = styles.signupButtonHover.backgroundColor;
      e.currentTarget.style.boxShadow = styles.signupButtonHover.boxShadow;
    }
  };

  const handleSignupLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.style) {
      e.currentTarget.style.backgroundColor = styles.signupButton.backgroundColor;
      e.currentTarget.style.boxShadow = 'none';
    }
  };

  return (
    <Header style={styles.header}>
      <div style={styles.leftSection}>
        <Link to="/" style={styles.logo}>
          Firebase App
        </Link>
        <Menu
          mode="horizontal"
          items={menuItems}
          style={styles.menu}
        />
      </div>
      
      <div style={styles.rightSection}>
        {user ? (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space 
              style={styles.userInfo}
              onMouseEnter={handleUserInfoHover}
              onMouseLeave={handleUserInfoLeave}
            >
              <Avatar icon={<UserOutlined />} />
              <span style={styles.userName}>
                {userProfile?.displayName || user?.email}
              </span>
            </Space>
          </Dropdown>
        ) : (
          <Space>
            <Button 
              type="link" 
              onClick={() => navigate('/login')}
              style={styles.loginButton}
              onMouseEnter={handleLoginHover}
              onMouseLeave={handleLoginLeave}
            >
              Login
            </Button>
            <Button 
              type="primary" 
              onClick={() => navigate('/register')}
              style={styles.signupButton}
              onMouseEnter={handleSignupHover}
              onMouseLeave={handleSignupLeave}
            >
              Sign Up
            </Button>
          </Space>
        )}
      </div>
    </Header>
  );
};

export default Navbar;