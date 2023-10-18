import React from "react";
import useScreenSize from "../hooks/useScreenSize";
import { Button, Space, Row, Col, Input } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

interface FilterProps {
  leftSection: React.ReactNode;
  onSearch: () => void;
  onReset: () => void;
}

const Filter: React.FC<FilterProps> = ({ leftSection, onSearch, onReset }) => {
  const screenSize = useScreenSize();

  return (
    <Row justify={{ md: "space-between" }} align="middle">
      {screenSize === "mobile" ? null : <Col>
        {leftSection}
      </Col>}
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
