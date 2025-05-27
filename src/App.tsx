import React, { useState } from 'react';
import Home from './view/Home';
import { Layout, ConfigProvider, theme, Menu, Typography, Space } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

const { Title, Text } = Typography;

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('page1');

  // 導航菜單項目
  const menuItems = [
    {
      key: 'page1',
      label: '縮網址',
    },
    {
      key: 'page2',
      label: '縮圖片',
    },
    {
      key: 'page3',
      label: '縮影片',
    },
  ];
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#52c41a',
          colorBgContainer: '#1f1f1f',
          colorBgElevated: '#262626',
          colorBgLayout: '#141414',
          colorText: '#ffffff',
          colorTextSecondary: '#a6a6a6',
          colorBorder: '#434343',
          colorBorderSecondary: '#303030',
        },
        components: {
          Card: {
            colorBgContainer: '#1f1f1f',
            colorBorder: '#434343',
          },
          Button: {
            colorPrimary: '#52c41a',
            colorPrimaryHover: '#73d13d',
            algorithm: true,
          },
          Input: {
            colorBgContainer: '#262626',
            colorBorder: '#434343',
            colorText: '#ffffff',
          },
          Select: {
            colorBgContainer: '#262626',
            colorBorder: '#434343',
          },
          Upload: {
            colorBgContainer: '#262626',
            colorBorder: '#434343',
            colorBorderSecondary: '#52c41a',
          }
        }
      }}
    >
      <Layout style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#141414' }}>
        {/* Header */}
        <Header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#1f1f1f',
          borderBottom: '1px solid #434343',
          padding: '0 24px'
        }}>
          <Title level={3} style={{ margin: 0, color: '#ffffff' }}>
            EZURL
          </Title>
          <Space size="large">
            <Text style={{ color: '#a6a6a6', cursor: 'pointer' }}>隱私權</Text>
            <Text style={{ color: '#a6a6a6', cursor: 'pointer' }}>縮網址</Text>
          </Space>
        </Header>

        {/* Navigation Menu */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '24px 0',
          backgroundColor: '#141414'
        }}>
          <Menu
            mode="horizontal"
            selectedKeys={[currentPage]}
            items={menuItems}
            onClick={({ key }) => setCurrentPage(key)}
            style={{
              backgroundColor: 'transparent',
              borderBottom: 'none',
              fontSize: '16px'
            }}
            theme="dark"
          />
        </div>

        <Content style={{ padding: '0 24px 32px' }}>
          <Home currentPage={currentPage} />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;