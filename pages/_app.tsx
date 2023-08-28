import { AppProps } from "next/app";
import "./_app.css";
import "../styles/globals.css";

// believe in tree shaking
import { Layout, Space, Typography } from "antd";
const { Title, Text } = Typography;

// @TODO: should move to CSS?
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

interface CustomPageProps {}

const MyApp = ({ Component, pageProps }: AppProps<CustomPageProps>) => {
  return (
    <Space direction="vertical" style={{ width: "100%", height: "100vh" }}>
      <Layout>
        <Layout.Header style={headerStyle}>
          <Title>App title</Title>
        </Layout.Header>
        <Layout.Content style={contentStyle}>
          <Component {...pageProps} />
        </Layout.Content>
      </Layout>
    </Space>
  );
};

export default MyApp;
