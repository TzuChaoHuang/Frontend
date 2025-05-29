import React, { useState, useEffect } from "react";
import Home from "./view/Home";
import Privacy from "./view/Privacy";
import {
  Layout,
  ConfigProvider,
  theme,
  Menu,
  Typography,
  Space,
  Button,
} from "antd";
import { Content, Header, Footer } from "antd/es/layout/layout";
import { MenuOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("page1");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);

  // 監聽視窗大小變化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 導航菜單項目
  const menuItems = [
    {
      key: "page1",
      label: "縮網址",
    },
    {
      key: "page2",
      label: "縮圖片",
    },
    {
      key: "page3",
      label: "縮影片",
    },
    {
      key: "privacy",
      label: "隱私權政策",
    },
  ];

  // 渲染當前頁面內容
  const renderContent = () => {
    switch (currentPage) {
      case "page1":
      case "page2":
      case "page3":
        return <Home currentPage={currentPage} />;
      case "privacy":
        return <Privacy />;
      default:
        return <Home currentPage="page1" />;
    }
  };

  const toggleDate = () => {
    setDateVisible((prev) => !prev);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${month}月${day}日`;
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#52c41a",
          colorBgContainer: "#1f1f1f",
          colorBgElevated: "#262626",
          colorBgLayout: "#141414",
          colorText: "#ffffff",
          colorTextSecondary: "#a6a6a6",
          colorBorder: "#434343",
          colorBorderSecondary: "#303030",
        },
        components: {
          Card: {
            colorBgContainer: "#1f1f1f",
            colorBorder: "#434343",
          },
          Button: {
            colorPrimary: "#52c41a",
            colorPrimaryHover: "#73d13d",
            algorithm: true,
          },
          Input: {
            colorBgContainer: "#262626",
            colorBorder: "#434343",
            colorText: "#ffffff",
          },
          Select: {
            colorBgContainer: "#262626",
            colorBorder: "#434343",
          },
          Upload: {
            colorBgContainer: "#262626",
            colorBorder: "#434343",
            colorBorderSecondary: "#52c41a",
          },
        },
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: "#141414",
        }}
      >
        {/* Header */}
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#1f1f1f",
            borderBottom: "1px solid #434343",
            padding: isMobile ? "0 16px" : "0 24px",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <Title
            level={3}
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: isMobile ? "18px" : "24px",
            }}
          >
            EZURL
          </Title>
          {isMobile ? (
            <MenuOutlined
              style={{ fontSize: "20px", color: "#ffffff" }}
              onClick={() => setIsMenuVisible(!isMenuVisible)}
            />
          ) : (
            <Menu
              mode="horizontal"
              selectedKeys={[currentPage]}
              items={menuItems}
              onClick={(e) => setCurrentPage(e.key)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                flex: 1,
                justifyContent: "flex-end",
              }}
            />
          )}
        </Header>

        {/* Mobile Menu */}
        {isMobile && isMenuVisible && (
          <Menu
            mode="vertical"
            selectedKeys={[currentPage]}
            items={menuItems}
            onClick={(e) => {
              setCurrentPage(e.key);
              setIsMenuVisible(false);
            }}
            style={{
              backgroundColor: "#1f1f1f",
              borderBottom: "1px solid #434343",
            }}
          />
        )}

        {/* Content */}
        <Content
          style={{
            padding: isMobile ? "16px" : "24px",
            backgroundColor: "#141414",
          }}
        >
          {renderContent()}
        </Content>

        {/* Footer */}
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#1f1f1f",
            borderTop: "1px solid #434343",
            padding: isMobile ? "16px" : "24px",
          }}
        >
          <Space direction="vertical" size="small">
            <Space>
              <Text style={{ color: "#a6a6a6" }}>
                © {new Date().getFullYear()} EZURL. All rights reserved.
              </Text>
              
            </Space>
            {dateVisible && (
              <Text style={{ color: "#52c41a", fontSize: "16px" }}>
                {getCurrentDate()}
              </Text>
            )}
            <Text
              style={{ color: "#a6a6a6", cursor: "pointer" }}
              onClick={() => setCurrentPage("privacy")}
            >
              隱私權政策
            </Text>
          </Space>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
