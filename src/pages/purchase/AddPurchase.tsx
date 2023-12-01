import type { ProColumns } from "@ant-design/pro-components";
import {
  EditableProTable,
} from "@ant-design/pro-components";
import { AutoComplete, Drawer, Input} from "antd";
import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { showConfirm } from "../../common/components/Utils";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const defaultData: PurchaseOrderItem[] = [
  {
    id: '1',
    product: 'Laptop',
    description: '15 inch, 8GB RAM',
    quantity: 10,
    unitPrice: 750,
    discount: 5,
    tax: 10,
    totalPrice: 0,
  },
  {
    id: '2',
    product: 'Monitor',
    description: '24 inch LED',
    quantity: 15,
    unitPrice: 150,
    discount: 7,
    tax: 8,
    totalPrice: 0,
  },
  // ... other items
];


function formatNumberAsINRCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}

interface PurchaseOrderItem {
  id: string;
  product: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number; // Discount in percentage
  tax: number; // Tax in percentage
  totalPrice: number;
}

type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  update_at?: number;
  children?: DataSourceType[];
};

const renderTitle = (title: string) => (
  <span>
    {title}
    <a
      style={{ float: "right" }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);

const renderItem = (title: string, count: number) => ({
  value: title,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  )
});

const options = [
  {
    label: renderTitle("Libraries"),
    options: [renderItem("AntDesign", 10000), renderItem("AntDesign UI", 10600)]
  },
  {
    label: renderTitle("Solutions"),
    options: [
      renderItem("AntDesign UI FAQ", 60100),
      renderItem("AntDesign FAQ", 30010)
    ]
  },
  {
    label: renderTitle("Articles"),
    options: [renderItem("AntDesign design language", 100000)]
  }
];

interface PurchaseOrderProps {
  isShow: boolean;
  onDrawerClose: () => void;
  selectedAction: string;
}


const PurchaseOrder: React.FC<PurchaseOrderProps> =  ({ isShow, onDrawerClose, selectedAction = "Add" }) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);

  const columns: ProColumns<PurchaseOrderItem>[] = [
    {
      title: 'Product',
      dataIndex: 'product',
    },
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    // },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      render: (text: number) => formatNumberAsINRCurrency(text),
    },
    {
      title: 'Discount (%)',
      dataIndex: 'discount',
      valueType: 'percent',
    },
    {
      title: 'Tax (%)',
      dataIndex: 'tax',
      valueType: 'percent',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      valueType: 'money',
      render: (_, record) => {
        const discountAmount = record.unitPrice * record.quantity * (record.discount / 100);
        const taxAmount = (record.unitPrice * record.quantity - discountAmount) * (record.tax / 100);
        const totalPrice = record.unitPrice * record.quantity - discountAmount + taxAmount;
        // Set the totalPrice back to the dataSource if needed
        // This is not the best practice. You might want to handle it inside an effect or a callback.
        // record.totalPrice = totalPrice;
        return formatNumberAsINRCurrency(totalPrice);
      },
    },
    {
      title: 'Action',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            showConfirm();
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          Delete
        </a>,
        // Add more actions here
      ],
    }
  ];

  return (
    <>
      <Drawer
      title={`${selectedAction} Purchase Record`}
      placement="right"
      onClose={onDrawerClose}
      open={isShow}
      size="large"
      maskClosable={false}
      contentWrapperStyle={{ width: "unset" }}
    >
      <EditableProTable<DataSourceType>
        rowKey="id"
        // headerTitle="Editable Table"
        maxLength={5}
        scroll={{ x: 960 }}
        recordCreatorProps={{
                position: 'bottom',
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) })
        }}
        loading={false}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          deletePopconfirmMessage: "Do you Want to delete this item?",
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onlyOneLineEditorAlertMessage:<>Delete this line?</>, 
          onlyAddOneLineAlertMessage: <>Please add data for the current item</>,
          onChange: setEditableRowKeys,
        }}
      />
      {/* <EditableProTable<DataSourceType>
        rowKey="id"
        // headerTitle="Editable Table"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={{
          position: "bottom",
          record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
        }}
        loading={false}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          deletePopconfirmMessage: "Do you Want to delete this item?",
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onlyOneLineEditorAlertMessage:<>Delete this line?</>, 
          onlyAddOneLineAlertMessage: <>Please add data for the current line fields</>,
          onChange: setEditableRowKeys,
        }}
      /> */}
    </Drawer>
    </>
  );
};

export default PurchaseOrder;