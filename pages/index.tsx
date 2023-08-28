import React from 'react';
import { Layout, Space, Card, Typography, Col, Row, Button, Badge, Avatar } from 'antd';
import { DownloadOutlined, FormOutlined, FilterOutlined, UserOutlined, CommentOutlined } from '@ant-design/icons'; // incorrect icons

const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;

const headerStyle: React.CSSProperties = {
  height: 64,
  background: 'white',
  boxShadow: 'rgba(99, 99, 99, 0.2) 0 -32px 13px 36px',
  zIndex: 1,
  padding: '0 calc(50% - 600px)', /// !
};

const contentStyle: React.CSSProperties = {
  height: '100vh',
  minHeight: 320,
  backgroundColor: '#f5f5f5', /// !
  padding: '0 calc(50% - 600px)', /// !
};

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%', height: '100vh'}}>
    <Layout>
      <Header style={headerStyle}><Title>App title</Title></Header>
      <Content style={contentStyle}>
        <Row gutter={16}>
            <Col span={12}>
              <Title level={2}>Page title</Title>
            </Col>
            <Col span={12}>
              <Button>Export to PDF <DownloadOutlined /></Button>
              <Button>Notes <Text type="secondary">(3)</Text> <FormOutlined /></Button>
              <Button>Filter <Badge count={"9+"} /> <FilterOutlined /></Button>
            </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Chart title" bordered={true} actions={[
                <Avatar size="small" icon={<UserOutlined />} />,
                <>Export to PDF<CommentOutlined /></>,
              ]}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Chart title" bordered={true}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Space>
)

export default App;
