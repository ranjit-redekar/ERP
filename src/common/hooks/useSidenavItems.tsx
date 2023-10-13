import React from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    DashboardOutlined,
    SettingOutlined
  } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label
    } as MenuItem;
  }
const useSidenavItems = () => {
  const items: MenuItem[] = [
    getItem(<Link to="/home">Dashboard</Link>, "1", <DashboardOutlined />),
    getItem(<Link to="/home/parties">Parties</Link>, "2", <UserOutlined />),
    getItem(<Link to="/home/sale">Sale</Link>, "2", <UserOutlined />),
    getItem(<Link to="/home/purchase">Purchase</Link>, "3", <UserOutlined />),
    getItem(<Link to="/home/inventory">Inventory</Link>, "6", <UserOutlined />),
    getItem(<Link to="/home/accounting">Accounting</Link>, "7", <UserOutlined />),
    getItem(<Link to="/home/settings">Settings</Link>, "8", <SettingOutlined />),
  ];
  console.log(MenuItems, 'AAAAAAAAA MenuItems');
  return items;
};

export default useSidenavItems;