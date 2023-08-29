import React from "react";

// believe in tree shaking
import { Typography, Col, Row, Button, Badge, Space } from "antd";
import {
  DownloadOutlined,
  FormOutlined,
  FilterOutlined,
} from "@ant-design/icons"; // incorrect icons
import { useWindowSize } from "@uidotdev/usehooks";

import styles from "./index.module.css";

import LeftPanel from "../src/component/Panel/LeftPanel";
import RightPanel from "../src/component/Panel/RightPanel";

const { Title, Text } = Typography;

const App: React.FC = () => {
  const windowSize = useWindowSize();
  const windowWidth = windowSize ? windowSize.width || 0 : 0;
  const title = <Title level={2}>Page title</Title>;
  const buttons = (
    <Space>
      <Button>
        <Space>
          Export to PDF
          <DownloadOutlined style={{ color: "rgb(99, 154,143)" }} />
        </Space>
      </Button>
      <Button>
        <Space>
          <span>
            Notes<Text type="secondary">(3)</Text>
          </span>
          <FormOutlined style={{ color: "rgb(99, 154,143)" }} />
        </Space>
      </Button>
      <Button>
        <Space>
          Filter
          <Badge count={"9+"} />
          <FilterOutlined style={{ color: "rgb(99, 154,143)" }} />
        </Space>
      </Button>
    </Space>
  );
  return (
    <>
      {windowWidth > 640 && (
        <>
          <Row gutter={16}>
            <Col span={12}>{title}</Col>
            <Col span={12} className={styles.buttonContainer}>
              {buttons}
            </Col>
          </Row>
        </>
      )}
      {windowWidth <= 640 && (
        <>
          {title}
          {buttons}
          <div className={styles.verticalGap} />
        </>
      )}
      {windowWidth > 800 && (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <LeftPanel />
            </Col>
            <Col span={12}>
              <RightPanel />
            </Col>
          </Row>
        </>
      )}
      {windowWidth <= 800 && (
        <>
          <LeftPanel />
          <div className={styles.verticalGap} />
          <RightPanel />
        </>
      )}
    </>
  );
};

export default App;
