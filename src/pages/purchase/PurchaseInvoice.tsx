import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Row,
  Col,
  InputNumber,
  Select,
} from "antd";
import { ProTable } from "@ant-design/pro-components";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd/es/form";
import type { InputRef } from "antd";

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;
const { Option } = Select;

// Define your interface for the item structure

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

// Context to provide the form instance
const EditableContext = React.createContext<FormInstance<any> | null>(null);

// Define your EditableRow component
const EditableRow: React.FC<{ index: number }> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

// Define your EditableCell component
const EditableCell: React.FC<{
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}> = ({
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
  const [productOptions, setProductOptions] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
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

  useEffect(() => {
    if (editing) {
      // Replace this with your actual API call
      setProductOptions([
        { id: "1", name: "Product 1" },
        { id: "2", name: "Product 2" },
        // ...more products
      ]);
    }
  }, [editing]);

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      dataIndex === "productName" ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          <Select
            showSearch
            placeholder="Select a product"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onBlur={save}
            ref={inputRef}
          >
            {productOptions.map((option) => (
              <Option key={option.id} value={option.name}>
                {option.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ) : (
        <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
      )
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

const initialData = [
  {
    key: "1",
    productName: "Product 1",
    quantity: 10,
    unitPrice: 20.0,
    discount: 5.0,
    tax: 3.0,
  },
];
// PurchaseInvoice component
const PurchaseInvoice: React.FC = () => {
  const [dataSource, setDataSource] = useState<Item[]>(initialData);
  const [count, setCount] = useState(dataSource.length + 1);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const calculateTotal = () => {
    // Replace with actual calculation logic
    return subTotal - discount;
  };

  const columns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Product name",
      dataIndex: "productName",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      editable: true,
      align: "right",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      editable: true,
      align: "right",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      editable: true,
      align: "right",
    },
    {
      title: "Tax",
      dataIndex: "tax",
      editable: true,
      align: "right",
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
      },
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
        ) : null,
    },
    // ... other column definitions
  ];

  const handleSave = (row: Item) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
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
      tax: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const tableColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <ProTable
        components={components}
        rowClassName={() => "editable-row"}
        dataSource={dataSource}
        columns={tableColumns}
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
    </div>
  );
};

export default PurchaseInvoice;
