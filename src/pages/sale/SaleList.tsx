import React, { useState } from "react";
import { Space, Table, FloatButton, Row, Col, Button, Input } from "antd";
import { columns, data } from "./SaleListTableColumn";
import { useNavigate } from "react-router-dom";
import AddSale from "./AddSale";
import PageList from "../../common/components/ListPage";

const SaleList: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedAction, setSelectedAction] = useState("new");
  const [selectedRowData, setSelectedListRowData] = useState(null);

  const drawerProps = {
    onDrawerClose: () => {
      console.log("Drawer closed");
      setShowDrawer(false)
    },
    drawerTitle: `${selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1)} Sale`,
    drawerContent: <AddSale />,
    show: showDrawer,
  };

  const filterProps = {
    addButtonLabel: "New Sale Order",
    onActionChange: (val, action) => {
      console.log("Add button clicked", val, action);
      setSelectedListRowData(val);
      setShowDrawer(true)
    },
    onSearch: (value) => {
      console.log(`Search button clicked with value: ${value}`);
    },
    onPressEnter: (value) => {
      console.log(`Enter key pressed with value: ${value}`);
    },
  };

  const listProps = {
    listType: "table",
    columns: columns, // Define your dummy columns as needed
    data: data, // Define your dummy data as needed
  };

  return (
    <>
      <PageList
        drawerProps={drawerProps}
        filterProps={filterProps}
        listProps={listProps}
      />
    </>
  );
};

export default SaleList;
