import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import useForgotPassword from '../hooks/useForgotPassword';
import ForgetPassWordEmail from '../components/ForgotPassWordEmail';

const ForgotPassword = () => {
  const { loading, setLoading, emailSent, setEmailSent, onFinish } = useForgotPassword();

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
      fontSize: '14px',
      lineHeight: 1.5
    },
    footer: {
      textAlign: 'center',
      marginTop: '24px'
    },
    backLink: {
      color: '#1677ff',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'color 0.3s'
    },
    backLinkHover: {
      color: '#4096ff'
    }
  };

  // Hover handler for back link
  const handleBackLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = styles.backLinkHover.color;
  };

  const handleBackLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = styles.backLink.color;
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        {/* Header section */}
        <div style={styles.header}>
          <h1 style={styles.title}>Reset Password</h1>
          <p style={styles.subtitle}>
            {emailSent 
              ? 'Check your email for reset instructions'
              : 'Enter your email to reset your password'
            }
          </p>
        </div>

        {/* Form Component */}
        <ForgetPassWordEmail 
          emailSent={emailSent} 
          onFinish={onFinish} 
          loading={loading} 
          setEmailSent={setEmailSent}
        />

        {/* Footer with back link */}
        <div style={styles.footer}>
          <Link 
            to="/login"
            style={styles.backLink}
            onMouseEnter={handleBackLinkHover}
            onMouseLeave={handleBackLinkLeave}
          >
            <ArrowLeftOutlined />
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;