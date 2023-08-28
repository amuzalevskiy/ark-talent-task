import React, { useEffect } from "react";

// believe in tree shaking
import {
  Layout,
  Space,
  Card,
  Typography,
  Col,
  Row,
  Button,
  Badge,
  Avatar,
} from "antd";
import {
  DownloadOutlined,
  FormOutlined,
  FilterOutlined,
  UserOutlined,
  CommentOutlined,
} from "@ant-design/icons"; // incorrect icons

import LeftPanel from "../src/Panel/LeftPanel";
import RightPanel from "../src/Panel/RightPanel";

const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;

const App: React.FC = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Title level={2}>Page title</Title>
        </Col>
        <Col span={12}>
          <Button>
            Export to PDF <DownloadOutlined />
          </Button>
          <Button>
            Notes <Text type="secondary">(3)</Text> <FormOutlined />
          </Button>
          <Button>
            Filter <Badge count={"9+"} /> <FilterOutlined />
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <LeftPanel />
        </Col>
        <Col span={12}>
          <RightPanel />
        </Col>
      </Row>
    </>
  );
};

export default App;
