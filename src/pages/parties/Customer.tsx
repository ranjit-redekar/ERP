import React, { FC, useState } from "react";
import { Button, Tabs, Input, message } from "antd";
import {
  DrawerForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { isValidGST, isValidPan } from "../../common/validators";
import CustomSpin from "../../common/components/CustomSpin";

const { Search } = Input;

interface CustomerFormProps {
  isShow: boolean;
  onDrawerClose: () => void;
  selectedAction: string;
}


const PaymentDetailsTab : FC = () => (
  <>
    <ProForm.Group>
      <ProFormText
        width="md"
        name="panNumber"
        label="PAN Number"
        rules={[{ validator: isValidPan }]}
      />
    </ProForm.Group>
    <ProForm.Group>
      <ProFormText
        width="md"
        name="opening_balance"
        label="Opening Balance"
      />
    </ProForm.Group>
  </>
);

const AddressDetailsTab : FC = () => (
  <>
    <ProFormText name="address_1" label="Area, Street, Sector or Village" />
    <ProForm.Group>
      <ProFormText width="md" name="landmark" label="Landmark" />
      <ProFormText width="md" name="pincode" label="Pincode" />
    </ProForm.Group>
    <ProForm.Group>
      <ProFormSelect width="md" name="city" label="City" />
      <ProFormSelect width="md" name="state" label="State" />
    </ProForm.Group>
  </>
);

const CustomerForm: FC<CustomerFormProps> = ({ isShow, onDrawerClose, selectedAction }) => {
  const [spinning, setSpinning] = useState(false);

  const onFinish = async (values) => {
    setSpinning(true);
    console.log("Submitted Values", values);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    message.success('Form submitted successfully');
    setSpinning(false);
  };

  return (
    <>
      <CustomSpin spinning={spinning} />
      <DrawerForm
        onFinish={onFinish}
        width="751px"
        open={isShow}
        title={`${selectedAction} Customer`}
        onOpenChange={(val) => !val && onDrawerClose()}
        submitter={{
          submitButtonProps: {
            children: 'Save',
          },
        }}
      >
        <ProForm.Group>
          <ProFormSelect
            width="md"
            name="customer_type"
            label="Customer Type"
            valueEnum={{
              business: "Business",
              individual: "Individual",
            }}
            initialValue="business"
          />
          <ProForm.Item
            name="gstNumber"
            label="GST Number"
            rules={[{ validator: isValidGST }]}
          >
            <Search
              style={{ width: "100%" }}
              allowClear
              placeholder="27ABCDE1234F1Z5"
              enterButton="Verify"
            />
          </ProForm.Item>
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText
            name="first_name"
            label="First Name"
            width="md"
            rules={[{ required: true, message: "This field is required" }]}
          />
          <ProFormText
            name="last_name"
            label="Last Name"
            width="md"
            rules={[{ required: true, message: "This field is required" }]}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="company_name" label="Company Name" />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="phoneNumber" label="Phone Number" />
          <ProFormText
            width="md"
            name="email"
            label="Email Address"
            rules={[{ type: "email", message: "Invalid email address" }]}
          />
        </ProForm.Group>

        <Tabs defaultActiveKey="1" type="card">
          <Tabs.TabPane tab="Payment Details" key="1">
            <PaymentDetailsTab />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Address Details" key="2">
            <AddressDetailsTab />
          </Tabs.TabPane>
          {/* Additional tabs can be added here */}
        </Tabs>
      </DrawerForm>
    </>
  );
};

export default CustomerForm;
