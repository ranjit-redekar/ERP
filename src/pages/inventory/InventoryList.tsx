import React, { useState } from "react";
import { Space, Table, FloatButton, Row, Col, Button, Input } from "antd";
import { columns, data } from "./InventoryListTableColumn";
import {
  PlusOutlined,
  ReloadOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import useScreenSize from "../../common/hooks/useScreenSize";
import ProductForm from "./Product";

interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  hsnCode: string;
  taxRate: number;
  sellingPrice: number;
  description?: string;
}

const InventoryList: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const screenSize = useScreenSize();

  return (
    <>
      {showDrawer ? (
        <ProductForm
          visible={showDrawer}
          onClose={() => setShowDrawer(false)}
        />
      ) : null}
      <ProTable<InventoryItem>
        columns={columns}
        dataSource={data}
        rowKey="id"
        search={{
          searchText: "Search",
          resetText: "Clear",
        }}
        // search={false}
        dateFormatter="string"
        headerTitle="Inventory List"
        toolBarRender={() =>
          screenSize === "mobile"
            ? []
            : [
                <Button
                  key="button"
                  icon={<PlusOutlined />}
                  onClick={() => setShowDrawer(true)}
                  type="primary"
                >
                  Add Product
                </Button>,
              ]
        }
        // onFilter={(val) => console.log()}
      />
      {/* <Table columns={columns} dataSource={data} /> */}
      {screenSize === "mobile" ? (
        <FloatButton
          onClick={() => setShowDrawer(true)}
          type="primary"
          icon={<PlusOutlined />}
          tooltip="Add Product"
        />
      ) : null}
    </>
  );
};

export default InventoryList;
