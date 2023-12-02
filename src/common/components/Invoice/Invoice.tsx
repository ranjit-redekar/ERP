import React, { useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import { Button, Popconfirm, Row, Col, Form, InputNumber, Select } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import EditableCell from "./EditableCell";
import EditableRow from "./EditableRow";
import { EditableContext } from "./contexts";

const { Option } = Select;

const suffixSelector = (
  <Form.Item name="suffix" noStyle>
    <Select style={{ width: 70 }} defaultValue="percentage">
      <Option value="percentage">%</Option>
      <Option value="INR">₹</Option>
    </Select>
  </Form.Item>
);

interface Item {
  key: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  tax: number;
}

const initialData: Item[] = [
  {
    key: "1",
    productName: "Product 1",
    quantity: 10,
    unitPrice: 20.0,
    discount: 5.0,
    tax: 3.0,
  },
];

const Invoice: React.FC = () => {
  const [dataSource, setDataSource] = useState<Item[]>(initialData);
  const [count, setCount] = useState(dataSource.length + 1);
  const [form] = Form.useForm<Item>();
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const calculateTotal = () => {
    // Replace with actual calculation logic
    return subTotal - discount;
  };

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleAdd = () => {
    const newData: Item = {
      key: count.toString(),
      productName: `New Product ${count}`,
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      tax: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: Item) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const columns = [
    {
      title: "Product name",
      dataIndex: "productName",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      editable: true,
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      editable: true,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      editable: true,
    },
    {
      title: "Tax",
      dataIndex: "tax",
      editable: true,
    },
    {
      title: "",
      dataIndex: "action",
      width: 50,
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <div>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Button
                shape="round"
                size="small"
                icon={<CloseOutlined />}
                danger
                type="text"
              />
            </Popconfirm>
          </div>
        ) : null,
    },
  ].map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  return (
    <EditableContext.Provider value={form}>
      <ProTable
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        rowClassName={() => "editable-row"}
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        pagination={false}
        search={false}
        toolBarRender={false}
      />
      <Row justify="space-between" gutter={16} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Row>
            <Button
              type="primary"
              onClick={handleAdd}
              icon={<PlusOutlined />}
              ghost
            >
              Add Item
            </Button>
          </Row>
          <Row>{/*  Customer Note */}</Row>
        </Col>
        <Col span={12}>
          <div
            style={{
              background: "#f0f2f5",
              padding: "20px",
              borderRadius: "8px",
              paddingInlineEnd: "63px",
            }}
          >
            <Row style={{ marginBottom: "10px" }}>
              <Col span={12}>Sub Total</Col>
              <Col span={12} style={{ textAlign: "right" }}>
                {subTotal.toFixed(2)}
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px", alignItems: "center" }}>
              <Col span={8}>Discount</Col>
              <Col span={8} style={{ textAlign: "right" }}>
                <InputNumber
                  addonAfter={suffixSelector}
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  style={{ width: "100%", textAlign: "right" }}
                />
              </Col>
              <Col span={8} style={{ textAlign: "right" }}>
                {subTotal.toFixed(2)}
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col span={12}>
                <strong>Total (₹)</strong>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <strong>{calculateTotal().toFixed(2)}</strong>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </EditableContext.Provider>
  );
};

export default Invoice;
