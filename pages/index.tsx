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
              <Space>
                Export to PDF
                <DownloadOutlined style={{color: 'rgb(99, 154,143)'}} />
              </Space>
            </Button>
            <Button>
              <Space>
                <span>Notes<Text type="secondary">(3)</Text></span>
                <FormOutlined style={{color: 'rgb(99, 154,143)'}} />
              </Space>
            </Button>
            <Button>
              <Space>
                Filter
                <Badge count={"9+"} />
                <FilterOutlined style={{color: 'rgb(99, 154,143)'}} />
              </Space>
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
