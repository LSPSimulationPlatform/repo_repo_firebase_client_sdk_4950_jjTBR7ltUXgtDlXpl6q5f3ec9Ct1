// Import necessary components and icons from Ant Design
import { Button, Form, Input } from "antd"
import { MailOutlined } from '@ant-design/icons'; // Mail icon for the email input field

// Component definition — receives props for state and functions
const ForgetPassWordEmail = ({ emailSent, onFinish, loading, setEmailSent }: any) => {

  return (
    <>
      {/* Conditional rendering: display the form if the reset email has NOT been sent yet */}
      {!emailSent ? (

        // Ant Design Form setup for "Forgot Password"
        <Form
          name="forgot-password"    // Name of the form (useful for debugging)
          onFinish={onFinish}       // Function that runs when the form is submitted successfully
          layout="vertical"         // Aligns form labels vertically
          size="large"              // Sets large input and button sizes
        >

          {/* Email input field */}
          <Form.Item
            name="email"             // Field name (used in form data)
            rules={[                 // Validation rules for the field
              { required: true, message: 'Please enter your email' }, // Required field rule
              { type: 'email', message: 'Please enter a valid email' } // Valid email format rule
            ]}
          >
            {/* Input field for email with mail icon prefix */}
            <Input 
              prefix={<MailOutlined />} // Adds mail icon inside the input
              placeholder="Email"       // Placeholder text inside the input box
            />
          </Form.Item>

          {/* Submit button section */}
          <Form.Item>
            <Button
              type="primary"        // Ant Design primary button (blue color)
              htmlType="submit"     // Triggers form submission
              loading={loading}     // Shows spinner when loading = true
              block                 // Makes the button full width
              size="large"          // Makes the button large
            >
              Send Reset Link        {/* Button text */}
            </Button>
          </Form.Item>
        </Form>

      ) : (
        // If the email is already sent, show this section instead of the form
        <div className="text-center py-4">
          {/* Button to resend the email by resetting emailSent state */}
          <Button 
            type="primary"                 // Primary button style
            onClick={() => setEmailSent(false)} // Sets emailSent to false so the form reappears
            size="large"                   // Large button size
          >
            Send Again                     {/* Button text */}
          </Button>
        </div>
      )}
    </>
  )
}

// Export the component for use in other files
export default ForgetPassWordEmail;
