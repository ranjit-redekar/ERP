import { Link } from "react-router-dom";
import MenuItems from "../configs/sidenav-menus.json";
import { getIcon } from "../common/components/Utils";

const mapMenuItems = (item: any) => ({
  path: item.path,
  name: item?.children?.length ? item.name : <Link to={item.path}>{item.name}</Link>,
  icon: item?.icon ? getIcon(item.icon) : null,
  routes: item?.children?.length ? item.children.map((_ele) => mapMenuItems(_ele)) : "",
});

const menuList = MenuItems.filter((item) => item?.isShowInSidenav).map((item) => (mapMenuItems(item)));
console.log(menuList, 'AAAAAAAAA-------menuList')
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
