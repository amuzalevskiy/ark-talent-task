import React from 'react';
import { Layout, Space, Card, Typography, Col, Row } from 'antd';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

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
        <Title level={2}>Page title</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Chart title" bordered={true}>
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
