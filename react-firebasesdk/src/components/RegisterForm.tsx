// Import Ant Design icons for form input prefixes
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

// Import Ant Design components for form and button
import { Button, Form, Input } from "antd";

// Define RegisterForm functional component, receives onFinish callback and loading state as props
const RegisterForm=({onFinish,loading}:any)=>{

    return(
        // Ant Design Form component with vertical layout and large size
        <Form
            name="register"
            onFinish={onFinish} // Triggered when form is submitted
            layout="vertical"
            size="large"
        >
            {/* Form item for full name */}
            <Form.Item
                name="displayName"
                rules={[{ required: true, message: 'Please enter your name' }]}
            >
                <Input
                    prefix={<UserOutlined />}  // Icon at the start of input
                    placeholder="Full Name" 
                />
            </Form.Item>

            {/* Form item for email */}
            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                ]}
            >
                <Input 
                    prefix={<MailOutlined />} 
                    placeholder="Email" 
                />
            </Form.Item>

            {/* Form item for password */}
            <Form.Item
                name="password"
                rules={[
                    { required: true, message: 'Please enter your password' },
                    { min: 6, message: 'Password must be at least 6 characters' }
                ]}
            >
                <Input.Password 
                    prefix={<LockOutlined />} 
                    placeholder="Password" 
                />
            </Form.Item>

            {/* Form item for confirm password */}
            <Form.Item
                name="confirmPassword"
                dependencies={['password']} // Checks against password field
                rules={[
                    { required: true, message: 'Please confirm your password' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve(); // Valid if matches password
                            }
                            return Promise.reject(new Error('Passwords do not match')); // Error if mismatch
                        },
                    }),
                ]}
            >
                <Input.Password 
                    prefix={<LockOutlined />} 
                    placeholder="Confirm Password" 
                />
            </Form.Item>

            {/* Submit button */}
            <Form.Item>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading} // Shows loading state
                    block
                    size="large"
                >
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    )
}

// Exporting RegisterForm component as default
export default RegisterForm;
