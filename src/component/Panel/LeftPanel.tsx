import React, { useEffect } from "react";

// believe in tree shaking
import { Card, Avatar, Space } from "antd";
import { UserOutlined, CommentOutlined } from "@ant-design/icons"; // incorrect icons

import { useAntvG2 } from "../../hook/useAntvG2";

import panelStyles from './panelStyles.module.css'

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
        <div key="avatar" className={panelStyles.footerAvatar}>
          <Avatar size="small" icon={<UserOutlined />} />
        </div>,
        <div key="comments" className={panelStyles.footerComments}>
          <Space>3<CommentOutlined  style={{color: 'rgb(99, 154,143)'}} /></Space>
        </div>,
      ]}
    >
      <div id="leftPanelContainer" className={panelStyles.contentGraph}></div>
    </Card>
  );
};

export default LeftPanel;
