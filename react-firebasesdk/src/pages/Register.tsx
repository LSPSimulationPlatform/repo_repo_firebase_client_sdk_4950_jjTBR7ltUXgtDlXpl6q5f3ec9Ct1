import { Button, Card, Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import useRegister from '../hooks/useRegister';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { useState } from 'react';

const Register = () => {
  const { loading, setLoading, onFinish, handleGoogleLogin } = useRegister();
  const [isLoginLinkHovered, setIsLoginLinkHovered] = useState(false);

  // Modern gradient styles
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eae7eaff 0%, #ad989bff 100%)',
      padding: '20px'
    },
    card: {
      width: '100%',
      maxWidth: '440px',
      borderRadius: '16px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
      overflow: 'hidden',
      border: 'none'
    },
    cardHeader: {
      background: 'linear-gradient(to right, #488fecff, #3f3ff4ff)',
      padding: '32px 24px',
      textAlign: 'center',
      color: 'white'
    },
    title: {
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '8px',
      color: 'white'
    },
    subtitle: {
      fontSize: '14px',
      opacity: 0.9,
      color: 'white'
    },
    cardBody: {
      padding: '32px',
      backgroundColor: 'white'
    },
    divider: {
      margin: '28px 0',
      color: '#a0aec0',
      fontSize: '14px',
      borderColor: '#e2e8f0'
    },
    googleButton: {
      height: '48px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      fontSize: '15px',
      fontWeight: 500,
      width: '100%',
      color: '#4a5568',
      background: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    googleButtonHover: {
      borderColor: '#cbd5e0',
      backgroundColor: '#f7fafc'
    },
    footer: {
      textAlign: 'center',
      marginTop: '28px',
      paddingTop: '20px',
      borderTop: '1px solid #e2e8f0'
    },
    footerText: {
      color: '#718096',
      fontSize: '14px'
    },
    loginLink: {
      color: isLoginLinkHovered ? '#ec4899' : '#f43f5e',
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: '14px',
      marginLeft: '4px',
      transition: 'color 0.3s'
    },
    loadingButton: {
      opacity: 0.7
    }
  };

  // Hover handler for Google button
  const handleGoogleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = styles.googleButtonHover.borderColor;
    e.currentTarget.style.backgroundColor = styles.googleButtonHover.backgroundColor;
  };

  const handleGoogleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = styles.googleButton.borderColor;
    e.currentTarget.style.backgroundColor = styles.googleButton.background;
  };

  return (
    <div style={styles.container}>
      <Card 
        style={styles.card}
        bodyStyle={{ padding: 0 }}
      >
        {/* Gradient Header */}
        <div style={styles.cardHeader}>
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>Sign up to get started</p>
        </div>

        {/* Form Body */}
        <div style={styles.cardBody}>
          {/* Register Form Component */}
          <RegisterForm onFinish={onFinish} loading={loading} />

          {/* Divider */}
          <Divider style={styles.divider}>Or continue with</Divider>

          {/* Google Button */}
          <Button
            icon={<GoogleOutlined />}
            onClick={handleGoogleLogin}
            loading={loading}
            block
            size="large"
            style={{
              ...styles.googleButton,
              ...(loading ? styles.loadingButton : {})
            }}
            onMouseEnter={handleGoogleButtonHover}
            onMouseLeave={handleGoogleButtonLeave}
          >
            Google
          </Button>

          {/* Footer */}
          <div style={styles.footer}>
            <span style={styles.footerText}>Already have an account? </span>
            <Link 
              to="/login" 
              style={styles.loginLink}
              onMouseEnter={() => setIsLoginLinkHovered(true)}
              onMouseLeave={() => setIsLoginLinkHovered(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;