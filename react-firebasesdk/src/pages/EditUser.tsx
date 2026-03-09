import { Layout, Spin } from 'antd';
import Navbar from '../components/Navbar';
import useEditUser from '../hooks/useEditUser';
import EditUserContent from '../components/EditUserContent';

const { Content } = Layout;

const EditUser = () => {
  const { fetching, navigate, form, onFinish, loading } = useEditUser();

  if (fetching) {
    return (
      <Layout style={{ height: '100vh' }}>
        <Navbar />
        <Content style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fafafa'
        }}>
          <Spin size="large" tip="Loading..." />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Navbar />
      <EditUserContent 
        navigate={navigate}
        form={form}
        onFinish={onFinish}
        loading={loading}
      />
    </Layout>
  );
};

export default EditUser;