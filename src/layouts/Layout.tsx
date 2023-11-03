/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  LogoutOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import type { ProSettings } from "@ant-design/pro-components";
import {
  PageContainer,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from "@ant-design/pro-components";
import {
  ConfigProvider,
  Dropdown,
  Input,
  Card,
  theme,
} from "antd";
import defaultLayoutProps from "./_defaultLayoutProps";
import { Outlet } from "react-router-dom";
import MenuFooter from "./MenuFooter";
import HeaderTitle from "./HeaderTitle";

const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="Search"
        bordered={false}
      />
    </div>
  );
};

export default () => {
  const { token } = theme.useToken();
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: "mix",
    splitMenus: false,
  });
  console.log(settings, "settings");
  console.log(token, "token");
  const [pathname, setPathname] = useState("/");
  const [num] = useState(20);

  if (typeof document === "undefined") {
    return <div />;
  }
  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      {/* <ProConfigProvider hashed={false}> */}
        {/* <ConfigProvider
          // getTargetContainer={() => {
          //   return document.getElementById("test-pro-layout") || document.body;
          // }}
        > */}
          <ProLayout
            {...defaultLayoutProps}
            location={{
              pathname,
            }}
            avatarProps={{
              src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
              size: "small",
              title: "John Smith",
              render: (props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "logout",
                          icon: <LogoutOutlined />,
                          label: "logout",
                        },
                      ],
                    }}
                  >
                    {dom}
                  </Dropdown>
                );
              },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              if (typeof window === "undefined") return [];
              return [
                props.layout !== "side" && document.body.clientWidth > 1400 ? (
                  <SearchInput />
                ) : undefined,
                <QuestionCircleFilled key="QuestionCircleFilled" />,
              ];
            }}
            headerTitleRender={(logo, title, _) => (<HeaderTitle logo={logo} title={title} HeaderViewProps={_} />)}
            menuFooterRender={(props) => (<MenuFooter {...props}/>)}
            onMenuHeaderClick={(e) => console.log(e, "onMenuHeaderClick")}
            menuItemRender={(item, dom) => (
              <div
                onClick={() => {
                  setPathname(item.path || "/home/dashboard");
                }}
              >
                {dom}
              </div>
            )}
            {...settings}
          >
            <PageContainer
              token={{
                paddingInlinePageContainerContent: num,
              }}
              pageHeaderRender={false}
            >
              <Card
                style={{
                  height: "100%",
                  minHeight: 500,
                  overflowX: "auto",
                }}
              >
                <Outlet />
              </Card>
            </PageContainer>
            <SettingDrawer
              pathname={pathname}
              enableDarkTheme
              getContainer={(e: any) => {
                if (typeof window === "undefined") return e;
                return document.getElementById("test-pro-layout");
              }}
              settings={settings}
              onSettingChange={(changeSetting) => {
                setSetting(changeSetting);
              }}
              disableUrlParams={false}
            />
          </ProLayout>
        {/* </ConfigProvider> */}
      {/* </ProConfigProvider> */}
    </div>
  );
};
