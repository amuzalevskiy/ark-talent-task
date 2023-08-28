import React, { useEffect } from "react";

// believe in tree shaking
import { Typography, Col, Row, Button, Badge, Space } from "antd";
import {
  DownloadOutlined,
  FormOutlined,
  FilterOutlined,
} from "@ant-design/icons"; // incorrect icons


import styles from "./index.module.css";

import LeftPanel from "../src/Panel/LeftPanel";
import RightPanel from "../src/Panel/RightPanel";

const { Title, Text } = Typography;

const App: React.FC = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Title level={2}>Page title</Title>
        </Col>
        <Col span={12} className={styles.buttonContainer}>
          <Space>
            <Button>
              Export to PDF <DownloadOutlined />
            </Button>
            <Button>
              Notes <Text type="secondary">(3)</Text> <FormOutlined />
            </Button>
            <Button>
              Filter <Badge count={"9+"} /> <FilterOutlined />
            </Button>
          </Space>
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
