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
import { panelApi } from "../../store/LeftPanelState";
import { coronavirusApi } from "../../store/Coronavirus";

const LeftPanel: React.FC = () => {
  const nation = "Wales";
  const AntvG2 = useAntvG2();
  const hasEnglandCases = coronavirusApi.useHasCasesByNation(nation);
  const englandCases = coronavirusApi.useCasesByNation(nation);

  useEffect(() => {
    coronavirusApi.loadCasesByNation(nation);
  }, []);

  // favourite implementation
  let isFavourite = panelApi.useIsFavourite();
  let toggleFavourite = useCallback(() => {
    panelApi.setFavourite(!isFavourite);
  }, [isFavourite]);

  useEffect(() => {
    if (!AntvG2) return;
    const chart = new AntvG2.Chart({
      container: "leftPanelContainer",
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

  return (
    <Card
      title="Wales last 120 days"
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
      <div id="leftPanelContainer" className={panelStyles.contentGraph}></div>
    </Card>
  );
};

export default LeftPanel;
