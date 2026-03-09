import { Layout, Card, Form, Input, Button, InputNumber, Space } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Content } = Layout;

interface AddUserContentProps {
  form: any;
  onFinish: (values: any) => void;
  onCancel: () => void;
  loading: boolean;
}

const AddUserContent = ({ form, onFinish, onCancel, loading }: AddUserContentProps) => {
  // Inline styles
  const styles = {
    content: {
      backgroundColor: '#f8f9fa',
      padding: '24px',
      minHeight: '100vh'
    },
    container: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    backButton: {
      marginBottom: '24px',
      borderColor: '#d9d9d9',
      color: '#595959'
    },
    card: {
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
    },
    title: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#262626',
      marginBottom: '24px'
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
    inputNumber: {
      width: '100%',
      height: '40px',
      borderRadius: '6px',
      border: '1px solid #d9d9d9'
    },
    submitButton: {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
      height: '40px',
      padding: '0 24px',
      fontSize: '16px',
      fontWeight: 500
    },
    cancelButton: {
      height: '40px',
      padding: '0 24px',
      fontSize: '16px',
      borderColor: '#d9d9d9',
      color: '#595959'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px'
    }
  };

  return (
    <Content style={styles.content}>
      <div style={styles.container}>
        {/* Back Button */}
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={onCancel}
          style={styles.backButton}
        >
          Back to Users
        </Button>

        {/* Card Container */}
        <Card style={styles.card}>
          {/* Title */}
          <h1 style={styles.title}>
            Add User Data
          </h1>

          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            size="large"
            autoComplete="off"
          >
            {/* Name Field */}
            <Form.Item
              label="Name"
              name="displayName"
              rules={[{ 
                required: true, 
                message: 'Please enter name' 
              }]}
              style={styles.formItem}
            >
              <Input 
                placeholder="Enter name" 
                style={styles.input}
              />
            </Form.Item>

            {/* Age Field */}
            <Form.Item
              label="Age"
              name="age"
              rules={[{ 
                required: true, 
                message: 'Please enter age',
                type: 'number',
                min: 1,
                max: 120
              }]}
              style={styles.formItem}
            >
              <InputNumber
                placeholder="Enter age"
                min={1}
                max={120}
                style={styles.inputNumber}
              />
            </Form.Item>

            {/* City Field */}
            <Form.Item
              label="City"
              name="city"
              rules={[{ 
                required: true, 
                message: 'Please enter city' 
              }]}
              style={styles.formItem}
            >
              <Input 
                placeholder="Enter city" 
                style={styles.input}
              />
            </Form.Item>

            {/* Photo URL Field */}
            <Form.Item
              label="Photo URL (Optional)"
              name="photoURL"
              style={styles.formItem}
            >
              <Input 
                placeholder="Enter photo URL" 
                style={styles.input}
              />
            </Form.Item>

            {/* Submit Buttons */}
            <Form.Item>
              <Space style={styles.buttonGroup}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<SaveOutlined />}
                  size="large"
                  style={styles.submitButton}
                >
                  Save User Data
                </Button>
                <Button
                  onClick={onCancel}
                  disabled={loading}
                  size="large"
                  style={styles.cancelButton}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Content>
  );
};

export default AddUserContent;