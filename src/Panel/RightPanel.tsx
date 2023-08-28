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
import { useAntvG2 } from "../hooks/useAntvG2";

const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;

const headerStyle: React.CSSProperties = {
  height: 64,
  background: "white",
  boxShadow: "rgba(99, 99, 99, 0.2) 0 -32px 13px 36px",
  zIndex: 1,
  padding: "0 calc(50% - 600px)", /// !
};

const contentStyle: React.CSSProperties = {
  height: "100vh",
  minHeight: 320,
  backgroundColor: "#f5f5f5", /// !
  padding: "0 calc(50% - 600px)", /// !
};

const App: React.FC = () => {
  const AntvG2 = useAntvG2();
  useEffect(() => {
    if (!AntvG2) return;
    const chart = new AntvG2.Chart({
      container: "rightPanelContainer",
      theme: "classic",
      autoFit: true,
    });

    chart
      .interval()
      .data([{ letter: "A", frequency: 120 }])
      .encode("x", "letter")
      .encode("y", "frequency")
      .scale("x", { padding: 0.5 });

    chart.render();

    return () => {
      // destroy ?
    };
  }, [AntvG2]);

  return (
    <Card
      title="Chart title"
      bordered={true}
      actions={[
        <>
          <Avatar size="small" icon={<UserOutlined />} />
        </>,
        <>
          3<CommentOutlined />
        </>,
      ]}
    >
      <div id="rightPanelContainer"></div>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};

export default App;
