import React, { useState } from 'react';
import { Layout, Menu, theme } from "antd";
import useSidenavItems from "./common/hooks/useSidenavItems";
import CustomFooter from "./common/components/Footer";
import CustomHeader from "./common/components/Header";
import Logo from "./common/components/Logo";
import { Outlet } from 'react-router-dom';
const { Content, Sider } = Layout;

function DefaultLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const items = useSidenavItems();
    const {
      token: { colorBgContainer }
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Logo style={{ height: '64px' }} />
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout>
            <CustomHeader />
            <Content style={{ margin: "16px" }}>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer
                }}
              >
                <Outlet />
              </div>
            </Content>
            <CustomFooter />
          </Layout>
        </Layout>
      );
}

export default DefaultLayout;