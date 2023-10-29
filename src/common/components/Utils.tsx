import React from 'react';
import { ExclamationCircleFilled,     EyeOutlined,
  EditOutlined,
  DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import Icon from "@ant-design/icons";
import {
  DashboardIcon,
  GroupIcon,
  InventoryIcon,
  PurchaseIcon,
  RupeeIcon,
  SaleIcon,
  SettingIcon,
  ProfileIcon,
} from "../Icons";

import {

} from "@ant-design/icons";
type showConfirmObj = {
  title?: string,
  content?: string,
  onOk: Function,
  onCancel: Function
}

export const showConfirm = (param: showConfirmObj) => {
    Modal.confirm({
      title: param?.title ? param.title : 'Do you Want to delete this item?',
      icon: <ExclamationCircleFilled />,
      content: param?.content ? param?.content : 'Some descriptions',
      onOk() {
        console.log('OK');
        param?.onOk && param.onOk();
      },
      onCancel() {
        console.log('Cancel');
        param?.onCancel && param?.onCancel()
      },
    });
};

// Define an interface for the possible icon names
interface IconMap {
  [key: string]: React.ElementType;
}

const iconComponents: IconMap = {
  DashboardIcon: DashboardIcon,
  SettingIcon: SettingIcon,
  SaleIcon: SaleIcon,
  PurchaseIcon: PurchaseIcon,
  GroupIcon: GroupIcon,
  InventoryIcon: InventoryIcon,
  RupeeIcon: RupeeIcon,
  ProfileIcon: ProfileIcon,
};

const defaultStyle = { fontSize: "1.3rem", fontWeight: "bold" };

export const getIcon = (
  iconName: keyof IconMap,
  style: React.CSSProperties = {}
): JSX.Element | null => {
  const IconComponent = iconComponents[iconName];

  if (!IconComponent) {
    console.error(`Icon "${iconName}" not found`);
    return null; // Handle the case when the icon name is not recognized
  }

  const iconStyle = { ...defaultStyle, ...style }; // Merge defaultStyle with the provided style

  return <Icon style={iconStyle} component={IconComponent} />;
}

export const getActions = () => {
    return [
        {
          label: "View",
          icon: <EyeOutlined />,
        },
        {
          label: "Edit",
          icon: <EditOutlined />,
        },
        {
          label: "Delete",
          icon: <DeleteOutlined />,
        },
      ];
}

