import Icon from "@ant-design/icons";
import { Link } from "react-router-dom";
import MenuItems from "./sideNavMenu.json";
import { DashboardIcon, GroupIcon, InventoryIcon, PurschaseIcon, RupeeIcon, SaleIcon, SettingIcon } from "../common/Icons";

const style = { fontSize:'1.3rem', fontWeight: 'bold' };

const IconMap: any = {
  DashboardIcon: <Icon style={style} component={DashboardIcon} />,
  SettingIcon: <Icon style={style} component={SettingIcon} />,
  SaleIcon: <Icon style={style} component={SaleIcon} />,
  PurschaseIcon: <Icon style={style} component={PurschaseIcon} />,
  GroupIcon: <Icon style={style} component={GroupIcon} />,
  InventoryIcon: <Icon style={style} component={InventoryIcon} />,
  RupeeIcon: <Icon style={style} component={RupeeIcon} />,
};

const mapMenuItems = (item: any) => ({
  path: item.path,
  name: item?.children?.length ? item.name : <Link to={item.path}>{item.name}</Link>,
  icon: item?.icon ? IconMap[item.icon] : null,
  routes: item?.children?.length ? item.children.map((_ele) => mapMenuItems(_ele)) : "",
});

const menuList = MenuItems.map((item) => (mapMenuItems(item)));

export default {
  route: {
    path: "/",
    routes: menuList,
  },
  prefixCls: "erp",
  breadcrumbRender:false,
  title: "ERP",
  logo: "https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ",
  menu:{
    collapsedShowGroupTitle: false,
  },
  token: {
    header: {
      colorBgHeader: "#292f33",
      colorHeaderTitle: "#fff",
      colorTextMenu: "#dfdfdf",
      colorTextMenuSecondary: "#dfdfdf",
      colorTextMenuSelected: "#fff",
      colorBgMenuItemSelected: "#22272b",
      colorTextRightActionsItem: "#dfdfdf",
    },
    sider: {
      colorMenuBackground: "#fff",
      colorMenuItemDivider: "#dfdfdf",
      colorTextMenu: "#595959",
      colorTextMenuSelected: "rgba(42,122,251,1)",
      colorBgMenuItemSelected: "rgba(230,243,254,1)",
    },
  }
};
