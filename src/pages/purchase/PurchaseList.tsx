import React, { useState } from "react";
import { Space, Table, FloatButton, Row, Col, Button, Input } from "antd";
import { columns, data } from "./PurchaseListTableColumn";
import {
  PlusOutlined,
  ReloadOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import useScreenSize from "../../common/hooks/useScreenSize";
import { useNavigate } from "react-router-dom";

const PurchaseList: React.FC = () => {
  const screenSize = useScreenSize();
  const navigate = useNavigate();
  return (
    <>
      <Row style={{ marginBlock: "0.8rem" }} justify={{ lg: "space-between" }}>
        {screenSize === "mobile" ? null : (
          <Col>
            <Button
              type="primary"
              onClick={() => navigate("new")}
              icon={<PlusCircleOutlined />}
            >
              New Purchase Order
            </Button>
          </Col>
        )}
        <Col>
          {" "}
          <Space size={4} align="baseline">
            {" "}
            <Input />{" "}
            <Button type="primary" icon={<SearchOutlined />}>
              Search
            </Button>{" "}
            <Button icon={<ReloadOutlined />}>Reset</Button>{" "}
          </Space>{" "}
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
      {screenSize === "mobile" ? (
        <FloatButton
          onClick={() => navigate("new")}
          type="primary"
          icon={<PlusOutlined />}
          tooltip="New purchase order"
        />
      ) : null}
    </>
  );
};

export default PurchaseList;
