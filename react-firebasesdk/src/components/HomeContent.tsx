import { Button, Card, Col, Layout, Row, Space } from "antd";

const { Content } = Layout;

const HomeContent = ({ navigate, features }: {navigate:any,features:any}) => {
  // Inline styles
  const styles = {
    container: {
      backgroundColor: '#f0f2f5',
      minHeight: 'calc(100vh - 64px)'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '64px 24px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '64px'
    },
    title: {
      fontSize: '48px',
      fontWeight: 700,
      color: '#262626',
      marginBottom: '16px',
      lineHeight: 1.2
    },
    subtitle: {
      fontSize: '20px',
      color: '#595959',
      marginBottom: '32px',
      lineHeight: 1.5
    },
    featureCard: {
      height: '100%',
      textAlign: 'center',
      padding: '24px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
    },
    featureCardHover: {
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-4px)'
    },
    featureIcon: {
      marginBottom: '16px',
      fontSize: '48px',
      color: '#1677ff'
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#262626',
      marginBottom: '8px'
    },
    featureDesc: {
      color: '#595959',
      fontSize: '14px',
      lineHeight: 1.5
    },
    ctaCard: {
      backgroundColor: '#1677ff',
      color: 'white',
      marginTop: '64px',
      borderRadius: '12px',
      border: 'none'
    },
    ctaContent: {
      textAlign: 'center',
      padding: '32px'
    },
    ctaTitle: {
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '16px'
    },
    ctaDesc: {
      fontSize: '18px',
      marginBottom: '24px',
      opacity: 0.9
    },
    primaryButton: {
      backgroundColor: '#1677ff',
      borderColor: '#1677ff',
      height: '40px',
      fontSize: '16px',
      padding: '0 24px'
    },
    secondaryButton: {
      height: '40px',
      fontSize: '16px',
      padding: '0 24px',
      borderColor: '#d9d9d9',
      color: '#262626'
    }
  };

  // Hover state handler for feature cards
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.boxShadow = styles.featureCardHover.boxShadow;
    card.style.transform = styles.featureCardHover.transform;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.boxShadow = styles.featureCard.boxShadow;
    card.style.transform = 'none';
  };

  return (
    <Content style={styles.container}>
      <div style={styles.content}>
        {/* Header section */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            Welcome to Firebase App
          </h1>
          <p style={styles.subtitle}>
            A modern React application with Firebase authentication, Firestore, and Storage
          </p>
          <Space size="large">
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate('/register')}
              style={styles.primaryButton}
            >
              Get Started
            </Button>
            <Button 
              size="large"
              onClick={() => navigate('/login')}
              style={styles.secondaryButton}
            >
              Sign In
            </Button>
          </Space>
        </div>

        {/* Features grid */}
        <Row gutter={[32, 32]}>
          {features.map((feature: any, index: number) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card 
                style={styles.featureCard}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div style={styles.featureIcon}>
                  {feature.icon}
                </div>
                <h3 style={styles.featureTitle}>
                  {feature.title}
                </h3>
                <p style={styles.featureDesc}>
                  {feature.description}
                </p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Call-to-action section */}
        <Card style={styles.ctaCard}>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Ready to get started?</h2>
            <p style={styles.ctaDesc}>
              Create your account and start managing your data today
            </p>
          </div>
        </Card>
      </div>
    </Content>
  );
};

export default HomeContent;