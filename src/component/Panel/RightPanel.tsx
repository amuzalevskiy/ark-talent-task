import React, { useCallback, useEffect } from "react";

// believe in tree shaking
import { Card, Avatar, Space, Button } from "antd";
import {
  UserOutlined,
  CommentOutlined,
  HeartOutlined,
} from "@ant-design/icons"; // incorrect icons

import { useAntvG2 } from "../../hook/useAntvG2";

import panelStyles from "./panelStyles.module.css";
import { panelApi } from "../../store/RightPanelState";
import { coronavirusApi } from "../../store/Coronavirus";

const RightPanel: React.FC = () => {
  const AntvG2 = useAntvG2();
  const nation = "Scotland";
  const hasEnglandCases = coronavirusApi.useHasCasesByNation(nation);
  const englandCases = coronavirusApi.useCasesByNation(nation);

  useEffect(() => {
    coronavirusApi.loadCasesByNation(nation);
  }, []);

  console.log({
    hasEnglandCases,
    englandCases,
  });

  useEffect(() => {
    if (!AntvG2) return;
    const chart = new AntvG2.Chart({
      container: "rightPanelContainer",
      theme: "classic",
      autoFit: true,
    });

    chart
      .line()
      .data(englandCases&& englandCases.length ? englandCases.slice(-120): [])
      .encode('x', (d) => new Date(d.date))
      .encode("y", "dailyCases")
      .scale("x", { padding: 0.5 })
      .axis('y', { title: 'Date' })
      .axis('x', { title: 'Daily cases' });

    chart.render();

    return () => {
      // destroy ?
    };
  }, [AntvG2, englandCases]);

  // favourite implementation
  let isFavourite = panelApi.useIsFavourite();
  let toggleFavourite = useCallback(() => {
    panelApi.setFavourite(!isFavourite);
  }, [isFavourite]);

  return (
    <Card
      title="Scotland last 120 days"
      bordered={true}
      extra={
        <Button
          onClick={toggleFavourite}
          type={isFavourite ? "primary" : undefined}
          shape="circle"
          icon={<HeartOutlined style={{ marginTop: 3 }} />}
        />
      }
      actions={[
        <div key="avatar" className={panelStyles.footerAvatar}>
          <Avatar size="small" icon={<UserOutlined />} />
        </div>,
        <div key="comments" className={panelStyles.footerComments}>
          <Space>
            3<CommentOutlined style={{ color: "rgb(99, 154,143)" }} />
          </Space>
        </div>,
      ]}
    >
      <div id="rightPanelContainer" className={panelStyles.contentGraph}></div>
    </Card>
  );
};

export default RightPanel;
