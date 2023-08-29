import React, { useCallback, useEffect } from "react";

// believe in tree shaking
import { Card, Avatar, Space, Button } from "antd";
import { UserOutlined, CommentOutlined, HeartOutlined } from "@ant-design/icons"; // incorrect icons

import { useAntvG2 } from "../../hook/useAntvG2";

import panelStyles from './panelStyles.module.css'
import { panelApi } from "../../store/LeftPanelState";

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

  // favourite implementation
  let isFavourite = panelApi.useIsFavourite()
  let toggleFavourite = useCallback(() => {
    panelApi.setFavourite(!isFavourite)
  }, [isFavourite])

  return (
    <Card
      title="Chart title"
      bordered={true}
      extra={<Button onClick={toggleFavourite} type={isFavourite ? 'primary': undefined} shape="circle" icon={<HeartOutlined style={{marginTop: 3}}/>} />}
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
