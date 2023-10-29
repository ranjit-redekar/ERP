import React from "react";
import useScreenSize from "../hooks/useScreenSize";
import { Button, Row, Col, Input, FloatButton } from "antd";
import { PlusOutlined, PlusCircleOutlined } from "@ant-design/icons";

const { Search } = Input;

interface FilterProps {
  addButtonLabel: String;
  onSearch: () => void;
  onPressEnter: () => void;
  onAdd: () => void;
}

const Filter: React.FC<FilterProps> = ({
  addButtonLabel,
  onSearch,
  onPressEnter,
  onAdd,
}) => {
  const screenSize = useScreenSize();

  return (
    <Row justify={{ md: "space-between" }} align="middle">
      {screenSize === "mobile" ? (
        <FloatButton
          onClick={onAdd}
          type="primary"
          // style={{ right: 30, bottom: 30}}
          icon={<PlusOutlined />}
          tooltip={addButtonLabel}
        />
      ) : (
        <Col>
          <Button type="primary" icon={<PlusCircleOutlined />} onClick={onAdd}>
            {addButtonLabel}
          </Button>
        </Col>
      )}
      <Col>
        <Search
          enterButton={screenSize === "mobile" ? true : "Search"}
          onPressEnter={onPressEnter}
          placeholder="Search"
          allowClear
          onSearch={onSearch}
          // size="large"
        />
      </Col>
    </Row>
  );
};

export default Filter;
