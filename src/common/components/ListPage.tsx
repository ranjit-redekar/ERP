import React, { useState } from "react";
import {
  Space,
  Table,
  FloatButton,
  Row,
  Col,
  Button,
  Input,
  Drawer,
  Dropdown,
  MenuProps,
} from "antd";
import { columns, data } from "./SaleListTableColumn";
import { useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  ReloadOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import Filter from "./Filter";
import { showConfirm } from "./Utils";

const items: MenuProps["items"] = [
  { key: "view", label: "View", icon: <EyeOutlined /> },
  { key: "edit", label: "Edit", icon: <EditOutlined /> },
  { key: "delete", label: "Delete", icon: <DeleteOutlined />, danger: true },
];

interface GetActionProps {
  onActionChange: (value: any, action: string) => void;
  rowData: {};
}

const GetAction: React.FC<GetActionProps> = ({ onActionChange, rowData }) => {
  const handleActionChange = (e: any) => {
    if (e.key === "delete") {
      showConfirm({
        onCancel: () => console.log("showConfirm >> onCancel"),
        onOk: () => console.log("showConfirm >> onOk"),
      });
    } else {
      onActionChange(rowData, e.key);
      //   setShowDrawer(true);
    }

    console.log(rowData, " GetAction >>  handleActionChange >> rowData");
  };

  return (
    <Space size="middle">
      <Dropdown menu={{ items, onClick: handleActionChange }}>
        <MoreOutlined />
      </Dropdown>
    </Space>
  );
};

interface DrawerProps {
  onDrawerClose?: () => void;
  drawerTitle: string;
  drawerContent: React.ReactNode;
  show: boolean;
}

interface FilterProps {
  addButtonLabel: string;
  onActionChange: (value: any, action: string) => void;
  onSearch: (value: string) => void;
  onPressEnter: (value: string) => void;
}

interface ListProps {
  listType?: "table" | "other"; // Define the list type or any other types
  columns: any[]; // Define the actual type for columns
  data: any[]; // Define the actual type for data
}

interface PageListProps {
  drawerProps: DrawerProps;
  filterProps: FilterProps;
  listProps: ListProps;
}

const PageList: React.FC<PageListProps> = ({
  drawerProps,
  filterProps,
  listProps,
}) => {
  const { onDrawerClose, drawerTitle, drawerContent, show } = drawerProps;
  const { addButtonLabel, onActionChange, onSearch, onPressEnter } =
    filterProps;
  const { listType = "table", columns, data } = listProps;
  const [showDrawer, setShowDrawer] = useState(show);
  const [selectedAction, setSelectedAction] = useState("new");
  const [selectedRowData, setSelectedListRowData] = useState(null);

  return (
    <>
      <Drawer
        title={`${drawerTitle}`}
        placement="right"
        onClose={onDrawerClose}
        open={show}
        size="large"
        maskClosable={false}
        bodyStyle={{ paddingTop: "4px" }}
        contentWrapperStyle={{ width: "unset" }}
      >
        {drawerContent}
      </Drawer>
      <div style={{ marginBottom: "12px" }}>
        <Filter
          addButtonLabel={addButtonLabel}
          onAdd={() => onActionChange(null, "Add")}
          onSearch={onSearch}
          onPressEnter={onPressEnter}
        />
      </div>
      {listType === "table" ? (
        <Table
          columns={columns.map((col: any) =>
            col.key === "action"
              ? {
                  ...col,
                  render: (_, record) => (
                    <GetAction
                      onActionChange={onActionChange}
                      rowData={record}
                    />
                  ),
                }
              : col
          )}
          dataSource={data}
        />
      ) : null}
    </>
  );
};

export default PageList;
