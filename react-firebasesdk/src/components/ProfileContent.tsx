import { Layout, Card, Form, Input, Button, Upload, Avatar } from 'antd';
import { UserOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons';

const { Content } = Layout;

const ProfileContent = ({ profileData, fileList, handleUpload, uploading, form, onFinish, user, loading }:any) => {
  // Inline styles
  const styles = {
    content: {
      backgroundColor: '#f0f2f5',
      padding: '24px',
      minHeight: 'calc(100vh - 64px)'
    },
    container: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    title: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#262626',
      marginBottom: '24px'
    },
    card: {
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      marginBottom: '24px'
    },
    avatarSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '24px'
    },
    avatar: {
      marginBottom: '16px'
    },
    uploadButton: {
      marginTop: '8px'
    },
    formItem: {
      marginBottom: '20px'
    },
    label: {
      fontWeight: 500,
      color: '#262626',
      fontSize: '14px',
      marginBottom: '6px',
      display: 'block'
    },
    input: {
      height: '40px',
      fontSize: '14px',
      borderRadius: '6px',
      border: '1px solid #d9d9d9'
    },
    disabledInput: {
      backgroundColor: '#f5f5f5',
      color: '#8c8c8c',
      cursor: 'not-allowed'
    },
    submitButton: {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
      height: '48px',
      fontSize: '16px',
      fontWeight: 500,
      width: '100%'
    }
  };

  return (
    <Content style={styles.content}>
      <div style={styles.container}>
        {/* Page Title */}
        <h1 style={styles.title}>My Profile</h1>

        {/* Profile Card */}
        <Card style={styles.card}>
          {/* Avatar Section */}
          <div style={styles.avatarSection}>
            <Avatar 
              size={120}
              icon={<UserOutlined />}
              src={profileData?.photoURL}
              style={styles.avatar}
            />
            <Upload
              beforeUpload={handleUpload}
              showUploadList={false}
              fileList={fileList}
            >
              <Button 
                icon={<UploadOutlined />}
                loading={uploading}
                style={styles.uploadButton}
              >
                Upload Photo
              </Button>
            </Upload>
          </div>

          {/* Profile Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            size="large"
          >
            {/* Display Name */}
            <Form.Item
              label="Display Name"
              name="displayName"
              rules={[{ required: true, message: 'Please enter your name' }]}
              style={styles.formItem}
            >
              <Input 
                placeholder="Enter your name" 
                style={styles.input}
              />
            </Form.Item>

            {/* Age */}
            <Form.Item
              label="Age"
              name="age"
              style={styles.formItem}
            >
              <Input 
                type="number" 
                placeholder="Enter your age" 
                style={styles.input}
              />
            </Form.Item>

            {/* City */}
            <Form.Item
              label="City"
              name="city"
              style={styles.formItem}
            >
              <Input 
                placeholder="Enter your city" 
                style={styles.input}
              />
            </Form.Item>

            {/* Email (Disabled) */}
            <Form.Item 
              label="Email"
              style={styles.formItem}
            >
              <Input 
                value={user?.email || ''} 
                disabled 
                style={{...styles.input, ...styles.disabledInput}}
              />
            </Form.Item>

            {/* Role (Disabled) */}
            <Form.Item 
              label="Role"
              style={styles.formItem}
            >
              <Input 
                value={profileData?.role || 'user'} 
                disabled 
                style={{
                  ...styles.input,
                  ...styles.disabledInput,
                  textTransform: 'capitalize'
                }}
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button 
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                block
                size="large"
                style={styles.submitButton}
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Content>
  );
};

export default ProfileContent;