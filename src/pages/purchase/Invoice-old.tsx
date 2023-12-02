import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table, Row, Col, InputNumber, Select } from "antd";
import type { InputRef } from "antd";
import {
  ProTable,
  TableDropdown,
  ProFormText
} from "@ant-design/pro-components";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd/es/form";
const { Option } = Select;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
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

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    // Prevent editing for 'Total Price' field
    if (dataIndex === "totalPrice") {
      return;
    }

    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable && dataIndex !== "totalPrice") {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType extends Item {
  key: React.Key;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const App: React.FC = () => {
  const initialData = [
    {
      key: "1",
      productName: "Product 1",
      quantity: 10,
      unitPrice: 20.0,
      discount: 5.0,
      tax: 3.0
    }
  ];

  const [dataSource, setDataSource] = useState<DataType[]>(initialData);
  const [count, setCount] = useState(dataSource.length + 1);
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
    const newData: DataType = {
      key: count.toString(),
      productName: `New Product ${count}`,
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      tax: 0
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Product name",
      dataIndex: "productName",
      editable: true
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      editable: true,
      align: "right"
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      editable: true,
      align: "right"
    },
    {
      title: "Discount",
      dataIndex: "discount",
      editable: true,
      align: "right"
    },
    {
      title: "Tax",
      dataIndex: "tax",
      editable: true,
      align: "right"
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      align: "right",
      render: (_, record) => {
        const quantity = record.quantity || 0;
        const unitPrice = record.unitPrice || 0;
        const discount = record.discount || 0;
        const tax = record.tax || 0;

        const totalPrice = quantity * unitPrice - discount + tax;
        return <span>{totalPrice.toFixed(2)}</span>;
      }
    },
    {
      title: "",
      dataIndex: "action",
      editable: false,
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
            {/* <EditOutlined
              style={{ color: "#008dff" }}
              onClick={() => {
                console.log("AAAAA");
              }}
            /> */}
          </div>
        ) : null
    }
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    };
  });

  return (
    <div>
      <ProTable
        components={components}
        rowClassName={() => "editable-row"}
        // bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={{ position: ["none"] }}
        search={false}
        toolBarRender={false}
      />
      <div style={{ margin: "20px" }}>
        <Row gutter={16}>
          {/* <Col span={16}>
            <ProForm>
              <ProFormText
                width="md"
                name="customerNotes"
                label="Customer Notes"
                placeholder="Will be displayed on purchase order"
              />
            </ProForm>
          </Col> */}
        </Row>

        <Row justify="space-between" gutter={16} style={{ marginTop: "20px" }}>
          <Col span={8}>
            <Row>
              <Button
                type="primary"
                onClick={handleAdd}
                icon={<PlusOutlined />}
              >
                Add Item
              </Button>
            </Row>
            <Row>{/* // Customer Note */}</Row>
          </Col>
          <Col>
            <div
              style={{
                background: "#f0f2f5",
                padding: "20px",
                borderRadius: "8px"
              }}
            >
              <Row style={{ marginBottom: "10px" }}>
                <Col span={12}>Sub Total</Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  {subTotal.toFixed(2)}
                </Col>
              </Row>
              <Row style={{ marginBottom: "10px" }}>
                <Col span={12}>Discount</Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <InputNumber
                    addonAfter={suffixSelector}
                    value={discount}
                    onChange={(e) =>
                      setDiscount(parseFloat(e.target.value) || 0)
                    }
                    style={{ width: "100%", textAlign: "right" }}
                  />
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
      </div>
    </div>
  );
};

export default App;
