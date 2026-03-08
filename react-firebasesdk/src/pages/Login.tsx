import { Form, Input, Button, Card, Divider } from 'antd';
import { GoogleOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const {
    loading,
    onFinish,
    handleGoogleLogin
  } = useLogin();

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '20px'
    },
    card: {
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      overflow: 'hidden'
    },
    header: {
      textAlign: 'center',
      marginBottom: '24px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#262626',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#595959',
      fontSize: '14px'
    },
    formItem: {
      marginBottom: '16px'
    },
    forgotPassword: {
      textAlign: 'right',
      marginBottom: '16px'
    },
    forgotLink: {
      color: '#1677ff',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'color 0.3s'
    },
    forgotLinkHover: {
      color: '#4096ff'
    },
    submitButton: {
      backgroundColor: '#1677ff',
      borderColor: '#1677ff',
      height: '40px',
      fontSize: '16px',
      fontWeight: 500,
      width: '100%'
    },
    googleButton: {
      height: '40px',
      fontSize: '16px',
      width: '100%',
      borderColor: '#d9d9d9',
      color: '#262626'
    },
    footer: {
      textAlign: 'center',
      marginTop: '24px'
    },
    footerText: {
      color: '#595959',
      fontSize: '14px'
    },
    signupLink: {
      color: '#1677ff',
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '14px',
      marginLeft: '4px',
      transition: 'color 0.3s'
    },
    signupLinkHover: {
      color: '#4096ff'
    },
    divider: {
      color: '#bfbfbf',
      fontSize: '14px',
      margin: '24px 0'
    },
    input: {
      height: '40px',
      fontSize: '14px'
    }
  };

  // Hover handler functions
  const handleForgotLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = styles.forgotLinkHover.color;
  };

  const handleForgotLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = styles.forgotLink.color;
  };

  const handleSignupLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = styles.signupLinkHover.color;
  };

  const handleSignupLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = styles.signupLink.color;
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        {/* Header section */}
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          {/* Email input */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
            style={styles.formItem}
          >
            <Input
              prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Email"
              style={styles.input}
            />
          </Form.Item>

          {/* Password input */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
            style={styles.formItem}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Password"
              style={styles.input}
            />
          </Form.Item>

          {/* Forgot password link */}
          <div style={styles.forgotPassword}>
            <Link 
              to="/forgot-password" 
              style={styles.forgotLink}
              onMouseEnter={handleForgotLinkHover}
              onMouseLeave={handleForgotLinkLeave}
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              style={styles.submitButton}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        {/* Divider */}
        <Divider style={styles.divider}>Or</Divider>

        {/* Google login button */}
        <Button
          icon={<GoogleOutlined />}
          onClick={handleGoogleLogin}
          loading={loading}
          block
          size="large"
          style={styles.googleButton}
        >
          Continue with Google
        </Button>

        {/* Footer with signup link */}
        <div style={styles.footer}>
          <span style={styles.footerText}>Don't have an account? </span>
          <Link 
            to="/register" 
            style={styles.signupLink}
            onMouseEnter={handleSignupLinkHover}
            onMouseLeave={handleSignupLinkLeave}
          >
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;