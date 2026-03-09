import { Button, Card, Col, Layout, Row, Statistic } from "antd";
import { PlusOutlined } from '@ant-design/icons';

const { Content } = Layout;

const DashBoardContent = ({ userProfile, quickActions, navigate }:any) => {
  // Inline styles
  const styles = {
    content: {
      backgroundColor: '#f0f2f5',
      minHeight: 'calc(100vh - 64px)',
      padding: '24px'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    welcomeSection: {
      marginBottom: '32px'
    },
    welcomeTitle: {
      fontSize: '36px',
      fontWeight: 700,
      color: '#262626',
      marginBottom: '8px'
    },
    welcomeSubtitle: {
      fontSize: '18px',
      color: '#595959'
    },
    statsRow: {
      marginBottom: '32px'
    },
    statCard: {
      borderRadius: '8px'
    },
    statisticTitle: {
      fontSize: '14px',
      color: '#8c8c8c'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 600,
      color: '#262626',
      marginBottom: '16px'
    },
    actionCard: {
      height: '100%',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
    },
    actionCardHover: {
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-4px)'
    },
    actionContent: {
      textAlign: 'center',
      padding: '20px'
    },
    actionIcon: {
      marginBottom: '16px',
      fontSize: '36px',
      color: '#1890ff'
    },
    actionTitle: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#262626',
      marginBottom: '8px'
    },
    actionDescription: {
      color: '#595959',
      marginBottom: '16px',
      fontSize: '14px',
      lineHeight: 1.5
    },
    actionButton: {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff'
    }
  };

  // Hover handler for action cards
  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = styles.actionCardHover.boxShadow;
    e.currentTarget.style.transform = styles.actionCardHover.transform;
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = styles.actionCard.boxShadow;
    e.currentTarget.style.transform = 'none';
  };

  return (
    <Content style={styles.content}>
      <div style={styles.container}>
        {/* Welcome Section */}
        <div style={styles.welcomeSection}>
          <h1 style={styles.welcomeTitle}>
            Welcome, {userProfile?.displayName}!
          </h1>
          <p style={styles.welcomeSubtitle}>
            {userProfile?.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
          </p>
        </div>

        {/* Statistics Row */}
        <Row gutter={[24, 24]} style={styles.statsRow}>
          {/* Role Card */}
          <Col xs={24} sm={12} lg={8}>
            <Card style={styles.statCard}>
              <Statistic
                title="Your Role"
                value={userProfile?.role}
                valueStyle={{ 
                  color: '#1890ff', 
                  textTransform: 'capitalize',
                  fontSize: '24px'
                }}
              />
            </Card>
          </Col>

          {/* Account Status Card */}
          <Col xs={24} sm={12} lg={8}>
            <Card style={styles.statCard}>
              <Statistic 
                title="Account Status" 
                value="Active"
                valueStyle={{ 
                  color: '#52c41a',
                  fontSize: '24px'
                }}
              />
            </Card>
          </Col>

          {/* Member Since Card */}
          <Col xs={24} sm={12} lg={8}>
            <Card style={styles.statCard}>
              <Statistic 
                title="Member Since" 
                value={new Date(userProfile?.createdAt || Date.now()).toLocaleDateString()}
                valueStyle={{ fontSize: '24px' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Quick Actions Section */}
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <Row gutter={[24, 24]}>
          {quickActions.map((action, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card 
                style={styles.actionCard}
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
                onClick={() => navigate(action.path)}
              >
                <div style={styles.actionContent}>
                  <div style={styles.actionIcon}>
                    {action.icon}
                  </div>
                  <h3 style={styles.actionTitle}>
                    {action.title}
                  </h3>
                  <p style={styles.actionDescription}>
                    {action.description}
                  </p>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    style={styles.actionButton}
                  >
                    Go
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Content>
  );
};

export default DashBoardContent;