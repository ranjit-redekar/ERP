import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { EditableContext } from './contexts';
import type { FormInstance } from 'antd/es/form';
import type { InputRef } from "antd";
const { Option } = Select;

interface Item {
  key: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  tax: number;
}

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
  const form = useContext<null | FormInstance<Item>>(EditableContext);
  const [productOptions, setProductOptions] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    if (editing) {
      // Replace this with your actual API call
      setProductOptions([
        { id: "1", name: "Product 1" },
        { id: "2", name: "Product 2" },
        // ...more products
      ]);
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form?.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form!.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

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

export default EditableCell;
