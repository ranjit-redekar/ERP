import React from "react";
import useScreenSize from "../hooks/useScreenSize";
import { Button, Space, Row, Col, Input } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

interface FilterProps {
  title: string;
  onSearch: () => void;
  onReset: () => void;
}

const Filter: React.FC<FilterProps> = ({ title, onSearch, onReset }) => {
  const screenSize = useScreenSize();

  return (
    <Row justify={{ md: "space-between" }} align="middle">
      <Col>
        <h3>{title}</h3>
      </Col>
      <Col>
        <Space size={8} align="baseline">
          <Input />
          <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
            {screenSize === "mobile" ? null : "Search"}
          </Button>
          <Button icon={<ReloadOutlined />} onClick={onReset}>
            {screenSize === "mobile" ? null : "Reset"}
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export default Filter;
