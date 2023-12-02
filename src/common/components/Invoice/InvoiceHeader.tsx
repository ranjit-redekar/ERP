import React, { useState } from 'react';
import { ProForm, ProFormText, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-components';
import { Button, Menu } from 'antd';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { waitTime } from '../../utils'; // Assuming fetchSuppliers is exported from utils

// Mock function for fetching suppliers - replace with actual API call
const fetchSuppliers = async (keyWords = "") => {
    await waitTime(2000); // Simulating a network request
    // Mock response data, replace this with your actual API response
    const suppliers = [
      { value: "1", label: "Supplier 1" },
      { value: "2", label: "Supplier 2" },
      { value: "3", label: "Supplier 3" },
      { value: "4", label: "Supplier 4" },
      { value: "5", label: "Supplier 5" },
      { value: "6", label: "Supplier 6" },
      // ... other suppliers
    ];
    return suppliers.filter((supplier) =>
      supplier.label.toLowerCase().includes(keyWords.toLowerCase())
    );
  };
interface InvoiceHeaderProps {
  // Define any props you need to pass to InvoiceHeader
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = (props) => {
  const [hasSuppliers, setHasSuppliers] = useState(true);

  return (
    <div style={{ margin: "0 16px" }}>
      <ProForm layout="vertical" grid={true} submitter={false}>
        <ProFormSelect
          colProps={{ md: 12, xl: 6 }}
          name="supplier"
          label="Select Supplier"
          showSearch
          debounceTime={300}
          request={async ({ keyWords }) => {
            const supplierOptions = await fetchSuppliers(keyWords);
            setHasSuppliers(supplierOptions.length > 0);
            return supplierOptions;
          }}
          placeholder="Please select a supplier"
          rules={[{ required: true, message: "Please select a supplier!" }]}
          fieldProps={{
            dropdownRender: (menu) => (
              <Menu>
                {menu}
                {!hasSuppliers && (
                  <Menu.Item>
                    <Button type="dashed" block icon={<PlusOutlined />}>
                      Add Supplier
                    </Button>
                  </Menu.Item>
                )}
              </Menu>
            ),
          }}
        />
        <ProFormText
          colProps={{ md: 12, xl: 6 }}
          name="purchase_order_id"
          label="Order Id"
          fieldProps={{
            addonAfter: <SettingOutlined />,
          }}
        />
        <ProFormSelect
          colProps={{ md: 12, xl: 4 }}
          label="Status"
          name="status"
          valueEnum={{
            1: "Draft",
            2: "Pending",
            3: "Sent",
          }}
        />
        <ProFormDatePicker
          colProps={{ md: 12, xl: 4 }}
          label="Date"
          name="created_date"
        />
        <ProFormText
          colProps={{ md: 12, xl: 6 }}
          name="email"
          label="Email Id"
        />
        <ProFormText
          colProps={{ md: 12, xl: 6 }}
          name="phone"
          label="Phone"
        />
        <ProFormDatePicker
          colProps={{ md: 12, xl: 4 }}
          label="Expire Date"
          name="expire_date"
        />
      </ProForm>
    </div>
  );
};

export default InvoiceHeader;
