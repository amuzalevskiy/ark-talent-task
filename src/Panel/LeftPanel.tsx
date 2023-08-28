import React, { useEffect } from "react";

// believe in tree shaking
import { Card, Avatar } from "antd";
import { UserOutlined, CommentOutlined } from "@ant-design/icons"; // incorrect icons

import { useAntvG2 } from "../hooks/useAntvG2";

const LeftPanel: React.FC = () => {
  const AntvG2 = useAntvG2();
  useEffect(() => {
    if (!AntvG2) return;
    const chart = new AntvG2.Chart({
      container: "leftPanelContainer",
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
      <div id="leftPanelContainer"></div>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};

export default LeftPanel;
